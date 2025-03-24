# Dashboard Service API Alignment

## Current TypeScript Implementation

### Base URL
```typescript
// From DashboardService.ts
api/v1/dashboard
```

### Endpoints Called
```typescript
// IDashboardService interface
GET    /metrics                    - Get all dashboard metrics
GET    /transactions/stats        - Get transaction statistics
GET    /users/activity           - Get user activity data
GET    /charts/transaction-volume - Get transaction volume chart data
GET    /charts/user-growth       - Get user growth chart data
GET    /charts/activity-breakdown - Get activity breakdown chart data
GET    /metrics/realtime         - Get real-time transaction metrics
GET    /health                   - Get system health metrics
GET    /metrics/trend            - Get trending metrics over time
GET    /insights/performance     - Get performance insights
POST   /export                   - Export dashboard data
SSE    /updates                  - Real-time metric updates via Server-Sent Events
```

### TypeScript Types Used
```typescript
interface DashboardMetrics {
  transactions: TransactionStats;
  userActivity: UserActivityData;
  charts: {
    transactionVolume: ChartData;
    userGrowth: ChartData;
    activityBreakdown: ChartData;
  };
}

interface TransactionStats {
  successful: number;
  failed: number;
  pending: number;
  total: number;
  volume: {
    daily: number;
    weekly: number;
    monthly: number;
  };
}

interface UserActivityData {
  activeUsers: number;
  newUsers: number;
  returningUsers: number;
  averageSessionDuration: number;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartDataPoint {
  date: string;
  value: number;
}

interface DashboardFilters {
  timeRange: TimeRange;
  category?: string;
  status?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}
```

## C# Implementation

### Controller Location
```csharp
// No dedicated DashboardController found in:
legacy/legacy-apis/cbp.admin-cu-api/ConnectBillPay.AdminCuApi/Controllers/
```

### Available Endpoints
```csharp
// No dashboard endpoints found
// Metrics might be scattered across different controllers or services
```

### C# Types
```csharp
// No corresponding C# types found
// Need to verify if these exist in other assemblies
```

## Gaps and Actions Needed

### Missing Endpoints
1. Core Dashboard Data
   - Dashboard metrics endpoint
   - Transaction statistics endpoint
   - User activity endpoint
   
2. Chart Data
   - Transaction volume charts
   - User growth charts
   - Activity breakdown charts
   
3. Real-time Features
   - Real-time metrics endpoint
   - Server-Sent Events support
   - System health monitoring

### Type Mismatches
1. Missing C# Models
   - Dashboard metrics models
   - Chart data models
   - Filter models
   - Real-time metric models

2. Potential Differences
   - Time range handling
   - Date format standardization
   - Metric calculation methods

### Suggested Changes

1. API Implementation
   - Create dedicated DashboardController
   - Implement all missing endpoints
   - Add real-time metrics support

2. Type Alignment
   - Create matching C# models
   - Ensure consistent metric calculations
   - Document data transformations

3. Performance Considerations
   - Implement caching for dashboard data
   - Add data aggregation strategies
   - Consider metrics storage solution

## Questions for Team Discussion

1. Data Sources
   - Where is metrics data currently stored?
   - How are metrics currently calculated?
   - What's the data retention policy?

2. Real-time Features
   - How to implement SSE in .NET?
   - What's the update frequency needed?
   - How to handle connection management?

3. Performance Requirements
   - Expected dashboard load times?
   - Acceptable data freshness?
   - Caching requirements?

4. Data Aggregation
   - Pre-aggregation vs real-time?
   - Historical data requirements?
   - Aggregation granularity needs?
