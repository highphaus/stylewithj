# Testing & Verification Guide

This document describes the testing strategy, test suites, and procedures for validating the Highphaus Workforce Platform.

---

## 1. Automated Test Suite

The platform utilizes **Vitest** for backend unit, integration, and security testing.

To run all automated test suites:
```powershell
npm run test
```

### Test Suites Included:
1. **Tenant Isolation & Security (`tests/tenant_isolation.test.ts`)**:
   - Ensures Company A can never access, modify, or delete Company B data.
   - Validates that cross-tenant queries return `404 Not Found`.
2. **Authentication & RBAC (`tests/auth_rbac.test.ts`)**:
   - Tests valid and invalid login flows, expired tokens, and rate limits.
   - Confirms that employees cannot access admin routes or view other employees' profiles.
3. **Session & Break Lifecycle (`tests/sessions_breaks.test.ts`)**:
   - Tests session initiation, pause, resumption, and completion.
   - Validates official break controls and prevents multiple overlapping breaks.
   - Tests agent heartbeat processing.
4. **Reports & CSV Export Security (`tests/reports_export.test.ts`)**:
   - Tests daily, weekly, and monthly report aggregations.
   - Verifies server-side CSV formatting and authorization checks on export endpoints.

---

## 2. End-to-End Acceptance Scenario

To perform manual or end-to-end verification:

1. **Start Backend & Frontend**: `npm run dev`
2. **Launch Windows Agent**: `npm run dev:agent`
3. **Login as Admin**: Navigate to `http://localhost:3000/login` (`admin@highphaus.com` / `Password@123`).
4. **Inspect Live Presence**: Verify the admin dashboard shows live cards for connected employees.
5. **Switch Applications**: Focus VS Code, Chrome, and Figma to observe instant foreground application transitions.
6. **Simulate Break**: In the tray, click **"Start Break (Lunch)"**; observe that the web dashboard status updates to `ON BREAK` instantly over WebSocket.
7. **Simulate Offline**: Disconnect internet or stop API; verify that the desktop agent continues recording in the local SQLite database.
8. **Reconnect**: Re-enable network; verify queued telemetry uploads with 0 duplicates.
