import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Grid,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const Form = ({
  defaultValues,
  onSubmit,
  fields,
  submitText = 'Submit',
  resetText = 'Reset',
  showReset = true,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  const renderField = (field) => {
    const { name, label, type = 'text', required, options, ...rest } = field;

    switch (type) {
      case 'select':
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field: { onChange, value } }) => (
              <FormControl fullWidth error={!!errors[name]}>
                <InputLabel>{label}</InputLabel>
                <Select
                  value={value || ''}
                  onChange={onChange}
                  label={label}
                  {...rest}
                >
                  {options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors[name] && (
                  <FormHelperText>{errors[name].message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field: { onChange, value } }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value || false}
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
            name={name}
            control={control}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field }) => (
              <TextField
                {...field}
                label={label}
                type={type}
                fullWidth
                error={!!errors[name]}
                helperText={errors[name]?.message}
                {...rest}
              />
            )}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} key={field.name}>
            {renderField(field)}
          </Grid>
        ))}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            {showReset && (
              <Button
                type="button"
                variant="outlined"
                onClick={() => reset(defaultValues)}
              >
                {resetText}
              </Button>
            )}
            <Button type="submit" variant="contained" color="primary">
              {submitText}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

Form.propTypes = {
  defaultValues: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      required: PropTypes.bool,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.any,
          label: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  submitText: PropTypes.string,
  resetText: PropTypes.string,
  showReset: PropTypes.bool,
};

export default Form;
