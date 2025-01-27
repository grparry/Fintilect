---
type: pattern
category: component
status: active
priority: high
last_validated: 2024-12-31
impacts:
  - patterns/core/accessibility.md
  - patterns/core/performance.md
  - patterns/components/bill-pay/admin-model.md
  - patterns/components/account-management/account-model.md
context_triggers:
  - "When displaying tabular data"
  - "When implementing data sorting"
  - "When handling data pagination"
  - "When implementing table search"
  - "When ensuring table accessibility"
---

# DataTable Pattern

## Core Principles
```yaml
purpose: "Secure, domain-aware data presentation"
key_aspects:
  - Permission-based visibility
  - Domain-specific actions
  - Secure data handling
  - Performance optimization
```

## Implementation Pattern
```yaml
structure:
  composition:
    - Column definitions (permission-aware)
    - Row actions (domain-specific)
    - Filtering (security context)
    - Pagination (performance)

  security_integration:
    column_level:
      - Permission-based visibility
      - Sensitive data handling
      - Format control
    
    row_level:
      - Action authorization
      - Data access control
      - Bulk operations

  state_management:
    scope: "Table-level, domain-isolated"
    considerations:
      - Pagination state
      - Sort/filter preferences
      - Selection state
```

## Domain Integration
```yaml
bill_pay_domain:
  context: "Payment Operations"
  considerations:
    - Transaction security
    - Amount formatting
    - Status handling
  example_usage:
    - Payment lists
    - Exception tables
    - Audit logs

client_management_domain:
  context: "Organization Management"
  considerations:
    - Role-based visibility
    - Group hierarchy
    - Permission display
  example_usage:
    - User lists
    - Group tables
    - Permission matrices
```

## Common Patterns
```yaml
column_control:
  pattern: "Permission-Based Visibility"
  implementation:
    - Check column permissions
    - Handle sensitive data
    - Format by domain
  security:
    - Validate all access
    - Control data exposure
    - Maintain context

row_actions:
  pattern: "Domain-Specific Operations"
  implementation:
    - Check action permissions
    - Validate domain context
    - Handle errors
  security:
    - Authorize operations
    - Validate context
    - Log actions

data_loading:
  pattern: "Secure Pagination"
  implementation:
    - Permission-based queries
    - Efficient loading
    - Cache management
  considerations:
    - Data access control
    - Performance impact
    - Memory usage
```

## Anti-Patterns
```yaml
avoid:
  cross_domain_operations:
    why: "Violates domain boundaries"
    instead: "Use domain-specific actions"
    
  shared_filters:
    why: "Security context confusion"
    instead: "Maintain domain-specific filters"
    
  mixed_permissions:
    why: "Security boundary violation"
    instead: "Use domain-specific permissions"
```

## Performance Patterns
```yaml
optimization:
  pagination:
    - Server-side processing
    - Efficient sorting
    - Smart filtering
    
  caching:
    - Domain-specific cache
    - Permission-aware
    - Invalidation strategy
    
  rendering:
    - Virtual scrolling
    - Progressive loading
    - Optimized updates
```

## Testing Strategy
```yaml
approach:
  unit_tests:
    - Column visibility
    - Action permissions
    - Format handling
    
  integration_tests:
    - Data loading
    - Permission checks
    - Action handling
    
  performance_tests:
    - Large datasets
    - Complex filters
    - Many columns
```

## Usage Guidelines
```yaml
when_to_use:
  - Large datasets
  - Complex operations
  - Permission-based views
  - Domain-specific actions

when_to_avoid:
  - Simple lists
  - Static data
  - Single-domain views
  - Read-only displays
```

## Migration Notes
```yaml
considerations:
  - Gradual conversion
  - Performance testing
  - Security verification
  - Domain isolation

validation:
  - Permission checks
  - Performance impact
  - Security boundaries
  - Data handling
```
