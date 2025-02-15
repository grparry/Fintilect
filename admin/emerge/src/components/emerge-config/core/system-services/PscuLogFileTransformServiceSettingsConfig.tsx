import React, { useEffect, useState } from 'react';
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
import { 
  PscuLogFileTransformServiceSettings,
  FilterConfig,
  PathConfig,
  InputFieldConfig,
  OutputFieldConfig
} from '../../../../types/ClientConfiguration/models/WindowsService/PscuLogFileTransformServiceSettings';
import FiltersSection from './sections/FiltersSection';
import PathConfigSection from './sections/PathConfigSection';
import InputFieldsSection from './sections/InputFieldsSection';
import OutputFieldsSection from './sections/OutputFieldsSection';

const PscuLogFileTransformServiceSettingsConfig: React.FC = () => {
  const [settings, setSettings] = useState<PscuLogFileTransformServiceSettings>(new PscuLogFileTransformServiceSettings());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | false>('filters');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const settingsService = ServiceFactory.getInstance().getSettingsService();
      const manager = new SettingsManager(settingsService);
      
      await manager.loadGroup('PscuLogFileTransformService');
      const apiSettings = manager.getSettings() as any;
      const loadedSettings = new PscuLogFileTransformServiceSettings();
      loadedSettings.fromSettings(apiSettings);
      setSettings(loadedSettings);
      setError(null);
    } catch (err) {
      setError('Failed to load PSCU log file transform service settings');
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
      await settingsService.updateSettings(apiSettings as any);
      setError(null);
    } catch (err) {
      setError('Failed to save PSCU log file transform service settings');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFiltersChange = (filters: FilterConfig[]) => {
    const newSettings = new PscuLogFileTransformServiceSettings();
    Object.assign(newSettings, settings);
    newSettings.filters = filters;
    setSettings(newSettings);
  };

  const handlePathConfigChange = (pathConfig: PathConfig) => {
    const newSettings = new PscuLogFileTransformServiceSettings();
    Object.assign(newSettings, settings);
    newSettings.pathConfiguration = pathConfig;
    setSettings(newSettings);
  };

  const handleInputFieldsChange = (fields: InputFieldConfig[]) => {
    const newSettings = new PscuLogFileTransformServiceSettings();
    Object.assign(newSettings, settings);
    newSettings.inputFileFields = fields;
    setSettings(newSettings);
  };

  const handleOutputFieldsChange = (fields: OutputFieldConfig[]) => {
    const newSettings = new PscuLogFileTransformServiceSettings();
    Object.assign(newSettings, settings);
    newSettings.outputFileFields = fields;
    setSettings(newSettings);
  };

  if (loading) {
    return <Typography>Loading PSCU log file transform service settings...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Card>
      <CardHeader 
        title="PSCU Log File Transform Service Settings" 
        action={
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        }
      />
      <Divider />
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FiltersSection
            expanded={expanded === 'filters'}
            filters={settings.filters}
            onChange={handleAccordionChange('filters')}
            onFiltersChange={handleFiltersChange}
          />
          <PathConfigSection
            expanded={expanded === 'pathConfig'}
            pathConfig={settings.pathConfiguration}
            onChange={handleAccordionChange('pathConfig')}
            onPathConfigChange={handlePathConfigChange}
          />
          <InputFieldsSection
            expanded={expanded === 'inputFields'}
            fields={settings.inputFileFields}
            onChange={handleAccordionChange('inputFields')}
            onFieldsChange={handleInputFieldsChange}
          />
          <OutputFieldsSection
            expanded={expanded === 'outputFields'}
            fields={settings.outputFileFields}
            onChange={handleAccordionChange('outputFields')}
            onFieldsChange={handleOutputFieldsChange}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PscuLogFileTransformServiceSettingsConfig;
