---
type: pattern
category: legacy_analysis
status: active
priority: high
last_validated: 2025-01-02T20:56:06-07:00
impacts: 
  - "Business rule extraction"
  - "Domain knowledge"
  - "Process understanding"
context_triggers:
  - "When analyzing legacy business logic"
  - "When extracting domain knowledge"
  - "When documenting business rules"
---

# Legacy Business Logic Analysis Pattern

## Purpose
```yaml
intent: "Standardize the extraction and documentation of business logic from legacy APIs"
problem_space: "Understanding and preserving business rules and domain knowledge from legacy systems"
applicability: "All legacy API projects under legacy/"
```

## Pattern Definition
```yaml
key_aspects:
  - "Business rule identification"
  - "Domain model extraction"
  - "Process flow mapping"
  - "Rule relationship analysis"

boundaries:
  includes:
    - "Business rules and logic"
    - "Domain models and entities"
    - "Process flows"
    - "Data relationships"
  excludes:
    - "Implementation details"
    - "Infrastructure concerns"
    - "Technical patterns"

analysis_considerations:
  - "Business rule completeness"
  - "Domain model accuracy"
  - "Process flow correctness"
  - "Rule dependencies"
```

## Project Structure
```yaml
analysis_directory:
  location: ".analysis/"
  description: "Project-specific analysis directory within each legacy API"
  components:
    business_rules:
      - "domain_models.md"
      - "validation_rules.md"
      - "business_constraints.md"
    process_flows:
      - "transaction_flows.md"
      - "state_machines.md"
      - "integration_patterns.md"
    data_models:
      - "entity_relationships.md"
      - "data_transformations.md"
      - "persistence_patterns.md"
    reports:
      - "complexity_analysis.md"
      - "dependency_map.md"
      - "risk_assessment.md"

shared_analysis:
  location: "legacy/legacy-analysis/"
  purpose: "Cross-project analysis and shared patterns"
  components:
    - "Common business patterns"
    - "Shared domain models"
    - "Integration patterns"
    - "Migration strategies"
```

## Usage Context
```yaml
when_to_use:
  - "Analyzing business logic in legacy APIs"
  - "Documenting domain knowledge"
  - "Mapping business processes"
  - "Understanding rule relationships"

when_not_to_use:
  - "Technical implementation analysis"
  - "Infrastructure planning"
  - "Performance optimization"
```

## Related Patterns
```yaml
workspace_patterns:
  - "Domain modeling patterns"
  - "Business rule patterns"
  - "Process flow patterns"

legacy_specific:
  - "Knowledge extraction patterns"
  - "Domain analysis patterns"
  - "Rule relationship patterns"
```

## Implementation Guide
```yaml
analysis_steps:
  1: "Create .analysis directory in project root"
  2: "Set up standard analysis structure"
  3: "Identify business rules"
  4: "Map domain models"
  5: "Document process flows"
  6: "Analyze rule relationships"
  7: "Catalog domain knowledge"
  8: "Link to shared patterns if applicable"

documentation:
  required:
    - "Business rules catalog"
    - "Domain models"
    - "Process flows"
    - "Rule relationships"
  format: "Use workspace templates"
  location: "Project-specific .analysis directory"
```
