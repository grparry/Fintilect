---
type: data_access
project: cbp.admin-cu-api
created_date: 2025-01-02T21:28:27-07:00
status: in_progress
---

# CBP Admin CU API Data Access Patterns

## Overview

This document defines the data access patterns and strategies used within the Credit Union Administrative API.

## Access Patterns

### Credit Union Access

```yaml
credit_union_access:
  patterns:
    retrieve_cu:
      type: "Read"
      frequency: "High"
      pattern: "Key-based lookup"
      query: |
        SELECT * FROM credit_unions 
        WHERE sponsor_id = :sponsor_id
      index: "PRIMARY KEY"
    
    list_active_cus:
      type: "Read"
      frequency: "Medium"
      pattern: "Filtered scan"
      query: |
        SELECT * FROM credit_unions 
        WHERE status = 'ACTIVE'
      index: "idx_cu_status"
    
    update_cu_status:
      type: "Write"
      frequency: "Low"
      pattern: "Single-row update"
      query: |
        UPDATE credit_unions 
        SET status = :status, 
            updated_at = CURRENT_TIMESTAMP 
        WHERE sponsor_id = :sponsor_id
```

### User Access

```yaml
user_access:
  patterns:
    authenticate_user:
      type: "Read"
      frequency: "Very High"
      pattern: "Multi-table join"
      query: |
        SELECT u.*, p.permission_code, p.scope 
        FROM admin_users u 
        LEFT JOIN user_permissions p ON u.user_id = p.user_id 
        WHERE u.email = :email AND u.status = 'ACTIVE'
      indexes: ["idx_users_email", "idx_permissions_user"]
    
    list_cu_users:
      type: "Read"
      frequency: "Medium"
      pattern: "Filtered scan"
      query: |
        SELECT * FROM admin_users 
        WHERE sponsor_id = :sponsor_id
      index: "idx_users_sponsor"
```

### Permission Access

```yaml
permission_access:
  patterns:
    check_permission:
      type: "Read"
      frequency: "Very High"
      pattern: "Key-based lookup"
      query: |
        SELECT * FROM user_permissions 
        WHERE user_id = :user_id 
        AND permission_code = :code
      index: "PRIMARY KEY"
    
    grant_permission:
      type: "Write"
      frequency: "Low"
      pattern: "Insert with conflict"
      query: |
        INSERT INTO user_permissions 
        (user_id, permission_code, scope, granted_by) 
        VALUES (:user_id, :code, :scope, :granter)
        ON CONFLICT (user_id, permission_code) 
        DO UPDATE SET scope = :scope, granted_by = :granter
```

## Caching Strategies

### Application Cache

```yaml
application_cache:
  strategies:
    user_permissions:
      type: "Read-through"
      key_pattern: "perm:{user_id}"
      ttl: "15 minutes"
      invalidation:
        - "Permission grant"
        - "Permission revoke"
    
    credit_union_settings:
      type: "Write-through"
      key_pattern: "settings:{sponsor_id}"
      ttl: "30 minutes"
      invalidation:
        - "Settings update"
```

### Query Cache

```yaml
query_cache:
  strategies:
    active_users:
      type: "Time-based"
      query: "SELECT * FROM admin_users WHERE status = 'ACTIVE'"
      ttl: "5 minutes"
    
    processing_schedule:
      type: "Time-based"
      query: "SELECT * FROM processing_windows WHERE status IN ('SCHEDULED', 'ACTIVE')"
      ttl: "1 minute"
```

## Data Loading

### Bulk Operations

```yaml
bulk_operations:
  patterns:
    user_import:
      type: "Batch insert"
      batch_size: 1000
      query: |
        INSERT INTO admin_users 
        (user_id, sponsor_id, email, role, status) 
        VALUES (:user_id, :sponsor_id, :email, :role, :status)
    
    permission_sync:
      type: "Batch upsert"
      batch_size: 500
      query: |
        INSERT INTO user_permissions 
        (user_id, permission_code, scope, granted_by) 
        VALUES (:user_id, :code, :scope, :granter)
        ON CONFLICT (user_id, permission_code) 
        DO UPDATE SET scope = :scope
```

## Query Optimization

### Common Queries

```yaml
query_optimization:
  patterns:
    user_summary:
      type: "Materialized View"
      refresh: "Daily"
      query: |
        SELECT 
          au.user_id,
          au.sponsor_id,
          au.email,
          au.role,
          COUNT(DISTINCT up.permission_code) as permission_count
        FROM admin_users au
        LEFT JOIN user_permissions up ON au.user_id = up.user_id
        GROUP BY au.user_id, au.sponsor_id, au.email, au.role
    
    active_sessions:
      type: "View"
      query: |
        SELECT 
          us.*,
          au.email,
          au.role
        FROM user_sessions us
        JOIN admin_users au ON us.user_id = au.user_id
        WHERE us.status = 'ACTIVE'
```

### Performance Tuning

```yaml
performance_tuning:
  strategies:
    pagination:
      pattern: "Cursor-based"
      query: |
        SELECT * FROM audit_logs 
        WHERE log_id > :cursor 
        ORDER BY log_id 
        LIMIT :limit
    
    partial_update:
      pattern: "Column-specific"
      query: |
        UPDATE credit_union_settings 
        SET contact_info = jsonb_set(contact_info, :path, :value) 
        WHERE sponsor_id = :sponsor_id
```

## Data Consistency

### Transactions

```yaml
transactions:
  patterns:
    status_change:
      type: "Multi-step"
      isolation: "SERIALIZABLE"
      steps:
        - "Update credit_union status"
        - "Create audit log"
        - "Notify users"
    
    user_deactivation:
      type: "Multi-step"
      isolation: "READ COMMITTED"
      steps:
        - "Update user status"
        - "Terminate active sessions"
        - "Log audit event"
```

### Constraints

```yaml
constraints:
  patterns:
    unique_constraints:
      - table: "credit_unions"
        columns: ["routing_number"]
      
    foreign_keys:
      - table: "admin_users"
        columns: ["sponsor_id"]
        references: "credit_unions(sponsor_id)"
      
    check_constraints:
      - table: "processing_windows"
        check: "end_time > start_time"
```

## References

- API Specification: `api.json`
- Implementation: `cbp.admin-cu-api/`
- Related Systems: `cbp.admin-api/`
