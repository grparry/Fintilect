---
type: pattern
category: security
status: active
priority: high
last_validated: 2024-12-31
impacts:
  - components/bill-pay/payment-processing.md
  - security/bill-pay/audit-patterns.md
  - core/form-patterns.md
  - core/error-handling.md
context_triggers:
  - "When implementing payment validation"
  - "When updating validation rules"
  - "When handling form submissions"
  - "When implementing error messages"
  - "When auditing validation failures"
---

# Bill Pay Validation Rules

## Core Principles
```yaml
purpose: "Secure payment validation framework"
key_aspects:
  - Input validation
  - Business rules
  - Security checks
  - Audit compliance
```

## Validation Patterns
```yaml
amount_validation:
  pattern: "Payment Amount Security"
  rules:
    range_checks:
      - Minimum amounts
      - Maximum limits
      - Currency validation
    
    threshold_rules:
      - Role-based limits
      - Override thresholds
      - Batch totals
    
    format_validation:
      - Currency formats
      - Decimal handling
      - Precision rules

schedule_validation:
  pattern: "Payment Timing Security"
  rules:
    date_checks:
      - Future dating
      - Holiday validation
      - Processing windows
    
    frequency_rules:
      - Repeat patterns
      - Interval limits
      - End date validation
    
    batch_timing:
      - Processing windows
      - Volume limits
      - Time distribution
```

## Security Integration
```yaml
validation_flow:
  pattern: "Progressive Validation"
  stages:
    input:
      - Format validation
      - Range checks
      - Basic rules
    
    business:
      - Role limits
      - Schedule rules
      - Account status
    
    security:
      - Permission checks
      - Threshold validation
      - Override verification

error_handling:
  pattern: "Secure Validation Errors"
  implementation:
    detection:
      - Early validation
      - Clear messages
      - Error categorization
    
    response:
      - Safe error details
      - User guidance
      - Audit logging
```

## Rule Management
```yaml
rule_structure:
  pattern: "Dynamic Rules"
  implementation:
    definition:
      - Rule composition
      - Parameter limits
      - Error messages
    
    enforcement:
      - Runtime validation
      - Error handling
      - Audit logging
    
    management:
      - Rule updates
      - Version control
      - Change tracking

override_rules:
  pattern: "Secure Overrides"
  implementation:
    request:
      - Justification
      - Limit delta
      - Time window
    
    approval:
      - Authority level
      - Risk assessment
      - Documentation
    
    execution:
      - Override tracking
      - Audit logging
      - Status updates
```

## Anti-Patterns
```yaml
avoid:
  client_validation:
    why: "Security bypass risk"
    instead: "Server validation"
    
  rule_caching:
    why: "Outdated rules"
    instead: "Real-time validation"
    
  silent_failures:
    why: "Security opacity"
    instead: "Clear validation"
```

## Testing Strategy
```yaml
approach:
  rule_tests:
    - Validation coverage
    - Edge cases
    - Error handling
    
  security_tests:
    - Bypass attempts
    - Override handling
    - Audit logging
    
  performance_tests:
    - Rule evaluation
    - Batch validation
    - Error processing
```

## Integration Guidelines
```yaml
system_integration:
  patterns:
    - Rule propagation
    - Error handling
    - Status updates
  
  security:
    - Context preservation
    - Permission checking
    - Audit consistency

external_validation:
  patterns:
    - Third-party checks
    - Service integration
    - Response handling
  
  security:
    - Data protection
    - Error handling
    - Status tracking
```

## Performance Considerations
```yaml
optimization:
  rule_evaluation:
    - Progressive checks
    - Early termination
    - Efficient ordering
  
  batch_validation:
    - Parallel processing
    - Error aggregation
    - Status tracking
```
