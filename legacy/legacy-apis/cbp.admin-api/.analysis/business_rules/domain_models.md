---
type: business_rules
project: cbp.admin-api
created_date: 2025-01-02T21:14:39-07:00
last_updated: 2025-01-03T13:50:09-07:00
status: verified
verification:
  date: 2025-01-03T13:50:09-07:00
  evidence:
    - admin-api.json
    - CreditUnionService.cs
    - ExceptionService.cs
---

# CBP Admin API Domain Models

## Overview

This document defines the verified domain models and business rules within the CBP Admin API based on the actual implementation.

## Support Notification Domain

### Rules

```yaml
support_notification_rules:
  creation:
    - "Status code must be valid"
    - "Content cannot be empty"
    - "Start date must be before end date if both are provided"
    - "End date must be in the future if provided"
  
  update:
    - "Cannot update non-existent notification"
    - "Cannot modify content of deleted notification"
    - "Status transitions must be valid"
  
  deletion:
    - "Soft delete only - mark as deleted"
    - "Maintain audit trail"
```

## Credit Union Domain

### Rules

```yaml
credit_union_rules:
  creation:
    - "Sponsor ID must be unique"
    - "Routing number must be 9 digits"
    - "Name cannot be empty"
    - "Timezone must be valid IANA timezone"
    - "Initial status must be INITIAL"
  
  update:
    - "Cannot update non-existent credit union"
    - "Cannot modify routing number once set"
    - "Status transitions must follow state machine"
    - "Features can only be enabled/disabled by admin"
  
  status_transitions:
    INITIAL:
      - SETUP
      - INACTIVE
    SETUP:
      - ACTIVE
      - INACTIVE
    ACTIVE:
      - SUSPENDED
      - INACTIVE
    SUSPENDED:
      - ACTIVE
      - INACTIVE
    INACTIVE: []
```

## Exception Domain

### Rules

```yaml
exception_rules:
  creation:
    - "Payment ID must exist"
    - "Member ID must exist"
    - "Payee ID must exist"
    - "Amount must be positive"
    - "Initial status must be NEW"
    - "Error code must be valid"
  
  update:
    - "Cannot update non-existent exception"
    - "Status transitions must follow state machine"
    - "Resolution requires admin approval"
    - "Escalation requires reason"
  
  status_transitions:
    NEW:
      - IN_PROGRESS
      - RESOLVED
      - IGNORED
    IN_PROGRESS:
      - RESOLVED
      - ESCALATED
    ESCALATED:
      - IN_PROGRESS
      - RESOLVED
    RESOLVED: []
    IGNORED: []
```

## Audit Domain

### Rules

```yaml
audit_rules:
  creation:
    - "Entity type must be valid"
    - "Entity ID must exist"
    - "Action must be valid"
    - "Changes must be documented"
    - "User ID must be provided"
  
  query:
    - "Can filter by entity type"
    - "Can filter by entity ID"
    - "Can filter by date range"
    - "Can filter by user ID"
  
  retention:
    - "Audit records are immutable"
    - "Retain for minimum 7 years"
```

## References

- API Schema: `admin-api.json`
- Service Implementations:
  - `Services/Implementation/CreditUnionService.cs`
  - `Services/Implementation/ExceptionService.cs`
  - `Services/Implementation/NotificationService.cs`
