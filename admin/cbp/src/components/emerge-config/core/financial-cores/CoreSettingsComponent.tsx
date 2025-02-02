import React, { useEffect, useState, ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Button
} from '@mui/material';
import { ServiceFactory } from '../../../../services/factory/ServiceFactory';
import { SettingsManager } from '../../../../services/implementations/settings.manager';
import { ISettingsGroup } from '../../../../types/ClientConfiguration/base/types';
import { Setting as ApiSetting } from '../../../../types/settings.types';
import { Setting as ModelSetting } from '../../../../types/ClientConfiguration/base/types';

interface CoreSettingsComponentProps<T extends ISettingsGroup> {
  title: string;
  settingsGroupName: string;
  ModelClass: new () => T;
  onSettingsLoaded?: (settings: T) => void;
  children: (props: {
    settings: T;
    onBooleanChange: (field: keyof T, value: boolean) => void;
    onNumberChange: (field: keyof T, value: string) => void;
    onStringChange: (field: keyof T, value: string) => void;
  }) => ReactNode;
}

export function CoreSettingsComponent<T extends ISettingsGroup>({ 
  title,
  settingsGroupName,
  ModelClass,
  onSettingsLoaded,
  children
}: CoreSettingsComponentProps<T>) {
  const [settings, setSettings] = useState<T>(new ModelClass());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, [settingsGroupName]);

  const convertApiToModelSettings = (apiSettings: ApiSetting[]): ModelSetting[] => {
    return apiSettings.map(setting => {
      let value: string;
      if (typeof setting.value === 'boolean') {
        value = setting.value.toString();
      } else if (typeof setting.value === 'number') {
        value = setting.value.toString();
      } else {
        value = setting.value as string;
      }

      return {
        key: setting.key,
        value,
        dataType: setting.type === 'string' ? 'string' :
                  setting.type === 'number' ? 'number' :
                  setting.type === 'boolean' ? 'boolean' : 'string', // Default to string instead of json
        description: setting.description
      };
    });
  };

  const convertModelToApiSettings = (modelSettings: ModelSetting[]): ApiSetting[] => {
    return modelSettings.map(setting => {
      let value: string | number | boolean = setting.value;
      
      // Convert value based on dataType
      if (setting.dataType === 'number') {
        value = parseFloat(setting.value) || 0;
      } else if (setting.dataType === 'boolean') {
        value = setting.value.toLowerCase() === 'true';
      }

      return {
        key: setting.key,
        value,
        type: setting.dataType === 'json' ? 'string' : setting.dataType,
        label: setting.key, // Use key as label
        description: setting.description,
        isRequired: true
      };
    });
  };

  const loadSettings = async () => {
    try {
      setLoading(true);
      const settingsService = ServiceFactory.getInstance().getSettingsService();
      const manager = new SettingsManager(settingsService);
      
      await manager.loadGroup(settingsGroupName);
      const apiSettings = manager.getSettings() as ApiSetting[];
      const modelSettings = convertApiToModelSettings(apiSettings);
      
      const loadedSettings = new ModelClass();
      loadedSettings.fromSettings(modelSettings);
      setSettings(loadedSettings);
      if (onSettingsLoaded) {
        onSettingsLoaded(loadedSettings);
      }
      setError(null);
    } catch (err) {
      setError(`Failed to load ${title.toLowerCase()} settings`);
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
      setError(`Failed to save ${title.toLowerCase()} settings`);
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBooleanChange = (field: keyof T, value: boolean) => {
    setSettings(prev => {
      const updated = new ModelClass();
      updated.fromSettings(prev.toSettings());
      (updated[field] as boolean) = value;
      return updated;
    });
  };

  const handleNumberChange = (field: keyof T, value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setSettings(prev => {
        const updated = new ModelClass();
        updated.fromSettings(prev.toSettings());
        (updated[field] as number) = numValue;
        return updated;
      });
    }
  };

  const handleStringChange = (field: keyof T, value: string) => {
    setSettings(prev => {
      const updated = new ModelClass();
      updated.fromSettings(prev.toSettings());
      (updated[field] as string) = value;
      return updated;
    });
  };

  return (
    <Box sx={{ height: 'calc(100vh - 240px)', display: 'flex', flexDirection: 'column' }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          title={title}
          sx={{ flexShrink: 0 }}
        />
        <Divider />
        <CardContent sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
          {loading ? (
            <Typography>Loading settings...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            children({
              settings,
              onBooleanChange: handleBooleanChange,
              onNumberChange: handleNumberChange,
              onStringChange: handleStringChange,
            })
          )}
        </CardContent>
        <Divider />
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Button 
            variant="contained" 
            onClick={handleSave}
            fullWidth
          >
            Save Changes
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
