# 🚀 Deploying API Sentinel to Production

API Sentinel is engineered as a unified full-stack platform. The Express backend automatically serves the compiled React frontend, background BullMQ scheduler, and 37+ REST API endpoints under a single domain.

---

## 🌟 Option 1: Render.com (Recommended — 100% Free Full-Stack)

Render is the best platform for API Sentinel because it keeps the background monitoring scheduler running 24/7.

### Steps:
1. Go to [render.com](https://render.com) and Sign In with GitHub.
2. Click **New +** → **Web Service** (or **Blueprint**).
3. Connect your GitHub repository:
   ```
   https://github.com/shubhamgir/-api-sentinel
   ```
4. Render will auto-detect the configuration from `render.yaml` and root `package.json`:
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
5. Click **Create Web Service**.
6. Within 2 minutes, your live site will be accessible at:
   `https://api-sentinel-xxxx.onrender.com`

---

## ⚡ Option 2: Railway.app (Fastest 1-Click Deploy)

1. Go to [railway.app](https://railway.app) and Sign In with GitHub.
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select `shubhamgir/-api-sentinel`.
4. Railway automatically detects `package.json`, builds the frontend, and launches the server.
5. In **Settings** → **Networking**, click **Generate Domain**.
6. Your live website is instantly online!

---

## ▲ Option 3: Vercel (Frontend Only)

1. Go to [vercel.com](https://vercel.com) and click **Add New** → **Project**.
2. Import `https://github.com/shubhamgir/-api-sentinel`.
3. Vercel will use `vercel.json`:
   - **Build Command**: `npm run build --prefix frontend`
   - **Output Directory**: `frontend/dist`
4. Click **Deploy**.

---

## 🐳 Option 4: Docker / Self-Hosted Server (VPS / DigitalOcean / AWS)

If deploying to your own cloud instance or VPS:

```bash
# Clone the repository
git clone https://github.com/shubhamgir/-api-sentinel.git
cd -api-sentinel

# Launch with Docker Compose
docker compose up -d --build
```

- **Frontend**: `http://your-server-ip:80`
- **Backend API**: `http://your-server-ip:5000/api`
- **Health Check**: `http://your-server-ip:5000/health`
