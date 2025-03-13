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
  const [formData, setFormData] = useState<ClientLoginSecurityResponse>({
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
    // Only allow numeric input
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = value === '' ? min : parseInt(value, 10);
      // Ensure value is within min-max range
      const boundedValue = Math.max(min, Math.min(max, numValue));
      handleChange(field, boundedValue);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      
      const updateRequest: ClientLoginSecurityUpdateRequest = {
        id: formData.id,
        minPasswordLength: formData.minPasswordLength,
        requireUppercase: formData.requireUppercase,
        requireLowercase: formData.requireLowercase,
        requireNumbers: formData.requireNumbers,
        requireSpecialCharacters: formData.requireSpecialCharacters,
        passwordExpiryDays: formData.passwordExpiryDays,
        maxLoginAttempts: formData.maxLoginAttempts,
        sessionTimeoutMinutes: formData.sessionTimeoutMinutes,
        preventPasswordReuse: formData.preventPasswordReuse,
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
                sx={{ mb: 2 }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                onChange={(e) => handleNumericChange('preventPasswordReuse', e.target.value, 0, 24)}
                sx={{ mb: 2 }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                helperText={`Value must be between 0 and 24`}
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
                sx={{ mb: 2 }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
                sx={{ mb: 2 }}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
