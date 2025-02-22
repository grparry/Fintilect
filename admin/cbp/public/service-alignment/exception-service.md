# Exception Service API Alignment

## Current TypeScript Implementation

### Base URL
```typescript
// From ExceptionService.ts
api/v1/exception
```

### Endpoints Called
```typescript
// IExceptionService interface
GET    /exception/{date}            - Get exceptions for a given date
POST   /exception/refund           - Refund a payment
```

### TypeScript Types Used
```typescript
interface PaymentException {
  id: string;
  paymentId: string;
  date: string;
  status: string;
  errorCode: string;
  errorMessage: string;
}

interface ExceptionRefundRequest {
  paymentId: string;
  exceptionId: string;
}

interface ExceptionRefundResponse {
  success: boolean;
  message?: string;
}
```

## C# Implementation

### Controller Location
```csharp
// ExceptionController found in:
legacy/legacy-apis/cbp.admin-cu-api/ConnectBillPay.AdminCuApi/Controllers/ExceptionController.cs
```

### Available Endpoints
```csharp
GET    /api/v1/exception/{date}      - Get exceptions for a given date
POST   /api/v1/exception/refund      - Refund a payment
```

### C# Types
```csharp
// Request/Response types in:
// - Requests.Exception.ExceptionRefundRequest
// - Responses.Exception.ExceptionRefundResponse
// - Responses.Exception.PaymentExceptionListResponse
```

## Type Alignment Needed

1. Response Types
   - Ensure PaymentExceptionListResponse matches TypeScript expectations
   - Verify error code and status enums match

2. Request Types
   - Align ExceptionRefundRequest fields
   - Validate date format handling

## Questions for Team Discussion

1. Exception Management
   - Confirm daily exception processing workflow
   - Verify refund process requirements

2. Data Requirements
   - Required fields for exception records
   - Date handling preferences (UTC/local)

3. Integration Points
   - Exception to payment relationship
   - Refund processing flow
