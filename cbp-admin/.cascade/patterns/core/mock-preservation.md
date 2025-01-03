---
type: pattern
category: core
status: active
last_validated: 2024-12-31
impacts:
  - patterns/core/api-patterns.md
  - patterns/integration/bill-pay/external-systems.md
  - patterns/integration/account-management/external-systems.md
---

# Mock Preservation Pattern

## Overview
```yaml
pattern:
  name: Mock Preservation
  usage: Maintain development functionality without API
  when: API specifications unavailable or incomplete
```

## Implementation
```typescript
// Example service structure
export class ServiceWithMock {
  private readonly baseUrl = process.env.REACT_APP_USE_MOCK_API
    ? '/mock/endpoint'
    : '/api/endpoint';

  async getData(): Promise<ApiResponse<DataType>> {
    // Real implementation will replace this when available
    const response = await api.get(this.baseUrl);
    return response.data;
  }
}
```

## Core Components
```yaml
components:
  service: "MockDataService"
  storage: "MockDataStore"
  types: "MockData, MockConfig"

features:
  - "Consistent mock data"
  - "Environment-aware mocking"
  - "Mock state preservation"

validation:
  rules:
    - "Mock data consistency"
    - "Environment detection"
    - "State preservation rules"
  
  dependencies:
    - "api_implementation"
    - "data_flow"
    - "adapter_pattern"

processing:
  priority: 2
  load_strategy: "on_demand"
  validation_level: "required"
```

## Mock Handler
```typescript
// Example mock handler
export const mockHandlers = [
  http.get('*/mock/endpoint', () => {
    return HttpResponse.json({
      success: true,
      data: mockData,
      meta: {
        timestamp: new Date().toISOString()
      }
    });
  })
];
```

## Usage Guidelines
```yaml
steps:
  - Document current functionality
  - Implement comprehensive mock
  - Plan migration strategy
  - Maintain type safety
  - Add integration tests
```

## Current Usage
```yaml
examples:
  SecuritySystem:
    file: src/services/bill-pay-security.service.ts
    features:
      - Security settings
      - OTP functionality
      - IP whitelisting
```

## Migration Path
```yaml
steps:
  - Document API requirements
  - Create adapter structure
  - Plan feature parity
  - Implement gradual transition
```
