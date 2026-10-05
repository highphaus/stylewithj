# Production Deployment Guide

This guide outlines the production deployment topology and best practices for the Highphaus Workforce Platform.

---

## 1. Architecture Topology

```
+─────────────────────────────────────────────────────────────+
| Cloudflare CDN / DNS / WAF                                  |
+─────────────────────────────────────────────────────────────+
              │                                    │
    HTTPS: app.highphaus.com             HTTPS/WSS: api.highphaus.com
              ▼                                    ▼
+──────────────────────────+             +──────────────────────────+
| Vercel / Cloud Platform  |             | Node.js / Express Server |
| (Next.js 14 App Router)  |             | (Socket.IO + REST API)   |
+──────────────────────────+             +──────────────────────────+
                                                      │
                                           Mongoose / TLS Connection
                                                      ▼
                                         +──────────────────────────+
                                         | MongoDB Atlas            |
                                         | (Replica Set + Backups)  |
                                         +──────────────────────────+
```

---

## 2. Step-by-Step Deployment

### Step A: Database (MongoDB Atlas)
1. Provision a MongoDB Atlas cluster (M10+ recommended for 1,000+ employees).
2. Configure **Network Access** IP whitelisting for the backend server instances.
3. Obtain the connection string:
   `mongodb+srv://<username>:<password>@cluster.highphaus.mongodb.net/highphaus?retryWrites=true&w=majority`

### Step B: Backend API & Socket.IO
1. Deploy `backend/` and `shared/` to a scalable Node hosting service (AWS ECS, Render, Railway, DigitalOcean).
2. Configure production environment variables (`NODE_ENV=production`, `MONGO_URI`, `JWT_SECRET`, `WEB_URL=https://app.highphaus.com`).
3. Verify the health check: `curl -i https://api.highphaus.com/api/health` -> `{"status":"ok"}`.

### Step C: Frontend Web Portal (Next.js)
1. Deploy `frontend/` to **Vercel** or **AWS Amplify**.
2. Configure environment variables:
   - `NEXT_PUBLIC_API_URL=https://api.highphaus.com/api`
   - `NEXT_PUBLIC_SOCKET_URL=https://api.highphaus.com`
3. Execute production build: `npm run build --workspace=frontend`.

### Step D: Desktop Agent Distribution
1. Package the installer with production configuration: `npm run build:agent`.
2. Host `HighPhaus-Workforce-Setup.exe` on a private internal company S3 bucket or Intune portal.
