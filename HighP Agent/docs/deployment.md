# Production Deployment & Infrastructure Guide

---

## 1. Environment Variables Checklist

Ensure the following environment variables are set in production:

```ini
PORT=5000
NODE_ENV=production

# MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/highp_prod?retryWrites=true&w=majority

# Cryptographic Secrets
JWT_SECRET=production_strong_secret_key_minimum_32_characters_random
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=production_refresh_token_strong_secret_key_random
JWT_REFRESH_EXPIRES_IN=7d

# URLs
API_URL=https://api.yourdomain.com
WEB_URL=https://app.yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_SOCKET_URL=https://api.yourdomain.com

# CORS Allowed Origins
CORS_ORIGIN=https://app.yourdomain.com
```

---

## 2. Deploying API & Realtime Server (Docker / PM2)

### Dockerfile for API
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY packages/ packages/
COPY apps/api/ apps/api/
RUN npm ci
RUN npm run build --workspace=packages/shared
RUN npm run build --workspace=apps/api

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/apps/api ./apps/api
EXPOSE 5000
CMD ["node", "apps/api/dist/server.js"]
```

---

## 3. Deploying Web Application (Vercel / Node)

Deploy `apps/web` directly to Vercel or containerize:
```bash
npm run build --workspace=apps/web
npm run start --workspace=apps/web
```

---

## 4. Distributing the Windows Desktop Agent

Package the Electron desktop agent into a Windows `.exe` / MSI installer:
```bash
cd apps/desktop-agent
npm run build
```
Distribute the resulting executable to employees. Once installed, employees log in with their corporate email credentials.
