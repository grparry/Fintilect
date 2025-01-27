import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Stack,
  CircularProgress,
  TablePagination,
  Divider,
  SelectChangeEvent,
  Checkbox,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplayIcon from '@mui/icons-material/Replay';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import dayjs from 'dayjs';
import { ApiResponse } from '../../../types/api.types';
import {
  FISException,
  FISExceptionFilters,
  FISResponseHistory,
  FISRetryResult,
  ExceptionStats,
  FISExceptionStatus,
  FISErrorCode,
} from '../../../types/bill-pay.types';
import { useAuth } from '../../../hooks/useAuth';

interface FISDialogState {
  open: boolean;
  exception: FISException | null;
  action: 'view' | 'retry' | 'delete' | null;
}
interface FilterState {
  startDate: string | null;
  endDate: string | null;
  status: FISExceptionStatus[];
  errorCodes: FISErrorCode[];
  searchTerm: string;
}
interface FISExceptionHandlingProps {
  api: {
    getExceptions: (filters: FISExceptionFilters) => Promise<ApiResponse<FISException[]>>;
    getResponseHistory: (requestId: string) => Promise<ApiResponse<FISResponseHistory[]>>;
    retryException: (id: string) => Promise<ApiResponse<FISRetryResult>>;
    ignoreException: (id: string, notes: string) => Promise<ApiResponse<void>>;
    bulkRetry: (ids: string[]) => Promise<ApiResponse<FISRetryResult[]>>;
    bulkDelete: (ids: string[]) => Promise<ApiResponse<void>>;
    exportExceptions: (filters: FISExceptionFilters) => Promise<Blob>;
    getExceptionStats: () => Promise<ApiResponse<ExceptionStats>>;
  };
  onClose: () => void;
}
interface ExceptionSummary {
  total: number;
  byStatus: Record<FISExceptionStatus, number>;
}
const getExceptionSummary = (exceptions: FISException[]): ExceptionSummary => {
  const summary: ExceptionSummary = {
    total: exceptions.length,
    byStatus: {
      [FISExceptionStatus.PENDING]: 0,
      [FISExceptionStatus.IN_PROGRESS]: 0,
      [FISExceptionStatus.RESOLVED]: 0,
      [FISExceptionStatus.FAILED]: 0,
      [FISExceptionStatus.REFUNDED]: 0,
      [FISExceptionStatus.RETRYING]: 0,
      [FISExceptionStatus.REVERSED]: 0,
      [FISExceptionStatus.STOPPED]: 0,
      [FISExceptionStatus.RETURNED]: 0,
      [FISExceptionStatus.RESENT]: 0,
      [FISExceptionStatus.REINITIATED]: 0,
      [FISExceptionStatus.PENDING_REVERSAL]: 0,
      [FISExceptionStatus.PENDING_REFUND]: 0,
      [FISExceptionStatus.PENDING_RETURN]: 0,
      [FISExceptionStatus.PENDING_STOP_PAYMENT]: 0,
      [FISExceptionStatus.PENDING_RESEND]: 0,
      [FISExceptionStatus.PENDING_REINITIATE]: 0,
    },
  };
  exceptions.forEach((exception) => {
    summary.byStatus[exception.status]++;
  });
  return summary;
};
const ExceptionStatusChip: React.FC<{ status: FISExceptionStatus }> = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case FISExceptionStatus.PENDING:
      case FISExceptionStatus.IN_PROGRESS:
      case FISExceptionStatus.RETRYING:
        return 'warning';
      case FISExceptionStatus.RESOLVED:
        return 'success';
      case FISExceptionStatus.FAILED:
        return 'error';
      default:
        return 'default';
    }
  };
  return (
    <Chip
      label={status}
      color={getColor()}
      size="small"
    />
  );
};
const ExceptionSummaryDisplay: React.FC<{ summary: ExceptionSummary }> = ({ summary }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Typography variant="body2">
        Total: {summary.total}
      </Typography>
      <Typography variant="body2">
        Pending: {summary.byStatus[FISExceptionStatus.PENDING]}
      </Typography>
      <Typography variant="body2">
        In Progress: {summary.byStatus[FISExceptionStatus.IN_PROGRESS]}
      </Typography>
      <Typography variant="body2">
        Resolved: {summary.byStatus[FISExceptionStatus.RESOLVED]}
      </Typography>
      <Typography variant="body2">
        Failed: {summary.byStatus[FISExceptionStatus.FAILED]}
      </Typography>
    </Box>
  );
};
const FISExceptionHandling: React.FC<FISExceptionHandlingProps> = ({ api, onClose }) => {
  const { user } = useAuth();
  // State
  const [exceptions, setExceptions] = useState<FISException[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [dialogState, setDialogState] = useState<FISDialogState>({
    open: false,
    exception: null,
    action: null,
  });
  const [filters, setFilters] = useState<FilterState>({
    startDate: null,
    endDate: null,
    status: [],
    errorCodes: [],
    searchTerm: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<ExceptionStats | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [responseHistory, setResponseHistory] = useState<FISResponseHistory[]>([]);
  const [retryResult, setRetryResult] = useState<FISRetryResult | null>(null);
  const loadExceptions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.getExceptions({
        requestId: filters.searchTerm,
        status: filters.status,
      });
      if (response.success) {
        setExceptions(response.data);
        setError(null);
      } else {
        setError('Failed to fetch exceptions');
      }
    } catch (err) {
      setError('An error occurred while fetching exceptions');
      console.error('Error fetching exceptions:', err);
    } finally {
      setLoading(false);
    }
  }, [api, filters]);
  const handleRetry = async (exception: FISException | null) => {
    if (!exception) return;
    try {
      setLoading(true);
      const response = await api.retryException(exception.id);
      if ('error' in response) {
        setError(response.error.message || 'Failed to retry exception');
        return;
      }
      if (!response.success) {
        setError('Failed to retry exception');
        return;
      }
      setRetryResult(response.data);
      if (response.data.success) {
        await loadExceptions();
        setDialogState({ open: false, exception: null, action: null });
      }
    } catch (err) {
      setError('Failed to retry exception');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleBulkRetry = async () => {
    if (!selectedIds.length) return;
    try {
      setLoading(true);
      const response = await api.bulkRetry(selectedIds);
      if ('error' in response) {
        setError(response.error.message || 'Failed to retry selected exceptions');
        return;
      }
      if (!response.success) {
        setError('Failed to retry selected exceptions');
        return;
      }
      await loadExceptions();
      setSelectedIds([]);
    } catch (err) {
      setError('Failed to retry selected exceptions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    try {
      setLoading(true);
      await api.bulkDelete(selectedIds);
      await loadExceptions();
      setSelectedIds([]);
    } catch (err) {
      setError('Failed to delete selected exceptions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleExport = async () => {
    try {
      setLoading(true);
      const blob = await api.exportExceptions({
        requestId: filters.searchTerm,
        status: filters.status,
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fis-exceptions-${dayjs().format('YYYY-MM-DD')}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to export exceptions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleFilterChange = <K extends keyof FilterState>(
    field: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };
  const handleDateChange = (field: 'startDate' | 'endDate') => (date: string | null) => {
    handleFilterChange(field, date);
  };
  const handleStatusChange = (event: SelectChangeEvent<FISExceptionStatus[]>) => {
    const {
      target: { value },
    } = event;
    setFilters((prev) => ({
      ...prev,
      status: typeof value === 'string' ? [value as FISExceptionStatus] : value as FISExceptionStatus[],
    }));
  };
  const handleErrorCodeChange = (event: SelectChangeEvent<FISErrorCode[]>) => {
    const {
      target: { value },
    } = event;
    setFilters((prev) => ({
      ...prev,
      errorCodes: typeof value === 'string' ? [value as FISErrorCode] : value as FISErrorCode[],
    }));
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('searchTerm', event.target.value);
  };
  const renderStats = () => (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Exceptions</Typography>
            <Typography variant="h4">{stats?.total || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Resolution Rate</Typography>
            <Typography variant="h4">
              {((stats?.resolutionRate || 0) * 100).toFixed(1)}%
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Avg Retry Count</Typography>
            <Typography>
              {stats?.averageRetryCount.toFixed(1) || 0}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">Pending Exceptions</Typography>
            <Typography>{stats?.byStatus[FISExceptionStatus.PENDING] || 0}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
  const renderFilters = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Start Date"
              type="date"
              value={filters.startDate || ''}
              onChange={(e) => handleDateChange('startDate')(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="End Date"
              type="date"
              value={filters.endDate || ''}
              onChange={(e) => handleDateChange('endDate')(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                multiple
                value={filters.status}
                onChange={handleStatusChange}
                label="Status"
              >
                {Object.values(FISExceptionStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Error Code</InputLabel>
              <Select
                multiple
                value={filters.errorCodes}
                onChange={handleErrorCodeChange}
                label="Error Code"
              >
                {Object.values(FISErrorCode).map((code) => (
                  <MenuItem key={code} value={code}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              size="small"
              label="Search"
              value={filters.searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
  const renderExceptionList = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedIds.length === exceptions.length}
                indeterminate={selectedIds.length > 0 && selectedIds.length < exceptions.length}
                onChange={(e) =>
                  setSelectedIds(
                    e.target.checked ? exceptions.map((ex) => ex.id) : []
                  )
                }
              />
            </TableCell>
            <TableCell>Request ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Error Code</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Retry Count</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exceptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((exception) => (
            <TableRow key={exception.id}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedIds.includes(exception.id)}
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked
                        ? [...selectedIds, exception.id]
                        : selectedIds.filter((id) => id !== exception.id)
                    )
                  }
                />
              </TableCell>
              <TableCell>{exception.requestId}</TableCell>
              <TableCell>
                <ExceptionStatusChip status={exception.status} />
              </TableCell>
              <TableCell>{exception.errorCode}</TableCell>
              <TableCell>{exception.errorMessage}</TableCell>
              <TableCell>{exception.retryCount}</TableCell>
              <TableCell>{dayjs(exception.createdAt).format('MM/DD/YYYY HH:mm')}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Tooltip title="View Details">
                    <IconButton
                      size="small"
                      onClick={() =>
                        setDialogState({
                          open: true,
                          exception,
                          action: 'view',
                        })
                      }
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  {exception.status === FISExceptionStatus.PENDING && (
                    <Tooltip title="Retry">
                      <IconButton
                        size="small"
                        onClick={() =>
                          setDialogState({
                            open: true,
                            exception,
                            action: 'retry',
                          })
                        }
                      >
                        <ReplayIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={exceptions.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </TableContainer>
  );
  const renderDialog = () => (
    <Dialog
      open={dialogState.open}
      onClose={() => setDialogState({ open: false, exception: null, action: null })}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {dialogState.action === 'view'
          ? 'Exception Details'
          : dialogState.action === 'retry'
          ? 'Retry Exception'
          : 'Delete Exception'}
      </DialogTitle>
      <DialogContent>
        {dialogState.exception && (
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Request ID</Typography>
              <Typography>{dialogState.exception.requestId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Error Code</Typography>
              <Typography>{dialogState.exception.errorCode}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Error Message</Typography>
              <Typography>{dialogState.exception.errorMessage}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Status</Typography>
              <ExceptionStatusChip status={dialogState.exception.status} />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Retry Count</Typography>
              <Typography>{dialogState.exception.retryCount}</Typography>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            setDialogState({ open: false, exception: null, action: null })
          }
        >
          Close
        </Button>
        {dialogState.action === 'retry' && dialogState.exception && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleRetry(dialogState.exception)}
          >
            Retry Exception
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
  useEffect(() => {
    loadExceptions();
  }, [loadExceptions]);
  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">FIS Exception Handling</Typography>
        <Stack direction="row" spacing={2}>
          {selectedIds.length > 0 && (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ReplayIcon />}
                onClick={handleBulkRetry}
                disabled={loading}
              >
                Retry Selected ({selectedIds.length})
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<ErrorOutlineIcon />}
                onClick={handleBulkDelete}
                disabled={loading}
              >
                Delete Selected
              </Button>
            </>
          )}
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadExceptions}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            disabled={loading}
          >
            Export
          </Button>
        </Stack>
      </Box>
      {stats && (
        <ExceptionSummaryDisplay summary={{
          total: stats.total,
          byStatus: {
            [FISExceptionStatus.PENDING]: stats.byStatus[FISExceptionStatus.PENDING],
            [FISExceptionStatus.IN_PROGRESS]: stats.byStatus[FISExceptionStatus.IN_PROGRESS],
            [FISExceptionStatus.RESOLVED]: stats.byStatus[FISExceptionStatus.RESOLVED],
            [FISExceptionStatus.FAILED]: stats.byStatus[FISExceptionStatus.FAILED],
            [FISExceptionStatus.REFUNDED]: stats.byStatus[FISExceptionStatus.REFUNDED],
            [FISExceptionStatus.RETRYING]: stats.byStatus[FISExceptionStatus.RETRYING],
            [FISExceptionStatus.REVERSED]: stats.byStatus[FISExceptionStatus.REVERSED],
            [FISExceptionStatus.STOPPED]: stats.byStatus[FISExceptionStatus.STOPPED],
            [FISExceptionStatus.RETURNED]: stats.byStatus[FISExceptionStatus.RETURNED],
            [FISExceptionStatus.RESENT]: stats.byStatus[FISExceptionStatus.RESENT],
            [FISExceptionStatus.REINITIATED]: stats.byStatus[FISExceptionStatus.REINITIATED],
            [FISExceptionStatus.PENDING_REVERSAL]: stats.byStatus[FISExceptionStatus.PENDING_REVERSAL],
            [FISExceptionStatus.PENDING_REFUND]: stats.byStatus[FISExceptionStatus.PENDING_REFUND],
            [FISExceptionStatus.PENDING_RETURN]: stats.byStatus[FISExceptionStatus.PENDING_RETURN],
            [FISExceptionStatus.PENDING_STOP_PAYMENT]: stats.byStatus[FISExceptionStatus.PENDING_STOP_PAYMENT],
            [FISExceptionStatus.PENDING_RESEND]: stats.byStatus[FISExceptionStatus.PENDING_RESEND],
            [FISExceptionStatus.PENDING_REINITIATE]: stats.byStatus[FISExceptionStatus.PENDING_REINITIATE]
          }
        }} />
      )}
      {renderFilters()}
      {renderExceptionList()}
      {renderDialog()}
    </Box>
  );
};
export default FISExceptionHandling;