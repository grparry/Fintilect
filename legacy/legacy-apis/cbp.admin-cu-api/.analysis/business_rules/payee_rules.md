---
type: business_rules
project: cbp.admin-cu-api
created_date: 2025-01-02T21:28:27-07:00
last_updated: 2025-01-03T13:43:30-07:00
status: verified
verification:
  date: 2025-01-03T13:43:30-07:00
  evidence:
    - PayeeService.cs
    - PayeeController.cs
---

# CBP Admin CU API Payee Business Rules

## Overview

This document defines the verified business rules for payee management within the Credit Union Administrative API based on the actual implementation in PayeeService.cs and PayeeController.cs.

## Payee Management Rules

### Global Payee Operations

1. **Global Payee Closure**
   - Endpoint: `POST /api/v1/payee/global/close`
   - Implementation: `PayeeService.CloseGlobalPayee`
   - Rules:
     - Must have admin authorization
     - No active payments allowed
     - Creates audit log entry
     - Updates payee status

2. **Payee Copy Operations**
   - Endpoint: `POST /api/v1/payee/copy-payees`
   - Implementation: `PayeeService.CopyPayees`
   - Rules:
     - Source payee must exist
     - Target must be valid
     - Maintains relationships
     - Creates audit records

### User Payee Operations

1. **Account Number Management**
   - Endpoints:
     - `POST /api/v1/payee/user/account-number`
     - `POST /api/v1/payee/account-number-reprocess`
     - `POST /api/v1/payee/account-number-refund`
   - Implementation:
     - `PayeeService.UpdateAccountNumber`
     - `PayeeService.ReprocessAccountNumber`
     - `PayeeService.RefundAccountNumber`
   - Rules:
     - Validates account format
     - Requires authorization
     - Updates related records
     - Creates audit entries

2. **FIS Payee Management**
   - Endpoints:
     - `POST /api/v1/payee/user/fis-payee-id`
     - `POST /api/v1/payee/user/fis-payee-refund`
   - Implementation:
     - `PayeeService.UpdateFisPayeeId`
     - `PayeeService.ProcessFisPayeeRefund`
   - Rules:
     - Validates FIS ID format
     - Requires authorization
     - Updates related records
     - Creates audit entries

3. **Change History**
   - Endpoints:
     - `POST /api/v1/payee/user/change-history`
     - `POST /api/v1/payee/global/change-history`
   - Implementation:
     - `PayeeService.GetUserPayeeChangeHistory`
     - `PayeeService.GetGlobalPayeeChangeHistory`
   - Rules:
     - Returns chronological history
     - Includes all modifications
     - Shows user information
     - Supports filtering

4. **Exception Handling**
   - Endpoint: `POST /api/v1/payee/manual-exception-reprocess`
   - Implementation: `PayeeService.ReprocessException`
   - Rules:
     - Requires admin rights
     - Validates exception state
     - Creates audit record
     - Updates status

## Service Dependencies

### Required Services
```yaml
dependencies:
  exception_service:
    type: IExceptionService
    rules:
      - Logs all exceptions
      - Handles error notifications
  
  audit_service:
    type: IAuditService
    rules:
      - Records all changes
      - Maintains history
      - Tracks user actions
  
  notification_service:
    type: INotificationService
    rules:
      - Sends status updates
      - Delivers confirmations
      - Handles error notifications
```

## References

- Implementation Files:
  - `Services/Implementation/PayeeService.cs`
  - `Controllers/PayeeController.cs`
  - `Services/Abstract/IPayeeService.cs`
- Dependencies:
  - See `dependencies` section above
