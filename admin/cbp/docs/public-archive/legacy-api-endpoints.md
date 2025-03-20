# Legacy C# API Endpoints

## CBP API (Customer-Facing)

### Payment Endpoints
- POST `/api/v1/payment/one-time` - Add a new one-time payment
- POST `/api/v1/payment/recurring` - Add a new recurring payment
- GET `/api/v1/payment/member/{memberId}` - Get member's payments (returns `List<MemberPayment>`)
- GET `/api/v1/payment/member-recurring/{memberId}` - Get member's recurring payments (returns `List<MemberPayment>`)
- GET `/api/v1/payment/member-recurring-date/{memberId}/{endDate}` - Get member's recurring payments to date
- GET `/api/v1/payment/last-payments/{memberId}` - Get member's last payments
- DELETE `/api/v1/payment/one-time/{paymentId}/member/{memberId}` - Delete one-time payment
- DELETE `/api/v1/payment/recurring/{paymentId}/member/{memberId}` - Delete recurring payment
- PUT `/api/v1/payment/{paymentId}` - Edit payment
- POST `/api/v1/payment/reprocess` - Reprocess a payment
- POST `/api/v1/payment/status` - Update payment status
- POST `/api/v1/payment/confirmation` - Send payment confirmation

### Payment History Endpoints
- GET `/api/v1/payment-history/member/{memberId}/fromDate/{fromDate}` - Get payment history from date
- GET `/api/v1/payment-history/member/{memberId}/payee/{payeeId}` - Get payee payment history
- GET `/api/v1/payment-history/member/{memberId}/payment/{paymentId}` - Get specific payment history

### Payee Endpoints
- POST `/api/v1/payee` - Add a new payee
- POST `/api/v1/payee/global/close` - Close global payee
- DELETE `/api/v1/payee/user-payee/{userPayeeListId}/member/{memberId}` - Delete user payee
- GET `/api/v1/payee/global-payee/name/{partialName}` - Search global payees by name
- GET `/api/v1/payee/global-payee/{internalPayeeId}` - Get global payee by ID
- GET `/api/v1/payee/user-payee/{payeeId}/member/{memberId}` - Get user's payee info
- POST `/api/v1/payee/user/account-number` - Update user payee account number

### Calendar Endpoints
- GET `/api/v1/calendar/delivery-date/{beginDate}` - Get delivery dates from begin date
- GET `/api/v1/calendar/delivery-date/{beginDate}/{count}` - Get delivery dates with count
- GET `/api/v1/calendar/holiday/date/{date}` - Check if date is holiday
- GET `/api/v1/calendar/non-processing` - Get non-processing dates for next 2 years

### Configuration Endpoints
- GET `/api/v1/configuration/{id}` - Get configuration by ID
- GET `/api/v1/configuration/all` - Get all configurations
- POST `/api/v1/configuration` - Create configuration
- PUT `/api/v1/configuration` - Update configuration

### Exception Endpoints
- POST `/api/v1/exception/send-customer-notification` - Send customer notification
- POST `/api/v1/exception/send-notification` - Send notification by status code
- POST `/api/v1/exception/refund` - Refund payment

## CBP Admin API

### Support Notification Endpoints
- POST `/api/v1/supportnotification` - Create support notification
- PUT `/api/v1/supportnotification` - Update support notification
- GET `/api/v1/supportnotification/{id}` - Get support notification
- GET `/api/v1/supportnotification/all` - Get all support notifications

### Credit Union Endpoints
- GET `/api/v1/creditunion/{sponsorId}` - Get credit union by sponsor ID
- GET `/api/v1/creditunion/all` - Get all credit unions
- POST `/api/v1/creditunion` - Add new credit union
- PUT `/api/v1/creditunion` - Edit credit union
- DELETE `/api/v1/creditunion/{sponsorId}` - Delete credit union

### Payee Management
- POST `/api/v1/payee/fis-payee` - Get global payee from FIS

## CBP Admin CU API

### Payment Management
- POST `/api/v1/payment/change-history` - Get scheduled payment change history
- POST `/api/v1/payment/recurring/change-history` - Get recurring payment change history
- POST `/api/v1/payment/pending` - Get pending payments
- POST `/api/v1/payment/pending-payments` - Search pending payments
- POST `/api/v1/payment/activity` - Get payment activity
- POST `/api/v1/payment/reprocess` - Queue payment for reprocessing
- POST `/api/v1/payment/confirmation` - Send payment confirmation notification
- POST `/api/v1/payment/status` - Update payment status
- GET `/api/v1/payment/{paymentId}` - Get payment details
- POST `/api/v1/payment/cancel-payment-refund` - Cancel and refund payment

### Exception Handling
- POST `/api/v1/exception/refund` - Refund a payment

### Report Generation
- POST `/api/v1/report/run` - Run payment reports

Note: All endpoints return appropriate HTTP status codes (200, 201, 400, 404, 409, 500) based on the operation result.
