# Credit Union API Migration

## Status: In Progress
Priority: High
Last Updated: 2024-12-28

## Current Mock Implementation

### Endpoints
```typescript
// Need to verify current mock implementations in:
// - src/services/
// - src/mocks/handlers/
```

### Mock Types
```typescript
// To be documented from current implementation
```

## Target API Specification

### Available Endpoints
```typescript
GET /api/v1/creditunion/all
POST /api/v1/payment/change-history
POST /api/v1/payment/recurring/change-history
POST /api/v1/payment/pending
POST /api/v1/payment/pending-payments
```

### Required Types
```typescript
interface PendingPaymentsRequest {
  // To be documented from API spec
}

interface PaymentChangeHistoryResponse {
  // To be documented from API spec
}

interface PendingPaymentListResponse {
  // To be documented from API spec
}
```

## Discrepancies
1. Endpoint Structure
   - API uses specific payment-related endpoints
   - Need to verify current mock implementation structure

2. Data Flow
   - API separates regular and recurring payment histories
   - May need to update UI to handle this separation

3. Response Formats
   - Need to verify response format compatibility
   - May need response adapters

## Migration Steps
- [ ] Document current mock implementations
- [ ] Map all credit union related endpoints
- [ ] Create type definitions matching API spec
- [ ] Implement service layer changes
- [ ] Update affected components
- [ ] Create/update MSW handlers
- [ ] Implement tests

## Affected Components
1. Credit Union Management
   - Components using credit union data
   - Payment history displays
   - Pending payment lists

2. Payment Processing
   - Regular payment components
   - Recurring payment components
   - Payment history views

## Testing Requirements
- [ ] Test all payment-related endpoints
- [ ] Verify payment history retrieval
- [ ] Test pending payment operations
- [ ] Validate error handling
- [ ] Test pagination if applicable

## Dependencies
- Payment processing services
- Credit union type definitions
- Payment history components

## Notes
- Consider implementing caching for frequently accessed data
- May need to handle pagination
- Consider rate limiting requirements
- Document any required authentication changes
