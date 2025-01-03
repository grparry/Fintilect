# Phase Management Pattern
**Created**: 2025-01-02T16:29:44-07:00
**Status**: Active
**Priority**: High
**Category**: Core Framework
**Source**: framework/phase-management.md

## Purpose
Manage development phases in AI-speed development context

## Implementation
```yaml
pattern:
  type: "core_framework"
  scope: "global"
  required: true

lifecycle:
  states:
    - name: "not_started"
      validation: ["dependencies_met"]
    - name: "in_progress"
      validation: ["continuous_compliance"]
    - name: "completed"
      validation: ["objectives_met", "patterns_documented"]
    - name: "validated"
      validation: ["guardrails_verified", "relationships_valid"]

transitions:
  requirements:
    pre:
      - "objectives_defined"
      - "dependencies_satisfied"
      - "patterns_identified"
    post:
      - "objectives_met"
      - "patterns_documented"
      - "relationships_validated"

tracking:
  metrics:
    - "phase_progress"
    - "pattern_compliance"
    - "relationship_integrity"
  frequency: "continuous"
```

## Relationships
```yaml
depends_on:
  - "core/patterns.md"
  - "core/testing.md"
  - "core/security.md"

influences:
  - "implementation/*"
  - "patterns/*"
  - "metrics/*"
```

## Usage
1. Always validate phase entry criteria
2. Track phase state continuously
3. Document pattern evolution
4. Maintain relationship integrity
5. Validate transitions thoroughly

## Validation
```yaml
checks:
  - type: "phase_state"
    frequency: "continuous"
  - type: "pattern_compliance"
    frequency: "per_change"
  - type: "relationship_integrity"
    frequency: "per_transition"
```

## Examples
```yaml
phase_transition:
  pre_check:
    - validate_dependencies()
    - check_patterns()
    - verify_relationships()
  
  execution:
    - track_progress()
    - monitor_compliance()
    - update_relationships()
  
  post_check:
    - validate_completion()
    - document_patterns()
    - verify_integrity()
```
