# Highphaus Workforce Platform — Production MVP
### Internal Attendance & Workstation Activity Telemetry System

Highphaus Workforce Platform is an internal multi-role workforce activity, attendance, and application monitoring platform built for **Highphaus Creative Digital Marketing Agency** (`www.highphaus.com`).

---

## 🛡️ Core Product Philosophy & Privacy Boundary

The platform strictly isolates work telemetry from invasive surveillance.

### ✅ What We Monitor:
- **Foreground Application Identity & Duration**: Active focus time in development tools, communication apps, browsers, and design suites (Figma, VS Code, Slack, Chrome, Notion, SEO tools).
- **Active / Idle States**: Precision OS-level user interaction tracking via Windows `GetLastInputInfo`.
- **Work Sessions & Breaks**: Work session timestamps and explicit employee breaks (Lunch, Coffee, Meeting, Personal).
- **Device Health & Connectivity**: Workstation hostname, agent version, heartbeat latency, and offline event synchronization.

### ❌ Strictly Prohibited & Technical Non-Goals:
- **NO Keystroke Logging**
- **NO Password or Form Harvesting**
- **NO Screen Capture or Secret Recordings**
- **NO Webcam or Microphone Surveillance**
- **NO Private Message Scraping**
- **NO Covert OS Bypasses or Hidden Daemons**

Employees have full visibility into their tracked status, active duration, and application focus via their own personal dashboard and desktop agent tray interface.

---

## 🏗️ Monorepo Structure

```
HighP Agent/
├── frontend/          # Next.js 14 App Router, Tailwind CSS, Lucide, Charts, Socket.IO Client
├── backend/           # Node.js, Express, TypeScript, Mongoose, Socket.IO, JWT Auth, RBAC
├── desktop-agent/     # Electron, TypeScript, Windows Win32 API, Offline SQLite Queue
├── shared/            # Shared DTOs, Enums, Zod Schemas, Type Contracts, Constants
├── docs/              # Comprehensive Architecture, Database, API, Agent, Security & Privacy Guides
├── .env.example
├── package.json       # Monorepo Workspaces Configuration
└── README.md
```

---

## 🚀 Standard Commands

| Command | Action |
|---|---|
| `npm run dev` | Runs Backend API + Frontend Web Portal simultaneously |
| `npm run dev:web` | Runs Next.js Web App (`http://localhost:3000`) |
| `npm run dev:api` | Runs Express & Socket.IO API Server (`http://localhost:5000`) |
| `npm run dev:agent` | Runs Windows Desktop Electron Agent in System Tray |
| `npm run build` | Builds all monorepo packages |
| `npm run build:agent` | Packages Windows Desktop Agent Installer |
| `npm run test` | Runs vitest automated test suite |
| `npm run typecheck` | Typechecks all workspaces |
| `npm run seed` | Seeds Highphaus team credentials |

---

## 🔑 Pre-Seeded Team Credentials (Development)

- **Admin / Founder**: `admin@highphaus.com` / `Password@123`
- **Operations Director**: `manager@highphaus.com` / `Password@123`
- **Lead Developer**: `alex@highphaus.com` / `Password@123`
- **Senior UI/UX Designer**: `maya@highphaus.com` / `Password@123`
- **Growth Marketing & SEO Lead**: `rohan@highphaus.com` / `Password@123`

---

## 📄 Documentation Index
- [Architecture & Telemetry Flow](file:///docs/architecture.md)
- [Database Collections & Indexes](file:///docs/database.md)
- [REST API Reference](file:///docs/api.md)
- [Windows Desktop Agent Specification](file:///docs/windows-agent.md)
- [Security Architecture & Tenant Isolation](file:///docs/security.md)
- [Workplace Privacy & Transparency Charter](file:///docs/privacy.md)
- [Production Deployment Guide](file:///docs/deployment.md)
- [Enterprise Agent Deployment Guide](file:///docs/enterprise-agent-deployment.md)
