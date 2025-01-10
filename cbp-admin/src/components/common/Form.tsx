import React from 'react';
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import { Controller, useForm, Path, FieldValues, DefaultValues } from 'react-hook-form';
import { SelectOption } from '../../types/index';

export interface FormField<T> {
  name: Path<T>;
  label: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'select' | 'checkbox';
  required?: boolean;
  defaultValue?: any;
  options?: SelectOption[];
  validation?: {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    min?: { value: number; message: string };
    max?: { value: number; message: string };
  };
}

export interface FormProps<T extends FieldValues> {
  fields: FormField<T>[];
  onSubmit: (data: T) => Promise<void>;
  title?: string;
  submitText?: string;
  loading?: boolean;
}

const Form = <T extends FieldValues>({
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
  }, {} as DefaultValues<T>);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    defaultValues,
  });

  const onSubmitHandler = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const renderField = (field: FormField<T>) => {
    const { name, label, type = 'text', required, options, validation = {} } = field;

    const rules = {
      required: required ? validation.required || `${label} is required` : false,
      ...validation,
    };

    switch (type) {
      case 'select':
        return (
          <Controller
            key={name}
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth error={!!errors[name]}>
                <InputLabel>{label}</InputLabel>
                <Select
                  value={value ?? ''}
                  onChange={onChange}
                  label={label}
                >
                  {options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            key={name}
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                }
                label={label}
              />
            )}
          />
        );

      default:
        return (
          <Controller
            key={name}
            name={name}
            control={control}
            rules={rules}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                label={label}
                type={type}
                value={value}
                onChange={onChange}
                error={!!errors[name]}
                helperText={errors[name]?.message as string}
              />
            )}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
        {fields.map(renderField)}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} />}
        >
          {submitText}
        </Button>
      </Box>
    </form>
  );
};

export default Form;
