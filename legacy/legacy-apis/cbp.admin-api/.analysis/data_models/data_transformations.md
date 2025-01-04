---
type: data_model
project: cbp.admin-api
created_date: 2025-01-02T21:20:37-07:00
last_updated: 2025-01-03T13:50:09-07:00
status: verified
verification:
  date: 2025-01-03T13:50:09-07:00
  evidence:
    - admin-api.json
    - CreditUnionService.cs
    - ExceptionService.cs
---

# CBP Admin API Data Transformations

## Overview

This document defines the verified data transformations within the CBP Admin API based on the actual implementation in the services and API schema.

## Support Notification Models

### Create Request
```yaml
SupportNotificationCreateRequest:
  type: object
  properties:
    statusCode:
      type: string
      required: true
    content:
      type: string
      required: true
    startDate:
      type: string
      format: date-time
    endDate:
      type: string
      format: date-time
```

### Update Request
```yaml
SupportNotificationUpdateRequest:
  type: object
  properties:
    id:
      type: string
      format: uuid
      required: true
    statusCode:
      type: string
      required: true
    content:
      type: string
      required: true
    startDate:
      type: string
      format: date-time
    endDate:
      type: string
      format: date-time
```

### Response Model
```yaml
SupportNotificationResponse:
  type: object
  properties:
    id:
      type: string
      format: uuid
    statusCode:
      type: string
    content:
      type: string
    startDate:
      type: string
      format: date-time
    endDate:
      type: string
      format: date-time
    createdAt:
      type: string
      format: date-time
    updatedAt:
      type: string
      format: date-time
```

## Credit Union Models

### Add Request
```yaml
CreditUnionAddRequest:
  type: object
  properties:
    sponsorId:
      type: string
      required: true
    name:
      type: string
      required: true
    routingNumber:
      type: string
      required: true
      pattern: '^[0-9]{9}$'
    timezone:
      type: string
      required: true
    features:
      type: object
      properties:
        enableBillPay:
          type: boolean
        enableP2P:
          type: boolean
```

### Update Request
```yaml
CreditUnionUpdateRequest:
  type: object
  properties:
    sponsorId:
      type: string
      required: true
    name:
      type: string
    timezone:
      type: string
    features:
      type: object
      properties:
        enableBillPay:
          type: boolean
        enableP2P:
          type: boolean
```

### Response Model
```yaml
CreditUnionResponse:
  type: object
  properties:
    sponsorId:
      type: string
    name:
      type: string
    routingNumber:
      type: string
    timezone:
      type: string
    status:
      type: string
      enum: [INITIAL, SETUP, ACTIVE, SUSPENDED, INACTIVE]
    features:
      type: object
      properties:
        enableBillPay:
          type: boolean
        enableP2P:
          type: boolean
    createdAt:
      type: string
      format: date-time
    updatedAt:
      type: string
      format: date-time
```

## Exception Models

### Exception Record
```yaml
PaymentException:
  type: object
  properties:
    id:
      type: integer
    paymentId:
      type: string
    memberId:
      type: string
    payeeId:
      type: string
    amount:
      type: number
      format: decimal
    processDate:
      type: string
      format: date-time
    status:
      type: string
      enum: [NEW, IN_PROGRESS, ESCALATED, RESOLVED, IGNORED]
    errorCode:
      type: string
    errorMessage:
      type: string
    createdAt:
      type: string
      format: date-time
    updatedAt:
      type: string
      format: date-time
```

## References

- API Schema: `admin-api.json`
- Service Implementations:
  - `Services/Implementation/CreditUnionService.cs`
  - `Services/Implementation/ExceptionService.cs`
  - `Services/Implementation/NotificationService.cs`
