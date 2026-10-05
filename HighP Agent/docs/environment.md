# Environment Configuration Guide

This document outlines all environment variables utilized across the Highphaus Workforce Platform.

---

## Backend Environment Variables (`backend/.env`)

| Variable | Description | Example (Dev) | Example (Prod) |
| :--- | :--- | :--- | :--- |
| `PORT` | API server listen port | `5000` | `5000` |
| `NODE_ENV` | Environment mode | `development` | `production` |
| `MONGO_URI` | MongoDB connection URI | `mongodb://127.0.0.1:27017/highphaus_workforce` | `mongodb+srv://user:pass@cluster.mongodb.net/highphaus?retryWrites=true&w=majority` |
| `JWT_SECRET` | Secret key for access tokens | `dev-jwt-super-secret-highphaus-2026` | `(High entropy cryptographic string)` |
| `JWT_EXPIRES_IN` | Access token lifespan | `7d` | `24h` |
| `JWT_REFRESH_SECRET` | Secret key for refresh tokens | `dev-jwt-refresh-secret-highphaus-2026` | `(High entropy cryptographic string)` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token lifespan | `30d` | `30d` |
| `WEB_URL` | Web dashboard frontend origin | `http://localhost:3000` | `https://app.highphaus.com` |
| `COMPANY_TIMEZONE` | Fallback company timezone | `Asia/Kolkata` | `Asia/Kolkata` |
| `IDLE_THRESHOLD_MINUTES` | Default idle threshold | `5` | `5` |
| `HEARTBEAT_INTERVAL_SECONDS`| Agent heartbeat rate | `30` | `30` |
| `OFFLINE_TIMEOUT_SECONDS` | Device offline threshold | `90` | `90` |

---

## Frontend Environment Variables (`frontend/.env.local`)

| Variable | Description | Example (Dev) | Example (Prod) |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API | `http://localhost:5000/api` | `https://api.highphaus.com/api` |
| `NEXT_PUBLIC_SOCKET_URL` | Realtime Socket.IO server | `http://localhost:5000` | `https://api.highphaus.com` |

---

## Desktop Agent Configuration (`desktop-agent/.env` / build config)

| Variable | Description | Example (Dev) | Example (Prod) |
| :--- | :--- | :--- | :--- |
| `API_URL` | Target API gateway | `http://localhost:5000` | `https://api.highphaus.com` |
| `SOCKET_URL` | Realtime socket endpoint | `http://localhost:5000` | `https://api.highphaus.com` |

---

> [!CAUTION]
> Never commit `.env` files with production database credentials, API secrets, or private keys to version control.
