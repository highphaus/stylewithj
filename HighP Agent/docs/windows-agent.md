# Windows Desktop Agent Specification & Architecture

## Overview
The Highphaus Desktop Agent is an Electron + TypeScript native Windows application designed to run on internal staff workstations. It provides transparent, privacy-respecting work telemetry without invasive background spyware.

---

## 1. Operating System Integration (Win32 APIs)

### A. Foreground Application Tracking
- **APIs**: `GetForegroundWindow()` and `GetWindowThreadProcessId()` via Win32.
- **Data Captured**: Process executable name (e.g. `Code.exe`, `Figma.exe`, `slack.exe`, `chrome.exe`).
- **Privacy Rule**: Full window titles are **never captured or transmitted by default** to prevent exposing sensitive client document names, customer credentials, or private communication titles.

### B. User Idle Time Calculation
- **API**: `GetLastInputInfo()` via Win32.
- **Logic**: Compares `GetTickCount() - lastInputTime.dwTime` against company-configured idle threshold (default: 5 minutes / 300,000 ms).
- **Transitions**:
  - Continuous input -> `ACTIVE`
  - No input for $\ge 5$ minutes -> `IDLE`
  - Input resumes -> `ACTIVE` (transitions sent immediately).

---

## 2. Telemetry Ingestion & Throttling
The agent **never** spams the network on every 2-second sampling tick:
- **Local Sampling**: Ticks every 2 seconds to detect state transitions in memory.
- **Heartbeat (every 30s)**: Sends a lightweight packet to `/api/agent/heartbeat`.
- **Application Focus Changes**: Buffered locally into intervals and flushed during heartbeats or sync cycles.

---

## 3. Offline Resilience Architecture (SQLite Buffering)
- When offline or during network dropouts, events are stored locally in the SQLite queue with UUIDs (`eventId`).
- Upon reconnection, events are uploaded via `POST /api/agent/sync` in batches of 50.
- Duplicate event deduplication is enforced by MongoDB unique indexes on `{ eventId: 1 }`.
