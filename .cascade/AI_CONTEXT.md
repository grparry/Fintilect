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
  "legacy/legacy-analysis/README.md": "Documents legacy analysis structure and usage"

validation_process:
  - "Check rules before suggesting changes"
  - "Verify drift prevention before modifications"
  - "Consult patterns for implementation guidance"
```

## Meta Layer Events
```yaml
event_logging:
  location: ".cascade/metrics/tracker.jsonl"
  events:
    meta_load: "[META_LOAD] {component} loaded at {timestamp}"
    meta_ref: "[META_REF] Applying {component}:{rule} at {timestamp}"
```

## Template Usage
```yaml
template_application:
  directory: ".cascade/templates"
  when_to_use:
    - "Creating new patterns"
    - "Documenting architectural decisions"
    - "Defining pattern relationships"
    - "Requesting new patterns"

  validation_requirements:
    pattern.md:
      - "Use for all new pattern definitions"
      - "Ensure all required frontmatter fields"
      - "Include clear purpose and context"
      - "Define relationships with other patterns"
    
    decision.md:
      - "Use for architectural decisions"
      - "Include impact analysis"
      - "Reference affected patterns"
      - "Document alternatives considered"
    
    relationship.md:
      - "Use when defining pattern interactions"
      - "Ensure bidirectional relationships"
      - "Document impact and constraints"
    
    PATTERN_NEEDED.md:
      - "Use when identifying pattern gaps"
      - "Document use cases and requirements"
      - "Justify pattern necessity"

  enforcement:
    strict_requirements:
      - "Always use appropriate template"
      - "Fill all required sections"
      - "Maintain consistent format"
      - "Include all metadata"
    
    exceptions:
      - "Emergency hotfixes (temporary)"
      - "Debugging patterns (temporary)"
```

## Debug Mode
```yaml
temporary_debug:
  enabled: true
  purpose: "Track meta layer events"
