# Payee Service API Alignment

## Architecture Overview

The payee system has two distinct types of payees:
1. **Global Payees**: Maintained by FIS, read-only for our system
2. **User Payees**: User-specific payee relationships that can be managed

## Current TypeScript Implementation

### Base URL
```typescript
// From PayeeService.ts
api/v1/payees
```

### Endpoints Called
```typescript
// Global (FIS) Payee Operations
GET    /payees/fis             - Get payee from FIS

// User Payee Management
GET    /payees                  - Get user payees with filters
GET    /payees/:id             - Get specific user payee
POST   /payees                 - Create user payee
PUT    /payees/:id             - Update user payee
DELETE /payees/:id             - Delete user payee

// Payee Validation
POST   /payees/validate        - Validate user payee details

// Metadata
GET    /payees/types           - Get payee types
GET    /payees/statuses        - Get payee statuses
```

### TypeScript Types Used
```typescript
// Core Types
interface Payee {
  id: string;
  name: string;
  type: PaymentMethod;
  status: PaymentStatus;
  accountNumber?: string;
  routingNumber?: string;
  address?: PayeeAddress;
  metadata?: Record<string, any>;
  isGlobal?: boolean;  // Indicates if this is a FIS global payee
}

interface PayeeAddress {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
}

// FIS Integration Types
interface FisPayeeRequest {
  fisPayeeId: string;
  type?: PaymentMethod;
}

interface FisPayeeResponse {
  payee: Payee;
  validationResult: PaymentValidationResult;
}

interface PaymentValidationResult {
  valid: boolean;
  errors?: string[];
  warnings?: string[];
}
```

## C# Implementation

### Controller Location
```csharp
// PayeeController found in:
legacy/legacy-apis/cbp.admin-cu-api/ConnectBillPay.AdminCuApi/Controllers/PayeeController.cs
```

### Available Endpoints
```csharp
// Global (FIS) Payee Management
POST   /api/v1/payee/global/close           - Close FIS global payee
POST   /api/v1/payee/global/change-history  - Get global payee history

// User Payee Management
POST   /api/v1/payee/copy-payees            - Copy member payees
POST   /api/v1/payee/user/change-history    - Get user payee history
POST   /api/v1/payee/user/account-number    - Update user payee account
```

### C# Types
```csharp
// Request/Response types in:
// - Requests.Payee.PayeeCloseGlobalRequest
// - Requests.Payee.CopyMemberPayeesRequest
// - Requests.Payee.UserPayeeChangeHistoryReportRequest
// - Requests.Payee.GlobalPayeeChangeHistoryReportRequest
// - Requests.Payee.UserPayeeUpdateAccountNumberRequest
// - Responses.Payee.UserPayeeChangeHistoryListResponse
// - Responses.Payee.GlobalPayeeChangeHistoryListResponse
```

## Implementation Gaps

1. User Payee Operations
   - C# lacks standard user payee CRUD endpoints
   - Missing user payee validation endpoint
   - Need to verify user payee listing capabilities

2. FIS Integration
   - TypeScript: Focuses on FIS payee lookup
   - C#: Focuses on FIS payee closure
   - Need to align on required FIS operations

3. History Tracking
   - C# provides comprehensive history tracking
   - TypeScript lacks history features
   - Consider adding history to TypeScript

## Questions for Team Discussion

1. User Payee Management
   - What CRUD operations are needed for user payees?
   - How to handle user payee validation?
   - Should we support bulk operations?

2. FIS Integration
   - What FIS operations are required?
   - How to handle FIS payee status changes?
   - Should we cache FIS payee data?

3. History Requirements
   - Should user payee history be exposed in TypeScript?
   - What history data is important?
   - How to handle history pagination?
