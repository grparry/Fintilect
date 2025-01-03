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
import { AuditLog, AuditSearchRequest } from '../../../types/client.types';
import { clientService } from '../../../services/clients.service';
import { shouldUseMockData } from '../../../config/api.config';

interface AuditSearchProps {
  clientId: string;
}

const AuditSearch: React.FC<AuditSearchProps> = ({ clientId }) => {
  console.log('AuditSearch mounted with clientId:', clientId);
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(7, 'days'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [username, setUsername] = useState<string>('');
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const isMockMode = shouldUseMockData();

  const formatDateForAPI = (date: Dayjs): string => {
    return date.format('YYYY-MM-DD');
  };

  const searchAuditLogs = useCallback(async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    setLoading(true);
    setError(null);
    console.log('Searching audit logs with request:', {
      clientId,
      startDate: formatDateForAPI(startDate),
      endDate: formatDateForAPI(endDate),
      username: username.trim()
    });

    try {
      const searchRequest: AuditSearchRequest = {
        startDate: formatDateForAPI(startDate),
        endDate: formatDateForAPI(endDate),
        username: username.trim(),
      };

      console.log('Searching audit logs with request:', {
        clientId,
        ...searchRequest
      });

      const logs = await clientService.searchAuditLogs(clientId, searchRequest);
      console.log('Received audit logs:', logs);
      setAuditLogs(logs);
    } catch (err) {
      setError('Failed to fetch audit logs. Please try again.');
      console.error('Error fetching audit logs:', err);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate, username, clientId]);

  const formatDateTime = (dateString: string): string => {
    try {
      const date = dayjs(dateString);
      return date.format('YYYY-MM-DD hh:mm:ss A');
    } catch (err) {
      console.error('Error formatting date:', err);
      return dateString;
    }
  };

  const formatDetails = (details: string, action: string): React.ReactNode => {
    try {
      const parsedDetails = JSON.parse(details);
      
      switch (action) {
        case 'UPDATE_SETTINGS':
          return (
            <Box>
              <Typography variant="body2" color="textSecondary">Changed daily limit from</Typography>
              <Typography component="span" sx={{ mx: 1 }}>
                {parsedDetails.before.maxDailyLimit.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="span">to</Typography>
              <Typography component="span" sx={{ mx: 1 }}>
                {parsedDetails.after.maxDailyLimit.toLocaleString()}
              </Typography>
            </Box>
          );
        
        case 'ADD_USER':
          return (
            <Box>
              <Typography variant="body2">
                Added new user: <strong>{parsedDetails.email}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Role: {parsedDetails.role}
              </Typography>
            </Box>
          );
        
        case 'UPDATE_SECURITY_SETTINGS':
          return (
            <Box>
              <Typography variant="body2">
                {parsedDetails.after.mfaEnabled ? 'Enabled' : 'Disabled'} Multi-Factor Authentication
              </Typography>
            </Box>
          );
        
        default:
          return (
            <Box>
              {parsedDetails.before && (
                <Typography variant="body2" color="textSecondary">
                  Before: {JSON.stringify(parsedDetails.before, null, 2)}
                </Typography>
              )}
              {parsedDetails.after && (
                <Typography variant="body2" color="textSecondary">
                  After: {JSON.stringify(parsedDetails.after, null, 2)}
                </Typography>
              )}
            </Box>
          );
      }
    } catch (err) {
      console.error('Error formatting details:', err);
      return details;
    }
  };

  // Load audit logs on mount
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
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              sx={{ width: 200 }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              sx={{ width: 200 }}
            />
          </LocalizationProvider>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ width: 200 }}
          />
          <Button
            variant="contained"
            onClick={searchAuditLogs}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Box>
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{formatDateTime(log.timestamp)}</TableCell>
                  <TableCell>{log.userName}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{formatDetails(log.details, log.action)}</TableCell>
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
