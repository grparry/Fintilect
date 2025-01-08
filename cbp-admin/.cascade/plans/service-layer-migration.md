# Service Layer Migration Plan
> Migration from legacy-api-combined.json to cbp-config-api.json

## Overview
This plan outlines the steps needed to update the CBP Admin services layer to use the new CBP Config API specification instead of the legacy API.

## Related Documents
- [API Analysis](.cascade/context/api-migration/ANALYSIS.md) - Detailed comparison of legacy and new APIs
- [Service Updates](.cascade/context/api-migration/SERVICE_UPDATES.md) - Implementation plan for service layer updates
- [Critical Paths](.cascade/context/api-migration/CRITICAL_PATHS.md) - Core functionality and validation requirements

## Prerequisites
- [x] CBP Config API Swagger specification saved at `public/cbp-config-api.json`
- [x] Legacy API specification at `public/legacy-api-combined.json` for reference
- [x] Critical path functionality identified for testing

## Workflow Rules

### Code Changes
- After any code changes, automatically check @current_problems
- Address any problems before running tests
- Only proceed to testing when no problems are found

### Testing Strategy
During plan execution:
- Implement only tests specified in the plan
- Do not suggest additional test coverage
- Focus on completing migration tasks
- Save test improvements for post-migration phase

### Plan Management
After completing any service:
- Update plan status automatically
- Add completion details
- Remove completed items from TODO sections
- Keep plan current without prompting

## Migration Checklist

### 1. Analysis Phase
- [x] Compare API Specifications
  - [x] Document differences between legacy and new API endpoints
  - [x] Identify breaking changes in request/response structures
  - [x] Map legacy endpoints to new endpoints
  - [x] List new endpoints not present in legacy API

### 2. Service Layer Updates
- [x] Update API Client Configuration
  - [x] Update base URL configuration
  - [x] Update authentication mechanism if changed
  - [x] Update request interceptors if needed
  - [x] Update response interceptors if needed

- [ ] Update Service Implementations
  - [ ] Bill Pay Services
    - [x] bill-pay-config.service.ts
    - [x] bill-pay-security.service.ts
    - [ ] bill-pay.service.ts
  
  - [ ] Client & User Services
    - [ ] clients.service.ts
    - [ ] member.service.ts
    - [ ] userService.ts
  
  - [~] Payment Related Services
    - [x] payments.service.ts
    - [ ] manual-payment.service.ts
      - [ ] Update to use new API client
      - [ ] Add comprehensive test suite
      - [ ] Fix type handling issues
      - [ ] Add error handling for unsupported methods
      - [ ] Improve draft management
    - [x] manual-payments.service.ts
      - [x] Updated to use new API client
      - [x] Added comprehensive test suite
      - [x] Fixed type handling issues
      - [x] Added error handling
      - [x] Improved pagination handling
    - [ ] pending-payments.service.ts
    - [ ] payee-conversion.service.ts
  
  - [~] Exception Services
    - [x] exceptions.service.ts
    - [ ] fis-exceptions.service.ts
  
  - [ ] System Services
    - [ ] dashboard.service.ts
    - [ ] holiday.service.ts
    - [ ] holidays.service.ts
    - [ ] permission.service.ts
    - [ ] report.service.ts
  
  - [ ] Notification Services
    - [ ] notification-template.service.ts
    - [ ] notification-templates.service.ts

### 2.1 Testing Strategy
Each service update will include minimal but effective testing:
- [x] Define testing approach
  - [x] Basic "happy path" test for main operations
  - [x] Simple pagination test if applicable
  - [x] Critical error cases only

### 2.2 Migration Steps for Each Service
1. [x] Define standard migration process
2. [x] Create test templates
3. [ ] Apply to each service systematically

### 2.3 Progress
- [x] Exceptions Service
  - Updated to use new API client
  - Added basic integration tests
  - Verified pagination works

- [~] Payments Service (In Progress)
  - [x] Updated fetchPayments with new API client patterns
  - [x] Added PaymentApiResponse type definition
  - [x] Implemented basic pagination test
  - [x] Verified API client integration
  - [x] Payment creation/modification
  - [x] Payment status handling
  - [x] New payment operations

- [~] Bill Pay Services
  - [x] Bill Pay Security Service
    - [x] Updated authentication methods
    - [x] Updated token management
    - [x] Added tests for security operations
    - [x] Verified permission checks
    - [x] Added IP whitelist validation
    - [x] Added phone/email format validation
    - [x] Added OTP rate limiting
    - [x] Added concurrent update prevention
    - [x] Added comprehensive tests
  
  - [x] Bill Pay Config Service
    - [x] Updated API client integration
    - [x] Added validation for configuration updates
    - [x] Added concurrent update prevention
    - [x] Added comprehensive error handling
    - [x] Added tests for configuration CRUD
    - [x] Added tests for validation
    - [x] Added tests for error cases
    - [x] Added tests for email notifications
  
  - [ ] Bill Pay Core Service
    - [ ] Update core payment operations
    - [ ] Update validation logic
    - [ ] Add tests for core functions
    - [ ] Verify integration points

- [ ] Remaining Services
  - [ ] Clients Service
    - [ ] Update client management
    - [ ] Add pagination for client lists
    - [ ] Update client search
    - [ ] Add tests for client CRUD
    - [ ] Add tests for client search
  
  - [ ] Member Service
    - [ ] Update member operations
    - [ ] Add pagination support
    - [ ] Update member validation
    - [ ] Add tests for member CRUD
    - [ ] Add tests for member search
  
  - [ ] User Service
    - [ ] Update user management
    - [ ] Update role handling
    - [ ] Add pagination support
    - [ ] Add tests for user CRUD
    - [ ] Add tests for role management
  
  - [ ] Manual Payments Service
    - [ ] Update batch operations
    - [ ] Add pagination support
    - [ ] Update error handling
    - [ ] Add tests for batch operations
    - [ ] Add tests for validation
  
  - [ ] Pending Payments Service
    - [ ] Update payment queue
    - [ ] Update status management
    - [ ] Add pagination support
    - [ ] Add tests for queue operations
    - [ ] Add tests for status updates
  
  - [ ] Payee Conversion Service
    - [ ] Update conversion logic
    - [ ] Update validation rules
    - [ ] Add tests for conversions
    - [ ] Add tests for validation
  
  - [ ] FIS Exceptions Service
    - [ ] Update exception handling
    - [ ] Update status management
    - [ ] Add pagination support
    - [ ] Add tests for exception handling
    - [ ] Add tests for status updates
  
  - [ ] Dashboard Service
    - [ ] Update metrics collection
    - [ ] Update data aggregation
    - [ ] Add tests for metrics
    - [ ] Add tests for aggregation
  
  - [ ] Holiday Service
    - [ ] Update calendar operations
    - [ ] Update holiday rules
    - [ ] Add tests for holiday management
    - [ ] Add tests for date calculations
  
  - [ ] Holidays Service
    - [ ] Update holiday definitions
    - [ ] Add pagination support
    - [ ] Add tests for holiday CRUD
    - [ ] Add tests for holiday rules
  
  - [ ] Permission Service
    - [ ] Update permission checks
    - [ ] Update role mappings
    - [ ] Add tests for permissions
    - [ ] Add tests for role checks
  
  - [ ] Report Service
    - [ ] Update report generation
    - [ ] Update data filtering
    - [ ] Add pagination support
    - [ ] Add tests for report generation
    - [ ] Add tests for data filtering

### 3. Type System Updates
- [~] Update TypeScript Interfaces
  - [x] Generate new types from OpenAPI spec
  - [x] Update existing interfaces to match new API
  - [x] Add new type definitions (PaymentApiResponse)
  - [ ] Remove deprecated types

### 4. Testing Strategy
- [~] Critical Path Testing
  - [x] Identify core business flows
  - [x] Document manual test scenarios
  - [~] Add minimal automated tests for critical paths
    - [x] Exceptions service
    - [x] Payments service
    - [ ] Other services
  - [ ] Create API integration tests for core endpoints

### 5. Risk Management
- [~] Risk Identification & Analysis
  - [x] Breaking changes in API structure
    - [ ] Document all breaking changes
    - [ ] Create migration guides for each change
    - [ ] Identify affected components
    - [ ] Plan backwards compatibility where needed
  
  - [x] Potential downtime during migration
    - [ ] Create detailed deployment strategy
    - [ ] Plan maintenance windows
    - [ ] Prepare rollback procedures
    - [ ] Test deployment procedures
  
  - [x] Data format incompatibilities
    - [ ] Map all data transformations needed
    - [ ] Create data validation tests
    - [ ] Plan data migration scripts
    - [ ] Test data conversion processes


### 6. Rollout Strategy
- [ ] Phase 1: Core Services (In Progress)
  - [x] Exceptions Service
  - [x] Payments Service
  - [ ] Remaining Core Services

- [ ] Phase 2: Supporting Services (Not Started)
  - [ ] System Services
  - [ ] Notification Services
  - [ ] Utility Services

### 7. Validation & Testing
- [~] Unit Tests
  - [x] Update test data fixtures
  - [x] Update mock responses
  - [ ] Add new test cases for each service

- [ ] Integration Tests
  - [x] Update API client tests
  - [ ] Update service integration tests
  - [ ] Add new endpoint tests

### 8. Documentation
- [~] Update API Documentation
  - [x] Document breaking changes
  - [ ] Update endpoint documentation
  - [ ] Update type documentation

- [~] Update Development Guides
  - [x] Update migration guide
  - [ ] Update testing guide
  - [ ] Update deployment guide
