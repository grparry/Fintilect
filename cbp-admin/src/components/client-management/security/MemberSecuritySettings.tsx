import React, { useState, useEffect } from 'react';
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
  InputAdornment,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { SecuritySettings } from '../../../types/client.types';
import { clientService } from '../../../services/clients.service';

interface MemberSecuritySettingsProps {
  clientId: string;
}

const MemberSecuritySettings: React.FC<MemberSecuritySettingsProps> = ({ clientId }) => {
  // State
  const [settings, setSettings] = useState<SecuritySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  // Load initial data
  useEffect(() => {
    loadSettings();
  }, [clientId]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientService.getClientSecuritySettings(clientId);
      setSettings(data);
    } catch (err) {
      setError('Failed to load security settings');
      console.error('Error loading security settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: SecuritySettings) => {
    try {
      setSubmitting(true);
      setError(null);
      await clientService.updateClientSecuritySettings(clientId, values);
      setSuccess(true);
    } catch (err) {
      setError('Failed to update security settings');
      console.error('Error updating security settings:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof SecuritySettings['passwordPolicy']) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!settings) return;

    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    const category = 'passwordPolicy';

    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [field]: value,
      },
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!settings) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        Failed to load security settings
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Password Policy
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Minimum Password Length"
            type="number"
            value={settings.passwordPolicy.minLength}
            onChange={handleChange('minLength')}
            InputProps={{
              inputProps: { min: 8 },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Password Expiration Days"
            type="number"
            value={settings.passwordPolicy.expirationDays}
            onChange={handleChange('expirationDays')}
            InputProps={{
              inputProps: { min: 0 },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Password History"
            type="number"
            value={settings.passwordPolicy.minLength}
            onChange={handleChange('minLength')}
            InputProps={{
              inputProps: { min: 0 },
            }}
            helperText="Minimum password length"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.passwordPolicy.requireUppercase}
                onChange={handleChange('requireUppercase')}
              />
            }
            label="Require Uppercase Letters"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.passwordPolicy.requireLowercase}
                onChange={handleChange('requireLowercase')}
              />
            }
            label="Require Lowercase Letters"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.passwordPolicy.requireNumbers}
                onChange={handleChange('requireNumbers')}
              />
            }
            label="Require Numbers"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.passwordPolicy.requireSpecialChars}
                onChange={handleChange('requireSpecialChars')}
              />
            }
            label="Require Special Characters"
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Session Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Session Timeout"
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => setSettings({
              ...settings,
              sessionTimeout: Number(e.target.value)
            })}
            InputProps={{
              endAdornment: <InputAdornment position="end">minutes</InputAdornment>,
              inputProps: { min: 1 },
            }}
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Security Features
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.mfaEnabled}
                onChange={(e) => setSettings({
                  ...settings,
                  mfaEnabled: e.target.checked
                })}
              />
            }
            label="Enable Multi-Factor Authentication"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => handleSubmit(settings)}
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }} onClose={() => setSuccess(null)}>
          Security settings updated successfully
        </Alert>
      )}
    </Box>
  );
};

export default MemberSecuritySettings;
