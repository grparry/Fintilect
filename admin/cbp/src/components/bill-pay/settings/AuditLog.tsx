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
import { AuditEvent, AuditLogFilters } from '../../../services/interfaces/IAuditService';

const AuditLog: React.FC = () => {
  // State
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [searchTerm, setSearchTerm] = useState('');
  const [total, setTotal] = useState(0);
  // Load audit logs
  const loadAuditLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const filters: AuditLogFilters = {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        searchTerm: searchTerm || undefined,
        page: page + 1,
        pageSize: rowsPerPage
      };
      const response = await auditService.searchLogs(filters);
      setAuditLogs(response.items);
      setTotal(response.total);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };
  // Load logs on mount and when filters change
  useEffect(() => {
    loadAuditLogs();
  }, [page, rowsPerPage, startDate, endDate, searchTerm]);
  // Handle pagination changes
  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Format metadata for display
  const formatMetadata = (metadata: Record<string, any> | undefined): string => {
    if (!metadata) return '';
    try {
      return JSON.stringify(metadata, null, 2);
    } catch {
      return 'Invalid metadata format';
    }
  };
  return (
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
            label="Start Date"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small"
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small"
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by resource ID or type..."
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
                  No audit logs found
                </TableCell>
              </TableRow>
            ) : (
              auditLogs.map((log) => (
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
        component="div"
        count={total}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </Box>
  );
};
export default AuditLog;