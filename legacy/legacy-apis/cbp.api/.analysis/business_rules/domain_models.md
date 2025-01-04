---
type: domain_model
project: cbp.api
created_date: 2025-01-02T21:00:05-07:00
status: in_progress
references:
  - validation_rules.md
  - business_constraints.md
---

# CBP API Domain Models

## Overview

The CBP (Connect Bill Pay) API manages bill payments, payees, and related operations. This document captures the core domain models and their relationships.

## Core Domain Models

### Payment
The central entity representing a bill payment transaction.

#### Types
1. One-Time Payment
   - Properties:
     - userPayeeListId (required)
     - memberId (required)
     - fundingAccount (required)
     - amount
     - memo
     - billReference
     - sourceApplication
     - willProcessDate
     - deliveryDate

2. Recurring Payment
   - Extends One-Time Payment
   - Additional Properties:
     - numPayments
     - frequency
     - processDate

### Payee
Represents a bill payment recipient.

#### Types
1. Global Payee
   - System-wide payee definition
   - Searchable by name or ID
   - Properties:
     - internalPayeeId
     - payeeName
     - address (1-3)
     - city
     - country
     - status

2. User Payee
   - User-specific payee instance
   - Properties:
     - userPayeeListId
     - active status
     - account information
     - member association

### Member
Represents a user of the bill pay system.
- Properties:
  - memberId (unique identifier)
  - payment history
  - payee associations
  - funding accounts

### Payment Status
Tracks the state of a payment through its lifecycle.
- Properties:
  - paymentId
  - status
  - timestamps
  - processing history

## Entity Relationships

### Primary Relationships
1. Member -> User Payee
   - One-to-many relationship
   - Member can have multiple payees
   - Each user payee is associated with one member

2. User Payee -> Global Payee
   - Many-to-one relationship
   - Multiple user payees can reference same global payee
   - Global payee serves as template

3. Payment -> User Payee
   - Many-to-one relationship
   - Multiple payments can be made to same user payee
   - Each payment must reference one user payee

### Secondary Relationships
1. Member -> Payment
   - One-to-many relationship
   - Member can have multiple payments
   - Each payment belongs to one member

2. Payment -> Funding Account
   - Many-to-one relationship
   - Multiple payments can use same funding account
   - Each payment requires one funding account

## State Management

### Payment States
- Creation
- Processing
- Delivery
- Exception handling
- Reprocessing
- Confirmation

### Payee States
- Active/Inactive
- Global/User-specific
- Account verification status

## Business Invariants

1. Payment Integrity
   - Must have valid member
   - Must have valid payee
   - Must have valid funding account
   - Amount must be specified

2. Payee Integrity
   - Global payee must exist before user payee
   - User payee must be associated with member
   - Account information must be validated

3. Member Integrity
   - Must have valid identifier
   - Must have at least one funding account
   - Must maintain payment history

## References

- API Specification: `api.json`
- Implementation: `cbp.api/`
- Related Patterns: See `process_flows/transaction_flows.md`
