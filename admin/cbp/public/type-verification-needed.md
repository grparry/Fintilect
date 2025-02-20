# Type Verification Needed

This document lists types, enums, and interfaces in our frontend codebase (`bill-pay.types.ts`) that need verification as they don't appear in our three main API specs:
- `cbp-api.json`
- `cbp-admin-api.json`
- `cbp-admin-cu-api.json`

## Payment Status Verification

### PaymentStatus Enum
The following payment statuses need verification as they don't appear in any API spec:

```typescript
export enum PaymentStatus {
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',  // Not found in APIs
  CHARGEBACK = 'CHARGEBACK',                  // Not found in APIs
  DRAFT = 'DRAFT',                            // Not found in APIs
  SUBMITTED = 'SUBMITTED',                     // Not found in APIs
  SUSPENDED = 'SUSPENDED',                     // Not found in APIs
  STOP_PAYMENT = 'STOP_PAYMENT',              // Not found in APIs
  VOID = 'VOID',                              // Not found in APIs
  HOLD = 'HOLD'                               // Not found in APIs
}
```

Questions for Backend Team:
1. Are these statuses handled internally by the frontend?
2. Are they mapped from different status codes in the API?
3. Should they be removed if unused?

## Payment Methods Verification

### PaymentMethod Enum
The following payment methods need verification:

```typescript
export enum PaymentMethod {
  WIRE = 'wire',  // Not found in APIs
  RTP = 'rtp'     // Not found in APIs
}
```

Questions for Backend Team:
1. Are these payment methods supported but not documented?
2. Are they planned for future implementation?

## Payment Confirmation Types

The following confirmation-related types don't exist in any API spec:

```typescript
export enum ConfirmationMethod {
  MANUAL = 'manual',
  OTP = 'otp',
  EMAIL = 'email',
  SMS = 'sms'
}

export enum ConfirmationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  FAILED = 'failed',
  EXPIRED = 'expired'
}

export interface PaymentConfirmationRequest {
  paymentId: string;
  method: PaymentMethod;
  confirmationMethod: ConfirmationMethod;
  code?: string;
  notes?: string;
  userId?: string;
}

export interface PaymentConfirmationResponse {
  success: boolean;
  confirmationStatus: ConfirmationStatus;
  message: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: string;
}
```

Questions for Backend Team:
1. Is payment confirmation handled through a different API?
2. Are these types used for frontend-only state management?

## Exception Handling Types

### FISExceptionStatus
The following exception statuses need verification:

```typescript
export enum FISExceptionStatus {
  PENDING_REVERSAL = 'PENDING_REVERSAL',
  PENDING_REFUND = 'PENDING_REFUND',
  PENDING_RETURN = 'PENDING_RETURN',
  PENDING_STOP_PAYMENT = 'PENDING_STOP_PAYMENT',
  PENDING_RESEND = 'PENDING_RESEND',
  PENDING_REINITIATE = 'PENDING_REINITIATE'
}
```

### FISErrorCode
These error codes need verification:

```typescript
export enum FISErrorCode {
  INVALID_ACCOUNT = 'INVALID_ACCOUNT',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  ACCOUNT_CLOSED = 'ACCOUNT_CLOSED',
  TECHNICAL_ERROR = 'TECHNICAL_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR'
}
```

Questions for Backend Team:
1. Are these statuses/codes from a different FIS-specific API?
2. Should they be mapped to different values from the API?

## Payee Conversion Feature

The entire payee conversion feature appears to be missing from API specs:

```typescript
export enum PayeeConversionStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED'
}

export interface PayeeConversionSummary {
  totalPayees: number;
  successfullyConverted: number;
  failed: number;
  conversionDate: string;
  conversionId: string;
}

// Additional interfaces include:
// - PayeeConversionFilters
// - PayeeConversionFile
// - PayeeConversionValidation
// - PayeeConversionFileUploadResponse
// - PayeeConversionProgressResponse
// - PayeeConversionProgress
// - PayeeConversionRecord
// - PayeeConversionTemplate
```

Questions for Backend Team:
1. Is payee conversion handled through a different API?
2. Are these types used for a feature that's no longer active?

## Holiday Management

Holiday-related types don't appear in API specs:

```typescript
export enum HolidayType {
  FEDERAL = 'FEDERAL',
  STATE = 'STATE',
  BANK = 'BANK'
}

export interface Holiday {
  id: number;
  name: string;
  date: string;
  type: HolidayType;
  description?: string;
  status: HolidayStatus;
  createdAt?: string;
  updatedAt?: string;
}
```

Questions for Backend Team:
1. Is holiday management handled through a different API?
2. Should these types be removed if the feature isn't used?

## Bill Pay Configuration

The following configuration types need verification:

```typescript
export interface BillPayConfig {
  id: string;
  cutoffTime: string;
  maxDailyLimit: number;
  maxTransactionLimit: number;
  allowWeekendProcessing: boolean;
  requireDualApproval: boolean;
  retryAttempts: number;
  notificationEmail: string;
  enableEmailNotifications: boolean;
  // ... additional fields
}
```

Questions for Backend Team:
1. Are these configuration options handled through a different API?
2. Should some fields be removed if they're not used?

## Next Steps

1. Review this document with the backend team
2. For each type:
   - Confirm if it's still needed
   - Verify correct values/mappings
   - Document source API if different
   - Remove if unused
3. Update `bill-pay.types.ts` based on findings
4. Consider creating API-specific type files to better track type origins
