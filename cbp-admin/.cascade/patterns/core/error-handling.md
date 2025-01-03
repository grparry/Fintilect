---
type: pattern
category: core
status: active
priority: high
last_validated: 2024-12-31
impacts:
  - components/bill-pay/exception-handling.md
  - core/api-patterns.md
  - integration/coordination.md
  - security/client-management/audit-patterns.md
context_triggers:
  - "When implementing error handling in new features"
  - "When modifying API error responses"
  - "When handling system exceptions"
  - "When logging errors for audit"
  - "When implementing user error messages"
---

# Error Handling Patterns

## Core Strategy
```yaml
philosophy:
  - Fail fast and explicitly
  - Provide actionable error messages
  - Maintain type safety
  - Preserve error context

layers:
  api:
    location: "src/services"
    pattern: "Try-catch with error transformation"
    
  business:
    location: "src/components/{feature}"
    pattern: "Error boundaries with fallback UI"
    
  ui:
    location: "src/components/common"
    pattern: "Inline error states"
```

## Error Types
```yaml
hierarchy:
  BaseError:
    purpose: "Common error properties"
    usage: "Base class for all custom errors"
    
  ApiError:
    extends: "BaseError"
    purpose: "API communication errors"
    properties:
      - statusCode
      - endpoint
      - requestId
    
  ValidationError:
    extends: "BaseError"
    purpose: "Data validation failures"
    properties:
      - fieldErrors
      - constraints
    
  BusinessError:
    extends: "BaseError"
    purpose: "Business rule violations"
    properties:
      - ruleId
      - context
```

## Implementation Rules
```yaml
service_layer:
  - Transform all external errors to known types
  - Include request context
  - Log errors with appropriate severity
  - Implement retry for transient failures

component_layer:
  - Use error boundaries for feature isolation
  - Provide meaningful fallback UI
  - Handle loading/error states consistently
  - Clear error state on retry

common_components:
  - Support error prop interface
  - Provide clear error visualization
  - Enable retry mechanisms
  - Maintain accessibility
```

## Error Boundary Strategy
```yaml
placement:
  - One per major feature
  - Around third-party components
  - At route boundaries

recovery:
  - Preserve navigation state
  - Clear problematic state
  - Enable manual retry
  - Provide support options
```

## Error Handling Pattern
```yaml
type: core_pattern
category: error_handling
status: active
last_validated: 2024-12-31

implementation:
  type: "React error boundary with type-safe error handling"
  components:
    - boundary: "ErrorBoundary"
      responsibilities:
        - "Catch React component errors"
        - "Provide fallback UI"
        - "Error logging"
    - types:
        - "ApiErrorResponse"
        - "ErrorBoundaryProps"
        - "ErrorBoundaryState"
  
features:
  - "React component error catching"
  - "Type-safe error responses"
  - "Fallback UI rendering"
  - "Error logging to console"

validation:
  implemented:
    - "Error boundary lifecycle methods"
    - "Type-safe error props and state"
    - "API error response typing"

processing:
  priority: 2
  load_strategy: "eager"
  validation_level: "typescript"
```
