# Meta-Layer Index

## Quick Context
Key patterns I need to check when handling:

- **Security**: [security/client-management/access-control.md](security/client-management/access-control.md)
- **Data Flow**: [core/data-flow.md](core/data-flow.md)
- **API Design**: [core/api-patterns.md](core/api-patterns.md)
- **Error Handling**: [core/error-handling.md](core/error-handling.md)
- **Forms**: [core/form-patterns.md](core/form-patterns.md)
- **Navigation**: [core/navigation.md](core/navigation.md)

## Domain Context
Business domain patterns to consider for domain-specific tasks:

### Bill Pay
- [payment-processing.md](components/bill-pay/payment-processing.md)
- [validation-rules.md](security/bill-pay/validation-rules.md)
- [external-systems.md](integration/bill-pay/external-systems.md)

### Account Management
- [account-model.md](components/account-management/account-model.md)
- [security-model.md](security/account-management/security-model.md)
- [internal-systems.md](integration/account-management/internal-systems.md)

### Client Management
- [organization-model.md](components/client-management/organization-model.md)
- [permission-model.md](security/client-management/permission-model.md)
- [data-protection.md](security/client-management/data-protection.md)

## Core Patterns

### Navigation & Routing
- [core/navigation.md](core/navigation.md) - Navigation system structure and behavior
- [relationships/navigation-relationships.md](../relationships/navigation-relationships.md) - Navigation component relationships

### Security
- [security/access-control.md](security/access-control.md)
- [security/authentication.md](security/authentication.md)

### Integration
- [integration/api-integration.md](integration/api-integration.md)
- [integration/external-services.md](integration/external-services.md)

## Integration Points
Key integration patterns I need to check when connecting systems:

- **Core**: [coordination.md](integration/coordination.md)
- **External**: All domain `/external-systems.md`
- **Internal**: All domain `/internal-systems.md`

## UI Components
Common components I can suggest for UI implementation:

- [forms.md](components/common/forms.md)
- [data-tables.md](components/common/data-tables.md)
- [dashboard-card.md](components/common/dashboard-card.md)
- [menu-items.md](components/common/menu-items.md)

## Pattern Metadata
Fields I need to maintain in each pattern:

```yaml
type: pattern|decision|relationship
category: core|security|integration|component
status: active|deprecated
last_validated: YYYY-MM-DD
impacts:
  - relative/path/to/impacted/pattern.md
```

## My Maintenance Tasks
1. Update `last_validated` when I reference or modify a pattern
2. Check `impacts` when making changes that affect other patterns
3. Verify `status` before using patterns in recommendations
4. Ensure new patterns follow template structure

## AI Navigation Notes
- Start with Quick Context for system-wide patterns
- Check Domain Context for business-specific rules
- Reference Integration Points for system connections
- Use UI Components for consistent interface design

Remember: Focus on direct impacts and maintain metadata accuracy.
