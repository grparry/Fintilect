---
type: permissions
project: cbp.admin-cu-api
created_date: 2025-01-02T21:26:59-07:00
status: in_progress
---

# CBP Admin CU API Permissions

## Overview

This document defines the permission structure and access control model for the Credit Union Administrative API.

## Role Hierarchy

### Role Definitions

```yaml
role_hierarchy:
  roles:
    CUAdmin:
      level: 3
      description: "Credit Union Administrator"
      inherits: ["CUOperator"]
      
    CUOperator:
      level: 2
      description: "Credit Union Operator"
      inherits: ["CUReadOnly"]
      
    CUReadOnly:
      level: 1
      description: "Credit Union Read-Only User"
      inherits: []
```

## Permission Categories

### Credit Union Management

```yaml
cu_management_permissions:
  category: "Credit Union Management"
  permissions:
    - code: "CU.SETTINGS.READ"
      roles: ["CUReadOnly", "CUOperator", "CUAdmin"]
      description: "View credit union settings"
    
    - code: "CU.SETTINGS.MODIFY"
      roles: ["CUAdmin"]
      description: "Modify credit union settings"
      constraints:
        - "Within credit union scope"
        - "During business hours"
    
    - code: "CU.STATUS.MODIFY"
      roles: ["CUAdmin"]
      description: "Change credit union status"
      requires_approval: true
```

### User Management

```yaml
user_management_permissions:
  category: "User Management"
  permissions:
    - code: "USER.CREATE"
      roles: ["CUAdmin"]
      description: "Create new users"
      constraints:
        - "Within credit union scope"
        - "Cannot create higher role"
    
    - code: "USER.MODIFY"
      roles: ["CUAdmin"]
      description: "Modify user details"
      constraints:
        - "Within credit union scope"
        - "Cannot modify higher role"
    
    - code: "USER.DEACTIVATE"
      roles: ["CUAdmin"]
      description: "Deactivate users"
      constraints:
        - "Within credit union scope"
        - "Cannot deactivate last admin"
```

### Processing Window Management

```yaml
processing_window_permissions:
  category: "Processing Windows"
  permissions:
    - code: "WINDOW.READ"
      roles: ["CUReadOnly", "CUOperator", "CUAdmin"]
      description: "View processing windows"
    
    - code: "WINDOW.MODIFY"
      roles: ["CUAdmin"]
      description: "Modify processing windows"
      requires_approval: true
      constraints:
        - "Within business hours"
        - "Advance notice required"
```

### Report Access

```yaml
report_permissions:
  category: "Reporting"
  permissions:
    - code: "REPORT.BASIC"
      roles: ["CUReadOnly", "CUOperator", "CUAdmin"]
      description: "Access basic reports"
    
    - code: "REPORT.DETAILED"
      roles: ["CUOperator", "CUAdmin"]
      description: "Access detailed reports"
    
    - code: "REPORT.ADMIN"
      roles: ["CUAdmin"]
      description: "Access administrative reports"
```

## Permission Scopes

### Scope Definitions

```yaml
permission_scopes:
  scopes:
    credit_union:
      type: "Organization"
      description: "Limited to own credit union"
      applies_to: ["CUReadOnly", "CUOperator", "CUAdmin"]
    
    user:
      type: "User"
      description: "Limited to user-specific actions"
      applies_to: ["CUReadOnly", "CUOperator", "CUAdmin"]
```

### Scope Inheritance

```yaml
scope_inheritance:
  rules:
    - name: "Credit Union Scope"
      inheritance: "Downward only"
      description: "Higher roles can access lower role scopes"
    
    - name: "User Scope"
      inheritance: "None"
      description: "User-specific permissions don't inherit"
```

## Access Control Rules

### Authentication Rules

```yaml
authentication_rules:
  rules:
    - name: "Session Validation"
      applies_to: "All permissions"
      requirements:
        - "Valid session token"
        - "MFA if required"
    
    - name: "IP Validation"
      applies_to: "All permissions"
      requirements:
        - "Whitelisted IP"
        - "Valid network segment"
```

### Authorization Rules

```yaml
authorization_rules:
  rules:
    - name: "Role Check"
      applies_to: "All permissions"
      validation:
        - "Valid role for permission"
        - "Role not expired"
    
    - name: "Scope Check"
      applies_to: "All permissions"
      validation:
        - "Within assigned scope"
        - "No scope violations"
```

## Permission Enforcement

### Enforcement Points

```yaml
enforcement_points:
  layers:
    - name: "API Gateway"
      enforces:
        - "Authentication"
        - "Basic authorization"
    
    - name: "Service Layer"
      enforces:
        - "Detailed authorization"
        - "Business rules"
    
    - name: "Data Layer"
      enforces:
        - "Data access control"
        - "Row-level security"
```

### Audit Requirements

```yaml
audit_requirements:
  events:
    - category: "Permission Changes"
      retention: "7 years"
      details:
        - "Old permissions"
        - "New permissions"
        - "Changed by"
        - "Timestamp"
    
    - category: "Access Attempts"
      retention: "2 years"
      details:
        - "Permission requested"
        - "Success/failure"
        - "User context"
```

## References

- API Specification: `api.json`
- Implementation: `cbp.admin-cu-api/`
- Related Systems: `cbp.admin-api/`
