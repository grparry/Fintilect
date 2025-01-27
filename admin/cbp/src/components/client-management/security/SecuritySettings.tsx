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
import { SecuritySettings as SecuritySettingsType } from '../../../types/security.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import MemberSecuritySettings from './MemberSecuritySettings';
import AuditSearch from './AuditSearch';
import { shouldUseMockData } from '../../../config/api.config';

// Get service instances through factory
const clientService = ServiceFactory.getInstance().getClientService();
const permissionService = ServiceFactory.getInstance().getPermissionService();
interface SecuritySettingsProps {
  clientId: string;
}
const defaultSecuritySettings: SecuritySettingsType = {
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    expirationDays: 90,
    preventReuse: 5,
    complexityScore: 3
  },
  loginPolicy: {
    maxAttempts: 3,
    lockoutDuration: 30,
    sessionTimeout: 30,
    requireMFA: false,
    allowRememberMe: true,
    allowMultipleSessions: false,
    requirePasswordChange: false
  },
  ipWhitelist: {
    enabled: false,
    addresses: [],
    allowedRanges: []
  },
  mfaSettings: {
    methods: ['email'],
    defaultMethod: 'email',
    gracePeriod: 7,
    trustDuration: 30
  },
  auditSettings: {
    retentionDays: 90,
    highRiskEvents: ['login_failure', 'mfa_failure', 'password_reset'],
    alertThresholds: {
      'login_failure': 3,
      'mfa_failure': 2,
      'password_reset': 1
    }
  },
  alertSettings: {
    enableEmailAlerts: true,
    enableSMSAlerts: false,
    recipients: [],
    severityLevels: ['high', 'critical']
  }
};
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
      // Get settings through service factory
      const response = await clientService.getClientSettings(clientId);
      // Ensure all required fields are present by merging with defaults
      const mergedSettings: SecuritySettingsType = {
        ...defaultSecuritySettings,
        ...response.security
      };
      setSettings(mergedSettings);
      setIsDirty(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load security settings';
      setError(message);
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
    if (settings.loginPolicy.lockoutDuration < 1) {
      return 'Lockout duration must be at least 1 minute';
    }
    if (settings.loginPolicy.sessionTimeout < 1) {
      return 'Session timeout must be at least 1 minute';
    }
    if (settings.mfaSettings.gracePeriod < 1) {
      return 'MFA grace period must be at least 1 day';
    }
    if (settings.auditSettings.retentionDays < 30) {
      return 'Audit retention must be at least 30 days';
    }
    return null;
  };
  const handleSave = async () => {
    if (!settings) return;
    // Validate settings locally
    const validationError = validateSettings(settings);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setSaving(true);
      setError(null);
      // Update settings through service factory
      const updatedSettings = await clientService.updateClientSettings(clientId, {
        security: settings
      });
      setSettings(updatedSettings.security);
      setIsDirty(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update security settings';
      setError(message);
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
                  <TextField
                    fullWidth
                    type="number"
                    label="Expiration Days"
                    value={settings.passwordPolicy.expirationDays}
                    onChange={(e) => handlePasswordPolicyChange('expirationDays', parseInt(e.target.value))}
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
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.passwordPolicy.requireLowercase}
                        onChange={(e) => handlePasswordPolicyChange('requireLowercase', e.target.checked)}
                      />
                    }
                    label="Require Lowercase"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.passwordPolicy.requireNumbers}
                        onChange={(e) => handlePasswordPolicyChange('requireNumbers', e.target.checked)}
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
                        onChange={(e) => handlePasswordPolicyChange('requireSpecialChars', e.target.checked)}
                      />
                    }
                    label="Require Special Characters"
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
                  <TextField
                    fullWidth
                    type="number"
                    label="Lockout Duration (minutes)"
                    value={settings.loginPolicy.lockoutDuration}
                    onChange={(e) => handleLoginPolicyChange('lockoutDuration', parseInt(e.target.value))}
                    error={settings.loginPolicy.lockoutDuration < 1}
                    helperText={settings.loginPolicy.lockoutDuration < 1 ? 'Must be at least 1 minute' : ''}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Session Timeout (minutes)"
                    value={settings.loginPolicy.sessionTimeout}
                    onChange={(e) => handleLoginPolicyChange('sessionTimeout', parseInt(e.target.value))}
                    error={settings.loginPolicy.sessionTimeout < 1}
                    helperText={settings.loginPolicy.sessionTimeout < 1 ? 'Must be at least 1 minute' : ''}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.loginPolicy.requireMFA}
                        onChange={(e) => handleLoginPolicyChange('requireMFA', e.target.checked)}
                      />
                    }
                    label="Require Multi-Factor Authentication"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                General Security
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.mfaSettings.defaultMethod === 'email'}
                        onChange={(e) => handleSettingChange('mfaSettings', { ...settings.mfaSettings, defaultMethod: e.target.checked ? 'email' : 'sms' })}
                      />
                    }
                    label="Use Email as Default MFA Method"
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
                  onClick={handleSave}
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