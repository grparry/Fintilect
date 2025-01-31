import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Switch,
  Typography,
  Divider
} from '@mui/material';
import { ServiceFactory } from '../../../../services/factory/ServiceFactory';
import { SettingsManager } from '../../../../services/implementations/settings.manager';
import { PasswordVerificationSettings } from '../../../../types/ClientConfiguration/models/PasswordVerification/PasswordVerificationSettings';
import { Setting } from '../../../../types/ClientConfiguration/base/types';

export const PasswordVerificationSettingsConfig: React.FC = () => {
  const [settings, setSettings] = useState<PasswordVerificationSettings>(new PasswordVerificationSettings());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const settingsService = ServiceFactory.getInstance().getSettingsService();
      const manager = new SettingsManager(settingsService);
      
      await manager.loadGroup('PasswordVerification');
      const apiSettings = manager.getSettings() as any; // TODO: Fix type mismatch between service and model settings
      const loadedSettings = new PasswordVerificationSettings();
      loadedSettings.fromSettings(apiSettings);
      setSettings(loadedSettings);
      setError(null);
    } catch (err) {
      setError('Failed to load password verification settings');
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const settingsService = ServiceFactory.getInstance().getSettingsService();
      const manager = new SettingsManager(settingsService);
      
      const apiSettings = settings.toSettings();
      await settingsService.updateSettings(apiSettings as any); // TODO: Fix type mismatch between service and model settings
      setError(null);
    } catch (err) {
      setError('Failed to save password verification settings');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof PasswordVerificationSettings, value: boolean) => {
    setSettings(prev => {
      const updated = new PasswordVerificationSettings();
      updated.fromSettings(prev.toSettings());
      if (field === 'passwordResetCannotContainSSNumber') {
        updated.passwordResetCannotContainSSNumber = value;
      }
      return updated;
    });
  };

  if (loading) {
    return <Typography>Loading password verification settings...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card>
      <CardHeader title="Password Verification Settings" />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={settings.passwordResetCannotContainSSNumber}
                onChange={(e) => handleChange('passwordResetCannotContainSSNumber', e.target.checked)}
              />
            }
            label="Prevent using SSN in passwords"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PasswordVerificationSettingsConfig;
