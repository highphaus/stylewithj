# Database Architecture & Indexing

HighP Agent uses MongoDB / MongoDB Atlas with schema modeling via Mongoose.

---

## Data Models

### 1. `Company`
```typescript
{
  _id: ObjectId,
  name: string,
  slug: string, // Unique index
  ownerId: ObjectId,
  config: {
    idleThresholdMinutes: number, // default 5
    heartbeatIntervalSeconds: number, // default 30
    offlineSyncBatchLimit: number,
    retentionDays: number,
    allowManualBreaks: boolean,
    appCategories: Array<{ name: string, color: string, apps: string[] }>
  },
  createdAt: Date,
  updatedAt: Date
}
```

### 2. `User`
```typescript
{
  _id: ObjectId,
  email: string, // Unique index
  passwordHash: string, // bcrypt hashed, excluded from default queries
  firstName: string,
  lastName: string,
  role: 'OWNER' | 'ADMIN' | 'MANAGER' | 'EMPLOYEE',
  companyId: ObjectId, // Indexed
  employeeProfileId?: ObjectId,
  status: 'ACTIVE' | 'INACTIVE' | 'INVITED' | 'SUSPENDED',
  refreshToken?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. `EmployeeProfile`
```typescript
{
  _id: ObjectId,
  companyId: ObjectId, // Indexed
  userId: ObjectId, // Unique index
  employeeCode: string, // Unique within company
  department: string,
  designation: string,
  managerId?: ObjectId,
  currentSessionId?: ObjectId,
  currentDeviceId?: ObjectId,
  currentStatus: 'ACTIVE' | 'IDLE' | 'BREAK' | 'OFFLINE',
  currentApplication?: string,
  lastActiveAt?: Date,
  lastHeartbeatAt?: Date,
  todayActiveSeconds: number,
  todayIdleSeconds: number,
  todayBreakSeconds: number,
  lastDateReset?: string // "YYYY-MM-DD"
}
```

### 4. `AttendanceSession`
```typescript
{
  _id: ObjectId,
  companyId: ObjectId,
  employeeId: ObjectId,
  deviceId?: ObjectId,
  startedAt: Date,
  endedAt?: Date,
  activeSeconds: number,
  idleSeconds: number,
  breakSeconds: number,
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'AUTO_TERMINATED',
  endReason?: string
}
```

### 5. `ActivityEvent`
```typescript
{
  _id: ObjectId,
  eventId: string, // Client UUID for idempotent sync
  companyId: ObjectId,
  employeeId: ObjectId,
  sessionId: ObjectId,
  deviceId?: ObjectId,
  type: 'APPLICATION_FOCUS' | 'IDLE_INTERVAL' | 'SYSTEM_LOCK',
  applicationName: string,
  processName?: string,
  startedAt: Date,
  endedAt: Date,
  durationSeconds: number,
  createdAt: Date
}
```

### 6. `ApplicationUsage`
```typescript
{
  _id: ObjectId,
  companyId: ObjectId,
  employeeId: ObjectId,
  date: string, // "YYYY-MM-DD"
  applicationName: string,
  category: string,
  totalSeconds: number,
  lastUsedAt: Date
}
```

---

## Indexing Strategy

- **Tenant isolation indexes**: `{ companyId: 1, employeeId: 1 }`
- **Idempotent activity deduplication**: `{ companyId: 1, eventId: 1 }` (unique)
- **Aggregated usage rapid lookup**: `{ companyId: 1, employeeId: 1, date: 1, applicationName: 1 }` (unique)
- **Historical timeline sorting**: `{ companyId: 1, employeeId: 1, startedAt: -1 }`
- **Device tracking**: `{ companyId: 1, deviceId: 1 }` (unique)
