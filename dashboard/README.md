# kie.ai Generation Dashboard

Submit a prompt, track the job, see the result. See `CLAUDE.md` for the full
project spec and build order.

## Two parts

- **`src/`** — the React (Vite) app. Runs in the browser.
- **`server/`** — a small Express server. Holds the kie.ai API key and is the
  only thing that talks to kie.ai. The React app only ever talks to this
  server (see `src/services/api.js`).

## Running it locally

In one terminal, start the server:

```bash
cd server
cp .env.example .env   # then fill in KIE_API_KEY
npm install
npm run dev
```

In another terminal, start the React app:

```bash
npm install
npm run dev
```

The React app runs on `http://localhost:5173`, the server on
`http://localhost:3001`.

## Status

Currently at build-order step 1 (skeleton): both apps run, layout is in
place, no kie.ai calls yet.
