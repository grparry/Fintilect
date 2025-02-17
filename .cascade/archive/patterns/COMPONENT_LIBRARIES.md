# Component Library Patterns

## Testing Framework Pattern
```yaml
pattern: testing_framework
enforced: true
components:
  core:
    name: jest
    version: ^29.7.0
    required: true
    alternatives: []
  ui_testing:
    name: "@testing-library/*"
    required: true
    scope: ui_projects
    alternatives: []
  api_testing:
    name: supertest
    required: true
    scope: api_projects
    alternatives: []
```

## UI Component Pattern
```yaml
pattern: ui_components
enforced: true
components:
  core:
    name: "@mui/*"
    required: true
    scope: ui_projects
    alternatives: []
  data_visualization:
    name: "@nivo/*"
    required: true
    scope: ui_projects
    alternatives: [recharts]
  form_handling:
    name: react-hook-form
    required: true
    scope: ui_projects
    alternatives: []
  notifications:
    name: notistack
    required: true
    scope: ui_projects
    alternatives: []
```

## Backend Component Pattern
```yaml
pattern: backend_components
enforced: true
components:
  core:
    name: express
    required: true
    scope: api_projects
    alternatives: []
  orm:
    name: typeorm
    required: true
    scope: api_projects
    alternatives: []
  logging:
    name: winston
    required: true
    scope: api_projects
    alternatives: []
  api_docs:
    name: swagger-jsdoc
    required: true
    scope: api_projects
    alternatives: []
```

## Date Handling Pattern
```yaml
pattern: date_handling
enforced: true
components:
  primary:
    name: date-fns
    required: true
    alternatives: []
migration_notes: Projects using moment.js or dayjs should migrate to date-fns for consistency
```

## Drift Prevention Rules
1. All testing MUST use Jest ecosystem
2. All UI components MUST use Material UI (@mui/*) as the primary component library
3. All data visualization SHOULD use @nivo/* components, with recharts as the only allowed alternative
4. All form handling MUST use react-hook-form
5. All notification handling MUST use notistack
6. All API projects MUST use Express, TypeORM, Winston, and Swagger
7. All date handling SHOULD use date-fns

## Pattern Enforcement
- These patterns are enforced through the meta layer
- Any deviation requires explicit override in project-specific patterns
- AI assistants must adhere to these patterns when suggesting or implementing code changes
- Pattern violations should trigger warnings during code review
