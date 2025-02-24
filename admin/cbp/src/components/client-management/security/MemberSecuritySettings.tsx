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
  InputAdornment,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { SecuritySettings } from '../../../types/security.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';

interface MemberSecuritySettingsProps {
  clientId: string;
  settings: SecuritySettings;
  onChange: (field: keyof SecuritySettings, value: any) => void;
}

const MemberSecuritySettings: React.FC<MemberSecuritySettingsProps> = ({ clientId, settings, onChange }) => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      const clientService = ServiceFactory.getInstance().getClientService();
      await clientService.updateClientConfig(parseInt(clientId), { security: settings });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save security settings';
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
        <Typography variant="h5" color="primary">Member Security Settings</Typography>
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            Password Policy
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Minimum Password Length"
                value={settings.passwordPolicy.minLength}
                onChange={(e) => onChange('passwordPolicy', {
                  ...settings.passwordPolicy,
                  minLength: parseInt(e.target.value)
                })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.passwordPolicy.requireUppercase}
                    onChange={(e) => onChange('passwordPolicy', {
                      ...settings.passwordPolicy,
                      requireUppercase: e.target.checked
                    })}
                  />
                }
                label="Require Uppercase Letters"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.passwordPolicy.requireLowercase}
                    onChange={(e) => onChange('passwordPolicy', {
                      ...settings.passwordPolicy,
                      requireLowercase: e.target.checked
                    })}
                  />
                }
                label="Require Lowercase Letters"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.passwordPolicy.requireNumbers}
                    onChange={(e) => onChange('passwordPolicy', {
                      ...settings.passwordPolicy,
                      requireNumbers: e.target.checked
                    })}
                  />
                }
                label="Require Numbers"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.passwordPolicy.requireSpecialChars}
                    onChange={(e) => onChange('passwordPolicy', {
                      ...settings.passwordPolicy,
                      requireSpecialChars: e.target.checked
                    })}
                  />
                }
                label="Require Special Characters"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="primary" gutterBottom>
            Login Policy
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Maximum Login Attempts"
                value={settings.loginPolicy.maxAttempts}
                onChange={(e) => onChange('loginPolicy', {
                  ...settings.loginPolicy,
                  maxAttempts: parseInt(e.target.value)
                })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Lockout Duration (minutes)"
                value={settings.loginPolicy.lockoutDuration}
                onChange={(e) => onChange('loginPolicy', {
                  ...settings.loginPolicy,
                  lockoutDuration: parseInt(e.target.value)
                })}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.loginPolicy.requireMFA}
                    onChange={(e) => onChange('loginPolicy', {
                      ...settings.loginPolicy,
                      requireMFA: e.target.checked
                    })}
                  />
                }
                label="Require MFA"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MemberSecuritySettings;