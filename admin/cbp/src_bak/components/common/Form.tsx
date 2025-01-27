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
  




  
  




    <form id={formId || 'dynamic-form'} onSubmit={handleSubmit(onSubmitWrapper)}>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {fields.map((field) => (
          <Controller
                    <FormControlLabel
                        <Checkbox
                        />
                    />
                  );
                    <FormControl fullWidth error={!!errors[field.name]}>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                      >
                        {field.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors[field.name] && (
                        <Typography color="error" variant="caption">
                          {String(errors[field.name]?.message)}
                        </Typography>
                      )}
                    </FormControl>
                  );
                    <TextField
                    />
                  );
          />
        ))}
        <Button
        >
          {loading ? <CircularProgress size={24} /> : submitText}
        </Button>
      </Box>
    </form>
  );

