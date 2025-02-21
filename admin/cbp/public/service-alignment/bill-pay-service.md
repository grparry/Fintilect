# Service API Alignment

## Current TypeScript Implementation
### Base URL
```typescript
// From PaymentService.ts
basePath: string = '/api/v1/payment'
```

### Endpoints Called
```typescript
// PaymentService.ts
getPendingPayments(request: PendingPaymentSearchRequest): Promise<PendingPaymentListResponse>
approvePayment(paymentId: string): Promise<void>
rejectPayment(paymentId: string, reason: string): Promise<void>
bulkApprove(paymentIds: string[]): Promise<boolean>
bulkReject(paymentIds: string[]): Promise<boolean>
getPaymentHistory(paymentId: string): Promise<PaymentHistory>
```

### TypeScript Types Used
```typescript
// From bill-pay.types.ts
interface PendingPaymentSearchRequest {
  date?: string;
  endDate?: string;
  paymentId?: string;
  memberId?: string;
}

interface PendingPaymentResponse {
  id: string;
  userPayeeListId: string;
  fundingAccount: string;
  amount: number;
  statusCode: number;
  friendlyName?: string;
  memo?: string;
  willProcessDate: string;
  recurringPaymentId?: string;
  suspended: boolean;
  usersAccountAtPayee?: string;
  nameOnAccount?: string;
  payeeId: string;
  fisPayeeId?: string;
  payeeName: string;
  payeeType?: string;
  paymentMethod?: string;
  numPayments?: number;
  paymentsProcessed?: number;
  frequency?: number;
  memberId: string;
  source?: string;
  deliveryDate?: string;
}

interface PendingPaymentListResponse {
  PendingPayments: PendingPaymentResponse[];
}
```

## C# Implementation
### Controller Location
```csharp
// legacy/legacy-apis/cbp.admin-cu-api/ConnectBillPay.AdminCuApi/Controllers/PaymentController.cs
```

### Available Endpoints
```csharp
[HttpPost("change-history")] GetScheduledPaymentChangeHistory
[HttpPost("recurring/change-history")] GetRecurringPaymentChangeHistory
[HttpPost("pending")] GetPendingPaymentsByDate
[HttpPost("pending-payments")] GetPendingPayments
[HttpPost("activity")] GetPaymentActivity
[HttpPost("reprocess")] Reprocess
```

### C# Types
```csharp
// Requests/Payment/PendingPaymentSearchRequest.cs
public class PendingPaymentSearchRequest {
    public DateTime? Date { get; set; }
    public DateTime? EndDate { get; set; }
    public string PaymentId { get; set; }
    public string MemberId { get; set; }
}

// Responses/Payment/PendingPaymentResponse.cs
public class PendingPaymentResponse {
    public string Id { get; set; }
    public string UserPayeeListId { get; set; }
    public string FundingAccount { get; set; }
    public int Amount { get; set; }
    public int StatusCode { get; set; }
    public string FriendlyName { get; set; }
    public string Memo { get; set; }
    public DateTime WillProcessDate { get; set; }
    public string RecurringPaymentId { get; set; }
    public bool Suspended { get; set; }
    public string UsersAccountAtPayee { get; set; }
    public string NameOnAccount { get; set; }
    public string PayeeID { get; set; }
    public string FisPayeeId { get; set; }
    public string PayeeName { get; set; }
    public string PayeeType { get; set; }
    public string PaymentMethod { get; set; }
    public short? NumPayments { get; set; }
    public short? PaymentsProcessed { get; set; }
    public int? Frequency { get; set; }
    public string MemberId { get; set; }
    public string Source { get; set; }
    public DateTime? DeliveryDate { get; set; }
}

// Responses/Payment/PendingPaymentListResponse.cs
public class PendingPaymentListResponse {
    public List<PendingPaymentResponse> PendingPayments { get; set; }
}
```

## Endpoint Alignment Analysis

### Current TypeScript Service Endpoints vs C# Controller Endpoints

| TypeScript Endpoint | C# Endpoint | Status | Notes |
|-------------------|-------------|--------|-------|
| getPendingPayments | [POST] pending-payments | ✅ Aligned | Used for fetching pending payments with search criteria |
| approvePayment | [POST] status | ⚠️ Partial | TypeScript hardcodes StatusCode to PENDING_APPROVAL |
| rejectPayment | [POST] status | ⚠️ Partial | TypeScript hardcodes StatusCode to REJECTED |
| bulkApprove | ❌ Missing | ❌ Missing | No corresponding C# endpoint for bulk approval |
| bulkReject | ❌ Missing | ❌ Missing | No corresponding C# endpoint for bulk rejection |
| getPaymentHistory | ❌ Missing | ❌ Missing | No direct endpoint, might need to use change-history |

### Missing C# Endpoints in TypeScript

1. Change History Endpoints:
   - [POST] change-history (GetScheduledPaymentChangeHistory)
   - [POST] recurring/change-history (GetRecurringPaymentChangeHistory)

2. Payment Management:
   - [POST] pending (GetPendingPaymentsByDate)
   - [POST] activity (GetPaymentActivity)
   - [POST] reprocess (Reprocess)
   - [POST] confirmation (SendConfirmationSummary)
   - [PUT] {paymentId} (EditPayment)
   - [DELETE] {paymentId} (CancelPayment)
   - [POST] cancel-payment-refund (CancelPaymentAndRefund)

### Critical Misalignments

1. Status Updates:
   - TypeScript uses hardcoded status values in approvePayment/rejectPayment
   - C# expects a generic status update endpoint with flexible status codes
   - Solution: Update TypeScript to use the generic status update pattern

2. Bulk Operations:
   - TypeScript implements bulk approve/reject that don't exist in C#
   - Need to either:
     a) Remove bulk operations from TypeScript
     b) Implement bulk endpoints in C#
     c) Implement bulk operations as client-side loops over single operations

3. Payment History:
   - TypeScript tries to fetch history from a non-existent endpoint
   - Should use the change-history endpoints instead
   - Need to align the response types with C# implementation

### Action Items

1. High Priority:
   - Remove or properly implement bulk operations
   - Fix payment history endpoint usage
   - Align status update implementations

2. Medium Priority:
   - Add missing payment management endpoints
   - Implement proper error handling for all endpoints
   - Add proper TypeScript types for all C# request/response models

3. Low Priority:
   - Add documentation for all endpoints
   - Implement proper validation matching C# side
   - Add proper error mapping between C# and TypeScript

### Questions for Implementation

1. Bulk Operations:
   - Should we keep the bulk operations in TypeScript?
   - If yes, should we implement them in C# or handle them client-side?

2. Status Updates:
   - Should we keep the specialized approve/reject methods?
   - Should we expose the generic status update instead?

3. History Implementation:
   - Which history endpoint should we use for the current getPaymentHistory calls?
   - Do we need to implement both scheduled and recurring payment history?

4. Error Handling:
   - Should we standardize error responses between C# and TypeScript?
   - How should we handle C# status codes in TypeScript?

## Gaps and Actions Needed
### Missing Endpoints
- TypeScript is missing implementation for `GetScheduledPaymentChangeHistory`
- TypeScript is missing implementation for `GetRecurringPaymentChangeHistory`
- TypeScript is missing implementation for `GetPaymentActivity`
- TypeScript is missing implementation for `Reprocess`

### Type Mismatches
1. DateTime vs string:
   - C# uses `DateTime?` for dates while TypeScript uses string
   - Need to ensure proper date formatting in TypeScript (ISO format)

2. Case Sensitivity:
   - C# uses PascalCase for property names (e.g., `PayeeID`)
   - TypeScript uses camelCase (e.g., `payeeId`)
   - Need to ensure consistent casing in API responses

3. Numeric Types:
   - C# uses specific numeric types (`int`, `short?`)
   - TypeScript uses generic `number`
   - Need to ensure proper number range validation

### Suggested Changes
1. Update TypeScript types to match C# PascalCase for API responses:
   ```typescript
   interface PendingPaymentResponse {
     Id: string;
     UserPayeeListId: string;
     // ... rest of properties in PascalCase
   }
   ```

2. Add proper date handling in TypeScript service:
   ```typescript
   const request = {
     Date: date?.toISOString(),
     EndDate: endDate?.toISOString(),
     // ...
   };
   ```

3. Add missing endpoint implementations in PaymentService.ts

## Questions for Team Discussion
1. Should we implement the missing endpoints in TypeScript?
2. Do we need to standardize on case convention (PascalCase vs camelCase)?
3. Should we add runtime type checking for numeric ranges?
4. Do we need to implement all C# endpoints or only the ones currently used by the frontend?
