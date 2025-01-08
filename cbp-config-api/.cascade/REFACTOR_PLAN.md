# Test Layer Refactoring Plan

> Status: In Progress  
> Last Updated: 2025-01-07T08:48:43-07:00

## File Changes by Phase

### Phase 1: Core Infrastructure 

1. `src/__tests__/integration/helpers/ResponseValidator.ts` (Update) 
   - [x] Enhance validation helpers for common patterns
   - [x] Add pagination validation
   - [x] Add SQL response validation
   - [x] Add error case validation
   - [x] Add timestamp validation with deactivatedAt support

2. `src/__tests__/integration/context/TestContext.ts` (Update) 
   - [x] Streamline mock tracking
   - [x] Add cleanup procedures
   - [x] Improve error reporting

3. `src/__tests__/integration/fixtures/mockData.ts` (Update) 
   - [x] Ensure consistent mock response patterns
   - [x] Add common error cases
   - [x] Update factory methods as needed
   - [x] Add proper type assertions

Note: Testing of Phase 1 components will be done after Phase 4 completion.

### Phase 2: Payment Service Migration 

1. `src/__tests__/services/payment.service.test.ts` 
   - [x] Replace Jest mocks with TestDb
   - [x] Update response validation
   - [x] Add pagination checks

2. `src/__tests__/integration/helpers/payment.helper.ts` 
   - [x] Update to use TestDb
   - [x] Add standard response handling
   - [x] Add pagination support

3. `src/services/payment.service.ts` 
   - [x] Update return types
   - [x] Add pagination support
   - [x] Standardize error handling

### Phase 3: Client Service Migration 

1. `src/__tests__/services/client.service.test.ts` 
   - [x] Convert to TestDb pattern
   - [x] Update response validation
   - [x] Verify pagination

2. `src/__tests__/integration/helpers/client.helper.ts` 
   - [x] Update to use TestDb
   - [x] Add standard response handling
   - [x] Add pagination support

3. `src/services/client.service.ts` 
   - [x] Update return types
   - [x] Add string IDs
   - [x] Add proper interfaces
   - [x] Add input validation
   - [x] Verify pagination
   - [x] Standardize error handling

### Phase 4: Remaining Services 

1. User Service Files
   - `src/__tests__/services/user.service.test.ts`
     - [x] Replace Jest mocks with TestDb
     - [x] Update listUsers to use pagination
     - [x] Update getUser to use standard response
     - [x] Update createUser to use standard response
     - [x] Update deleteUser to use standard response
     - [x] Add response validation for all methods
   
   - `src/__tests__/integration/helpers/user.helper.ts`
     - [x] Convert to TestDb pattern
     - [x] Add standard response handling
     - [x] Add pagination support for list operations
     - [x] Update mock data generation
   
   - `src/services/user.service.ts`
     - [x] Update listUsers return type to PaginatedResponse
     - [x] Update getUser return type to SqlResponse
     - [x] Update createUser return type to SqlResponse
     - [x] Update deleteUser return type to SqlResponse
     - [x] Standardize error handling

2. Payee Service Files
   - `src/__tests__/services/payee.service.test.ts`
     - [x] Replace Jest mocks with TestDb
     - [x] Update listPayees to use pagination
     - [x] Update getPayee to use standard response
     - [x] Update createPayee to use standard response
     - [x] Update deletePayee to use standard response
     - [x] Add response validation for all methods
   
   - `src/__tests__/integration/helpers/payee.helper.ts`
     - [x] Convert to TestDb pattern
     - [x] Add standard response handling
     - [x] Add pagination support for list operations
     - [x] Update mock data generation
   
   - `src/services/payee.service.ts`
     - [x] Update listPayees return type to PaginatedResponse
     - [x] Update getPayee return type to SqlResponse
     - [x] Update createPayee return type to SqlResponse
     - [x] Update deletePayee return type to SqlResponse
     - [x] Standardize error handling

3. Settings Service Files
   - `src/__tests__/services/settings.service.test.ts`
     - [x] Replace Jest mocks with TestDb
     - [x] Update getSettings to use standard response
     - [x] Update updateSettings to use standard response
     - [x] Update deleteSettings to use standard response
     - [x] Add response validation for all methods
   
   - `src/__tests__/integration/helpers/settings.helper.ts`
     - [x] Convert to TestDb pattern
     - [x] Add standard response handling
     - [x] Update mock data generation
     - [x] Add validation for nested settings objects
   
   - `src/services/settings.service.ts`
     - [x] Update getSettings return type to SqlResponse
     - [x] Update updateSettings return type to SqlResponse
     - [x] Update deleteSettings return type to SqlResponse
     - [x] Add validation for settings structure
     - [x] Standardize error handling

### Final Testing Phase

After completing all service migrations:

1. Test Infrastructure
   - [ ] Verify ResponseValidator with all services
   - [ ] Test TestContext cleanup with multiple services
   - [ ] Validate mock data consistency

2. Integration Tests
   - [ ] Run full test suite
   - [ ] Verify no test interdependencies
   - [ ] Check cleanup procedures

3. Performance
   - [ ] Measure test execution time
   - [ ] Optimize slow tests
   - [ ] Check memory usage

### Success Criteria

1. Code Quality
   - [x] Consistent patterns across services
   - [x] Proper type safety
   - [x] Standardized error handling
   - [x] No test interdependencies
     - Removed singleton pattern from TestContext
     - Added proper state isolation between tests
     - Improved cleanup and error handling
     - Added better debugging support

2. Test Reliability
   - [ ] All tests pass consistently
   - [ ] Clear error messages
   - [ ] Proper cleanup between tests
   - [ ] No false positives

3. Maintainability
   - [x] Reusable test helpers
   - [x] Clear test structure
   - [x] Documented patterns
   - [ ] Easy to add new tests

## Standard Implementation Patterns

### TestDb Usage
```typescript
// In test file
import { TestDb } from '../utils/TestDb';

describe('Service Tests', () => {
    let testDb: TestDb;
    
    beforeEach(() => {
        testDb = new TestDb();
    });

    it('should return paginated results', async () => {
        testDb.setMockResponse('GetItems', {
            recordset: items.map(i => ({ ...i, TotalCount: items.length })),
            recordsets: [],
            output: {},
            rowsAffected: [items.length]
        });
    });
});

### Response Types
```typescript
// In database.ts
export interface SqlResponse<T> {
    recordset: T[];
    recordsets: any[][];
    output: Record<string, any>;
    rowsAffected: number[];
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
    };
}

## Current Status

### Completed
- Phase 1: Core Infrastructure
- Phase 2: Payment Service Migration
- Phase 3: Client Service Migration
- Phase 4: Remaining Services

### In Progress
- Final Testing Phase

## Next Steps
1. Complete Final Testing Phase
2. Review and refine code

---

## Change Log
- 2025-01-07T08:48:43-07:00: Updated refactor plan to reflect completed tasks
- 2025-01-07T08:17:21-07:00: Updated refactor plan to reflect progress and adjust testing strategy
- 2025-01-06T21:23:12-07:00: Updated Phase 1 to include existing integration test files
- 2025-01-06T21:17:27-07:00: Added explicit file listing
- 2025-01-06T21:15:22-07:00: Added detailed checklists
- 2025-01-06T21:14:11-07:00: Initial plan creation
