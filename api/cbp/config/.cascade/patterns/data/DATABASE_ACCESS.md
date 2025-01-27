# Database Access Patterns

## Database Interface Selection
### Production Interface
```typescript
interface Database {
  executeProc<T>(procName: string, params?: any): Promise<sql.IProcedureResult<T>>;
  executeProcWithTransaction<T>(procName: string, params?: any): Promise<sql.IProcedureResult<T>>;
  executeStoredProcedure<T>(procName: string, params?: any): Promise<sql.IProcedureResult<T>>;
  executeQuery<T>(query: string, params?: any): Promise<sql.IResult<T>>;
  beginTransaction(): Promise<void>;
  commitTransaction(): Promise<void>;
  rollbackTransaction(): Promise<void>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  close(): Promise<void>;
}
```

**When to Use**:
- In production code
- When full SQL Server functionality is needed
- For complex transactions
- When using stored procedures

### Test Interface
```typescript
interface TestDatabase extends Database {
  setMockResponse(procName: string, handler: (params: any) => any): void;
  clearMockResponses(): void;
}
```

**When to Use**:
- In test files
- For mocking database responses
- When testing error scenarios
- For integration tests

## Implementation Guidelines
### Production Code
- Always use the main Database interface
- Leverage stored procedures for complex operations
- Implement proper error handling
- Use transactions appropriately

### Test Code
- Use TestDatabase for better control
- Mock specific procedure responses
- Test error scenarios
- Verify procedure parameters

## Usage Patterns
### Repository Pattern
```typescript
class Repository<T> {
  constructor(private db: Database) {}
  
  // Production methods using Database interface
  async create(entity: T): Promise<T> {
    return this.db.executeProc<T>('sp_Create', entity);
  }
  
  // Additional methods...
}
```

### Test Pattern
```typescript
describe('Repository', () => {
  let testDb: TestDatabase;
  
  beforeEach(() => {
    testDb = new TestDatabase();
    testDb.setMockResponse('sp_Create', async (params) => ({
      recordset: [params],
      recordsets: [[params]],
      rowsAffected: [1],
      output: {},
      returnValue: 0
    }));
  });
});
```

## Common Pitfalls
### Production Interface
- Don't use raw queries when stored procedures exist
- Don't forget to handle transactions
- Don't ignore connection management
- Don't mix transaction contexts

### Test Interface
- Don't use production Database in tests
- Don't forget to clear mock responses
- Don't ignore procedure parameters
- Don't skip error scenarios

## Best Practices
### Connection Management
- Use connection pooling
- Close connections properly
- Handle connection failures
- Monitor connection usage

### Transaction Management
- Use explicit transactions
- Handle rollbacks properly
- Consider isolation levels
- Monitor transaction duration

### Error Handling
- Catch SQL Server errors
- Map to domain errors
- Log database errors
- Handle deadlocks

### Testing
- Mock all database calls
- Test transaction rollbacks
- Verify procedure calls
- Test connection failures

Last Updated: 2025-01-09 12:34:52 MST
