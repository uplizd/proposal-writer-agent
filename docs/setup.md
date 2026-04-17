# Setup guide

## Step 1 — Install the flow from UPLIZD Marketplace

1. Go to **[https://marketplace.uplizd.ai/marketplace/proposal-writer-agent](https://marketplace.uplizd.ai/marketplace/proposal-writer-agent)**
2. Click **Install**
3. After install, open the flow in your UPLIZD workspace
4. Copy the **Flow ID** from the URL:
   `https://studio.uplizd.ai/flow/YOUR_FLOW_ID_HERE`
5. Go to **Settings → API Keys** → create or copy your key

## Step 2 — Configure `.env`

```bash
cp .env.example .env
```

Edit `.env`:
```bash
UPLIZD_API_KEY=your_actual_api_key
UPLIZD_FLOW_ID=your_actual_flow_id
```

## Step 3 — Install and run

```bash
npm run install:all   # installs root + server + web deps
npm run dev           # starts both proxy (3001) and web app (5173)
```

## Step 4 — Verify the proxy is working

```bash
curl http://localhost:3001/health
# → {"ok":true,"flowId":"..."}
```

## Step 5 — Open the app

Navigate to **http://localhost:5173**

---

## Production deployment

### Frontend (Vercel / Netlify)

```bash
cd web && npm run build
# Deploy the web/dist/ folder
```

### Proxy server (Railway / Render / Fly.io)

Deploy the `server/` folder as a Node.js service.
Set all environment variables from `.env.example` in the hosting dashboard.

> ⚠️ Never deploy the frontend with `UPLIZD_API_KEY` baked in — always go through the proxy.
