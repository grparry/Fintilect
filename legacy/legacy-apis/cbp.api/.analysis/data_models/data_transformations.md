---
type: data_transformation
project: cbp.api
created_date: 2025-01-02T20:59:07-07:00
status: in_progress
references:
  - domain_models.md
  - entity_relationships.md
  - ../process_flows/integration_patterns.md
---

# CBP API Data Transformations

## Overview

This document analyzes the data transformation patterns in the CBP API, focusing on request/response transformations, data mapping, and format conversions.

## Request Transformations

### Payment Transformations

#### One-Time Payment
```yaml
input_format: JSON
transforms:
  - name: Request to Domain Model
    source: OneTimePaymentAddRequest
    target: PaymentEntity
    mappings:
      - source: userPayeeListId
        target: payeeReference
        transform: direct
      - source: memberId
        target: payerReference
        transform: direct
      - source: amount
        target: paymentAmount
        transform: decimal_conversion
      - source: willProcessDate
        target: processingDate
        transform: date_normalization
```

#### Recurring Payment
```yaml
input_format: JSON
transforms:
  - name: Request to Schedule
    source: RecurringPaymentAddRequest
    target: PaymentSchedule
    mappings:
      - source: numPayments
        target: totalPayments
        transform: integer_validation
      - source: frequency
        target: scheduleFrequency
        transform: enum_mapping
      - source: processDate
        target: nextProcessDate
        transform: date_normalization
```

### Payee Transformations

#### Global Payee
```yaml
input_format: JSON
transforms:
  - name: Search to Query
    source: PayeeSearchRequest
    target: PayeeQuery
    mappings:
      - source: partialName
        target: searchPattern
        transform: string_sanitization
      - source: filters
        target: queryFilters
        transform: filter_conversion
```

#### User Payee
```yaml
input_format: JSON
transforms:
  - name: Account Update
    source: PayeeAccountUpdateRequest
    target: AccountEntity
    mappings:
      - source: accountNumber
        target: encryptedAccount
        transform: encryption
      - source: routingNumber
        target: encryptedRouting
        transform: encryption
```

## Response Transformations

### Payment Responses

#### Payment Status
```yaml
output_format: JSON
transforms:
  - name: Status to Response
    source: PaymentStatusEntity
    target: PaymentStatusResponse
    mappings:
      - source: currentState
        target: status
        transform: enum_to_string
      - source: stateTimestamp
        target: lastUpdated
        transform: timestamp_format
```

#### Payment History
```yaml
output_format: JSON
transforms:
  - name: History to Response
    source: PaymentHistoryEntity
    target: PaymentHistoryResponse
    mappings:
      - source: transactions
        target: paymentList
        transform: collection_mapping
      - source: metadata
        target: summary
        transform: metadata_extraction
```

### Payee Responses

#### Payee Search
```yaml
output_format: JSON
transforms:
  - name: Search Results
    source: PayeeSearchResults
    target: PayeeSearchResponse
    mappings:
      - source: matches
        target: payees
        transform: collection_mapping
      - source: pagination
        target: pageInfo
        transform: pagination_format
```

## Data Formats

### Date/Time Formats
```yaml
formats:
  input:
    - ISO8601
    - Unix timestamp
  internal:
    - UTC normalized
    - System timestamp
  output:
    - ISO8601
    - Local timezone
```

### Numeric Formats
```yaml
formats:
  amount:
    precision: 2
    scale: decimal
    validation: positive
  counts:
    type: integer
    validation: non_negative
```

### String Formats
```yaml
formats:
  identifiers:
    type: UUID
    format: string
  names:
    type: string
    sanitization: required
  references:
    type: string
    validation: alphanumeric
```

## Transformation Rules

### Security Rules
```yaml
rules:
  sensitive_data:
    - Account numbers
    - Routing numbers
    - Personal identifiers
  transformations:
    - Encryption
    - Masking
    - Tokenization
```

### Validation Rules
```yaml
rules:
  input_validation:
    - Type checking
    - Range validation
    - Format validation
  output_validation:
    - Schema compliance
    - Data consistency
    - Format verification
```

## Error Transformations

### Error Responses
```yaml
transforms:
  - name: Exception to Response
    source: SystemException
    target: ErrorResponse
    mappings:
      - source: errorCode
        target: status
        transform: error_code_mapping
      - source: message
        target: userMessage
        transform: message_sanitization
```

### Validation Errors
```yaml
transforms:
  - name: Validation to Response
    source: ValidationException
    target: ValidationErrorResponse
    mappings:
      - source: violations
        target: errors
        transform: violation_mapping
      - source: context
        target: details
        transform: context_extraction
```

## References

- API Specification: `api.json`
- Implementation: `cbp.api/`
- Domain Models: See `domain_models.md`
- Entity Relationships: See `entity_relationships.md`
