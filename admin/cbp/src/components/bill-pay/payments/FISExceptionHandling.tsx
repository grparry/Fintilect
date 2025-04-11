import React, { useEffect, useState, useCallback } from 'react';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { IFISExceptionService } from '../../../services/interfaces/IFISExceptionService';
import logger from '../../../utils/logger';
import {
  FISException,
  FISExceptionStatus,
  FISExceptionHistory,
  FISResponseHistory,
  FISExceptionFilters,
  FISExceptionStats,
  FISErrorCode,
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

const defaultByErrorCode: Record<FISErrorCode, number> = {
  INVALID_ACCOUNT: 0,
  INSUFFICIENT_FUNDS: 0,
  ACCOUNT_CLOSED: 0,
  TECHNICAL_ERROR: 0,
  VALIDATION_ERROR: 0
};

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

const ExceptionSummaryDisplay: React.FC<{ summary: FISExceptionStats }> = ({ summary }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Typography variant="body2" color="text.primary">
        Total: {summary.total}
      </Typography>
      <Typography variant="body2" color="text.primary">
        Pending: {summary.byStatus[FISExceptionStatus.PENDING]}
      </Typography>
      <Typography variant="body2" color="text.primary">
        Resolved: {summary.byStatus[FISExceptionStatus.RESOLVED]}
      </Typography>
      <Typography variant="body2" color="text.primary">
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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [dialogState, setDialogState] = useState<FISDialogState>({
    open: false,
    exception: null,
    action: null,
  });
  const [filters, setFilters] = useState<FISExceptionFilters>({
    serviceRequestNumber: '',
    status: [],
    errorCode: [],
    startDate: '',
    endDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<FISExceptionStats>({
    total: 0,
    byStatus: defaultByStatus,
    byType: {},
    byErrorCode: defaultByErrorCode,
    avgResolutionTime: 0,
    resolutionRate: 0,
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
      logger.error('Error fetching exceptions:', err);
    } finally {
      setLoading(false);
    }
  }, [fisExceptionService, filters]);

  const loadExceptionStats = useCallback(async () => {
    try {
      const summary = await fisExceptionService.getFISExceptionSummary();
      setStats({
        total: exceptions.length,
        byStatus: defaultByStatus,
        byType: {},
        byErrorCode: defaultByErrorCode,
        avgResolutionTime: 0,
        resolutionRate: 0,
        successRate: 0,
        avgRetryCount: 0
      });
    } catch (err) {
      logger.error('Error fetching exception stats:', err);
    }
  }, [fisExceptionService, exceptions]);

  const loadResponseHistory = useCallback(async (serviceRequestNumber: string) => {
    try {
      const history = await fisExceptionService.getFISResponseHistory(serviceRequestNumber);
      setResponseHistory(history);
    } catch (err) {
      logger.error('Error fetching response history:', err);
    }
  }, [fisExceptionService]);

  const handleRetry = useCallback(async (id: number) => {
    try {
      await fisExceptionService.retryFISException(id);
      setDialogState({ open: false, exception: null, action: null });
      await loadExceptions();
    } catch (err) {
      logger.error('Error retrying exception:', err);
      setError('Failed to retry exception');
    }
  }, [fisExceptionService, loadExceptions]);

  const handleBulkRetry = useCallback(async () => {
    try {
      await Promise.all(selectedIds.map(id => fisExceptionService.retryFISException(id)));
      setSelectedIds([]);
      await loadExceptions();
    } catch (err) {
      logger.error('Error bulk retrying exceptions:', err);
    }
  }, [fisExceptionService, selectedIds, loadExceptions]);

  const handleBulkDelete = useCallback(async () => {
    try {
      await Promise.all(selectedIds.map(id => fisExceptionService.updateFISExceptionStatus(id, FISExceptionStatus.FAILED)));
      setSelectedIds([]);
      await loadExceptions();
    } catch (err) {
      logger.error('Error bulk deleting exceptions:', err);
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
      logger.error('Error exporting exceptions:', err);
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

  const handleErrorCodeChange = (event: SelectChangeEvent<FISErrorCode[]>) => {
    const {
      target: { value },
    } = event;
    setFilters((prev) => ({
      ...prev,
      errorCode: typeof value === 'string' ? [value as FISErrorCode] : value as FISErrorCode[],
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('serviceRequestNumber', event.target.value);
  };

  const renderStats = () => (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">Total Exceptions</Typography>
              <Typography variant="h4" color="text.primary">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">Success Rate</Typography>
              <Typography variant="h4" color="text.primary">{(stats.successRate * 100).toFixed(1)}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">Average Retry Count</Typography>
              <Typography color="text.primary">
                {stats.avgRetryCount.toFixed(1)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="text.primary">Pending Exceptions</Typography>
              <Typography color="text.primary">{stats.byStatus[FISExceptionStatus.PENDING]}</Typography>
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
              label="Service Request #"
              value={filters.serviceRequestNumber}
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
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Error Code</InputLabel>
              <Select
                multiple
                value={filters.errorCode}
                onChange={handleErrorCodeChange}
                label="Error Code"
              >
                {Object.values(FISErrorCode).map((errorCode) => (
                  <MenuItem key={errorCode} value={errorCode}>
                    {errorCode}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="Start Date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              label="End Date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              fullWidth
              size="small"
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
            <TableCell>Service Request #</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Payee</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Error Code</TableCell>
            <TableCell>Created</TableCell>
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
              <TableCell>{exception.serviceRequestNumber}</TableCell>
              <TableCell>
                {exception.primaryCustomerFirstName} {exception.primaryCustomerLastName}
              </TableCell>
              <TableCell>{exception.payeeName}</TableCell>
              <TableCell>${exception.transactionAmount}</TableCell>
              <TableCell>
                <ExceptionStatusChip status={exception.status} />
              </TableCell>
              <TableCell>{exception.errorCode}</TableCell>
              <TableCell>{dayjs(exception.created).format('MM/DD/YYYY HH:mm')}</TableCell>
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
      <DialogTitle>Exception Details</DialogTitle>
      <DialogContent>
        {dialogState.exception && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Service Request #
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {dialogState.exception.serviceRequestNumber}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Customer
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {dialogState.exception.primaryCustomerFirstName} {dialogState.exception.primaryCustomerLastName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Customer ID
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {dialogState.exception.customerId}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Payee
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {dialogState.exception.payeeName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Payee Account #
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {dialogState.exception.customerPayeeAccountNumber}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Amount
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      ${dialogState.exception.transactionAmount}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Status
                    </Typography>
                    <ExceptionStatusChip status={dialogState.exception.status} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Error Code
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {dialogState.exception.errorCode}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Retry Count
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {dialogState.exception.retryCount}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Error Message
                    </Typography>
                    <Typography variant="body2" color="text.primary" sx={{ flex: 1 }}>
                      {dialogState.exception.errorMessage}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ width: 120 }}>
                      Created
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {dayjs(dialogState.exception.created).format('MM/DD/YYYY HH:mm')}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
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
        <Typography variant="h5" color="text.primary">FIS Exception Handling</Typography>
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