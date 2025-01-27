# Component to Pattern Mapping

## UI Components
```yaml
Header:
  patterns:
    - core/navigation.md
    - core/theme.md
  relationships:
    - UI/UX Standards
    - Component Layout
  locations:
    - src/components/navigation/Header.tsx

Sidebar:
  patterns:
    - core/navigation.md
  relationships:
    - Route Management
    - Section Management
  locations:
    - src/components/navigation/Sidebar.tsx

# Add other components as they're modified
```

## Pattern Discovery Rules
1. When modifying any component, check its entry in this file
2. Follow all linked patterns
3. Update metrics for all related patterns
4. Document any new relationships discovered

## Automation Hints
```yaml
component_changes:
  - when: "file_modified matches src/components/**/*"
    then:
      - check: "relationships/component-patterns.md"
      - load: "linked_patterns"
      - update: "metrics/tracker.jsonl"
```
