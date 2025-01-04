---
type: api_spec
project: cbp.admin-cu-api
created_date: 2025-01-02T21:28:27-07:00
status: in_progress
---

# CBP Admin CU API Specification

## Overview

This document defines the API specification for the Credit Union Administrative API.

## API Standards

### General Standards

```yaml
api_standards:
  version: "v1"
  base_path: "/api/v1"
  content_type: "application/json"
  
  authentication:
    type: "Bearer Token"
    format: "JWT"
    location: "Authorization header"
  
  pagination:
    style: "cursor-based"
    parameters:
      - "cursor"
      - "limit"
    default_limit: 50
    max_limit: 100
  
  error_format:
    code: "integer"
    message: "string"
    details: "object"
```

## Endpoints

### Credit Union Management

```yaml
credit_union_endpoints:
  create_cu:
    path: "/credit-unions"
    method: "POST"
    description: "Create new credit union"
    request:
      content_type: "application/json"
      body:
        sponsor_id: "string"
        name: "string"
        routing_number: "string"
    response:
      201:
        description: "Credit union created"
        schema: "CreditUnionResponse"
      400:
        description: "Invalid request"
        schema: "ErrorResponse"
  
  get_cu:
    path: "/credit-unions/{sponsor_id}"
    method: "GET"
    description: "Get credit union details"
    parameters:
      - name: "sponsor_id"
        in: "path"
        required: true
        type: "string"
    response:
      200:
        description: "Credit union details"
        schema: "CreditUnionResponse"
      404:
        description: "Credit union not found"
        schema: "ErrorResponse"
  
  update_cu_settings:
    path: "/credit-unions/{sponsor_id}/settings"
    method: "PUT"
    description: "Update credit union settings"
    parameters:
      - name: "sponsor_id"
        in: "path"
        required: true
        type: "string"
    request:
      content_type: "application/json"
      body:
        timezone: "string"
        contact_info: "object"
        processing_windows: "array"
    response:
      200:
        description: "Settings updated"
        schema: "SettingsResponse"
      400:
        description: "Invalid settings"
        schema: "ErrorResponse"
```

### User Management

```yaml
user_endpoints:
  create_user:
    path: "/users"
    method: "POST"
    description: "Create new admin user"
    request:
      content_type: "application/json"
      body:
        sponsor_id: "string"
        email: "string"
        role: "string"
    response:
      201:
        description: "User created"
        schema: "UserResponse"
      400:
        description: "Invalid request"
        schema: "ErrorResponse"
  
  update_user:
    path: "/users/{user_id}"
    method: "PUT"
    description: "Update user details"
    parameters:
      - name: "user_id"
        in: "path"
        required: true
        type: "string"
    request:
      content_type: "application/json"
      body:
        email: "string"
        role: "string"
        status: "string"
    response:
      200:
        description: "User updated"
        schema: "UserResponse"
      404:
        description: "User not found"
        schema: "ErrorResponse"
```

### Permission Management

```yaml
permission_endpoints:
  grant_permission:
    path: "/users/{user_id}/permissions"
    method: "POST"
    description: "Grant permissions to user"
    parameters:
      - name: "user_id"
        in: "path"
        required: true
        type: "string"
    request:
      content_type: "application/json"
      body:
        permissions: "array"
        scope: "object"
    response:
      200:
        description: "Permissions granted"
        schema: "PermissionResponse"
      400:
        description: "Invalid permissions"
        schema: "ErrorResponse"
  
  revoke_permission:
    path: "/users/{user_id}/permissions/{permission_code}"
    method: "DELETE"
    description: "Revoke user permission"
    parameters:
      - name: "user_id"
        in: "path"
        required: true
        type: "string"
      - name: "permission_code"
        in: "path"
        required: true
        type: "string"
    response:
      204:
        description: "Permission revoked"
      404:
        description: "Permission not found"
        schema: "ErrorResponse"
```

### Processing Management

```yaml
processing_endpoints:
  create_window:
    path: "/processing/windows"
    method: "POST"
    description: "Create processing window"
    request:
      content_type: "application/json"
      body:
        sponsor_id: "string"
        start_time: "string"
        end_time: "string"
        days_of_week: "array"
    response:
      201:
        description: "Window created"
        schema: "WindowResponse"
      400:
        description: "Invalid window"
        schema: "ErrorResponse"
  
  update_window:
    path: "/processing/windows/{window_id}"
    method: "PUT"
    description: "Update processing window"
    parameters:
      - name: "window_id"
        in: "path"
        required: true
        type: "string"
    request:
      content_type: "application/json"
      body:
        start_time: "string"
        end_time: "string"
        days_of_week: "array"
        status: "string"
    response:
      200:
        description: "Window updated"
        schema: "WindowResponse"
      404:
        description: "Window not found"
        schema: "ErrorResponse"
```

## Data Models

### Credit Union Models

```yaml
credit_union_models:
  CreditUnionResponse:
    type: "object"
    properties:
      sponsor_id: "string"
      name: "string"
      routing_number: "string"
      status: "string"
      created_at: "string"
      updated_at: "string"
  
  SettingsResponse:
    type: "object"
    properties:
      sponsor_id: "string"
      timezone: "string"
      contact_info: "object"
      processing_windows: "array"
      updated_at: "string"
```

### User Models

```yaml
user_models:
  UserResponse:
    type: "object"
    properties:
      user_id: "string"
      sponsor_id: "string"
      email: "string"
      role: "string"
      status: "string"
      last_login: "string"
      created_at: "string"
  
  PermissionResponse:
    type: "object"
    properties:
      user_id: "string"
      permissions: "array"
      scope: "object"
      granted_at: "string"
```

### Processing Models

```yaml
processing_models:
  WindowResponse:
    type: "object"
    properties:
      window_id: "string"
      sponsor_id: "string"
      start_time: "string"
      end_time: "string"
      days_of_week: "array"
      status: "string"
      created_at: "string"
```

## Error Codes

```yaml
error_codes:
  400:
    code: "BAD_REQUEST"
    message: "Invalid request parameters"
  
  401:
    code: "UNAUTHORIZED"
    message: "Authentication required"
  
  403:
    code: "FORBIDDEN"
    message: "Insufficient permissions"
  
  404:
    code: "NOT_FOUND"
    message: "Resource not found"
  
  409:
    code: "CONFLICT"
    message: "Resource conflict"
  
  422:
    code: "VALIDATION_ERROR"
    message: "Validation failed"
  
  500:
    code: "INTERNAL_ERROR"
    message: "Internal server error"
```

## References

- API Specification: `api.json`
- Implementation: `cbp.admin-cu-api/`
- Related Systems: `cbp.admin-api/`
