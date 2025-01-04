---
type: domain_models
project: cbp.api
created_date: 2025-01-03T16:33:47-07:00
status: verified
risk_level: critical
references:
  - ../business_rules/business_constraints.md
  - ../business_rules/enhanced_validation_rules.md
last_verified: 2025-01-03T16:33:47-07:00
---

# CBP API Domain Models

## Currently Implemented Models

### Payment Domain
```yaml
implementation:
  member_payment:
    core_fields:
      - id: "Unique payment identifier"
      - userPayeeListId: "Reference to user's payee"
      - fundingAccount: "Source account"
      - amount: "Payment amount"
      - statusCode: "Payment status"
      - willProcessDate: "Scheduled process date"
      - deliveryDate: "Expected delivery date"
      - suspended: "Payment suspension flag"
      - memo: "Payment memo"
    
    payee_fields:
      - usersAccountAtPayee: "Account at payee"
      - nameOnAccount: "Name on payee account"
      - nickName: "Payee nickname"
      - payeeId: "Reference to payee"
      - payeeType: "Type of payee"
      - payeeName: "Name of payee"
      - paymentMethod: "Method of payment"
      - minDaysToPay: "Minimum days to process"
    
    recurring_fields:
      - recurringPaymentId: "Reference to recurring payment"
      - numPayments: "Total number of payments"
      - paymentsProcessed: "Number processed"
      - frequency: "Payment frequency"
      - frequencyDescription: "Frequency description"
      - futurePaymentDates: "List of future dates"
```

### Payee Domain
```yaml
implementation:
  payee:
    core_fields:
      - payeeId: "Unique payee identifier"
      - payeeName: "Name of payee"
      - payeeType: "Type of payee"
    
    address_fields:
      - addressLine1: "Primary address"
      - addressLine2: "Secondary address"
      - city: "City"
      - state: "State"
      - zipCode: "ZIP code"
      - phoneNumber: "Contact number"
```

### Payment History Domain
```yaml
implementation:
  payment_history:
    tracking_fields:
      - paymentId: "Reference to payment"
      - changeDate: "Date of change"
      - changeType: "Type of change"
      - oldValue: "Previous value"
      - newValue: "Updated value"
      - changedBy: "User making change"
    
    audit_fields:
      - entryDate: "Creation date"
      - lastUpdate: "Last modification"
      - statusHistory: "Status changes"
```

### Configuration Domain
```yaml
implementation:
  configuration:
    core_fields:
      - id: "Configuration identifier"
      - name: "Configuration name"
      - value: "Configuration value"
      - description: "Configuration description"
    
    tracking_fields:
      - lastUpdated: "Last update timestamp"
      - lastUpdatedBy: "Last updated by"
      - active: "Active status"
```

## Missing Domain Models

### Member Domain
```yaml
documented_rules:
  member:
    core_fields:
      rule: "Member core information"
      verification_status: not_found
      fields:
        - memberId: "Unique member identifier"
        - status: "Member status"
        - eligibility: "Bill pay eligibility"
    
    account_fields:
      rule: "Member account information"
      verification_status: not_found
      fields:
        - accounts: "List of funding accounts"
        - accountStatus: "Account statuses"
        - accountBalances: "Account balances"
```

### Transaction Domain
```yaml
documented_rules:
  transaction:
    core_fields:
      rule: "Transaction tracking"
      verification_status: not_found
      fields:
        - transactionId: "Unique transaction ID"
        - type: "Transaction type"
        - status: "Processing status"
        - amount: "Transaction amount"
    
    processing_fields:
      rule: "Transaction processing"
      verification_status: not_found
      fields:
        - processingWindow: "Processing time window"
        - cutoffTime: "Daily cut-off time"
        - businessDayRules: "Business day validation"
```

### Notification Domain
```yaml
documented_rules:
  notification:
    core_fields:
      rule: "Notification management"
      verification_status: partial
      fields:
        - notificationId: "Unique notification ID"
        - type: "Notification type"
        - status: "Delivery status"
        - recipient: "Target recipient"
    
    delivery_fields:
      rule: "Notification delivery"
      verification_status: not_found
      fields:
        - deliveryMethod: "Method of delivery"
        - deliveryStatus: "Delivery confirmation"
        - retryCount: "Delivery attempts"
```

## Verification Notes

1. Current Implementation Status:
   - Core payment model implemented
   - Basic payee model implemented
   - Simple history tracking
   - Basic configuration management

2. Missing Critical Models:
   - No member domain model
   - No transaction domain model
   - Limited notification model

3. Implementation Gaps:
   - Limited validation rules in models
   - Missing business rule enforcement
   - Incomplete audit trail
   - Limited state management

4. Risk Assessment:
   - Missing critical domain validations
   - Limited domain relationship tracking
   - Incomplete business rule enforcement
   - Basic audit implementation
