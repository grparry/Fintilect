# CBP Config API Context

## Technology Stack
- Node.js with TypeScript
- Microsoft SQL Server (Required Database Platform)
- Express.js Framework

## Business Rules

### Payment Processing
- All payment amounts must be stored in cents (multiply by 100 when storing)
- Payment status transitions must follow the defined state machine
- Cancelled payments must maintain audit trail in CHANGE_HISTORY
- NSF handling requires special status codes and fee processing

### User Authorization
- Users can only access their own payees and payments
- Admin users can access all records with proper audit logging
- Host system credentials must be validated before any transaction

### Data Validation
- Account numbers must be masked in logs and responses
- PayeeID and PayeeListID must maintain referential integrity
- Status codes must match the predefined list in GENERATORSTATUSCODES

### Database Requirements
- All database operations must use SQL Server stored procedures where possible
- Utilize SQL Server-specific features for performance optimization
- Implement proper transaction management using SQL Server transaction isolation levels
- Use SQL Server's built-in encryption for sensitive data
- Leverage SQL Server's temporal tables for audit history where appropriate

## Integration Points
- Host system communication via HOSTCONNECTION parameters
- Payment clearing system integration for ONUSPAYMENTS
- Courtesy pay system for overdraft protection

## Performance Requirements
- Batch operations must be paginated (max 1000 records)
- Payment history queries must use appropriate indexes
- Long-running operations must be async with status tracking
- Utilize SQL Server query optimization features

Last Updated: 2025-01-04 11:33:11 MST