# CLAUDE.md — kie.ai Generation Dashboard

> This file is context for Claude Code. It describes the project, the rules,
> and the exact way the kie.ai API works. Read it fully before writing code.
> I am a beginner (Python background, some HTML/CSS/JS). Explain choices simply
> and build in small, reviewable steps.

---

## 1. Goal

A dashboard where a user submits AI generation jobs to kie.ai (image, video,
music, and/or chat models), watches each job's status update live, and views
the finished result. Think "submit a prompt → track the job → see the output."

> ✏️ FILL IN after watching the reference video: describe what the dashboard on
> screen actually shows and where things sit. Example:
> "Left column = a form (model picker + prompt box + Generate button).
>  Right column = a grid of cards, one per job, each showing status and result."

---

## 2. The single most important fact about kie.ai

**kie.ai is asynchronous.** You never get the result back from the first request.
The flow is always:

1. POST a generation request → you get back an HTTP 200 and a `task_id`.
   A 200 here only means the job was *created*, NOT finished.
2. Then you either:
   - poll the "Get Task Details" endpoint with that `task_id` every few
     seconds until status is done/failed, OR
   - give kie.ai a callback (webhook) URL it will call when done.

For this project use **polling** — it's simpler for a beginner and needs no
public URL. Poll every 3 seconds.

---

## 3. Security rule — this decides the architecture

kie.ai's docs say: **never expose your API key in frontend code** (browser,
mobile, public repos). A plain React app runs in the browser, so it CANNOT
call kie.ai directly — the key would be visible to anyone.

**Therefore the app has two parts:**

```
React app (browser)  →  our own small Node/Express server  →  kie.ai
```

- The API key lives ONLY on the server, in a `.env` file.
- The React app only ever talks to our own server, never to kie.ai directly.
- If you (Claude Code) are ever about to put the key in `src/`, STOP — that's
  the one thing we must not do.

---

## 4. Project structure

```
dashboard/
├── server/
│   ├── index.js          # Express server. Holds the key. Talks to kie.ai.
│   ├── .env              # KIE_API_KEY=xxxx   (never commit this)
│   ├── .env.example      # KIE_API_KEY=        (safe to commit, no real key)
│   └── package.json
├── src/
│   ├── components/
│   │   ├── JobForm.jsx       # model picker + prompt + Generate button
│   │   ├── JobCard.jsx       # one job: prompt, status badge, result
│   │   ├── StatusBadge.jsx   # coloured pill: pending / done / failed
│   │   └── ResultView.jsx    # shows image / <video> / <audio> by type
│   ├── hooks/
│   │   └── usePolling.js      # polls our server for a job's status
│   ├── services/
│   │   └── api.js             # ALL calls to our own server live here
│   ├── App.jsx
│   └── main.jsx
├── .gitignore            # must include: .env  and  node_modules
└── package.json          # the React (Vite) app
```

**Hard rules:**
- Every network call from React goes through `src/services/api.js`. Nowhere else.
- The server exposes only 2 routes (see section 6). React never sees kie.ai URLs.

---

## 5. How kie.ai requests actually look

Base URL: `https://api.kie.ai`. There is **one create endpoint and one status
endpoint for every Market model** — only the `model` string and `input` object
change per model.

### Create a task

`POST https://api.kie.ai/api/v1/jobs/createTask`

```json
{
  "model": "<model string>",
  "input": { "...model-specific fields...": "..." }
}
```
`callBackUrl` is optional — omit it, we're polling.

Success response:
```json
{ "code": 200, "msg": "success", "data": { "taskId": "task_gptimage_1765180586443" } }
```
The field is `taskId` (camelCase) inside `data`.

### Check status

`GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=<taskId>`

```json
{
  "code": 200,
  "msg": "success",
  "data": {
    "taskId": "task_12345678",
    "state": "success",
    "resultJson": "{\"resultUrls\":[\"https://example.com/generated-content.jpg\"]}",
    "failCode": "",
    "failMsg": "",
    "progress": 45
  }
}
```
- `state` is the status: `waiting`, `queuing`, `generating`, `success`, `fail`.
  Keep polling while waiting/queuing/generating, stop on success/fail.
- `resultJson` is a **string** — `JSON.parse(data.resultJson)` to get
  `{ resultUrls: ["https://..."] }`. On failure read `failMsg`/`failCode`.

If the key/header is wrong, kie.ai returns `{ "code": 401, "msg": "You do not
have access permissions" }`.

Other facts to respect:
- Rate limit: ~20 new generation requests per 10 seconds, else HTTP 429.
  Handle 429 gracefully (show "rate limited, retrying" — don't crash).
- Poll every ~3s, give up after 10–15 minutes and mark the job timed-out.
- Result URLs expire fast (~24h) and generated files are deleted after 14
  days — treat every result URL as temporary.
- Failed tasks are not charged.
- The `recordInfo` endpoint can also return 400, 401, 404, 422, 429, 500 —
  don't crash on these, show the job as failed with the message.

### Models currently wired up (see `src/models.js`)

- **GPT Image 2** (image) — model string `gpt-image-2-text-to-image`.
  `input`: `prompt` (string), `aspect_ratio` (e.g. "auto", "1:1", "16:9").
- **Seedance 2.0** (video) — model string `bytedance/seedance-2`.
  `input` (text-to-video only for now): `prompt`, `resolution` (e.g.
  "720p"), `aspect_ratio` (e.g. "16:9"), `duration` (seconds), `generate_audio`
  (bool). Image/reference fields (`first_frame_url`, `reference_*_urls`, etc.)
  are mutually exclusive modes, skipped for this first version.
  Siblings `bytedance/seedance-2-fast` and `bytedance/seedance-2-mini` use the
  same endpoints but aren't confirmed to share the same `input` fields — check
  their own docs pages before using.

Adding another model = add an entry to `src/models.js` with its real model
string and `input` fields from its docs.kie.ai page — don't guess them.

---

## 6. The server's two jobs (only two routes)

1. `POST /api/generate`
   - Receives `{ model, input }` from the React app.
   - Adds the Authorization header, forwards `{ model, input }` to
     `createTask`, and returns `{ taskId: data.data.taskId }` to React.

2. `GET /api/status/:taskId`
   - Calls `recordInfo` with the key.
   - Parses `resultJson` (it's a string) and returns a simplified
     `{ state, resultUrls, failMsg }` to React — so React never has to do
     the `JSON.parse` itself.

Keep it this small. No database — jobs live in React state for now.

---

## 7. What React tracks per job (in App state)

```
{
  id,            // taskId from kie.ai
  model,         // which model string was used
  prompt,        // what the user typed
  status,        // 'waiting' | 'queuing' | 'generating' | 'success' | 'fail'
  resultUrl,     // filled in when status is 'success'
  createdAt
}
```

`usePolling.js` checks `GET /api/status/:taskId` every 3s for each pending job
and stops polling once status is `success` or `fail`.

---

## 8. Build order — ONE slice at a time, wait for my OK between each

Do not build the whole thing at once. After each step, stop and show me.

1. **Skeleton.** Create the Vite React app + the `server/` Express app.
   Empty layout with placeholder boxes matching section 1. `.gitignore` with
   `.env`. A `.env.example`. No kie.ai calls yet. Show me it runs.
2. **Server plumbing.** Build the two routes in section 6, but have them return
   FAKE data first (a hardcoded task_id, a hardcoded "done" status). Confirm
   React can reach the server.
3. **Real generate call.** Wire `POST /api/generate` to the real kie.ai
   endpoint for ONE model (I'll paste its spec). Show me a real task_id coming
   back.
4. **Polling + status.** Wire `GET /api/status/:taskId` to Get Task Details,
   add `usePolling.js`, show a job going pending → done with the result.
5. **Result display.** `ResultView` renders image / video / audio by type.
6. **Polish.** Extra models, error/429 handling, styling to match the video.

---

## 9. Style

> ✏️ FILL IN from the video: colours, light or dark, spacing feel, font vibe.
> Default if unspecified: clean, dark, lots of spacing, one accent colour.

---

## 10. Reminders for Claude Code

- I'm a beginner — explain what each new file does and why in plain language.
- Prefer clarity over cleverness. Small functions, clear names, short comments.
- Never put the API key anywhere under `src/`.
- Don't invent kie.ai endpoint paths or field names — ask me to paste the real
  model spec from docs.kie.ai when you need it.
- Stop after each build-order step and wait for me.
