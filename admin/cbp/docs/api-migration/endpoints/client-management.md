# Client Management API Migration

## Status: In Progress
Priority: High
Last Updated: 2024-12-28

## Current Mock Implementation

### Endpoints
```typescript
GET /api/clients                // List all clients
GET /api/clients/:id           // Get single client
PUT /api/clients/:id           // Update client
POST /api/clients              // Create client
```

### Mock Types
```typescript
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

## Target API Specification

### Available Endpoints
```typescript
// Primary Endpoints
GET /api/v1/creditunion/all              // List all clients
GET /api/v1/creditunion/{sponsorId}      // Get single client
PUT /api/v1/creditunion                  // Update client
POST /api/v1/creditunion                 // Create client

// Additional Related Endpoints
POST /api/v1/run/manual                  // Create manual processing run for a client
```

### Required Types
```typescript
// Main client response type
interface CreditUnionResponse {
  sponsorId: string;      // maps to client.id
  sponsorName: string;    // maps to client.name
  routingId: string;      // new required field
  // Additional fields TBD from API spec
}

// Create request
interface CreditUnionAddRequest {
  sponsorId: string;
  sponsorName: string;
  routingId: string;
  // Required fields: ["sponsorId", "sponsorName", "routingId"]
}

// Update request
interface CreditUnionEditRequest {
  sponsorId: string;      // Required
  sponsorName?: string;   // Optional
  routingId?: string;     // Optional
  // Other fields optional
}

// List response
interface CreditUnionListResponse {
  creditUnions: CreditUnionResponse[];
}
```

## Discrepancies
1. Endpoint Path Structure
   - Mock uses `/api/clients`
   - API uses `/api/v1/creditunion`
   - Solution: Update service layer to use new paths

2. ID Field Naming
   - Mock uses generic `id`
   - API uses `sponsorId`
   - Solution: Create mapping layer in service

3. Required Fields
   - API requires `routingId` for creation
   - Mock doesn't have this concept
   - Solution: Add to client creation form/logic

4. Response Structure
   - API provides more financial-specific fields
   - Mock has generic client fields
   - Solution: Extend client model to include new fields

5. Settings Management
   - Mock has complex settings object
   - API structure for settings TBD
   - Solution: Need to determine API equivalent

## Migration Steps
- [ ] Update service layer to use new API paths
- [ ] Create type mappings between Client and CreditUnion types
- [ ] Add routing number handling to client creation
- [ ] Update client list component for new response format
- [ ] Update client detail component for new fields
- [ ] Create/update MSW handlers to match API format
- [ ] Update tests to use new types and endpoints

## Affected Components
1. ClientList.tsx
   - Update to handle CreditUnionListResponse
   - Map sponsorId/sponsorName to id/name
   - Handle new required fields

2. ClientDetail/Edit Components
   - Add routing number field
   - Update form validation
   - Handle optional vs required fields

3. Service Layer
   - Update endpoint paths
   - Add type conversion logic
   - Handle new field requirements

## Testing Requirements
- [ ] Test all CRUD operations with new endpoints
- [ ] Verify handling of required fields
- [ ] Test type conversions
- [ ] Validate error handling
- [ ] Test backward compatibility

## Dependencies
- Client type definitions
- Service layer implementations
- Form components
- MSW handlers

## Notes
- Need to maintain backward compatibility during migration
- Consider creating adapter layer for smooth transition
- Document new required fields for client creation
- Consider phased rollout of new fields
