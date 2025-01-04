---
type: database_analysis
project: cbp.api
created_date: 2025-01-02T21:08:13-07:00
status: in_progress
references:
  - entity_relationships.md
  - persistence_patterns.md
---

# CBP API Database Analysis

## Overview

This document analyzes the SQL Server database interactions within the CBP API, focusing on tables, schemas, and query patterns.

## Database Structure

### Core Tables

Based on the API specification, the following core tables are inferred:

1. **Global Payees**
   ```sql
   CREATE TABLE GlobalPayees (
       PayeeId INT PRIMARY KEY,
       PayeeName NVARCHAR(100),
       PayeeStatus NVARCHAR(20),
       Address1 NVARCHAR(100),
       Address2 NVARCHAR(100),
       City NVARCHAR(50),
       State NVARCHAR(2),
       Zip NVARCHAR(10),
       CreatedDate DATETIME,
       ModifiedDate DATETIME,
       -- Additional fields based on GlobalPayeeResponse schema
   )
   ```

2. **User Payees**
   ```sql
   CREATE TABLE UserPayees (
       UserPayeeId INT PRIMARY KEY,
       UserId INT,
       GlobalPayeeId INT,
       PayeeNickname NVARCHAR(100),
       PayeeStatus NVARCHAR(20),
       CreatedDate DATETIME,
       ModifiedDate DATETIME,
       FOREIGN KEY (GlobalPayeeId) REFERENCES GlobalPayees(PayeeId)
       -- Additional fields based on UserPayeeResponse schema
   )
   ```

3. **Payments**
   ```sql
   CREATE TABLE Payments (
       PaymentId INT PRIMARY KEY,
       UserId INT,
       UserPayeeId INT,
       Amount DECIMAL(19,4),
       PaymentType NVARCHAR(20),
       PaymentStatus NVARCHAR(20),
       ScheduledDate DATETIME,
       ProcessedDate DATETIME,
       CreatedDate DATETIME,
       ModifiedDate DATETIME,
       FOREIGN KEY (UserPayeeId) REFERENCES UserPayees(UserPayeeId)
       -- Additional fields based on PaymentResponse schema
   )
   ```

4. **RecurringPayments**
   ```sql
   CREATE TABLE RecurringPayments (
       RecurringPaymentId INT PRIMARY KEY,
       UserId INT,
       UserPayeeId INT,
       Amount DECIMAL(19,4),
       Frequency NVARCHAR(20),
       StartDate DATETIME,
       EndDate DATETIME,
       NextPaymentDate DATETIME,
       Status NVARCHAR(20),
       CreatedDate DATETIME,
       ModifiedDate DATETIME,
       FOREIGN KEY (UserPayeeId) REFERENCES UserPayees(UserPayeeId)
       -- Additional fields based on RecurringPaymentAddRequest schema
   )
   ```

### Query Patterns

From the API endpoints, we can identify these key SQL query patterns:

1. **Payee Search Queries**
   ```sql
   -- Search by partial name
   SELECT * FROM GlobalPayees 
   WHERE PayeeName LIKE @partialName + '%'
   
   -- Search by zip
   SELECT * FROM GlobalPayees 
   WHERE Zip LIKE @partialZip + '%'
   
   -- Combined search
   SELECT * FROM GlobalPayees 
   WHERE PayeeName LIKE @partialName + '%'
   AND Zip LIKE @partialZip + '%'
   ```

2. **Payment Queries**
   ```sql
   -- Get user's payments
   SELECT p.*, up.PayeeNickname, gp.PayeeName
   FROM Payments p
   JOIN UserPayees up ON p.UserPayeeId = up.UserPayeeId
   JOIN GlobalPayees gp ON up.GlobalPayeeId = gp.PayeeId
   WHERE p.UserId = @userId
   
   -- Get recurring payments
   SELECT * FROM RecurringPayments
   WHERE UserId = @userId
   AND Status = 'Active'
   ```

### Database Operations

#### Read Operations
1. **Global Payee Lookups**
   - Frequent searches by name and zip
   - Need for efficient indexing on PayeeName and Zip columns
   - Potential for caching frequently accessed payees

2. **User Payee Queries**
   - User-specific payee lists
   - Join operations with GlobalPayees
   - Payment history per payee

#### Write Operations
1. **Payment Processing**
   - Transaction handling for payment status updates
   - Batch processing for recurring payments
   - Audit trail requirements

2. **Payee Management**
   - CRUD operations for user payees
   - Updates to global payee information
   - Status changes and validation

### Performance Considerations

1. **Indexing Strategy**
   ```sql
   -- Required indexes
   CREATE INDEX IX_GlobalPayees_Name ON GlobalPayees(PayeeName)
   CREATE INDEX IX_GlobalPayees_Zip ON GlobalPayees(Zip)
   CREATE INDEX IX_UserPayees_User ON UserPayees(UserId)
   CREATE INDEX IX_Payments_User ON Payments(UserId)
   CREATE INDEX IX_Payments_Status ON Payments(PaymentStatus)
   ```

2. **Query Optimization**
   - Use of covering indexes for search queries
   - Efficient pagination for large result sets
   - Proper parameter sniffing handling

### Data Access Patterns

1. **Read Patterns**
   - Heavy read operations on GlobalPayees
   - User-specific filtered queries
   - Point lookups by IDs
   - Range queries for payment history

2. **Write Patterns**
   - Transactional payment processing
   - Batch updates for recurring payments
   - Audit logging requirements

### Security Considerations

1. **Data Access Control**
   ```sql
   -- Example role-based access
   CREATE ROLE PaymentProcessor
   GRANT SELECT, UPDATE ON Payments TO PaymentProcessor
   GRANT SELECT ON GlobalPayees TO PaymentProcessor
   ```

2. **Data Protection**
   - Encryption for sensitive data
   - Audit logging for changes
   - Access control at row level

### Integration Points

1. **External Systems**
   - Payment processor integration
   - Account verification services
   - Notification systems

2. **Internal Systems**
   - Caching layer
   - Message queue
   - Audit logging

## References

- API Specification: `api.json`
- Entity Relationships: See `entity_relationships.md`
- Persistence Patterns: See `persistence_patterns.md`
