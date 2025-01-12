# Service Layer and Mock Data Refactoring Plan

## Overview
This plan outlines the steps to refactor the service layer and mock data implementation to improve maintainability, reduce duplication, and ensure type safety.

## Phase 1: Service Interface Definition
Create interfaces for all services to ensure consistent implementation between real and mock services.

### Type Management Guidelines
1. Interface Requirements:
   - All interfaces MUST import types from `/src/types` directory
   - Focus solely on service contracts without type definitions
   - Extend IBaseService for common functionality
   - Use TypeScript strict mode for type safety

2. Type Organization:
   - Common types in `types/common.types.ts`
   - Service-specific types in respective type files
   - Request/Response types in dedicated type files
   - Shared utility types in `types/utils.ts`

3. Type Import Rules:
   - No duplicate type definitions in interfaces
   - Import only required types
   - Use type aliases for complex types
   - Maintain clear type hierarchy

### Files to Create/Modify:
- [x] `src/services/interfaces/IBaseService.ts`
  - Define common service interface patterns
  - Add error handling and response types
  - Add pagination support types

- [x] `src/services/interfaces/IAuthService.ts`
  - Define authentication operations
  - Add session management
  - Include token handling

- [x] `src/services/interfaces/IClientService.ts`
  - Define client management operations
  - Include CRUD operations
  - Add specialized client operations
  - Remove ApiResponse wrapper
  - Add comprehensive client management
  - Update type imports

- [x] `src/services/interfaces/IUserService.ts`
  - Define user management operations
  - Include authentication methods
  - Add user group operations

- [x] `src/services/interfaces/ISecurityService.ts`
  - Define security and permission operations
  - Add audit log methods
  - Include security settings operations

- [x] `src/services/interfaces/IBillPayService.ts`
  - Define bill pay operations
  - Include payment processing methods
  - Add configuration management

- [x] `src/services/interfaces/INotificationService.ts`
  - Define notification operations
  - Include template management
  - Add notification sending methods

- [x] `src/services/interfaces/IExceptionService.ts`
  - Define exception handling operations
  - Include FIS exception methods
  - Add resolution tracking

- [x] `src/services/interfaces/IPayeeService.ts`
  - Define payee management operations
  - Include validation methods
  - Add conversion functionality

- [x] `src/services/interfaces/IPaymentProcessorService.ts`
  - Define payment processor operations
  - Include transaction handling
  - Add payment status tracking

- [x] `src/services/interfaces/IReportService.ts`
  - Define reporting operations
  - Include export functionality
  - Add report generation methods

- [x] `src/services/interfaces/IHolidayService.ts`
  - Define holiday management using bill-pay.types.ts
  - Include calendar operations
  - Add scheduling methods

- [x] `src/services/interfaces/IPermissionService.ts`
  - Define permission management
  - Include role operations
  - Add access control methods

- [x] `src/services/interfaces/IDashboardService.ts`
  - Define dashboard operations
  - Include metrics collection
  - Add data aggregation methods

## Phase 2: Service Factory Implementation
Implement the service factory pattern to manage service instantiation.

### Files to Create/Modify:
- [x] `src/services/factory/ServiceFactory.ts`
  - Implement factory methods for each service type
  - Add configuration for mock/real service selection
  - Include service caching if needed

- [x] `src/config/api.config.ts`
  - Update mock data configuration
  - Add service factory configuration
  - Modify environment variable handling

## Phase 3: Service Implementation by Type
Implement both real and mock services for each service type together, ensuring consistent behavior and proper mock data integration.

### Base Service Implementation
- [x] `src/services/implementations/real/BaseService.ts`
  - Common HTTP methods
  - Error handling
  - Authentication handling

- [x] `src/services/implementations/mock/BaseMockService.ts`
  - Mock data handling utilities
  - Delay simulation
  - Error simulation

### User Service Implementation
- [x] `src/services/implementations/real/UserService.ts`
- [x] `src/services/implementations/mock/MockUserService.ts`
  - User management operations
  - Group operations
  - Mock data from existing sources

### Client Service Implementation
- [x] `src/services/implementations/real/ClientService.ts`
- [x] `src/services/implementations/mock/MockClientService.ts`
  - Client management operations
  - Settings management
  - Mock data integration

### Security Service Implementation
- [x] `src/services/implementations/real/SecurityService.ts`
- [x] `src/services/implementations/mock/MockSecurityService.ts`
  - Security operations
  - Audit logging
  - Mock security data

### Bill Pay Service Implementation
- [x] `src/services/implementations/real/BillPayService.ts`
- [x] `src/services/implementations/mock/MockBillPayService.ts`
  - Payment processing
  - Configuration
  - Mock payment data

### Notification Service Implementation
- [x] `src/services/implementations/real/NotificationService.ts`
- [x] `src/services/implementations/mock/MockNotificationService.ts`
  - Template management
  - Notification sending
  - Mock notification data

### Exception Service Implementation
- [x] `src/services/implementations/real/ExceptionService.ts`
- [x] `src/services/implementations/mock/MockExceptionService.ts`
  - Exception handling
  - FIS integration
  - Mock exception data

### Payment Processor Service Implementation
- [x] `src/services/implementations/real/PaymentProcessorService.ts`
- [x] `src/services/implementations/mock/MockPaymentProcessorService.ts`
  - Transaction handling
  - Status tracking
  - Mock transaction data

### Report Service Implementation
- [x] `src/services/implementations/real/ReportService.ts`
- [x] `src/services/implementations/mock/MockReportService.ts`
  - Report generation
  - Export functionality
  - Mock report data

### Holiday Service Implementation
- [x] `src/services/implementations/real/HolidayService.ts`
- [x] `src/services/implementations/mock/MockHolidayService.ts`
  - Holiday management
  - Business day calculations
  - Mock holiday data

### Permission Service Implementation
- [x] `src/services/implementations/real/PermissionService.ts`
- [x] `src/services/implementations/mock/MockPermissionService.ts`
  - Role management
  - Access control
  - Mock permission data

### Dashboard Service Implementation
- [x] `src/services/implementations/real/DashboardService.ts`
- [x] `src/services/implementations/mock/MockDashboardService.ts`
  - Metrics collection
  - Data aggregation
  - Mock dashboard data

## Phase 4: Mock Data Migration

### Directory Structure
```
src/
  services/
    implementations/
      mock/
        data/           # Root mock data directory
          shared/       # Shared mock data (e.g., common types, utils)
          auth/         # Auth service mock data
          user/         # User service mock data
          client/       # Client service mock data
          security/     # Security service mock data
          billpay/      # Bill Pay service mock data
          notification/ # Notification service mock data
          exception/    # Exception service mock data
          processor/    # Payment Processor mock data
          report/       # Report service mock data
          holiday/      # Holiday service mock data
          permission/   # Permission service mock data
          dashboard/    # Dashboard service mock data
```

### Migration Strategy

1. Preparation Phase:
   - [ ] Create new directory structure under `src/services/implementations/mock/data`
   - [ ] Create `shared` directory for common utilities and types
   - [ ] Document mock data dependencies between services
   - [ ] Create migration order based on dependencies

2. Mock Data Organization:
   - [ ] Move existing mock data from `/src/mocks` to service-specific directories
   - [ ] Follow naming convention: `{entity}.mock.ts` for data files
   - [ ] Create index.ts in each directory to manage exports
   - [ ] Update all import paths in mock services

3. Standardization Requirements:
   - [ ] Each mock data file must:
     - Export const variables prefixed with 'mock'
     - Include TypeScript types for all data
     - Use strict type checking
     - Include JSDoc comments for complex data structures
   - [ ] Implement data generators with:
     - Consistent random data generation
     - Configurable parameters
     - Type-safe return values

4. Migration Order (Based on Dependencies):
   1. [ ] Shared utilities and types
   2. [ ] User mock data (base dependency)
   3. [ ] Auth mock data (depends on user)
   4. [ ] Permission mock data (depends on user)
   5. [ ] Client mock data
   6. [ ] Security mock data
   7. [ ] Holiday mock data
   8. [ ] Bill Pay mock data
   9. [ ] Payment Processor mock data
   10. [ ] Exception mock data
   11. [ ] Report mock data
   12. [ ] Notification mock data
   13. [ ] Dashboard mock data

5. Type Validation Implementation:
   - [ ] Create type validation utilities in `shared`:
     ```typescript
     // mockValidation.ts
     export const validateMockData = <T>(data: T, schema: Schema<T>): boolean;
     export const createMockGenerator = <T>(schema: Schema<T>): () => T;
     ```
   - [ ] Add runtime type checking using validation utilities
   - [ ] Implement error reporting for invalid mock data

6. Mock Generator Standards:
   - [ ] Create base generator classes:
     ```typescript
     // generators/base.ts
     export abstract class BaseMockGenerator<T> {
       abstract generate(): T;
       abstract generateMany(count: number): T[];
     }
     ```
   - [ ] Implement service-specific generators extending base
   - [ ] Add configuration options for all generators

7. Verification Steps:
   - [ ] Create verification script to:
     - Validate all mock data against types
     - Check for circular dependencies
     - Verify import paths
     - Test data generators
   - [ ] Add tests for mock data integrity
   - [ ] Verify mock service behavior with new data structure

8. Import Path Updates:
   - [ ] Update all mock service imports to use new paths
   - [ ] Remove old mock data directory
   - [ ] Update any component tests using mock data
   - [ ] Verify no references to old mock data remain

### Success Criteria
1. Directory Structure:
   - All mock data organized in service-specific directories
   - No mock data remains in old location
   - Clear separation of shared and service-specific data

2. Type Safety:
   - All mock data strictly typed
   - No type assertions (as) in mock data
   - Validation utilities implemented and used

3. Data Generation:
   - All services have typed generators
   - Generators produce consistent data
   - Configuration options working correctly

4. Testing:
   - All mock services working with new structure
   - No broken imports or references
   - All tests passing with new mock data

5. Documentation:
   - Updated README for mock data usage
   - JSDoc comments for all mock data
   - Clear examples of data generation

### Rollback Plan
1. Keep old mock data until verification complete
2. Document all changed import paths
3. Create restore script for reverting changes
4. Test rollback procedure before starting

## Phase 5: Testing
1. Unit Tests:
   - [ ] Test each service implementation
   - [ ] Verify mock behavior matches real
   - [ ] Add error condition tests

2. Integration Tests:
   - [ ] Test service interactions
   - [ ] Verify factory pattern
   - [ ] Test mock/real switching

## Phase 6: Documentation
1. Service Documentation:
   - [ ] Document service interfaces
   - [ ] Add usage examples
   - [ ] Document mock behavior

2. Migration Guide:
   - [ ] Document upgrade steps
   - [ ] List breaking changes
   - [ ] Provide migration examples

## Phase 7: Cleanup and Deployment
1. Code Cleanup:
   - [ ] Remove old implementations
   - [ ] Update import paths
   - [ ] Remove unused code

2. Deployment:
   - [ ] Version bump
   - [ ] Update changelog
   - [ ] Deploy changes

## Migration Strategy
1. Deploy new implementations alongside existing ones
2. Update components to use factory pattern
3. Test thoroughly in staging
4. Deploy to production
5. Remove old implementations
6. Clean up unused code

## Notes
- Maintain consistent naming conventions
- Follow established patterns
- Keep services focused and single-responsibility
- Document any deviations or special cases
- Consider performance implications
