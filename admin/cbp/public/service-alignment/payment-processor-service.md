# Payment Processor Service API Alignment

## Current TypeScript Implementation

### Base URL
```typescript
// From PaymentProcessorService.ts
api/v1/payments
```

### Endpoints Called
```typescript
// Transaction Processing
POST   /payments/process         - Process single payment
POST   /payments/validate       - Validate payment before processing

// Transaction Management
GET    /payments/:id            - Get transaction by ID
GET    /payments/search         - Search transactions with filters

// Payment Activity
GET    /payments/activity       - Get payment activity
GET    /payments/pending        - Get pending payments
GET    /payments/history        - Get payment history
```

### TypeScript Types Used
```typescript
interface PaymentTransaction {
  id: string;
  status: PaymentStatus;
  method: PaymentMethod;
  type: PaymentType;
  priority: PaymentPriority;
  amount: number;
  payeeId: string;
  clientId: string;
  scheduledDate: string;
  processedDate?: string;
  error?: ProcessingError;
}

interface ProcessingError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

interface PaymentValidation {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}

interface ProcessorConfig {
  retryAttempts: number;
  processingWindow: {
    start: string;
    end: string;
  };
}
```

## C# Implementation

### Controller Location
```csharp
// PaymentController found in:
legacy/legacy-apis/cbp.admin-cu-api/ConnectBillPay.AdminCuApi/Controllers/PaymentController.cs
```

### Available Endpoints
```csharp
// Payment History
POST   /api/v1/payment/change-history            - Get scheduled payment history
POST   /api/v1/payment/recurring/change-history  - Get recurring payment history

// Payment Management
POST   /api/v1/payment/pending                   - Get pending payments by date
POST   /api/v1/payment/pending-payments          - Get pending payments
POST   /api/v1/payment/activity                  - Get payment activity
POST   /api/v1/payment/reprocess                 - Reprocess payment
```

### C# Types
```csharp
// Request/Response types in:
// - Requests.Payment.ScheduledPaymentChangeHistoryReportRequest
// - Requests.Payment.RecurringPaymentChangeHistoryReportRequest
// - Requests.Payment.PendingPaymentsRequest
// - Requests.Payment.PendingPaymentSearchRequest
// - Requests.Payment.PaymentActivityRequest
// - Requests.Payment.PaymentReprocessRequest
```

## Implementation Gaps

1. Transaction Processing
   - C# lacks dedicated processing endpoint
   - Missing validation endpoint
   - Different reprocessing approaches

2. Payment Management
   - C# focuses on history and activity
   - TypeScript expects transaction-level control
   - Different approaches to pending payments

3. Configuration
   - TypeScript expects processor configuration
   - C# implementation unclear about config
   - Need to verify processing rules

## Questions for Team Discussion

1. Processing Requirements
   - How is payment processing handled?
   - What validation rules exist?
   - How to handle reprocessing?

2. Payment Management
   - How to handle payment lifecycle?
   - What activity data is important?
   - How to track processing status?

3. Configuration Needs
   - What processing rules exist?
   - How to handle retries?
   - What are the processing windows?
