import React from 'react';
import { useClient } from '../../context/ClientContext';
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
  const { selectedClient, availableClients, setSelectedClient, isAdmin } = useClient();

  // If not an admin user, don't render the selector
  if (!isAdmin) {
    return null;
  }

  const handleClientChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const clientId = event.target.value as number;
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
              {client.name} {client.environment !== 'production' ? `(${client.environment})` : ''}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ClientSelectorContainer>
  );
};

export default ClientSelector;
