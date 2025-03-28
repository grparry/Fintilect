# CBP Admin Paged Reports Implementation Plan

## Paged Reports Implementation Plan

This document outlines the implementation plan for all paged reports in the CBP Admin application. Each report follows a consistent pattern for implementation.

### Types Section

All report types should follow these conventions:
- Use camelCase for property names in interfaces (Axios converts Pascal Case from API)
- Use uppercase "ID" suffix for all identifier fields (e.g., `memberID`, not `memberId`)
- Ensure enum values exactly match C# EnumMember attributes
- **IMPORTANT**: Validate all enum values against the API JSON specification in `docs/cbp-admin-cu-api.json`

### Standard Paged Response Interface

All paged response interfaces must include these properties:
```typescript
export interface StandardPagedResponse<T> {
  items: T[] | null;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
```

### Implementation Checklist

For each report, the following items must be implemented:

1. **Research and Verification**:
   - Verify API endpoint method (GET vs POST) and required parameters
   - Check field names and types in the API response structure
   - Confirm sort column values match the API expectations
   - Review similar report implementations for UI patterns

2. **Utility File**:
   - Create a utility file in `src/utils/reports/[reportName].ts`
   - Define string-based enums for search types and sort columns
   - Create display name mappings for UI-friendly labels
   - Define interfaces for request and response types
   - Implement API service function to fetch data

3. **Service Layer**:
   - Add method to `IReportService` interface
   - Implement method in `ReportService` class
   - Implement method in `MockReportService` class for testing
   - Ensure response handling doesn't use `.data` property (direct property access)

4. **UI Component**:
   - Create component in `src/components/bill-pay/reports/reports/[ReportName]Report.tsx`
   - Use shared `ReportContainer` and `ReportTable` components
   - Implement search form with appropriate controls
   - Add pagination and CSV export functionality
   - **ReportContainer Props**:
     ```typescript
     <ReportContainer
       title="Report Title"
       onRunReport={handleSubmit} // Must accept no parameters
       loading={loading}
       error={error}
       hasData={!!reportData && reportData.length > 0}
       onExportCsv={handleExportCsv} // Optional
     >
       {/* Report content */}
     </ReportContainer>
     ```
   - **Event Handler Type Safety**:
     ```typescript
     // Make handlers compatible with both form events and no-parameter calls
     const handleSubmit = (event?: React.FormEvent) => {
       if (event) {
         event.preventDefault();
       }
       runReport(1);
     };
     ```
   - Implement sort direction indicators in table headers:
     - Use Material-UI icons (ArrowUpwardIcon/ArrowDownwardIcon) to show sort direction
     - Initialize with a default sort column and direction
     - Use a dedicated sort handling function that ensures synchronization between UI and API calls
     - Store sort direction in a local variable before updating state to prevent race conditions
   - Add useEffect hook to load data with initial sort settings when component mounts

5. **Routing**:
   - Add lazy-loaded import in `src/routes/billPayRoutes.ts`
   - Add route configuration with proper path, title, and icon
   - Set appropriate resourceId for permissions

6. **Navigation**:
   - Update `ReportsLanding.tsx` to mark the report as implemented
   - Ensure the report card links to the correct route

7. **Permissions Registry**:
   - Add entry to `src/config/permissions.ts` for the report
   - Use the resourceId format: `route:billPay.reports.[reportName]`
   - Include standard report permissions: `['BillPayViewer', 'BillPayReports_Read']`
   - Include admin permissions: `['ConnectSuperuser', 'ClientSuperuser']`
   - Add a clear description of the report

## Report Specifications

### 1. BillPay Search Report

- **API**: `/api/v1/BillPaySearch` (POST)
- **Types**:
  - `BillPaySearchType`: `Member`, `Payee`, `Payment`, `UserPayeeList`
  - `BillPaySearchSortColumn`: `MemberID`, `PaymentID`, `DateProcessed`, `Amount`, `Status`
  - Response and request interfaces with proper camelCase and ID conventions

- **Component**:
  - Search form with type selector and ID input
  - Sortable results table
  - Pagination and CSV export

- **Routes and Navigation**:
  - Route path: `/admin/bill-pay/reports/billpay-search`
  - Resource ID: `route:billPay.reports.billPaySearch`
  - Icon: `SearchIcon`

- **Permissions Registry**:
  ```typescript
  'route:billPay.reports.billPaySearch': {
    resourceId: 'route:billPay.reports.billPaySearch',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View BillPay Search Report'
  }
  ```

### 2. Error Recap Report

- **API**: `/api/v1/ErrorHistoryReport` (POST)
- **Types**:
  - `ErrorRecapSearchType`: Various search criteria
  - `ErrorRecapSortColumn`: Sortable columns
  - Response and request interfaces with proper camelCase and ID conventions

- **Component**:
  - Search form with appropriate inputs
  - Date range picker when needed
  - Error details table with export

- **Routes and Navigation**:
  - Route path: `/admin/bill-pay/reports/error-recap`
  - Resource ID: `route:billPay.reports.errorRecap`
  - Icon: `ErrorIcon`

- **Permissions Registry**:
  ```typescript
  'route:billPay.reports.errorRecap': {
    resourceId: 'route:billPay.reports.errorRecap',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View Error Recap Report'
  }
  ```

### 3. Payment Activity Report

- **API**: `/api/v1/PaymentActivity` (POST)
- **Types**:
  - `PaymentActivitySearchType`: Search criteria options
  - `PaymentActivitySortColumn`: Sortable columns
  - Response and request interfaces with proper camelCase and ID conventions

- **Component**:
  - Search form with type-specific inputs
  - Payment details table with sorting
  - Pagination and export

- **Routes and Navigation**:
  - Route path: `/admin/bill-pay/reports/payment-activity`
  - Resource ID: `route:billPay.reports.paymentActivity`
  - Icon: `PaymentIcon`

- **Permissions Registry**:
  ```typescript
  'route:billPay.reports.paymentActivity': {
    resourceId: 'route:billPay.reports.paymentActivity',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View Payment Activity Report'
  }
  ```

### 4. Active User Count Report

- **API**: `/api/v1/ActiveUserCount` (GET)
- **Types**:
  - `ActiveUserCountSearchType`: Search criteria options
  - `ActiveUserCountSortColumn`: Sortable columns
  - Response and request interfaces with proper camelCase and ID conventions

- **Component**:
  - Search form with date range picker and member ID option
  - User count table with sorting
  - Pagination and export

- **Routes and Navigation**:
  - Route path: `/admin/bill-pay/reports/active-user-count`
  - Resource ID: `route:billPay.reports.activeUserCount`
  - Icon: `GroupIcon`

- **Permissions Registry**:
  ```typescript
  'route:billPay.reports.activeUserCount': {
    resourceId: 'route:billPay.reports.activeUserCount',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View Active User Count Report'
  }
  ```

### 5. Failed On Us Report

- **API**: `/api/v1/FailedOnUs` (GET)
- **Types**:
  - `FailedOnUsSearchType`: Search criteria options
  - `FailedOnUsSortColumn`: Sortable columns
  - Response and request interfaces with proper camelCase and ID conventions

- **Component**:
  - Search form with date range picker
  - Failed payment table with sorting
  - Pagination and export

- **Routes and Navigation**:
  - Route path: `/admin/bill-pay/reports/failed-on-us`
  - Resource ID: `route:billPay.reports.failedOnUs`
  - Icon: `FailedIcon`

- **Permissions Registry**:
  ```typescript
  'route:billPay.reports.failedOnUs': {
    resourceId: 'route:billPay.reports.failedOnUs',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View Failed On Us Report'
  }
  ```

### 6. Global Holidays Report

- **API**: `/api/v1/report/globalholidays` (GET)
- **Types**:
  - `GlobalHolidaysSearchType`: Search criteria options (`All`)
  - `GlobalHolidaysSortColumn`: Sortable columns (`Date`, `Id`, `Description`, `HolidayType`)
  - Response and request interfaces with proper camelCase and ID conventions

- **Component**:
  - Search form with search type selection
  - Holiday table with sorting on all columns
  - Pagination and export functionality
  - Date formatting using dayjs

- **Routes and Navigation**:
  - Route: `/admin/bill-pay/reports/global-holidays`
  - Icon: `EventIcon`
  - Permission: `route:billPay.reports.globalHolidays`
  - Sidebar navigation entry under Reports section

- **Permissions Registry**:
  ```typescript
  'route:billPay.reports.globalHolidays': {
    resourceId: 'route:billPay.reports.globalHolidays',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View Global Holidays Report'
  }
  ```

- **Implementation Status**:
  - [x] Types defined
  - [x] Service methods implemented
  - [x] UI component created
  - [x] Search form implemented
  - [x] Results table with sorting
  - [x] Pagination controls
  - [x] Routes and permissions configured

### 7. Monthly Users Report

- **API**: `/api/v1/report/monthlyusers` (GET)
- **Types**:
  - `MonthlyUsersSearchType`: DateRange (only search type available)
  - `MonthlyUsersSortColumn`: MemberID, NumberOfPayments
  - Response and request interfaces with proper camelCase and ID conventions

- **Component**:
  - Search form with date range picker
  - User count table with sorting on Member ID and Number of Payments columns
  - Pagination and export functionality

- **Routes and Navigation**:
  - Route path: `/admin/bill-pay/reports/monthly-users`
  - Resource ID: `route:billPay.reports.monthlyUsers`
  - Icon: `PeopleIcon`

- **Permissions Registry**:
  ```typescript
  'route:billPay.reports.monthlyUsers': {
    resourceId: 'route:billPay.reports.monthlyUsers',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View Monthly Users Report'
  }
  ```

- **Implementation Status**:
  - [x] Types defined
  - [x] Service methods implemented
  - [x] UI component created
  - [x] Search form implemented
  - [x] Results table with sorting
  - [x] Pagination controls
  - [x] Routes and permissions configured

### 8. Pending Payments Report

- **API**: `/api/v1/PendingPayments` (POST)
- **Types**:
  - `PendingPaymentsSearchType`: Search criteria options (DateRange)
  - `PendingPaymentsSortColumn`: Sortable columns (PaymentID, MemberID, Amount, ScheduledDate, Status)
  - Response and request interfaces with proper camelCase and ID conventions

- **Component**:
  - Search form with date range picker
  - Payment table with sorting on all columns
  - Pagination and export functionality

- **Routes and Navigation**:
  - Route: `/admin/bill-pay/reports/pending-payments`
  - Sidebar navigation item with PaymentIcon
  - Permission: `route:billPay.reports.pendingPayments`

- **Implementation Status**:
  - [x] Types defined
  - [x] Service methods implemented
  - [x] UI component created
  - [x] Search form implemented
  - [x] Results table with sorting
  - [x] Pagination controls
  - [x] Routes and permissions configured

### 9. Recurring Payment Change History Report

- **API**: `/api/v1/RecurringPaymentChangeHistory` (POST)
- **Types**:
  - `RecurringPaymentChangeHistorySearchType`: Search criteria options
  - `RecurringPaymentChangeHistorySortColumn`: Sortable columns
  - Response and request interfaces with proper camelCase and ID conventions

- **Component**:
  - Search form with type selector and date range picker
  - Change history table with sorting
  - Pagination and export

- **Routes and Navigation**:
  - Route path: `/admin/bill-pay/reports/recurring-payment-change-history`
  - Resource ID: `route:billPay.reports.recurringPaymentChangeHistory`
  - Icon: `HistoryIcon`

- **Permissions Registry**:
  ```typescript
  'route:billPay.reports.recurringPaymentChangeHistory': {
    resourceId: 'route:billPay.reports.recurringPaymentChangeHistory',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View Recurring Payment Change History Report'
  }
  ```

### 10. User Payee Change History Report

- **API**: `/api/v1/UserPayeeChangeHistory` (POST)
- **Types**:
  - `UserPayeeChangeHistorySearchType`: Search criteria options
  - `UserPayeeChangeHistorySortColumn`: Sortable columns
  - Response and request interfaces with proper camelCase and ID conventions

- **Component**:
  - Search form with type selector and date range picker
  - Change history table with sorting
  - Pagination and export

- **Routes and Navigation**:
  - Route path: `/admin/bill-pay/reports/user-payee-change-history`
  - Resource ID: `route:billPay.reports.userPayeeChangeHistory`
  - Icon: `HistoryIcon`

- **Permissions Registry**:
  ```typescript
  'route:billPay.reports.userPayeeChangeHistory': {
    resourceId: 'route:billPay.reports.userPayeeChangeHistory',
    permissions: ['BillPayViewer', 'BillPayReports_Read'],
    adminPermissions: ['ConnectSuperuser', 'ClientSuperuser'],
    description: 'View User Payee Change History Report'
  }
  ```

## Best Practices for Sort Handling

To ensure consistent sort behavior across all reports, follow these guidelines:

1. **State Management**:
   - Initialize sort column with a default value from the enum (not undefined)
   - Initialize sort direction with 'ASC' as the default
   - Use a helper function to map column keys to enum values for type safety

2. **Sort Direction Indicators**:
   - Add visual indicators (arrows) to show current sort direction
   - Include renderHeader function for each sortable column
   - Use conditional rendering based on current sort column and direction

3. **API Integration**:
   - Create a dedicated sort handling function that takes column and direction parameters
   - Update state and make API call in the correct sequence to prevent race conditions
   - Reset to page 1 when changing sort settings

4. **Example Implementation**:
   ```tsx
   // Handle sort change
   const handleSortChange = (column: string) => {
     // Map the column key to the enum value
     const columnEnum = mapColumnKeyToEnum(column);
     let newDirection = sortDirection;
     
     if (sortColumn === columnEnum) {
       // Toggle sort direction if clicking the same column
       newDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
       setSortDirection(newDirection);
     } else {
       // Set new sort column and default to ASC
       setSortColumn(columnEnum);
       newDirection = 'ASC';
       setSortDirection(newDirection);
     }
     
     // Run report with the updated sort settings
     runReportWithSort(columnEnum, newDirection);
   };
   ```

## Service Layer Integration Pattern

Based on lessons learned during implementation, follow these patterns for all report implementations:

### Utility File Pattern

Utility files should directly import the reportService from ServiceFactory:

```typescript
// src/utils/reports/reportName.ts
import { reportService } from '../../services/factory/ServiceFactory';

export const getReportData = async (params: ReportParams): Promise<ReportResponse> => {
  const response = await reportService.getReportMethod(params);
  return response;
};
```

**IMPORTANT**: Never pass the reportService as a parameter to utility functions. Always import it directly.

### Component Implementation Pattern

Components should use the utility functions that encapsulate service calls:

```typescript
// src/components/bill-pay/reports/reports/ReportName.tsx
import { getReportData } from '../../../../utils/reports/reportName';

// In component:
const fetchData = async (params) => {
  try {
    const response = await getReportData(params);
    // Process response...
  } catch (err) {
    // Handle error...
  }
};
```

**IMPORTANT**: Components should never directly instantiate services or import ServiceFactory to get service instances.

### Import Path Consistency

Maintain consistent relative import paths based on component location:

- From report components: `../../../../services/factory/ServiceFactory`
- From utility files: `../../services/factory/ServiceFactory`

Always verify import paths when creating new components or moving existing ones.

### Navigation and Sidebar Updates

When implementing a new report, ensure these navigation-related steps are completed:

1. Add the route configuration in `billPayRoutes.ts`
2. Add the permission entry in `permissions.ts`
3. Update `ReportsLanding.tsx` to mark the report as implemented (`implemented: true`)
4. Verify the report appears in the sidebar navigation under Reports section

## Implementation Checklist

- [ ] Types and enums defined
- [ ] Service methods implemented
- [ ] UI component created
- [ ] Search form implemented
- [ ] Results table with sorting
- [ ] Pagination controls
- [ ] CSV export
- [ ] Error handling
- [ ] Routing configured
- [ ] Navigation updated
- [ ] Permissions registry updated
