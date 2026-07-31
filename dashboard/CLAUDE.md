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

Base URL: `https://api.kie.ai`

Auth header on every request (from the SERVER only):
```
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

If the key/header is wrong, kie.ai returns:
```json
{ "code": 401, "msg": "You do not have access permissions" }
```

Each model has its own generate endpoint and its own parameters — the exact
path and body for a chosen model come from that model's page under
https://docs.kie.ai (e.g. Seedream, Kling, Suno, etc.). Do NOT invent
endpoint paths or parameter names — if a model's exact spec isn't in this
file yet, ask me to paste it from its docs page before writing that call.

Checking status uses the common **Get Task Details** endpoint (one endpoint
works across models): https://docs.kie.ai/market/common/get-task-detail
Use the `task_id` to query it. Again, confirm its exact path/response shape
from that page before coding against it — don't guess field names.

Other facts to respect:
- Rate limit: ~20 new generation requests per 10 seconds, else HTTP 429.
  Handle 429 gracefully (show "rate limited, retrying" — don't crash).
- Failed tasks are not charged.
- Generated files are deleted after 14 days — treat result URLs as temporary.

> ✏️ FILL IN: the specific model(s) this dashboard uses, and paste each one's
> endpoint path + request body fields + result field names from its docs page.
> Until that's here, only the app skeleton and status-polling can be built.

---

## 6. The server's two jobs (only two routes)

1. `POST /api/generate`
   - Receives `{ model, params }` from the React app.
   - Adds the Authorization header, forwards to the right kie.ai generate
     endpoint, and returns the `task_id` to React.

2. `GET /api/status/:taskId`
   - Calls kie.ai's Get Task Details endpoint with the key.
   - Returns a simplified `{ status, resultUrl, error }` to React.

Keep it this small. No database — jobs live in React state for now.

---

## 7. What React tracks per job (in App state)

```
{
  id,            // task_id from kie.ai
  model,         // which model was used
  prompt,        // what the user typed
  status,        // 'pending' | 'done' | 'failed'
  resultUrl,     // filled in when done
  createdAt
}
```

`usePolling.js` checks `GET /api/status/:taskId` every 3s for each pending job
and stops polling once it's done or failed.

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
