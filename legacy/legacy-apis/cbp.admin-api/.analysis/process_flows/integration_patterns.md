---
type: integration_pattern
project: cbp.admin-api
created_date: 2025-01-02T21:15:59-07:00
status: in_progress
references:
  - ../../admin-api.json
  - ../../Services/Implementation/ExceptionService.cs
  - ../../Services/Implementation/FisApiService.cs
---

# CBP Admin API Integration Patterns

## Overview

This document outlines the integration patterns used in the CBP Admin API for interacting with external systems and internal components.

## External System Integration

### FIS Integration

```yaml
fis_integration:
  pattern: "Gateway Service"
  implementation: "FisApiService"
  
  operations:
    get_payee:
      type: "synchronous"
      retry: true
      timeout: "30s"
    
    search_payee:
      type: "synchronous"
      retry: true
      timeout: "45s"
    
    validate_payee:
      type: "synchronous"
      retry: true
      timeout: "30s"
  
  error_handling:
    retry_policy:
      max_attempts: 3
      backoff: "exponential"
      initial_delay: "1s"
    
    circuit_breaker:
      failure_threshold: 5
      reset_timeout: "60s"
```

### Database Integration

```yaml
database_integration:
  pattern: "Repository"
  implementation: "WarehouseGenericRepository"
  
  repositories:
    payment_exception:
      type: "Entity Framework"
      operations:
        - "CRUD"
        - "Batch"
        - "Query"
    
    credit_union:
      type: "Entity Framework"
      operations:
        - "CRUD"
        - "Query"
    
    support_notification:
      type: "Entity Framework"
      operations:
        - "CRUD"
        - "Query"
```

## Internal Integration Patterns

### Service Layer Pattern

```yaml
service_layer:
  pattern: "Interface-based Services"
  scope: "Scoped per request"
  
  principles:
    - "Dependency Injection"
    - "Interface Segregation"
    - "Single Responsibility"
  
  services:
    exception_service:
      interface: "IExceptionService"
      implementation: "ExceptionService"
      dependencies:
        - "IWarehouseGenericRepository<PaymentException>"
        - "IMapper"
        - "ILogger"
    
    credit_union_service:
      interface: "ICreditUnionService"
      implementation: "CreditUnionService"
      dependencies:
        - "IWarehouseGenericRepository<CreditUnion>"
        - "IMapper"
        - "ILogger"
```

### Message Patterns

```yaml
message_patterns:
  request_response:
    pattern: "Synchronous Request-Response"
    implementation: "HTTP/REST"
    formats:
      - "JSON"
    
    status_codes:
      success:
        - 200: "OK"
        - 201: "Created"
      client_error:
        - 400: "Bad Request"
        - 404: "Not Found"
        - 409: "Conflict"
      server_error:
        - 500: "Internal Server Error"
    
    error_handling:
      standardization:
        format: "Problem Details"
        fields:
          - "status"
          - "title"
          - "detail"
          - "type"
```

## Data Integration Patterns

### Data Mapping

```yaml
data_mapping:
  pattern: "Object-Relational Mapping"
  implementation: "AutoMapper"
  
  mapping_profiles:
    exception_profile:
      source: "PaymentException"
      target: "ExceptionResponse"
      custom_mappings:
        - source: "Exception"
          target: "Response"
    
    credit_union_profile:
      source: "CreditUnion"
      target: "CreditUnionResponse"
```

### Data Validation

```yaml
data_validation:
  pattern: "Validator"
  implementation: "Model Validation"
  
  validation_rules:
    credit_union:
      sponsor_id:
        - "Required"
        - "Unique"
      routing_number:
        - "Required"
        - "Format: ABA"
    
    exception:
      correction_type:
        - "Required"
        - "Enum Values"
```

## Caching Patterns

```yaml
caching_patterns:
  distributed_cache:
    pattern: "Distributed Cache"
    implementation: "Redis"
    
    cache_policies:
      credit_union:
        ttl: "15m"
        sliding: true
      
      global_payee:
        ttl: "30m"
        sliding: true
      
      support_notification:
        ttl: "5m"
        sliding: false
```

## Security Integration

### Authentication

```yaml
authentication:
  pattern: "Token-based Authentication"
  implementation: "JWT"
  
  token_handling:
    validation:
      - "Signature"
      - "Expiration"
      - "Issuer"
      - "Audience"
    
    claims:
      - "sub"
      - "role"
      - "scope"
```

### Authorization

```yaml
authorization:
  pattern: "Role-based Access Control"
  implementation: "Policy-based Authorization"
  
  policy_handlers:
    credit_union_admin:
      requirements:
        - "ValidRole"
        - "SponsorIdMatch"
    
    support_manager:
      requirements:
        - "ValidRole"
        - "SupportScope"
```

## Logging and Monitoring

### Logging

```yaml
logging:
  pattern: "Structured Logging"
  implementation: "ILogger<T>"
  
  log_levels:
    - "Information"
    - "Warning"
    - "Error"
    - "Critical"
  
  contexts:
    - "CorrelationId"
    - "UserContext"
    - "RequestPath"
```

### Metrics

```yaml
metrics:
  pattern: "Application Metrics"
  implementation: "Prometheus"
  
  metric_types:
    counters:
      - "exception_count"
      - "api_requests"
    
    gauges:
      - "active_sessions"
      - "queue_depth"
    
    histograms:
      - "response_time"
      - "processing_duration"
```

## References

- API Specification: `admin-api.json`
- Service Implementations:
  - `ExceptionService.cs`
  - `FisApiService.cs`
