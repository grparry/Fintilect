---
type: pattern
category: core
status: active
priority: high
last_validated: 2024-12-31
impacts:
  - patterns/core/state-patterns.md
  - patterns/security/client-management/data-protection.md
  - patterns/integration/coordination.md
  - patterns/components/common/data-tables.md
context_triggers:
  - "When designing data flow between components"
  - "When implementing state management"
  - "When handling data transformations"
  - "When optimizing data operations"
  - "When ensuring data consistency"
---

# Core Data Flow Patterns

## Service Layer Pattern
```yaml
pattern:
  name: "Service Layer"
  purpose: "Encapsulate all API communication"
  location: "src/services"

implementation:
  structure:
    - Service class per feature
    - TypeScript interfaces for params/returns
    - Error handling wrapper
    - Response transformation
  
  rules:
    - No direct API calls from components
    - Use adapters for complex transformations
    - Handle loading and error states
    - Implement retry logic for critical operations

example:
  service: "bill-pay.service.ts"
  pattern: |
    export class BillPayService {
      async getPayments(filters: FilterParams): Promise<Payment[]>
      async processPayment(payment: PaymentRequest): Promise<PaymentResult>
      async getAuditLog(params: AuditParams): Promise<AuditEntry[]>
    }
```

## State Management Pattern
```yaml
pattern:
  name: "Context + Reducers"
  purpose: "Predictable state updates"
  location: "src/context"

implementation:
  structure:
    - Context provider per feature
    - Reducer for complex state
    - Action creators for operations
    - Selector hooks for data access
  
  rules:
    - Keep state normalized
    - Use TypeScript for type safety
    - Implement proper error boundaries
    - Handle loading states consistently
```

## Data Validation Pattern
```yaml
pattern:
  name: "Schema Validation"
  purpose: "Ensure data integrity"
  location: "src/validation"

implementation:
  approach: "Zod schemas"
  layers:
    - API request/response
    - Form inputs
    - State updates
  
  rules:
    - Define schemas near types
    - Validate at system boundaries
    - Provide clear error messages
    - Handle partial data states
```
