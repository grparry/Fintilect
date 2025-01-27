import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Chip,
  Alert,
  Pagination,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { AuditLog } from '../../../types/security.types';
import { AuditSearchRequest } from '../../../types/client.types';
import { shouldUseMockService } from '../../../config/api.config';

interface AuditSearchProps {
  clientId: string;
}

interface AuditSearchState {
  loading: boolean;
  error: string | null;
  auditLogs: AuditLog[];
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  searchTerm: string;
  page: number;
  totalPages: number;
}

const ITEMS_PER_PAGE = 10;

const AuditSearch: React.FC<AuditSearchProps> = ({ clientId }) => {
  // Services





  // Services

  // Debug logs

  // State

    // Format with time component to match the mock data timestamps




        ...prev,
        ...prev,



    // Trigger search with new page




    <Box>
      <Typography variant="h5" gutterBottom>
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            />
            <DatePicker
            />
          </LocalizationProvider>
          <TextField
          />
          <Button
          >
          </Button>
        </Box>
      </Paper>

      {state.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {state.error}
        </Alert>
      )}

      {state.loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Event Type</TableCell>
                  <TableCell>Resource Type</TableCell>
                  <TableCell>Resource ID</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.auditLogs.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell>{dayjs(log.timestamp).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                    <TableCell>{log.eventType}</TableCell>
                    <TableCell>{log.resourceType}</TableCell>
                    <TableCell>{log.resourceId}</TableCell>
                    <TableCell>
                      <Chip
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {state.totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Pagination
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );

