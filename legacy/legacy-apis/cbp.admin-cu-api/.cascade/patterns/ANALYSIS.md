# CBP Admin CU API Analysis Patterns

## Purpose
This file defines specific patterns for analyzing and documenting the CBP Admin CU API, with a focus on preventing speculative analysis and maintaining documentation accuracy.

## Analysis Patterns
### State Machine Documentation
```yaml
state_machine_patterns:
  required_evidence:
    api_spec:
      - "Endpoint definition"
      - "Request/response schemas"
      - "Error definitions"
    
    implementation:
      - "State handling code"
      - "Transition logic"
      - "Validation rules"
    
    business_rules:
      - "Documented constraints"
      - "Validation requirements"
      - "Processing rules"
    
    tests:
      - "State transition tests"
      - "Validation tests"
      - "Error handling tests"
  
  documentation_requirements:
    metadata:
      - "Last verified: {timestamp}"
      - "API version: {version}"
      - "Evidence links: {links}"
      - "Confidence: {level}"
    
    state_definition:
      required_fields:
        - "Description (from API/code)"
        - "Allowed transitions (verified)"
        - "Validation rules (documented)"
      
      optional_fields:
        - "Implementation notes"
        - "Known limitations"
        - "Future enhancements"
    
    transition_definition:
      required_fields:
        - "Trigger (API endpoint)"
        - "Guards (verified rules)"
        - "Actions (implemented)"
      
      optional_fields:
        - "Error handling"
        - "Performance notes"
        - "Dependencies"
```

### Integration Pattern Documentation
```yaml
integration_patterns:
  required_evidence:
    endpoints:
      - "API specification match"
      - "Implementation verification"
      - "Error handling coverage"
    
    business_rules:
      - "Documented requirements"
      - "Validation rules"
      - "Processing constraints"
    
    testing:
      - "Integration tests"
      - "Error scenario tests"
      - "Performance tests"
  
  documentation_requirements:
    metadata:
      - "Last verified: {timestamp}"
      - "API version: {version}"
      - "Test coverage: {percentage}"
      - "Confidence: {level}"
    
    pattern_definition:
      required_fields:
        - "Pattern name (documented)"
        - "Implementation evidence"
        - "Test coverage"
      
      optional_fields:
        - "Performance characteristics"
        - "Known limitations"
        - "Future enhancements"
```

## Verification Process
### Documentation Review
1. Check API specification
   - Endpoint exists
   - Schema matches
   - Error codes defined

2. Verify Implementation
   - State handling code
   - Transition logic
   - Validation rules

3. Validate Business Rules
   - Documented constraints
   - Processing rules
   - Validation requirements

4. Review Test Coverage
   - State transitions
   - Error scenarios
   - Integration tests

### Confidence Levels
```yaml
confidence_levels:
  verified:
    description: "Fully verified in source"
    requirements:
      - "API endpoint documented"
      - "Implementation confirmed"
      - "Tests exist"
      - "Business rules documented"
  
  partial:
    description: "Partially verified"
    requirements:
      - "Some implementation found"
      - "Gaps in documentation"
      - "Limited test coverage"
  
  speculative:
    description: "Needs verification"
    requirements:
      - "No direct evidence"
      - "Based on patterns"
      - "Missing tests"
```

## Implementation Guidelines
### Documentation Updates
1. Always start with API spec
2. Verify implementation exists
3. Check test coverage
4. Document with evidence

### Review Process
1. Cross-reference all sources
2. Mark confidence levels
3. Document gaps clearly
4. Update regularly

### Metadata Management
1. Track verification dates
2. Link to evidence
3. Note confidence levels
4. Record review history

## References
- API Specification: `admin-cu-api.json`
- Implementation: `cbp.admin-cu-api/`
- Test Suite: `cbp.admin-cu-api.tests/`
- Business Rules: `.analysis/business_rules/`
