import React, { useState, useEffect } from 'react';
import { Outlet, Link as RouterLink, useParams } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Link, Alert, CircularProgress } from '@mui/material';
import { getAllRoutes } from '../../routes';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import HistoryIcon from '@mui/icons-material/History';
import { clientService } from '../../services/factory/ServiceFactory';
import { Client } from '../../types/client.types';
import { decodeId } from '../../utils/idEncoder';
import logger from '../../utils/logger';

const getRouteIcon = (title: string) => {
  switch (title) {
    case 'Clients':
      return <PeopleIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Client Details':
      return <PersonIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Contact Information':
      return <ContactMailIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Users':
      return <PersonIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Groups':
      return <GroupIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Security Settings':
      return <SecurityIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    case 'Audit History':
      return <HistoryIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />;
    default:
      return null;
  }
};

const ClientManagementHeader: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadClientData = async () => {
      if (!clientId) return;

      try {
        setLoading(true);
        setError(null);
        const decodedClientId = decodeId(clientId);
        const clientData = await clientService.getClient(decodedClientId);
        setClient(clientData);
        logger.info('Client data loaded successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load client data';
        logger.error('Error loading client data: ' + message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    loadClientData();
  }, [clientId]);

  const allRoutes = getAllRoutes();
  const clientRoutes = allRoutes.filter(route => 
    route.sectionId === 'clientManagement' && 
    !route.hideFromSidebar &&
    route.path !== '/admin/client-management'
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {client ? `${client.name} - Client Management` : 'Client Management'}
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {clientRoutes.map((route) => (
          <Grid item xs={12} sm={6} md={4} key={route.path}>
            <Paper 
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <Link
                component={RouterLink}
                to={route.path}
                color="inherit"
                underline="none"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
              >
                {getRouteIcon(route.title)}
                <Typography variant="h6" gutterBottom>
                  {route.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {route.title === 'Clients' && 'View and manage all client accounts'}
                  {route.title === 'Client Details' && 'View detailed client information'}
                  {route.title === 'Contact Information' && 'Manage client contact details'}
                  {route.title === 'Users' && 'Manage client user accounts and permissions'}
                  {route.title === 'Groups' && 'Configure client user groups and roles'}
                  {route.title === 'Security Settings' && 'Configure client security policies'}
                  {route.title === 'Audit History' && 'View client activity and changes'}
                </Typography>
              </Link>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Outlet />
    </Box>
  );
};

export default ClientManagementHeader;
