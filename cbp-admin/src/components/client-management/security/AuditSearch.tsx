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
import { IAuditService, AuditEvent, AuditLogFilters } from '../../../services/interfaces/IAuditService';
import { PaginatedResponse } from '../../../types/common.types';

interface AuditSearchProps {
  clientId: string;
}

interface AuditSearchState {
  loading: boolean;
  error: string | null;
  auditLogs: AuditEvent[];
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  searchTerm: string;
  page: number;
  totalPages: number;
}

const ITEMS_PER_PAGE = 10;

const AuditSearch: React.FC<AuditSearchProps> = ({ clientId }) => {
  // Services
  const auditService = ServiceFactory.getInstance().getAuditService();

  // State
  const [state, setState] = useState<AuditSearchState>({
    loading: false,
    error: null,
    auditLogs: [],
    startDate: dayjs().subtract(7, 'days'),
    endDate: dayjs(),
    searchTerm: '',
    page: 1,
    totalPages: 0
  });

  const formatDateForAPI = (date: Dayjs | null): string | undefined => {
    return date ? date.format('YYYY-MM-DD') : undefined;
  };

  const searchAuditLogs = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const filters: AuditLogFilters = {
        startDate: formatDateForAPI(state.startDate),
        endDate: formatDateForAPI(state.endDate),
        searchTerm: state.searchTerm || undefined,
        page: state.page,
        pageSize: ITEMS_PER_PAGE,
        resourceType: 'client',
        status: undefined
      };

      const response = await auditService.searchLogs(filters);

      setState(prev => ({
        ...prev,
        auditLogs: response.items,
        totalPages: Math.ceil(response.total / ITEMS_PER_PAGE),
        loading: false
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch audit logs';
      setState(prev => ({
        ...prev,
        error: message,
        loading: false
      }));
    }
  }, [state.startDate, state.endDate, state.searchTerm, state.page, clientId]);

  useEffect(() => {
    searchAuditLogs();
  }, [searchAuditLogs]);

  const handleSearch = () => {
    setState(prev => ({ ...prev, page: 1 }));
    searchAuditLogs();
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setState(prev => ({ ...prev, page: value }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate') => (date: Dayjs | null) => {
    setState(prev => ({ ...prev, [field]: date }));
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, searchTerm: event.target.value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'ERROR':
        return 'error';
      case 'INITIATED':
        return 'warning';
      case 'RECEIVED':
        return 'info';
      case 'PROCESSED':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Audit Log Search
      </Typography>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={state.startDate}
              onChange={handleDateChange('startDate')}
              slotProps={{ textField: { size: 'small' } }}
            />
            <DatePicker
              label="End Date"
              value={state.endDate}
              onChange={handleDateChange('endDate')}
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>
          <TextField
            size="small"
            label="Search Term"
            value={state.searchTerm}
            onChange={handleSearchTermChange}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={state.loading}
          >
            Search
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
                        label={log.status}
                        color={getStatusColor(log.status)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              count={state.totalPages}
              page={state.page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default AuditSearch;
