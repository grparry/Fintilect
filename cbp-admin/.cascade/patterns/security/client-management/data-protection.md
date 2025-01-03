---
type: pattern
category: security
status: active
priority: critical
last_validated: 2024-12-31
impacts:
  - patterns/security/client-management/audit-patterns.md
  - patterns/integration/client-management/external-systems.md
  - patterns/core/data-flow.md
  - patterns/core/security.md
context_triggers:
  - "When handling sensitive data"
  - "When implementing data encryption"
  - "When managing data access"
  - "When implementing data retention"
  - "When handling data breaches"
---

# Client Management Data Protection

## Core Principles
```yaml
purpose: "Secure client data management"
key_aspects:
  - Data classification
  - Protection rules
  - Access control
  - Audit requirements
```

## Data Classification
```yaml
sensitivity_levels:
  pattern: "Data Sensitivity"
  levels:
    public:
      - Basic details
      - Public settings
      - General info
    
    internal:
      - Organization data
      - Group settings
      - Member lists
    
    confidential:
      - Personal data
      - Security settings
      - Private info

protection_rules:
  pattern: "Protection Requirements"
  implementation:
    storage:
      - Encryption rules
      - Access controls
      - Retention periods
    
    transmission:
      - Encryption methods
      - Protocol security
      - Channel protection
    
    processing:
      - Memory protection
      - Access limits
      - Usage tracking
```

## Access Management
```yaml
data_access:
  pattern: "Access Control"
  implementation:
    validation:
      - Permission check
      - Context verification
      - Purpose validation
    
    filtering:
      - Data masking
      - Field selection
      - Result filtering
    
    tracking:
      - Access logging
      - Usage patterns
      - Alert generation

usage_control:
  pattern: "Usage Management"
  implementation:
    limits:
      - Access frequency
      - Volume controls
      - Time restrictions
    
    tracking:
      - Usage monitoring
      - Pattern analysis
      - Alert triggers
    
    enforcement:
      - Limit checking
      - Block handling
      - Notification
```

## Data Lifecycle
```yaml
lifecycle_management:
  pattern: "Data Lifecycle"
  stages:
    creation:
      - Data validation
      - Classification
      - Protection setup
    
    usage:
      - Access control
      - Usage tracking
      - State management
    
    archival:
      - Retention rules
      - Access limitation
      - Protection maintenance
    
    deletion:
      - Secure removal
      - State cleanup
      - History preservation

state_management:
  pattern: "Data State"
  implementation:
    tracking:
      - State changes
      - Access history
      - Usage patterns
    
    protection:
      - State encryption
      - Access control
      - Change validation
    
    cleanup:
      - State removal
      - History archival
      - Audit logging
```

## Security Integration
```yaml
encryption_management:
  pattern: "Data Encryption"
  implementation:
    at_rest:
      - Storage encryption
      - Key management
      - Access control
    
    in_transit:
      - Transport security
      - Protocol protection
      - Channel encryption
    
    in_use:
      - Memory protection
      - Process isolation
      - Access control

key_management:
  pattern: "Key Security"
  implementation:
    lifecycle:
      - Key generation
      - Rotation schedule
      - Retirement rules
    
    protection:
      - Storage security
      - Access control
      - Usage tracking
    
    backup:
      - Key backup
      - Recovery process
      - Access rules
```

## Privacy Integration
```yaml
privacy_rules:
  pattern: "Privacy Control"
  implementation:
    requirements:
      - Privacy rules
      - Access limits
      - Usage constraints
    
    enforcement:
      - Data filtering
      - Access control
      - Usage tracking
    
    compliance:
      - Rule verification
      - Audit logging
      - Report generation

consent_management:
  pattern: "Consent Tracking"
  implementation:
    collection:
      - Consent capture
      - Purpose binding
      - Time tracking
    
    enforcement:
      - Usage validation
      - Access control
      - Purpose checking
    
    maintenance:
      - Consent updates
      - History tracking
      - Report generation
```

## Anti-Patterns
```yaml
avoid:
  plain_storage:
    why: "Security risk"
    instead: "Encrypted storage"
    
  broad_access:
    why: "Privacy violation"
    instead: "Need-based access"
    
  weak_protection:
    why: "Security breach"
    instead: "Strong controls"
```

## Testing Strategy
```yaml
approach:
  security_tests:
    - Protection methods
    - Access control
    - Privacy rules
    
  compliance_tests:
    - Data handling
    - Privacy requirements
    - Audit trails
    
  performance_tests:
    - Protection overhead
    - Access speed
    - State management
```

## Monitoring Guidelines
```yaml
observability:
  metrics:
    - Protection status
    - Access patterns
    - Usage trends
    
  logging:
    - Security events
    - Access attempts
    - State changes
    
  alerting:
    - Protection failures
    - Access violations
    - Usage anomalies
```
