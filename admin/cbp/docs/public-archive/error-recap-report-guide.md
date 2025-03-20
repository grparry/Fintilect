# Error Recap Report Integration Guide

## Overview

This document provides guidance on how to use the Report endpoint (`/api/v1/Report/run`) with the `rptErrorRecapJSON` stored procedure. This report allows searching for error history records using various search criteria.

## API Endpoint

```
POST https://localhost:8001/api/v1/Report/run
```

## Request Format

```json
{
  "Name": "rptErrorRecapJSON",
  "Arguments": "SearchType=MemberId,SearchValue=286526"
}
```

## Available Search Types

The `SearchType` parameter determines which field is used for filtering:

| Search Type | Description | Example |
|-------------|-------------|---------|
| `PaymentID` | Search by Payment ID | `SearchType=PaymentID,SearchValue=323C00319889` |
| `MemberID` | Search by Member ID | `SearchType=MemberID,SearchValue=286526` |
| `UserPayeeListID` | Search by User Payee List ID | `SearchType=UserPayeeListID,SearchValue=323C0000005109` |
| `StatusCode` | Search by Status Code | `SearchType=StatusCode,SearchValue=200` |

## Parameter Details

| Parameter | Format | Description | Example |
|-----------|--------|-------------|---------|
| SearchType | String | The type of search to perform | `MemberID` |
| SearchValue | String | The value to search for based on the SearchType | `286526` |

## Important Notes

1. **Only Two Parameters**: Unlike other reports, this stored procedure only accepts two parameters: `SearchType` and `SearchValue`. Do not include additional parameters like StartDate or EndDate.

2. **Exact Matching**: The stored procedure uses exact string matching (after trimming whitespace), not partial matching with `LIKE`.

3. **Case Sensitivity**: The `SearchType` values are case-sensitive. Make sure to use the exact values as listed above.

4. **Response Time**: Some queries may take longer to execute depending on the amount of data being processed. Consider implementing appropriate timeout handling in your frontend code.

## Response Format

The API returns a JSON array of error records. Here's an example response:

```json
{
  "jsonResponse": [
    {
      "FailedDate": "04/24/2023",
      "MemberID": "286526",
      "PaymentID": "323C00319889",
      "Amount": 519.82,
      "PayeeID": "334652817",
      "PayeeName": "MECHANICS BANK AUTO FINANCE",
      "UserPayeeListID": "323C0000005109",
      "UsersAccountAtPayee": "66965781001",
      "NameOnAccount": "CARLOTTA",
      "Status": "Non-Sufficient Funds w/Fee",
      "HostCode": "13033",
      "Error": "13033: There are not sufficient funds to complete this transaction"
    }
  ]
}
```

If no records are found, the response will be:

```json
{
  "jsonResponse": []
}
```

## Examples

### 1. Search by Member ID

```json
{
  "Name": "rptErrorRecapJSON",
  "Arguments": "SearchType=MemberID,SearchValue=286526"
}
```

### 2. Search by Payment ID

```json
{
  "Name": "rptErrorRecapJSON",
  "Arguments": "SearchType=PaymentID,SearchValue=323C00319889"
}
```

### 3. Search by Status Code

```json
{
  "Name": "rptErrorRecapJSON",
  "Arguments": "SearchType=StatusCode,SearchValue=200"
}
```

## Error Handling

The endpoint includes robust error handling for:
- Missing or invalid parameters
- Database connection issues
- Empty result sets

If an error occurs, the API will return an appropriate HTTP status code and error message.

## Frontend Integration

When integrating with the frontend, ensure that:
1. Only the required parameters (`SearchType` and `SearchValue`) are included in the request
2. The correct search type is used based on the available filters
3. The search value is properly formatted according to the search type

## Troubleshooting

If you're not getting the expected results:
1. Verify that the search type is one of the supported values
2. Check that the search value is correctly formatted
3. Ensure that you're not including any additional parameters
4. If experiencing timeouts, try narrowing your search criteria
