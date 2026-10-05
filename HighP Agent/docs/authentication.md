# Authentication & Authorization Architecture

This document specifies the authentication protocols, cryptographic standards, and access control models implemented within the Highphaus Workforce Platform.

---

## 1. Cryptographic Standards

- **Password Storage**: Passwords are saved as one-way cryptographic hashes using `bcrypt` with automatic salting (cost factor 10).
- **Tokens**: JSON Web Tokens (JWT) signed via HMAC-SHA256.
  - **Access Tokens**: Short-lived (default 24h in production, 7d in development).
  - **Refresh Tokens**: Long-lived (30d), securely stored in the database and rotated upon re-issuance.
- **Payload Scoping**: Every JWT includes `{ userId, email, role, companyId, employeeProfileId }`.

---

## 2. Role-Based Access Control (RBAC)

The system enforces 4 hierarchical tiers:

```
[ OWNER ]  ── Full control over company, subscriptions, employees, devices, settings, audit logs
    │
[ ADMIN ]  ── Full team management, employee provisioning, device revocation, analytics, reports
    │
[ MANAGER ]── Team-level live presence, activity timelines, application statistics, CSV reports
    │
[ EMPLOYEE]── Self-service only: clock-in/out, breaks, own activity history, transparency page
```

### Authorization Middleware Rules:
1. `authenticateUser`: Validates the bearer token, checks account suspension status, and attaches `req.user` & `req.companyId`.
2. `enforceTenant`: Confirms that the requested tenant resource matches the user's authenticated `companyId`.
3. `requireRoles([UserRole...])`: Restricts privileged routes to authorized roles only.

---

## 3. Desktop Agent Device Enrollment Flow

```
1. Admin creates Employee in Web Portal
        │
2. Employee logs in and clicks "Enroll Device"
        │
3. Desktop Agent sends hardware fingerprint (hostname, OS, MAC, architecture)
        │
4. Server generates a scoped Device Record linked to companyId & employeeId
        │
5. Agent receives a dedicated Agent Token for periodic heartbeats and event synchronization
```

---

## 4. Revocation Protocols

- If an administrator revokes a device via `/dashboard/devices`, the backend marks the device status as `REVOKED`.
- On the next heartbeat or event sync attempt, the backend rejects the request with `403 Forbidden: Device has been revoked`.
- The desktop agent ceases tracking and displays an alert in the Windows system tray.
