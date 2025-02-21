# bill-pay.types.ts

## 1. Name Mismatches
Fields that exist in both TypeScript and API but with different names:
- `effectiveDate` in TS vs `willProcessDate` or `processDate` in API
- `description` in TS vs `memo` in API
- `reference` in TS vs `billReference` in API

## 2. Enum Mismatches
Enums that exist but have different values or formats:

### PaymentMethod
TypeScript:
```typescript
enum PaymentMethod {
  ach = 'ach',
  check = 'check',
  card = 'card'
}
```
API uses: 'ACH' | 'CHECK' | 'CARD'

### PaymentStatus
TypeScript has additional statuses not in API:
- 'PENDING_APPROVAL'
- 'ON_HOLD'
- 'REJECTED'
- 'EXPIRED'

API only uses:
- 'PENDING'
- 'PROCESSING'
- 'COMPLETED'
- 'FAILED'
- 'CANCELLED'

## 3. Unsupported Fields
Fields in TypeScript that don't exist in API schemas:

### Simple Fields
- `clientName` (API only has clientId)
- `payeeName` (API only has payeeId, though payeeName exists in some response types)
- `priority` (Priority enum)
- `userPayeeListId` (though required in OneTimePaymentAddRequest)
- `memberId` (though required in OneTimePaymentAddRequest)

### Complex Objects
####   In bill-pay.types.ts:

#### In payment.types.ts:

##### API Schema has:
```typescript
// From ExceptionResponse in cbp-admin-api.json
interface Exception {
  id: string;
  payeeAttentionLine: string;
  payeeTelephoneNumber: string;
  payeeAddress1: string;
  payeeAddress2: string;
  payeeCity: string;
  payeeState: string;
  payeeZip: string;
  payeeCountry: string;
  payeeNickname: string;
  customerPayeeId: string;
  customerPayeeAccountNumber: string;
  confirmationNumber: string;
  transactionAmount: string;
  memoLineInfo: string;
  serviceRequestNumber: string;
}
```
## 3. `metadata`: Not present in API
   All metadata fields should be removed since they don't exist in the API contract:

   In payment.types.ts:
   ```typescript
   interface PaymentTransaction {
     metadata?: Record<string, unknown>;  // Not in API
   }

   interface PaymentReceipt {
     metadata?: Record<string, unknown>;  // Not in API
   }
   ```

   In bill-pay.types.ts:
   ```typescript
   interface Payment {
     metadata?: Record<string, any>;  // Not in API
   }

   interface PaymentTransaction {
     metadata?: {  // Not in API
       schedule?: PaymentSchedule;
     }
   }

   interface FISException {
     metadata?: Record<string, any>;  // Not in API
   }

   interface FISExceptionHistory {
     metadata?: Record<string, unknown>;  // Not in API
   }

   interface FISRefundRequest {
     metadata?: Record<string, unknown>;  // Not in API
   }

   interface ProcessorResponse {
     metadata?: Record<string, unknown>;  // Not in API
   }

  interface ProcessorWebhookEvent {
     metadata?: Record<string, unknown>;  // Not in API
   }
   ```

## Recommendations:
1. Add missing fields to API documentation if they are actually supported
2. Align complex object structures (fundingAccount, recipient) with API expectations
3. Standardize payment method and status enums between TypeScript and API
4. Document metadata structure expectations for each endpoint
5. Consider adding API schema validation to ensure TypeScript types match API contracts
