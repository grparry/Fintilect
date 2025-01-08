# API Migration Analysis
> Part of the [Service Layer Migration Plan](../.cascade/plans/service-layer-migration.md)

## Major Changes

### Authentication & Security
- New API uses JWT Bearer authentication consistently
- Standardized error responses with common schema
- More granular permission controls

### Architectural Changes
- RESTful resource-based endpoints vs. action-based endpoints
- Consistent pagination pattern across all list endpoints
- Standardized error handling with detailed error codes

## Legacy vs New API Mapping

### Endpoints to Migrate

#### Payee Management
```diff
- /api/v1/Payee/fis-payee (POST)
+ /payees (GET, POST)
+ /payees/{id} (GET, PUT)
! Changes: More RESTful design, standardized CRUD operations
```

#### System Operations
```diff
- /api/v1/BadRecord/date/{date} (GET)
- /api/v1/Exception/search (POST)
+ /system/errors (GET with query params)
+ /system/status (GET)
! Changes: Unified error tracking, better status monitoring
```

#### Client Operations
```diff
- /api/v1/CreditUnion/all (GET)
+ /clients (GET, POST)
+ /clients/{id} (GET, PUT)
! Changes: Renamed to clients, expanded functionality
```

### Breaking Changes
1. Authentication
   - JWT Bearer token required for all endpoints
   - Standardized authorization header format

2. Response Formats
   - Consistent error response structure
   - Pagination included in all list responses
   - Standardized date/time formats (ISO 8601)

3. Request Structures
   - Query parameters for filtering instead of POST bodies
   - Standardized CRUD operation patterns
   - Consistent naming conventions

## Service Layer Impact

### High Priority Changes
1. Authentication service updates
2. Base API client modifications
3. Error handling standardization
4. Pagination implementation

### Required New Services
1. Client Settings Service
2. System Monitoring Service
3. Tracking Service
4. Utility Service

### Deprecated Functionality
1. Direct FIS payee operations
2. Legacy exception handling
3. Credit Union specific endpoints
