# CSharp API Gaps

This document tracks possible gaps between the new admin interface requirements and the CSharp API capabilities. These gaps represent features or data fields that are needed in the new admin interface but are not currently supported by the CSharp API.

## Payment Information

### API Capabilities Across Different Services

✅ Available in Core CBP API (`cbp.api`):
- Payment cancellation endpoints (one-time and recurring)
- Payment reprocessing endpoint
- Payment status and confirmation endpoints
- Funding account field (required in payment requests)
- Payment history and lookup endpoints

✅ Available in Admin CU API (`cbp.admin-cu-api`):
- Payment activity tracking (`/api/v1/payment/activity`)
- Payment change history for scheduled and recurring payments
- Pending payment lookup with batch information
- Generic reporting capabilities through `/api/v1/report/run`

❌ Still Missing Across All APIs:
- Payment Update/Edit endpoint for modifying pending payment details
- Endpoints for looking up available funding accounts for a member
- Some specific analytics capabilities:
  - Enrollment statistics
  - Active user counts
  - Payment amount/count totals with year/month/day breakdowns

### Missing Payment Fields
The following fields are required for the new admin interface but are not available in any API:

- `recurring`: Additional recurring payment information needed:
  - `paymentsProcessed`: Number of processed payments
  - `nextProcessDate`: Next scheduled processing date

### Recommended Next Steps
1. Investigate if the generic `/api/v1/report/run` endpoint in admin-cu-api can provide the missing analytics
2. Consider exposing core CBP API payment operations through the admin API
3. Add new endpoints for:
   - Payment editing
   - Funding account lookup
   - Any analytics not covered by existing reporting capabilities

## Credit Union Information

### Sponsor Details Management
✅ Available:
- Sponsor ID (sponsorId)
- Sponsor Name (sponsorName)

❌ Missing:
- Sponsor Prefix

### Settlement Information
✅ Available:
- Routing Number (routingId)

❌ Missing:
- Settlement GL Code
- Settlement External ACH Number
- Clear definition of wrgAccountNumber purpose and relationship to settlement

### Operating Hours Configuration
❌ Missing:
- Primary business hours
- After hours contact information

### Staff Contact Information
❌ Missing:
- Staff contact list with roles
- Role-based contact management

## Next Steps
1. Evaluate the impact of these gaps on the new admin interface functionality
2. Determine if CSharp API extensions are needed
3. Consider temporary workarounds or alternative solutions where API updates are not feasible
4. Document any decisions made regarding these gaps

Last Updated: 2025-02-20
