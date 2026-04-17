# Proposal Writer Agent

> An open-source web UI for the **Proposal Writer Agent** — powered by [UPLIZD](https://uplizd.ai). Retrieves HubSpot deals, researches industry case studies, drafts 3-tier ROI proposals, and exports to Google Docs + PDF.

[![Install on UPLIZD Marketplace](https://img.shields.io/badge/UPLIZD_Marketplace-Install_Flow-BA7517?style=for-the-badge)](https://uplizd.ai/marketplace/proposal-writer-agent)

![Demo](docs/demo.gif)

---

## How it works

This repo is the **web UI only**. The AI logic (HubSpot, Google Docs, Gmail, Web Search) runs entirely inside an UPLIZD flow — installed in one click from the Marketplace.

```
You (browser)  →  this web UI  →  Express proxy  →  UPLIZD flow  →  HubSpot / GDocs / Gmail
```

---

## Features

- **Chat interface** — talk to the agent like a colleague
- **UPLIZD backend** — all AI logic lives in the flow, not the UI
- **Secure proxy server** — API key never exposed to the browser
- **Quick prompts** — one-click common tasks
- **Dark mode** — follows system preference
- **Session management** — each conversation gets a unique session ID

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Proxy server | Express (Node.js) |
| AI workflow | UPLIZD Marketplace |
| Fonts | Lora + JetBrains Mono |

---

## Prerequisites

- Node.js ≥ 18
- An [UPLIZD](https://uplizd.ai) account

---

## Quick start

### Step 1 — Install the flow from Marketplace

**[→ Open Proposal Writer Agent on UPLIZD Marketplace](https://uplizd.ai/marketplace/proposal-writer-agent)**

1. Click **Install**
2. After install, open the flow → copy the **Flow ID** from the URL:
   `https://studio.uplizd.ai/flow/YOUR_FLOW_ID_HERE`
3. Go to **Settings → API Keys** → copy your API key

### Step 2 — Clone and configure

```bash
git clone https://github.com/uplizd/proposal-writer-agent.git
cd proposal-writer-agent

cp .env.example .env
```

Edit `.env`:
```bash
UPLIZD_API_KEY=your_api_key_here
UPLIZD_FLOW_ID=your_flow_id_here   # from the URL after installing the flow
```

### Step 3 — Run

```bash
npm run install:all   # install all deps (root + server + web)
npm run dev           # starts proxy on :3001 and web app on :5173
```

Open **http://localhost:5173** ✅

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `UPLIZD_API_KEY` | ✅ | Your UPLIZD API key |
| `UPLIZD_FLOW_ID` | ✅ | Flow ID copied from UPLIZD after Marketplace install |
| `UPLIZD_BASE_URL` | — | Default: `https://studio.uplizd.ai` |
| `PORT` | — | Proxy server port. Default: `3001` |
| `CORS_ORIGIN` | — | Allowed origin for CORS. Default: `http://localhost:5173` |
| `FLOW_INPUT_TYPE` | — | Default: `chat` |
| `FLOW_OUTPUT_TYPE` | — | Default: `chat` |

---

## Project structure

```
proposal-writer-agent/
├── .env.example          # Environment variable template
├── package.json          # Root scripts (dev, build, install:all)
│
├── server/
│   ├── index.js          # Express proxy — hides API key, forwards to UPLIZD
│   └── package.json
│
├── web/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles/global.css
│       ├── lib/uplizd.js           # API client (calls proxy)
│       ├── hooks/useChat.js        # Conversation state
│       └── components/
│           ├── Sidebar.jsx
│           ├── ChatPanel.jsx
│           ├── Message.jsx
│           └── ThinkingIndicator.jsx
│
└── docs/
    ├── setup.md
    └── contributing.md
```

---

## Architecture

```
Browser (React)
  │  POST /api/run { message, sessionId }
  ▼
Express Proxy (server/index.js)        ← API key lives here only, never in browser
  │  POST /api/v1/run/:flowId
  │  Header: x-api-key: ***
  ▼
UPLIZD Flow (installed from Marketplace)
  ├── HubSpot    — retrieve latest deal & contact
  ├── Web Search — research industry case studies
  ├── Google Docs — create + export proposal doc
  └── Gmail      — draft outreach email
```

---

## Contributing

See [docs/contributing.md](docs/contributing.md).

Short version:
1. Fork → feature branch → PR
2. Keep components small and single-purpose
3. Don't commit `.env` — it's in `.gitignore`
4. For new tool integrations, add them to `Sidebar.jsx` TOOLS array

---

## License

MIT — see [LICENSE](LICENSE).
