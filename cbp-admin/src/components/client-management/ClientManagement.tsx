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
import type { Client } from '../../types/client.types';
import type { ApiResponse } from '../../types/api.types';
import { clientService } from '../../services/clients.service';
import ContactInformation from './ContactInformation';
import Groups from './Groups';
import UsersWrapper from './wrappers/UsersWrapper';
import MemberSecuritySettings from './security/MemberSecuritySettings';
import AuditSearch from './security/AuditSearch';
import { encodeId } from '../../utils/idEncoder';

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

const ClientManagement: React.FC<ClientManagementProps> = ({ clientId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load client data
  const loadClientData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await clientService.getClient(clientId);
      if (response.success) {
        setClient(response.data);
      } else {
        setError(response.error?.message || 'Failed to load client details');
      }
    } catch (err) {
      setError('Failed to load client details');
      console.error('Error loading client:', err);
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    const basePath = `/admin/client-management/${encodeId(clientId)}`;
    switch (newValue) {
      case 0:
        navigate(basePath, { replace: true });
        break;
      case 1:
        navigate(`${basePath}/users`, { replace: true });
        break;
      case 2:
        navigate(`${basePath}/groups`, { replace: true });
        break;
      case 3:
        navigate(`${basePath}/security`, { replace: true });
        break;
      case 4:
        navigate(`${basePath}/audit-log`, { replace: true });
        break;
    }
  };

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getEnvironmentColor = (env: Client['environment']) => {
    switch (env) {
      case 'Production':
        return 'error';
      case 'Staging':
        return 'warning';
      case 'Development':
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

  if (!client) {
    return (
      <Alert severity="error">
        Client not found or you don't have permission to view it.
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          {client.name}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Chip
            label={`Environment: ${client.environment}`}
            color={getEnvironmentColor(client.environment)}
            variant="outlined"
          />
          <Chip
            label={`Status: ${client.status}`}
            color={getStatusColor(client.status)}
            variant="outlined"
          />
          <Chip
            label={`Type: ${client.type}`}
            variant="outlined"
          />
        </Box>
        <Typography variant="body2" color="textSecondary">
          Created: {new Date(client.createdAt).toLocaleDateString()}
          {' | '}
          Last Updated: {new Date(client.updatedAt).toLocaleDateString()}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={getCurrentTab()} onChange={handleTabChange}>
          <Tab label="Contact Information" />
          <Tab label="Users" />
          <Tab label="Groups" />
          <Tab label="Security Settings" />
          <Tab label="Audit Log" />
        </Tabs>
      </Box>

      <Box>
        <Routes>
          <Route path="" element={<ContactInformation clientId={clientId} />} />
          <Route path="users/*" element={<UsersWrapper />} />
          <Route path="groups/*" element={<Groups clientId={clientId} />} />
          <Route path="security" element={<MemberSecuritySettings clientId={clientId} />} />
          <Route path="audit-log" element={<AuditSearch clientId={clientId} />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default ClientManagement;
