# Payment Processing API Migration

## Status: In Progress
Priority: High
Last Updated: 2024-12-28

## Current Mock Implementation

### Endpoints
```typescript
// Need to verify current implementations in:
// - src/services/payments.service.ts
// - src/services/manual-payments.service.ts
```

### Mock Types
```typescript
interface Payment {
  // To be documented from current implementation
}

interface ManualPayment {
  // To be documented from current implementation
}
```

## Target API Specification

### Available Endpoints
```typescript
POST /api/v1/payment/confirmation
POST /api/v1/payment/pending
POST /api/v1/payment/pending-payments
```

### Required Types
```typescript
interface PaymentConfirmationRequest {
  // To be documented from API spec
}

interface PendingPaymentSearchRequest {
  // To be documented from API spec
}

interface PendingPaymentListResponse {
  // To be documented from API spec
}
```

## Discrepancies
1. Payment Processing Flow
   - API provides specific confirmation endpoint
   - Need to verify current payment flow

2. Pending Payments
   - API includes pending payment management
   - May need to update payment status handling

3. Payment Confirmation
   - API requires specific confirmation process
   - Need to verify current confirmation flow

## Migration Steps
- [ ] Document current payment processing
- [ ] Map all payment-related endpoints
- [ ] Create type definitions matching API spec
- [ ] Implement service layer changes
- [ ] Update payment processing components
- [ ] Create/update MSW handlers
- [ ] Implement tests

## Affected Components
1. Payment Processing
   - Payment creation forms
   - Payment confirmation UI
   - Payment status displays

2. Pending Payments
   - Pending payment lists
   - Payment approval flows
   - Status management UI

## Testing Requirements
- [ ] Test payment creation
- [ ] Verify confirmation flow
- [ ] Test pending payment management
- [ ] Validate error handling
- [ ] Test payment status updates

## Dependencies
- Payment processing services
- Status management services
- Confirmation handling components

## Notes
- Consider implementing payment validation
- Document confirmation requirements
- Consider status transition rules
- May need retry handling
- Document payment constraints
