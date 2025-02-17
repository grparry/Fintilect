# Form Handling TODO

## Overview
This TODO tracks the necessary changes to improve form handling and validation patterns across the codebase.

**Created**: 2024-12-31T06:13:54-07:00
**Status**: Pending
**Priority**: High
**Category**: Architecture
**Related Pattern**: core/forms.md

## Current Issues

### 1. Form Components
- **Issue**: Basic components
- **Current**: Simple fields
- **Required**: Advanced fields
- **Impact**: Poor flexibility

### 2. Form Validation
- **Issue**: Basic validation
- **Current**: Simple rules
- **Required**: Advanced rules
- **Impact**: Poor validation

### 3. Form State
- **Issue**: Local state
- **Current**: Per form
- **Required**: Global state
- **Impact**: Poor reuse

### 4. Form Errors
- **Issue**: Basic errors
- **Current**: Simple messages
- **Required**: Advanced errors
- **Impact**: Poor UX

### 5. Form Submission
- **Issue**: Basic handling
- **Current**: Simple submit
- **Required**: Advanced submit
- **Impact**: Poor reliability

## Required Changes

### 1. Form Components
```typescript
// src/forms/components/index.ts
export * from './fields';
export * from './layouts';
export * from './controls';
export * from './feedback';

// src/forms/components/fields/index.ts
export * from './TextField';
export * from './SelectField';
export * from './DateField';
export * from './FileField';

// src/forms/components/fields/TextField.tsx
import { useField } from '@/forms/hooks';
import { FieldProps } from '@/forms/types';

export function TextField<T extends Record<string, any>>({
  name,
  label,
  type = 'text',
  validation,
  transform,
  format,
  ...props
}: FieldProps<T>) {
  const {
    field,
    fieldState: { error },
    formState: { isSubmitting }
  } = useField<T>(name, {
    validation,
    transform,
    format
  });

  return (
    <MuiTextField
      {...field}
      {...props}
      type={type}
      label={label}
      error={!!error}
      helperText={error?.message}
      disabled={isSubmitting}
    />
  );
}

// src/forms/components/layouts/FormSection.tsx
import { useFormContext } from '@/forms/hooks';
import { FormSectionProps } from '@/forms/types';

export function FormSection({
  title,
  description,
  children,
  columns = 1,
  spacing = 2,
  ...props
}: FormSectionProps) {
  const { isSubmitting } = useFormContext();

  return (
    <Box {...props}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" color="textSecondary" paragraph>
          {description}
        </Typography>
      )}
      <Grid container spacing={spacing}>
        {React.Children.map(children, child => (
          <Grid item xs={12} md={12 / columns}>
            {React.cloneElement(child as React.ReactElement, {
              disabled: isSubmitting
            })}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
```

### 2. Form Validation
```typescript
// src/forms/validation/index.ts
export * from './rules';
export * from './schemas';
export * from './messages';
export * from './transforms';

// src/forms/validation/rules.ts
import { object, string, number, array, date } from 'yup';
import { ValidationRules } from '../types';

export const rules: ValidationRules = {
  required: (message = 'This field is required') =>
    string().required(message),

  email: (message = 'Invalid email address') =>
    string().email(message),

  min: (min: number, message = `Must be at least ${min}`) =>
    number().min(min, message),

  max: (max: number, message = `Must be at most ${max}`) =>
    number().max(max, message),

  minLength: (min: number, message = `Must be at least ${min} characters`) =>
    string().min(min, message),

  maxLength: (max: number, message = `Must be at most ${max} characters`) =>
    string().max(max, message),

  pattern: (pattern: RegExp, message = 'Invalid format') =>
    string().matches(pattern, message),

  oneOf: (values: any[], message = 'Invalid value') =>
    string().oneOf(values, message),

  array: (schema: any, message = 'Invalid array') =>
    array().of(schema).required(message),

  date: (message = 'Invalid date') =>
    date().required(message),

  future: (message = 'Must be in the future') =>
    date().min(new Date(), message),

  past: (message = 'Must be in the past') =>
    date().max(new Date(), message)
};

// src/forms/validation/schemas.ts
import { object } from 'yup';
import { ValidationSchema } from '../types';

export const createSchema = <T extends Record<string, any>>(
  fields: ValidationSchema<T>
) => {
  const schema = object().shape(
    Object.entries(fields).reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value)
        ? value.reduce((rule, next) => rule.concat(next), string())
        : value;
      return acc;
    }, {} as Record<string, any>)
  );

  return schema;
};
```

### 3. Form State
```typescript
// src/forms/store/form.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState, FormData, FormError } from '../types';

const initialState: FormState = {
  forms: {},
  errors: {},
  submissions: {},
  dirty: {},
  touched: {}
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    initForm(state, action: PayloadAction<string>) {
      state.forms[action.payload] = {};
      state.errors[action.payload] = {};
      state.submissions[action.payload] = {
        status: 'idle',
        count: 0,
        error: null
      };
    },
    updateForm(
      state,
      action: PayloadAction<{ id: string; data: FormData }>
    ) {
      const { id, data } = action.payload;
      state.forms[id] = {
        ...state.forms[id],
        ...data
      };
      state.dirty[id] = true;
    },
    setErrors(
      state,
      action: PayloadAction<{ id: string; errors: FormError }>
    ) {
      const { id, errors } = action.payload;
      state.errors[id] = errors;
    },
    startSubmission(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.submissions[id] = {
        status: 'submitting',
        count: state.submissions[id].count + 1,
        error: null
      };
    },
    completeSubmission(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.submissions[id].status = 'completed';
      state.dirty[id] = false;
    },
    failSubmission(
      state,
      action: PayloadAction<{ id: string; error: string }>
    ) {
      const { id, error } = action.payload;
      state.submissions[id] = {
        status: 'failed',
        count: state.submissions[id].count,
        error
      };
    }
  }
});

export const {
  initForm,
  updateForm,
  setErrors,
  startSubmission,
  completeSubmission,
  failSubmission
} = formSlice.actions;

export default formSlice.reducer;
```

### 4. Form Errors
```typescript
// src/forms/errors/index.ts
export * from './types';
export * from './messages';
export * from './handlers';
export * from './display';

// src/forms/errors/handlers.ts
import { FormError, ValidationError } from '../types';

export const handleValidationError = (
  error: ValidationError
): FormError => {
  if (error.inner?.length > 0) {
    return error.inner.reduce(
      (acc, err) => ({
        ...acc,
        [err.path]: {
          type: 'validation',
          message: err.message
        }
      }),
      {}
    );
  }

  return {
    [error.path]: {
      type: 'validation',
      message: error.message
    }
  };
};

export const handleSubmissionError = (
  error: any
): FormError => {
  if (error.response?.data?.errors) {
    return error.response.data.errors.reduce(
      (acc, err) => ({
        ...acc,
        [err.field]: {
          type: 'submission',
          message: err.message
        }
      }),
      {}
    );
  }

  return {
    form: {
      type: 'submission',
      message: error.message || 'An error occurred'
    }
  };
};
```

### 5. Form Submission
```typescript
// src/forms/submission/index.ts
export * from './handlers';
export * from './transforms';
export * from './validation';
export * from './errors';

// src/forms/submission/handlers.ts
import { FormData, SubmitHandler, ValidationSchema } from '../types';
import { handleValidationError, handleSubmissionError } from '../errors';
import { createSchema } from '../validation';

export const createSubmitHandler = <T extends FormData>(
  handler: SubmitHandler<T>,
  schema?: ValidationSchema<T>
): SubmitHandler<T> => {
  return async (data: T, helpers) => {
    try {
      // Validate if schema provided
      if (schema) {
        const validationSchema = createSchema(schema);
        await validationSchema.validate(data, { abortEarly: false });
      }

      // Transform data before submission
      const transformedData = helpers.transform
        ? helpers.transform(data)
        : data;

      // Submit data
      const result = await handler(transformedData, helpers);

      // Handle success
      helpers.onSuccess?.(result);

      return result;
    } catch (error) {
      // Handle validation errors
      if (error.name === 'ValidationError') {
        const errors = handleValidationError(error);
        helpers.setErrors(errors);
      }
      // Handle submission errors
      else {
        const errors = handleSubmissionError(error);
        helpers.setErrors(errors);
      }

      // Handle error
      helpers.onError?.(error);

      throw error;
    }
  };
};
```

## Implementation Plan

1. **Phase 1: Components**
   - Create form fields
   - Add field types
   - Add field props
   - Add field tests

2. **Phase 2: Validation**
   - Create validation rules
   - Add validation types
   - Add validation logic
   - Add validation tests

3. **Phase 3: State**
   - Create form store
   - Add state types
   - Add state logic
   - Add state tests

4. **Phase 4: Errors**
   - Create error handlers
   - Add error types
   - Add error logic
   - Add error tests

5. **Phase 5: Submission**
   - Create submit handlers
   - Add submit types
   - Add submit logic
   - Add submit tests

## Notes
- Use TypeScript
- Add monitoring
- Document patterns
- Consider scale
- Handle errors
