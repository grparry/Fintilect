# Payee API Migration

## Status: In Progress
Priority: High
Last Updated: 2024-12-28

## Current Mock Implementation

### Endpoints
```typescript
// Need to verify current payee-related implementations
```

### Mock Types
```typescript
interface Payee {
  payeeId: string;
  // Additional fields to be documented from current implementation
}
```

## Target API Specification

### Available Endpoints
```typescript
POST /api/v1/payee/fis-payee
POST /api/v1/payee/global/close
POST /api/v1/payee/account-number-reprocess
```

### Required Types
```typescript
interface FISPayeeRequest {
  // To be documented from API spec
}

interface GlobalPayeeCloseRequest {
  // To be documented from API spec
}

interface AccountNumberReprocessRequest {
  // To be documented from API spec
}
```

## Discrepancies
1. Endpoint Structure
   - API provides specific FIS-related operations
   - Need to verify against current payee handling

2. Operation Scope
   - API includes global payee operations
   - Account number reprocessing functionality

3. Integration Points
   - FIS integration requirements
   - Global payee system integration

## Migration Steps
- [ ] Document current payee handling
- [ ] Map all payee-related endpoints
- [ ] Create type definitions matching API spec
- [ ] Implement service layer changes
- [ ] Update payee management components
- [ ] Create/update MSW handlers
- [ ] Implement tests

## Affected Components
1. Payee Management
   - Payee creation/update forms
   - Payee listing components
   - Account number handling

2. Integration Components
   - FIS integration modules
   - Global payee handling
   - Account processing components

## Testing Requirements
- [ ] Test FIS payee operations
- [ ] Verify global payee management
- [ ] Test account number reprocessing
- [ ] Validate error handling
- [ ] Test integration points

## Dependencies
- FIS integration services
- Payee management services
- Account processing modules

## Notes
- Consider FIS API requirements
- Document global payee constraints
- Consider account number validation rules
- May need to implement retry logic
- Document error handling strategy
