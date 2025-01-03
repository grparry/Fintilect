---
type: pattern
category: core
status: active
last_validated: 2024-12-31
impacts:
  - patterns/core/api-patterns.md
  - patterns/core/data-flow.md
  - patterns/integration/coordination.md
  - patterns/components/common/data-tables.md
---

# Performance Optimization Patterns

## Core Strategies
```yaml
rendering:
  patterns:
    - Use React.memo for expensive renders
    - Implement virtualization for long lists
    - Lazy load routes and large components
    - Optimize component re-renders
  
  rules:
    - Profile before optimizing
    - Measure impact of changes
    - Document performance requirements
    - Balance bundle size vs functionality

data_management:
  patterns:
    - Normalize state shape
    - Implement proper memoization
    - Use efficient data structures
    - Cache API responses
  
  rules:
    - Monitor memory usage
    - Implement pagination
    - Use appropriate data structures
    - Clear stale cache data
```

## Implementation Guidelines
```yaml
code_splitting:
  when:
    - Route-level splitting
    - Large feature modules
    - Heavy third-party dependencies
    - Conditional features
  
  implementation:
    - Use React.lazy
    - Add Suspense boundaries
    - Preload critical chunks
    - Monitor bundle sizes

state_optimization:
  patterns:
    - Selective re-rendering
    - Computed properties
    - State normalization
    - Memory management
  
  implementation:
    - Use selector pattern
    - Implement proper memoization
    - Monitor render counts
    - Profile state updates
```

## Performance Budgets
```yaml
metrics:
  initial_load:
    target: "< 2s"
    budget:
      js: "400kb"
      css: "100kb"
      images: "300kb"
  
  interaction:
    target: "< 100ms"
    techniques:
      - Debounce user input
      - Throttle expensive operations
      - Optimize critical paths
      - Use web workers for computation
```

## Monitoring Strategy
```yaml
metrics:
  - First Contentful Paint
  - Time to Interactive
  - Total Blocking Time
  - Cumulative Layout Shift

tools:
  - React DevTools Profiler
  - Lighthouse
  - Chrome Performance Panel
  - Custom performance marks
```
