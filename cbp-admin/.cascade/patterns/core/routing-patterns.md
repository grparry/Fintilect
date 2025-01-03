---
type: pattern
category: core
status: active
last_validated: 2024-12-31
impacts:
  - patterns/core/security.md
  - patterns/security/client-management/access-control.md
  - patterns/components/common/menu-items.md
---

# Routing and Navigation Patterns

## Route Structure
```yaml
organization:
  base_routes:
    location: "src/routes"
    files:
      - routes.tsx: "Route definitions"
      - guards.tsx: "Route protection"
      - layouts.tsx: "Route layouts"
  
  feature_routes:
    location: "src/routes/{feature}"
    pattern: "{feature}Routes.tsx"
```

## Route Patterns
```yaml
patterns:
  protected_routes:
    implementation:
      - Auth checking
      - Permission validation
      - Role verification
      - Redirect handling
    
  lazy_routes:
    implementation:
      - Code splitting
      - Suspense fallback
      - Error boundary
      - Preloading
    
  nested_routes:
    implementation:
      - Shared layouts
      - Nested outlets
      - Route parameters
      - Query handling
```

## Navigation Guards
```yaml
types:
  auth_guard:
    - Check authentication
    - Redirect to login
    - Remember intended path
    - Handle token expiry
  
  permission_guard:
    - Check permissions
    - Validate roles
    - Handle unauthorized
    - Log attempts
  
  feature_guard:
    - Check feature flags
    - Handle unavailable
    - Show alternatives
    - Log access
```

## State Management
```yaml
patterns:
  location_state:
    - Current route
    - Query parameters
    - Route parameters
    - Navigation state
  
  history_state:
    - Navigation history
    - Previous route
    - Return paths
    - Breadcrumbs
```

## Navigation Events
```yaml
handlers:
  before_navigate:
    - Save form state
    - Confirm navigation
    - Clean up resources
    - Cancel requests
  
  after_navigate:
    - Update title
    - Track analytics
    - Load data
    - Focus management
```

## Performance
```yaml
optimization:
  code_splitting:
    - Route-based splitting
    - Component prefetching
    - Dynamic imports
    - Bundle analysis
  
  data_loading:
    - Parallel routes
    - Data prefetching
    - Loading states
    - Error handling
```

## Accessibility
```yaml
requirements:
  navigation:
    - Focus management
    - Skip links
    - Announcements
    - Keyboard nav
  
  structure:
    - Clear hierarchy
    - Consistent layout
    - Predictable paths
    - Error pages
```

## URL Management
```yaml
patterns:
  parameters:
    - Route params
    - Query params
    - State params
    - Hash fragments
  
  serialization:
    - Parameter encoding
    - State serialization
    - URL validation
    - Length limits
```
