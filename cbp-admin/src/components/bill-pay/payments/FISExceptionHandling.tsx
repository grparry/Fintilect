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
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplayIcon from '@mui/icons-material/Replay';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import dayjs from 'dayjs';
import {
  FISException,
  FISExceptionFilters,
  FISResponseHistory,
  FISRetryResult,
  ExceptionStats,
  FISExceptionStatus,
  FISErrorCode,
} from '../../../types/bill-pay.types';
import { PaymentApiResponse } from '../../../types/api.types';
import { useAuth } from '../../../hooks/useAuth';

interface FISDialogState {
  open: boolean;
  exception: FISException | null;
  action: 'view' | 'retry' | 'delete' | null;
}

interface FilterState {
  startDate: Date | null;
  endDate: Date | null;
  status: FISExceptionStatus[];
  errorCodes: FISErrorCode[];
  searchTerm: string;
}

interface FISExceptionHandlingProps {
  api: {
    getExceptions: (filters: FISExceptionFilters) => Promise<PaymentApiResponse<FISException[]>>;
    getResponseHistory: (requestId: string) => Promise<PaymentApiResponse<FISResponseHistory[]>>;
    retryException: (id: string) => Promise<PaymentApiResponse<FISRetryResult>>;
    ignoreException: (id: string, notes: string) => Promise<PaymentApiResponse<void>>;
    bulkRetry: (ids: string[]) => Promise<PaymentApiResponse<FISRetryResult[]>>;
    bulkDelete: (ids: string[]) => Promise<PaymentApiResponse<void>>;
    exportExceptions: (filters: FISExceptionFilters) => Promise<Blob>;
    getExceptionStats: () => Promise<PaymentApiResponse<ExceptionStats>>;
  };
  onClose: () => void;
}

const FISExceptionHandling: React.FC<FISExceptionHandlingProps> = ({ api, onClose }) => {
  const { user } = useAuth();

  // State
  const [exceptions, setExceptions] = useState<FISException[]>([]);
  const [selectedExceptions, setSelectedExceptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalExceptions, setTotalExceptions] = useState(0);
  const [dialogState, setDialogState] = useState<FISDialogState>({
    open: false,
    exception: null,
    action: null,
  });
  const [filters, setFilters] = useState<FilterState>({
    startDate: dayjs().subtract(30, 'days').toDate(),
    endDate: dayjs().toDate(),
    status: [FISExceptionStatus.PENDING],
    errorCodes: [],
    searchTerm: '',
  });
  const [stats, setStats] = useState<ExceptionStats | null>(null);
  const [retrying, setRetrying] = useState<Record<string, boolean>>({});
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const [responseHistory, setResponseHistory] = useState<FISResponseHistory[]>([]);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);

  const convertFiltersToApiFormat = (filters: FilterState): FISExceptionFilters => ({
    ...filters,
    startDate: filters.startDate?.toISOString(),
    endDate: filters.endDate?.toISOString()
  });

  const fetchExceptions = useCallback(async () => {
    try {
      setLoading(true);
      const apiFilters = convertFiltersToApiFormat(filters);
      const response = await api.getExceptions(apiFilters);
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

  const handleRetryException = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.retryException(id);
      if (response.success) {
        await fetchExceptions();
      } else {
        setError('Failed to retry exception');
      }
    } catch (err) {
      setError('An error occurred while retrying exception');
      console.error('Error retrying exception:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkRetry = async () => {
    try {
      setLoading(true);
      const response = await api.bulkRetry(selectedExceptions);
      if (response.success) {
        await fetchExceptions();
        setSelectedExceptions([]);
      } else {
        setError('Failed to retry selected exceptions');
      }
    } catch (err) {
      setError('An error occurred while retrying exceptions');
      console.error('Error bulk retrying exceptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    try {
      setLoading(true);
      const response = await api.bulkDelete(selectedExceptions);
      if (response.success) {
        await fetchExceptions();
        setSelectedExceptions([]);
      } else {
        setError('Failed to delete selected exceptions');
      }
    } catch (err) {
      setError('An error occurred while deleting exceptions');
      console.error('Error bulk deleting exceptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExceptions = async () => {
    try {
      setLoading(true);
      const apiFilters = convertFiltersToApiFormat(filters);
      const blob = await api.exportExceptions(apiFilters);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fis-exceptions-${dayjs().format('YYYY-MM-DD')}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('An error occurred while exporting exceptions');
      console.error('Error exporting exceptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewHistory = async (exception: FISException) => {
    try {
      setLoading(true);
      const response = await api.getResponseHistory(exception.id);
      if (response.success) {
        setDialogState({
          open: true,
          exception,
          action: 'view',
        });
      } else {
        setError('Failed to fetch exception history');
      }
    } catch (err) {
      setError('An error occurred while fetching exception history');
      console.error('Error fetching exception history:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = useCallback(async () => {
    try {
      const response = await api.getExceptionStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  }, [api]);

  useEffect(() => {
    fetchExceptions();
    fetchStats();
  }, [fetchExceptions, fetchStats]);

  // Handlers
  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = <K extends keyof FilterState>(
    field: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate') => (date: Date | null) => {
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

  const getStatusColor = (status: FISExceptionStatus) => {
    switch (status) {
      case FISExceptionStatus.PENDING:
        return 'warning';
      case FISExceptionStatus.RETRYING:
        return 'info';
      case FISExceptionStatus.RESOLVED:
        return 'success';
      case FISExceptionStatus.FAILED:
        return 'error';
      default:
        return 'default';
    }
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
            <Typography>{stats?.byStatus.pending || 0}</Typography>
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
              value={filters.startDate?.toISOString().split('T')[0] || ''}
              onChange={(e) => handleDateChange('startDate')(new Date(e.target.value))}
              InputLabelProps={{ shrink: true }}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="End Date"
              type="date"
              value={filters.endDate?.toISOString().split('T')[0] || ''}
              onChange={(e) => handleDateChange('endDate')(new Date(e.target.value))}
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

  const renderTable = () => (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Error Code</TableCell>
            <TableCell>Error Message</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Retry Count</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : exceptions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No exceptions found
              </TableCell>
            </TableRow>
          ) : (
            exceptions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((exception) => (
                <TableRow key={exception.id}>
                  <TableCell>{exception.requestId}</TableCell>
                  <TableCell>{exception.errorCode}</TableCell>
                  <TableCell>{exception.errorMessage}</TableCell>
                  <TableCell>
                    <Chip
                      label={exception.status}
                      size="small"
                      color={getStatusColor(exception.status)}
                    />
                  </TableCell>
                  <TableCell>{exception.retryCount}</TableCell>
                  <TableCell>
                    {dayjs(exception.updatedAt).format('YYYY-MM-DD HH:mm')}
                  </TableCell>
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
                      {exception.status !== FISExceptionStatus.RESOLVED && (
                        <>
                          <Tooltip title="Retry">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleRetryException(exception.id)}
                              disabled={processing[exception.id]}
                            >
                              {processing[exception.id] ? (
                                <CircularProgress size={24} />
                              ) : (
                                <ReplayIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() =>
                                setDialogState({
                                  open: true,
                                  exception,
                                  action: 'delete',
                                })
                              }
                            >
                              <ErrorOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip title="View History">
                        <IconButton
                          size="small"
                          onClick={() => handleViewHistory(exception)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalExceptions}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
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
              <Chip
                label={dialogState.exception.status}
                size="small"
                color={getStatusColor(dialogState.exception.status)}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">Retry Count</Typography>
              <Typography>{dialogState.exception.retryCount}</Typography>
            </Grid>
            {dialogState.exception.metadata && (
              <>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2">Additional Details</Typography>
                </Grid>
                {Object.entries(dialogState.exception.metadata).map(([key, value]) => (
                  <Grid item xs={6} key={key}>
                    <Typography variant="subtitle2">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Typography>
                    <Typography>
                      {typeof value === 'object'
                        ? JSON.stringify(value, null, 2)
                        : value}
                    </Typography>
                  </Grid>
                ))}
              </>
            )}
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
            onClick={() => {
              if (dialogState.exception) {
                handleRetryException(dialogState.exception.id);
              }
            }}
            disabled={dialogState.exception ? processing[dialogState.exception.id] : false}
            startIcon={
              dialogState.exception && processing[dialogState.exception.id] ? (
                <CircularProgress size={20} />
              ) : (
                <ReplayIcon />
              )
            }
          >
            Retry Exception
          </Button>
        )}
        {dialogState.action === 'delete' && dialogState.exception && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (dialogState.exception) {
                setSelectedExceptions([dialogState.exception.id]);
                handleBulkDelete();
              }
            }}
            startIcon={<ErrorOutlineIcon />}
          >
            Delete Exception
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  const renderHistoryDialog = () => (
    <Dialog
      open={historyDialogOpen}
      onClose={() => setHistoryDialogOpen(false)}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>Response History</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responseHistory.map((entry) => (
              <TableRow key={entry.timestamp}>
                <TableCell>
                  {dayjs(entry.timestamp).format('YYYY-MM-DD HH:mm')}
                </TableCell>
                <TableCell>
                  <Chip
                    label={entry.status}
                    size="small"
                    color={getStatusColor(entry.status)}
                  />
                </TableCell>
                <TableCell>
                  <pre>{JSON.stringify(entry.response, null, 2)}</pre>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setHistoryDialogOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );

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
          {selectedExceptions.length > 0 && (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ReplayIcon />}
                onClick={handleBulkRetry}
                disabled={loading}
              >
                Retry Selected ({selectedExceptions.length})
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
            onClick={fetchExceptions}
            disabled={loading}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportExceptions}
            disabled={loading}
          >
            Export
          </Button>
        </Stack>
      </Box>

      {stats && renderStats()}

      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Start Date"
                type="date"
                value={filters.startDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateChange('startDate')(new Date(e.target.value))}
                InputLabelProps={{ shrink: true }}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="End Date"
                type="date"
                value={filters.endDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateChange('endDate')(new Date(e.target.value))}
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

      {renderTable()}
      {renderDialog()}
      {renderHistoryDialog()}
    </Box>
  );
};

export default FISExceptionHandling;
