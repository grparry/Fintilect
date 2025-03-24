# Bill Pay Service API Alignment

## Service Layer Implementation

### TypeScript Service Location
```typescript
// admin/cbp/src/services/interfaces/IBillPayService.ts
```

### Service Interface
```typescript
interface IBillPayService extends IBaseService {
  // Configuration
  getConfiguration(): Promise<BillPayConfig>;
  updateConfiguration(config: BillPayConfigUpdate): Promise<BillPayConfigValidation>;
  
  // Exception Management
  getExceptions(filters: PaymentFilters): Promise<PaginatedResponse<PaymentException>>;
  resolveException(exceptionId: string, resolution: ExceptionResolution): Promise<void>;
  
  // Client and Payee Management
  getClients(): Promise<Client[]>;
  getPayees(clientId: string): Promise<Payee[]>;
  
  // Analytics
  getStats(timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<BillPayStats>;
  getTransactionTrends(timeframe: 'day' | 'week' | 'month' | 'quarter' | 'year'): Promise<TransactionTrend[]>;
  
  // Holiday Management
  getHolidays(): Promise<Holiday[]>;
  addHoliday(holiday: HolidayInput): Promise<Holiday>;
  
  // Notification Management
  getNotificationTemplates(): Promise<NotificationTemplate[]>;
  updateNotificationTemplate(templateId: number, template: NotificationTemplateInput): Promise<NotificationTemplate>;
  
  // Security
  getSecuritySettings(): Promise<BillPaySecuritySettings>;
  updateSecuritySettings(settings: BillPaySecuritySettings): Promise<BillPaySecuritySettings>;
  validateSecuritySettings(settings: BillPaySecuritySettings): Promise<BillPaySecurityValidation>;
  sendOTP(method: BillPayOTPMethod, destination: string): Promise<void>;
}
```

### TypeScript Types
```typescript
// From bill-pay.types.ts
interface BillPayStats {
  totalTransactions: number;
  totalAmount: number;
  successRate: number;
  averageTransactionSize: number;
  transactionsByMethod: Record<string, number>;
  transactionsByStatus: Record<PaymentStatus, number>;
  recentActivity: Array<{
    id: string;
    amount: number;
    method: string;
    status: PaymentStatus;
    timestamp: string;
  }>;
}

interface TransactionTrend {
  date: string;
  amount: number;
  count: number;
}

interface Client {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

interface Payee {
  id: string;
  name: string;
  accountNumber?: string;
  routingNumber?: string;
  address?: string;
  status: 'active' | 'inactive';
}
```

## C# Implementation

### Controller Locations
```csharp
// legacy/legacy-apis/cbp.admin-cu-api/Controllers/ConfigurationController.cs
// legacy/legacy-apis/cbp.admin-cu-api/Controllers/ClientController.cs
// legacy/legacy-apis/cbp.admin-cu-api/Controllers/PayeeController.cs
// legacy/legacy-apis/cbp.admin-cu-api/Controllers/HolidayController.cs
// legacy/legacy-apis/cbp.admin-cu-api/Controllers/NotificationController.cs
// legacy/legacy-apis/cbp.admin-cu-api/Controllers/SecurityController.cs
```

### Key Endpoints
```csharp
[Route("api/v1/configuration")]
public class ConfigurationController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<BillPayConfigResponse>> GetConfiguration()

    [HttpPut]
    public async Task<ActionResult<BillPayConfigValidationResponse>> UpdateConfiguration([FromBody] BillPayConfigRequest request)
}

[Route("api/v1/clients")]
public class ClientController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ClientResponse>>> GetClients()

    [HttpGet("{id}/payees")]
    public async Task<ActionResult<List<PayeeResponse>>> GetPayees(string id)
}

[Route("api/v1/notifications")]
public class NotificationController : ControllerBase
{
    [HttpGet("templates")]
    public async Task<ActionResult<List<NotificationTemplateResponse>>> GetTemplates()

    [HttpPut("templates/{id}")]
    public async Task<ActionResult<NotificationTemplateResponse>> UpdateTemplate(int id, [FromBody] NotificationTemplateRequest request)
}
```

## Service Layer Alignment

### Type Transformations
1. Property Case Handling
   - TypeScript uses camelCase (e.g., `clientId`, `payeeId`)
   - C# uses PascalCase (e.g., `ClientId`, `PayeeId`)
   - Axios automatically handles case transformation

2. Date Handling
   - TypeScript: ISO string format (`createdAt: string`)
   - C#: DateTime (`CreatedAt: DateTime`)
   - Service layer handles date format conversion

3. Numeric Types
   - TypeScript: `number` for all numeric values
   - C#: Mix of `decimal` for amounts and `int` for counts
   - Service layer ensures proper numeric type conversion

4. Exception Handling
   - FISException maps to PaymentException in mock service
   - Exception resolution data stored in FISException fields
   - Consistent error status and message mapping

### Error Handling
```typescript
// Service Layer Error Handling
try {
  const response = await this.get<BillPayConfig>('/config');
  return response.data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 400: throw new ValidationError(error.response.data);
      case 404: throw new NotFoundError('Configuration not found');
      default: throw new ApiError('Failed to get configuration');
    }
  }
  throw error;
}
```

## Implementation Notes

1. API Type Separation
   - Internal types in separate files:
     - bill-pay.types.ts
     - security.types.ts
     - payment.types.ts
   - Service layer handles type transformations

2. Service Responsibility Separation
   - Payment operations moved to IPaymentService
   - IBillPayService focuses on bill pay configuration and management
   - Clear separation of concerns between services

3. Mock Service Implementation
   - Consistent with real service interfaces
   - Uses mock data generators for stats and trends
   - Proper type mapping for exceptions and security settings

4. Security
   - OTP support for sensitive operations
   - Security settings validation
   - Configurable security policies

## Gaps and Actions

### Missing Functionality
1. Configuration Management
   - Add configuration templates
   - Add configuration versioning
   - Add configuration validation rules

2. Exception Management
   - Add exception categorization

### Type Mismatches
1. Status Enums
   - Standardize status enums across types
   - Consider using shared type definitions
   - Add status transition validation

2. Amount Handling
   - Ensure consistent decimal handling
   - Add currency support
   - Implement proper rounding rules

### C# API Gaps

1. Configuration Endpoints
   - TypeScript `getConfiguration` maps to C# `Get(Guid id)`
   - Missing TypeScript endpoint for C# `Create` operation
   - Missing TypeScript endpoint for C# `Refresh` operation
   - Need to align configuration CRUD operations

2. Exception Management
   - C# API only supports date-based exception queries (`GetExceptionsBySingleDate`)
   - TypeScript interface supports more flexible filtering (`PaymentFilters`)
   - Need to extend C# API to support full filter capabilities
   - C# refund endpoint not exposed in TypeScript interface

3. Security Settings
   - No dedicated SecurityController exists in C# API
   - Missing C# endpoints for:
     - `validateSecuritySettings`
     - `sendOTP`
     - Security policy management
   - Security validation currently handled through ConfigurationController
   - Need to implement proper security endpoints or document where these operations exist

4. Analytics Support
   - No dedicated analytics/stats endpoints in C# API
   - Current stats may be handled through:
     - PaymentController's activity endpoint
     - ReportController's generic report runner
   - Missing direct support for:
     - `getStats` with timeframe filtering
     - `getTransactionTrends` with timeframe support
   - Need to:
     - Either expose existing report endpoints through TypeScript interface
     - Or implement dedicated analytics endpoints
     - Ensure consistent date range handling between front-end and back-end

### Action Items

1. API Alignment
   - Document all C# endpoints and their TypeScript counterparts
   - Identify missing endpoints on both sides
   - Create mapping document for type transformations

2. Security Implementation
   - Determine if security operations should be:
     - Added to ConfigurationController
     - Implemented in a new SecurityController
     - Or handled through existing endpoints
   - Document security validation flow
   - Implement proper OTP handling

3. Analytics Implementation
   - Review existing report procedures
   - Document which reports provide stats and trends
   - Consider creating dedicated analytics endpoints
   - Ensure consistent date handling

4. Error Handling
   - Map C# exception types to TypeScript error types
   - Ensure consistent error codes and messages

## Suggested Improvements
1. Type Safety
   - Add runtime type validation
   - Implement stricter null checking
   - Add request/response type guards

2. API Consistency
   - Standardize error responses
   - Add OpenAPI documentation
   - Implement API versioning

## Questions for Team Discussion
1. Should we add support for configuration templates?
2. How should we handle configuration versioning?
3. Do we need more granular permission controls?
4. Should we add support for multiple notification providers?
