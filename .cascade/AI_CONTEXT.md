# AI Context Guide

## Purpose
```yaml
intent: "Guide AI interaction with the meta layer"
problem: "AI needs to understand how to use the meta layer effectively"
solution: "Clear guidelines for AI behavior and meta layer usage"
```

## AI Interaction Guidelines
```yaml
core_directive: |
  Focus strictly on the USER's explicit request.
  Do not suggest enhancements or improvements unless specifically asked.

response_constraints:
  - "Only answer what is asked"
  - "Do not propose additional features"
  - "Do not suggest optimizations unless requested"
  - "Do not introduce new patterns without explicit approval"
  - "Do not expand scope beyond immediate task"

enhancement_protocol:
  when_to_suggest:
    - "USER explicitly asks for improvements"
    - "Critical security issue is detected"
    - "Breaking change would occur without modification"
  
  when_not_to_suggest:
    - "Task is already well-defined"
    - "Current implementation is functional"
    - "Enhancement is purely optional"
    - "Change would expand system scope"

security_exception: |
  Critical security issues may be flagged immediately,
  even without explicit request, following the principle
  of responsible disclosure.
```

## Meta Layer Usage
```yaml
file_purposes:
  RULES.md: "Contains all workspace rules and validation requirements"
  DRIFT.md: "Contains drift prevention and consistency mechanisms"
  ESSENTIAL.md: "Contains inheritable patterns"

load_order:
  1: "RULES.md - Contains all workspace rules and validation requirements"
  2: "DRIFT.md - Contains drift prevention and consistency mechanisms"
  3: "ESSENTIAL.md - Contains inheritable patterns"
  4: "Project-specific meta layers (as defined in META_CONFIG.md)"
  5: "META_CONFIG.md - Load configuration for meta layer structure and project integration"

meta_layer_loading:
  config_file: "META_CONFIG.md"
  load_timing: "last"
  purpose: "Define meta layer structure and relationships"
  rationale: |
    Loading META_CONFIG.md last ensures all core files are loaded
    before attempting to integrate project-specific meta layers.
    This prevents any premature loading of project rules.
  responsibilities:
    - "Project meta layer integration"
    - "Load order management"
    - "Inheritance rules"
    - "Validation requirements"

validation_process:
  - "Check rules before suggesting changes"
  - "Verify drift prevention before modifications"
  - "Consult patterns for implementation guidance"
```

## Debug Mode
```yaml
temporary_debug:
  enabled: true
  purpose: "Verify meta layer loading behavior"
  required_acknowledgments:
    - type: "load_confirmation"
      format: "[META_LOAD] {component} loaded at {timestamp}"
      components:
        - "RULES.md"
        - "DRIFT.md"
        - "ESSENTIAL.md"
        - "META_CONFIG.md"
        - "Project meta layers"
      log_to: ".cascade/metrics/tracker.jsonl"
    
    - type: "component_reference"
      format: "[META_REF] Applying {component}:{rule} at {timestamp}"
      when: "Any meta layer component is referenced or applied"
      log_to: ".cascade/metrics/tracker.jsonl"

  removal_criteria:
    - "Consistent loading patterns observed"
    - "No unexpected load order issues"
    - "Proper component referencing verified"
    - "Project meta layer integration confirmed"
