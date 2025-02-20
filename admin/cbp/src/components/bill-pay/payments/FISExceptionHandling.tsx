import React, { useEffect, useState, useCallback } from 'react';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { IFISExceptionService } from '../../../services/interfaces/IFISExceptionService';
import {
  FISException,
  FISExceptionStatus,
  FISExceptionHistory,
  FISResponseHistory,
  FISExceptionFilters,
  ExceptionStats,
} from '../../../types/bill-pay.types';
import { useAuth } from '../../../hooks/useAuth';
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

const defaultByStatus = Object.values(FISExceptionStatus).reduce((acc, status) => {
  acc[status] = 0;
  return acc;
}, {} as Record<FISExceptionStatus, number>);

interface FISDialogState {
  open: boolean;
  exception: FISException | null;
  action: 'view' | 'retry' | 'delete' | null;
}

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

const ExceptionSummaryDisplay: React.FC<{ summary: {
  total: number;
  byStatus: Record<FISExceptionStatus, number>;
  successRate: number;
  avgRetryCount: number;
} }> = ({ summary }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Typography variant="body2">
        Total: {summary.total}
      </Typography>
      <Typography variant="body2">
        Pending: {summary.byStatus[FISExceptionStatus.PENDING]}
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

const FISExceptionHandling: React.FC = () => {
  const { user } = useAuth();
  const fisExceptionService = ServiceFactory.getInstance().getFISExceptionService();

  // State
  const [exceptions, setExceptions] = useState<FISException[]>([]);
  const [selectedIds, setSelectedIds] = useState<FISException['id'][]>([]);
  const [dialogState, setDialogState] = useState<FISDialogState>({
    open: false,
    exception: null,
    action: null,
  });
  const [filters, setFilters] = useState<FISExceptionFilters>({
    requestId: '',
    status: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{
    total: number;
    byStatus: Record<FISExceptionStatus, number>;
    successRate: number;
    avgRetryCount: number;
  }>({
    total: 0,
    byStatus: defaultByStatus,
    successRate: 0,
    avgRetryCount: 0
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [responseHistory, setResponseHistory] = useState<FISResponseHistory[]>([]);
  const [retryResult, setRetryResult] = useState<any | null>(null);

  const loadExceptions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fisExceptionService.getFISExceptions(filters);
      setExceptions(response.items);
      setError(null);
    } catch (err) {
      setError('An error occurred while fetching exceptions');
      console.error('Error fetching exceptions:', err);
    } finally {
      setLoading(false);
    }
  }, [fisExceptionService, filters]);

  const loadExceptionStats = useCallback(async () => {
    try {
      const summary = await fisExceptionService.getFISExceptionSummary();
      setStats(summary);
    } catch (err) {
      console.error('Error fetching exception stats:', err);
    }
  }, [fisExceptionService]);

  const loadResponseHistory = useCallback(async (requestId: FISException['requestId']) => {
    try {
      const history = await fisExceptionService.getFISResponseHistory(requestId);
      setResponseHistory(history);
    } catch (err) {
      console.error('Error fetching response history:', err);
    }
  }, [fisExceptionService]);

  const handleRetry = useCallback(async (exceptionId: FISException['id']) => {
    try {
      await fisExceptionService.retryFISException(exceptionId);
      // Refresh exceptions after retry
      loadExceptions();
    } catch (error) {
      console.error('Failed to retry exception:', error);
    }
  }, [fisExceptionService, loadExceptions]);

  const handleBulkRetry = useCallback(async () => {
    try {
      await Promise.all(selectedIds.map(id => fisExceptionService.retryFISException(id)));
      setSelectedIds([]);
      await loadExceptions();
    } catch (err) {
      console.error('Error bulk retrying exceptions:', err);
    }
  }, [fisExceptionService, selectedIds, loadExceptions]);

  const handleBulkDelete = useCallback(async () => {
    try {
      await Promise.all(selectedIds.map(id => fisExceptionService.updateFISExceptionStatus(id, FISExceptionStatus.FAILED)));
      setSelectedIds([]);
      await loadExceptions();
    } catch (err) {
      console.error('Error bulk deleting exceptions:', err);
    }
  }, [fisExceptionService, selectedIds, loadExceptions]);

  const handleExport = useCallback(async () => {
    try {
      const summary = await fisExceptionService.getFISExceptionSummary();
      const blob = new Blob([JSON.stringify(summary)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fis-exceptions-${dayjs().format('YYYY-MM-DD')}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error exporting exceptions:', err);
    }
  }, [fisExceptionService]);

  const handleFilterChange = <K extends keyof FISExceptionFilters>(
    field: K,
    value: FISExceptionFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('requestId', event.target.value);
  };

  const renderStats = () => (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">Total Exceptions</Typography>
              <Typography variant="h4">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">Success Rate</Typography>
              <Typography variant="h4">
                {(stats.successRate * 100).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">Average Retry Count</Typography>
              <Typography>
                {stats.avgRetryCount.toFixed(1)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">Pending Exceptions</Typography>
              <Typography>{stats.byStatus[FISExceptionStatus.PENDING]}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  const renderFilters = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              label="Request ID"
              value={filters.requestId}
              onChange={handleSearchChange}
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
            onClick={() => handleRetry(dialogState.exception.id)}
          >
            Retry Exception
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  useEffect(() => {
    loadExceptions();
    loadExceptionStats();
  }, [loadExceptions, loadExceptionStats]);

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
        <ExceptionSummaryDisplay summary={stats} />
      )}
      {renderFilters()}
      {renderExceptionList()}
      {renderDialog()}
    </Box>
  );
};

export default FISExceptionHandling;