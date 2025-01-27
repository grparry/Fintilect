# Client Type Definitions Migration

## Status: In Progress
Priority: High
Last Updated: 2024-12-28

## Current Type Definitions

### Core Types
```typescript
enum ClientType {
  Enterprise = 'Enterprise',
  Small = 'Small',
  Medium = 'Medium',
  Other = 'Other'
}

enum ClientStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending'
}

interface Client {
  id: string;
  name: string;
  type: ClientType;
  status: ClientStatus;
  environment: Environment;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  settings: ClientSettings;
  createdAt: string;
  updatedAt: string;
}
```

### Settings Types
```typescript
interface ClientSettings {
  general: GeneralSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
  branding: BrandingSettings;
  features: FeatureSettings;
}
```

## API Specification Types

### Core Types
```typescript
// To be documented from API spec
```

## Type Mapping Strategy

### Direct Mappings
| Mock Type | API Type | Notes |
|-----------|----------|-------|
| `id: string` | TBD | Need to verify ID format |
| `name: string` | TBD | |
| `status: ClientStatus` | TBD | May need enum mapping |

### Complex Mappings
1. Settings Object
   - Determine if API has equivalent settings structure
   - May need to split into multiple API calls
   - Consider caching strategy

2. Enums
   - Document API status codes
   - Create mapping functions
   - Consider type guards

## Migration Tasks
- [ ] Complete API type documentation
- [ ] Create type mapping functions
- [ ] Update affected components
- [ ] Add type validation
- [ ] Update tests

## Affected Files
1. `/src/types/client.types.ts`
2. `/src/services/clients.service.ts`
3. All components using client types

## Notes
- Consider creating adapter layer for complex mappings
- May need type guards for runtime validation
- Document any lost functionality
- Consider versioning strategy
