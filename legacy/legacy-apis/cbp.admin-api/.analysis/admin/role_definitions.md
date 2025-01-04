---
type: role_model
project: cbp.admin-api
created_date: 2025-01-02T21:14:00-07:00
status: in_progress
references:
  - ../../admin-api.json
  - ../../Services/Implementation/ExceptionService.cs
  - ../../Services/Implementation/CreditUnionService.cs
---

# CBP Admin API Role Definitions

## Overview

This document defines the role hierarchy and permissions within the CBP Admin API system.

## Role Hierarchy

```yaml
roles:
  SystemAdministrator:
    description: "Full system access and configuration"
    inherits: []
    level: 1

  SupportManager:
    description: "Manages support operations and staff"
    inherits: ["SupportAgent"]
    level: 2

  SupportAgent:
    description: "Handles support cases and exceptions"
    inherits: ["ReadOnly"]
    level: 3

  CreditUnionAdmin:
    description: "Manages specific credit union settings"
    inherits: ["ReadOnly"]
    level: 3

  ReadOnly:
    description: "View-only access to system data"
    inherits: []
    level: 4
```

## Permission Sets

### SystemAdministrator Permissions
```yaml
permissions:
  creditUnion:
    - create
    - read
    - update
    - delete
    - configure
  supportNotification:
    - create
    - read
    - update
    - delete
  manualRun:
    - create
    - read
    - cancel
  payee:
    - create
    - read
    - update
    - delete
  exception:
    - create
    - read
    - update
    - delete
  configuration:
    - read
    - update
  version:
    - read
    - update
```

### SupportManager Permissions
```yaml
permissions:
  creditUnion:
    - read
    - update
  supportNotification:
    - create
    - read
    - update
  manualRun:
    - create
    - read
    - cancel
  payee:
    - read
    - update
  exception:
    - read
    - update
    - assign
  configuration:
    - read
```

### SupportAgent Permissions
```yaml
permissions:
  creditUnion:
    - read
  supportNotification:
    - read
  manualRun:
    - create
    - read
  payee:
    - read
  exception:
    - read
    - update
  configuration:
    - read
```

### CreditUnionAdmin Permissions
```yaml
permissions:
  creditUnion:
    - read
    - update
    scope: "own"
  supportNotification:
    - read
  manualRun:
    - create
    - read
    scope: "own"
  payee:
    - read
  exception:
    - read
    scope: "own"
  configuration:
    - read
    scope: "own"
```

### ReadOnly Permissions
```yaml
permissions:
  creditUnion:
    - read
  supportNotification:
    - read
  manualRun:
    - read
  payee:
    - read
  exception:
    - read
  configuration:
    - read
```

## Permission Scopes

### Global Scope
- Applies to SystemAdministrator
- Full access across all credit unions and resources

### Limited Scope
- Applies to SupportManager and SupportAgent
- Access limited by assigned region or support queue

### Credit Union Scope
- Applies to CreditUnionAdmin
- Access limited to specific credit union resources

### Read-Only Scope
- Applies to ReadOnly
- View-only access to permitted resources

## Access Control Rules

### Authentication Rules
```yaml
authentication:
  type: "OAuth2"
  requirements:
    - valid_token
    - active_session
    - mfa_if_required
```

### Authorization Rules
```yaml
authorization:
  rules:
    - resource: "creditUnion"
      conditions:
        - "user.role in resource.allowedRoles"
        - "user.scope covers resource.scope"
    
    - resource: "supportNotification"
      conditions:
        - "user.role in resource.allowedRoles"
    
    - resource: "manualRun"
      conditions:
        - "user.role in resource.allowedRoles"
        - "user.scope covers resource.creditUnion"
```

## Audit Requirements

### Role Changes
```yaml
audit:
  role_changes:
    log:
      - timestamp
      - actor
      - subject
      - old_role
      - new_role
      - reason
```

### Permission Usage
```yaml
audit:
  permission_usage:
    log:
      - timestamp
      - actor
      - permission
      - resource
      - action
      - result
```

## Emergency Access

### Break Glass Procedure
```yaml
emergency_access:
  activation:
    requires:
      - manager_approval
      - incident_ticket
      - time_limit
  permissions:
    grants: "SystemAdministrator"
    duration: "4h"
  audit:
    log:
      - activation_time
      - approver
      - reason
      - actions_taken
```

## References

- API Specification: `admin-api.json`
- Service Implementations:
  - `ExceptionService.cs`
  - `CreditUnionService.cs`
