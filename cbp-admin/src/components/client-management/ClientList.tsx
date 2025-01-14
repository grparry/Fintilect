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
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Client, ClientStatus, ClientType, Environment, ClientSettings } from '../../types/client.types';
import { clientService } from '../../services/clients.service';
import { encodeId } from '../../utils/idEncoder';
import { shouldUseMockData } from '../../config/api.config';
import { PaginatedResponse } from '../../types/common.types';
import logger from '../../utils/logger';

const DEFAULT_SETTINGS: ClientSettings = {
  general: {
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    language: 'en',
  },
  security: {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expirationDays: 90,
    },
    loginPolicy: {
      maxAttempts: 5,
      lockoutDuration: 30,
    },
    sessionTimeout: 30,
    mfaEnabled: false,
    ipWhitelist: [],
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: false,
    frequency: 'realtime',
    alertTypes: ['payment', 'security', 'system'],
  },
};

const transformServiceClient = (serviceClient: any): Client => ({
  id: serviceClient.id,
  name: serviceClient.name,
  type: serviceClient.type as ClientType,
  environment: serviceClient.environment as Environment,
  status: serviceClient.status as ClientStatus,
  domain: serviceClient.domain,
  contactName: serviceClient.contactName,
  contactEmail: serviceClient.contactEmail,
  contactPhone: serviceClient.contactPhone,
  settings: serviceClient.settings || DEFAULT_SETTINGS,
  createdAt: serviceClient.createdAt,
  updatedAt: serviceClient.updatedAt,
});

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await clientService.getClients();
      setClients(response.items.map(transformServiceClient));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load clients';
      setError(message);
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const getTypeChipColor = (type: ClientType) => {
    switch (type) {
      case ClientType.Enterprise:
        return 'primary';
      case ClientType.SMB:
        return 'secondary';
      case ClientType.Startup:
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusChipColor = (status: ClientStatus) => {
    switch (status) {
      case ClientStatus.Active:
        return 'success';
      case ClientStatus.Inactive:
        return 'error';
      case ClientStatus.Suspended:
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleEditClick = (clientId: string) => {
    navigate(`/clients/${encodeId(clientId)}/edit`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mb={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Environment</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>
                <Chip
                  label={client.type}
                  color={getTypeChipColor(client.type)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={client.environment}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={client.status}
                  color={getStatusChipColor(client.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {client.contactName && (
                  <Tooltip title={`${client.contactEmail || ''}\n${client.contactPhone || ''}`}>
                    <span>{client.contactName}</span>
                  </Tooltip>
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  size="small"
                  onClick={() => handleEditClick(client.id)}
                  aria-label="edit client"
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClientList;
