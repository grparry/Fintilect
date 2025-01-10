# Types Reference Upgrade Plan (2025-01)

## Overview
After completing the component layer updates, we need to address compilation errors in our mock and testing infrastructure. The type system upgrade has revealed several misalignments between our mocks, tests, and the updated service layer types.

### Current State
- Component layer updates are complete
- Service layer types have been updated
- Mock type verification complete (2025-01-10)
- Remaining compilation errors in hooks and tests

## 1. Mock and Hook Compilation Fixes

### Phase 1: Mock Type Alignment 
- [x] Fix Mock Type Definitions
  - [x] Align existing mock types with service interfaces (verified 2025-01-10)
  - [x] Update enum usage in mocks (PaymentStatus, NotificationType) (verified 2025-01-10)
  - [x] Fix mock data structure mismatches (verified 2025-01-10)

- [x] Correct Mock Response Types
  - [x] Update MSW handler response types (verified 2025-01-10)
  - [x] Fix API response type mismatches (verified 2025-01-10)
  - [x] Align mock data with expected service types (verified 2025-01-10)

### Phase 2: Hook Type Fixes
- [ ] Resolve Hook Type Issues
  - [ ] Fix useStats and other hook type errors
  - [ ] Correct hook return type mismatches
  - [ ] Update generic type constraints

- [ ] Update Hook Dependencies
  - [ ] Fix service type imports in hooks
  - [ ] Correct state management types
  - [ ] Align hook parameters with service types

### Phase 3: Test Updates
- [ ] Fix Test Type Issues
  - [ ] Update existing test utilities
  - [ ] Fix mock data usage in tests
  - [ ] Correct service mock types

- [ ] Resolve Test Compilation Errors
  - [ ] Fix component test type errors
  - [ ] Update service test types
  - [ ] Correct test utility types

### Phase 4: Verification
- [ ] Compilation Checks
  - [ ] Verify all mocks compile
  - [ ] Ensure hooks compile
  - [ ] Confirm tests compile

- [ ] Document Changes
  - [ ] List type fixes applied
  - [ ] Note any breaking changes
  - [ ] Update type usage examples

## Files Requiring Updates

### Mock Files 
- [x] `/src/mocks/bill-pay/dashboard.ts` (verified 2025-01-10)
- [x] `/src/mocks/emerge-admin/member-dashboard.ts` (verified 2025-01-10)
- [x] `/src/mocks/handlers/billPayHandlers.ts` (verified 2025-01-10)
- [x] `/src/mocks/handlers/paymentHandlers.ts` (verified 2025-01-10)

### Hook Files
- [ ] `/src/hooks/useStats.ts`
- [ ] `/src/hooks/useAuth.ts`

### Test Files
- [ ] `/src/services/__tests__/bill-pay.service.test.ts`
- [ ] `/src/services/__tests__/fis-exceptions.service.test.ts`
- [ ] `/src/services/__tests__/payments.service.test.ts`
- [ ] `/src/services/__tests__/pending-payments.service.test.ts`

## Progress Tracking
- Started: 2025-01-10
- Mock verification completed: 2025-01-10
- Target Completion: 2025-01-12
