---
type: consolidated_data_models
created_date: 2025-01-02T21:42:43-07:00
status: active
source_apis:
  - cbp.api
  - cbp.admin-api
  - cbp.admin-cu-api
---

# Consolidated Data Models for New Node.js API

## Core Entities

### 1. Member
- memberId (PK)
- status
- createdDate
- modifiedDate
- memberType
- preferences
- securitySettings

### 2. FundingAccount
- accountId (PK)
- memberId (FK)
- accountType
- status
- validationStatus
- createdDate
- modifiedDate
- lastUsedDate

### 3. Payee
- internalPayeeId (PK)
- payeeName
- status
- payeeType
- validationStatus
- createdDate
- modifiedDate

### 4. UserPayeeList
- userPayeeListId (PK)
- memberId (FK)
- internalPayeeId (FK)
- nickname
- status
- createdDate
- modifiedDate

### 5. Payment
- paymentId (PK)
- userPayeeListId (FK)
- memberId (FK)
- fundingAccountId (FK)
- amount
- status
- processDate
- deliveryDate
- createdDate
- modifiedDate
- paymentType
- recurringScheduleId (FK, optional)

### 6. RecurringSchedule
- scheduleId (PK)
- frequency
- startDate
- endDate
- numPayments
- remainingPayments
- status
- createdDate
- modifiedDate

### 7. PaymentHistory
- historyId (PK)
- paymentId (FK)
- status
- timestamp
- notes
- errorCode
- errorDetails

### 8. AdminRole
- roleId (PK)
- roleName
- permissions
- createdDate
- modifiedDate

### 9. AdminUser
- adminUserId (PK)
- roleId (FK)
- username
- status
- lastLoginDate
- createdDate
- modifiedDate

### 10. AuditLog
- auditId (PK)
- entityType
- entityId
- action
- timestamp
- adminUserId (FK, optional)
- memberId (FK, optional)
- details

## Key Relationships

1. Member to FundingAccount (1:M)
2. Member to UserPayeeList (1:M)
3. Payee to UserPayeeList (1:M)
4. UserPayeeList to Payment (1:M)
5. Payment to RecurringSchedule (M:1)
6. Payment to PaymentHistory (1:M)
7. AdminRole to AdminUser (1:M)

## Required Indexes

1. Member lookup by status
2. Payment lookup by status and date
3. UserPayeeList compound index (memberId, payeeId)
4. Payment search by date range
5. Audit log search by entity and action
6. Payment history by status
7. Admin user lookup by username

## Data Integrity Rules

1. Cascade delete restrictions
2. Foreign key constraints
3. Status value constraints
4. Date range validations
5. Amount range validations
6. Unique constraint enforcement

## Audit Requirements

1. Track all status changes
2. Log all administrative actions
3. Record payment state transitions
4. Track account modifications
5. Log security events
6. Monitor role changes

## Migration Considerations

1. Data type mappings
2. Legacy ID preservation
3. Historical data retention
4. Index rebuilding
5. Constraint validation
6. Audit trail continuity
