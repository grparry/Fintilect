# CBP Admin CU API Report Documentation

## Report API Endpoint

The CBP Admin CU API provides a flexible reporting endpoint that allows you to execute various report stored procedures directly from the frontend.

### Endpoint Details

- **URL**: `/api/v1/Report/run`
- **Method**: POST
- **Content-Type**: application/json

### Request Format

```json
{
  "name": "rptStoredProcedureName",
  "arguments": "param1=value1,param2=value2,param3=value3"
}
```

### Parameters

- **name**: The name of the stored procedure to execute (must start with "rpt" and end with "JSON")
- **arguments**: A comma-separated list of parameter assignments in the format `paramName=paramValue`

### Response Format

```json
{
  "jsonResponse": {
    // JSON data returned by the stored procedure
  }
}
```

### Example Request

```json
{
  "name": "rptPaymentActivityJSON",
  "arguments": "StartDate=2025-01-01,EndDate=2025-03-11,SearchType=MemberId,SearchValue=12345"
}
```

## Available Report Stored Procedures

Below is a list of all available report stored procedures and their parameters:

### 1. rptBillpaySearchJSON

Search for bill payment records based on various criteria.

**Parameters**:
- `@SearchType`: varchar - Type of search (e.g., "MemberId", "PaymentId")
- `@Id`: varchar - ID value to search for
- `@Days`: int - Number of days to include in search
- `@ReportType`: varchar - Type of report to generate

**Example**:
```
rptBillpaySearchJSON,SearchType=MemberId,Id=12345,Days=30,ReportType=Full
```

### 2. rptErrorRecapJSON

Retrieve error information based on search criteria.

**Parameters**:
- `@SearchType`: varchar - Type of search
- `@SearchValue`: varchar - Value to search for

**Example**:
```
rptErrorRecapJSON,SearchType=StatusCode,SearchValue=500
```

### 3. rptGetActiveUserCountJSON

Get count of active users within a date range.

**Parameters**:
- `@StartDate`: date - Start date for the report
- `@EndDate`: date - End date for the report

**Example**:
```
rptGetActiveUserCountJSON,StartDate=2025-01-01,EndDate=2025-03-11
```

### 4. rptGetFailedOnUsJSON

Retrieve information about failed on-us transactions.

**Parameters**:
- `@StartDate`: date - Start date for the report
- `@EndDate`: date - End date for the report

**Example**:
```
rptGetFailedOnUsJSON,StartDate=2025-01-01,EndDate=2025-03-11
```

### 5. rptGetGlobalHolidaysJSON

Retrieve global holiday information.

**Parameters**: None

**Example**:
```
rptGetGlobalHolidaysJSON
```

### 6. rptGetOnUsPostingsJSON

Retrieve information about on-us postings.

**Parameters**:
- `@StartDate`: date - Start date for the report
- `@EndDate`: date - End date for the report

**Example**:
```
rptGetOnUsPostingsJSON,StartDate=2025-01-01,EndDate=2025-03-11
```

### 7. rptGetStatusesWithNotificationsJSON

Retrieve statuses that have notifications.

**Parameters**: None

**Example**:
```
rptGetStatusesWithNotificationsJSON
```

### 8. rptLargePaymentJSON

Retrieve information about large payments.

**Parameters**:
- `@RunDate`: date - Date to run the report for

**Example**:
```
rptLargePaymentJSON,RunDate=2025-03-11
```

### 9. rptMonthlyUsersJSON

Get monthly user statistics.

**Parameters**:
- `@StartDate`: date - Start date for the report
- `@EndDate`: date - End date for the report

**Example**:
```
rptMonthlyUsersJSON,StartDate=2025-01-01,EndDate=2025-03-11
```

### 10. rptPaymentActivityJSON

Retrieve payment activity information.

**Parameters**:
- `@StartDate`: date - Start date for the report
- `@EndDate`: date - End date for the report
- `@SearchType`: varchar - Type of search (e.g., "MemberId", "Date")
- `@SearchValue`: varchar - Value to search for
- `@PayeeName`: varchar - Name of payee (optional)

**Example**:
```
rptPaymentActivityJSON,StartDate=2025-01-01,EndDate=2025-03-11,SearchType=MemberId,SearchValue=12345,PayeeName=
```

### 11. rptPendingPaymentsJSON

Retrieve information about pending payments.

**Parameters**:
- `@StartDate`: date - Start date for the report
- `@EndDate`: date - End date for the report

**Example**:
```
rptPendingPaymentsJSON,StartDate=2025-01-01,EndDate=2025-03-11
```

### 12. rptProcessingConfirmationJSON

Retrieve processing confirmation information.

**Parameters**:
- `@StartDate`: date - Start date for the report
- `@EndDate`: date - End date for the report

**Example**:
```
rptProcessingConfirmationJSON,StartDate=2025-01-01,EndDate=2025-03-11
```

### 13. rptRecurringPaymentChangeHistoryJSON

Retrieve change history for recurring payments.

**Parameters**:
- `@StartDate`: date - Start date for the report
- `@EndDate`: date - End date for the report
- `@SearchType`: varchar - Type of search
- `@SearchValue`: varchar - Value to search for

**Example**:
```
rptRecurringPaymentChangeHistoryJSON,StartDate=2025-01-01,EndDate=2025-03-11,SearchType=MemberId,SearchValue=12345
```

### 14. rptScheduledPaymentChangeHistoryJSON

Retrieve change history for scheduled payments.

**Parameters**:
- `@StartDate`: date - Start date for the report
- `@EndDate`: date - End date for the report
- `@SearchType`: varchar - Type of search
- `@SearchValue`: varchar - Value to search for

**Example**:
```
rptScheduledPaymentChangeHistoryJSON,StartDate=2025-01-01,EndDate=2025-03-11,SearchType=MemberId,SearchValue=12345
```

### 15. rptUserPayeeChangeHistoryJSON

Retrieve change history for user payees.

**Parameters**:
- `@StartDate`: date - Start date for the report
- `@EndDate`: date - End date for the report
- `@SearchType`: varchar - Type of search
- `@SearchValue`: varchar - Value to search for

**Example**:
```
rptUserPayeeChangeHistoryJSON,StartDate=2025-01-01,EndDate=2025-03-11,SearchType=MemberId,SearchValue=12345
```

## Common Search Types

Many of the report stored procedures accept a `SearchType` parameter. Here are the common search types used:

- `MemberId`: Search by member ID
- `PaymentId`: Search by payment ID
- `PayeeId`: Search by payee ID
- `Date`: Search by date range
- `StatusCode`: Search by status code
- `MemberIdAndDate`: Search by both member ID and date range
- `MemberIdAndPayeeName`: Search by both member ID and payee name
- `MemberIdAndDateAndPayeeName`: Search by member ID, date range, and payee name

## Frontend Implementation Tips

1. **Parameter Formatting**:
   - Ensure parameters are properly formatted in the `arguments` string
   - Use the exact parameter names as expected by the stored procedures
   - Format dates as 'YYYY-MM-DD'

2. **Error Handling**:
   - Handle cases where the stored procedure doesn't exist
   - Handle cases where required parameters are missing
   - Handle cases where the stored procedure returns an error

3. **Performance Considerations**:
   - Some reports may return large datasets, consider implementing pagination
   - Use appropriate date ranges to limit result sets
   - Consider caching frequently accessed reports

4. **Security**:
   - Validate user input before sending to the API
   - Ensure users have appropriate permissions to access reports

## Example Frontend Implementation

```javascript
async function runReport(reportName, parameters) {
  // Convert parameters object to string format
  const args = Object.entries(parameters)
    .map(([key, value]) => `${key}=${value}`)
    .join(',');

  try {
    const response = await fetch('/api/v1/Report/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: reportName,
        arguments: args
      })
    });

    if (!response.ok) {
      throw new Error(`Error running report: ${response.statusText}`);
    }

    const data = await response.json();
    return data.jsonResponse;
  } catch (error) {
    console.error('Failed to run report:', error);
    throw error;
  }
}

// Example usage
async function getPaymentActivity(memberId, startDate, endDate) {
  const reportData = await runReport('rptPaymentActivityJSON', {
    StartDate: startDate,
    EndDate: endDate,
    SearchType: 'MemberId',
    SearchValue: memberId,
    PayeeName: ''
  });
  
  return reportData;
}
```
