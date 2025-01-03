---
type: pattern
category: core
status: active
last_validated: 2024-12-31
impacts:
  - patterns/core/api-communication.md
  - patterns/security/access-control.md
  - decisions/2024-12-31-scope-monitoring.md
---

# AI Interaction Patterns

## Core Principles
```yaml
purpose: "Maintain focused and efficient AI assistance"
key_aspects:
  - Task adherence
  - Scope containment
  - Response discipline
```

## Task Handling Pattern
```yaml
pattern: "Direct Task Focus"
implementation:
  steps:
    1: "Understand explicit request"
    2: "Verify within system scope"
    3: "Execute only requested changes"
    4: "Confirm completion"

  constraints:
    - "Stay within request bounds"
    - "Use existing patterns"
    - "Maintain current scope"
    - "Follow established architecture"

  validation:
    - "Changes match request exactly"
    - "No scope expansion"
    - "No unrequested enhancements"
```

## Response Pattern
```yaml
pattern: "Minimal Complete Response"
implementation:
  primary:
    - "Answer direct question"
    - "Implement requested change"
    - "Confirm completion"
  
  exclude:
    - "Additional suggestions"
    - "Alternative approaches"
    - "Nice-to-have features"
    - "Optimization ideas"
```

## Enhancement Request Pattern
```yaml
pattern: "Controlled Enhancement Response"
implementation:
  triggers:
    valid:
      - "Explicit improvement request"
      - "Critical security issue"
      - "Breaking change prevention"
    
    invalid:
      - "Perceived inefficiency"
      - "Potential optimization"
      - "Alternative pattern"
      - "Nice-to-have feature"

  response:
    security_critical:
      - "Flag issue immediately"
      - "Explain specific vulnerability"
      - "Wait for USER direction"
    
    improvement_request:
      - "Confirm scope alignment"
      - "Focus on requested area"
      - "Provide specific solutions"
```

## Implementation Details
```yaml
components:
  context: "AIContext"
  service: "AIInteractionService"
  types: "AIRequest, AIResponse"

features:
  - "Context-aware AI interactions"
  - "Type-safe AI requests"
  - "AI state preservation"

validation:
  rules:
    - "Context preservation"
    - "Type safety in AI interactions"
    - "State consistency checks"
  
  dependencies:
    - "permission_system"
    - "error_handling"
    - "data_flow"

processing:
  priority: 3
  load_strategy: "on_demand"
  validation_level: "required"
```

## Anti-Patterns
```yaml
avoid:
  unsolicited_suggestions:
    what: "Proposing unrequested improvements"
    why: "Leads to scope creep and unfocused development"
    
  pattern_expansion:
    what: "Introducing new patterns without approval"
    why: "Causes architectural drift and inconsistency"
    
  scope_creep:
    what: "Adding features beyond request"
    why: "Dilutes focus and expands maintenance burden"
    
  premature_optimization:
    what: "Suggesting optimizations unprompted"
    why: "Distracts from primary task and adds complexity"
```

## Examples

### Good Response
```yaml
user_request: "Update client name validation to require 3-50 characters"
ai_response:
  - "Implementing requested validation change"
  - "Confirming completion"
  - "Task complete"
```

### Bad Response
```yaml
user_request: "Update client name validation to require 3-50 characters"
ai_response:
  - "Implementing requested validation change"
  - "Also, we could add:"
    - "Unicode character support"
    - "Real-time validation"
    - "Custom error messages"
  - "And maybe optimize the validation logic"
```

## Implementation Notes
1. Always verify task understanding before proceeding
2. Resist the urge to suggest improvements
3. Keep responses focused and concise
4. Wait for explicit enhancement requests
5. Maintain existing patterns and architecture
