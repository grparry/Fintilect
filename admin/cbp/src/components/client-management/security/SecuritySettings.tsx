import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import logger from '../../../utils/logger';
import {
  Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { 
  ClientLoginSecurityResponse 
} from '../../../types/security.types';
import { clientLoginSecurityService } from '../../../services/factory/ServiceFactory';
import ClientLoginSecuritySettings from './ClientLoginSecuritySettings';
import { decodeId } from '../../../utils/idEncoder';

const SecuritySettings: React.FC = () => {
  // Extract and decode clientId from URL parameters
  const { clientId: encodedClientId } = useParams<{ clientId: string }>();
  const clientId = encodedClientId ? decodeId(encodedClientId) : '';
  const [clientLoginSettings, setClientLoginSettings] = useState<ClientLoginSecurityResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, [clientId]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // The clientId should already be decoded by the wrapper component
      // Convert to number for the service call
      const numericClientId = Number(clientId);
      
      if (isNaN(numericClientId)) {
        throw new Error(`Invalid client ID: ${clientId}`);
      }
      
      // Load client login security settings
      const loginSecuritySettings = await clientLoginSecurityService.getLoginSecurityByClientId(numericClientId);
      setClientLoginSettings(loginSecuritySettings);
    } catch (err) {
      logger.error('Error loading security settings:', err);
      const message = err instanceof Error ? err.message : 'Failed to load security settings';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!clientId) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Client ID is required. Please select a client from the list.
      </Alert>
    );
  }

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
      <Paper sx={{ p: 3 }}>
        {clientLoginSettings ? (
          <ClientLoginSecuritySettings
            clientId={clientId}
            settings={clientLoginSettings}
            onRefresh={loadSettings}
          />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default SecuritySettings;