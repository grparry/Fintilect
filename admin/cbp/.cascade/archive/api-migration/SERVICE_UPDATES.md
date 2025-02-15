# Service Layer Updates
> Part of the [Service Layer Migration Plan](../.cascade/plans/service-layer-migration.md)
> Implementation based on [API Analysis](./ANALYSIS.md)

## Base API Client Updates
1. Update `api.ts`
   - Implement JWT auth handling
   - Add standard error response handling
   - Add pagination support
   - Implement retry logic for 5xx errors

## Service Updates Priority Order

### Phase 1: Core Infrastructure
1. Base API Client (`api.ts`)
   - Update authentication mechanism
   - Implement standard response handling
   - Add pagination utilities
   - Update error handling

2. Error Handling (`exceptions.service.ts`)
   - Migrate to new `/system/errors` endpoint
   - Implement new error schema
   - Update error tracking methods

3. Client Management (`clients.service.ts`)
   - Migrate from CreditUnion to Client terminology
   - Implement new client settings endpoints
   - Update type definitions

### Phase 2: Payment Operations
1. Payee Management
   - Consolidate `payee-conversion.service.ts`
   - Remove FIS-specific implementations
   - Implement new payee CRUD operations

2. Payment Processing
   - Update `payments.service.ts`
   - Update `manual-payments.service.ts`
   - Update `pending-payments.service.ts`
   - Implement new payment status tracking

### Phase 3: System Services
1. System Monitoring
   - Create new system status monitoring
   - Implement health check endpoints
   - Add metrics collection

2. Calendar & Scheduling
   - Update `holiday.service.ts`
   - Implement new date calculation endpoints
   - Add business day validation

## Implementation Approach

### For Each Service:
1. Create new service class
2. Implement new endpoints
3. Create type definitions
4. Add error handling
5. Add tests
6. Deprecate old service
7. Update consumers

### Common Patterns
```typescript
// Base service pattern
export class BaseService {
  constructor(private api: ApiClient) {}
  
  protected async request<T>(config: RequestConfig): Promise<T> {
    try {
      const response = await this.api.request(config);
      return this.handleResponse<T>(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}

// Paginated response handling
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
```

## Migration Steps
1. Create new service alongside existing
2. Implement new endpoints
3. Update types
4. Add tests
5. Switch consumers to new service
6. Remove old service

## Deprecation Strategy
1. Mark old services as deprecated
2. Log usage of deprecated endpoints
3. Set timeline for removal
4. Notify consumers of changes
5. Remove after migration period
