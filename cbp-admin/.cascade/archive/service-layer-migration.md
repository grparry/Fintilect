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

- [x] Update Service Implementations
  - [x] Bill Pay Services
    - [x] bill-pay-config.service.ts
    - [x] bill-pay-security.service.ts
    - [x] bill-pay.service.ts
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
      - [x] Integration Points
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
        - [x] Audit logging for payment operations
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
        - [x] Service Testing
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
        - [x] Integration tests
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
          - [x] Audit logging
          - [x] Security service
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
  
  - [x] Payment Related Services
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
    - [x] payee-conversion.service.ts
      - [x] Update to use new API client
      - [x] Add integration tests
      - [x] Fix error handling
      - [x] Add support for blob downloads
      - [x] Update type definitions
      - [x] Fix PayeeConversionStatus enum usage
  
  - [x] FIS Exception Services
    - [x] Analysis and Design
      - [x] Review current `/api/fis/exceptions` endpoints and usage patterns
      - [x] Document exception types and their business purposes
      - [x] Map exception flows to new API patterns
      - [x] Define request/response schemas
    - [x] Implementation
      - [x] Create `exception.service.ts`
        - [x] Implement exception search with filters
        - [x] Implement exception retrieval by ID
        - [x] Add exception resolution handling
        - [x] Add reprocessing functionality
        - [x] Add refund processing
      - [x] Create `exception-history.service.ts`
        - [x] Implement history search functionality
        - [x] Add history entry creation
        - [x] Add history retrieval by ID
      - [x] Add comprehensive tests
        - [x] Unit tests for exception.service.ts
        - [x] Unit tests for exception-history.service.ts
        - [x] Integration tests for exception workflows
      - [x] Update UI components
        - [x] Exception list view with filters
        - [x] Exception detail view
        - [x] Resolution/Reprocess/Refund forms
        - [x] History timeline component

  - [x] Notification Services
    - [x] notification-template.service.ts
      - [x] Consolidated functionality from two services
      - [x] Updated to use new API client
      - [x] Added comprehensive integration tests
      - [x] Fixed type definitions and enum usage
      - [x] Improved error handling with proper error types
    - [x] notification.service.ts
      - [x] Created new service using API client
      - [x] Added comprehensive integration tests (89.39% coverage)
      - [x] Implemented core functionality:
        - [x] Sending notifications
        - [x] Status tracking
        - [x] Configuration management with caching
        - [x] History retrieval
        - [x] Failed notification handling
        - [x] Pending notification cancellation

  - [x] Client & User Services
    - [x] clients.service.ts
      - [x] Update to use new API client
      - [x] Migrate to new `/clients` endpoints
      - [x] Update response types to match API schema
      - [x] Add comprehensive test suite
      - [x] Core client management
        - [x] CRUD operations
        - [x] Settings management
        - [x] Environment configuration
      - [x] User Management
        - [x] User CRUD operations
        - [x] Status management (ACTIVE, INACTIVE, LOCKED)
        - [x] Role assignment
      - [x] Group Management
        - [x] Group CRUD operations
        - [x] Member management
        - [x] Permission assignment
      - [x] Role Management
        - [x] Role CRUD operations
        - [x] Permission assignment
        - [x] Role-based access control
      - [x] Permission Management
        - [x] Permission listing
        - [x] Scoped permissions (READ, WRITE, ADMIN)
        - [x] Category-based organization
    - [x] member.service.ts
      - [x] Update to use new API client
      - [x] Migrate to new member management endpoints
      - [x] Update response types to match API schema
      - [x] Add comprehensive test suite
    - [x] userService.ts
      - [x] Update to use new API client
      - [x] Migrate to new user management endpoints
      - [x] Update response types to match API schema
      - [x] Add comprehensive test suite
      - [x] Implement authentication and authorization
      - [x] Add session management
      - [x] Add user preferences
      - [x] Add account security features
  
  - [x] System Services
    - [x] dashboard.service.ts
      - [x] Update to use new API client
      - [x] Migrate to new system status endpoints
      - [x] Update response types to match API schema
      - [x] Add comprehensive test suite
    - [x] holiday.service.ts
      - [x] Migrate to new `/system/holidays` endpoint
      - [x] Update response types to match API schema
      - [x] Add comprehensive test suite
      - [x] Consolidated with holidays.service.ts
    - [x] permission.service.ts
      - [x] Update to use new API client
      - [x] Migrate to new permission management endpoints
      - [x] Update response types to match API schema
      - [x] Add comprehensive test suite
    - [x] report.service.ts
      - [x] Update to use new API client with typed responses
      - [x] Migrate to new `/api/v1/report` endpoints with request/response types
      - [x] Add audit logging for report generation, export, and scheduling
      - [x] Add exception handling with severity levels
      - [x] Add comprehensive test coverage for:
        - Report generation
        - Error handling
        - Audit report retrieval
        - Transaction report retrieval
        - Report export
        - Report scheduling
    - [x] audit.service.ts
      - [x] Update to use new API client with typed responses
      - [x] Migrate to new `/api/v1/audit` endpoints
      - [x] Add type-safe event logging with status enums
      - [x] Add comprehensive test coverage for:
        - Payment flow audit logging
        - Exception flow audit logging
        - Error handling
  
### 2.1 Testing Strategy
Each service update will include minimal but effective testing:
- [x] Define testing approach
  - [x] Basic "happy path" test for main operations
  - [x] Simple pagination test if applicable
  - [x] Critical error cases only

### 2.2 Migration Steps for Each Service
1. [x] Define standard migration process
2. [x] Create test templates
3. [x] Apply to each service systematically

### 2.3 Progress
- [x] Exceptions Service
  - Updated to use new API client
  - Added basic integration tests
  - Verified pagination works

- [x] Payments Service
  - [x] Updated fetchPayments with new API client patterns
  - [x] Added PaymentApiResponse type definition
  - [x] Implemented basic pagination test
  - [x] Verified API client integration
  - [x] Payment creation/modification
  - [x] Payment status handling
  - [x] New payment operations

- [x] Bill Pay Services
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
  
  - [x] Bill Pay Core Service
    - [x] Update core payment operations
    - [x] Update validation logic
    - [x] Add tests for core functions
    - [x] Verify integration points
