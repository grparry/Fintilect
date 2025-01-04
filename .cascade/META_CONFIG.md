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
  
  2. legacy_analysis:
     - "legacy/.cascade/patterns/**/*"
     - "legacy/.cascade/rules/**/*"
     - "legacy/.cascade/decisions/**/*"
     lazy_load: true
     trigger_conditions:
       - "Edit operation in legacy scope"
       - "Pattern lookup in legacy namespace"
       - "Legacy analysis request"
  
  3. project_specific:
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

meta_layer_metrics:
  auto_update: true
  silent: true
  tracker: ".cascade/metrics/tracker.jsonl"
```

## Legacy Analysis Configuration
```yaml
legacy_meta_layer:
  path: "legacy/.cascade"
  purpose: "Centralized governance for legacy code analysis and business logic extraction"
  
  analysis_directories:
    base_path: "legacy/legacy-analysis"
    documentation:
      readme: "README.md"
      purpose: "Central documentation for legacy analysis structure"
      required: true
      validation:
        - "Must explain directory structure"
        - "Must provide usage guidelines"
        - "Must clarify relationship to legacy code"
    structure:
      business_rules:
        path: "business_rules"
        purpose: "Extracted business logic and rules"
        contents:
          - "Rule definitions"
          - "Business constraints"
          - "Validation logic"
      
      domain_models:
        path: "domain_models"
        purpose: "Domain entities and relationships"
        contents:
          - "Entity definitions"
          - "Relationship maps"
          - "Domain vocabulary"
      
      process_flows:
        path: "process_flows"
        purpose: "Business process documentation"
        contents:
          - "Workflow definitions"
          - "Process diagrams"
          - "State transitions"
      
      integration_context:
        path: "integration_context"
        purpose: "Integration points and dependencies"
        contents:
          - "API touchpoints"
          - "Data flow mappings"
          - "System interactions"

  scope:
    includes:
      - "All legacy API projects"
      - "Business logic patterns"
      - "Domain knowledge extraction"
    excludes:
      - "Implementation migration"
      - "Infrastructure concerns"
  
  pattern_categories:
    - "Business logic patterns"
    - "Domain models"
    - "Integration contexts"
    - "Knowledge extraction"
  
  inheritance:
    from_workspace:
      - "Core rules apply"
      - "Drift prevention active"
      - "Essential patterns inherited"
    to_legacy_projects:
      - "All legacy projects share analysis patterns"
      - "Business logic extraction follows common patterns"
      - "Domain knowledge is centrally documented"

  validation:
    rules:
      - "Focus on business logic identification"
      - "Document domain patterns"
      - "Map business rule relationships"
    metrics:
      - "Track identified business rules"
      - "Monitor domain pattern coverage"
      - "Measure knowledge extraction progress"
```

## Template Configuration
```yaml
templates:
  directory: ".cascade/templates"
  usage:
    pattern.md:
      purpose: "Base template for all pattern definitions"
      required: true
      validation:
        - "Must include frontmatter with required fields"
        - "Must follow pattern structure"
        - "Must specify relationships"
    
    decision.md:
      purpose: "Template for architectural decisions"
      required: true
      validation:
        - "Must include context and rationale"
        - "Must reference affected patterns"
    
    relationship.md:
      purpose: "Template for defining pattern relationships"
      required: true
      validation:
        - "Must specify bidirectional relationships"
        - "Must include impact analysis"
    
    PATTERN_NEEDED.md:
      purpose: "Template for requesting new patterns"
      required: false
      validation:
        - "Must justify pattern need"
        - "Must specify use cases"

  enforcement:
    level: "strict"
    exceptions:
      - "Emergency hotfixes"
      - "Temporary debugging patterns"
    
  inheritance:
    workspace_to_project:
      - "Projects must use workspace templates"
      - "Projects may extend but not override templates"
      - "Template modifications require workspace-level approval"

  validation_hooks:
    pre_commit:
      - "Verify template usage"
      - "Check required sections"
      - "Validate relationships"
    
    post_commit:
      - "Update pattern registry"
      - "Verify cross-references"
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
