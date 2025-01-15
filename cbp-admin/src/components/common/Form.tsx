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
  formId = 'dynamic-form',
}: FormProps<T>): React.ReactElement => {
  const auditService = ServiceFactory.getInstance().getAuditService();
  
  logger.info({
    message: 'Form: Initializing',
    formId,
    fields: fields.map(f => ({ name: f.name, type: f.type }))
  });
  
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

  logger.info({
    message: 'Form: Using default values',
    formId,
    defaultValues
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    defaultValues,
  });

  const onSubmitHandler = async (data: T) => {
    logger.info({
      message: 'Form: Submitting form',
      formId,
      data
    });

    try {
      await onSubmit(data);
      
      // Log successful submission to audit service
      await auditService.logEvent({
        eventType: 'FORM_SUBMISSION',
        resourceId: formId,
        resourceType: 'FORM',
        status: 'COMPLETED',
        metadata: {
          formFields: fields.map(f => f.name),
          hasErrors: false
        },
        timestamp: new Date().toISOString()
      }).catch(err => {
        logger.error({
          message: 'Failed to log form submission to audit service',
          formId,
          error: err
        });
      });

      logger.info({
        message: 'Form: Submit successful',
        formId
      });
    } catch (error) {
      // Log failed submission to audit service
      await auditService.logEvent({
        eventType: 'FORM_SUBMISSION',
        resourceId: formId,
        resourceType: 'FORM',
        status: 'ERROR',
        metadata: {
          formFields: fields.map(f => f.name),
          hasErrors: true,
          error: error instanceof Error ? error.message : 'Unknown error'
        },
        timestamp: new Date().toISOString()
      }).catch(err => {
        logger.error({
          message: 'Failed to log form error to audit service',
          formId,
          error: err
        });
      });

      logger.error({
        message: 'Form: Submit error',
        formId,
        error
      });
    }
  };

  const renderField = (field: FormField<T>) => {
    const { name, label, type = 'text', required, options, validation = {} } = field;

    const rules = {
      required: required ? validation.required || `${label} is required` : false,
      ...validation,
    };

    logger.info({
      message: 'Form: Rendering field',
      formId,
      fieldName: name,
      fieldType: type,
      rules
    });

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
                  value={value || ''}
                  onChange={onChange}
                  label={label}
                >
                  {options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors[name] && (
                  <Typography color="error" variant="caption">
                    {errors[name]?.message as string}
                  </Typography>
                )}
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
                required={required}
                margin="normal"
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
      {fields.map(renderField)}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {submitText}
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
