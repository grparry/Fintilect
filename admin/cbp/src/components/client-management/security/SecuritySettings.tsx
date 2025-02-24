import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { SecuritySettings as SecuritySettingsType } from '../../../types/security.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import MemberSecuritySettings from './MemberSecuritySettings';

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

  useEffect(() => {
    loadSettings();
  }, [clientId]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const clientService = ServiceFactory.getInstance().getClientService();
      const config = await clientService.getClientConfig(parseInt(clientId));
      const mergedSettings: SecuritySettingsType = {
        ...defaultSecuritySettings,
        ...config.security
      };
      setSettings(mergedSettings);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load security settings';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsChange = (field: keyof SecuritySettingsType, value: any) => {
    if (settings) {
      setSettings({
        ...settings,
        [field]: value
      });
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Security Settings
      </Typography>
      <Paper>
        <Box p={3}>
          <MemberSecuritySettings
            clientId={clientId}
            settings={settings}
            onChange={handleSettingsChange}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default SecuritySettings;