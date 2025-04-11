import React from 'react';
import { useClient } from '../../context/ClientContext';
import logger from '../../utils/logger';
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const ClientSelectorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
}));

const ClientLabel = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

const ClientSelector: React.FC = () => {
  const { selectedClient, availableClients, setSelectedClient, isAdmin, usesClientApi } = useClient();

  // Debug: Log client selector state
  logger.log('[ClientSelector] Rendering with:', {
    isAdmin,
    usesClientApi,
    selectedClientId: selectedClient?.clientId,
    availableClientsCount: Object.keys(availableClients).length
  });

  // Debug: Log available clients
  if (Object.keys(availableClients).length === 0) {
    logger.log('[ClientSelector] WARNING: No available clients to display in dropdown');
  } else {
    logger.log('[ClientSelector] Available clients:', 
      Object.values(availableClients).map(c => ({ 
        id: c.clientId, 
        name: c.name, 
        environment: c.environment 
      }))
    );
  }

  // Only render the selector if the user is an admin AND the current view uses client API
  if (!isAdmin || !usesClientApi) {
    logger.log('[ClientSelector] Not rendering because:', { isAdmin, usesClientApi });
    return null;
  }

  const handleClientChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const clientId = event.target.value as number;
    logger.log(`[ClientSelector] Selected client changed to ID: ${clientId}`);
    setSelectedClient(clientId);
  };

  return (
    <ClientSelectorContainer>
      <ClientLabel variant="body2">Client:</ClientLabel>
      <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
        <Select
          value={selectedClient.clientId}
          onChange={handleClientChange as any}
          displayEmpty
          inputProps={{ 'aria-label': 'Select client' }}
        >
          {Object.values(availableClients).map((client) => (
            <MenuItem key={client.clientId} value={client.clientId}>
              {client.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ClientSelectorContainer>
  );
};

export default ClientSelector;
