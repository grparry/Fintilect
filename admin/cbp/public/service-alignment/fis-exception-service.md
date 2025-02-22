# FIS Exception Service API Alignment

## Current TypeScript Implementation

### Base URL
```typescript
// From FISExceptionService.ts
api/v1/fis/exception
```

### Endpoints Called
```typescript
// IFISExceptionService interface
GET    /fis/exception                - Get FIS exceptions with filters
GET    /fis/exception/history        - Get response history for a request
POST   /fis/exception/:id/retry      - Retry a failed FIS exception
POST   /fis/exception/:id/ignore     - Ignore a FIS exception
```

### TypeScript Types Used
```typescript
enum FISExceptionStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  FAILED = 'FAILED',
  RETRYING = 'RETRYING',
  REVERSED = 'REVERSED',
  STOPPED = 'STOPPED',
  PENDING_REVERSAL = 'PENDING_REVERSAL',
  PENDING_REFUND = 'PENDING_REFUND',
  PENDING_RETURN = 'PENDING_RETURN',
  PENDING_STOP_PAYMENT = 'PENDING_STOP_PAYMENT',
  PENDING_RESEND = 'PENDING_RESEND'
}

enum FISErrorCode {
  INVALID_ACCOUNT = 'INVALID_ACCOUNT',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  ACCOUNT_CLOSED = 'ACCOUNT_CLOSED',
  TECHNICAL_ERROR = 'TECHNICAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR'
}

interface FISException {
  id: string;
  requestId: string;
  status: FISExceptionStatus;
  errorCode: FISErrorCode;
  errorMessage: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  retryCount: number;
}

interface FISResponseHistory {
  id: string;
  requestId: string;
  status: FISExceptionStatus;
  response: Record<string, any>;
  timestamp: string;
  retryCount: number;
}

interface FISExceptionFilters {
  requestId?: string;
}
```

## C# Implementation

### Controller Location
No dedicated FIS exception controller found. FIS exception handling may be part of the general exception controller or payment processing system.

### Available Endpoints
Need to verify if FIS exception handling endpoints exist in the C# codebase.

### C# Types
Need to verify corresponding C# types for:
- FISExceptionStatus enum
- FISErrorCode enum
- FISException class
- FISResponseHistory class

## Type Alignment Needed

1. Status Enums
   - Verify FISExceptionStatus values match C# implementation
   - Ensure consistent error code mapping

2. Response Types
   - Confirm FISException fields match C# model
   - Validate history tracking implementation

## Questions for Team Discussion

1. FIS Integration
   - Confirm FIS exception handling workflow
   - Verify retry and ignore processes
   - Discuss response history requirements

2. Data Requirements
   - Required exception metadata fields
   - History tracking needs
   - Status transition rules

3. Error Handling
   - Error code standardization
   - Retry attempt limits
   - Exception resolution flow
