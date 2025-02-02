# Settings API Specification

## Overview
Simple RESTful API for storing and retrieving settings as key-value pairs. This API provides basic CRUD operations and has no knowledge of:
- Type information or validation
- Serialization formats
- Business rules
- UI display logic

## Types

```typescript
// The only types the API needs to know about
interface Setting {
    key: string;
    value: string;  // All values are stored as strings
}

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
    };
}
```

## Endpoints

### Get Settings Group
```typescript
GET /api/v1/settings/groups/{groupName}

Response: ApiResponse<Setting[]>
```

### Get Single Setting
```typescript
GET /api/v1/settings/{key}

Response: ApiResponse<Setting>
```

### Update Single Setting
```typescript
PUT /api/v1/settings/{key}
{
    "value": string
}

Response: ApiResponse<Setting>
```

### Batch Update Settings
```typescript
PUT /api/v1/settings/batch
{
    "settings": Array<{
        key: string;
        value: string;
    }>
}

Response: ApiResponse<Setting[]>
```

### Get Settings by Prefix
```typescript
GET /api/v1/settings?prefix={prefix}

Response: ApiResponse<Setting[]>
```

## Responsibilities

### API Layer Responsibilities
- Store and retrieve string key-value pairs
- Basic request validation (required fields, string format)
- Error reporting for database/network issues
- Authentication and rate limiting

### NOT API Layer Responsibilities
- Type checking or conversion
- Business rule validation
- JSON schema validation
- UI display formatting
- Caching strategy
- Complex error handling logic

These responsibilities belong to the service layer or higher.
