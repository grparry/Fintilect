import React from 'react';
import type { UseFormReturn, FieldValues, DefaultValues, Path } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

export interface FormField {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: any;
  validation?: {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    min?: { value: number; message: string };
    max?: { value: number; message: string };
  };
}

interface FormProps<T extends Record<string, any>> {
  fields: FormField[];
  onSubmit: (data: T) => Promise<void>;
  title?: string;
  submitText?: string;
  loading?: boolean;
}

const Form = <T extends Record<string, any>>({
  fields,
  onSubmit,
  title,
  submitText = 'Submit',
  loading = false,
}: FormProps<T>): React.ReactElement => {
  // Create default values with proper typing
  const defaultValues = fields.reduce((acc, field) => {
    // Ensure we have a defined initial value for each field type
    switch (field.type) {
      case 'checkbox':
        acc[field.name] = field.defaultValue ?? false;
        break;
      case 'number':
        acc[field.name] = field.defaultValue ?? 0;
        break;
      default:
        acc[field.name] = field.defaultValue ?? '';
    }
    return acc;
  }, {} as Record<string, any>) as DefaultValues<T>;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    defaultValues,
    mode: 'onBlur',
  });

  const onSubmitHandler = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case 'checkbox':
        return (
          <Controller
            key={field.name}
            name={field.name as Path<T>}
            control={control}
            rules={{
              required: field.required ? `${field.label} is required` : false,
              ...field.validation,
            }}
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!value}
                    onChange={(e) => onChange(e.target.checked)}
                    inputRef={ref}
                  />
                }
                label={field.label}
              />
            )}
          />
        );
      case 'number':
        return (
          <Controller
            key={field.name}
            name={field.name as Path<T>}
            control={control}
            rules={{
              required: field.required ? `${field.label} is required` : false,
              ...field.validation,
            }}
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
              <TextField
                fullWidth
                label={field.label}
                type="number"
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value ? Number(e.target.value) : '')}
                error={!!error}
                helperText={error?.message}
                required={field.required}
                inputRef={ref}
              />
            )}
          />
        );
      default:
        return (
          <Controller
            key={field.name}
            name={field.name as Path<T>}
            control={control}
            rules={{
              required: field.required ? `${field.label} is required` : false,
              ...field.validation,
            }}
            render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
              <TextField
                fullWidth
                label={field.label}
                type={field.type || 'text'}
                value={value ?? ''}
                onChange={onChange}
                error={!!error}
                helperText={error?.message}
                required={field.required}
                inputRef={ref}
              />
            )}
          />
        );
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitHandler)} noValidate>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} key={field.name}>
            {renderField(field)}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading && <CircularProgress size={20} />}
            >
              {submitText}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
