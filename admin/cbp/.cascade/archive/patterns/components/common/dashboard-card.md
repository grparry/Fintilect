---
type: pattern
category: component
status: active
last_validated: 2024-12-31
impacts:
  - patterns/core/accessibility.md
  - patterns/components/bill-pay/admin-model.md
  - patterns/components/account-management/account-model.md
  - patterns/components/client-management/organization-model.md
---

# DashboardCard Pattern

## Core Principles
```yaml
purpose: "Secure, domain-specific metric presentation"
key_aspects:
  - Permission-based visibility
  - Domain-specific metrics
  - Real-time updates
  - Performance optimization
```

## Implementation Pattern
```yaml
structure:
  composition:
    - Metric display (domain-specific)
    - Update mechanism (secure)
    - Action handlers (authorized)
    - Loading states

  security_integration:
    metric_access:
      - Permission-based visibility
      - Data access control
      - Update authorization
    
    actions:
      - Operation permissions
      - Context preservation
      - Audit logging

  state_management:
    scope: "Card-level, domain-isolated"
    considerations:
      - Update frequency
      - Cache invalidation
      - Permission changes
```

## Domain Integration
```yaml
bill_pay_domain:
  context: "Payment Operations"
  metrics:
    - Payment volumes
    - Exception counts
    - Processing status
  actions:
    - View details
    - Handle exceptions
    - Refresh data

client_management_domain:
  context: "Organization Management"
  metrics:
    - Active users
    - Group counts
    - Permission changes
  actions:
    - View users
    - Manage groups
    - Check permissions
```

## Display Patterns
```yaml
metric_presentation:
  pattern: "Domain-Aware Display"
  implementation:
    - Format by domain
    - Apply permissions
    - Show context
  examples:
    bill_pay:
      - Currency formatting
      - Status indicators
      - Trend displays
    client_management:
      - User statistics
      - Group metrics
      - Role summaries

update_handling:
  pattern: "Secure Updates"
  implementation:
    - Check permissions
    - Validate source
    - Control frequency
  security:
    - Data validation
    - Source verification
    - Rate limiting

interaction:
  pattern: "Authorized Actions"
  implementation:
    - Permission checks
    - Context preservation
    - Response handling
  security:
    - Action validation
    - Context maintenance
    - Audit logging
```

## Performance Patterns
```yaml
optimization:
  updates:
    pattern: "Efficient Refresh"
    implementation:
      - Smart polling
      - WebSocket security
      - Cache strategy
    considerations:
      - Permission caching
      - Update frequency
      - Resource usage

  rendering:
    pattern: "Optimized Display"
    implementation:
      - Minimal updates
      - Efficient DOM
      - State management
    focus:
      - Update batching
      - Memory usage
      - Render optimization
```

## Anti-Patterns
```yaml
avoid:
  continuous_polling:
    why: "Resource intensive"
    instead: "Smart update strategy"
    
  shared_updates:
    why: "Security context mixing"
    instead: "Domain-specific updates"
    
  cached_permissions:
    why: "Security risk"
    instead: "Real-time permission checks"
```

## Layout Patterns
```yaml
responsive:
  pattern: "Adaptive Display"
  implementation:
    - Size awareness
    - Content priority
    - Layout shifts
  considerations:
    - Information hierarchy
    - Permission visibility
    - Context preservation

grid_system:
  pattern: "Dynamic Grid"
  implementation:
    - Permission-based layout
    - Domain grouping
    - Responsive design
  security:
    - Layout permissions
    - Group access
    - Visual hierarchy
```

## Testing Strategy
```yaml
approach:
  display_tests:
    - Metric formatting
    - Update handling
    - Permission display
    
  performance_tests:
    - Update frequency
    - Render efficiency
    - Memory usage
    
  security_tests:
    - Permission checks
    - Update validation
    - Action authorization
```

## Usage Guidelines
```yaml
when_to_use:
  - Domain metrics
  - Real-time data
  - Interactive dashboards
  - Permission-based views

when_to_avoid:
  - Static content
  - Simple displays
  - Infrequent updates
  - Public data
```

## Migration Notes
```yaml
considerations:
  - Update mechanism
  - Permission integration
  - Performance impact
  - Domain separation

validation:
  - Security checks
  - Update efficiency
  - Display consistency
  - User experience
```

## Real-time Considerations
```yaml
update_strategy:
  patterns:
    polling:
      - Permission-based intervals
      - Resource optimization
      - Error handling
    
    websocket:
      - Secure connections
      - Permission validation
      - State synchronization
    
    server_sent:
      - Event authorization
      - Connection security
      - State management

  security:
    connection:
      - Authentication
      - Authorization
      - Rate limiting
    
    data:
      - Validation
      - Sanitization
      - Access control
```
