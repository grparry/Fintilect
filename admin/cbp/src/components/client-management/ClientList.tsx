import React, { useState, useEffect, useCallback } from 'react';
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
  TablePagination,
  FormControlLabel,
  Switch,
  Grid,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Client } from '../../types/client.types';
import { clientService } from '../../services/factory/ServiceFactory';
import { encodeId } from '../../utils/idEncoder';
import logger from '../../utils/logger';

const ClientList: React.FC = () => {
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [hideInactive, setHideInactive] = useState(true);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const loadClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await clientService.getClients();
      if (!response || !response.clients) {
        throw new Error('Failed to load clients');
      }
      setAllClients(response.clients);
      logger.info('Clients loaded successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load clients';
      logger.error('Error loading clients: ' + message);
      setError(message);
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);
  useEffect(() => {
    loadClients();
  }, [loadClients]);

  // Filter clients based on hideInactive setting
  useEffect(() => {
    if (hideInactive) {
      setFilteredClients(allClients.filter(client => client.status !== 'INACTIVE'));
      // Reset to first page when filter changes
      setPage(0);
    } else {
      setFilteredClients(allClients);
    }
  }, [allClients, hideInactive]);
  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);
  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);
  const getTypeChipColor = (type: string | null) => {
    switch (type) {
      case 'ENTERPRISE':
        return 'primary';
      case 'SMB':
        return 'secondary';
      case 'STARTUP':
        return 'default';
      default:
        return 'default';
    }
  };
  const getStatusChipColor = (status: string | null) => {
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
  const handleEditClick = useCallback((clientId: number) => {
    try {
      const encodedId = encodeId(clientId.toString());
      logger.info(`Navigating to edit client - ID: ${clientId}, Encoded: ${encodedId}`);
      navigate(`/admin/client-management/edit/${encodedId}`);
    } catch (error) {
      logger.error(`Error encoding client ID: ${error instanceof Error ? error.message : String(error)}`);
      enqueueSnackbar('Error navigating to client details', { variant: 'error' });
    }
  }, [navigate, enqueueSnackbar]);
  if (loading && allClients.length === 0) {
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
  const handleToggleInactive = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHideInactive(event.target.checked);
  };

  return (
    <Paper>
      <Box p={2}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" component="h2">
              Client Management
            </Typography>
          </Grid>
          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  checked={hideInactive}
                  onChange={handleToggleInactive}
                  color="primary"
                />
              }
              label="Hide Inactive Clients"
            />
          </Grid>
        </Grid>
      </Box>
      <TableContainer>
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
            {filteredClients
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name || 'Unnamed Client'}</TableCell>
                <TableCell>
                  <Chip
                    label={client.type || 'Unknown'}
                    color={getTypeChipColor(client.type)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={client.environment || 'Unknown'}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={client.status || 'Unknown'}
                    color={getStatusChipColor(client.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {/* Contact information is now managed separately */}
                  <span>-</span>
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
      <TablePagination
        component="div"
        count={filteredClients.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
};
export default ClientList;