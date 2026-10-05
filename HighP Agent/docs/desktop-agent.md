# Windows Desktop Agent Architecture

The HighP Desktop Agent is built with Electron and TypeScript, designed specifically for Windows 10/11 workstations.

---

## 1. Foreground Window Detection

The agent polls the active foreground window every 2 seconds without invasive global hooks. It executes a targeted Win32 call:
- `GetForegroundWindow()` retrieves the handle of the active top-level window.
- `GetWindowThreadProcessId()` retrieves the process ID.
- `Get-Process` resolves the executable name (e.g. `Code.exe` -> `VS Code`, `chrome.exe` -> `Google Chrome`).

---

## 2. Idle State Detection

The agent computes the elapsed time since the user's last keyboard or mouse input:
- Queries `GetLastInputInfo()` from `user32.dll`.
- Compares `GetTickCount() - plii.dwTime`.
- If `idleSeconds >= company.idleThresholdMinutes * 60`, the agent transitions from `ACTIVE` to `IDLE` and accumulates idle seconds.
- Upon new user input, state immediately flips back to `ACTIVE`.

---

## 3. Resilient Offline Buffer & Idempotent Sync

When an employee works offline (flight, power outage, disconnected Wi-Fi):
1. The agent buffers completed application events into a local JSON store in `app.getPath('userData')/highp-offline-events.json`.
2. Each event is tagged with a client-generated UUID (`eventId`).
3. An exponential backoff loop continuously checks backend reachability.
4. When online connectivity resumes, buffered events are submitted in batches to `/api/agent/sync`.
5. The backend guarantees deduplication via unique compound index `{ companyId: 1, eventId: 1 }`. Duplicate events return HTTP 200 without double-counting duration.

---

## 4. Building the Windows Installer

To compile and package the desktop agent for distribution:
```bash
cd apps/desktop-agent
npm run build
```
The compiled output is placed in `apps/desktop-agent/dist/`.
