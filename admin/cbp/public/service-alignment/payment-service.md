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
GET /api/v1/payments/pending              -> POST /api/v1/payment/pending-payments
GET /api/v1/payments/pending/summary      -> [Remove - compute client-side from pending-payments data]
GET /api/v1/payments/pending/export       -> [Remove - handle export client-side from pending-payments data]
POST /api/v1/payments/pending/{id}/approve -> POST /api/v1/payment/status (with status=APPROVED)
POST /api/v1/payments/pending/{id}/reject  -> POST /api/v1/payment/status (with status=REJECTED)
POST /api/v1/payments/pending/bulk-approve -> [Handle with multiple /status calls]
POST /api/v1/payments/pending/bulk-reject  -> [Handle with multiple /status calls]
GET /api/v1/payments/pending/{id}/history  -> POST /api/v1/payment/change-history
```

### TypeScript Types vs C# Types
```typescript
// Current TypeScript Types
interface PendingPaymentSearchRequest {
  status?: PaymentStatus[];
  method?: PaymentMethod;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

interface PendingPaymentSummary {
  byMethod: Record<PaymentMethod, { count: number; amount: number }>;
  byStatus: Record<PaymentStatus, number>;
  byPriority: Record<Priority, number>;
}

interface PaymentHistory {
  id: string;
  changes: PaymentStatusChange[];
}

// C# API Types
interface PendingPaymentsRequest {
  status: PaymentStatus[];
  method: PaymentMethod;
  startDate: string;
  endDate: string;
  pageNumber: number;  // Note: renamed from page
  pageSize: number;    // Note: renamed from limit
}

interface PaymentUpdateStatusRequest {
  paymentId: string;
  status: PaymentStatus;
}

interface ScheduledPaymentChangeHistoryReportRequest {
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

  // Current:  GET /api/v1/payments/pending
  async getPendingPayments(request: PendingPaymentsRequest): Promise<PaginatedResponse<PendingPayment>> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    return service.post('/payment/pending-payments', request);
  }

  // Current:  GET /api/v1/payments/pending/summary
  getPendingPaymentsSummary(payments: PendingPayment[]): PendingPaymentSummary {
    return {
      byMethod: groupBy(payments, 'method'),
      byStatus: groupBy(payments, 'status'),
      byPriority: groupBy(payments, 'priority')
    };
  }

  // Current:  GET /api/v1/payments/pending/export
  exportPendingPayments(payments: PendingPayment[]): void {
    const csv = convertToCSV(payments);
    downloadCSV(csv, 'pending-payments.csv');
  }

  // Current:  POST /api/v1/payments/pending/{id}/approve
  async approvePayment(id: string): Promise<void> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    return service.post('/payment/status', { 
      paymentId: id, 
      status: PaymentStatus.APPROVED 
    });
  }

  // Current:  POST /api/v1/payments/pending/{id}/reject
  async rejectPayment(id: string): Promise<void> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    return service.post('/payment/status', { 
      paymentId: id, 
      status: PaymentStatus.REJECTED 
    });
  }

  // Current:  POST /api/v1/payments/pending/bulk-approve
  async bulkApprove(paymentIds: string[]): Promise<boolean> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    const results = await Promise.all(
      paymentIds.map(id => service.post('/payment/status', {
        paymentId: id,
        status: PaymentStatus.APPROVED
      }))
    );
    return results.every(r => r);
  }

  // Current:  POST /api/v1/payments/pending/bulk-reject
  async bulkReject(paymentIds: string[]): Promise<boolean> {
    const service = ServiceFactory.getAdminCuService(BaseService);
    const results = await Promise.all(
      paymentIds.map(id => service.post('/payment/status', {
        paymentId: id,
        status: PaymentStatus.REJECTED
      }))
    );
    return results.every(r => r);
  }

  // Current:  GET /api/v1/payments/pending/{id}/history
  async getPaymentHistory(paymentId: string): Promise<PaymentHistory> {
    const service = ServiceFactory.getAdminService(BaseService);
    return service.post('/payment/change-history', { paymentId });
  }
}
```
