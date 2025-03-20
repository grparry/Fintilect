# API Type Alignment

## Example Endpoint Analysis

### GET /api/v1/payment/member/{memberId}
- **C# Controller**: `PaymentController.GetMemberPayments`
- **C# Response Type**: `List<MemberPayment>`
- **TypeScript Interface Needed**: `PaymentTransaction[]`

### POST /api/v1/payment/activity (Admin CU API)
- **C# Controller**: `PaymentController.GetPaymentActivity`
- **C# Request Type**: `PaymentActivityRequest`
- **C# Response Type**: Response containing payment activity
- **TypeScript Interface Needed**: TBD based on service layer usage

## Recommendation

1. First, identify which endpoints the service layer is actually using
2. For those endpoints:
   - Get the C# request/response types from the controllers
   - Compare with current TypeScript interfaces
   - Update TypeScript interfaces to match C# types
   - Document any gaps or inconsistencies for team discussion

## Next Steps

1. Review the service layer code to identify which endpoints are being used
2. Extract the C# types for those specific endpoints
3. Create TypeScript interfaces that match the C# types exactly
4. Document any breaking changes that might affect consumers

This approach ensures we:
- Only modify types we actually need
- Base changes on actual C# implementation
- Avoid making assumptions from potentially incorrect API specs
- Keep a clear record of the alignment process
