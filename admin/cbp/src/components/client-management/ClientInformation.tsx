import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  CircularProgress,
} from '@mui/material';
import { clientService } from '../../services/factory/ServiceFactory';
import logger from '../../utils/logger';
import { Client } from '../../types/client.types';

interface ClientInformationProps {
  clientId: string;
}

interface ClientInfo {
  name: string;
  sponsorId: string;
  routingId: string;
  domain: string;
  environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
  type: 'ENTERPRISE' | 'SMB' | 'STARTUP' | 'STANDARD';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
}

const ClientInformation: React.FC<ClientInformationProps> = ({ clientId }) => {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    sponsorId: '',
    routingId: '',
    domain: '',
    environment: 'DEVELOPMENT',
    type: 'STANDARD',
    status: 'ACTIVE',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadClientInfo = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const client = await clientService.getClient(Number(clientId));
      if (!client) {
        throw new Error('Client not found');
      }
      setClientInfo({
        name: client.name || '',
        sponsorId: client.sponsorId?.toString() || '',
        routingId: client.routingId || '',
        domain: client.domain || '',
        environment: (client.environment || 'DEVELOPMENT') as 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT',
        type: (client.type || 'STANDARD') as 'ENTERPRISE' | 'SMB' | 'STARTUP' | 'STANDARD',
        status: (client.status || 'ACTIVE') as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED',
      });
      logger.info(`Client information loaded for client ${clientId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to load client information: ${errorMessage}`);
      setError('Failed to load client information. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    loadClientInfo();
  }, [loadClientInfo]);

  const handleInputChange = useCallback((field: keyof ClientInfo) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setClientInfo((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    setSuccess(null);
    setError(null);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Get the current client data to ensure we have all fields
      const currentClient = await clientService.getClient(Number(clientId));
      
      // Create an update object with all fields from the current client
      const clientUpdate: Partial<Client> = {
        // Include all fields from the current client
        ...currentClient,
        // Override with the edited values
        name: clientInfo.name,
        sponsorId: parseInt(clientInfo.sponsorId, 10) || null,
        routingId: clientInfo.routingId || null,
        domain: clientInfo.domain || null,
        environment: clientInfo.environment,
        type: clientInfo.type,
        status: clientInfo.status,
        id: Number(clientId)
      };
      
      logger.info(`Updating client ${clientId} with full client data`);
      await clientService.updateClient(Number(clientId), clientUpdate);
      setSuccess('Client information updated successfully');
      logger.info(`Client information updated for client ${clientId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to update client information: ${errorMessage}`);
      setError('Failed to update client information. Please try again later.');
    } finally {
      setSaving(false);
    }
  }, [clientId, clientInfo]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom color="text.primary">
            Client Information
          </Typography>
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Alert severity="error">{error}</Alert>
          </Grid>
        )}
        {success && (
          <Grid item xs={12}>
            <Alert severity="success">{success}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Name"
            value={clientInfo.name}
            onChange={handleInputChange('name')}
            disabled={saving}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Environment</InputLabel>
            <Select
              value={clientInfo.environment}
              label="Environment"
              onChange={(e) => handleInputChange('environment')(e as React.ChangeEvent<HTMLInputElement>)}
              disabled={saving}
            >
              {(['PRODUCTION', 'STAGING', 'DEVELOPMENT'] as const).map((env) => (
                <MenuItem key={env} value={env}>{env}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select the client's environment</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Type</InputLabel>
            <Select
              value={clientInfo.type}
              label="Type"
              onChange={(e) => handleInputChange('type')(e as React.ChangeEvent<HTMLInputElement>)}
              disabled={saving}
            >
              {(['ENTERPRISE', 'SMB', 'STARTUP', 'STANDARD'] as const).map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select the client type</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Status</InputLabel>
            <Select
              value={clientInfo.status}
              label="Status"
              onChange={(e) => handleInputChange('status')(e as React.ChangeEvent<HTMLInputElement>)}
              disabled={saving}
            >
              {(['ACTIVE', 'INACTIVE', 'SUSPENDED'] as const).map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select the client status</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }} color="text.primary">
            Routing Information
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Sponsor ID"
            value={clientInfo.sponsorId}
            onChange={handleInputChange('sponsorId')}
            disabled={saving}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Routing ID"
            value={clientInfo.routingId}
            onChange={handleInputChange('routingId')}
            disabled={saving}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Domain"
            value={clientInfo.domain}
            onChange={handleInputChange('domain')}
            disabled={saving}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientInformation;
