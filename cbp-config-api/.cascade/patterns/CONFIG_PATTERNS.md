# CBP Config API Patterns

## Technology Stack Patterns

### Database Access
- Use SQL Server stored procedures for complex data operations
- Implement connection pooling using mssql package
- Utilize SQL Server-specific features where available and non-disruptive
- Follow SQL Server transaction management best practices
- Respect existing database schema and security configurations

## Domain-Specific Patterns

### Payment Processing
- Use PaymentProcessor service for all payment state transitions
- Implement idempotency for payment submissions
- Track all status changes in CHANGE_HISTORY using existing audit mechanisms
- Use SQL Server transactions for atomic payment operations

### Error Handling
- Use standardized error codes from GENERATORSTATUSCODES
- Log detailed errors in ERRORRECAP
- Implement retry logic for host system communication
- Utilize SQL Server error handling and TRY/CATCH blocks

### Data Access
- Use repository pattern with existing stored procedures
- Implement soft deletes using existing mechanisms
- Cache frequently accessed reference data at application level
- Use appropriate batch operations within existing constraints

### Query Optimization
- Work within existing indexing strategy
- Use SQL Server query hints only where necessary and safe
- Monitor query performance without modifying server settings
- Follow existing transaction isolation patterns

## Security Patterns
- Implement security at application level where database-level controls aren't available
- Use parameterized queries for all database operations
- Implement data masking in application layer
- Log sensitive operations at application level
- Follow existing database access patterns

## Performance Patterns
- Use asynchronous operations with proper connection management
- Implement proper batching for bulk operations
- Use efficient pagination with existing table structures
- Cache appropriate data at application level

## Integration Patterns
- Respect existing database triggers and constraints
- Maintain compatibility with other applications sharing the database
- Document and communicate any required schema changes
- Implement changes that don't impact other systems

Last Updated: 2025-01-04 11:36:26 MST