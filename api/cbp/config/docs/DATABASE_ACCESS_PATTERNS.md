# Database Access Patterns

This document outlines the standard database access patterns used throughout the CBP Config API. Following these patterns ensures consistent, reliable, and performant database operations.

## Connection Management

### Connection Pool
```typescript
// Using the global connection pool from mssql
import { ConnectionPool } from 'mssql';
import { config } from '../config/database';

const pool = new ConnectionPool(config);
```

- Default pool size: 10 connections
- Connection timeout: 30 seconds
- Idle timeout: 300 seconds
- Maximum retries: 3

### Best Practices
1. Always use the connection pool instead of creating new connections
2. Release connections back to the pool promptly
3. Use connection timeouts to prevent hanging operations
4. Monitor pool metrics for optimization

## Transaction Patterns

### Read Operations
```typescript
async function readOperation() {
  const pool = await getConnection();
  try {
    const result = await pool.request()
      .input('param', sql.VarChar, value)
      .query('SELECT * FROM Table WHERE column = @param');
    return result.recordset;
  } catch (error) {
    throw new DatabaseError('Read operation failed', error);
  }
}
```

### Write Operations
```typescript
async function writeOperation(data) {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);
  
  try {
    await transaction.begin();
    
    await transaction.request()
      .input('param', sql.VarChar, data.value)
      .query('INSERT INTO Table (column) VALUES (@param)');
      
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new DatabaseError('Write operation failed', error);
  }
}
```

### Batch Operations
```typescript
async function batchOperation(items) {
  const pool = await getConnection();
  const transaction = new sql.Transaction(pool);
  
  try {
    await transaction.begin();
    
    for (const item of items) {
      await transaction.request()
        .input('param', sql.VarChar, item.value)
        .query('INSERT INTO Table (column) VALUES (@param)');
    }
    
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new DatabaseError('Batch operation failed', error);
  }
}
```

## Error Handling

### Error Categories
1. Connection Errors
2. Query Errors
3. Transaction Errors
4. Timeout Errors
5. Constraint Violations

### Error Handling Pattern
```typescript
try {
  // Database operation
} catch (error) {
  if (error instanceof sql.RequestError) {
    // Handle query-specific errors
  } else if (error.code === 'ETIMEOUT') {
    // Handle timeout errors
  } else if (error.number === 2627) {
    // Handle unique constraint violations
  } else {
    // Handle unexpected errors
  }
}
```

## Query Optimization

### Indexing Strategy
- Primary keys: Clustered indexes
- Foreign keys: Non-clustered indexes
- Frequently queried columns: Non-clustered indexes
- Full-text search columns: Full-text indexes

### Query Best Practices
1. Use parameterized queries to prevent SQL injection
2. Avoid SELECT * in production code
3. Use appropriate WHERE clauses
4. Implement paging for large result sets
5. Use covering indexes where possible

### Example Optimized Query
```typescript
async function getPagedResults(page: number, pageSize: number) {
  const offset = (page - 1) * pageSize;
  
  const result = await pool.request()
    .input('offset', sql.Int, offset)
    .input('pageSize', sql.Int, pageSize)
    .query(`
      SELECT Id, Name, Status
      FROM Table
      ORDER BY Id
      OFFSET @offset ROWS
      FETCH NEXT @pageSize ROWS ONLY
    `);
    
  return result.recordset;
}
```

## Caching Strategy

### Cache Levels
1. Application-level cache (Redis)
2. Query-level cache (Stored procedures)
3. Database-level cache (SQL Server)

### Caching Pattern
```typescript
async function getCachedData(key: string) {
  // Check Redis cache first
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);
  
  // If not in cache, get from database
  const data = await readFromDatabase();
  
  // Cache the result
  await redis.set(key, JSON.stringify(data), 'EX', 3600);
  
  return data;
}
```

## Monitoring and Logging

### Key Metrics
1. Query execution time
2. Connection pool utilization
3. Transaction duration
4. Cache hit/miss ratio
5. Error rates

### Logging Pattern
```typescript
async function monitoredOperation() {
  const startTime = process.hrtime();
  
  try {
    const result = await databaseOperation();
    
    const [seconds, nanoseconds] = process.hrtime(startTime);
    logger.info('Operation completed', {
      duration: seconds * 1000 + nanoseconds / 1000000,
      operation: 'databaseOperation',
      success: true
    });
    
    return result;
  } catch (error) {
    logger.error('Operation failed', {
      error: error.message,
      operation: 'databaseOperation',
      success: false
    });
    throw error;
  }
}
```

## Security Considerations

### Data Access Control
1. Use least privilege principle for database users
2. Implement row-level security where needed
3. Encrypt sensitive data at rest
4. Mask sensitive data in logs

### Example Security Pattern
```typescript
async function getSecureData(userId: string) {
  const pool = await getConnection();
  
  return pool.request()
    .input('userId', sql.VarChar, userId)
    .query(`
      SELECT 
        Id,
        Name,
        CASE WHEN @userId IN (SELECT UserId FROM Admins)
          THEN SSN 
          ELSE 'XXX-XX-' + RIGHT(SSN, 4)
        END as SSN
      FROM SecureTable
      WHERE UserId = @userId
    `);
}
```

## Maintenance Operations

### Health Checks
1. Connection pool health
2. Database connectivity
3. Query performance
4. Cache availability

### Example Health Check
```typescript
async function checkDatabaseHealth() {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query('SELECT 1 as health');
    
    return {
      status: 'healthy',
      latency: result.duration
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message
    };
  }
}
```
