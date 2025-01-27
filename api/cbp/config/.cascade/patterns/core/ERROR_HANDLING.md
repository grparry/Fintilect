# Error Handling Patterns

## Base Error Pattern
```typescript
interface ErrorHandler<T extends Error> {
  canHandle(error: Error): boolean;
  handle(error: T): Promise<ErrorResult>;
  escalate(error: T): Promise<void>;
}
```

### Implementation Guidelines
- Implement specific handlers for known error types
- Use chain of responsibility for multiple handlers
- Log all error occurrences
- Maintain error context

## HTTP Error Pattern
```typescript
interface HttpErrorMapper {
  mapToHttpError(error: Error): HttpError;
  getStatusCode(error: Error): number;
  enrichErrorResponse(error: Error): ErrorResponse;
}
```

### Implementation Guidelines
- Map domain errors to HTTP status codes
- Include appropriate error details
- Sanitize sensitive information
- Support i18n for error messages

## Validation Error Pattern
```typescript
interface ValidationErrorHandler {
  collectErrors(errors: ValidationError[]): ErrorSummary;
  formatErrors(summary: ErrorSummary): ValidationResponse;
  handleValidationFailure(response: ValidationResponse): void;
}
```

### Implementation Guidelines
- Aggregate multiple validation errors
- Provide clear error messages
- Include field references
- Support client-side validation

## Recovery Pattern
```typescript
interface ErrorRecovery {
  shouldAttemptRecovery(error: Error): boolean;
  getRecoveryStrategy(error: Error): RecoveryStrategy;
  executeRecovery(strategy: RecoveryStrategy): Promise<void>;
}
```

### Implementation Guidelines
- Define recovery strategies per error type
- Implement retry with backoff
- Track recovery attempts
- Handle recovery failures

## Circuit Breaker Pattern
```typescript
interface CircuitBreaker {
  isOpen(): boolean;
  recordFailure(error: Error): void;
  recordSuccess(): void;
  attemptReset(): boolean;
}
```

### Implementation Guidelines
- Track failure thresholds
- Implement half-open state
- Reset after success
- Configure timeouts

Last Updated: 2025-01-09 12:32:55 MST
