# Core Workspace Rules

## Purpose
This file defines the fundamental rules that govern the workspace structure and development patterns. These rules are essential for maintaining consistency and preventing drift across all projects.

## Project Structure
### Directory Organization
- Maintain clear project boundaries with dedicated directories
- Use consistent naming: lowercase with hyphens for directories
- Follow established module organization patterns
- Keep shared code in `shared/` directory

### Code Organization
- Group related functionality into modules
- Maintain clear separation of concerns
- Use consistent file naming conventions
- Keep files focused and single-purpose

## Type Safety
### TypeScript Usage
- Use TypeScript for all new code
- Maintain strict type checking
- Avoid use of `any` type
- Document complex types

### Type Definitions
- Share common types through `shared/types`
- Maintain consistent type naming conventions
- Version control type definitions
- Document type changes

### Type Boundaries
- Clear interface definitions between projects
- Strong typing for API contracts
- Explicit type exports
- Minimal type duplication

## Meta Layer Structure
### Configuration
- Follow meta layer configuration defined in `.cascade/META_CONFIG.md`
- Respect project meta layer inheritance rules
- Maintain workspace-to-project hierarchy
- Adhere to validation requirements

## Meta Layer Tracking
```yaml
tracking_requirements:
  mandatory: true
  scope: "All meta layer interactions"
  events:
    - type: "meta_load"
      when: "Any meta layer file is loaded"
      format: {"timestamp":"$TIME","type":"meta_load","component":"$FILE"}
      
    - type: "meta_ref"
      when: "Any meta layer rule is referenced"
      format: {"timestamp":"$TIME","type":"meta_ref","component":"$FILE","rule":"$RULE"}
      
  behavior:
    - "Update tracker.jsonl silently on every meta layer interaction"
    - "No conversation output about tracking updates"
    - "No user confirmation required"
    - "Update must occur before responding to user"
    
  validation:
    - "Every meta layer interaction must have a corresponding tracker entry"
    - "Timestamps must match interaction time"
    - "All fields must be properly populated"
```

## Timeline Expression Rules

### No Human Time Units in Project Plans
```yaml
rule_id: TIMELINE_001
type: workspace_rule
severity: error
scope: project_plans
description: "Project plans must use story points or precise work units instead of human time units"
validation:
  disallowed_terms:
    - "days"
    - "weeks"
    - "months"
  required_units:
    - "story points"
    - "work units"
    - "effort points"
```

## Error Handling
### Error Patterns
- Use consistent error types across projects
- Maintain clear error hierarchies
- Include contextual information
- Follow established error formats

### Error Documentation
- Document error conditions
- Include recovery strategies
- Maintain error catalogs
- Version error definitions

### Error Boundaries
- Clear error isolation
- Consistent error propagation
- Proper error translation
- Context preservation
