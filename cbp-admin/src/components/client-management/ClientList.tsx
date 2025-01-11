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
import { useSnackbar } from 'notistack';
import { Client, ClientStatus, ClientType, Environment, ClientSettings } from '../../types/client.types';
import { clientService } from '../../services/clients.service';
import { encodeId } from '../../utils/idEncoder';
import { shouldUseMockData } from '../../config/api.config';
import { ApiResponse, ApiErrorResponse, ApiSuccessResponse } from '../../utils/api';
import logger from '../../utils/logger';

// API types
interface ServiceClient {
  id: string;
  name: string;
  type: string;
  environment: string;
  status: string;
  domain?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  settings?: ClientSettings;
  createdAt?: string;
  updatedAt?: string;
}

interface ServiceClientListResponse {
  items: ServiceClient[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Mock data response format
interface MockServiceClientResponse {
  success: boolean;
  data: {
    items: ServiceClient[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

interface MockApiResponse {
  success: boolean;
  data: MockServiceClientResponse;
}

interface NestedApiResponse {
  success: boolean;
  error?: {
    message: string;
    code: string;
  };
  data: ServiceClientListResponse;
}

const DEFAULT_SETTINGS: Client['settings'] = {
  general: {
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    language: 'en-US',
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
    alertTypes: ['security', 'system'],
  },
  branding: {
    logo: '',
    primaryColor: '#007bff',
    secondaryColor: '#6c757d',
    favicon: '',
  },
  features: {
    billPay: false,
    moneyDesktop: false,
    mobileDeposit: false,
    p2p: false,
    cardControls: false,
  },
};

const transformServiceClient = (serviceClient: ServiceClient): Client => ({
  id: serviceClient.id,
  name: serviceClient.name,
  type: serviceClient.type.toUpperCase() === 'ENTERPRISE' ? ClientType.Enterprise :
        serviceClient.type.toUpperCase() === 'SMALL' ? ClientType.Small :
        serviceClient.type.toUpperCase() === 'MEDIUM' ? ClientType.Medium :
        ClientType.Other,
  status: serviceClient.status.toUpperCase() === 'ACTIVE' ? ClientStatus.Active :
          serviceClient.status.toUpperCase() === 'INACTIVE' ? ClientStatus.Inactive :
          ClientStatus.Pending,
  environment: serviceClient.environment.toLowerCase() === 'production' ? Environment.Production :
               serviceClient.environment.toLowerCase() === 'staging' ? Environment.Staging :
               Environment.Development,
  domain: serviceClient.domain || '',
  contactName: serviceClient.contactName || '',
  contactEmail: serviceClient.contactEmail || '',
  contactPhone: serviceClient.contactPhone || '',
  settings: serviceClient.settings || DEFAULT_SETTINGS,
  createdAt: serviceClient.createdAt || new Date().toISOString(),  
  updatedAt: serviceClient.updatedAt || new Date().toISOString(),  
});

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const isMockMode = shouldUseMockData();

  useEffect(() => {
    logger.log('ClientList - Current location: ' + location.pathname);
    logger.log('ClientList - Using mock data: ' + isMockMode);
    loadClients();
  }, [location, isMockMode]);

  const loadClients = async () => {
    setLoading(true);
    try {
      logger.log('Loading clients...');
      
      const response = await clientService.getClients();
      logger.log('Raw response: ' + JSON.stringify(response));

      if (!response.success) {
        const errorMsg = (response as ApiErrorResponse).error?.message || 'Failed to load clients';
        logger.error('Failed to load clients: ' + errorMsg);
        enqueueSnackbar('Failed to load clients', { variant: 'error' });
        return;
      }

      // Handle both mock and real data formats
      let clientsData: ServiceClient[] = [];
      const responseData = response.data as ServiceClientListResponse | MockServiceClientResponse;
      
      if ('success' in responseData && responseData.success) {
        // Mock data format (nested)
        clientsData = responseData.data.items;
      } else {
        // Real data format (flat)
        clientsData = (responseData as ServiceClientListResponse).items;
      }

      logger.log('Processing ' + clientsData.length + ' clients');
      const clients = clientsData.map(transformServiceClient);
      logger.log('Successfully loaded ' + clients.length + ' clients');
      setClients(clients);
    } catch (error) {
      logger.error('Error loading clients: ' + error);
      enqueueSnackbar('Error loading clients', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditClient = (clientId: string) => {
    logger.log('ClientList - Navigating to client: ' + clientId);
    const encodedId = encodeId(clientId);
    const targetPath = `/admin/client-management/${encodedId}`;
    logger.log('ClientList - Target path: ' + targetPath);
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

  if (isMockMode) {
    return (
      <Alert severity="info" onClose={() => {}}>
        Mock mode is enabled
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
