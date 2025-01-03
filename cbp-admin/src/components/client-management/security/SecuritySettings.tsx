import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Chip,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { SecuritySettings as SecuritySettingsType } from '../../../types/client.types';
import { clientService } from '../../../services/clients.service';
import MemberSecuritySettings from './MemberSecuritySettings';
import AuditSearch from './AuditSearch';
import { shouldUseMockData } from '../../../config/api.config';

interface SecuritySettingsProps {
  clientId: string;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ clientId }) => {
  const [settings, setSettings] = useState<SecuritySettingsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [saving, setSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const isMockMode = shouldUseMockData();

  useEffect(() => {
    console.log('SecuritySettings - Using mock data:', isMockMode);
    loadSettings();
  }, [clientId]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clientService.getClientSecuritySettings(clientId);
      setSettings(data);
      setIsDirty(false);
    } catch (err) {
      setError('Failed to load security settings');
      console.error('Error loading security settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handlePasswordPolicyChange = (field: keyof SecuritySettingsType['passwordPolicy'], value: any) => {
    setSettings(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        passwordPolicy: {
          ...prev.passwordPolicy,
          [field]: value
        }
      };
    });
    setIsDirty(true);
  };

  const handleLoginPolicyChange = (field: keyof SecuritySettingsType['loginPolicy'], value: any) => {
    setSettings(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        loginPolicy: {
          ...prev.loginPolicy,
          [field]: value
        }
      };
    });
    setIsDirty(true);
  };

  const handleSettingChange = (field: keyof SecuritySettingsType, value: any) => {
    setSettings(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value
      };
    });
    setIsDirty(true);
  };

  const validateSettings = (settings: SecuritySettingsType): string | null => {
    if (settings.passwordPolicy.minLength < 8) {
      return 'Minimum password length must be at least 8 characters';
    }
    if (settings.loginPolicy.maxAttempts < 1) {
      return 'Maximum login attempts must be at least 1';
    }
    return null;
  };

  const handleSubmit = async () => {
    if (!settings) return;

    const validationError = validateSettings(settings);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      await clientService.updateClientSecuritySettings(clientId, settings);
      setIsDirty(false);
      setError(null);
    } catch (err) {
      setError('Failed to update security settings');
      console.error('Error updating security settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (isDirty && !window.confirm('Are you sure you want to discard your changes?')) {
      return;
    }
    loadSettings();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6">Security Settings</Typography>
        {isMockMode && (
          <Chip
            label="Mock Mode"
            color="info"
            size="small"
          />
        )}
      </Box>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Security Settings" />
          <Tab label="Audit Logs" />
        </Tabs>
      </Paper>

      {activeTab === 0 && settings && (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Password Policy
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Minimum Length"
                    value={settings.passwordPolicy.minLength}
                    onChange={(e) => handlePasswordPolicyChange('minLength', parseInt(e.target.value))}
                    error={settings.passwordPolicy.minLength < 8}
                    helperText={settings.passwordPolicy.minLength < 8 ? 'Must be at least 8 characters' : ''}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.passwordPolicy.requireUppercase}
                        onChange={(e) => handlePasswordPolicyChange('requireUppercase', e.target.checked)}
                      />
                    }
                    label="Require Uppercase"
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Login Policy
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Max Login Attempts"
                    value={settings.loginPolicy.maxAttempts}
                    onChange={(e) => handleLoginPolicyChange('maxAttempts', parseInt(e.target.value))}
                    error={settings.loginPolicy.maxAttempts < 1}
                    helperText={settings.loginPolicy.maxAttempts < 1 ? 'Must be at least 1' : ''}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.mfaEnabled}
                        onChange={(e) => handleSettingChange('mfaEnabled', e.target.checked)}
                      />
                    }
                    label="Enable Multi-Factor Authentication"
                  />
                </Grid>
              </Grid>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={handleReset}
                  disabled={saving || !isDirty}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={saving || !isDirty}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 1 && <AuditSearch clientId={clientId} />}
    </Box>
  );
};

export default SecuritySettings;
