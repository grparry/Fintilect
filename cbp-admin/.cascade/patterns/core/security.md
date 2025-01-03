---
type: pattern
category: core
status: active
priority: critical
last_validated: 2024-12-31T05:46:26-07:00
impacts:
  - security/client-management/access-control.md
  - security/client-management/data-protection.md
  - security/bill-pay/security-model.md
  - security/account-management/security-model.md
context_triggers:
  - "When implementing new features that handle sensitive data"
  - "When modifying authentication or authorization"
  - "When integrating with external systems"
  - "When reviewing security compliance"
---

# Security Patterns

## Authentication
```yaml
pattern:
  strategy: "Local storage with mock data (Development)"
  storage: "localStorage with role-based data"
  refresh: "Manual re-authentication"

implementation:
  location: "src/context/AuthContext.tsx"
  components:
    - AuthContext
    - AuthProvider
    - useAuth hook (src/hooks/useAuth.ts)
  
  rules:
    - Store minimal auth data in localStorage
    - Clear storage on logout
    - Handle authentication state globally
    - Monitor auth performance
```

## Dual Authorization Systems
```yaml
bill_pay_permissions:
  strategy: "Domain-specific roles"
  location: "src/components/bill-pay/settings/PermissionGroups.tsx"
  scope: "Bill Pay Operations"
  implementation:
    - Payment operation permissions
    - Transaction-level access control
    - Operation-specific roles
  rules:
    - Maintain domain isolation
    - No inheritance from org permissions
    - Independent security context
    - Domain-specific validation

client_management_permissions:
  strategy: "Organization-wide roles"
  location: "src/components/client-management"
  scope: "Organization Management"
  implementation:
    - Multi-level group hierarchy
    - Cross-domain role definitions
    - Organization-wide permissions
  rules:
    - Handle broad access control
    - Manage group hierarchies
    - Cross-system permissions
    - Independent from bill pay
```

## Data Security
```yaml
patterns:
  input_validation:
    strategy: "Type-based validation"
    location: "src/types"
    implementation:
      - Strong TypeScript types
      - Interface-based validation
      - Domain-specific constraints
      - System-specific validation

  sensitive_data:
    strategy: "Domain Isolation"
    rules:
      - Separate security contexts
      - System-specific data handling
      - Independent state management
      - Isolated error handling
```

## Performance Monitoring
```yaml
pattern:
  strategy: "Component-level profiling"
  implementation:
    location: "src/components/common/GlobalProfiler"
    measurements:
      - Component mount time
      - Update duration
      - Authentication operations
      - System-specific metrics
```

## Security Boundaries
```yaml
domain_isolation:
  bill_pay:
    - Separate permission model
    - Independent role hierarchy
    - Domain-specific security
    - Isolated state management

  client_management:
    - Organization-wide roles
    - Group-based hierarchy
    - Cross-system permissions
    - Independent security context

state_rules:
  - Maintain system separation
  - Independent state management
  - System-specific validation
  - Isolated error handling
```
