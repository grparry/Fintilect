---
type: pattern
category: component
status: active
priority: critical
last_validated: 2024-12-31
impacts:
  - core/form-patterns.md
  - core/accessibility.md
  - security/bill-pay/validation-rules.md
  - components/bill-pay/payment-processing.md
context_triggers:
  - "When implementing form components"
  - "When handling user input"
  - "When implementing form validation"
  - "When ensuring form accessibility"
  - "When managing form state"
---

# Form Component Pattern

## Core Principles
```yaml
purpose: "Standardized, secure form handling across domains"
key_aspects:
  - Domain-aware validation
  - Permission-based field control
  - Consistent error handling
  - Security context preservation
```

## Implementation Pattern
```yaml
structure:
  composition:
    - Field definitions (domain-specific)
    - Validation rules (security-aware)
    - Permission checks (domain context)
    - Error handling (isolated)

  security_integration:
    field_level:
      - Permission-based visibility
      - Domain-specific validation
      - Sensitive data handling
    
    form_level:
      - Action authorization
      - Data access control
      - Context preservation

  state_management:
    scope: "Form-level, domain-isolated"
    considerations:
      - No cross-domain state sharing
      - Permission-aware caching
      - Secure state cleanup
```

## Domain Integration
```yaml
bill_pay_domain:
  context: "Payment Operations"
  considerations:
    - Payment-specific validation
    - Transaction security
    - Amount formatting
  example_usage:
    - Payment forms
    - Exception handling forms
    - Configuration forms

client_management_domain:
  context: "Organization Management"
  considerations:
    - Role-based field access
    - Group hierarchy validation
    - Multi-level permissions
  example_usage:
    - User management forms
    - Group configuration
    - Permission assignment
```

## Common Patterns
```yaml
validation:
  pattern: "Domain-Specific Rules"
  implementation:
    - Validate within domain context
    - Apply permission-based rules
    - Handle domain-specific formats
  example:
    bill_pay:
      - Amount validation
      - Payment limits
      - Schedule validation
    client_management:
      - Role validation
      - Group membership
      - Permission conflicts

error_handling:
  pattern: "Contextual Errors"
  implementation:
    - Domain-specific messages
    - Security-aware details
    - Permission-based guidance
  considerations:
    - Information exposure
    - Error propagation
    - Recovery actions

field_control:
  pattern: "Permission-Based Access"
  implementation:
    - Check field-level permissions
    - Apply domain rules
    - Handle conditional visibility
  security:
    - Maintain domain boundaries
    - Validate all access
    - Preserve context
```

## Anti-Patterns
```yaml
avoid:
  cross_domain_validation:
    why: "Violates domain separation"
    instead: "Use domain-specific validation"
    
  shared_state:
    why: "Security context leakage"
    instead: "Maintain domain-isolated state"
    
  mixed_permissions:
    why: "Confuses security boundaries"
    instead: "Use domain-specific permission checks"
```

## Testing Strategy
```yaml
approach:
  unit_tests:
    - Test base functionality
    - Verify permission checks
    - Validate error handling
    
  integration_tests:
    - Test domain integration
    - Verify security boundaries
    - Check state isolation

  security_tests:
    - Verify permission enforcement
    - Test data isolation
    - Check context preservation
```

## Usage Guidelines
```yaml
when_to_use:
  - Complex form requirements
  - Security-critical operations
  - Multi-step workflows
  - Permission-based forms

when_to_avoid:
  - Simple, non-secure forms
  - Single-field inputs
  - Read-only displays
  - Domain-agnostic content
```

## Migration Notes
```yaml
considerations:
  - Convert existing forms gradually
  - Maintain parallel implementations
  - Verify security boundaries
  - Test thoroughly

validation:
  - Check permission preservation
  - Verify domain isolation
  - Test error handling
  - Confirm state management
```
