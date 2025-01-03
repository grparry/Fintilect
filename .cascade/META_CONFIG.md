# Meta Layer Configuration

## Project Meta Layer Integration
```yaml
project_meta_layers:
  - project: "cbp-admin"
    meta_path: ".cascade"
    load_priority: 1
    load_strategy: "lazy"
    load_triggers:
      - "File edit attempted in project directory"
      - "Pattern reference from project namespace"
      - "Explicit request for project-specific rules"
    validation:
      - "Patterns must conform to workspace rules"
      - "Project-specific patterns inherit from workspace patterns"
      - "Project meta layer must not override core workspace rules"

load_order:
  1. workspace_core:
     - ".cascade/core/RULES.md"
     - ".cascade/core/DRIFT.md"
     - ".cascade/patterns/ESSENTIAL.md"
  
  2. project_specific:
     lazy_load: true
     trigger_conditions:
       - "Edit operation in project scope"
       - "Pattern lookup in project namespace"
       - "Explicit project rule reference"
     paths:
       - "cbp-admin/.cascade/patterns/**/*"
       - "cbp-admin/.cascade/rules/**/*"
       - "cbp-admin/.cascade/decisions/**/*"

inheritance_rules:
  - "Project patterns must extend workspace patterns"
  - "Project-specific rules must not conflict with workspace rules"
  - "Project meta layer inherits workspace drift prevention"
  - "Project-specific decisions must align with workspace guidelines"

validation_checks:
  pattern_inheritance:
    - "Verify pattern extension hierarchy"
    - "Check for conflicting pattern definitions"
    - "Ensure proper pattern documentation"
  
  rule_compliance:
    - "Validate against workspace rules"
    - "Check for rule conflicts"
    - "Verify rule documentation"
  
  drift_prevention:
    - "Apply workspace drift prevention"
    - "Monitor pattern usage"
    - "Track decision compliance"
```

## Meta Layer Relationships
```yaml
workspace_to_project:
  type: "hierarchical"
  direction: "top-down"
  inheritance: "explicit"
  override_policy: "restricted"
  loading_strategy: "lazy"
  loading_optimization:
    principle: "Load only when needed"
    cache_policy: "Keep loaded until workspace reload"
    memory_management: "Unload if unused for 30 minutes"

validation_frequency:
  pattern_check: "on_change"
  rule_validation: "on_load"
  drift_monitoring: "continuous"
```
