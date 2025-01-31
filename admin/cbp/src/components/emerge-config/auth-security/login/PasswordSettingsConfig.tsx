import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  Divider
} from '@mui/material';
import { ServiceFactory } from '../../../../services/factory/ServiceFactory';
import { SettingsManager } from '../../../../services/implementations/settings.manager';
import { PasswordSettings } from '../../../../types/ClientConfiguration/models/HomeBankingLogin/PasswordSettings';
import { Setting } from '../../../../types/ClientConfiguration/base/types';

export const PasswordSettingsConfig: React.FC = () => {
  const [settings, setSettings] = useState<PasswordSettings>(new PasswordSettings());
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
      
      // Load the password settings group
      await manager.loadGroup('PasswordSettings');
      const apiSettings = manager.getSettings() as any; // TODO: Fix type mismatch between service and model settings
      const loadedSettings = new PasswordSettings();
      loadedSettings.fromSettings(apiSettings);
      setSettings(loadedSettings);
      setError(null);
    } catch (err) {
      setError('Failed to load password settings');
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
      
      // Convert settings to API format and save
      const apiSettings = settings.toSettings();
      await settingsService.updateSettings(apiSettings as any); // TODO: Fix type mismatch between service and model settings
      setError(null);
    } catch (err) {
      setError('Failed to save password settings');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof PasswordSettings, value: boolean | number) => {
    setSettings(prev => {
      const updated = new PasswordSettings();
      Object.assign(updated, prev);
      switch (field) {
        case 'minVersion':
          updated.minVersion = value as number;
          break;
        case 'canViewPasswordAsPlainTextAtLoginEnabled':
          updated.canViewPasswordAsPlainTextAtLoginEnabled = value as boolean;
          break;
        case 'showForgotUserIdButtonOnInvalidLoginControlEnabled':
          updated.showForgotUserIdButtonOnInvalidLoginControlEnabled = value as boolean;
          break;
        case 'shouldUsePlainTextForShowHidePasswordToggle':
          updated.shouldUsePlainTextForShowHidePasswordToggle = value as boolean;
          break;
      }
      return updated;
    });
  };

  if (loading) {
    return <Typography>Loading password settings...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card>
      <CardHeader title="Password Settings" />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Minimum Version"
            type="number"
            value={settings.minVersion}
            onChange={(e) => handleChange('minVersion', parseFloat(e.target.value))}
            inputProps={{ step: '0.1' }}
            fullWidth
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.canViewPasswordAsPlainTextAtLoginEnabled}
                onChange={(e) => handleChange('canViewPasswordAsPlainTextAtLoginEnabled', e.target.checked)}
              />
            }
            label="Allow viewing password as plain text at login"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.showForgotUserIdButtonOnInvalidLoginControlEnabled}
                onChange={(e) => handleChange('showForgotUserIdButtonOnInvalidLoginControlEnabled', e.target.checked)}
              />
            }
            label="Show 'Forgot User ID' button on invalid login"
          />

          <FormControlLabel
            control={
              <Switch
                checked={settings.shouldUsePlainTextForShowHidePasswordToggle}
                onChange={(e) => handleChange('shouldUsePlainTextForShowHidePasswordToggle', e.target.checked)}
              />
            }
            label="Use plain text for password show/hide toggle"
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PasswordSettingsConfig;
