import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';
import MemberSecuritySettings from '../security/MemberSecuritySettings';
import { decodeId } from '../../../utils/idEncoder';
import { SecuritySettings } from '../../../types/security.types';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import Logger from '../../../utils/logger';

const MemberSecuritySettingsWrapper: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [settings, setSettings] = useState<SecuritySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('DIRECT TEST - Component mounted');
    const init = async () => {
      try {
        await Logger.info('TEST LOG - Component mounted');
        await fetchSettings();
      } catch (error) {
        console.error('Error in init:', error);
      }
    };
    init();
  }, [clientId]);

  const fetchSettings = async () => {
    if (!clientId) {
      await Logger.info('No clientId provided');
      return;
    }
    
    try {
      await Logger.info(`Fetching settings for clientId: ${clientId}`);
      const decodedClientId = decodeId(clientId);
      await Logger.info(`Decoded clientId: ${decodedClientId}`);
      
      setLoading(true);
      setError(null);
      
      await Logger.info('Getting security service from factory');
      const securityService = ServiceFactory.getInstance().getSecurityService();
      await Logger.info(`Security service instance: ${JSON.stringify(securityService)}`);
      
      await Logger.info('Calling securityService.getSecuritySettings()');
      const securitySettings = await securityService.getSecuritySettings();
      await Logger.info(`Received security settings: ${JSON.stringify(securitySettings)}`);
      
      setSettings(securitySettings);
    } catch (error) {
      console.error('Detailed error:', error);
      await Logger.error(`Error details: ${error instanceof Error ? error.stack : String(error)}`);
      if (error instanceof Error) {
        setError(error.message || 'Failed to load security settings');
      } else {
        setError('Failed to load security settings');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!clientId) {
    Logger.info('Rendering: No clientId error').catch(console.error);
    return (
      <Alert severity="error">
        Client ID is required. Please select a client from the list.
      </Alert>
    );
  }

  if (loading) {
    Logger.info('Rendering: Loading state').catch(console.error);
    return <CircularProgress />;
  }

  if (error) {
    Logger.info(`Rendering: Error state - ${error}`).catch(console.error);
    return (
      <Alert severity="error">
        {error}
      </Alert>
    );
  }

  if (!settings) {
    Logger.info('Rendering: No settings found').catch(console.error);
    return (
      <Alert severity="error">
        No security settings found.
      </Alert>
    );
  }

  Logger.info('Rendering: Success state with settings').catch(console.error);

  const handleChange = (field: keyof SecuritySettings, value: any) => {
    if (!settings) return;
    
    const updatedSettings = {
      ...settings,
      [field]: value
    };
    
    setSettings(updatedSettings);
    
    // Debounce the API call to avoid too many requests
    const updateSettings = async () => {
      try {
        await Logger.info(`Updating settings - field: ${field}, value: ${JSON.stringify(value)}`);
        setLoading(true);
        setError(null);
        const securityService = ServiceFactory.getInstance().getSecurityService();
        const newSettings = await securityService.updateSecuritySettings(updatedSettings);
        await Logger.info(`Settings updated successfully: ${JSON.stringify(newSettings)}`);
        setSettings(newSettings);
      } catch (error) {
        await Logger.error(`Error updating settings: ${error instanceof Error ? error.stack : String(error)}`);
        setError('Failed to update security settings');
      } finally {
        setLoading(false);
      }
    };
    
    updateSettings();
  };

  return <MemberSecuritySettings clientId={decodeId(clientId)} settings={settings} onChange={handleChange} />;
};

export default MemberSecuritySettingsWrapper;