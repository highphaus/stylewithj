# Platform Troubleshooting & Operations Guide

This guide provides common operational troubleshooting procedures for administrators and employees.

---

## 1. Desktop Agent Issues

### Agent icon does not appear in taskbar
* **Cause**: Windows may hide new tray icons under the overflow caret (`^`).
* **Fix**: Click the `^` icon in the Windows taskbar and drag the Highphaus icon into the visible tray area.

### Agent shows "Disconnected / Offline"
* **Cause**: Network unreachable or backend API down.
* **Fix**:
  1. Check if `https://api.highphaus.com/api/health` returns `{"status":"ok"}`.
  2. Verify firewall allows outbound traffic on Port 443.
  3. Note: The desktop agent buffers all events in its local SQLite database and will automatically sync once connectivity is restored.

---

## 2. Backend & Database Issues

### MongoDB TLS Alert 80 (`openssl ssl alert number 80`)
* **Cause**: Atlas IP whitelist rejection or Windows IPv6 DNS resolution mismatch.
* **Fix**: Ensure `family: 4` is present in Mongoose connection options and verify that your public IP address is authorized in MongoDB Atlas Network Access.

### Realtime updates not showing on Manager Dashboard
* **Cause**: WebSocket connection blocked by corporate proxy or token expired.
* **Fix**:
  1. Check browser console for Socket.IO reconnect logs.
  2. Re-authenticate to refresh expired JWT token.

---

## 3. Reporting & Timezones

### Timestamps or daily summaries appear off by a few hours
* **Cause**: Timezone misconfiguration.
* **Fix**: Confirm that your company timezone is set correctly under `/dashboard/settings` (e.g., `Asia/Kolkata`, `UTC`, or `America/New_York`). The backend stores all timestamps in UTC and converts them based on the company's setting.
