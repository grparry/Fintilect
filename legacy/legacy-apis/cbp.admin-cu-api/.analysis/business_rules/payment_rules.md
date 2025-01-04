---
type: business_rules
project: cbp.admin-cu-api
created_date: 2025-01-02T21:28:27-07:00
last_updated: 2025-01-03T13:43:30-07:00
status: verified
verification:
  date: 2025-01-03T13:43:30-07:00
  evidence:
    - PaymentService.cs
    - PaymentController.cs
---

# CBP Admin CU API Payment Business Rules

## Overview

This document defines the verified business rules for payment management within the Credit Union Administrative API based on the actual implementation in PaymentService.cs and PaymentController.cs.

## Payment Management Rules

### Payment Activity

1. **Activity Retrieval**
   - Endpoint: `GetPaymentActivity`
   - Implementation: `PaymentService.GetPaymentActivity`
   - Rules:
     - Must provide valid date range
     - Must have appropriate permissions
     - Returns paginated results
     - Includes payment status history

2. **Pending Payments**
   - Endpoint: `GetPendingPayments`
   - Implementation: `PaymentService.GetPendingPayments`
   - Rules:
     - Only returns unprocessed payments
     - Must have appropriate permissions
     - Supports filtering by date range
     - Includes payment details and status

3. **Payment History**
   - Endpoints: 
     - `GetRecurringPaymentChangeHistory`
     - `GetScheduledPaymentChangeHistory`
   - Implementation:
     - `PaymentService.GetRecurringPaymentChangeHistory`
     - `PaymentService.GetScheduledPaymentChangeHistory`
   - Rules:
     - Must provide valid payment ID
     - Returns chronological history
     - Includes change details and user info

### Payment Operations

1. **Payment Reprocessing**
   - Endpoint: `ReprocessAsync`
   - Implementation: `PaymentService.ReprocessAsync`
   - Rules:
     - Must be a failed payment
     - Requires admin authorization
     - Creates audit log entry
     - Updates payment status

2. **Status Updates**
   - Endpoint: `UpdateStatusAsync`
   - Implementation: `PaymentService.UpdateStatusAsync`
   - Rules:
     - Valid status transition required
     - Creates audit log entry
     - Notifies relevant parties
     - Updates last modified timestamp

3. **Payment Editing**
   - Endpoint: `EditPayment`
   - Implementation: `PaymentService.EditPayment`
   - Rules:
     - Must be pending payment
     - Validates new payment details
     - Creates change history record
     - Updates payment information

4. **Payment Cancellation**
   - Endpoints:
     - `CancelPayment`
     - `CancelPaymentAndRefund`
   - Implementation:
     - `PaymentService.CancelPayment`
     - `PaymentService.CancelPaymentAndRefund`
   - Rules:
     - Must be cancellable status
     - Requires admin authorization
     - Creates audit log entry
     - Updates payment status
     - Processes refund if requested

## Service Dependencies

### Required Services
```yaml
dependencies:
  exception_service:
    type: IExceptionService
    rules:
      - Logs all exceptions
      - Handles error notifications
  
  calendar_provider:
    type: ICalendarProvider
    rules:
      - Validates processing dates
      - Considers holidays
      - Respects time zones
  
  notification_provider:
    type: INotificationProvider
    rules:
      - Sends status updates
      - Delivers confirmations
      - Handles error notifications
```

## References

- Implementation Files:
  - `Services/Implementation/PaymentService.cs`
  - `Controllers/PaymentController.cs`
  - `Services/Abstract/IPaymentService.cs`
- Dependencies:
  - See `dependencies` section above
