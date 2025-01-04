# DevBillpayer Database Structure

## Payment Related Tables

### PAYMENT_HISTORY
- PaymentID (char)
- UserType (tinyint)
- PayeeID (char)
- PayeeListID (char)
- Amount (decimal)
- ProcessedDate (datetime)
- StatusCode (int)

### PAYMENT_CLEAR
- CheckNum (varchar)
- PaymentID (char)
- ClearedDate (datetime)
- Amount (decimal)

### ONUSPAYMENTS
- PaymentID (varchar)
- MemberID (varchar)
- Amount (decimal)
- EntryDate (datetime)
- StatusCode (int)

## Payee Related Tables

### PAYEE
- PayeeID (char)
- Name (char)
- ProviderID (int)
- Status (char)

### USER_PAYEE
- PayeeListID (char)
- PayeeID (char)
- MemberID (char)
- AccountNumber (varchar)
- Status (char)

### UserPayeeOptions
- MemberID (varchar)
- PayeeListID (varchar)
- Options (varchar)

## System Tables

### CALENDAR
- CalDate (smalldatetime)

### HOLIDAYS
- Date (smalldatetime)
- Description (varchar)

### GENERATORSTATUS
- RunID (varchar)
- StatusID (int)
- StartTime (datetime)
- EndTime (datetime)
- Message (varchar)

### ERRORRECAP
- RunID (int)
- PayeeListID (varchar)
- PaymentID (varchar)
- StatusCode (int)
- Message (varchar)
- EntryDate (datetime)

### HOSTCONNECTION
- CUID (varchar)
- ConnParameter (varchar)
- ConnValue (varchar)

Last Updated: 2025-01-04 11:20:52 MST

Note: This is a simplified structure showing only key fields. All tables may have additional fields not listed here for brevity.
