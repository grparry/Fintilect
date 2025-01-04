# Legacy Code Analysis Rules

## Purpose
```yaml
intent: "Define rules for analyzing and extracting business logic from legacy code"
scope: "All projects under legacy/"
inheritance: "Inherits from workspace core rules"
```

## Analysis Rules
```yaml
business_logic_analysis:
  required_aspects:
    - "Business rules and workflows"
    - "Domain models and entities"
    - "Validation rules"
    - "Business constraints"
    - "Domain relationships"
  
  documentation:
    must_document:
      - "Business rules"
      - "Domain concepts"
      - "Decision logic"
      - "Data relationships"
    format: "Use templates from workspace"

knowledge_extraction:
  identification:
    - "Core business rules"
    - "Domain patterns"
    - "Business workflows"
    - "Data transformations"
  
  documentation:
    - "Business context"
    - "Rule dependencies"
    - "Domain vocabulary"
    - "Process flows"
```

## Extraction Rules
```yaml
preparation:
  required_analysis:
    - "Business rule mapping"
    - "Domain model identification"
    - "Process flow analysis"
    - "Data relationship mapping"
  
  documentation:
    - "Business logic catalog"
    - "Domain model documentation"
    - "Process flow diagrams"
    - "Rule relationship maps"

organization:
  requirements:
    - "Group related business rules"
    - "Maintain domain contexts"
    - "Document rule dependencies"
    - "Preserve business constraints"
  
  validation:
    - "Business rule completeness"
    - "Domain model accuracy"
    - "Process flow correctness"
    - "Rule consistency"
```

## Directory Usage
```yaml
business_rules_dir:
  path: "legacy/legacy-analysis/business_rules"
  content_rules:
    - "One rule per file"
    - "Include business context"
    - "Reference related rules"
    - "Document constraints"
  file_naming: "{domain}_{rule_name}.md"

domain_models_dir:
  path: "legacy/legacy-analysis/domain_models"
  content_rules:
    - "One model per file"
    - "Include entity relationships"
    - "Define domain terms"
    - "Map data relationships"
  file_naming: "{domain}_{entity}.md"

process_flows_dir:
  path: "legacy/legacy-analysis/process_flows"
  content_rules:
    - "One process per file"
    - "Include flow diagrams"
    - "Document states"
    - "List business rules used"
  file_naming: "{domain}_{process}.md"

integration_context_dir:
  path: "legacy/legacy-analysis/integration_context"
  content_rules:
    - "Focus on business context"
    - "Document data meaning"
    - "Map business relationships"
    - "Explain integration purpose"
  file_naming: "{system}_{integration_point}.md"
```

## Pattern Usage
```yaml
analysis_patterns:
  application:
    - "Use workspace templates"
    - "Focus on business knowledge"
    - "Document domain patterns"
  
  validation:
    - "Must capture business intent"
    - "Must preserve business rules"
    - "Must maintain domain relationships"
```
