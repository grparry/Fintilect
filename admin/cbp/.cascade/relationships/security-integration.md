---
type: relationship
category: core
status: active
priority: critical
last_validated: 2024-12-31
patterns:
  - core/security.md
  - integration/coordination.md
impact_tracking:
  decisions:
    - id: SEC_INT_001
      description: "External system authentication"
      impact_type: depends_on
      affects:
        - security/client-management/access-control.md
        - integration/bill-pay/external-systems.md
      validation_rules:
        - "Must implement OAuth2 flow"
        - "Must validate all external tokens"
        - "Must handle token refresh"
    
    - id: SEC_INT_002
      description: "Data encryption in transit"
      impact_type: implements
      affects:
        - security/client-management/data-protection.md
        - integration/bill-pay/external-systems.md
      validation_rules:
        - "Must use TLS 1.2 or higher"
        - "Must implement certificate validation"
        - "Must handle encryption failures"

    - id: SEC_INT_003
      description: "Audit trail coordination"
      impact_type: extends
      affects:
        - security/client-management/audit-patterns.md
        - integration/coordination.md
      validation_rules:
        - "Must log all system interactions"
        - "Must maintain audit consistency"
        - "Must handle audit failures"

context_triggers:
  - "When implementing external system security"
  - "When handling secure data transfer"
  - "When coordinating security operations"
  - "When managing security relationships"
---

# Security-Integration Relationship Pattern

This pattern defines the relationship between security patterns and integration patterns, focusing on secure system interactions.
