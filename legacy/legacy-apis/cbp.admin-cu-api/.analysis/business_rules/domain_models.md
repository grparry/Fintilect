---
type: domain_model
project: cbp.admin-cu-api
created_date: 2025-01-02T21:25:13-07:00
status: in_progress
---

# CBP Admin CU API Domain Models

## Overview

This document outlines the core domain models and their relationships within the Credit Union Administrative API.

## Core Domain Models

### Credit Union

```yaml
credit_union:
  entity: "CreditUnion"
  description: "Represents a credit union entity in the system"
  attributes:
    - name: "SponsorId"
      type: "string"
      description: "Unique identifier for the credit union"
      constraints: "Required, Unique"
    
    - name: "Name"
      type: "string"
      description: "Official name of the credit union"
      constraints: "Required"
    
    - name: "RoutingNumber"
      type: "string"
      description: "ABA routing number"
      constraints: "Required, 9 digits"
    
    - name: "Status"
      type: "enum"
      values: ["Active", "Inactive", "Suspended"]
      description: "Current operational status"
    
    - name: "Settings"
      type: "json"
      description: "Configuration settings"
      schema: "CreditUnionSettings"
```

### Credit Union Settings

```yaml
credit_union_settings:
  entity: "CreditUnionSettings"
  description: "Configuration settings for a credit union"
  attributes:
    - name: "TimeZone"
      type: "string"
      description: "Operating timezone"
      constraints: "Required"
    
    - name: "ProcessingTimes"
      type: "array"
      items: "ProcessingWindow"
      description: "Daily processing windows"
    
    - name: "ContactInfo"
      type: "object"
      description: "Administrative contact information"
    
    - name: "Features"
      type: "array"
      items: "string"
      description: "Enabled feature flags"
```

### Processing Window

```yaml
processing_window:
  entity: "ProcessingWindow"
  description: "Defines a processing time window"
  attributes:
    - name: "DayOfWeek"
      type: "enum"
      values: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      description: "Day of the week"
    
    - name: "StartTime"
      type: "time"
      description: "Window start time"
      constraints: "Required"
    
    - name: "EndTime"
      type: "time"
      description: "Window end time"
      constraints: "Required"
```

### Admin User

```yaml
admin_user:
  entity: "AdminUser"
  description: "Credit union administrative user"
  attributes:
    - name: "UserId"
      type: "string"
      description: "Unique identifier"
      constraints: "Required, Unique"
    
    - name: "SponsorId"
      type: "string"
      description: "Associated credit union"
      constraints: "Required"
    
    - name: "Role"
      type: "enum"
      values: ["CUAdmin", "CUOperator", "CUReadOnly"]
      description: "User role"
    
    - name: "Permissions"
      type: "array"
      items: "Permission"
      description: "Granted permissions"
```

### Permission

```yaml
permission:
  entity: "Permission"
  description: "Represents a system permission"
  attributes:
    - name: "Code"
      type: "string"
      description: "Permission code"
      constraints: "Required"
    
    - name: "Resource"
      type: "string"
      description: "Target resource"
      constraints: "Required"
    
    - name: "Actions"
      type: "array"
      items: "string"
      description: "Allowed actions"
```

## Domain Events

### Credit Union Events

```yaml
credit_union_events:
  events:
    - name: "CreditUnionCreated"
      payload:
        - "SponsorId"
        - "Name"
        - "RoutingNumber"
        - "InitialSettings"
    
    - name: "CreditUnionActivated"
      payload:
        - "SponsorId"
        - "ActivationTime"
    
    - name: "CreditUnionSuspended"
      payload:
        - "SponsorId"
        - "Reason"
        - "SuspensionTime"
```

### Admin Events

```yaml
admin_events:
  events:
    - name: "AdminUserCreated"
      payload:
        - "UserId"
        - "SponsorId"
        - "Role"
    
    - name: "PermissionsModified"
      payload:
        - "UserId"
        - "AddedPermissions"
        - "RemovedPermissions"
```

## Domain Services

### Credit Union Management

```yaml
credit_union_management:
  service: "CreditUnionManagementService"
  operations:
    - name: "CreateCreditUnion"
      input: "CreateCreditUnionRequest"
      output: "CreditUnionResponse"
    
    - name: "UpdateSettings"
      input: "UpdateSettingsRequest"
      output: "SettingsResponse"
    
    - name: "ModifyStatus"
      input: "StatusChangeRequest"
      output: "StatusResponse"
```

### Admin Management

```yaml
admin_management:
  service: "AdminManagementService"
  operations:
    - name: "CreateAdminUser"
      input: "CreateAdminRequest"
      output: "AdminUserResponse"
    
    - name: "ModifyPermissions"
      input: "PermissionRequest"
      output: "PermissionResponse"
    
    - name: "DeactivateUser"
      input: "DeactivationRequest"
      output: "DeactivationResponse"
```

## Domain Rules

### Credit Union Rules

```yaml
credit_union_rules:
  validation:
    - rule: "Unique routing number"
      scope: "System-wide"
      enforcement: "Create, Update"
    
    - rule: "Valid timezone"
      scope: "Settings"
      enforcement: "Create, Update"
    
    - rule: "Processing window overlap"
      scope: "Settings"
      enforcement: "Create, Update"
```

### Admin Rules

```yaml
admin_rules:
  validation:
    - rule: "Role hierarchy"
      scope: "Permissions"
      enforcement: "Create, Update"
    
    - rule: "Permission scope"
      scope: "Credit Union"
      enforcement: "All operations"
```

## References

- API Specification: `api.json`
- Implementation: `cbp.admin-cu-api/`
- Related Systems: `cbp.admin-api/`
