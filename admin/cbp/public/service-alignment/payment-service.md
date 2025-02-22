# Payment Service API Alignment

## Service Usage Context
This service is used in the admin CBP application for managing payments, primarily in the `ManagePayments` component. It handles:
- Viewing pending payments
- Payment approvals and rejections
- Payment history

## Current TypeScript Implementation vs Admin CU API

### TypeScript Endpoints vs C# Endpoints
```typescript
// TypeScript Implementation                  // C# Admin CU API Equivalent
POST /payment/change-history            -> POST /api/v1/payment/change-history
POST /payment/recurring/change-history  -> POST /api/v1/payment/recurring/change-history
POST /payment/pending                   -> POST /api/v1/payment/pending
POST /payment/pending-payments          -> POST /api/v1/payment/pending-payments
POST /payment/activity                  -> POST /api/v1/payment/activity
POST /payment/reprocess                 -> POST /api/v1/payment/reprocess
```

### TypeScript Types vs C# Types
```typescript
// Current TypeScript Types
interface ScheduledPaymentChangeHistoryReportRequest {
    paymentId: string;
}

interface RecurringPaymentChangeHistoryReportRequest {
    paymentId: string;
}

interface PendingPaymentsRequest {
    status: PaymentStatus[];
    method: PaymentMethod;
    startDate: string;
    endDate: string;
    pageNumber: number;
    pageSize: number;
}

interface PendingPaymentSearchRequest {
    status: PaymentStatus[];
    method: PaymentMethod;
    startDate: string;
    endDate: string;
    searchTerm: string;
}

interface PaymentActivityRequest {
    clientId: string;
    dateRange: DateRange;
}

interface PaymentReprocessRequest {
    paymentId: string;
}

// C# API Types
interface ScheduledPaymentChangeHistoryReportRequest {
    paymentId: string;
}

interface RecurringPaymentChangeHistoryReportRequest {
    paymentId: string;
}

interface PendingPaymentsRequest {
    status: PaymentStatus[];
    method: PaymentMethod;
    startDate: string;
    endDate: string;
    pageNumber: number;
    pageSize: number;
}

interface PendingPaymentSearchRequest {
    status: PaymentStatus[];
    method: PaymentMethod;
    startDate: string;
    endDate: string;
    searchTerm: string;
}

interface PaymentActivityRequest {
    clientId: string;
    dateRange: DateRange;
}

interface PaymentReprocessRequest {
    paymentId: string;
}
```

## Implementation Plan

### 1. Update Service Factory - Completed
- Add support for multiple API base URLs in ServiceFactory
- Update BaseService to handle different base URLs

### 2. Move Features to Client-Side
- Compute summary from pending-payments data
- Handle export using pending-payments data
- Implement bulk operations using multiple status calls

### 3. Align Types with C# Implementation
- Update TypeScript types to match C# request/response types
- Verify type changes against API schema files

### 4. Implementation Example
```typescript
// Payment Service Implementation
class PaymentService {
  private static instance: PaymentService;

  // Use ServiceFactory to get appropriate service instances
  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  // Current:  POST /payment/change-history
  async getPaymentHistory(request: ScheduledPaymentChangeHistoryReportRequest): Promise<PaymentHistory> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    return service.post('/payment/change-history', request);
  }

  // Current:  POST /payment/recurring/change-history
  async getRecurringPaymentHistory(request: RecurringPaymentChangeHistoryReportRequest): Promise<PaymentHistory> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    return service.post('/payment/recurring/change-history', request);
  }

  // Current:  POST /payment/pending
  async getPendingPayments(request: PendingPaymentsRequest): Promise<PaginatedResponse<PendingPayment>> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    return service.post('/payment/pending', request);
  }

  // Current:  POST /payment/pending-payments
  async getPendingPaymentsList(request: PendingPaymentSearchRequest): Promise<PaginatedResponse<PendingPayment>> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    return service.post('/payment/pending-payments', request);
  }

  // Current:  POST /payment/activity
  async getPaymentActivity(request: PaymentActivityRequest): Promise<PaymentActivityListResponse> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    return service.post('/payment/activity', request);
  }

  // Current:  POST /payment/reprocess
  async reprocessPayment(request: PaymentReprocessRequest): Promise<void> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    return service.post('/payment/reprocess', request);
  }
}
```

## New Service Alignment Document for Payment Service

### C# Implementation (Source of Truth)

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

## TypeScript Implementation Requirements

### Required Types
```typescript
interface ScheduledPaymentChangeHistoryReportRequest {
    paymentId: string;
}

interface RecurringPaymentChangeHistoryReportRequest {
    paymentId: string;
}

interface PendingPaymentsRequest {
    status: PaymentStatus[];
    method: PaymentMethod;
    startDate: string;
    endDate: string;
    pageNumber: number;
    pageSize: number;
}

interface PendingPaymentSearchRequest {
    status: PaymentStatus[];
    method: PaymentMethod;
    startDate: string;
    endDate: string;
    searchTerm: string;
}

interface PaymentActivityRequest {
    clientId: string;
    dateRange: DateRange;
}

interface PaymentReprocessRequest {
    paymentId: string;
}
```

### Required Service Methods
```typescript
interface IPaymentService {
    // Get scheduled payment history
    getPaymentHistory(request: ScheduledPaymentChangeHistoryReportRequest): Promise<PaymentHistory>;
    
    // Get recurring payment history
    getRecurringPaymentHistory(request: RecurringPaymentChangeHistoryReportRequest): Promise<PaymentHistory>;
    
    // Get pending payments by date
    getPendingPayments(request: PendingPaymentsRequest): Promise<PaginatedResponse<PendingPayment>>;
    
    // Get pending payments with search
    getPendingPaymentsList(request: PendingPaymentSearchRequest): Promise<PaginatedResponse<PendingPayment>>;
    
    // Get payment activity
    getPaymentActivity(request: PaymentActivityRequest): Promise<PaymentActivityListResponse>;
    
    // Reprocess payment
    reprocessPayment(request: PaymentReprocessRequest): Promise<void>;
}
```

## Implementation Notes

1. API Structure
   - Follow C# endpoint structure exactly
   - Use POST for all endpoints as defined in C#
   - Maintain consistent request/response patterns

2. Type Alignment
   - TypeScript types must match C# models
   - Follow C# property names and types
   - Ensure consistent validation rules

3. Service Layer
   - Implement all C# endpoints in TypeScript
   - Match C# functionality exactly
   - No additional endpoints or features
