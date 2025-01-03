# Configuration Management API Migration

## Status: Partial API Coverage
Priority: High
Last Updated: 2024-12-28

## Current Mock Implementation

### Endpoints
```typescript
GET    /bill-pay/config   // Get bill pay configuration
PUT    /bill-pay/config   // Update bill pay configuration
```

### Mock Types
```typescript
interface BillPayConfig {
  id: string;
  cutoffTime: string;
  maxDailyLimit: number;
  maxTransactionLimit: number;
  allowWeekendProcessing: boolean;
  requireDualApproval: boolean;
  retryAttempts: number;
  notificationEmail: string;
  enableEmailNotifications: boolean;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
  validationRules: {
    minTransactionAmount: number;
    maxTransactionAmount: number;
    minDailyLimit: number;
    maxDailyLimit: number;
    minRetryAttempts: number;
    maxRetryAttempts: number;
  };
}

interface BillPayConfigUpdate {
  cutoffTime?: string;
  maxDailyLimit?: number;
  maxTransactionLimit?: number;
  allowWeekendProcessing?: boolean;
  requireDualApproval?: boolean;
  retryAttempts?: number;
  notificationEmail?: string;
  enableEmailNotifications?: boolean;
}
```

## Target API Specification

### Available Endpoints
```typescript
GET /configuration/all    // Get all configurations
```

## Discrepancies

1. Configuration Scope
   - Mock focuses on bill pay specific settings
   - API provides general configuration access
   - Solution: Map bill pay settings to general config

2. Update Operations
   - Mock supports configuration updates
   - API appears read-only
   - Solution: Need additional admin endpoints for config updates

3. Validation Rules
   - Mock includes detailed validation rules
   - API validation structure unknown
   - Solution: Need to confirm API validation handling

## Migration Steps

1. Phase 1: Read Operations
   - [ ] Map current config model to API response
   - [ ] Implement configuration retrieval
   - [ ] Update UI to handle new data structure

2. Phase 2: Write Operations (Requires New API)
   - [ ] Define admin configuration endpoints
   - [ ] Implement configuration updates
   - [ ] Add validation handling

## Affected Components

1. ConfigurationPanel.tsx
   - Update to use new config structure
   - Maintain update capabilities
   - Add validation handling

2. Service Layer
   - Create config mapping layer
   - Implement config updates when available
   - Add validation logic

## Testing Requirements

1. Current API Integration
   - [ ] Test configuration retrieval
   - [ ] Verify data mapping
   - [ ] Test validation rules

2. Future Update Operations
   - [ ] Plan tests for config updates
   - [ ] Verify validation handling
   - [ ] Test configuration persistence

## Dependencies

- Configuration API endpoints
- Future admin endpoints
- Configuration components
- Validation logic

## Notes

1. API Gap Analysis
   - Missing: Configuration update endpoints
   - Missing: Validation rule management
   - Missing: Configuration history

2. Interim Solution
   - Use read-only API for config retrieval
   - Maintain mock endpoints for updates
   - Plan migration to admin endpoints

3. Future Considerations
   - Consider configuration versioning
   - Plan for multi-client config support
   - Consider configuration inheritance
