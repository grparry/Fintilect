---
type: metrics_model
project: cbp.admin-api
created_date: 2025-01-02T21:17:37-07:00
status: in_progress
references:
  - ../../admin-api.json
  - ../../Services/Implementation/ExceptionService.cs
  - ../../Services/Implementation/CreditUnionService.cs
---

# CBP Admin API Metrics

## Overview

This document defines the metrics and monitoring requirements for the CBP Admin API.

## Operational Metrics

### API Performance

```yaml
api_performance:
  response_time:
    metric: "request_duration_ms"
    type: "histogram"
    labels:
      - "endpoint"
      - "method"
      - "status_code"
    thresholds:
      p95: "500ms"
      p99: "1000ms"
  
  request_rate:
    metric: "request_count"
    type: "counter"
    labels:
      - "endpoint"
      - "method"
    thresholds:
      warning: "1000/minute"
      critical: "2000/minute"
  
  error_rate:
    metric: "error_count"
    type: "counter"
    labels:
      - "endpoint"
      - "error_type"
    thresholds:
      warning: "1%"
      critical: "5%"
```

### Service Health

```yaml
service_health:
  availability:
    metric: "service_up"
    type: "gauge"
    labels:
      - "service"
      - "environment"
    thresholds:
      warning: "99%"
      critical: "95%"
  
  dependency_health:
    metric: "dependency_status"
    type: "gauge"
    labels:
      - "dependency"
      - "type"
    dependencies:
      - "Database"
      - "FIS API"
      - "Cache"
```

## Business Metrics

### Exception Management

```yaml
exception_metrics:
  volume:
    metric: "exception_count"
    type: "counter"
    labels:
      - "type"
      - "credit_union"
    thresholds:
      warning: "100/hour"
      critical: "500/hour"
  
  resolution_time:
    metric: "exception_resolution_time"
    type: "histogram"
    labels:
      - "type"
      - "priority"
    thresholds:
      warning: "24h"
      critical: "48h"
  
  resolution_rate:
    metric: "exception_resolution_rate"
    type: "gauge"
    labels:
      - "type"
      - "credit_union"
    thresholds:
      warning: "80%"
      critical: "60%"
```

### Credit Union Management

```yaml
credit_union_metrics:
  onboarding:
    metric: "cu_onboarding_time"
    type: "histogram"
    labels:
      - "size"
      - "region"
    thresholds:
      warning: "48h"
      critical: "72h"
  
  configuration_changes:
    metric: "cu_config_changes"
    type: "counter"
    labels:
      - "type"
      - "credit_union"
    thresholds:
      warning: "10/day"
      critical: "50/day"
```

## Security Metrics

### Authentication

```yaml
auth_metrics:
  login_attempts:
    metric: "login_attempts"
    type: "counter"
    labels:
      - "status"
      - "role"
    thresholds:
      failed_attempts: "5/hour"
  
  active_sessions:
    metric: "active_sessions"
    type: "gauge"
    labels:
      - "role"
      - "credit_union"
    thresholds:
      warning: "100"
      critical: "200"
```

### Authorization

```yaml
authorization_metrics:
  permission_denials:
    metric: "permission_denials"
    type: "counter"
    labels:
      - "role"
      - "resource"
    thresholds:
      warning: "10/hour"
      critical: "50/hour"
  
  role_changes:
    metric: "role_changes"
    type: "counter"
    labels:
      - "old_role"
      - "new_role"
    thresholds:
      warning: "5/day"
```

## Performance Metrics

### Database

```yaml
database_metrics:
  query_time:
    metric: "query_duration_ms"
    type: "histogram"
    labels:
      - "operation"
      - "table"
    thresholds:
      p95: "100ms"
      p99: "500ms"
  
  connection_pool:
    metric: "db_connections"
    type: "gauge"
    labels:
      - "state"
      - "pool"
    thresholds:
      warning: "80%"
      critical: "90%"
```

### External Services

```yaml
external_metrics:
  fis_api:
    response_time:
      metric: "fis_request_duration_ms"
      type: "histogram"
      labels:
        - "operation"
        - "status"
      thresholds:
        p95: "1000ms"
        p99: "2000ms"
    
    error_rate:
      metric: "fis_error_count"
      type: "counter"
      labels:
        - "operation"
        - "error_type"
      thresholds:
        warning: "5%"
        critical: "10%"
```

## Resource Metrics

### Memory Usage

```yaml
memory_metrics:
  heap_usage:
    metric: "heap_bytes"
    type: "gauge"
    labels:
      - "generation"
      - "pool"
    thresholds:
      warning: "80%"
      critical: "90%"
  
  gc_metrics:
    metric: "gc_collection_seconds"
    type: "histogram"
    labels:
      - "generation"
    thresholds:
      warning: "100ms"
      critical: "500ms"
```

### Thread Pool

```yaml
thread_metrics:
  thread_pool:
    metric: "threadpool_threads"
    type: "gauge"
    labels:
      - "state"
      - "pool"
    thresholds:
      warning: "80%"
      critical: "90%"
  
  queue_length:
    metric: "threadpool_queue_length"
    type: "gauge"
    labels:
      - "pool"
    thresholds:
      warning: "100"
      critical: "500"
```

## Alert Rules

### Critical Alerts

```yaml
critical_alerts:
  - name: "High Error Rate"
    condition: "error_rate > 5%"
    duration: "5m"
    channels:
      - "pagerduty"
      - "email"
  
  - name: "Service Unavailable"
    condition: "service_up == 0"
    duration: "1m"
    channels:
      - "pagerduty"
      - "slack"
```

### Warning Alerts

```yaml
warning_alerts:
  - name: "Elevated Response Time"
    condition: "p95_response_time > 500ms"
    duration: "10m"
    channels:
      - "email"
      - "slack"
  
  - name: "High Exception Volume"
    condition: "exception_count > 100/hour"
    duration: "1h"
    channels:
      - "email"
```

## References

- API Specification: `admin-api.json`
- Service Implementations:
  - `ExceptionService.cs`
  - `CreditUnionService.cs`
