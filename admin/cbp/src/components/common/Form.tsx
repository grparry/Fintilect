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
import { ServiceFactory } from '../../services/factory/ServiceFactory';
import logger from '../../utils/logger';

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
  formId?: string;
}
const Form = <T extends FieldValues>({
  fields,
  onSubmit,
  title,
  submitText = 'Submit',
  loading = false,
  formId
}: FormProps<T>) => {
  const auditService = ServiceFactory.getInstance().getAuditService();
  logger.info({
    message: 'Form: Initializing',
    formId,
    fields: fields.map(f => ({ name: f.name, type: f.type }))
  });
  const defaultValues = fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? '';
    return acc;
  }, {} as DefaultValues<T>);
  logger.info({
    message: 'Form: Using default values',
    formId,
    defaultValues
  });
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<T>({
    defaultValues,
    mode: 'onBlur'
  });
  const onSubmitWrapper = async (data: T) => {
    try {
      await onSubmit(data);
    } catch (error) {
      logger.error({
        message: 'Form submission error',
        error: error instanceof Error ? error.message : String(error)
      });
    }
  };
  return (
    <form id={formId || 'dynamic-form'} onSubmit={handleSubmit(onSubmitWrapper)}>
      {title && (
        <Typography variant="h6" color="text.primary" gutterBottom>
          {title}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {fields.map((field) => (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={field.validation}
            render={({ field: { onChange, value, onBlur } }) => {
              switch (field.type) {
                case 'checkbox':
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!value}
                          onChange={(e) => onChange(e.target.checked)}
                          onBlur={onBlur}
                        />
                      }
                      label={field.label}
                    />
                  );
                case 'select':
                  return (
                    <FormControl fullWidth error={!!errors[field.name]}>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        value={value ?? ''}
                        onChange={onChange}
                        onBlur={onBlur}
                        label={field.label}
                      >
                        {field.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors[field.name] && (
                        <Typography color="text.primary" variant="caption">
                          {String(errors[field.name]?.message)}
                        </Typography>
                      )}
                    </FormControl>
                  );
                default:
                  return (
                    <TextField
                      fullWidth
                      label={field.label}
                      type={field.type || 'text'}
                      value={value ?? ''}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors[field.name]}
                      helperText={errors[field.name]?.message ? String(errors[field.name]?.message) : undefined}
                    />
                  );
              }
            }}
          />
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : submitText}
        </Button>
      </Box>
    </form>
  );
};
export default Form;