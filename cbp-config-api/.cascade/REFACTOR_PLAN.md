# Test Layer Refactoring Plan

> Status: In Progress  
> Last Updated: 2025-01-06T21:23:12-07:00

## File Changes by Phase

### Phase 1: Core Infrastructure
1. `src/__tests__/utils/TestDb.ts` (New File)
   - [ ] Create TestDb class
   - [ ] Add mock response handling
   - [ ] Add response validation
   - [ ] Add error simulation
   - [ ] Add transaction support

2. `src/__tests__/utils/ResponseValidator.ts` (New File)
   - [ ] Create validation helpers
   - [ ] Add pagination validation
   - [ ] Add SQL response validation

3. `src/types/database.ts` (New File)
   - [ ] Add SqlResponse interface
   - [ ] Add PaginatedResponse interface
   - [ ] Add error types

4. `src/__tests__/integration/context/TestContext.ts` (Update)
   - [ ] Update to use new TestDb
   - [ ] Add response validation
   - [ ] Update mock tracking
   - [ ] Add cleanup procedures
   - [ ] Add transaction support

5. `src/__tests__/integration/fixtures/mockData.ts` (Update)
   - [ ] Update mock data structures
   - [ ] Add pagination support
   - [ ] Add SQL response wrapping
   - [ ] Update factory methods
   - [ ] Add new mock types

6. `src/__tests__/integration/helpers/ResponseValidator.ts` (Update)
   - [ ] Update validation rules
   - [ ] Add pagination checks
   - [ ] Add SQL response validation
   - [ ] Add error validation

### Phase 2: Payment Service Migration
1. `src/__tests__/services/payment.service.test.ts`
   - [ ] Replace Jest mocks with TestDb
   - [ ] Update response validation
   - [ ] Add pagination checks

2. `src/__tests__/integration/helpers/payment.helper.ts`
   - [ ] Update to use TestDb
   - [ ] Add standard response handling
   - [ ] Add pagination support

3. `src/services/payment.service.ts`
   - [ ] Update return types
   - [ ] Add pagination support
   - [ ] Standardize error handling

### Phase 3: Client Service Migration
1. `src/__tests__/services/client.service.test.ts`
   - [ ] Convert to TestDb pattern
   - [ ] Update response validation
   - [ ] Verify pagination

2. `src/__tests__/integration/helpers/client.helper.ts`
   - [ ] Update to use TestDb
   - [ ] Add standard response handling
   - [ ] Add pagination support

3. `src/services/client.service.ts`
   - [ ] Update return types
   - [ ] Verify pagination
   - [ ] Standardize error handling

### Phase 4: Remaining Services

1. User Service Files
   - `src/__tests__/services/user.service.test.ts`
     - [ ] Replace Jest mocks with TestDb
     - [ ] Update listUsers to use pagination
     - [ ] Update getUser to use standard response
     - [ ] Update createUser to use standard response
     - [ ] Update deleteUser to use standard response
     - [ ] Add response validation for all methods
   
   - `src/__tests__/integration/helpers/user.helper.ts`
     - [ ] Convert to TestDb pattern
     - [ ] Add standard response handling
     - [ ] Add pagination support for list operations
     - [ ] Update mock data generation
   
   - `src/services/user.service.ts`
     - [ ] Update listUsers return type to PaginatedResponse
     - [ ] Update getUser return type to SqlResponse
     - [ ] Update createUser return type to SqlResponse
     - [ ] Update deleteUser return type to SqlResponse
     - [ ] Standardize error handling

2. Payee Service Files
   - `src/__tests__/services/payee.service.test.ts`
     - [ ] Replace Jest mocks with TestDb
     - [ ] Update listPayees to use pagination
     - [ ] Update getPayee to use standard response
     - [ ] Update createPayee to use standard response
     - [ ] Update deletePayee to use standard response
     - [ ] Add response validation for all methods
   
   - `src/__tests__/integration/helpers/payee.helper.ts`
     - [ ] Convert to TestDb pattern
     - [ ] Add standard response handling
     - [ ] Add pagination support for list operations
     - [ ] Update mock data generation
   
   - `src/services/payee.service.ts`
     - [ ] Update listPayees return type to PaginatedResponse
     - [ ] Update getPayee return type to SqlResponse
     - [ ] Update createPayee return type to SqlResponse
     - [ ] Update deletePayee return type to SqlResponse
     - [ ] Standardize error handling

3. Settings Service Files
   - `src/__tests__/services/settings.service.test.ts`
     - [ ] Replace Jest mocks with TestDb
     - [ ] Update getSettings to use standard response
     - [ ] Update updateSettings to use standard response
     - [ ] Update deleteSettings to use standard response
     - [ ] Add response validation for all methods
   
   - `src/__tests__/integration/helpers/settings.helper.ts`
     - [ ] Convert to TestDb pattern
     - [ ] Add standard response handling
     - [ ] Update mock data generation
     - [ ] Add validation for nested settings objects
   
   - `src/services/settings.service.ts`
     - [ ] Update getSettings return type to SqlResponse
     - [ ] Update updateSettings return type to SqlResponse
     - [ ] Update deleteSettings return type to SqlResponse
     - [ ] Add validation for settings structure
     - [ ] Standardize error handling

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
```

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
```

## Current Status

### Completed
- None

### In Progress
- Phase 1: Core Infrastructure

### Pending
- Phase 2: Payment Service Migration
- Phase 3: Client Service Migration
- Phase 4: Remaining Services

## Next Steps
1. Create TestDb.ts
2. Create ResponseValidator.ts
3. Create database.ts types

---

## Change Log
- 2025-01-06T21:23:12-07:00: Updated Phase 1 to include existing integration test files
- 2025-01-06T21:17:27-07:00: Added explicit file listing
- 2025-01-06T21:15:22-07:00: Added detailed checklists
- 2025-01-06T21:14:11-07:00: Initial plan creation
