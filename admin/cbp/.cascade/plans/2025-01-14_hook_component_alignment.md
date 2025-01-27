# Hook and Component Alignment Project Plan
Created: 2025-01-14
Status: Draft
Priority: High

## Overview
This plan outlines the strategy for aligning hooks and components with the newly refactored service layer in the CBP Admin application.

## Implementation Guidelines

1. Use the Service Factory
   - Always obtain service instances through ServiceFactory
   - Never instantiate services directly
   - Maintain singleton pattern for service instances

2. Error Handling
   - Use consistent error patterns from service layer
   - Propagate errors appropriately through hooks
   - Provide meaningful error context to users

3. No Service Layer Modifications
   - Keep service interfaces unchanged
   - Maintain existing service contracts
   - Update components to match services, not vice versa

4. Project Scope
   - Focus only on service layer integration
   - No UI/UX improvements
   - No new features

5. Code Analysis Requirements
   a. Service Layer Verification
      - Check both implementation AND interface files
      - Verify complete service contracts (interfaces, types, responses)
      - Examine error handling patterns
      - Document service capabilities and limitations

   b. Integration Analysis
      - Trace service usage through factory instantiation
      - Verify hook implementations
      - Confirm component integration patterns
      - Check all dependency imports and types

   c. Type Compatibility
      - Test type alignment across all layers:
        * Service layer
        * Hook layer
        * Component layer
      - Verify response type handling
      - Check error type propagation

   d. Documentation
      - Document any assumptions made
      - Note potential edge cases
      - Record type compatibility decisions
      - Explain service usage patterns

   e. Verification
      - Never skip analysis steps
      - Review all related files before changes
      - Test type compatibility thoroughly
      - Validate error handling paths

6. Preserve Existing Code
   - Don't delete working code
   - Keep existing patterns where possible
   - Maintain current functionality

## Custom Hooks
1. Core Hooks
   - [x] `useAuth` (AuthContext.tsx)
     - Purpose: Bridge between UI and AuthService/SecurityService
     - Used by: Login, ProtectedRoute, and authenticated components
     - Note: Must handle token refresh and session timeouts
   - [x] `useStats` (useStats.ts)
     - Purpose: Connect dashboard components to new metrics service
     - Used by: Dashboard, PendingPayments, and monitoring views
     - Note: Requires proper caching strategy for performance
   - [x] `useTheme` (ThemeContext.tsx)
     - Purpose: Manages theme state and provides theme switching functionality
     - Used by: Header, DevelopmentHeader, and other components needing theme awareness
     - Note: Must maintain theme persistence across sessions
   - [x] `useNavigation` (NavigationContext.tsx)
     - Purpose: Centralizes navigation state and history management
     - Used by: Sidebar, Header, and route-dependent components
     - Note: Coordinates with AuthContext for protected routes

## Components
1. Authentication Components
   - [x] `Login` (auth/Login.tsx)
     - Purpose: Handles authentication flow with AuthService
     - Used by: Public routes, reset password flow
     - Note: Integrates with SecurityService for MFA

   - [x] `AuthGuard` (auth/ProtectedRoute.tsx)
     - Purpose: Protects routes based on permissions
     - Used by: All protected routes
     - Note: Works with SecurityService for role checks

2. Client Management Components
   - [x] `ClientManagement` (client-management/ClientManagement.tsx)
     - Purpose: Main client management interface
     - Used by: Client routes
     - Note: Updated to use service factory and improved error handling

   - [x] `ClientList` (client-management/ClientList.tsx)
     - Purpose: Client listing and search
     - Used by: Client management views
     - Note: Updated with proper pagination and error handling

   - [x] `ClientManagementHeader` (client-management/ClientManagementHeader.tsx)
     - Purpose: Client context header
     - Used by: Client management views
     - Note: Added service integration and client context

   - [x] `Users` (client-management/Users.tsx)
     - Purpose: User management within client context
     - Used by: Client admins
     - Note: Added service integration with proper typing

   - [x] `Groups` (client-management/Groups.tsx)
     - Purpose: Permission group management
     - Used by: Client admins
     - Note: Added service integration with TODOs for missing endpoints

   - [x] `Roles` (client-management/Roles.tsx)
     - Purpose: Security role management
     - Used by: Client admins
     - Note: Updated to use proper service integration with permissionService
     - Components:
       - [x] RolesList: Integrated with clientService and permissionService
       - [x] RoleEdit: Added proper type safety and service integration

   - [x] `SecuritySettings` (client-management/security/SecuritySettings.tsx)
     - Purpose: Security settings management
     - Used by: Client admins
     - Note: Completed with full service integration and type safety

   - [x] `MemberSecuritySettings` (client-management/security/MemberSecuritySettings.tsx)
     - Purpose: Member-specific security rules
     - Used by: Client security admins
     - Note: Completed implementation with ServiceFactory integration
     - Implementation Details:
       - Added proper service integration through ServiceFactory
       - Implemented comprehensive settings validation
       - Added proper error handling and loading states
       - Improved UI organization and type safety

   - [x] `AuditSearch` (client-management/security/AuditSearch.tsx)
     - Purpose: Security audit trail interface
     - Used by: Compliance officers, auditors
     - Note: Heavy AuditService integration

   - [x] `ContactInformation` (client-management/ContactInformation.tsx)
     - Purpose: Client contact details management
     - Used by: ClientManagement
     - Note: Must integrate with updated client service

4. Bill Pay Components
   - [x] `BillPay` (bill-pay/BillPay.tsx)
     - Purpose: Main bill pay interface
     - Used by: Payment processors
     - Note: Core integration point for PaymentService
     - Changes:
       - Replaced direct API usage with ServiceFactory pattern
       - Integrated proper service interfaces
       - Improved type safety and route organization

   - [x] `Dashboard` (bill-pay/dashboard/Dashboard.tsx)
     - Purpose: Payment processing overview
     - Used by: Operations team
     - Note: Aggregates data from multiple services
     - Implementation Details:
       - Updated Dashboard component to use ServiceFactory
       - Integrated IBillPayService and IPaymentProcessorService
       - Added proper metric types and interfaces
       - Implemented time range filtering
       - Added transaction summary visualization
       - Fixed type safety issues

   - [x] `AuditLog` (bill-pay/settings/AuditLog.tsx)
     - Purpose: Payment audit trail
     - Used by: Compliance, auditors
     - Note: Combines PaymentService and AuditService data

   - [x] `Holidays` (bill-pay/settings/Holidays.tsx)
     - Purpose: Payment processing calendar
     - Used by: Operations team
     - Note: Critical for PaymentService scheduling

   - [x] `PermissionGroups` (bill-pay/settings/PermissionGroups.tsx)
     - Purpose: Payment-specific permissions
     - Used by: Security admins
     - Note: Links SecurityService with PaymentService

   - [x] `BillPayConfig` (bill-pay/settings/BillPayConfig.tsx)
     - Purpose: Payment processing rules
     - Used by: System administrators
     - Note: Core PaymentService configuration

   - [x] `ManualProcessing` (bill-pay/payments/ManualProcessing.tsx)
     - Purpose: Manual payment handling
     - Used by: Payment processors
     - Note: Direct PaymentService integration point

   - [x] `PayeeConversion` (bill-pay/payments/PayeeConversion.tsx)
     - Purpose: Payee data migration
     - Used by: Data operations team
     - Note: Complex PaymentService data flows

   - [x] `PendingPayments` (bill-pay/payments/PendingPayments.tsx)
     - Purpose: Payment queue management
     - Used by: Payment processors
     - Note: Real-time PaymentService monitoring

   - [x] `ExceptionDetails` (bill-pay/payments/ExceptionDetails.tsx)
     - Purpose: Detailed exception viewing
     - Used by: Payment processors
     - Note: Deep integration with ExceptionService

   - [x] `ExceptionTool` (bill-pay/payments/ExceptionTool.tsx)
     - Purpose: Exception handling interface
     - Used by: Payment processors
     - Note: Complex ExceptionService workflows

   - [x] `ExceptionResolution` (bill-pay/payments/ExceptionResolution.tsx)
     - Purpose: Exception resolution flow
     - Used by: Payment processors
     - Note: Coordinates PaymentService and ExceptionService

5. Common Components
   - [x] `ErrorBoundary` (common/ErrorBoundary.tsx)
     - Purpose: Standardized error handling
     - Used by: All service integrations
     - Note: Must handle all service error types

   - [x] `Form` (common/Form.tsx)
     - Purpose: Standardized form handling
     - Used by: All data entry components
     - Note: Validates against service schemas

   - [x] `DataTable` (common/DataTable.tsx)
     - Purpose: Standardized data display
     - Used by: All list views
     - Note: Handles service pagination patterns

   - [x] `NotFound` (common/NotFound.tsx)
     - Purpose: Standard 404 handling
     - Used by: All routes
     - Note: Must handle service-specific redirects

   - [x] `BaseModal` (common/BaseModal.tsx)
     - Purpose: Standard modal container
     - Used by: All dialogs
     - Note: Manages service loading states

   - [x] `MenuItem` (common/MenuItem.tsx)
     - Purpose: Navigation menu items
     - Used by: All navigation components
     - Note: Respects service permissions

6. Wrapper Components
   - [x] `ClientManagementWrapper` (client-management/wrappers/ClientManagementWrapper.tsx)
     - Purpose: Client context provider
     - Used by: Client management views
     - Note: Manages ClientService state, implements ID decoding and error handling

   - [x] `SecuritySettingsWrapper` (client-management/wrappers/SecuritySettingsWrapper.tsx)
     - Purpose: Security context provider
     - Used by: Security settings views
     - Note: Manages SecurityService state, complete with client ID validation

   - [x] `GroupsWrapper` (client-management/wrappers/GroupsWrapper.tsx)
     - Purpose: Group management context
     - Used by: Group management views
     - Note: Complete with loading states, error handling, and service integration

   - [x] `UserEditWrapper` (client-management/wrappers/UserEditWrapper.tsx)
     - Purpose: User editing context
     - Used by: User management views
     - Note: Complete with full state management and service integration

   - [x] `UsersWrapper` (client-management/wrappers/UsersWrapper.tsx)
     - Purpose: User list context
     - Used by: User list views
     - Note: Fully implemented with comprehensive logging and error handling

7. Development Components
   - [x] `DevelopmentHeader` (development/DevelopmentHeader.tsx)
     - Purpose: Development environment header
     - Used by: Development mode
     - Note: Provides development tools and environment info

8. User Management Components
   - [x] `UserSearch` (client-management/users/UserSearch.tsx)
     - Purpose: User search interface
     - Used by: User management views
     - Note: Complete with search form and loading states

   - [x] `UserForm` (client-management/users/UserForm.tsx)
     - Purpose: User data entry
     - Used by: User creation/editing
     - Note: Complete with validation and service integration

   - [x] `UserTable` (client-management/users/UserTable.tsx)
     - Purpose: User list display
     - Used by: User management views
     - Note: Complete with actions and navigation

9. Group Management Components
   - [x] `GroupsList` (client-management/groups/GroupsList.tsx)
     - Purpose: Group listing interface
     - Used by: Group management views
     - Note: Complete with sorting, filtering, and delete functionality

   - [x] `GroupEdit` (client-management/groups/GroupEdit.tsx)
     - Purpose: Group editing interface
     - Used by: Group management
     - Note: Complete with permission management and service integration

   - [x] `PermissionTreeView` (client-management/groups/PermissionTreeView.tsx)
     - Purpose: Permission hierarchy display
     - Used by: Group and role editors
     - Note: Complete with hierarchical permission management

10. Context Providers
    - [x] `AuthProvider` (context/AuthContext.tsx)
      - Purpose: Global authentication state
      - Used by: App root
      - Note: Complete with AuthService integration

    - [x] `ThemeProvider` (context/ThemeContext.tsx)
      - Purpose: Theme management
      - Used by: All components
      - Note: No service integration needed - UI only

11. Form Components
    - [x] `DashboardCard` (common/DashboardCard.tsx)
      - Purpose: Metric display container
      - Used by: Dashboard views
      - Note: UI-only component, receives metrics via props

    - [x] `Form` (common/Form.tsx)
      - Purpose: Dynamic form generation with validation
      - Used by: All data entry forms
      - Note: Complete with AuditService integration for form event logging

12. Emerge Admin Components (Pending Backend APIs)
    Note: Implementation of these components is blocked pending backend API development
    and stabilization. The following components will be implemented once the backend
    services are ready:

    - [ ] `MemberCenter` (emerge-admin/MemberCenter.tsx)
      - Purpose: Member management interface
      - Used by: Emerge administrators
      - Note: Integrates with MemberService
      - Dependencies: MemberService API

    - [ ] `MemberDashboard` (emerge-admin/member-center/MemberDashboard.tsx)
      - Purpose: Member overview and metrics
      - Used by: Emerge administrators
      - Note: Aggregates MemberService data
      - Dependencies: MemberService metrics endpoints

    - [ ] `MemberSearch` (emerge-admin/member-center/MemberSearch.tsx)
      - Purpose: Member lookup and filtering
      - Used by: Support staff
      - Note: Complex MemberService queries
      - Dependencies: MemberService search API

    - [ ] `SearchResults` (emerge-admin/member-center/components/search/SearchResults.tsx)
      - Purpose: Member search result display
      - Used by: Member search interface
      - Note: Handles MemberService pagination
      - Dependencies: MemberService pagination API

    - [ ] `DetailsDialog` (emerge-admin/components/DetailsDialog.tsx)
      - Purpose: Member detail viewing
      - Used by: Member management screens
      - Note: Detailed MemberService data display
      - Dependencies: MemberService detail API

    - [ ] `SyncDialog` (emerge-admin/components/SyncDialog.tsx)
      - Purpose: Member data synchronization
      - Used by: Admin tools
      - Note: Coordinates MemberService sync operations
      - Dependencies: MemberService sync API

    - [ ] `MoneyDesktop` (emerge-admin/MoneyDesktop.tsx)
      - Purpose: Financial management interface
      - Used by: Financial advisors
      - Note: Integrates with FinancialService
      - Dependencies: FinancialService API
