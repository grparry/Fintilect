---
type: pattern
category: component
status: active
last_validated: 2024-12-31
impacts:
  - patterns/core/accessibility.md
  - patterns/core/routing-patterns.md
  - patterns/security/client-management/access-control.md
---

# MenuItem Pattern

## Core Principles
```yaml
purpose: "Secure, permission-based navigation"
key_aspects:
  - Permission-based visibility
  - Domain context awareness
  - Navigation security
  - State preservation
```

## Implementation Pattern
```yaml
structure:
  composition:
    - Route definition (secure)
    - Permission check (domain-aware)
    - State handling (isolated)
    - Context preservation

  security_integration:
    visibility:
      - Permission-based display
      - Domain context check
      - Role validation
    
    navigation:
      - Route authorization
      - Context preservation
      - State management

  state_handling:
    scope: "Navigation context"
    considerations:
      - Permission state
      - Domain context
      - Navigation history
```

## Domain Integration
```yaml
bill_pay_domain:
  context: "Payment Operations"
  menu_structure:
    - Payments
    - Exceptions
    - Settings
  permissions:
    - View payments
    - Manage exceptions
    - Configure settings

client_management_domain:
  context: "Organization Management"
  menu_structure:
    - Users
    - Groups
    - Roles
  permissions:
    - Manage users
    - Configure groups
    - Assign roles
```

## Navigation Patterns
```yaml
routing:
  pattern: "Secure Routes"
  implementation:
    - Check route permissions
    - Validate domain access
    - Preserve context
  security:
    - Authorization check
    - Context validation
    - State preservation

state_management:
  pattern: "Navigation State"
  implementation:
    - Store active state
    - Handle transitions
    - Manage history
  considerations:
    - Permission changes
    - Context switches
    - State cleanup

context_handling:
  pattern: "Domain Context"
  implementation:
    - Maintain domain context
    - Handle transitions
    - Preserve state
  security:
    - Context isolation
    - Permission checks
    - State protection
```

## Anti-Patterns
```yaml
avoid:
  direct_navigation:
    why: "Bypasses security"
    instead: "Use authorized routes"
    
  shared_state:
    why: "Context confusion"
    instead: "Domain-specific state"
    
  permission_caching:
    why: "Security risk"
    instead: "Real-time checks"
```

## User Experience
```yaml
interaction:
  visibility:
    - Clear availability
    - Permission feedback
    - Context indication
    
  navigation:
    - Smooth transitions
    - Loading states
    - Error handling
    
  feedback:
    - Access denied
    - Loading progress
    - Context changes
```

## Testing Strategy
```yaml
approach:
  permission_tests:
    - Visibility rules
    - Access control
    - Role changes
    
  navigation_tests:
    - Route handling
    - Context preservation
    - State management
    
  security_tests:
    - Authorization
    - Context isolation
    - State protection
```

## Usage Guidelines
```yaml
when_to_use:
  - Protected routes
  - Domain-specific navigation
  - Role-based access
  - Context-aware navigation

when_to_avoid:
  - Public routes
  - Static navigation
  - Unauthenticated access
  - Context-free navigation
```

## Migration Notes
```yaml
considerations:
  - Permission integration
  - Context preservation
  - State management
  - User experience

validation:
  - Security checks
  - Permission rules
  - Context handling
  - Navigation flow
```
