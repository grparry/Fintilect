import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { Client, Environment, ClientStatus, ClientType } from '../../types/client.types';
import { clientService } from '../../services/factory/ServiceFactory';
import ContactInformation from './ContactInformation';
import GroupsWrapper from './wrappers/GroupsWrapper';
import UsersWrapper from './wrappers/UsersWrapper';
import MemberSecuritySettingsWrapper from './wrappers/MemberSecuritySettingsWrapper';
import AuditSearchWrapper from './wrappers/AuditSearchWrapper';
import { encodeId } from '../../utils/idEncoder';
import logger from '../../utils/logger';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`client-tabpanel-${index}`}
      aria-labelledby={`client-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface ClientManagementProps {
  clientId: string;
}

const DEFAULT_SETTINGS = {
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

const ClientManagement: React.FC<ClientManagementProps> = ({ clientId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Load client data
  const loadClientData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const clientData = await clientService.getClient(clientId);
      if (!clientData) {
        throw new Error('Client not found');
      }
      setClient(clientData);
      logger.info(`Client data loaded successfully for ${clientId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logger.error(`Failed to load client data: ${errorMessage}`);
      setError(errorMessage === 'Client not found' 
        ? 'Client not found. Please check the client ID and try again.' 
        : 'Failed to load client data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    loadClientData();
  }, [loadClientData]);

  const getCurrentTab = () => {
    const path = location.pathname;
    if (path.includes('/users')) return 1;
    if (path.includes('/groups')) return 2;
    if (path.includes('/security')) return 3;
    if (path.includes('/audit-log')) return 4;
    return 0;
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    const encodedId = encodeId(clientId);
    const basePath = `/admin/client-management/${encodedId}`;
    switch (newValue) {
      case 0:
        navigate(`${basePath}/contact`);
        break;
      case 1:
        navigate(`${basePath}/users`);
        break;
      case 2:
        navigate(`${basePath}/groups`);
        break;
      case 3:
        navigate(`${basePath}/security`);
        break;
      case 4:
        navigate(`${basePath}/audit-log`);
        break;
    }
  };

  const getStatusColor = (status: ClientStatus) => {
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

  if (!client) {
    return (
      <Box mb={2}>
        <Alert severity="error">Client not found</Alert>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <Typography variant="h5" component="h1">
          {client.name}
        </Typography>
        <Chip
          label={client.status}
          color={getStatusColor(client.status)}
          size="small"
          sx={{ ml: 2 }}
        />
        <Chip
          label={client.environment}
          variant="outlined"
          size="small"
          sx={{ ml: 1 }}
        />
      </Box>

      <Tabs value={getCurrentTab()} onChange={handleTabChange}>
        <Tab label="Contact Information" />
        <Tab label="Users" />
        <Tab label="Groups" />
        <Tab label="Security Settings" />
        <Tab label="Audit Log" />
      </Tabs>

      <Box mt={3}>
        <Routes>
          <Route path="contact" element={<ContactInformation clientId={clientId} />} />
          <Route path="users/*" element={<UsersWrapper />} />
          <Route path="groups/*" element={<GroupsWrapper />} />
          <Route path="security" element={<MemberSecuritySettingsWrapper />} />
          <Route path="audit-log" element={<AuditSearchWrapper />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default ClientManagement;
