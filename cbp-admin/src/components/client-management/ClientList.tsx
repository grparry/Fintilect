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
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Client, ClientStatus, ClientType, Environment } from '@/../types/client.types';
import { clientService } from '@/../services/factory/ServiceFactory';
import { encodeId } from '@/../utils/idEncoder';
import logger from '@/../utils/logger';

const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const loadClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await clientService.getClients({
        page: page + 1,
        limit: rowsPerPage
      });

      if (!response || !response.items) {
        throw new Error('Failed to load clients');
      }

      setClients(response.items);
      setTotalCount(response.pagination.total);
      logger.info('Clients loaded successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load clients';
      logger.error('Error loading clients: ' + message);
      setError(message);
      enqueueSnackbar(message, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, enqueueSnackbar]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

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

  const handleEditClick = useCallback((clientId: string) => {
    try {
      const encodedId = encodeId(clientId);
      logger.info(`Navigating to edit client - ID: ${clientId}, Encoded: ${encodedId}`);
      navigate(`/admin/client-management/edit/${encodedId}`);
    } catch (error) {
      logger.error(`Error encoding client ID: ${error instanceof Error ? error.message : String(error)}`);
      enqueueSnackbar('Error navigating to client details', { variant: 'error' });
    }
  }, [navigate, enqueueSnackbar]);

  if (loading && clients.length === 0) {
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
    <Paper>
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
      <TablePagination
        component="div"
        count={totalCount}
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
