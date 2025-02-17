# Error Resolution Patterns

## Core Principles
```yaml
error_resolution_hierarchy:
  priority:
    1: "New code changes in current task scope"
    2: "Direct dependencies of new code"
    3: "Existing code only with explicit approval"
  
  rationale: |
    Errors are most likely caused by recent changes.
    Modifying existing, working code carries high risk
    of unintended consequences and should be avoided
    unless absolutely necessary.
```

## Resolution Strategy
### 1. Identify Error Source
```yaml
source_identification:
  steps:
    1: "Check files modified in current task"
    2: "Check new code added in current task"
    3: "Check direct dependencies of modified code"
    4: "Check interface boundaries with existing code"
  
  bias: |
    Always assume the error originates in new or
    modified code first, before considering issues
    in existing codebase.
```

### 2. Scope Assessment
```yaml
modification_scope:
  allowed:
    - "New files created in current task"
    - "Recently modified files in current task"
    - "Direct interface points with new code"
  
  requires_approval:
    - "Existing utility functions"
    - "Shared interfaces"
    - "Core system components"
    - "Any file not modified in current task"
  
  forbidden:
    - "Legacy code without explicit approval"
    - "Stable core components"
    - "Cross-project dependencies"
```

### 3. Resolution Approach
```yaml
resolution_steps:
  1: "Verify error is in new code"
  2: "Check for type mismatches in new interfaces"
  3: "Validate against existing interfaces"
  4: "Consider adaptation layer if needed"
  5: "Document if existing code must be modified"
```

## Implementation Guidelines
### New Code Changes
```typescript
// PREFER: Adapting new code to match existing interfaces
interface NewComponent {
  // Adapt new code to match existing patterns
  adaptToExisting(): ExistingInterface;
}

// AVOID: Modifying existing interfaces to match new code
interface ExistingInterface {
  // Don't modify existing interfaces without approval
}
```

### Interface Boundaries
```typescript
// PREFER: Creating adaptation layer
class AdaptationLayer {
  constructor(private newComponent: NewComponent) {}
  
  // Adapt new to old without modifying either
  adaptToExisting(): ExistingInterface {
    // Implementation
  }
}

// AVOID: Modifying existing code to accommodate new
class ExistingClass {
  // Don't modify existing classes
}
```

## Error Categories
### Type Errors
```yaml
type_error_resolution:
  priority:
    1: "Check new type definitions"
    2: "Verify interface implementation in new code"
    3: "Consider type adaptation layer"
    4: "Document if existing types must be modified"
```

### Runtime Errors
```yaml
runtime_error_resolution:
  priority:
    1: "Verify new code behavior"
    2: "Check interaction with existing code"
    3: "Consider behavioral adaptation"
    4: "Document if existing behavior must change"
```

## Documentation Requirements
### When Modifying Existing Code
```yaml
documentation_requirements:
  must_include:
    - "Explicit justification for modification"
    - "Why adaptation layer is not sufficient"
    - "Risk assessment of changes"
    - "Test coverage for modified code"
    - "Approval reference if required"
```

Last Updated: 2025-01-09 12:40:21 MST
