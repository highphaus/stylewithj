# Local Development Workflow

Follow this guide to run the full stack locally.

---

## 1. Running the API Backend
From the root repository directory:
```bash
npm run dev:api
```
The API starts on `http://localhost:5000`. Socket.IO initializes on the same port.

## 2. Running the Web Application
In a separate terminal:
```bash
npm run dev:web
```
The Next.js web application is accessible at `http://localhost:3000`.

## 3. Running the Windows Desktop Agent
In a third terminal:
```bash
npm run dev:agent
```
An Electron application launches with a system tray icon.

## 4. Running the Complete Monorepo Test Suite
```bash
npm run test --workspace=apps/api
```
Tests run with an in-memory MongoDB server (`mongodb-memory-server`) to validate multi-tenant isolation, authorization, and idempotency.
