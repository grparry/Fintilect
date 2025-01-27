# Reports API Migration

## Status: In Progress
Priority: Medium
Last Updated: 2024-12-28

## Current Mock Implementation

### Endpoints
```typescript
// Need to verify current implementations in:
// - src/services/report.service.ts
```

### Mock Types
```typescript
interface ReportRequest {
  // To be documented from current implementation
}
```

## Target API Specification

### Available Endpoints
```typescript
POST /api/v1/report/run
```

### Required Types
```typescript
interface ReportRunRequest {
  // To be documented from API spec
}

interface UserPayeeChangeHistoryReportRequest {
  startDate: string;
  // Additional fields from API spec
}

interface ScheduledPaymentChangeHistoryReportRequest {
  // To be documented from API spec
}
```

## Discrepancies
1. Report Types
   - API provides specific report types
   - Need to verify against current report generation

2. Report Parameters
   - API may have different parameter requirements
   - Need to map current report parameters

3. Report Formats
   - Need to verify report format compatibility
   - May need format conversion handlers

## Migration Steps
- [ ] Document current report generation
- [ ] Map all report-related endpoints
- [ ] Create type definitions matching API spec
- [ ] Implement service layer changes
- [ ] Update report generation components
- [ ] Create/update MSW handlers
- [ ] Implement tests

## Affected Components
1. Report Generation
   - Report configuration UI
   - Report display components
   - Report download handlers

2. History Reports
   - Payment history reports
   - User payee history reports
   - Change history displays

## Testing Requirements
- [ ] Test report generation
- [ ] Verify report parameters
- [ ] Test report formats
- [ ] Validate error handling
- [ ] Test large report handling

## Dependencies
- Report generation services
- History tracking components
- Data export modules

## Notes
- Consider implementing report caching
- Document report size limits
- Consider async report generation
- May need progress tracking
- Document export formats
