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
import { Client, ClientStatus, ClientType, Environment } from '../types/client.types';
import { clientService } from '../../services/factory/ServiceFactory';
import { encodeId } from '../../utils/idEncoder';
import logger from '../../utils/logger';

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
      



      









      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );

      <Box mb={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );

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
                  />
                </TableCell>
                <TableCell>
                  <Chip
                  />
                </TableCell>
                <TableCell>
                  <Chip
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
      />
    </Paper>
  );

