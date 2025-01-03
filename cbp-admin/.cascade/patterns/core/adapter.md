---
type: pattern
category: core
status: active
last_validated: 2024-12-31
impacts:
  - patterns/core/api-communication.md
  - patterns/integration/coordination.md
---

# Adapter Pattern

## Overview
```yaml
pattern:
  name: Adapter Pattern
  usage: Transform between API and internal formats
  when: API and UI data structures differ
```

## Implementation
```typescript
// Example adapter structure
export class DataAdapter<ApiType, UiType> {
  toUiModel(apiData: ApiType): UiType {
    // Transform API format to UI format
  }

  toApiModel(uiData: UiType): ApiType {
    // Transform UI format to API format
  }
}
```

## Usage Guidelines
```yaml
steps:
  - Define both API and UI interfaces
  - Create adapter class
  - Implement bidirectional conversion
  - Add validation if needed
  - Write unit tests for transformations
```

## Current Usage
```yaml
examples:
  ConfigurationSystem:
    file: src/adapters/bill-pay-config.adapter.ts
    transforms:
      - SystemConfiguration -> BillPayConfig
      - ConfigurationUpdate -> BillPayConfigUpdate
```

## Best Practices
```yaml
practices:
  - Keep transformations pure
  - Handle missing/null values
  - Maintain type safety
  - Document assumptions
  - Test edge cases
```
