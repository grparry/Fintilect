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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import { clientService } from '../../../services/clients.service';
import { shouldUseMockData } from '../../../config/api.config';
import { ApiResponse } from '../../../utils/api';
import type { AuditLog, AuditSearchRequest } from '../../../services/clients.service';

interface AuditSearchProps {
  clientId: string;
}

interface AuditSearchState {
  loading: boolean;
  error: string | null;
  auditLogs: AuditLog[];
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  username: string;
}

const AuditSearch: React.FC<AuditSearchProps> = ({ clientId }) => {
  const [state, setState] = useState<AuditSearchState>({
    loading: false,
    error: null,
    auditLogs: [],
    startDate: dayjs().subtract(7, 'days'),
    endDate: dayjs(),
    username: ''
  });

  const isMockMode = shouldUseMockData();

  const formatDateForAPI = (date: Dayjs): string => {
    return date.format('YYYY-MM-DD[T]HH:mm:ss[Z]');
  };

  const searchAuditLogs = useCallback(async () => {
    if (!state.startDate || !state.endDate) {
      setState(prev => ({ ...prev, error: 'Please select both start and end dates' }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const searchRequest: AuditSearchRequest = {
        timestampFrom: formatDateForAPI(state.startDate),
        timestampTo: formatDateForAPI(state.endDate),
        userId: state.username.trim() || undefined,
      };

      const response = await clientService.searchAuditLogs(clientId, searchRequest);
      
      if (response.success) {
        setState(prev => ({ 
          ...prev, 
          auditLogs: response.data,
          loading: false,
          error: null
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          error: response.error?.message || 'Failed to fetch audit logs',
          loading: false
        }));
      }
    } catch (err) {
      setState(prev => ({ 
        ...prev,
        error: 'An unexpected error occurred while fetching audit logs',
        loading: false
      }));
      console.error('Error fetching audit logs:', err);
    }
  }, [clientId, state.startDate, state.endDate, state.username]);

  const formatDateTime = (dateString: string): string => {
    try {
      const date = dayjs(dateString);
      return date.format('YYYY-MM-DD hh:mm:ss A');
    } catch (err) {
      console.error('Error formatting date:', err);
      return dateString;
    }
  };

  const formatDescription = (description: string): React.ReactNode => {
    try {
      const parsedDescription = JSON.parse(description);
      
      return (
        <Box>
          {typeof parsedDescription === 'object' ? (
            Object.entries(parsedDescription).map(([key, value]) => (
              <Typography key={key} variant="body2">
                {key}: {JSON.stringify(value)}
              </Typography>
            ))
          ) : (
            <Typography variant="body2">{description}</Typography>
          )}
        </Box>
      );
    } catch (err) {
      return (
        <Typography variant="body2">
          {description}
        </Typography>
      );
    }
  };

  useEffect(() => {
    searchAuditLogs();
  }, [searchAuditLogs]);

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Audit Log Search
          </Typography>
          {isMockMode && (
            <Chip
              label="Mock Mode"
              color="warning"
              size="small"
              sx={{ ml: 1 }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={state.startDate}
              onChange={(newValue) => setState(prev => ({ ...prev, startDate: newValue }))}
              sx={{ width: 200 }}
            />
            <DatePicker
              label="End Date"
              value={state.endDate}
              onChange={(newValue) => setState(prev => ({ ...prev, endDate: newValue }))}
              sx={{ width: 200 }}
            />
          </LocalizationProvider>
          <TextField
            label="Username"
            value={state.username}
            onChange={(e) => setState(prev => ({ ...prev, username: e.target.value }))}
            sx={{ width: 200 }}
          />
          <Button
            variant="contained"
            onClick={searchAuditLogs}
            disabled={state.loading}
          >
            {state.loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Box>
        {state.error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {state.error}
          </Typography>
        )}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Event Type</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{formatDateTime(log.timestamp)}</TableCell>
                  <TableCell>{log.userId}</TableCell>
                  <TableCell>
                    <Chip 
                      label={log.eventType}
                      color="default"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{log.ipAddress}</TableCell>
                  <TableCell>{formatDescription(log.description)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AuditSearch;
