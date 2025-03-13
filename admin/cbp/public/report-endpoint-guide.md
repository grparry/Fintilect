# Report Endpoint Integration Guide

## Overview

This document provides guidance on how to use the Report endpoint (`/api/v1/Report/run`) with the `rptPaymentActivityJSON` stored procedure. The endpoint allows searching for payment activity data using various search criteria.

## API Endpoint

```
POST https://localhost:8001/api/v1/Report/run
```

## Request Format

```json
{
  "Name": "rptPaymentActivityJSON",
  "Arguments": "SearchType=PaymentActivity_Date,StartDate=2024-03-20,EndDate=2024-03-23,MemberId=,PayeeName="
}
```

## Available Search Types

The `SearchType` parameter determines which fields are used for filtering. All parameters must be included in the request, even if they're empty for a particular search type.

| Search Type | Description | Required Parameters |
|-------------|-------------|---------------------|
| `PaymentActivity_MemberID` | Search by Member ID only | MemberId |
| `PaymentActivity_MemberIDAndDate` | Search by Member ID and Date Range | MemberId, StartDate, EndDate |
| `PaymentActivity_MemberIDAndPayeeName` | Search by Member ID and Payee Name | MemberId, PayeeName |
| `PaymentActivity_MemberIDAndDateAndPayeeName` | Search by Member ID, Date Range, and Payee Name | MemberId, StartDate, EndDate, PayeeName |
| `PaymentActivity_Date` | Search by Date Range only | StartDate, EndDate |

## Parameter Details

| Parameter | Format | Description | Example |
|-----------|--------|-------------|---------|
| SearchType | String | The type of search to perform | `PaymentActivity_Date` |
| StartDate | YYYY-MM-DD | The start date for filtering | `2024-03-01` |
| EndDate | YYYY-MM-DD | The end date for filtering | `2024-03-31` |
| MemberId | String | The member ID to filter by | `30031337` |
| PayeeName | String | The exact payee name to filter by | `Company Name` |

## Important Notes

1. **Exact Parameter Names**: All parameters must be included in the request, even if they're empty for a particular search type.

2. **Date Format**: Use ISO date format (YYYY-MM-DD) for StartDate and EndDate parameters.

3. **Exact Payee Name Matching**: The stored procedure uses exact string matching for payee names, not partial matching with `LIKE`. Make sure to use the exact payee name as stored in the database.

## Response Format

The API returns a JSON array of payment records:

```json
{
  "jsonResponse": [
    {
      "MemberID": "30031337",
      "PaymentID": "323C00326516",
      "PayeeID": "323C0000063550",
      "PayeeName": "Company Name",
      "DateProcessed": "03/22/2024",
      "DueDate": "08/31/2023",
      "Status": "Cancelled",
      "PaymentMethod": "Check",
      "Amount": 1.0
    },
    ...
  ]
}
```

If no records are found, the response will be:

```json
{
  "jsonResponse": {}
}
```

## Examples

### 1. Search by Date Range

```json
{
  "Name": "rptPaymentActivityJSON",
  "Arguments": "SearchType=PaymentActivity_Date,StartDate=2024-03-01,EndDate=2024-03-31,MemberId=,PayeeName="
}
```

### 2. Search by Member ID

```json
{
  "Name": "rptPaymentActivityJSON",
  "Arguments": "SearchType=PaymentActivity_MemberID,StartDate=,EndDate=,MemberId=30031337,PayeeName="
}
```

### 3. Search by Member ID and Payee Name

```json
{
  "Name": "rptPaymentActivityJSON",
  "Arguments": "SearchType=PaymentActivity_MemberIDAndPayeeName,StartDate=,EndDate=,MemberId=30031337,PayeeName=Company Name"
}
```

### 4. Search by Member ID, Date Range, and Payee Name

```json
{
  "Name": "rptPaymentActivityJSON",
  "Arguments": "SearchType=PaymentActivity_MemberIDAndDateAndPayeeName,StartDate=2024-03-01,EndDate=2024-03-31,MemberId=30031337,PayeeName=Company Name"
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
1. All parameters are included in the request, even if they're empty
2. The correct search type is used based on the available filters
3. Date values are properly formatted as YYYY-MM-DD
4. Payee names are exact matches to what's in the database

## Troubleshooting

If you're not getting the expected results:
1. Verify that all parameters are correctly formatted
2. Check that the search type matches the parameters you're providing
3. Ensure that the date range is valid
4. For payee name searches, verify the exact spelling and capitalization
