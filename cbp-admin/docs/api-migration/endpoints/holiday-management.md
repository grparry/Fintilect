# Holiday Management API Migration

## Status: Partial API Coverage
Priority: Medium
Last Updated: 2024-12-28

## Current Mock Implementation

### Endpoints
```typescript
GET    /holidays          // List all holidays
GET    /holidays/:id      // Get single holiday
POST   /holidays          // Create holiday
PATCH  /holidays/:id      // Update holiday
DELETE /holidays/:id      // Delete holiday
```

### Mock Types
```typescript
interface Holiday {
  id: number;
  name: string;
  date: string;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
```

## Target API Specification

### Available Endpoints
```typescript
// Read-only Holiday Information
GET /calendar/holiday/date/{date}      // Check if date is holiday
GET /calendar/delivery-date/{beginDate} // Get delivery dates
GET /calendar/non-processing           // Get non-processing dates
```

### Required Types
```typescript
interface IsHolidayResponse {
  isHoliday: boolean;
  description: string;
}
```

## Discrepancies

1. Read vs Write Operations
   - API provides read-only holiday information
   - Mock supports full CRUD operations
   - Solution: Need additional admin endpoints for holiday management

2. Data Model Differences
   - Mock uses detailed holiday model
   - API provides simple boolean check
   - Solution: Extend API to support full holiday model

3. Delivery Date Integration
   - API includes delivery date calculation
   - Mock focuses on holiday management
   - Solution: Integrate both capabilities

## Migration Steps

1. Phase 1: Use Existing API
   - [ ] Implement holiday checking using `/calendar/holiday/date/{date}`
   - [ ] Integrate delivery date calculation
   - [ ] Map API responses to current UI expectations

2. Phase 2: Admin Operations (Requires New API Endpoints)
   - [ ] Define new admin endpoints for holiday management
   - [ ] Implement admin operations once available
   - [ ] Update UI to use new endpoints

## Affected Components

1. HolidayList.tsx
   - Update to use calendar API
   - Maintain CRUD UI for admin operations
   - Add delivery date integration

2. HolidayCalendar.tsx
   - Integrate with delivery date API
   - Add non-processing date display

3. Service Layer
   - Create adapter for current vs new API
   - Add delivery date calculations
   - Implement admin operations when available

## Testing Requirements

1. Current API Integration
   - [ ] Test holiday date checking
   - [ ] Verify delivery date calculations
   - [ ] Test non-processing date handling

2. Future Admin Operations
   - [ ] Plan tests for CRUD operations
   - [ ] Verify holiday management workflow
   - [ ] Test integration with delivery dates

## Dependencies

- Calendar API endpoints
- Future admin endpoints
- Holiday management components
- Delivery date calculation logic

## Notes

1. API Gap Analysis
   - Missing: Holiday management endpoints
   - Missing: Bulk holiday operations
   - Missing: Holiday type management

2. Interim Solution
   - Use read-only API for holiday checking
   - Maintain mock endpoints for admin operations
   - Plan migration to admin endpoints when available

3. Future Considerations
   - Consider caching holiday data
   - Plan for holiday data synchronization
   - Consider multi-region holiday support
