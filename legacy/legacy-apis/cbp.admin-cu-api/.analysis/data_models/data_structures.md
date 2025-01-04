---
type: data_model
project: cbp.admin-cu-api
created_date: 2025-01-02T21:28:27-07:00
last_updated: 2025-01-03T13:43:30-07:00
status: verified
verification:
  date: 2025-01-03T13:43:30-07:00
  evidence:
    - admin-cu-api.json
    - PaymentService.cs
    - PayeeService.cs
---

# CBP Admin CU API Data Structures

## Overview

This document defines the verified data structures used within the Credit Union Administrative API based on the actual API schema and service implementations.

## Payment Data Models

### Payment Information
```yaml
PaymentInformation:
  type: object
  properties:
    paymentId:
      type: string
    memberId:
      type: string
    sponsorId:
      type: string
    payeeId:
      type: string
    payeeName:
      type: string
    amount:
      type: number
      format: decimal
    processDate:
      type: string
      format: date-time
```

### Payment Activity
```yaml
PaymentActivity:
  type: object
  properties:
    paymentId:
      type: string
    memberId:
      type: string
    payeeId:
      type: string
    payeeName:
      type: string
    amount:
      type: number
      format: decimal
    processDate:
      type: string
      format: date-time
    status:
      type: string
```

### Large Payment
```yaml
LargePayment:
  type: object
  properties:
    paymentId:
      type: string
    memberId:
      type: string
    payeeId:
      type: string
    payeeName:
      type: string
    amount:
      type: number
      format: decimal
    processDate:
      type: string
      format: date-time
```

## Repository Models

### Generic Repositories
```yaml
repositories:
  payment:
    type: ICuGenericRepository<Payment>
    operations:
      - GetScheduledPaymentChangeHistory
      - GetRecurringPaymentChangeHistory
      - GetPendingPaymentsAsync
      - GetPaymentActivity
  
  global_payee:
    type: IWarehouseGenericRepository<GlobalPayee>
    operations:
      - GetAsync
      - UpdateAsync
  
  user_payee:
    type: ICuGenericRepository<UserPayeeList>
    operations:
      - GetAsync
      - UpdateAsync
  
  institution:
    type: ICuGenericRepository<InstitutionInfo>
    operations:
      - GetAsync
      - UpdateAsync
  
  customer:
    type: ICuGenericRepository<CustomerInfo>
    operations:
      - GetAsync
      - UpdateAsync
  
  personal_payee:
    type: ICuGenericRepository<PersonalPayee>
    operations:
      - GetAsync
      - UpdateAsync
```

## Service Dependencies

### Required Services
```yaml
services:
  exception:
    type: IExceptionService
    operations:
      - HandleException
      - LogException
  
  calendar:
    type: ICalendarProvider
    operations:
      - GetNextValidRunDay
      - IsValidRunDay
  
  notification:
    type: INotificationProvider
    operations:
      - SendNotification
      - SendConfirmation
```

## References

- API Schema: `admin-cu-api.json`
- Service Implementations:
  - `Services/Implementation/PaymentService.cs`
  - `Services/Implementation/PayeeService.cs`
  - `Services/Abstract/IPaymentService.cs`
  - `Services/Abstract/IPayeeService.cs`
