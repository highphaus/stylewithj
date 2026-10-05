# Security Architecture & Authorization

## 1. Multi-Tenant Isolation
The Highphaus Platform enforces strict tenant isolation at the database, service, and routing layers:
- Every query includes `{ companyId: req.companyId }`.
- Route middleware `enforceTenant` rejects any cross-tenant request or mismatched object IDs.
- Automated tests in `backend/tests/tenant_isolation.test.ts` verify that Company A cannot read or mutate Company B's data under any circumstance.

## 2. Authentication & Cryptography
- **Password Hashing**: Salted BCrypt (10 rounds).
- **Session Tokens**: JWT (JSON Web Tokens) with distinct access token (`8h`) and refresh token (`30d`) secret rotations.
- **Header Protections**: Helmet security headers, CORS origin verification with 24-hour preflight caching.
- **Input Validation**: Centralized Zod schema validation across all request bodies, route parameters, and query parameters.

## 3. Device Revocation & Enrollment
- Devices register via `POST /api/agent/register` and receive a verified device ID.
- Administrators can revoke compromised or lost devices with 1-click in `/dashboard/devices`.
- Revoked devices are denied on all subsequent heartbeat and sync requests with HTTP 403 Forbidden.

## 4. Audit Logging
Administrative actions (employee updates, device revocations, configuration changes) are recorded immutably in the `AuditLog` collection. Passwords, JWT secrets, and tokens are strictly excluded from audit payloads.
