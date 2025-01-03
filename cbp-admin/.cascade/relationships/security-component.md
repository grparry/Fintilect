---
type: relationship
category: core
status: active
priority: critical
last_validated: 2024-12-31
patterns:
  - core/security.md
  - components/common/forms.md
impact_tracking:
  decisions:
    - id: SEC_COMP_001
      description: "Form data protection"
      impact_type: implements
      affects:
        - security/client-management/data-protection.md
        - components/common/forms.md
      validation_rules:
        - "Must sanitize all input"
        - "Must validate against XSS"
        - "Must handle sensitive data appropriately"
    
    - id: SEC_COMP_002
      description: "Component access control"
      impact_type: depends_on
      affects:
        - security/client-management/access-control.md
        - components/client-management/organization-model.md
      validation_rules:
        - "Must check component permissions"
        - "Must handle unauthorized access"
        - "Must maintain access state"

    - id: SEC_COMP_003
      description: "Payment component security"
      impact_type: implements
      affects:
        - security/bill-pay/security-model.md
        - components/bill-pay/payment-processing.md
      validation_rules:
        - "Must validate payment data"
        - "Must secure payment flow"
        - "Must handle security errors"

context_triggers:
  - "When implementing secure components"
  - "When handling component data"
  - "When managing component access"
  - "When validating component security"
---

# Security-Component Relationship Pattern

This pattern defines the relationship between security patterns and component patterns, ensuring secure component implementation.
