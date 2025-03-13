import React from 'react';
import { Box, Typography, Paper, Divider, Grid } from '@mui/material';
import { useClient } from '../../context/ClientContext';
import { useHost } from '../../context/HostContext';

/**
 * Test component to display client configuration information
 * This is useful for debugging and testing the client selection feature
 */
const ClientConfigTest: React.FC = () => {
  const { selectedClient, isAdmin } = useClient();
  const { isAdmin: hostIsAdmin } = useHost();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Client Configuration Test
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Client Selection Status
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <strong>Is Admin (ClientContext):</strong> {isAdmin ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">
              <strong>Is Admin (HostContext):</strong> {hostIsAdmin ? 'Yes' : 'No'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Selected Client Configuration
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              <strong>Client Name:</strong> {selectedClient.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              <strong>Client ID:</strong> {selectedClient.clientId}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              <strong>Tenant ID:</strong> {selectedClient.tenantId}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              <strong>Environment:</strong> {selectedClient.environment}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              <strong>Hostname:</strong> {selectedClient.hostname}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">
              <strong>URL:</strong> {selectedClient.url}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Client API URL:</strong> {selectedClient.clientApiUrl}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Admin API URL:</strong> {selectedClient.adminApiUrl}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Typography variant="subtitle1" sx={{ mr: 2 }}>
                <strong>Logo:</strong>
              </Typography>
              <Box 
                component="img" 
                src={selectedClient.logoUrl} 
                alt={`${selectedClient.name} logo`}
                sx={{ 
                  maxHeight: 50, 
                  maxWidth: 200,
                  objectFit: 'contain'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ClientConfigTest;
