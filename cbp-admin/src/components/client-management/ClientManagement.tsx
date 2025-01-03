import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, Outlet, Routes, Route } from 'react-router-dom';
import {
  Box,
  Typography,
  Tab,
  Tabs,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { Client } from '../../types/client.types';
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
      const data = await clientService.getClient(clientId);
      setClient(data);
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
        <Typography variant="subtitle1" color="textSecondary">
          Environment: {client.environment}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Status: {client.status}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Type: {client.type}
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
