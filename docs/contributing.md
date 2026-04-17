# Contributing

Thanks for your interest! Here's how to get involved.

---

## Getting started

```bash
git clone https://github.com/uplizd/solutions/proposal-writer-agent.git
cd proposal-writer-agent
cp .env.example .env        # fill in your UPLIZD credentials
npm run install:all
npm run dev
```

---

## What to work on

Good first issues:
- [ ] Markdown rendering in chat bubbles (react-markdown)
- [ ] Copy-to-clipboard button on assistant messages
- [ ] Proposal history — save past sessions to localStorage
- [ ] Export chat as PDF
- [ ] Mobile responsive layout

Bigger contributions:
- [ ] Multiple flow support (switch between flows in sidebar)
- [ ] Streaming responses (SSE / WebSocket from Langflow)
- [ ] Auth layer (basic login to protect the proxy)

---

## Guidelines

- **One component, one job** — keep components under ~150 lines
- **No hardcoded secrets** — all config through `.env`
- **CSS in JS** — use the inline `styles` object pattern already in place, referencing CSS variables from `global.css`
- **No new dependencies** without discussion — keep the bundle lean

---

## PR checklist

- [ ] `npm run build` passes with no errors
- [ ] `.env` is NOT committed
- [ ] New components follow the existing naming and style conventions
- [ ] PR description explains what and why
