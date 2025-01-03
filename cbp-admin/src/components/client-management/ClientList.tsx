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
import { Client } from '../../types/client.types';
import { clientService } from '../../services/clients.service';
import { encodeId } from '../../utils/idEncoder';
import { shouldUseMockData } from '../../config/api.config';

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
      const data = await clientService.getClients();
      console.log('ClientList - Loaded clients:', data);
      setClients(data);
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'error';
      case 'pending':
        return 'warning';
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
                <TableCell>{client.environment}</TableCell>
                <TableCell>
                  <Chip
                    label={client.status}
                    color={getStatusColor(client.status) as any}
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
