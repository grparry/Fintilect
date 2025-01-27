# Types Reference Upgrade Plan (2025-01)

## Overview
- [ ] Complete upgrade of all references to `cbp-admin/src/types`
- [ ] Ensure alignment with updated component layer
- [ ] Validate all type dependencies and relationships

## 1. Impact Analysis
- [x] Review affected files
  - [x] Primary: `cbp-admin/src/components` references
    - 100+ direct references to types
    - Key components: payment forms, exception handling, dashboard widgets
  - [x] Secondary: `cbp-config-api` references
    - 30+ references to shared types
  - [x] Document total reference count (300+ confirmed)
- [x] Analyze recently updated type files
  - [x] bill-pay.types.ts (Jan 9, 2025)
    - Major updates to payment processing types
    - New exception handling interfaces
    - Enhanced validation structures
  - [x] report.types.ts (Jan 9, 2025)
    - Updated reporting interfaces
    - New filtering capabilities
  - [x] dashboard.types.ts (Jan 9, 2025)
    - Enhanced statistics tracking
    - New transaction trend interfaces
  - [x] exception.types.ts (Jan 8, 2025)
    - Improved error handling
    - New resolution tracking
  - [x] security.types.ts (Jan 8, 2025)
    - Enhanced authentication types
    - New permission structures

## 2. Component Layer Update

### 2.1 Payment Processing Components
- [x] Update payment processing components
  - [x] PendingPayments.tsx
    - [x] Update payment type imports (bill-pay.types)
    - [x] Fix ConfirmationState interface to use ConfirmationMethod enum
    - [x] Fix PaymentConfirmationRequest type alignment
    - [x] Fix userId type conversion for API compatibility
  - [x] ManualProcessing.tsx
    - [x] Update payment type imports (PaymentMethod, Priority)
    - [x] Fix form submission types for createPendingPayment
    - [x] Fix draft saving types with Payment interface
    - [x] Update validation state handling
  - [x] PayeeConversion.tsx
    - [x] Update payee conversion types (PayeeConversionFile, PayeeConversionRecord)
    - [x] Fix validation handling with PayeeConversionValidation interface
    - [x] Fix progress tracking with PayeeConversionProgress type
    - [x] Remove incorrect status type imports
    - [x] Use literal status types from interfaces

### 2.2 Exception Handling Components
- [x] Update exception handling components
  - [x] ExceptionList.tsx
    - [x] Update exception type imports
    - [x] Fix status handling
    - [x] Add resolution tracking types
  - [x] ExceptionDetails.tsx
    - [x] Update exception detail types
    - [x] Fix resolution history types
    - [x] Implement retry result types
  - [x] ExceptionResolution.tsx
    - [x] Update resolution type imports
    - [x] Fix resolution action types
    - [x] Add resolution metadata handling
  - [x] FISExceptionHandling.tsx
    - [x] Update FIS exception types
    - [x] Add response history types
    - [x] Implement retry result types
  - [x] ExceptionTool.tsx
    - [x] Update exception tool types
    - [x] Add resolution types
    - [x] Implement validation interfaces
    - [x] Updated exception handling types
    - [x] Added validation for resolution flows
    - [x] Improved error handling
    - [x] Enhanced exception state management
    - [x] Added proper typing for resolution actions
    - [x] Improved filtering and sorting types

### 2.3 Settings Components
- [ ] Update configuration components
  - [x] NotificationTemplates.tsx (Modified Jan 9)
    - [x] Update notification type enums from service layer
    - [x] Add template variable types and preview interfaces
    - [x] Fix API response handling to match service layer
    - [x] Convert template IDs to strings for API compatibility
    - [x] Improve error handling with Error instances
    - [x] Add proper ID type handling (number to string conversion)
    - [x] Update dialog state management
  - [x] BillPayConfig.tsx
    - [x] Update config validation types
    - [x] Add new rule interfaces
    - [x] Implement update types
  - [x] Holidays.tsx
    - [x] Update holiday type enums
    - [x] Add validation interfaces
    - [x] Implement processing rules
  - [x] PermissionGroups.tsx
    - [x] Update permission types
    - [x] Add group management interfaces
    - [x] Update method name for getting permission categories
    - [x] Add proper error handling
  - [x] AuditLog.tsx
    - [x] Update audit log types
    - [x] Add API response types
    - [x] Updated to use auditService
    - [x] Added proper type definitions for AuditEvent
    - [x] Improved error handling with Error instances
    - [x] Added AuditLogFilters and AuditLogResponse interfaces
    - [x] Enhanced metadata handling
    - [x] Added proper date formatting

### 2.4 Dashboard & Reports
- [x] Update analytics components
  - [x] Dashboard.tsx
    - [x] Update stats interfaces with DashboardMetrics
    - [x] Fix transaction volume handling to use daily metrics
    - [x] Update chart data types to match service layer
    - [x] Fix SelectChangeEvent types for MUI components
    - [x] Implement proper error handling with ApiResponse
    - [x] Update metric value extraction to handle nested objects
  - [x] Reports.tsx
    - [x] Update report filter types from report.types.ts
    - [x] Integrate reportService for data fetching
    - [x] Add ExportOptions interface for report exports
    - [x] Implement proper error handling with ApiResponse
    - [x] Add loading states for async operations

### 2.5 Client Management Components
- [ ] Update client management components
  - [x] ClientManagement.tsx
    - [x] Update client types from client.types.ts
    - [x] Add management interfaces for client operations
    - [x] Update client list handling types
  - [x] Users.tsx
    - [x] Update user and role types from client.types.ts
    - [x] Add proper ApiResponse error handling
    - [x] Implement proper state management with UsersState
    - [x] Fix user status and role enums
    - [x] Remove debug logging
    - [x] Add proper typing for user operations
  - [x] Security Components
    - [x] SecuritySettings.tsx
      - [x] Update security types from client.types.ts
      - [x] Add proper ApiResponse error handling
      - [x] Update to use correct client service methods
      - [x] Add default security settings
      - [x] Fix type issues with optional fields
    - [x] AuditSearch.tsx
      - [x] Update audit types from client.types.ts
      - [x] Add proper ApiResponse error handling
      - [x] Improve state management with AuditSearchState
      - [x] Add resource and status columns
      - [x] Enhance details formatting for different actions
  - [x] Groups & Roles
    - [x] GroupEdit.tsx, RoleEdit.tsx
      - [x] Update permission types from client.types.ts
      - [x] Add proper ApiResponse handling
      - [x] Add isSystem flag handling for roles
      - [x] Add members array handling for groups
      - [x] Improve loading states and error handling
    - [x] GroupsList.tsx, RolesList.tsx
      - [x] Update list types for display
      - [x] Add filtering and sorting interfaces
      - [x] Add proper state management
      - [x] Add proper ApiResponse handling
      - [x] Add loading states and error handling

### 2.6 Emerge Admin Components
- [x] Update emerge admin components
  - [x] Member Center
    - [x] MemberDashboard.tsx
      - [x] Update member types from member-center.types.ts
      - [x] Add dashboard metric interfaces
      - [x] Update member status types
    - [x] MemberSearch.tsx
      - [x] Update search types from member-center.types.ts
      - [x] Add filter interfaces for advanced search
      - [x] Update result pagination types
  - [x] Money Desktop
    - [x] MoneyDesktop.tsx
      - [x] Update integration types from money-desktop.types.ts
      - [x] Add sync interfaces for data transfer
      - [x] Update transaction types
    - [x] DetailsDialog.tsx, SyncDialog.tsx
      - [x] Update dialog prop types
      - [x] Add response interfaces for API calls
      - [x] Update progress tracking types

### 2.7 Auth Components
- [x] Update authentication components
  - [x] LoginPage.tsx
    - [x] Update login form types from auth.types.ts
    - [x] Use ApiError type for error handling
    - [x] Update validation interfaces for inputs
    - [x] Update session management types
  - [x] ProtectedRoute.tsx
    - [x] Update route prop types from auth.types.ts
    - [x] Use UserRole from index.ts
    - [x] Update permission group handling

### 2.8 Navigation Components
- [x] Update navigation components
  - [x] Sidebar.tsx
    - [x] Use NavigationItem and NavigationSection from navigation.types.ts
    - [x] Update navigation item rendering with proper types
    - [x] Improve theme handling and styles
  - [x] Header.tsx
    - [x] Use User type from index.ts
    - [x] Update theme handling for dark/light mode
    - [x] Improve layout and transitions
  - [x] SidebarItem.tsx
    - [x] Create new component with proper navigation types
    - [x] Add depth-based indentation
    - [x] Handle nested navigation items

### 2.9 Common Components
- [x] Update shared components
  - [x] Form.tsx
    - [x] Use SelectOption type from index.ts
    - [x] Improve form field validation types
    - [x] Add proper generic type support
  - [x] DataTable.tsx
    - [x] Use PaginationParams from index.ts
    - [x] Add proper column and row types
    - [x] Improve sorting and selection types
  - [x] BaseModal.tsx
    - [x] Update to use Dialog component
    - [x] Improve theme handling
    - [x] Add proper accessibility support

## 3. Testing & Validation
- [x] Review Existing Tests
  - [x] Review common component tests
    - [x] BaseModal.test.tsx
    - [x] ~~Form.test.tsx~~ (no test file exists)
    - [x] ~~DataTable.test.tsx~~ (no test file exists)
  - [x] Review auth component tests
    - [x] ~~LoginPage.test.tsx~~ (no test file exists)
    - [x] ~~ProtectedRoute.test.tsx~~ (no test file exists)
  - [x] Review navigation component tests
    - [x] ~~Sidebar.test.tsx~~ (no test file exists)
    - [x] ~~Header.test.tsx~~ (no test file exists)
    - [x] ~~SidebarItem.test.tsx~~ (no test file exists)
  - [x] Review service tests
    - [x] Review API integration tests in /services/__tests__/integration - using proper types
    - [x] Review service unit tests in /services/__tests__ - using proper types

## 4. Mock and Hook Compilation Fixes

### Phase 1: Mock Type Alignment
- [ ] Fix Mock Type Definitions
  - [ ] Align existing mock types with service interfaces
  - [ ] Update enum usage in mocks (PaymentStatus, NotificationType)
  - [ ] Fix mock data structure mismatches

- [ ] Correct Mock Response Types
  - [ ] Update MSW handler response types
  - [ ] Fix API response type mismatches
  - [ ] Align mock data with expected service types

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

## Progress Tracking
- Started: 2025-01-09
- Mock System Start: 2025-01-10
- Completed: 2025-01-10
