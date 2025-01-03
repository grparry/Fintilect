---
type: pattern
category: core
status: active
priority: high
last_validated: 2024-12-31
impacts:
  - components/common/forms.md
  - core/accessibility.md
  - security/bill-pay/validation-rules.md
  - core/error-handling.md
context_triggers:
  - "When implementing form components"
  - "When handling form validation"
  - "When implementing form accessibility"
  - "When managing form state"
  - "When handling form submissions"
---

# Form Handling Patterns

## Core Architecture
```yaml
strategy:
  library: "React Hook Form"
  validation: "Zod schemas"
  structure: "Controlled components"

implementation:
  location: "src/components/common/form"
  patterns:
    - Composable form fields
    - Field-level validation
    - Form-level validation
    - Submission handling
```

## Form Components
```yaml
hierarchy:
  base_components:
    - FormField: "Base field wrapper"
    - FormInput: "Text input fields"
    - FormSelect: "Selection fields"
    - FormCheckbox: "Boolean fields"
    - FormRadio: "Option fields"
  
  composite_components:
    - FormArray: "Dynamic field arrays"
    - FormGroup: "Field grouping"
    - FormSection: "Logical sections"
    - FormStepper: "Multi-step forms"
```

## Validation Patterns
```yaml
strategy:
  field_level:
    - Required fields
    - Format validation
    - Range checking
    - Custom rules
  
  form_level:
    - Cross-field validation
    - Conditional rules
    - Business logic
    - Async validation
  
  implementation:
    location: "src/validation/schemas"
    pattern: "{feature}.schema.ts"
```

## State Management
```yaml
patterns:
  form_state:
    - Field values
    - Validation state
    - Submission state
    - Error state
  
  field_state:
    - Value
    - Touched
    - Error
    - Dirty
  
  meta_state:
    - Loading
    - Submitting
    - Succeeded
    - Failed
```

## Error Handling
```yaml
patterns:
  validation_errors:
    - Field-level messages
    - Form-level messages
    - Async validation
    - Server validation
  
  submission_errors:
    - Network errors
    - Validation failures
    - Business rule violations
    - System errors
  
  display:
    - Inline errors
    - Summary errors
    - Field highlighting
    - Error boundaries
```

## Performance
```yaml
optimization:
  rendering:
    - Field-level updates
    - Debounced validation
    - Memoized callbacks
    - Optimized re-renders
  
  validation:
    - Progressive validation
    - Cached results
    - Async validation
    - Batched updates
```

## Accessibility
```yaml
requirements:
  structure:
    - Proper labeling
    - Error association
    - Field grouping
    - Focus management
  
  feedback:
    - Error messages
    - Success states
    - Loading indicators
    - Required fields
```

## Form Submission
```yaml
patterns:
  submission:
    - Validate all fields
    - Transform data
    - Handle submission
    - Show feedback
  
  success:
    - Clear form
    - Show confirmation
    - Navigate away
    - Update cache
  
  failure:
    - Show errors
    - Maintain values
    - Enable retry
    - Log issues
```
