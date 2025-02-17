# Essential Shared Patterns

## Purpose
This file defines the essential patterns that must be shared and maintained across projects. These patterns ensure consistency and efficiency in development.

## Project Boundaries
### API Context (configuration-api)
#### Design Patterns
- RESTful endpoint design
- Resource-based routing
- Consistent middleware usage
- Error handling patterns

#### Data Validation
- Input validation strategies
- Schema validation
- Type checking
- Error reporting

#### Schema Management
- Database schema patterns
- Migration strategies
- Version control
- Type safety

### Admin Context (cbp-admin)
#### Component Patterns
- React component structure
- Component composition
- State management
- Props interface design

#### State Management
- Redux store organization
- Action patterns
- Reducer structure
- State typing

#### Form Handling
- Form component patterns
- Validation strategies
- Error handling
- State management

## Shared Patterns
### Error Handling
#### Type Hierarchy
- Base error types
- Extended error classes
- Context preservation
- Error translation

### Component Libraries
See COMPONENT_LIBRARIES.md for detailed patterns regarding:
- Testing frameworks (Jest ecosystem)
- UI component libraries (Material UI)
- Backend components (Express, TypeORM)
- Data visualization (@nivo)
- Form handling (react-hook-form)
- Date handling (date-fns)

#### Error Flow
- Error propagation
- Boundary handling
- Context maintenance
- Recovery strategies

### Type System
#### Common Types
- Shared interfaces
- Base types
- Utility types
- Type guards

#### Type Management
- Version control
- Breaking changes
- Migration patterns
- Documentation

### Documentation Patterns
#### Analysis Documentation
```yaml
analysis_patterns:
  source_verification:
    required_evidence:
      - "API specification endpoints"
      - "Existing implementation code"
      - "Business rule documentation"
      - "Test cases"
    
    validation_steps:
      - "Cross-reference with API spec"
      - "Verify against implementation"
      - "Check business rules"
      - "Review test coverage"
    
    documentation_rules:
      - "Only document confirmed features"
      - "Mark speculative content clearly"
      - "Link to source evidence"
      - "Version control documentation"
  
  state_machine_docs:
    required_elements:
      - "API endpoint validation"
      - "Implementation verification"
      - "Business rule confirmation"
      - "Test case correlation"
    
    metadata:
      - "Last verified date"
      - "Evidence links"
      - "Confidence level"
      - "Review status"
    
    review_checklist:
      - "Endpoint exists in API spec"
      - "State transitions implemented"
      - "Business rules documented"
      - "Test coverage exists"
```

#### Integration Documentation
```yaml
integration_patterns:
  documentation_rules:
    source_requirements:
      - "API specification match"
      - "Implementation evidence"
      - "Integration tests"
      - "Error handling"
    
    verification_steps:
      - "API contract validation"
      - "Implementation check"
      - "Test coverage review"
      - "Error scenario verification"
    
    metadata_tracking:
      - "Last verified timestamp"
      - "Evidence references"
      - "Verification status"
      - "Review history"
```

### Verification Patterns
```yaml
verification_patterns:
  source_tracking:
    required_metadata:
      - "Source reference"
      - "Verification date"
      - "Confidence level"
      - "Review status"
    
    evidence_types:
      - "API specification"
      - "Implementation code"
      - "Test coverage"
      - "Business rules"
    
    confidence_levels:
      confirmed:
        description: "Verified in source"
        requirements:
          - "API endpoint exists"
          - "Implementation found"
          - "Tests present"
      
      partial:
        description: "Partially verified"
        requirements:
          - "Some evidence found"
          - "Gaps identified"
          - "Needs review"
      
      speculative:
        description: "Needs verification"
        requirements:
          - "No direct evidence"
          - "Based on patterns"
          - "Requires validation"
    
    review_status:
      - "Verified"
      - "Needs Review"
      - "Speculative"
      - "Deprecated"
```

## Performance
### Loading Strategy
#### Pattern Loading
- Essential first
- Progressive enhancement
- Deferred loading
- Cache management

#### Optimization
- Memory usage
- Load time
- Pattern matching
- Context switching

### Boundary Management
#### Project Scope
- Clear boundaries
- Minimal overlap
- Explicit sharing
- Version control

#### Pattern Isolation
- Project-specific patterns
- Shared patterns
- Override management
- Conflict resolution

## Implementation Guidelines
### Documentation Updates
1. Always include evidence links
2. Verify against source before documenting
3. Mark confidence levels clearly
4. Track review status

### Review Process
1. Cross-reference with API spec
2. Verify implementation exists
3. Check test coverage
4. Document gaps clearly

### Version Control
1. Track documentation versions
2. Link to code versions
3. Maintain change history
4. Review regularly

## References
- API Specifications
- Implementation Code
- Test Suites
- Business Rules
