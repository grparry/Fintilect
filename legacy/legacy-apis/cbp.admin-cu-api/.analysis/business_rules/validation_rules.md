---
type: validation_rules
project: cbp.admin-cu-api
created_date: 2025-01-02T21:25:13-07:00
status: in_progress
---

# CBP Admin CU API Validation Rules

## Overview

This document defines the validation rules and constraints for the Credit Union Administrative API.

## Credit Union Validation

### Identifier Rules

```yaml
sponsor_id_validation:
  field: "SponsorId"
  rules:
    - type: "Required"
      message: "SponsorId is required"
    
    - type: "Pattern"
      pattern: "^[A-Z0-9]{1,50}$"
      message: "SponsorId must be 1-50 alphanumeric characters"
    
    - type: "Unique"
      scope: "System"
      message: "SponsorId must be unique"
```

### Routing Number Rules

```yaml
routing_number_validation:
  field: "RoutingNumber"
  rules:
    - type: "Required"
      message: "Routing number is required"
    
    - type: "Pattern"
      pattern: "^[0-9]{9}$"
      message: "Must be exactly 9 digits"
    
    - type: "Unique"
      scope: "System"
      message: "Routing number must be unique"
    
    - type: "CheckDigit"
      algorithm: "ABA"
      message: "Invalid routing number checksum"
```

### Name Rules

```yaml
name_validation:
  field: "Name"
  rules:
    - type: "Required"
      message: "Name is required"
    
    - type: "Length"
      min: 1
      max: 100
      message: "Name must be 1-100 characters"
    
    - type: "Pattern"
      pattern: "^[a-zA-Z0-9\\s\\-\\.]+$"
      message: "Name contains invalid characters"
```

## Settings Validation

### Timezone Rules

```yaml
timezone_validation:
  field: "TimeZone"
  rules:
    - type: "Required"
      message: "Timezone is required"
    
    - type: "ValidTimezone"
      message: "Invalid timezone identifier"
```

### Processing Window Rules

```yaml
processing_window_validation:
  field: "ProcessingTimes"
  rules:
    - type: "Required"
      message: "At least one processing window required"
    
    - type: "NoOverlap"
      message: "Processing windows cannot overlap"
    
    - type: "TimeRange"
      rule: "EndTime > StartTime"
      message: "End time must be after start time"
```

### Contact Info Rules

```yaml
contact_info_validation:
  field: "ContactInfo"
  rules:
    - type: "Required"
      message: "Contact information is required"
    
    - type: "Email"
      field: "Email"
      message: "Invalid email format"
    
    - type: "Phone"
      field: "Phone"
      message: "Invalid phone format"
```

## Admin User Validation

### User Identifier Rules

```yaml
user_id_validation:
  field: "UserId"
  rules:
    - type: "Required"
      message: "UserId is required"
    
    - type: "Pattern"
      pattern: "^[a-zA-Z0-9\\-_]{1,50}$"
      message: "Invalid UserId format"
    
    - type: "Unique"
      scope: "System"
      message: "UserId must be unique"
```

### Role Rules

```yaml
role_validation:
  field: "Role"
  rules:
    - type: "Required"
      message: "Role is required"
    
    - type: "Enum"
      values: ["CUAdmin", "CUOperator", "CUReadOnly"]
      message: "Invalid role"
    
    - type: "RoleHierarchy"
      rule: "AssigneeRoleLevel <= AssignerRoleLevel"
      message: "Cannot assign higher role level"
```

## Permission Validation

### Permission Rules

```yaml
permission_validation:
  field: "Permissions"
  rules:
    - type: "ValidPermission"
      message: "Invalid permission code"
    
    - type: "PermissionScope"
      rule: "WithinCreditUnionScope"
      message: "Permission outside credit union scope"
    
    - type: "RolePermission"
      rule: "PermissionValidForRole"
      message: "Permission not allowed for role"
```

## Status Transition Rules

### Status Change Rules

```yaml
status_transition_validation:
  field: "Status"
  rules:
    - type: "ValidTransition"
      transitions:
        Active:
          - "Inactive"
          - "Suspended"
        Inactive:
          - "Active"
        Suspended:
          - "Active"
      message: "Invalid status transition"
    
    - type: "TransitionAuth"
      rule: "HasTransitionPermission"
      message: "Not authorized for status transition"
```

## Cross-Field Validation

### Settings Consistency

```yaml
settings_consistency:
  rules:
    - type: "TimezoneDependency"
      fields: ["TimeZone", "ProcessingTimes"]
      rule: "ProcessingTimesInTimezone"
      message: "Processing times must be in specified timezone"
    
    - type: "FeatureSettings"
      fields: ["Features", "Settings"]
      rule: "SettingsValidForFeatures"
      message: "Invalid settings for enabled features"
```

### User Association

```yaml
user_association:
  rules:
    - type: "CreditUnionAssociation"
      fields: ["UserId", "SponsorId"]
      rule: "ValidCreditUnionAssociation"
      message: "Invalid credit union association"
    
    - type: "RoleScope"
      fields: ["Role", "SponsorId"]
      rule: "RoleValidForCreditUnion"
      message: "Role not valid for credit union"
```

## References

- API Specification: `api.json`
- Implementation: `cbp.admin-cu-api/`
- Related Systems: `cbp.admin-api/`
