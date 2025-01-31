import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Divider,
  Grid,
  Button
} from '@mui/material';
import { ServiceFactory } from '../../../../services/factory/ServiceFactory';
import { SettingsManager } from '../../../../services/implementations/settings.manager';
import { FinancialCore } from '../../../../types/ClientConfiguration/models/FinancialCores/FinancialCore';
import { FinancialCoreTypes } from '../../../../types/ClientConfiguration/models/FinancialCores/FinancialCoreTypes';
import { Setting as ApiSetting } from '../../../../types/settings.types';
import { Setting as ModelSetting } from '../../../../types/ClientConfiguration/base/types';

export const BaseConfigurationSettings: React.FC = () => {
  const [settings, setSettings] = useState<FinancialCore>(new FinancialCore());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const convertApiToModelSettings = (apiSettings: ApiSetting[]): ModelSetting[] => {
    return apiSettings.map(setting => ({
      key: setting.key,
      value: setting.value.toString(), // Model expects string
      dataType: setting.type === 'string' ? 'string' :
                setting.type === 'number' ? 'number' :
                setting.type === 'boolean' ? 'boolean' : 'json',
      description: setting.description
    }));
  };

  const convertModelToApiSettings = (modelSettings: ModelSetting[]): ApiSetting[] => {
    return modelSettings.map(setting => ({
      key: setting.key,
      value: setting.value,
      type: setting.dataType === 'json' ? 'string' : setting.dataType,
      label: setting.key, // Use key as label
      description: setting.description,
      isRequired: true // Default to required
    }));
  };

  const loadSettings = async () => {
    try {
      setLoading(true);
      const settingsService = ServiceFactory.getInstance().getSettingsService();
      const manager = new SettingsManager(settingsService);
      
      await manager.loadGroup('FinancialCore');
      const apiSettings = manager.getSettings() as ApiSetting[];
      const modelSettings = convertApiToModelSettings(apiSettings);
      
      const loadedSettings = new FinancialCore();
      loadedSettings.fromSettings(modelSettings);
      setSettings(loadedSettings);
      setError(null);
    } catch (err) {
      setError('Failed to load financial core settings');
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
      
      const modelSettings = settings.toSettings();
      const apiSettings = convertModelToApiSettings(modelSettings);
      await settingsService.updateSettings(apiSettings);
      setError(null);
    } catch (err) {
      setError('Failed to save financial core settings');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooleanChange = (field: keyof FinancialCore, value: boolean) => {
    setSettings(prev => {
      const updated = new FinancialCore();
      updated.fromSettings(prev.toSettings());
      (updated[field] as boolean) = value;
      return updated;
    });
  };

  const handleNumberChange = (field: keyof FinancialCore, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setSettings(prev => {
        const updated = new FinancialCore();
        updated.fromSettings(prev.toSettings());
        (updated[field] as number) = numValue;
        return updated;
      });
    }
  };

  const handleStringChange = (field: keyof FinancialCore, value: string) => {
    setSettings(prev => {
      const updated = new FinancialCore();
      updated.fromSettings(prev.toSettings());
      (updated[field] as string) = value;
      return updated;
    });
  };

  if (loading) {
    return <Typography>Loading financial core settings...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card>
      <CardHeader title="Financial Core Base Configuration" />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid container spacing={3}>
            {/* Core Type Selection */}
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Core Type"
                value={settings.coreType}
                onChange={(e) => handleStringChange('coreType', e.target.value)}
                SelectProps={{
                  native: true,
                }}
              >
                {Object.values(FinancialCoreTypes).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </TextField>
            </Grid>

            {/* Boolean Switches */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.useClassicCore}
                    onChange={(e) => handleBooleanChange('useClassicCore', e.target.checked)}
                  />
                }
                label="Use Classic Core"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.shouldBypassICoreForAccountInquiry}
                    onChange={(e) => handleBooleanChange('shouldBypassICoreForAccountInquiry', e.target.checked)}
                  />
                }
                label="Bypass ICore for Account Inquiry"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.shouldBypassICoreForScheduledTransfers}
                    onChange={(e) => handleBooleanChange('shouldBypassICoreForScheduledTransfers', e.target.checked)}
                  />
                }
                label="Bypass ICore for Scheduled Transfers"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.shouldMapPasswordDuringAccountInquiry}
                    onChange={(e) => handleBooleanChange('shouldMapPasswordDuringAccountInquiry', e.target.checked)}
                  />
                }
                label="Map Password During Account Inquiry"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.cacheAccountInquiry}
                    onChange={(e) => handleBooleanChange('cacheAccountInquiry', e.target.checked)}
                  />
                }
                label="Cache Account Inquiry"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.cacheAccountInquiryForClassicCores}
                    onChange={(e) => handleBooleanChange('cacheAccountInquiryForClassicCores', e.target.checked)}
                  />
                }
                label="Cache Account Inquiry for Classic Cores"
              />
            </Grid>

            {/* String and Number Fields */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Core Connection String"
                value={settings.coreConnectionString}
                onChange={(e) => handleStringChange('coreConnectionString', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Cache Account Inquiry Wait (seconds)"
                value={settings.cacheAccountInquiryWaitForSeconds}
                onChange={(e) => handleNumberChange('cacheAccountInquiryWaitForSeconds', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Cache Expire (minutes)"
                value={settings.cacheExpireInMinutes}
                onChange={(e) => handleNumberChange('cacheExpireInMinutes', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                type="number"
                label="Throttle Account Inquiry"
                value={settings.throttleAccoutInquiry}
                onChange={(e) => handleNumberChange('throttleAccoutInquiry', e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="contained" onClick={handleSave}>Save Changes</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
