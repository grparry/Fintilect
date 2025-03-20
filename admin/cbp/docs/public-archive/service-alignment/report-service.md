# Report Service API Alignment

## C# Implementation (Source of Truth)

### Controller Location
```csharp
// ReportController found in:
legacy/legacy-apis/cbp.admin-cu-api/ConnectBillPay.AdminCuApi/Controllers/ReportController.cs
```

### Available Endpoints
```csharp
// Report Execution
POST   /api/v1/report/run                 - Run report with arguments
```

### C# Types
```csharp
// Request/Response types in:
// - Requests.Report.ReportRunRequest
```

## TypeScript Implementation Requirements

### Required Types
```typescript
interface ReportRunRequest {
    name: string;
    arguments: Record<string, any>;
}

interface ReportResponse<T> {
    jsonResponse: T;
}
```

### Required Service Methods
```typescript
interface IReportService {
    /**
     * Run a report with specified arguments
     * @param request Report request parameters
     * @returns Report data
     */
    runReport(request: ReportRunRequest): Promise<ReportResponse<any>>;
}
```

## Implementation Notes

1. API Structure
   - Follow C# endpoint structure exactly
   - Use POST for report execution
   - Maintain consistent request/response patterns

2. Type Alignment
   - TypeScript types must match C# models
   - Follow C# property names and types
   - Ensure consistent validation rules

3. Service Layer
   - Implement C# endpoints in TypeScript
   - Match C# functionality exactly
   - No additional endpoints or features

4. Report Execution
   - Reports are executed via stored procedures
   - Arguments are passed as key-value pairs
   - Response is dynamic JSON data
