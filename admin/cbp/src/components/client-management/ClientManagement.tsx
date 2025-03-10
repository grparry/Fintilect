import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Routes, Route, Outlet, Navigate, useMatch } from 'react-router-dom';
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
import ClientInformation from './ClientInformation';
import GroupsWrapper from './wrappers/GroupsWrapper';
import UsersWrapper from './wrappers/UsersWrapper';
import MemberSecuritySettingsWrapper from './wrappers/MemberSecuritySettingsWrapper';
import { encodeId } from '../../utils/idEncoder';
import logger from '../../utils/logger';
import { useHost } from '../../context/HostContext';

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
  children?: React.ReactNode;
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
    mfaEnabled: false
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: false,
    frequency: 'realtime',
    alertTypes: ['payment', 'security', 'system'],
  },
};
const ClientManagement: React.FC<ClientManagementProps> = ({ clientId, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { environment } = useHost();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  console.log('=== ClientManagement Debug Start ===');
  console.log('Props:', { clientId });
  console.log('Current location:', location.pathname);
  console.log('Current tab:', activeTab);
  // Load client data
  const loadClientData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const clientData = await clientService.getClient(Number(clientId));
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
    console.log('Getting current tab for path:', path);
    // Extract the segments of the path
    const segments = path.split('/');
    console.log('Path analysis:', { segments });
    
    // Check if the path contains 'users' segment
    if (segments.includes('users')) {
      return 2; // Users tab
    }
    
    // Check other segments
    const lastSegment = segments[segments.length - 1];
    switch (lastSegment) {
      case 'contacts': return 1;
      case 'groups': return 3;
      case 'security': return 4;
      case 'info': return 0;
      default: return 0;
    }
  };
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    const encodedId = encodeId(clientId);
    const basePath = `/admin/client-management/edit/${encodedId}`;
    console.log('Tab change:', { newValue, basePath });
    switch (newValue) {
      case 0:
        navigate(`${basePath}/info`);
        break;
      case 1:
        navigate(`${basePath}/contacts`);
        break;
      case 2:
        navigate(`${basePath}/users`);
        break;
      case 3:
        navigate(`${basePath}/groups`);
        break;
      case 4:
        navigate(`${basePath}/security`);
        break;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'INACTIVE':
        return 'error';
      case 'SUSPENDED':
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
        <Typography variant="h5" component="h1" color="text.primary">
          {client.name}
        </Typography>
        <Chip
          label={client.status}
          color={getStatusColor(client.status)}
          size="small"
          sx={{ ml: 2 }}
        />
      </Box>
      <Tabs value={getCurrentTab()} onChange={handleTabChange}>
        <Tab label="Client Information" />
        <Tab label="Contacts" />
        <Tab label="Users" />
        <Tab label="Groups" />
        <Tab label="Security Settings" />
      </Tabs>

      <TabPanel value={getCurrentTab()} index={0}>
        <ClientInformation clientId={clientId} />
      </TabPanel>
      <TabPanel value={getCurrentTab()} index={1}>
        <ContactInformation clientId={clientId} mode="contacts" />
      </TabPanel>
      <TabPanel value={getCurrentTab()} index={2}>
        <UsersWrapper />
      </TabPanel>
      <TabPanel value={getCurrentTab()} index={3}>
        <GroupsWrapper />
      </TabPanel>
      <TabPanel value={getCurrentTab()} index={4}>
        <MemberSecuritySettingsWrapper />
      </TabPanel>
    </Box>
  );
};
export default ClientManagement;