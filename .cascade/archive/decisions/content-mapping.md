# Content Migration Mapping

## Component Patterns
```yaml
common_components:
  Form.md:
    patterns:
      - patterns/components/common/forms.md
      - patterns/components/common/validation.md
    relationships:
      - relationships/forms/validation-flow.md
    key_concepts:
      - Form composition patterns
      - Validation strategies
      - Error handling
      - State management
  
  DataTable.md:
    patterns:
      - patterns/components/common/tables.md
      - patterns/components/common/pagination.md
    relationships:
      - relationships/data/table-integration.md
    key_concepts:
      - Data presentation patterns
      - Sorting and filtering
      - Performance optimization
      - State management

  ErrorBoundary.md:
    patterns:
      - patterns/components/common/error-handling.md
    relationships:
      - relationships/errors/boundary-flow.md
    key_concepts:
      - Error containment
      - Recovery strategies
      - User feedback
      - Logging patterns

feature_components:
  "bill-pay/*.md":
    patterns:
      - patterns/components/bill-pay/processing.md
      - patterns/components/bill-pay/exceptions.md
    relationships:
      - relationships/bill-pay/payment-flow.md
    key_concepts:
      - Payment processing
      - Exception handling
      - Audit logging
      - Security checks

  "auth/*.md":
    patterns:
      - patterns/components/auth/authentication.md
      - patterns/components/auth/authorization.md
    relationships:
      - relationships/auth/auth-flow.md
    key_concepts:
      - Authentication flow
      - Permission management
      - Session handling
      - Security patterns

  "client-management/*.md":
    patterns:
      - patterns/components/client-management/organization.md
      - patterns/components/client-management/roles.md
      - patterns/components/client-management/security.md
    relationships:
      - relationships/client-management/organization-flow.md
    key_concepts:
      - Organization patterns
      - Role management patterns
      - Compliance patterns
      - Integration patterns
```

## System Analyses
```yaml
completed_analysis:
  bill_pay:
    file: "decisions/analysis/bill-pay-relationships.md"
    key_findings:
      - Complex payment lifecycle
      - Critical exception handling
      - Multi-level state management
      - External system integration
    migration_priorities:
      - Payment flow patterns
      - Exception handling patterns
      - Integration patterns
      - Security patterns

  auth:
    file: "decisions/analysis/auth-relationships.md"
    key_findings:
      - Layered security model
      - Complex permission hierarchy
      - Token-based authentication
      - Audit requirements
    migration_priorities:
      - Authentication patterns
      - Permission patterns
      - Security patterns
      - Integration patterns

  client_management:
    file: "decisions/analysis/client-management-relationships.md"
    key_findings:
      - Hierarchical organization model
      - Complex role management
      - Compliance requirements
      - Multi-level access control
    migration_priorities:
      - Organization patterns
      - Role management patterns
      - Compliance patterns
      - Integration patterns

  permission_systems:
    file: "decisions/analysis/permission-systems.md"
    key_findings:
      - Two separate permission systems
      - Distinct domain boundaries
      - Future consolidation plans
      - Independent security contexts
    migration_priorities:
      - Document system separation
      - Maintain boundary clarity
      - Preserve domain specifics
      - Note consolidation path

  dashboard:
    file: "decisions/analysis/dashboard-relationships.md"
    key_findings:
      - Domain-specific dashboards
      - Shared presentation components
      - Permission system integration
      - Isolated state management
    migration_priorities:
      - Document domain boundaries
      - Preserve security contexts
      - Define shared patterns
      - Maintain isolation

  common_components:
    file: "decisions/analysis/common-components-relationships.md"
    key_findings:
      - Domain-aware shared components
      - Security-conscious design
      - Cross-domain usage patterns
      - Permission-based customization
    migration_priorities:
      - Document security integration
      - Define customization patterns
      - Maintain domain boundaries
      - Specify state isolation
```

## Pattern Extraction Plan
```yaml
common_patterns:
  presentation:
    sources:
      - dashboard: "DashboardCard"
      - common: "presentation_components"
    target: "patterns/components/common/presentation.md"
    considerations:
      - Security context isolation
      - Domain-specific usage
      - Permission awareness

  data_display:
    sources:
      - common: "DataTable"
    target: "patterns/components/common/data-display.md"
    considerations:
      - Permission-based visibility
      - Domain-specific actions
      - Filtered access

  form_handling:
    sources:
      - common: "Form"
    target: "patterns/components/common/forms.md"
    considerations:
      - Field-level permissions
      - Validation context
      - Action authorization

  error_handling:
    sources:
      - common: "ErrorBoundary, NotFound"
      - bill_pay: "exception_handling"
      - auth: "error_handling"
      - client_management: "error_handling"
    target: "patterns/error/handling.md"
    considerations:
      - Domain-specific errors
      - Information exposure
      - Context preservation

  navigation:
    sources:
      - common: "MenuItem"
    target: "patterns/components/common/navigation.md"
    considerations:
      - Permission-based routing
      - Domain context
      - Access control

  state_management:
    sources:
      - bill_pay: "payment_state, exception_state"
      - auth: "auth_state, permission_state"
      - client_management: "client_state, security_state"
      - dashboard: "dashboard_state"
    target: "patterns/state/management.md"
    
  integration:
    sources:
      - bill_pay: "external_systems"
      - auth: "identity_provider"
      - client_management: "identity_service, compliance_system"
    target: "patterns/integration/external.md"

  hierarchical:
    sources:
      - client_management: "hierarchical_management"
      - auth: "permission_hierarchy"
    target: "patterns/organization/hierarchy.md"

  security_patterns:
    bill_pay_permissions:
      source: "src/components/bill-pay/settings/PermissionGroups"
      target: "patterns/bill-pay/security/permissions.md"
      isolation:
        - Domain-specific patterns
        - Payment operation focus
        - Transaction-level security
  
    client_management_permissions:
      source: "src/components/client-management/roles"
      target: "patterns/client-management/security/permissions.md"
      isolation:
        - Organization-wide patterns
        - Group hierarchy patterns
        - Cross-system security

    remove:
      - Shared permission structures
      - Cross-system role definitions
    maintain:
      - Basic security principles
      - Authentication patterns
      - Audit requirements

feature_patterns:
  bill_pay:
    payment_processing:
      source: "payment_processing"
      target: "patterns/bill-pay/processing.md"
    exception_handling:
      source: "exception_handling"
      target: "patterns/bill-pay/exceptions.md"
      
  auth:
    authentication:
      source: "authentication_flow"
      target: "patterns/auth/authentication.md"
    authorization:
      source: "authorization"
      target: "patterns/auth/authorization.md"

  client_management:
    organization:
      source: "client_management"
      target: "patterns/client-management/organization.md"
    roles:
      source: "roles"
      target: "patterns/client-management/roles.md"
    security:
      source: "security_setup"
      target: "patterns/client-management/security.md"

  dashboard:
    bill_pay:
      source: "BillPayDashboard"
      target: "patterns/bill-pay/dashboard.md"
      security: "Bill Pay Permissions"
    
    client_management:
      source: "ReportDashboard, AnalyticsDashboard"
      target: "patterns/client-management/dashboard.md"
      security: "Client Management Permissions"
```

## Mock Patterns
```yaml
bill_pay_mocks:
  source: "src/mocks/bill-pay/*.md"
  patterns:
    - patterns/testing/mock-strategies.md
    - patterns/testing/data-generation.md
  key_concepts:
    - Mock data patterns
    - Test data relationships
    - Error scenarios
    - State simulation

auth_mocks:
  source: "src/mocks/auth/*.md"
  patterns:
    - patterns/testing/auth-mocks.md
  key_concepts:
    - Authentication mocks
    - Permission testing
    - Session simulation
    - Error cases

client_management_mocks:
  source: "src/mocks/client-management/*.md"
  patterns:
    - patterns/testing/client-management-mocks.md
  key_concepts:
    - Organization mocks
    - Role testing
    - Security simulation
    - Error cases
```

## Migration Progress
```yaml
status:
  analysis: "Complete (All systems analyzed)"
  pattern_extraction: "Ready to start"
  implementation: "Pending"
  verification: "Pending"

next_steps:
  - Begin pattern extraction
  - Create pattern documentation
  - Document security boundaries
  - Implement new structure
