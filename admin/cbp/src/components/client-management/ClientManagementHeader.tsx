import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
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

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Client Management
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Welcome to Client Management. Here you can manage client accounts, users, and access settings.
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
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
              to="list"
              color="inherit"
              underline="none"
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <PeopleIcon sx={{ fontSize: 40, mb: 2, color: 'primary.main' }} />
              <Typography variant="h6" gutterBottom>
                Client List
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View and manage all client accounts
              </Typography>
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientManagementHeader;
