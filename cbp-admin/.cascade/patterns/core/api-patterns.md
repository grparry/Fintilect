---
type: pattern
category: core
status: active
priority: critical
last_validated: 2024-12-31
impacts:
  - integration/coordination.md
  - core/error-handling.md
  - security/client-management/data-protection.md
  - core/performance.md
context_triggers:
  - "When designing new API endpoints"
  - "When modifying existing API contracts"
  - "When implementing API security measures"
  - "When optimizing API performance"
  - "When handling API errors or exceptions"
---

# API Integration Patterns

## Service Layer Architecture
```yaml
structure:
  base_service:
    location: "src/services/base"
    responsibility: "Common HTTP functionality"
    features:
      - Request/response interceptors
      - Error handling
      - Authentication
      - Retry logic
  
  feature_services:
    location: "src/services/{feature}"
    pattern: "{feature}.service.ts"
    responsibility: "Feature-specific API calls"
```

## Request Patterns
```yaml
patterns:
  caching:
    strategy: "SWR (stale-while-revalidate)"
    implementation:
      - Cache successful responses
      - Return stale data immediately
      - Revalidate in background
      - Clear on mutations
  
  batching:
    strategy: "Request coalescence"
    implementation:
      - Combine similar requests
      - Debounce rapid calls
      - Share promise results
      - Handle race conditions
  
  cancellation:
    strategy: "Abort Controller"
    implementation:
      - Cancel stale requests
      - Cleanup on unmount
      - Handle cancellation gracefully
      - Prevent memory leaks
```

## Response Handling
```yaml
patterns:
  success:
    - Transform to internal models
    - Update cache
    - Handle optimistic updates
    - Trigger notifications
  
  error:
    - Map to error types
    - Retry when appropriate
    - Update error state
    - Clear invalid cache
  
  loading:
    - Show loading states
    - Handle partial data
    - Support cancellation
    - Prevent flash of content
```

## Type Safety
```yaml
patterns:
  request:
    - Type all parameters
    - Validate input
    - Generate request types
    - Document constraints
  
  response:
    - Define response types
    - Transform responses
    - Handle null values
    - Type guard responses
```

## Implementation Examples
```yaml
service_pattern:
  structure: |
    export class FeatureService extends BaseService {
      // GET collection
      async getItems(params: GetItemsParams): Promise<Item[]>
      
      // GET single
      async getItem(id: string): Promise<Item>
      
      // POST new
      async createItem(data: CreateItemData): Promise<Item>
      
      // PUT/PATCH update
      async updateItem(id: string, data: UpdateItemData): Promise<Item>
      
      // DELETE
      async deleteItem(id: string): Promise<void>
    }

hook_pattern:
  structure: |
    export function useFeatureData(params: UseFeatureParams) {
      const queryKey = ['feature', params]
      return useQuery({
        queryKey,
        queryFn: () => service.getItems(params),
        staleTime,
        cacheTime,
        retry
      })
    }
```

## Error Handling
```yaml
strategy:
  network:
    - Retry transient failures
    - Handle timeout errors
    - Check connection status
    - Log network issues
  
  business:
    - Map error responses
    - Handle validation errors
    - Show user messages
    - Log business errors
  
  security:
    - Handle auth errors
    - Refresh tokens
    - Clear invalid sessions
    - Redirect when needed
```

## Performance
```yaml
optimization:
  caching:
    - Define cache policies
    - Implement cache invalidation
    - Handle cache staleness
    - Optimize cache size
  
  requests:
    - Minimize payload size
    - Use compression
    - Implement pagination
    - Optimize polling
```
