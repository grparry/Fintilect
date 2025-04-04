import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { ClientLoginSecurityResponse, ClientLoginSecurityUpdateRequest } from '../../../types/security.types';
import { clientLoginSecurityService } from '../../../services/factory/ServiceFactory';

interface ClientLoginSecuritySettingsProps {
  clientId: string;
  settings: ClientLoginSecurityResponse;
  onRefresh: () => void;
}

const ClientLoginSecuritySettings: React.FC<ClientLoginSecuritySettingsProps> = ({ 
  clientId, 
  settings,
  onRefresh
}) => {
  // Define a type that allows string values during input
  type FormDataType = Omit<ClientLoginSecurityResponse, 'minPasswordLength' | 'maxLoginAttempts' | 'sessionTimeoutMinutes' | 'preventPasswordReuse'> & {
    minPasswordLength: number | string;
    maxLoginAttempts: number | string;
    sessionTimeoutMinutes: number | string;
    preventPasswordReuse: number | string;
  };

  const [formData, setFormData] = useState<FormDataType>({
    ...settings,
    twoFactorAuthRequired: false // Always ensure twoFactorAuthRequired is false
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (field: keyof ClientLoginSecurityUpdateRequest, value: any) => {
    // Ensure twoFactorAuthRequired is always false
    if (field === 'twoFactorAuthRequired') {
      value = false;
    }
    
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Helper function to validate and handle numeric input changes
  const handleNumericChange = (field: keyof ClientLoginSecurityUpdateRequest, value: string, min: number, max: number) => {
    // Allow empty input temporarily during typing
    if (value === '') {
      setFormData({
        ...formData,
        [field]: value
      });
      return;
    }
    
    // Only proceed if input is numeric
    if (/^\d+$/.test(value)) {
      const numValue = parseInt(value, 10);
      
      // If the value is within range, update it directly
      if (numValue >= min && numValue <= max) {
        handleChange(field, numValue);
      } else if (numValue < min) {
        // If below minimum, set to minimum
        handleChange(field, min);
      } else if (numValue > max) {
        // If above maximum, set to maximum
        handleChange(field, max);
      }
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      // Ensure all numeric values are properly converted to numbers
      const updateRequest: ClientLoginSecurityUpdateRequest = {
        id: formData.id,
        minPasswordLength: typeof formData.minPasswordLength === 'string' ? 
          parseInt(formData.minPasswordLength, 10) || 6 : formData.minPasswordLength,
        requireUppercase: formData.requireUppercase,
        requireLowercase: formData.requireLowercase,
        requireNumbers: formData.requireNumbers,
        requireSpecialCharacters: formData.requireSpecialCharacters,
        passwordExpiryDays: formData.passwordExpiryDays,
        maxLoginAttempts: typeof formData.maxLoginAttempts === 'string' ? 
          parseInt(formData.maxLoginAttempts, 10) || 1 : formData.maxLoginAttempts,
        sessionTimeoutMinutes: typeof formData.sessionTimeoutMinutes === 'string' ? 
          parseInt(formData.sessionTimeoutMinutes, 10) || 1 : formData.sessionTimeoutMinutes,
        preventPasswordReuse: typeof formData.preventPasswordReuse === 'string' ?
          parseInt(formData.preventPasswordReuse, 10) || 0 : formData.preventPasswordReuse,
        twoFactorAuthRequired: false // Always set to false as per requirements
      };
      
      await clientLoginSecurityService.updateLoginSecurity(updateRequest);
      setSuccess('Login security settings updated successfully');
      onRefresh(); // Refresh the parent component data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save login security settings';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" color="text.primary">Client Login Security Settings</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Password Requirements
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Minimum Password Length"
                value={formData.minPasswordLength}
                onChange={(e) => handleNumericChange('minPasswordLength', e.target.value, 6, 30)}
                onBlur={() => {
                  // Ensure empty value is set to minimum on blur
                  if (formData.minPasswordLength === '' || formData.minPasswordLength === null) {
                    handleChange('minPasswordLength', 6);
                  } else if (typeof formData.minPasswordLength === 'string') {
                    // Convert string to number on blur
                    const numValue = parseInt(formData.minPasswordLength, 10);
                    handleChange('minPasswordLength', numValue || 6);
                  }
                }}
                sx={{ mb: 2 }}
                inputProps={{ inputMode: 'numeric' }}
                helperText={`Value must be between 6 and 30`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password Expiry (days)"
                value={formData.passwordExpiryDays}
                onChange={(e) => handleNumericChange('passwordExpiryDays', e.target.value, 0, 365)}
                sx={{ mb: 2 }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                helperText={`Value must be between 0 and 365`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Prevent Password Reuse (count)"
                value={formData.preventPasswordReuse}
                onChange={(e) => handleNumericChange('preventPasswordReuse', e.target.value, 0, 10)}
                onBlur={() => {
                  // Ensure empty value is set to minimum on blur
                  if (formData.preventPasswordReuse === '' || formData.preventPasswordReuse === null) {
                    handleChange('preventPasswordReuse', 0);
                  } else if (typeof formData.preventPasswordReuse === 'string') {
                    // Convert string to number on blur
                    const numValue = parseInt(formData.preventPasswordReuse, 10);
                    handleChange('preventPasswordReuse', numValue || 0);
                  }
                }}
                sx={{ mb: 2 }}
                inputProps={{ inputMode: 'numeric' }}
                helperText={`Value must be between 0 and 10`}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.requireUppercase}
                    onChange={(e) => handleChange('requireUppercase', e.target.checked)}
                  />
                }
                label="Require Uppercase Letters"
                sx={{ color: 'text.primary' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.requireLowercase}
                    onChange={(e) => handleChange('requireLowercase', e.target.checked)}
                  />
                }
                label="Require Lowercase Letters"
                sx={{ color: 'text.primary' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.requireNumbers}
                    onChange={(e) => handleChange('requireNumbers', e.target.checked)}
                  />
                }
                label="Require Numbers"
                sx={{ color: 'text.primary' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.requireSpecialCharacters}
                    onChange={(e) => handleChange('requireSpecialCharacters', e.target.checked)}
                  />
                }
                label="Require Special Characters"
                sx={{ color: 'text.primary' }}
              />
            </Grid>
          </Grid>
        </Grid>
        
        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" color="text.primary" gutterBottom>
            Login Settings
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Maximum Login Attempts"
                value={formData.maxLoginAttempts}
                onChange={(e) => handleNumericChange('maxLoginAttempts', e.target.value, 1, 10)}
                onBlur={() => {
                  // Ensure empty value is set to minimum on blur
                  if (formData.maxLoginAttempts === '' || formData.maxLoginAttempts === null) {
                    handleChange('maxLoginAttempts', 1);
                  } else if (typeof formData.maxLoginAttempts === 'string') {
                    // Convert string to number on blur
                    const numValue = parseInt(formData.maxLoginAttempts, 10);
                    handleChange('maxLoginAttempts', numValue || 1);
                  }
                }}
                sx={{ mb: 2 }}
                inputProps={{ inputMode: 'numeric' }}
                helperText={`Value must be between 1 and 10`}
              />
            </Grid>
            {/* Lock Duration field removed as it's no longer in the API */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Session Timeout (minutes)"
                value={formData.sessionTimeoutMinutes}
                onChange={(e) => handleNumericChange('sessionTimeoutMinutes', e.target.value, 1, 1440)}
                onBlur={() => {
                  // Ensure empty value is set to minimum on blur
                  if (formData.sessionTimeoutMinutes === '' || formData.sessionTimeoutMinutes === null) {
                    handleChange('sessionTimeoutMinutes', 1);
                  } else if (typeof formData.sessionTimeoutMinutes === 'string') {
                    // Convert string to number on blur
                    const numValue = parseInt(formData.sessionTimeoutMinutes, 10);
                    handleChange('sessionTimeoutMinutes', numValue || 1);
                  }
                }}
                sx={{ mb: 2 }}
                inputProps={{ inputMode: 'numeric' }}
                helperText={`Value must be between 1 and 1440`}
              />
            </Grid>
            {/* isActive field removed as it's no longer in the API */}
          </Grid>
        </Grid>
      </Grid>
      
      {/* Last updated timestamp hidden as requested */}
    </Box>
  );
};

export default ClientLoginSecuritySettings;
