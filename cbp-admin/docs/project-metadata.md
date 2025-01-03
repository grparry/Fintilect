# CBPAdmin Project Metadata

## Component Map
```
src/
  components/
    bill-pay/
      settings/          # Settings Components
        - AuditLog.tsx         -> services/bill-pay.service.ts (audit-log)
        - HolidaySettings.tsx  -> services/holiday.service.ts
        - NotificationTemplates.tsx -> services/notification-template.service.ts
        - PermissionGroups.tsx -> services/permission.service.ts
        - BillPaySecuritySettings.tsx -> services/bill-pay-security.service.ts

  services/              # Service Layer
    - bill-pay.service.ts       # Core bill pay operations
    - holiday.service.ts        # Holiday management
    - notification-template.service.ts  # Notification system
    - permission.service.ts     # Permission management
    - bill-pay-security.service.ts     # Security settings

  mocks/
    handlers/            # Mock Implementations
      - billPayHandlers.ts      # Includes: audit-log, payments
      - holidayHandlers.ts      # Holiday operations
      - billPaySecurityHandlers.ts  # Security settings
      - billPayConfigHandlers.ts    # Configuration management

  types/                # Type Definitions
    - bill-pay.types.ts         # Core types
    - security.types.ts         # Security types
    - permission.types.ts       # Permission types
    - api.types.ts             # API response types
```

## Service Patterns
1. **Direct API Integration**
   - Used by: Holiday System
   - Pattern: Direct endpoint mapping
   - Files: 
     - `services/holiday.service.ts`
     - `mocks/handlers/holidayHandlers.ts`

2. **Adapter Pattern**
   - Used by: Configuration System
   - Pattern: Format transformation
   - Files:
     - `services/bill-pay-config.service.ts`
     - `adapters/bill-pay-config.adapter.ts`
     - `mocks/handlers/billPayConfigHandlers.ts`

3. **Mock Preservation**
   - Used by: Permissions, Security
   - Pattern: Full mock implementation
   - Files:
     - `services/permission.service.ts`
     - `services/bill-pay-security.service.ts`
     - `mocks/handlers/billPaySecurityHandlers.ts`

## API Integration Status
1. **Fully Integrated**
   - Holiday System
     - Endpoint: `/holiday-management`
     - Spec: `docs/api-migration/endpoints/holiday-management.md`

2. **Adapter Integration**
   - Configuration System
     - Endpoint: `/configuration/all`
     - Spec: `docs/api-migration/endpoints/configuration-management.md`

3. **Pending Integration**
   - Notifications System
     - Target: `/api/v1/supportnotification`
     - Spec: `docs/api-migration/endpoints/notifications.md`

4. **No API Coverage**
   - Permissions System
   - Security System
   - Spec Status: Awaiting documentation

## Implementation Standards
1. **Environment Switching**
   ```typescript
   // Standard pattern in services
   const baseUrl = process.env.REACT_APP_USE_MOCK_API
     ? '/mock-api/endpoint'
     : '/real-api/endpoint';
   ```

2. **Response Wrapping**
   ```typescript
   // Standard API response type
   interface ApiResponse<T> {
     success: boolean;
     data: T;
     meta?: Record<string, unknown>;
   }
   ```

3. **Mock Handler Structure**
   ```typescript
   // Standard mock handler pattern
   http.get('*/endpoint', () => {
     return HttpResponse.json({
       success: true,
       data: mockData,
       meta: {
         timestamp: new Date().toISOString(),
         requestId: crypto.randomUUID()
       }
     });
   });
   ```

## Common File Relationships
1. **Component -> Service -> Handler**
   ```
   Component.tsx
     -> service.ts (API integration)
       -> handlers.ts (mock implementation)
   ```

2. **Component -> Types -> Constants**
   ```
   Component.tsx
     -> types.ts (type definitions)
       -> constants.ts (default values)
   ```

## Migration Patterns
1. **API First**
   - Review API specification
   - Update service layer
   - Align mock handlers
   - Update component

2. **Mock First**
   - Document current functionality
   - Prepare adapter structure
   - Maintain mock implementation
   - Plan API integration

## Testing Requirements
1. **Unit Tests**
   - Component rendering
   - Service method calls
   - Type validation

2. **Integration Tests**
   - API endpoint integration
   - Mock handler responses
   - Error handling

3. **Environment Tests**
   - Mock/Real switching
   - Response consistency
   - Feature parity
