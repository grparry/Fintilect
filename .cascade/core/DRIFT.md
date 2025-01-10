# Drift Prevention Rules

## Purpose
This file defines specific rules and triggers to prevent architectural and implementation drift across projects. These rules are automatically enforced and guide development decisions.

## API Design
### Endpoint Structure
- Follow RESTful principles
- Use consistent URL patterns
- Maintain versioning strategy
- Document all endpoints

### Response Format
- Consistent error response structure
- Standard success patterns
- Clear status codes
- Type-safe responses

### Type Requirements
- Strong type definitions for all endpoints
- Shared interface definitions
- Consistent type usage
- Version-controlled types

## Code Organization
### Project Structure
- Follow established directory layout
- Maintain module boundaries
- Use consistent naming
- Document organization

### Module Boundaries
- Clear separation of concerns
- Explicit dependencies
- Minimal coupling
- Well-defined interfaces

### File Organization
- Consistent naming patterns
- Logical grouping
- Clear purpose per file
- Documented structure

## Trigger Conditions
### API Changes
- New endpoint creation
- Response format modification
- Contract changes
- Version updates

### Type System
- Type definition changes
- Interface modifications
- Type boundary changes
- Version updates

### Structure Changes
- Directory organization
- Module boundaries
- File organization
- Dependency changes

## Enforcement
### Validation
- Automatic pattern checking
- Structure validation
- Type consistency
- Contract verification
- Testing framework compliance (see DRIFT_TESTING.md)

### Monitoring
- Pattern adherence
- Drift indicators
- Performance metrics
- Usage statistics

### Correction
- Pattern guidance
- Correction suggestions
- Reference examples
- Best practices

## Metrics and Tracking
### Selective Logging
```yaml
metrics_file: ".cascade/metrics/tracker.jsonl"
update_policy:
  principle: "Log only meta layer events"
  triggers:
    - "Meta layer pattern application"
    - "Meta layer rule enforcement"
    - "Meta layer decision recording"
  excluded:
    - "General workspace changes"
    - "Project-specific updates"
    - "Non-meta layer modifications"
  
rationale: |
  The metrics tracker should focus exclusively on meta layer operations
  to maintain clear signal-to-noise ratio in our metrics data.
  General workspace changes should be tracked through version control.
