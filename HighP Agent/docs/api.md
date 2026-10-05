# REST API Reference

All requests must include `Content-Type: application/json`. Protected endpoints require `Authorization: Bearer <accessToken>`.

---

## Authentication
- `POST /api/auth/register`: Create company workspace & owner account
- `POST /api/auth/login`: Authenticate with email and password
- `POST /api/auth/refresh`: Refresh expired access token using refresh token
- `GET /api/auth/me`: Retrieve current user profile and company info
- `POST /api/auth/logout`: Invalidate session and revoke token

## Employees & Team
- `GET /api/employees`: List employees (filters: `department`, `status`, `search`)
- `GET /api/employees/:id`: Retrieve employee deep-dive details
- `POST /api/employees`: Create employee (Admin/Owner only)
- `PATCH /api/employees/:id`: Update employee details
- `DELETE /api/employees/:id`: Deactivate employee
- `GET /api/employees/overview`: Retrieve live metrics overview

## Attendance & Breaks
- `POST /api/attendance/start`: Start work session
- `POST /api/attendance/end`: End active work session
- `GET /api/attendance`: Query attendance sessions
- `POST /api/breaks/start`: Start break with reason (`LUNCH`, `COFFEE`, `MEETING`, etc.)
- `POST /api/breaks/end`: Resume active work session

## Activity & Application Telemetry
- `GET /api/activity/:employeeId/timeline`: Get chronological day activity timeline
- `GET /api/applications/usage`: Company-wide aggregated application analytics
- `GET /api/applications/usage/:employeeId`: Single employee application usage breakdown

## Reports
- `GET /api/reports/daily?date=YYYY-MM-DD[&exportCsv=true]`: Daily activity report
- `GET /api/reports/weekly?startDate=...&endDate=...[&exportCsv=true]`: Weekly report
- `GET /api/reports/monthly?year=...&month=...[&exportCsv=true]`: Monthly report

## Desktop Agent Gateway
- `POST /api/agent/register`: Register workstation device identifier
- `POST /api/agent/heartbeat`: Periodic heartbeat with status and current app
- `POST /api/agent/activity`: Real-time activity ingestion
- `POST /api/agent/sync`: Resilient batch sync of buffered offline events
- `GET /api/agent/configuration`: Retrieve company idle & heartbeat rules
- `POST /api/agent/session/start`: Start work from desktop client
- `POST /api/agent/session/end`: End work from desktop client

## Device Management
- `GET /api/devices`: View registered desktop devices
- `POST /api/devices/:id/revoke`: Revoke device access
