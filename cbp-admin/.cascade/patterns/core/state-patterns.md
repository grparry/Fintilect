---
type: pattern
category: core
status: active
last_validated: 2024-12-31
impacts:
  - patterns/core/data-flow.md
  - patterns/components/bill-pay/admin-model.md
  - patterns/components/account-management/account-model.md
  - patterns/components/client-management/organization-model.md
---

# State Management Patterns

## Core Principles
```yaml
philosophy:
  - State colocation
  - Single source of truth
  - Predictable updates
  - Type safety

state_types:
  server:
    purpose: "Remote data cache"
    pattern: "Normalized store"
    location: "src/context/{feature}"
  
  ui:
    purpose: "Interface state"
    pattern: "Component state"
    location: "Component level"
  
  form:
    purpose: "Input handling"
    pattern: "Form libraries"
    location: "Form components"
```

## Context Organization
```yaml
patterns:
  feature_contexts:
    structure:
      - Context provider
      - Actions/reducers
      - Selectors
      - Types
    
    rules:
      - One context per feature
      - Clear boundaries
      - Minimal cross-context deps
      - Type-safe actions

  shared_contexts:
    structure:
      - Global state
      - Auth state
      - Theme/preferences
      - Notifications
    
    rules:
      - Minimal global state
      - Clear update patterns
      - Performance conscious
      - Handle hydration
```

## State Updates
```yaml
patterns:
  optimistic:
    when: "Immediate feedback needed"
    implementation:
      - Cache previous state
      - Update UI immediately
      - Handle failures
      - Revert on error
  
  pessimistic:
    when: "Data consistency critical"
    implementation:
      - Show loading state
      - Wait for confirmation
      - Handle errors
      - Update on success

rules:
  - Batch related updates
  - Handle race conditions
  - Maintain consistency
  - Clear error states
```

## Performance Patterns
```yaml
optimization:
  selectors:
    - Memoize expensive computations
    - Use reselect pattern
    - Minimize rerenders
    - Profile performance
  
  updates:
    - Batch state changes
    - Debounce/throttle
    - Optimize lists
    - Handle large datasets
```

## Integration Patterns
```yaml
api_integration:
  patterns:
    - Cache responses
    - Handle loading states
    - Error boundaries
    - Optimistic updates
  
  implementation:
    location: "src/services"
    structure:
      - Service layer
      - State adapters
      - Error handling
      - Cache management
```
