# FIS Exceptions Implementation Plan

## Overview
This plan outlines the incremental implementation of FIS Exception endpoints in the cbp-config-api, ensuring each endpoint is fully functional and tested before proceeding to the next feature.

## Prerequisites
- [x] Create base FIS Exceptions service structure
- [x] Set up test environment with mock FIS data
- [x] Create necessary database procedures for FIS exceptions

## Phase 1: Basic Exception Management 
### Implementation
- [x] Create ExceptionService class
- [x] Add search exceptions endpoint with pagination
- [x] Add single exception retrieval endpoint
- [x] Add exception update endpoint
- [x] Implement error handling with ExceptionError class

### Testing
- [x] Test paginated search functionality
- [x] Test error handling for invalid pagination
- [x] Test single exception retrieval
- [x] Test error handling for non-existent exceptions
- [x] Test exception updates
- [x] Test error handling for failed updates

## Phase 2: Refund Processing 
### Implementation
- [x] Add checkRefundAdjustment method
- [x] Create refund check endpoint
- [x] Add refund check response DTOs
- [x] Add refund check route

### Testing
- [x] Test refund checks
- [x] Test adjustment calculations
- [x] Test response formatting
- [x] Test error handling

## Phase 3: Exception History 
### Implementation
- [x] Add exception history tracking
- [x] Create history retrieval endpoint
- [x] Implement history search functionality
- [x] Add history service
- [x] Add history controller
- [x] Add history routes

### Testing
- [x] Test history creation
- [x] Test history retrieval
- [x] Test history search
- [x] Test error handling

## Phase 4: Notification System 
### Implementation
- [x] Create NotificationService class
- [x] Add email notification templates
- [x] Implement notification triggers for exception updates
- [x] Add notification history tracking

### Testing
- [x] Test email template rendering
- [x] Test notification triggers
- [x] Test notification history
- [x] Test error handling

## Implementation Complete
All planned phases have been successfully implemented with appropriate test coverage. The FIS Exceptions system is now ready for use with:
- Full exception management functionality
- Refund processing capabilities
- Exception history tracking
- Notification system integration

Last Updated: 2025-01-09 12:54:33 MST

## Progress Notes
### Completed (Phase 1)
- Basic exception management functionality implemented
- All core endpoints working (search, get, update)
- Test coverage for exception.service.ts at 85.71%
- All tests passing (7 main tests, 7 todo tests for edge cases)

### Completed (Phase 2)
- Refund Processing implementation
  - checkRefundAdjustment method implemented
  - Refund tests passing (4 tests)
  - Next: Create endpoint, DTOs, and route

### Completed (Phase 3)
- Exception History implementation
  - History service implemented with full test coverage
    - Create history records
    - Search history with filters
    - Get history by ID
  - History controller implemented with tests
    - Create endpoint
    - Search endpoint
    - GetById endpoint

### Completed (Phase 4)
- Notification System implementation
  - NotificationService class implemented
  - Email notification templates added
  - Notification triggers implemented for exception updates
  - Notification history tracking added

## Technical Notes
- Maintaining backward compatibility with legacy API
- Using TypeScript for type safety
- Following REST API best practices
- Implementing comprehensive error handling
- Using Jest for testing

## Status Legend
 Complete
 In Progress
 Pending
 Blocked

## Data Models
### Core Models
#### FIS Exception
```typescript
interface FisException {
  id: number;
  payeeAttentionLine?: string;
  payeeTelephoneNumber?: string;
  payeeAddress1?: string;
  payeeAddress2?: string;
  payeeCity?: string;
  payeeState?: string;
  payeeZip?: string;
  payeeCountry?: string;
  payeeNickname?: string;
  customerPayeeId?: string;
  customerPayeeAccountNumber?: string;
  confirmationNumber?: string;
  transactionAmount?: string;
  memoLineInfo?: string;
  serviceRequestNumber?: string;
  serviceRequestDate: Date;
  serviceRequestTime?: string;
  serviceRequestType?: string;
  problemCauseType?: string;
  effectiveDate?: string;
  deliverByDate?: string;
  payeeName?: string;
}

#### Request/Response Models
```typescript
interface ExceptionSearchRequest {
  startDate?: Date;
  endDate?: Date;
  sponsorId?: string[];
  correctionMade?: boolean;
  page?: number;
  pageSize?: number;
}

interface ExceptionSearchResponse {
  data: FisException[];
  pagination: {
    total: number;
    page: number;
    pageSize: number;
  };
}

interface ExceptionUpdateRequest {
  id: number;
  correctionMade: boolean;
  correctionType: 'ACCOUNT_NUMBER' | 'FIS_PAYEE_ID' | 'MANUAL' | 'REFUNDED';
  notes?: string;
}

interface ExceptionRefundRequest {
  paymentId: string;
  exceptionId: number;
}

interface ExceptionRefundResponse {
  success: boolean;
  adjustment?: {
    amount: number;
    date: Date;
    status: string;
    reason?: string;
  };
}

interface ExceptionNotificationRequest {
  paymentId: string;
  statusCode: number;
}

### Database Schema
```sql
CREATE TABLE FisExceptions (
  Id INT PRIMARY KEY IDENTITY(1,1),
  PayeeAttentionLine NVARCHAR(100),
  PayeeTelephoneNumber NVARCHAR(20),
  PayeeAddress1 NVARCHAR(100),
  PayeeAddress2 NVARCHAR(100),
  PayeeCity NVARCHAR(50),
  PayeeState NVARCHAR(2),
  PayeeZip NVARCHAR(10),
  PayeeCountry NVARCHAR(50),
  PayeeNickname NVARCHAR(100),
  CustomerPayeeId NVARCHAR(50),
  CustomerPayeeAccountNumber NVARCHAR(50),
  ConfirmationNumber NVARCHAR(50),
  TransactionAmount DECIMAL(18,2),
  MemoLineInfo NVARCHAR(MAX),
  ServiceRequestNumber NVARCHAR(50),
  ServiceRequestDate DATETIME,
  ServiceRequestTime NVARCHAR(8),
  ServiceRequestType NVARCHAR(50),
  ProblemCauseType NVARCHAR(50),
  EffectiveDate DATE,
  DeliverByDate DATE,
  PayeeName NVARCHAR(100),
  CreatedAt DATETIME DEFAULT GETDATE(),
  UpdatedAt DATETIME,
  CorrectionMade BIT DEFAULT 0,
  CorrectionType NVARCHAR(20),
  CorrectionNotes NVARCHAR(MAX)
)

CREATE TABLE ExceptionAdjustments (
  Id INT PRIMARY KEY IDENTITY(1,1),
  ExceptionId INT FOREIGN KEY REFERENCES FisExceptions(Id),
  PaymentId NVARCHAR(50),
  Amount DECIMAL(18,2),
  AdjustmentDate DATETIME,
  Status NVARCHAR(20),
  Reason NVARCHAR(MAX),
  CreatedAt DATETIME DEFAULT GETDATE()
)

## Integration Architecture
### Service Dependencies
```typescript
interface IExceptionService {
  private readonly paymentExceptionRepository: IRepository<PaymentException>;
  private readonly fisExceptionsCorrectionRepository: IRepository<FisExceptionsCorrection>;
  private readonly creditUnionRepository: IRepository<CreditUnion>;
  private readonly notificationProvider: INotificationProvider;
  private readonly memberProvider: IMemberProvider;
  private readonly paymentRepository: IRepository<Payment>;
  private readonly globalPayeeRepository: IRepository<GlobalPayee>;
  private readonly logger: ILogger;
  
  constructor(dependencies: ServiceDependencies);
  
  searchExceptions(request: ExceptionSearchRequest): Promise<ServiceResponse<ExceptionListResponse>>;
  getException(id: number): Promise<ServiceResponse<ExceptionResponse>>;
  updateException(request: ExceptionUpdateRequest): Promise<ServiceResponse>;
  checkRefundAdjustment(paymentId: string, exceptionId: number): Promise<ServiceResponse<ExceptionRefundResponse>>;
  sendNotification(request: ExceptionNotificationRequest): Promise<ServiceResponse>;
}
```

### External Service Integration
#### FIS API Integration
```typescript
interface IFisApiService {
  getPayeeByFactor(request: PayeeFactorRequest): Promise<PayeeResponse>;
  validatePayeeAccount(payeeId: string, accountNumber: string): Promise<ValidationResponse>;
  processRefund(request: RefundRequest): Promise<RefundResponse>;
  sendNotification(request: NotificationRequest): Promise<void>;
}

class FisApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  apiKey: string;
  // Add other FIS-specific configuration
}
```

#### Notification Provider
```typescript
interface INotificationProvider {
  sendCustomerNotification(request: CustomerNotificationRequest): Promise<void>;
  sendSystemNotification(request: SystemNotificationRequest): Promise<void>;
  getNotificationTemplate(type: NotificationType): Promise<Template>;
}
```

### Error Handling
```typescript
enum ExceptionErrorCodes {
  INVALID_REQUEST = 'EXC-001',
  NOT_FOUND = 'EXC-002',
  FIS_API_ERROR = 'EXC-003',
  NOTIFICATION_FAILED = 'EXC-004',
  REFUND_FAILED = 'EXC-005',
  DATABASE_ERROR = 'EXC-006'
}

interface ErrorResponse {
  code: ExceptionErrorCodes;
  message: string;
  details?: Record<string, unknown>;
}

class ExceptionError extends Error {
  constructor(
    public code: ExceptionErrorCodes,
    public statusCode: number,
    message: string,
    public details?: Record<string, unknown>
  );
}
```

## Database Implementation
### Stored Procedures
```sql
-- Search Exceptions
CREATE PROCEDURE [dbo].[PROC_FIS_EXCEPTION_SEARCH]
  @StartDate DateTime = NULL,
  @EndDate DateTime = NULL,
  @SponsorIds nvarchar(MAX) = NULL,
  @CorrectionMade bit = NULL,
  @PageNumber int,
  @PageSize int
AS
BEGIN
  SET NOCOUNT ON;
  -- Implementation details...
END

-- Update Exception
CREATE PROCEDURE [dbo].[PROC_FIS_EXCEPTION_UPDATE]
  @Id int,
  @CorrectionMade bit,
  @CorrectionType nvarchar(20),
  @Notes nvarchar(MAX) = NULL,
  @UpdatedBy nvarchar(50)
AS
BEGIN
  SET NOCOUNT ON;
  -- Implementation details...
END

-- Check Refund
CREATE PROCEDURE [dbo].[PROC_FIS_REFUND_CHECK]
  @PaymentId nvarchar(50),
  @ExceptionId int
AS
BEGIN
  SET NOCOUNT ON;
  -- Implementation details...
END

-- Send Notification
CREATE PROCEDURE [dbo].[PROC_FIS_NOTIFICATION_SEND]
  @ExceptionId int,
  @NotificationType nvarchar(20),
  @Recipients nvarchar(MAX),
  @TemplateData nvarchar(MAX)
AS
BEGIN
  SET NOCOUNT ON;
  -- Implementation details...
END
```

### Indices
```sql
-- Performance optimization indices
CREATE NONCLUSTERED INDEX [IX_FisExceptions_ServiceRequestDate]
ON [dbo].[FisExceptions] ([ServiceRequestDate])
INCLUDE ([Id], [PayeeName], [TransactionAmount])

CREATE NONCLUSTERED INDEX [IX_FisExceptions_CorrectionMade]
ON [dbo].[FisExceptions] ([CorrectionMade])
INCLUDE ([Id], [ServiceRequestDate], [PayeeName])

CREATE NONCLUSTERED INDEX [IX_ExceptionAdjustments_PaymentId]
ON [dbo].[ExceptionAdjustments] ([PaymentId])
INCLUDE ([ExceptionId], [Amount], [Status])
```

## Authentication & Authorization
### Required Permissions
```typescript
enum ExceptionPermissions {
  VIEW_EXCEPTIONS = 'exceptions:view',
  UPDATE_EXCEPTIONS = 'exceptions:update',
  PROCESS_REFUNDS = 'exceptions:refund',
  SEND_NOTIFICATIONS = 'exceptions:notify'
}

interface RolePermissions {
  ADMIN: ExceptionPermissions[];
  SUPERVISOR: ExceptionPermissions[];
  OPERATOR: ExceptionPermissions[];
}
```

### Middleware
```typescript
interface AuthMiddleware {
  validateToken(req: Request): Promise<void>;
  checkPermission(permission: ExceptionPermissions): RequestHandler;
  validateSponsorAccess(req: Request): Promise<void>;
}
```

### API Security
```typescript
interface SecurityConfig {
  rateLimit: {
    windowMs: number;
    max: number;
  };
  cors: {
    allowedOrigins: string[];
    allowedMethods: string[];
  };
  helmet: {
    contentSecurityPolicy: boolean;
    xssFilter: boolean;
  };
}
```

## API Routes
```typescript
// Exception Routes
router.get('/api/v1/exceptions',
  auth.checkPermission(ExceptionPermissions.VIEW_EXCEPTIONS),
  validateRequest(searchSchema),
  exceptionController.search
);

router.get('/api/v1/exceptions/:id',
  auth.checkPermission(ExceptionPermissions.VIEW_EXCEPTIONS),
  validateRequest(getSchema),
  exceptionController.getById
);

router.put('/api/v1/exceptions/:id',
  auth.checkPermission(ExceptionPermissions.UPDATE_EXCEPTIONS),
  validateRequest(updateSchema),
  exceptionController.update
);

router.post('/api/v1/exceptions/:id/refund',
  auth.checkPermission(ExceptionPermissions.PROCESS_REFUNDS),
  validateRequest(refundSchema),
  exceptionController.checkRefund
);

router.post('/api/v1/exceptions/notify',
  auth.checkPermission(ExceptionPermissions.SEND_NOTIFICATIONS),
  validateRequest(notificationSchema),
  exceptionController.sendNotification
);
```

## Testing Strategy
### Integration Tests
```typescript
describe('ExceptionService Integration', () => {
  // Test external service integration
  it('should integrate with FIS API');
  it('should handle FIS API errors');
  it('should retry failed FIS API calls');
  
  // Test notification integration
  it('should send customer notifications');
  it('should handle notification failures');
  
  // Test database integration
  it('should execute stored procedures');
  it('should handle database errors');
});
```

### Error Handling Tests
```typescript
describe('ExceptionService Error Handling', () => {
  it('should handle invalid requests');
  it('should handle not found errors');
  it('should handle FIS API errors');
  it('should handle notification failures');
  it('should handle database errors');
});
```

## Completion Checklist
For each endpoint:
- [ ] Endpoint compiles successfully
- [ ] All tests pass
- [ ] Response format matches legacy API
- [ ] Basic error handling is in place
- [ ] Endpoint is documented in OpenAPI spec

## Testing Guidelines
1. Each test should focus on happy path initially
2. Use realistic mock data that matches production format
3. Verify response structures match legacy API exactly
4. Test pagination where applicable
5. Ensure proper error status codes are returned

## Dependencies
- TypeScript
- Jest for testing
- OpenAPI for documentation
- SQL Server for database
- FIS API mock for testing

## Notes
- Implementation order is designed to minimize dependencies between features
- Each phase should be completed and tested before moving to the next
- Keep backward compatibility with legacy API response formats
- Document any deviations from legacy API behavior
- Phase 1 completed successfully with all tests passing
- Test coverage for exception.service.ts at 85.71%
- Next focus will be on Phase 2: Refund Processing
- Additional todo tests can be implemented as needed for edge cases
