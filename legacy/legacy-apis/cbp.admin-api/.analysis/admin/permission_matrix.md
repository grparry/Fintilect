---
type: permission_model
project: cbp.admin-api
created_date: 2025-01-02T21:14:00-07:00
status: in_progress
references:
  - ../../admin-api.json
  - ../../Services/Implementation/ExceptionService.cs
  - ../../Services/Implementation/CreditUnionService.cs
---

# CBP Admin API Permission Matrix

## Overview

This document defines the detailed permission relationships and inheritance patterns within the CBP Admin API.

## Permission Matrix

### Credit Union Management

| Permission                    | SystemAdmin | SupportManager | SupportAgent | CUAdmin | ReadOnly |
|------------------------------|-------------|----------------|--------------|---------|----------|
| View Credit Union List       | ✓           | ✓              | ✓            | ✓*      | ✓        |
| View Credit Union Details    | ✓           | ✓              | ✓            | ✓*      | ✓        |
| Create Credit Union          | ✓           | -              | -            | -       | -        |
| Update Credit Union Settings | ✓           | ✓              | -            | ✓*      | -        |
| Delete Credit Union          | ✓           | -              | -            | -       | -        |
| Configure Processing Times   | ✓           | -              | -            | ✓*      | -        |

*Limited to own credit union

### Support Notifications

| Permission                   | SystemAdmin | SupportManager | SupportAgent | CUAdmin | ReadOnly |
|-----------------------------|-------------|----------------|--------------|---------|----------|
| View Notifications          | ✓           | ✓              | ✓            | ✓       | ✓        |
| Create Notifications        | ✓           | ✓              | -            | -       | -        |
| Update Notifications        | ✓           | ✓              | -            | -       | -        |
| Delete Notifications        | ✓           | -              | -            | -       | -        |
| Set Notification Priority   | ✓           | ✓              | -            | -       | -        |

### Payment Exceptions

| Permission                   | SystemAdmin | SupportManager | SupportAgent | CUAdmin | ReadOnly |
|-----------------------------|-------------|----------------|--------------|---------|----------|
| View Exceptions             | ✓           | ✓              | ✓            | ✓*      | ✓        |
| Update Exception Status     | ✓           | ✓              | ✓            | -       | -        |
| Assign Exceptions           | ✓           | ✓              | -            | -       | -        |
| Delete Exceptions           | ✓           | -              | -            | -       | -        |
| Export Exception Reports    | ✓           | ✓              | ✓            | ✓*      | ✓        |

*Limited to own credit union

### Manual Runs

| Permission                   | SystemAdmin | SupportManager | SupportAgent | CUAdmin | ReadOnly |
|-----------------------------|-------------|----------------|--------------|---------|----------|
| View Manual Runs            | ✓           | ✓              | ✓            | ✓*      | ✓        |
| Create Manual Run           | ✓           | ✓              | ✓            | ✓*      | -        |
| Cancel Manual Run           | ✓           | ✓              | -            | -       | -        |
| View Run History           | ✓           | ✓              | ✓            | ✓*      | ✓        |

*Limited to own credit union

### Payee Management

| Permission                   | SystemAdmin | SupportManager | SupportAgent | CUAdmin | ReadOnly |
|-----------------------------|-------------|----------------|--------------|---------|----------|
| View Global Payees          | ✓           | ✓              | ✓            | ✓       | ✓        |
| Create Global Payee         | ✓           | -              | -            | -       | -        |
| Update Global Payee         | ✓           | ✓              | -            | -       | -        |
| Delete Global Payee         | ✓           | -              | -            | -       | -        |
| Search FIS Payees           | ✓           | ✓              | ✓            | ✓       | ✓        |

### System Configuration

| Permission                   | SystemAdmin | SupportManager | SupportAgent | CUAdmin | ReadOnly |
|-----------------------------|-------------|----------------|--------------|---------|----------|
| View Configuration          | ✓           | ✓              | ✓            | ✓*      | ✓        |
| Update Configuration        | ✓           | -              | -            | -       | -        |
| View Version Info           | ✓           | ✓              | ✓            | ✓       | ✓        |
| Update Version Info         | ✓           | -              | -            | -       | -        |

*Limited to own credit union

## Permission Inheritance Rules

### Role-Based Inheritance

```yaml
inheritance:
  SystemAdministrator:
    inherits: []
    description: "No inheritance - full permissions"

  SupportManager:
    inherits: ["SupportAgent"]
    adds:
      - create_notification
      - update_notification
      - assign_exception
      - update_payee

  SupportAgent:
    inherits: ["ReadOnly"]
    adds:
      - create_manual_run
      - update_exception

  CreditUnionAdmin:
    inherits: ["ReadOnly"]
    adds:
      - update_cu_settings
      - create_manual_run
    scope: "own_cu"

  ReadOnly:
    inherits: []
    description: "Base view permissions"
```

### Scope-Based Inheritance

```yaml
scope_inheritance:
  global:
    - SystemAdministrator
    description: "Access to all resources"

  regional:
    - SupportManager
    - SupportAgent
    description: "Access limited by region"

  credit_union:
    - CreditUnionAdmin
    description: "Access limited to own credit union"

  read_only:
    - ReadOnly
    description: "View-only access to permitted resources"
```

## Permission Constraints

### Time-Based Constraints

```yaml
time_constraints:
  manual_run:
    - role: "CreditUnionAdmin"
      allowed_times: "business_hours"
      timezone: "credit_union_timezone"

  configuration_update:
    - role: "SystemAdministrator"
      allowed_times: "maintenance_window"
      requires: "change_ticket"
```

### Resource-Based Constraints

```yaml
resource_constraints:
  credit_union:
    update:
      requires:
        - valid_routing_number
        - active_status
        - valid_timezone

  support_notification:
    create:
      requires:
        - valid_date_range
        - message_content
        - status_code
```

## Audit Requirements

### Permission Changes

```yaml
audit_requirements:
  permission_change:
    log:
      - timestamp
      - actor_id
      - actor_role
      - target_role
      - permission
      - action
      - reason
    notify:
      - security_team
      - compliance_team
```

### High-Risk Operations

```yaml
high_risk_operations:
  - operation: "delete_credit_union"
    requires:
      - two_factor_auth
      - manager_approval
      - audit_log
  
  - operation: "update_global_payee"
    requires:
      - two_factor_auth
      - audit_log
```

## References

- API Specification: `admin-api.json`
- Service Implementations:
  - `ExceptionService.cs`
  - `CreditUnionService.cs`
