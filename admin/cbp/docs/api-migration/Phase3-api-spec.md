# Phase 3: API Specification

## API Client Architecture

### Base Configuration
```typescript
// From api.config.ts
export const API_CONFIG = {
  useMockData: process.env.REACT_APP_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development',
  baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
  version: 'v1',
  timeout: 30000,
  mockDelay: 500
};
```

### API Response Types
```typescript
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    timestamp: string;
    requestId: string;
  };
}

interface ApiErrorResponse {
  success: false;
  status: number;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    timestamp: string;
  };
}
```

## Calendar API Endpoints

### Configuration Endpoints

#### GET /api/v1/calendar/config
Get calendar configuration settings
- Response: `ApiSuccessResponse<CalendarConfig>`

#### PUT /api/v1/calendar/config
Update calendar configuration
- Request Body: `CalendarConfigUpdate`
- Response: `ApiSuccessResponse<CalendarConfig>`

### Event Endpoints

#### GET /api/v1/calendar/events
List calendar events with filtering
- Query Parameters: `CalendarEventFilters`
- Response: `ApiSuccessResponse<{ events: CalendarEvent[]; total: number }>`

#### GET /api/v1/calendar/events/:id
Get single calendar event
- Path Parameters: `id: string`
- Response: `ApiSuccessResponse<CalendarEvent>`

#### POST /api/v1/calendar/events
Create new calendar event
- Request Body: `Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>`
- Response: `ApiSuccessResponse<CalendarEvent>`

#### PUT /api/v1/calendar/events/:id
Update existing calendar event
- Path Parameters: `id: string`
- Request Body: `Partial<Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>>`
- Response: `ApiSuccessResponse<CalendarEvent>`

#### DELETE /api/v1/calendar/events/:id
Delete calendar event
- Path Parameters: `id: string`
- Response: `204 No Content`

## Implementation Details

### API Service Class
The calendar service should extend `BaseApi` and follow these patterns:
- Use singleton pattern
- Include comprehensive error handling
- Support mock data fallback
- Include detailed logging

### Mock Handler Requirements
Mock handlers should:
- Use MSW for request interception
- Include realistic delay simulation
- Provide comprehensive test data
- Log all operations for debugging

### Error Handling
Follow established patterns:
- Use type-safe error responses
- Include detailed error messages
- Support retry mechanisms
- Log errors appropriately

### Type Safety
Ensure:
- All request/response types are defined
- No use of `any` type
- Proper use of generics
- Comprehensive interface definitions

## Testing Strategy

### Unit Tests
- Test all API endpoints
- Verify error handling
- Test type validations
- Test mock handlers

### Integration Tests
- Test API service methods
- Verify data transformations
- Test error scenarios
- Verify mock fallbacks

### End-to-End Tests
- Test complete workflows
- Verify UI integration
- Test error states
- Verify data persistence
