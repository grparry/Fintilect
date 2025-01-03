# Relationships Directory

This directory documents system relationships and dependencies across the CBPAdmin project. Each subdirectory focuses on a specific domain:

- `bill-pay/`: Bill Pay system relationships
- `auth/`: Authentication system relationships
- `client-management/`: Client Management relationships
- `common/`: Shared component relationships

## Usage Guidelines

Focus on documenting:
- System dependencies
- Integration points
- Security boundaries
- State flow

Avoid documenting:
- Implementation details
- Specific data structures
- UI-level interactions
- Temporary connections

## Security Boundaries

Maintain clear separation between:
- Bill Pay domain (payment-specific permissions)
- Client Management domain (organization-wide permissions)
- Common components (domain-aware implementation)
