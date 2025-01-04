---
type: pattern
category: legacy_analysis
status: active
priority: critical
last_updated: 2025-01-03T12:55:18-07:00
risk_level: extreme
failure_impact: "Missing business rules during reimplementation"
---

# Critical Business Rule Detection Pattern

## Core Principle
Every undetected business rule represents a critical risk to reimplementation success.

## Detection Strategy

### 1. Source Analysis Layers
```yaml
required_analysis:
  api_specification:
    priority: high
    artifacts:
      - OpenAPI specifications
      - API documentation
      - Error codes and descriptions
  
  implementation:
    priority: high
    artifacts:
      - Request handling
      - Response formatting
      - Error handling
      - Data transformations
  
  configuration:
    priority: high
    artifacts:
      - System configurations
      - Feature flags
      - Environment settings
  
  integration:
    priority: high
    artifacts:
      - Integration patterns
      - External system dependencies
      - Data mapping rules
```

### 2. Business Rule Categories
```yaml
categories:
  validation_rules:
    scope:
      - Input validation
      - Business constraints
      - Data integrity rules
    risk: critical

  processing_rules:
    scope:
      - Calculation logic
      - Data transformation
      - Business algorithms
    risk: critical

  state_transitions:
    scope:
      - Status changes
      - Workflow rules
      - Process sequences
    risk: critical

  timing_rules:
    scope:
      - Calendar rules
      - Scheduling logic
      - Time-based constraints
    risk: critical

  exception_handling:
    scope:
      - Business exceptions
      - Error responses
      - Recovery procedures
    risk: critical

  integration_rules:
    scope:
      - External system requirements
      - Data mapping
      - Protocol requirements
    risk: critical

  configuration_rules:
    scope:
      - System settings
      - Feature controls
      - Environmental rules
    risk: critical
```

### 3. Detection Process
```yaml
process:
  api_contract_analysis:
    steps:
      - Analyze each endpoint
      - Document request/response rules
      - Map error conditions
      - Identify hidden constraints
    verification: mandatory

  implementation_analysis:
    steps:
      - Review processing logic
      - Map data transformations
      - Document business algorithms
      - Identify edge cases
    verification: mandatory

  integration_analysis:
    steps:
      - Map system interactions
      - Document dependencies
      - Identify protocol requirements
    verification: mandatory
```

### 4. Risk Matrix
```yaml
risk_levels:
  critical:
    description: "Must not miss - core business functionality"
    impact: "Direct business impact"
    detection: "Multiple verification required"
    
  important:
    description: "Should not miss - significant functionality"
    impact: "Significant operational impact"
    detection: "Thorough verification required"
    
  standard:
    description: "Good to preserve - basic functionality"
    impact: "Minor operational impact"
    detection: "Standard verification required"
```

## Implementation Guidelines

1. Always assume additional rules exist
2. Question every implementation detail
3. Document uncertainty for further investigation
4. Maintain cross-references between related rules
5. Validate findings with domain experts when possible

## Verification Requirements

### Primary Verification
- API specification review
- Implementation code analysis
- Integration pattern analysis

### Secondary Verification
- Configuration analysis
- Error handling review
- State transition mapping

## Documentation Requirements

1. Each rule must include:
   - Source reference
   - Business impact
   - Risk level
   - Verification method
   - Related rules
   - Implementation considerations

2. Cross-reference matrix:
   - Rule dependencies
   - Impact chains
   - Integration points

## Quality Metrics

```yaml
metrics:
  coverage:
    - All endpoints analyzed
    - All error conditions mapped
    - All configurations reviewed
    - All integrations documented
    
  verification:
    - Primary verification complete
    - Secondary verification complete
    - Cross-references validated
    
  documentation:
    - All rules documented
    - All impacts assessed
    - All dependencies mapped
```
