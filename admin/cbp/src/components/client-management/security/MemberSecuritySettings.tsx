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
import { SecuritySettings } from '../../../types/security.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { IClientService } from '../../../services/interfaces/IClientService';
import { ISecurityService } from '../../../services/interfaces/ISecurityService';

interface MemberSecuritySettingsProps {
  clientId: string;
}
const MemberSecuritySettings: React.FC<MemberSecuritySettingsProps> = ({ clientId }) => {
  // Services
  const clientService = ServiceFactory.getInstance().getClientService();
  const securityService = ServiceFactory.getInstance().getSecurityService();
  // State
  const [settings, setSettings] = useState<SecuritySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const defaultSecuritySettings: SecuritySettings = {
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
  // Load initial data
  useEffect(() => {
    loadSettings();
  }, [clientId]);
  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      // Get security settings through service factory
      const response = await clientService.getSecuritySettings(clientId);
      // Ensure all required fields are present by merging with defaults
      const mergedSettings: SecuritySettings = {
        ...defaultSecuritySettings,
        ...response
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
  const validateSettings = (settings: SecuritySettings): string | null => {
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
    // Validate settings
    const validationError = validateSettings(settings);
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      setSaving(true);
      setError(null);
      // Update settings through service factory
      const updatedSettings = await clientService.updateSecuritySettings(clientId, settings);
      setSettings(updatedSettings);
      setIsDirty(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update security settings';
      setError(message);
    } finally {
      setSaving(false);
    }
  };
  const handlePasswordPolicyChange = (field: keyof SecuritySettings['passwordPolicy'], value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      passwordPolicy: {
        ...settings.passwordPolicy,
        [field]: value
      }
    });
    setIsDirty(true);
  };
  const handleLoginPolicyChange = (field: keyof SecuritySettings['loginPolicy'], value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      loginPolicy: {
        ...settings.loginPolicy,
        [field]: value
      }
    });
    setIsDirty(true);
  };
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }
  if (!settings) {
    return (
      <Alert severity="error">
        Failed to load security settings
      </Alert>
    );
  }
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" color="text.primary">Member Security Settings</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSave}
          disabled={saving || !isDirty}
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
          <Typography variant="h6" color="text.primary" gutterBottom>
            Password Policy
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Minimum Password Length"
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
                label="Require Uppercase Letters"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            Login Policy
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Maximum Login Attempts"
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
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default MemberSecuritySettings;