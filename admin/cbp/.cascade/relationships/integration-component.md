---
type: relationship
category: core
status: active
priority: high
last_validated: 2024-12-31
patterns:
  - integration/coordination.md
  - components/common/data-tables.md
impact_tracking:
  decisions:
    - id: INT_COMP_001
      description: "Data loading coordination"
      impact_type: implements
      affects:
        - integration/bill-pay/internal-systems.md
        - components/common/data-tables.md
      validation_rules:
        - "Must handle async data loading"
        - "Must maintain data consistency"
        - "Must handle loading errors"
    
    - id: INT_COMP_002
      description: "Component state synchronization"
      impact_type: depends_on
      affects:
        - integration/coordination.md
        - components/bill-pay/payment-processing.md
      validation_rules:
        - "Must sync component state"
        - "Must handle sync failures"
        - "Must maintain state consistency"

    - id: INT_COMP_003
      description: "External data integration"
      impact_type: extends
      affects:
        - integration/bill-pay/external-systems.md
        - components/account-management/account-model.md
      validation_rules:
        - "Must validate external data"
        - "Must handle integration errors"
        - "Must maintain data integrity"

context_triggers:
  - "When integrating component data"
  - "When synchronizing component state"
  - "When handling external data"
  - "When managing component integration"
---

# Integration-Component Relationship Pattern

This pattern defines the relationship between integration patterns and component patterns, focusing on data and state coordination.
