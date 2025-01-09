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
    - [~] bill-pay.service.ts
      - [x] Support Functions
        - [x] Audit log management
        - [x] Configuration management
        - [x] Stats tracking
        - [x] Service control operations
      - [x] Core Payment Operations
        - [x] Submit/create payments
        - [x] Get payment details
        - [x] Update payment status
        - [x] Cancel payments
        - [x] Batch operations
        - [x] Payment validation
        - [x] Payment history tracking
        - [x] Payment search functionality
      - [x] Payment Confirmation Features
        - [x] Request confirmation
        - [x] Verify confirmation
      - [x] Validation Logic
        - [x] Payment amount limits
          - [x] Global transaction limits
          - [x] Method-specific limits
          - [x] Currency validation
        - [x] Daily transaction limits
          - [x] Per-client tracking
          - [x] Config-based limits
          - [x] Cross-method aggregation
        - [x] Method-specific validations
          - [x] Wire transfer requirements
          - [x] ACH effective date rules
          - [x] Check payee validation
          - [x] RTP cutoff times
        - [x] Business rules validation
          - [x] Weekend processing rules
          - [x] Dual approval logic
          - [x] Currency support rules
          - [x] Cutoff enforcement
      - [~] Integration Points
        - [x] Payment processor integration
          - [x] Submit payment to processor
          - [x] Handle processor webhooks
          - [x] Status checking
          - [x] Error handling
          - [x] Audit logging
        - [x] Notification system hooks
          - [x] Email notifications
          - [x] SMS notifications
          - [x] Template support
          - [x] Status tracking
          - [x] Error handling
        - [~] Audit logging for payment operations
          - [x] Processor events
          - [x] Notification events
          - [x] Security events
            - [x] Authentication attempts
            - [x] Rate limit violations
            - [x] OTP/MFA verification
            - [x] Permission changes
          - [x] User actions
            - [x] Payment status updates
            - [x] Payment cancellations
            - [x] System state changes
        - [x] Security service integration
          - [x] Authentication
          - [x] Authorization
          - [x] Rate limiting
          - [x] API key management
        - [x] Exception service integration
          - [x] Exception tracking
          - [x] Exception management
          - [x] Exception reporting
          - [x] Integration with audit logging
        - [x] Report service integration
          - [x] Report generation
          - [x] Report export
          - [x] Report scheduling
          - [x] Integration with audit logging
        - [ ] Service Testing
          - [x] Security service tests
            - [x] Security settings management
            - [x] OTP/MFA functionality
            - [x] Basic authentication
            - [x] Security event logging
            - [x] Fixed test issues:
              - [x] Added userId to AuthToken mocks
              - [x] Fixed private property access in tests
              - [x] Improved audit logging assertions
              - [x] Added helper functions for token management
          - [x] Exception service tests
            - [x] Basic CRUD operations
              - [x] Fetch exceptions with pagination
              - [x] Get single exception
              - [x] Get exception history
              - [x] Get exception stats
            - [x] Exception management
              - [x] Resolve exception
              - [x] Retry exception
              - [x] Update status
              - [x] Assign to user
            - [x] Notes and exports
              - [x] Add notes with metadata
              - [x] Export exceptions
            - [x] Error handling
              - [x] API errors
              - [x] Retry functionality
          - [x] Report service tests
            - [x] getReportData tests
            - [x] getAuditReport tests
            - [x] getTransactionReport tests
            - [x] getUserReport tests
            - [x] exportReport tests
            - [x] scheduleReport tests
            - [x] cancelScheduledReport tests
            - [x] Achieved 85.88% test coverage
        - [x] Unit tests for payment operations
          - [x] payment-processor.service.test.ts
            - [x] submitPayment tests
            - [x] getPaymentStatus tests
            - [x] handleWebhook tests
            - [x] Fixed type issues and enum values
          - [x] notification.service.test.ts
            - [x] sendNotification tests with proper types
            - [x] getNotificationStatus tests
            - [x] Error handling for API failures
            - [x] Audit logging verification
        - [x] Basic validation tests
        - [x] Method-specific validation tests
          - [x] ACH validation rules
          - [x] Wire transfer rules
          - [x] Check processing rules
        - [ ] Integration tests
          - [x] Payment processor integration
            - [x] Successful payment submission
            - [x] Error handling in payment submission
            - [x] Webhook processing
            - [x] Invalid webhook handling
            - [x] Achieved 73.33% test coverage
          - [x] Notification system
            - [x] Send notification tests
            - [x] Status check tests
            - [x] Error handling tests
            - [x] Audit logging verification
            - [x] Achieved 100% test coverage
          - [ ] Audit logging
          - [ ] Security service
    - [x] payment-processor.service.ts tests
      - [x] submitPayment tests
      - [x] getPaymentStatus tests
      - [x] handleWebhook tests
      - [x] Fixed type issues and enum values
    - [x] notification.service.ts tests
      - [x] sendNotification tests
      - [x] getNotificationStatus tests
      - [x] Error handling tests
      - [x] Audit logging tests
  
  - [~] Payment Related Services
    - [x] payments.service.ts
    - [x] manual-payment.service.ts
      - [x] Update to use new API client
      - [x] Add comprehensive test suite
      - [x] Fix type handling issues
      - [x] Add error handling for unsupported methods
      - [x] Improve draft management
    - [x] manual-payments.service.ts
      - [x] Updated to use new API client
      - [x] Added comprehensive test suite
      - [x] Fixed type handling issues
      - [x] Added error handling
      - [x] Improved pagination handling
    - [x] pending-payments.service.ts
      - [x] Fixed type errors in API response handling
      - [x] Fixed return types to match API response structure
      - [x] Added proper typing for paginated responses
      - [x] Added proper error handling
    - [ ] payee-conversion.service.ts
  
  - [ ] Client & User Services
    - [ ] clients.service.ts
      - [ ] Update to use new API client
      - [ ] Migrate to new `/clients` endpoints
      - [ ] Update response types to match API schema
      - [ ] Add comprehensive test suite
    - [ ] member.service.ts
      - [ ] Update to use new API client
      - [ ] Migrate to new member management endpoints
      - [ ] Update response types to match API schema
      - [ ] Add comprehensive test suite
    - [ ] userService.ts
      - [ ] Update to use new API client
      - [ ] Migrate to new user management endpoints
      - [ ] Update response types to match API schema
      - [ ] Add comprehensive test suite
  
  - [ ] System Services
    - [ ] dashboard.service.ts
      - [ ] Update to use new API client
      - [ ] Migrate to new system status endpoints
      - [ ] Update response types to match API schema
      - [ ] Add comprehensive test suite
    - [ ] holiday.service.ts
      - [ ] Migrate to new `/system/holidays` endpoint
      - [ ] Update response types to match API schema
      - [ ] Add comprehensive test suite
      - [ ] Consolidate with holidays.service.ts
    - [ ] permission.service.ts
      - [ ] Update to use new API client
      - [ ] Migrate to new permission management endpoints
      - [ ] Update response types to match API schema
      - [ ] Add comprehensive test suite
    - [x] report.service.ts
  
  - [ ] Notification Services
    - [ ] notification-template.service.ts
      - [ ] Update to use new API client
      - [ ] Migrate to new notification endpoints
      - [ ] Update response types to match API schema
      - [ ] Add comprehensive test suite
      - [ ] Consolidate with notification-templates.service.ts

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
  
  - [~] Bill Pay Core Service
    - [x] Update core payment operations
    - [x] Update validation logic
    - [x] Add tests for core functions
    - [x] Verify integration points

### TODO Items

#### FIS Exceptions API
- [ ] Analyze FIS exception handling requirements
  - [ ] Review current `/api/fis/exceptions` endpoints and usage patterns
  - [ ] Document exception types and their business purposes
  - [ ] Map exception flows to new API patterns
- [ ] Design new API endpoints for FIS exceptions
  - [ ] Define request/response schemas
  - [ ] Align pagination with API standards
  - [ ] Ensure compatibility with existing exception handling logic
- [ ] Update `fis-exceptions.service.ts` once new API endpoints are defined
  - [ ] Migrate to new endpoints
  - [ ] Update response types to match API standards
  - [ ] Maintain backward compatibility during transition

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
