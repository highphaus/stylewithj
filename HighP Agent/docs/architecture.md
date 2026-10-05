# System Architecture & Design

HighP Agent is designed as a distributed, multi-tenant enterprise monitoring architecture optimized for real-time presence and high-throughput offline-buffered telemetry.

---

## High-Level Topology

```
┌────────────────────────────────────────────────────────┐
│               Windows Desktop Agent                    │
│  (Electron + PowerShell Win32 API + Offline Buffer)    │
└──────────────────────────┬─────────────────────────────┘
                           │
                 HTTPS / REST + Socket.IO
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                   API Gateway Layer                    │
│      (Express + Helmet + CORS + Rate Limiter)          │
└──────────────────────────┬─────────────────────────────┘
                           │
         ┌─────────────────┴──────────────────┐
         │                                    │
         ▼                                    ▼
┌─────────────────────────┐        ┌─────────────────────────┐
│  Multi-Tenant Scoping   │        │     Real-Time Engine    │
│    (Tenant Middleware)  │        │   (Socket.IO Rooms)     │
└────────────┬────────────┘        └────────────┬────────────┘
             │                                  │
             ▼                                  ▼
┌─────────────────────────┐        ┌─────────────────────────┐
│     MongoDB Cluster     │        │   Manager Web Dashboard │
│  (Aggregated Analytics) │        │ (Next.js 14 App Router) │
└─────────────────────────┘        └─────────────────────────┘
```

---

## 1. Multi-Tenant Data Isolation

- Every database model (except global system metadata) contains an indexed `companyId: ObjectId`.
- All incoming requests must bear a valid JWT signed with the workspace tenant identifier.
- The `enforceTenant` middleware strips any client-provided `companyId` body overrides and ensures queries are strictly bounded to `req.user.companyId`.
- Cross-tenant queries are prevented at the database query layer and validated with comprehensive automated test suites.

---

## 2. Telemetry Ingestion & Aggregation Strategy

High-frequency telemetry (e.g. active window focus, 2-second polling, 30-second heartbeats) can overwhelm traditional document stores if every event is permanently retained.

HighP Agent employs a tiered storage design:
1. **In-Memory Presence Cache & Heartbeat Pipeline**:
   - Heartbeats update active employee presence status and increment daily active/idle counters in place.
   - Socket.IO broadcasts `employee:status_changed` to connected manager dashboards in real time.
2. **Raw Activity Events**:
   - Stored with unique client UUIDs (`eventId`) to guarantee idempotency during offline queue recovery.
3. **Daily Application Usage Aggregation (`ApplicationUsage`)**:
   - Upserted incrementally per `(companyId, employeeId, date, applicationName)` to allow sub-millisecond dashboard and analytics retrieval without full table scans.

---

## 3. Stale Session Reaper

If an employee's machine loses power or internet without gracefully ending work:
- The backend background reaper detects employees in `ACTIVE` or `IDLE` state with `lastHeartbeatAt` older than 3x the configured heartbeat cadence.
- The reaper automatically transitions them to `OFFLINE` and notifies the manager dashboard via Socket.IO.
