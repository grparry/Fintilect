# API Endpoint Mapping

## Payment Operations
- `GET /api/payments` - List payments (PAYMENT_HISTORY)
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments` - Create new payment
- `PUT /api/payments/:id` - Update payment
- `DELETE /api/payments/:id` - Cancel payment
- `GET /api/payments/status/:id` - Get payment status
- `GET /api/payments/clear` - List cleared payments (PAYMENT_CLEAR)

## Payee Management
- `GET /api/payees` - List payees (PAYEE)
- `GET /api/payees/:id` - Get payee details
- `POST /api/payees` - Add new payee
- `PUT /api/payees/:id` - Update payee
- `DELETE /api/payees/:id` - Remove payee
- `GET /api/payees/user/:userId` - List user's payees (USER_PAYEE)

## User Configuration
- `GET /api/users/:id/payee-options` - Get user's payee options (UserPayeeOptions)
- `PUT /api/users/:id/payee-options` - Update user's payee options
- `GET /api/users/:id/host-info` - Get user's host info (HOSTMEMBERACCTINFO)

## System Operations
- `GET /api/system/calendar` - Get calendar dates (CALENDAR)
- `GET /api/system/holidays` - List holidays (HOLIDAYS)
- `GET /api/system/status` - Get generator status (GENERATORSTATUS)
- `GET /api/system/errors` - List error recap (ERRORRECAP)

## Tracking and History
- `GET /api/tracking/changes` - List change history (CHANGE_HISTORY)
- `GET /api/tracking/onus` - List on-us payments (ONUSPAYMENTS)
- `GET /api/tracking/courtesy` - List courtesy payments (COURTESY_PAY)

## Host Connection
- `GET /api/host/connection` - Get host connection info (HOSTCONNECTION)
- `PUT /api/host/connection` - Update host connection

## Utility Endpoints
- `GET /api/delivery-dates` - Get delivery dates (DELIVERYDATE)
- `GET /api/nsf-fees` - Get NSF fees (NSFFees)
- `GET /api/saved-emails` - List saved emails (SAVED_EMAILS)

Last Updated: 2025-01-04 11:17:28 MST

Notes:
- All endpoints follow RESTful conventions
- Authentication and authorization will be required for all endpoints
- Response formats will be standardized JSON
- Pagination will be implemented for list endpoints
- Filtering and sorting options will be available for list endpoints
- All endpoints will include appropriate error handling
- Documentation will be available via OpenAPI/Swagger
