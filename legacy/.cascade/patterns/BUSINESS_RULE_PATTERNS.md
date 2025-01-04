# Business Rule Extraction Patterns

## Pattern Categories

### 1. Validation Rules
```pattern
WHEN: analyzing_input_validation
FOCUS_ON:
  - Custom validation logic beyond basic type checking
  - Business-specific constraints
  - Domain value validations
IGNORE:
  - Basic null checks
  - Standard type validations
  - Framework validation patterns
```

### 2. Calculation Logic
```pattern
WHEN: analyzing_calculations
FOCUS_ON:
  - Business-specific formulas
  - Domain-specific algorithms
  - Special case handling
IGNORE:
  - Basic arithmetic
  - Standard mathematical operations
  - Framework calculation utilities
```

### 3. Workflow Rules
```pattern
WHEN: analyzing_workflows
FOCUS_ON:
  - State transition rules
  - Business process conditions
  - Domain-specific sequences
IGNORE:
  - Technical workflow implementation
  - Framework routing logic
  - Standard CRUD flows
```

### 4. Error Handling
```pattern
WHEN: analyzing_error_handling
FOCUS_ON:
  - Business-specific error conditions
  - Domain validation failures
  - Custom error messages
IGNORE:
  - Standard HTTP errors
  - Framework exceptions
  - Technical error handling
```

## Implementation Guidelines

### Rule Extraction Process
```pattern
FOR_EACH business_rule:
  - Document business intent
  - Note special conditions
  - Record dependencies
  - Flag critical constraints
  - Identify integration points
END
```

### Documentation Format
```pattern
WHEN: documenting_rule
INCLUDE:
  - Business purpose
  - Domain context
  - Special conditions
  - Examples
  - Dependencies
EXCLUDE:
  - Technical details
  - Implementation specifics
  - Framework patterns
END
```
