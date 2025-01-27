import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import RefreshIcon from '@mui/icons-material/Refresh';
import { auditService } from '../../../services/factory/ServiceFactory';
import { AuditEvent, AuditLogFilters } from '../../services/interfaces/IAuditService';

const AuditLog: React.FC = () => {
  // State


  // State

  // Load audit logs



  // Load logs on mount and when filters change

  // Handle pagination changes


  // Format metadata for display

    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5">Audit Log</Typography>
        <Tooltip title="Refresh">
          <IconButton onClick={loadAuditLogs} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <DatePicker
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePicker
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Resource Type</TableCell>
              <TableCell>Resource ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Metadata</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            ) : auditLogs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                </TableCell>
              </TableRow>
            ) : (
                <TableRow key={`${log.timestamp}-${log.resourceId}-${log.eventType}`}>
                  <TableCell>
                    {dayjs(log.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                  </TableCell>
                  <TableCell>{log.eventType}</TableCell>
                  <TableCell>{log.resourceType}</TableCell>
                  <TableCell>{log.resourceId}</TableCell>
                  <TableCell>{log.status}</TableCell>
                  <TableCell>
                    <Tooltip title={formatMetadata(log.metadata)}>
                      <span>
                        {log.metadata ? 'View Details' : 'No metadata'}
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
      />
    </Box>
  );

