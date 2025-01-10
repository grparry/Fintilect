import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Client, ClientStatus, ClientType, Environment } from '../../types/client.types';
import { clientService } from '../../services/clients.service';
import { encodeId } from '../../utils/idEncoder';
import { shouldUseMockData } from '../../config/api.config';
import { ApiResponse } from '../../utils/api';

interface ClientListResponse {
  items: Client[];
}

const serviceClientToUIClient = (serviceClient: any): Client => ({
  id: serviceClient.id,
  name: serviceClient.name,
  type: serviceClient.type === 'ENTERPRISE' ? ClientType.Enterprise :
        serviceClient.type === 'SMB' ? ClientType.Small :
        serviceClient.type === 'STARTUP' ? ClientType.Medium :
        ClientType.Other,
  status: serviceClient.status === 'ACTIVE' ? ClientStatus.Active :
          serviceClient.status === 'INACTIVE' ? ClientStatus.Inactive :
          ClientStatus.Pending,
  environment: serviceClient.environment === 'PRODUCTION' ? Environment.Production :
              serviceClient.environment === 'STAGING' ? Environment.Staging :
              Environment.Development,
  domain: serviceClient.domain || '',
  contactName: serviceClient.contactName || '',
  contactEmail: serviceClient.contactEmail || '',
  contactPhone: serviceClient.contactPhone || '',
  settings: serviceClient.settings || {
    general: {},
    security: {},
    notifications: {},
    branding: {},
    features: {},
  },
  createdAt: serviceClient.createdAt,
  updatedAt: serviceClient.updatedAt,
});

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMockMode = shouldUseMockData();

  useEffect(() => {
    console.log('ClientList - Current location:', location.pathname);
    console.log('ClientList - Using mock data:', isMockMode);
    loadClients();
  }, [location, isMockMode]);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await clientService.getClients();
      console.log('ClientList - Loaded clients:', response);
      
      if (response.success) {
        setClients(response.data.items.map(serviceClientToUIClient));
      } else {
        setError(response.error?.message || 'Failed to load clients');
      }
    } catch (err) {
      setError('Failed to load clients');
      console.error('Error loading clients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClient = (clientId: string) => {
    console.log('ClientList - Navigating to client:', clientId);
    const encodedId = encodeId(clientId);
    const targetPath = `/admin/client-management/${encodedId}`;
    console.log('ClientList - Target path:', targetPath);
    navigate(targetPath);
  };

  const getStatusColor = (status: ClientStatus) => {
    switch (status) {
      case ClientStatus.Active:
        return 'success';
      case ClientStatus.Inactive:
        return 'error';
      case ClientStatus.Pending:
        return 'warning';
      default:
        return 'default';
    }
  };

  const getEnvironmentColor = (env: Environment) => {
    switch (env) {
      case Environment.Production:
        return 'error';
      case Environment.Staging:
        return 'warning';
      case Environment.Development:
        return 'info';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" onClose={() => setError(null)}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Clients
        {isMockMode && (
          <Chip
            label="Mock Mode"
            color="info"
            size="small"
            sx={{ ml: 1 }}
          />
        )}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Environment</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>
                  <Chip
                    label={client.environment}
                    color={getEnvironmentColor(client.environment)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={client.status}
                    color={getStatusColor(client.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{client.type}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Client">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClient(client.id)}
                      aria-label="edit client"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientList;
