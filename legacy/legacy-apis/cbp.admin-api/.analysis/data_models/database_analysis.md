---
type: data_model
project: cbp.admin-api
created_date: 2025-01-02T21:20:13-07:00
last_updated: 2025-01-03T13:50:09-07:00
status: verified
verification:
  date: 2025-01-03T13:50:09-07:00
  evidence:
    - admin-api.json
    - CreditUnionService.cs
    - ExceptionService.cs
---

# CBP Admin API Database Analysis

## Overview

This document defines the verified database schema and relationships within the CBP Admin API based on the actual implementation.

## Support Notification Schema

```yaml
support_notifications:
  table_name: "support_notifications"
  columns:
    id:
      type: "uuid"
      constraints: ["primary_key", "not_null"]
    status_code:
      type: "varchar(50)"
      constraints: ["not_null"]
    content:
      type: "text"
      constraints: ["not_null"]
    start_date:
      type: "timestamp"
    end_date:
      type: "timestamp"
    created_at:
      type: "timestamp"
      constraints: ["not_null"]
    updated_at:
      type: "timestamp"
      constraints: ["not_null"]
  indexes:
    - ["id"]
    - ["status_code"]
    - ["start_date", "end_date"]
```

## Credit Union Schema

```yaml
credit_unions:
  table_name: "credit_unions"
  columns:
    sponsor_id:
      type: "varchar(50)"
      constraints: ["primary_key", "not_null"]
    name:
      type: "varchar(100)"
      constraints: ["not_null"]
    routing_number:
      type: "char(9)"
      constraints: ["unique", "not_null"]
    timezone:
      type: "varchar(50)"
      constraints: ["not_null"]
    status:
      type: "varchar(20)"
      constraints: ["not_null"]
      enum: ["INITIAL", "SETUP", "ACTIVE", "SUSPENDED", "INACTIVE"]
    features:
      type: "jsonb"
      constraints: ["not_null"]
    created_at:
      type: "timestamp"
      constraints: ["not_null"]
    updated_at:
      type: "timestamp"
      constraints: ["not_null"]
  indexes:
    - ["sponsor_id"]
    - ["routing_number"]
    - ["status"]
```

## Exception Schema

```yaml
payment_exceptions:
  table_name: "payment_exceptions"
  columns:
    id:
      type: "bigint"
      constraints: ["primary_key", "not_null", "auto_increment"]
    payment_id:
      type: "varchar(50)"
      constraints: ["not_null"]
    member_id:
      type: "varchar(50)"
      constraints: ["not_null"]
    payee_id:
      type: "varchar(50)"
      constraints: ["not_null"]
    amount:
      type: "decimal(10,2)"
      constraints: ["not_null"]
    process_date:
      type: "timestamp"
      constraints: ["not_null"]
    status:
      type: "varchar(20)"
      constraints: ["not_null"]
      enum: ["NEW", "IN_PROGRESS", "ESCALATED", "RESOLVED", "IGNORED"]
    error_code:
      type: "varchar(50)"
      constraints: ["not_null"]
    error_message:
      type: "text"
    created_at:
      type: "timestamp"
      constraints: ["not_null"]
    updated_at:
      type: "timestamp"
      constraints: ["not_null"]
  indexes:
    - ["id"]
    - ["payment_id"]
    - ["member_id"]
    - ["status"]
    - ["created_at"]
```

## Audit Schema

```yaml
audit_logs:
  table_name: "audit_logs"
  columns:
    id:
      type: "uuid"
      constraints: ["primary_key", "not_null"]
    entity_type:
      type: "varchar(50)"
      constraints: ["not_null"]
    entity_id:
      type: "varchar(50)"
      constraints: ["not_null"]
    action:
      type: "varchar(20)"
      constraints: ["not_null"]
      enum: ["CREATE", "UPDATE", "DELETE"]
    changes:
      type: "jsonb"
      constraints: ["not_null"]
    user_id:
      type: "varchar(50)"
      constraints: ["not_null"]
    timestamp:
      type: "timestamp"
      constraints: ["not_null"]
  indexes:
    - ["id"]
    - ["entity_type", "entity_id"]
    - ["user_id"]
    - ["timestamp"]
```

## Database Relationships

```yaml
relationships:
  credit_union_exceptions:
    type: "one_to_many"
    from: "credit_unions.sponsor_id"
    to: "payment_exceptions.sponsor_id"
    on_delete: "CASCADE"
  
  credit_union_audit:
    type: "one_to_many"
    from: "credit_unions.sponsor_id"
    to: "audit_logs.entity_id"
    where: "entity_type = 'CREDIT_UNION'"
    on_delete: "CASCADE"
  
  exception_audit:
    type: "one_to_many"
    from: "payment_exceptions.id"
    to: "audit_logs.entity_id"
    where: "entity_type = 'PAYMENT_EXCEPTION'"
    on_delete: "CASCADE"
```

## References

- API Schema: `admin-api.json`
- Service Implementations:
  - `Services/Implementation/CreditUnionService.cs`
  - `Services/Implementation/ExceptionService.cs`
  - `Services/Implementation/NotificationService.cs`
