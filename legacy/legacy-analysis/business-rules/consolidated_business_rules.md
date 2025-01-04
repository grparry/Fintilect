---
type: consolidated_business_rules
created_date: 2025-01-02T21:42:43-07:00
status: active
source_apis:
  - cbp.api
  - cbp.admin-api
  - cbp.admin-cu-api
---

# Consolidated Business Rules Analysis for New Node.js API

## Core Business Rules to Preserve

### 1. Payment Processing Rules

#### 1.1 Payment Validation
- **Required Fields Validation**
  - User payee list ID
  - Member ID
  - Funding account
  - Valid amount
  - Process date
  - Delivery date

#### 1.2 Payment Uniqueness
- No duplicate one-time payments for same UserPayeeListId and MemberId
- Each payment must have unique paymentId
- Prevent overlapping recurring payments for same payee/member

#### 1.3 Temporal Rules
- Process date must be future date
- Delivery date must be after process date
- Delivery dates must be valid business days
- Recurring payment dates must follow frequency rules

### 2. Payee Management Rules

#### 2.1 Payee Identity
- Unique internal payee ID required
- Valid payee name required
- Status tracking mandatory
- Case-insensitive name matching for searches
- Special character handling in names

#### 2.2 Payee-Member Association
- Valid global payee reference required
- Valid member association required
- Unique user payee list ID
- Account number validation
- Account modification history tracking

### 3. Member Management Rules

#### 3.1 Member Identity
- Valid member ID required
- Active status tracking
- Minimum one funding account required
- Payment history maintenance

#### 3.2 Member Relationships
- Many-to-many payee relationships
- Multiple payment support
- Historical transaction tracking

### 4. Administrative Controls

#### 4.1 Role-Based Access
- Credit Union admin roles
- System admin roles
- Role-specific permissions
- Action audit logging

#### 4.2 Operational Controls
- Payment state management
- Exception handling
- Reprocessing rules
- Notification requirements

### 5. System Integrity Rules

#### 5.1 Data Consistency
- Transaction atomicity
- State transition validation
- History preservation
- Audit trail maintenance

#### 5.2 Security Rules
- Authentication required for all operations
- Authorization based on role matrix
- Sensitive data encryption
- Session management

## Implementation Considerations

### Non-Standard Features
1. Business day calculation logic
2. Payment state machine implementation
3. Complex recurring payment scheduling
4. Multi-level approval workflows
5. Audit history tracking
6. Exception handling and recovery
7. Notification system integration

### Critical Validations
1. Account number format validation
2. Payment amount limits
3. Processing window restrictions
4. Member status checks
5. Payee status validation
6. Role-based operation limits

### Integration Requirements
1. Banking system interfaces
2. Notification services
3. Audit logging system
4. Business day calendar service
5. Payment processing gateway

## Migration Notes

### Data Migration Considerations
1. Preserve all historical payment records
2. Maintain audit trails
3. Keep member-payee relationships
4. Preserve payment schedules
5. Retain security configurations

### API Compatibility
1. Support legacy API patterns during transition
2. Maintain backward compatibility where needed
3. Provide migration endpoints
4. Support bulk operations
5. Handle legacy data formats
