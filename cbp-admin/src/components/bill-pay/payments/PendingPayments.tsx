import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  TablePagination,
  Stack,
  Alert,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
  CircularProgress,
  LinearProgress,
  OutlinedInput,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import dayjs, { Dayjs } from 'dayjs';

import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { useAuth } from '../../../hooks/useAuth';
import {
  PendingPayment,
  PendingPaymentSummary,
  PendingPaymentSearchRequest,
  PaymentStatus,
  PaymentMethod,
  Priority,
  PaymentHistory,
  ConfirmationMethod,
  PaymentConfirmationRequest,
  PaymentConfirmationResponse,
} from '../../../types/bill-pay.types';

interface PaymentDialogState {
  open: boolean;
  payment: PendingPayment | null;
  action: 'view' | 'approve' | 'reject' | 'history' | 'confirm' | null;
  history?: PaymentHistory[];
}

interface FilterState {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  searchTerm: string;
  status?: PaymentStatus;
  method?: PaymentMethod;
  priority?: Priority;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  clientId?: string;
  payeeId?: string;
  minAmount?: number;
  maxAmount?: number;
}

interface ConfirmationState {
  method: ConfirmationMethod;
  code: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: string | null;
  error: string | null;
  processing: boolean;
  confirmationStatus: string | null;
}

const initialConfirmationState: ConfirmationState = {
  method: ConfirmationMethod.OTP,
  code: '',
  attempts: 0,
  maxAttempts: 3,
  expiresAt: null,
  error: null,
  processing: false,
  confirmationStatus: null
};

const PendingPayments: React.FC = () => {
  const { user } = useAuth();
  const paymentService = ServiceFactory.getInstance().getPaymentService();

  // State
  const [payments, setPayments] = useState<PendingPayment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PendingPayment[] | null>(null);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 0,
    limit: 10,
    total: 0
  });
  const [dialogState, setDialogState] = useState<PaymentDialogState>({
    open: false,
    payment: null,
    action: null,
  });
  const [filters, setFilters] = useState<FilterState>({
    startDate: null,
    endDate: null,
    priority: undefined,
    searchTerm: '',
    method: undefined,
    status: PaymentStatus.PENDING,
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [summary, setSummary] = useState<PendingPaymentSummary | null>(null);
  const [history, setHistory] = useState<PaymentHistory[]>([]);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const [confirmation, setConfirmation] = useState<ConfirmationState>(initialConfirmationState);
  const [rejectReason, setRejectReason] = useState('');

  const handleError = (err: unknown, message?: string) => {
    console.error(message || 'An error occurred', err);
    setError(message || 'An error occurred');
  };

  // Helper function to get priority color
  const getPriorityColor = (priority: Priority): 'error' | 'warning' | 'info' | 'default' => {
    switch (priority) {
      case Priority.HIGH:
        return 'error';
      case Priority.MEDIUM:
        return 'warning';
      case Priority.LOW:
        return 'info';
      default:
        return 'default';
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: PaymentStatus): 'warning' | 'success' | 'error' | 'info' => {
    switch (status) {
      case PaymentStatus.PENDING:
        return 'warning';
      case PaymentStatus.APPROVED:
        return 'success';
      case PaymentStatus.REJECTED:
        return 'error';
      default:
        return 'info';
    }
  };

  // Fetch pending payments
  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const searchRequest: PendingPaymentSearchRequest = {
        status: filters.status,
        method: filters.method,
        priority: filters.priority,
        startDate: filters.startDate?.toISOString(),
        endDate: filters.endDate?.toISOString(),
        page: filters.page,
        limit: filters.limit,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        clientId: filters.clientId,
        payeeId: filters.payeeId,
        minAmount: filters.minAmount,
        maxAmount: filters.maxAmount
      };
      
      const response = await paymentService.getPendingPayments(searchRequest);
      setPayments(response.data || []);
      setFilteredPayments(response.data || []);
      setPagination(prev => ({ ...prev, total: response.total || 0 }));
    } catch (err) {
      handleError(err);
      setPayments([]);
      setFilteredPayments([]);
      setPagination(prev => ({ ...prev, total: 0 }));
    } finally {
      setLoading(false);
    }
  }, [filters, paymentService]);

  // Fetch payment summary
  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      const searchRequest: PendingPaymentSearchRequest = {
        status: filters.status,
        method: filters.method,
        priority: filters.priority,
        startDate: filters.startDate?.toISOString(),
        endDate: filters.endDate?.toISOString(),
        clientId: filters.clientId,
        payeeId: filters.payeeId,
        minAmount: filters.minAmount,
        maxAmount: filters.maxAmount
      };
      const response = await paymentService.getPendingPaymentsSummary(searchRequest);
      setSummary(response);
    } catch (err) {
      handleError(err);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  }, [filters, paymentService]);

  useEffect(() => {
    fetchPayments();
    fetchSummary();
  }, [fetchPayments, fetchSummary]);

  // Apply client-side filtering whenever payments or searchTerm changes
  useEffect(() => {
    if (!filters.searchTerm) {
      setFilteredPayments(payments);
      return;
    }

    const searchTermLower = filters.searchTerm.toLowerCase();
    const filtered = payments.filter(payment => {
      return (
        payment.id.toLowerCase().includes(searchTermLower) ||
        payment.clientName.toLowerCase().includes(searchTermLower) ||
        payment.payeeName.toLowerCase().includes(searchTermLower) ||
        payment.amount.toString().includes(searchTermLower) ||
        payment.status.toLowerCase().includes(searchTermLower) ||
        payment.method.toLowerCase().includes(searchTermLower)
      );
    });

    setFilteredPayments(filtered);
  }, [payments, filters.searchTerm]);

  // Update total payments when filtered results change
  useEffect(() => {
    setPagination(prev => ({ ...prev, total: filteredPayments?.length || 0 }));
  }, [filteredPayments]);

  // Handlers
  const handlePageChange = (event: unknown, newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    setFilters(prev => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setPagination(prev => ({ ...prev, limit: newLimit, page: 0 }));
    setFilters(prev => ({ ...prev, limit: newLimit, page: 1 }));
  };

  const handleFilterChange = <K extends keyof FilterState>(
    field: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPagination(prev => ({ ...prev, page: 0 }));
  };

  const handleDateChange = (field: 'startDate' | 'endDate') => (date: Dayjs | null) => {
    handleFilterChange(field, date);
  };

  const handleStatusChange = (event: SelectChangeEvent<PaymentStatus>) => {
    setFilters(prev => ({
      ...prev,
      status: event.target.value as PaymentStatus
    }));
  };

  const handlePriorityChange = (event: SelectChangeEvent<Priority>) => {
    setFilters(prev => ({
      ...prev,
      priority: event.target.value as Priority
    }));
  };

  const handleMethodChange = (event: SelectChangeEvent<PaymentMethod>) => {
    setFilters(prev => ({
      ...prev,
      method: event.target.value as PaymentMethod
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('searchTerm', event.target.value);
  };

  const handleExport = async () => {
    try {
      const blob = await paymentService.exportPendingPayments({
        ...filters,
        startDate: filters.startDate?.toISOString(),
        endDate: filters.endDate?.toISOString(),
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pending-payments-${dayjs().format('YYYY-MM-DD')}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      handleError(err, 'Failed to export payments');
    }
  };

  const handleApprove = async (payment: PendingPayment) => {
    try {
      setProcessing((prev) => ({ ...prev, [payment.id]: true }));
      await paymentService.approvePayment(payment.id);
      await fetchPayments();
    } catch (err) {
      handleError(err, 'Failed to approve payment');
    } finally {
      setProcessing((prev) => ({ ...prev, [payment.id]: false }));
    }
  };

  const handleRejectPayment = useCallback(async (paymentId: string) => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    try {
      setProcessing((prev) => ({ ...prev, [paymentId]: true }));
      await paymentService.rejectPayment(paymentId, rejectReason || 'Rejected by admin');
      await fetchPayments();
      setDialogState({ open: false, payment: null, action: null });
      setRejectReason('');
    } catch (err) {
      handleError(err, 'Failed to reject payment');
    } finally {
      setProcessing((prev) => ({ ...prev, [paymentId]: false }));
    }
  }, [user?.id, fetchPayments, rejectReason]);

  const handleBulkApprove = async () => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }
    
    try {
      setProcessing(prev => ({ ...prev, bulk: true }));
      const success = await paymentService.bulkApprove(selectedPayments);
      if (success) {
        await fetchPayments();
        setSelectedPayments([]);
      }
    } catch (err) {
      handleError(err, 'Failed to approve payments');
    } finally {
      setProcessing(prev => ({ ...prev, bulk: false }));
    }
  };

  const handleBulkReject = async () => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    try {
      setProcessing(prev => ({ ...prev, bulk: true }));
      const success = await paymentService.bulkReject(selectedPayments);
      if (success) {
        await fetchPayments();
        setSelectedPayments([]);
      }
    } catch (err) {
      handleError(err, 'Failed to reject payments');
    } finally {
      setProcessing(prev => ({ ...prev, bulk: false }));
    }
  };

  const handleViewHistory = async (payment: PendingPayment) => {
    try {
      setLoading(true);
      const response = await paymentService.getPaymentHistory(payment.id);
      const formattedHistory: PaymentHistory = {
        paymentId: payment.id,
        action: response.action,
        performedBy: response.performedBy,
        timestamp: response.timestamp,
        details: response.details
      };
      setDialogState({
        open: true,
        payment,
        action: 'history',
        history: [formattedHistory]
      });
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmationError = (error: string | undefined) => {
    setConfirmation(prev => ({
      ...prev,
      error: error || null,
      attempts: prev.attempts + 1,
    }));
  };

  // Confirmation handlers
  const handleConfirmationMethodChange = (event: SelectChangeEvent<ConfirmationMethod>) => {
    setConfirmation(prev => ({
      ...prev,
      method: event.target.value as ConfirmationMethod,
      code: '',
      error: null
    }));
  };

  const handleConfirmationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmation(prev => ({
      ...prev,
      code: event.target.value,
      error: null
    }));
  };

  const handleConfirmPayment = async (confirmationData: PaymentConfirmationRequest) => {
    try {
      setLoading(true);
      const response: PaymentConfirmationResponse = await paymentService.confirmPayment(confirmationData.paymentId, {
        method: confirmationData.method,
        confirmationMethod: confirmationData.confirmationMethod,
        code: confirmationData.code,
        notes: confirmationData.notes,
        userId: confirmationData.userId
      });
      setConfirmation(prev => ({
        ...prev,
        attempts: response.attempts,
        maxAttempts: response.maxAttempts,
        expiresAt: response.expiresAt,
        error: response.message,
        processing: false,
        confirmationStatus: response.confirmationStatus
      }));
      if (response.success) {
        await fetchPayments();
      }
    } catch (err) {
      handleError(err);
      setConfirmation(prev => ({
        ...prev,
        error: 'An error occurred during confirmation',
        processing: false
      }));
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentAction = async (paymentId: string, action: 'approve' | 'reject') => {
    try {
      setProcessing(prev => ({ ...prev, [paymentId]: true }));
      if (action === 'approve') {
        await paymentService.approvePayment(paymentId);
      } else {
        await paymentService.rejectPayment(paymentId, rejectReason);
      }
      
      // Since the operation completed without throwing an error, we can proceed
      fetchPayments();
      setDialogState({ open: false, payment: null, action: null });
      setRejectReason(''); // Clear the reason after successful rejection
    } catch (error) {
      console.error(`Error ${action}ing payment:`, error);
    } finally {
      setProcessing(prev => ({ ...prev, [paymentId]: false }));
    }
  };

  const handleConfirmationRequest = async (paymentId: string) => {
    try {
      setConfirmation(prev => ({
        ...prev,
        processing: true,
        error: null,
        method: ConfirmationMethod.OTP // Ensure method is set with enum
      }));

      const request: any = {
        paymentId,
        method: PaymentMethod.ACH,
        confirmationMethod: ConfirmationMethod.OTP,
        code: confirmation.code,
        userId: user?.id?.toString() // Convert number to string
      };

      const response: PaymentConfirmationResponse = await paymentService.confirmPayment(paymentId, request);
      setConfirmation(prev => ({
        ...prev,
        attempts: response.attempts,
        maxAttempts: response.maxAttempts,
        expiresAt: response.expiresAt,
        error: response.message,
        processing: false,
        confirmationStatus: response.confirmationStatus
      }));
      if (response.success) {
        fetchPayments();
      }
    } catch (error) {
      console.error('Error confirming payment:', error);
      setConfirmation(prev => ({
        ...prev,
        error: 'Failed to confirm payment',
        processing: false,
        method: ConfirmationMethod.OTP // Maintain enum value in error state
      }));
    }
  };

  // Render functions
  const renderFilters = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={handleDateChange('startDate')}
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={filters.endDate}
                onChange={handleDateChange('endDate')}
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={handleStatusChange}
                label="Status"
              >
                {Object.values(PaymentStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Priority</InputLabel>
              <Select
                value={filters.priority}
                onChange={handlePriorityChange}
                label="Priority"
              >
                {Object.values(Priority).map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel>Method</InputLabel>
              <Select
                name="method"
                value={filters.method || ''}
                onChange={handleMethodChange}
                label="Method"
              >
                <MenuItem value="">All</MenuItem>
                {[PaymentMethod.ACH, PaymentMethod.WIRE, PaymentMethod.CHECK, PaymentMethod.CARD].map((method) => (
                  <MenuItem key={method} value={method}>
                    {method}
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

  const renderTable = () => {
    if (!filteredPayments) {
      return (
        <Box sx={{ width: '100%', textAlign: 'center', py: 3 }}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedPayments.length === filteredPayments.length}
                  indeterminate={
                    selectedPayments.length > 0 &&
                    selectedPayments.length < filteredPayments.length
                  }
                  onChange={(event) =>
                    setSelectedPayments(
                      event.target.checked ? filteredPayments.map((p) => p.id) : []
                    )
                  }
                  aria-label="Select all payments"
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Payee</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Effective Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : !Array.isArray(filteredPayments) || filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPayments.includes(payment.id)}
                      onChange={(event) =>
                        setSelectedPayments(
                          event.target.checked
                            ? [...selectedPayments, payment.id]
                            : selectedPayments.filter((id) => id !== payment.id)
                        )
                      }
                      aria-label="Select payment"
                    />
                  </TableCell>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.clientName}</TableCell>
                  <TableCell>{payment.payeeName}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: payment.currency,
                    }).format(payment.amount)}
                  </TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status}
                      size="small"
                      color={getStatusColor(payment.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={payment.priority}
                      size="small"
                      color={getPriorityColor(payment.priority)}
                    />
                  </TableCell>
                  <TableCell>
                    {dayjs(payment.effectiveDate).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() =>
                            setDialogState({
                              open: true,
                              payment,
                              action: 'view',
                            })
                          }
                          aria-label="View Details"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      {payment.status === PaymentStatus.PENDING && (
                        <>
                          <Tooltip title="Approve">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleApprove(payment)}
                              aria-label="Approve"
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handlePaymentAction(payment.id, 'reject')}
                              aria-label="Reject"
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip title="View History">
                        <IconButton
                          size="small"
                          onClick={() => handleViewHistory(payment)}
                          aria-label="View History"
                        >
                          <HistoryIcon />
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
          count={pagination.total}
          page={pagination.page}
          onPageChange={handlePageChange}
          rowsPerPage={pagination.limit}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    );
  };

  const renderDialog = () => (
    <Dialog
      open={dialogState.open}
      onClose={() => setDialogState({ open: false, payment: null, action: null })}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {dialogState.action === 'view'
          ? 'Payment Details'
          : dialogState.action === 'approve'
          ? 'Approve Payment'
          : dialogState.action === 'reject'
          ? 'Reject Payment'
          : 'Payment History'}
      </DialogTitle>
      <DialogContent>
        {dialogState.payment && dialogState.action === 'view' && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Payment ID</Typography>
              <Typography>{dialogState.payment.id}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Status</Typography>
              <Chip
                label={dialogState.payment.status}
                size="small"
                color={getStatusColor(dialogState.payment.status)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Client</Typography>
              <Typography>{dialogState.payment.clientName}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Payee</Typography>
              <Typography>{dialogState.payment.payeeName}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Amount</Typography>
              <Typography>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: dialogState.payment.currency,
                }).format(dialogState.payment.amount)}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Payment Type</Typography>
              <Typography>{dialogState.payment.method}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Priority</Typography>
              <Chip
                label={dialogState.payment.priority}
                size="small"
                color={getPriorityColor(dialogState.payment.priority)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2">Effective Date</Typography>
              <Typography>
                {dayjs(dialogState.payment.effectiveDate).format('MM/DD/YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography>{dialogState.payment.description || 'N/A'}</Typography>
            </Grid>
          </Grid>
        )}
        {dialogState.action === 'reject' && (
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Rejection Reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              required
              placeholder="Please provide a reason for rejecting this payment"
            />
          </Box>
        )}
        {dialogState.action === 'history' && dialogState.history && (
          <Box sx={{ mt: 2 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Performed By</TableCell>
                    <TableCell>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dialogState.history.map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2">
                          {entry.action}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {entry.performedBy}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {dayjs(entry.timestamp).format('MM/DD/YYYY HH:mm:ss')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            setDialogState({ open: false, payment: null, action: null })
          }
        >
          Close
        </Button>
        {dialogState.action === 'reject' && (
          <Button
            variant="contained"
            color="error"
            onClick={() =>
              dialogState.payment &&
              handlePaymentAction(dialogState.payment.id, 'reject')
            }
            disabled={processing[dialogState.payment?.id || '']}
            startIcon={
              processing[dialogState.payment?.id || ''] ? (
                <CircularProgress size={20} />
              ) : (
                <CancelIcon />
              )
            }
            aria-label="Reject payment"
          >
            Reject
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  const renderConfirmationDialog = () => {
    if (!dialogState.payment) return null;

    return (
      <Dialog
        open={dialogState.open}
        onClose={() => setDialogState({ ...dialogState, open: false })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Confirmation Code"
              value={confirmation.code}
              onChange={(e) => setConfirmation(prev => ({ ...prev, code: e.target.value }))}
              error={!!confirmation.error}
              helperText={confirmation.error}
              disabled={confirmation.processing}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogState({ ...dialogState, open: false })}
            disabled={confirmation.processing}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (dialogState.payment) {
                const confirmationData: PaymentConfirmationRequest = {
                  paymentId: dialogState.payment.id,
                  method: dialogState.payment.method,
                  confirmationMethod: ConfirmationMethod.OTP,
                  code: confirmation.code,
                  userId: user?.id?.toString()
                };
                handleConfirmPayment(confirmationData);
              }
            }}
            disabled={!confirmation.code || confirmation.processing}
            variant="contained"
            aria-label="Confirm payment"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderRejectDialog = () => {
    if (!dialogState.payment || dialogState.action !== 'reject') return null;

    return (
      <Dialog
        open={dialogState.open}
        onClose={() => setDialogState({ open: false, payment: null, action: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reject Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Rejection Reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              required
              placeholder="Please provide a reason for rejecting this payment"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogState({ open: false, payment: null, action: null });
              setRejectReason('');
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => dialogState.payment && handlePaymentAction(dialogState.payment.id, 'reject')}
            disabled={!rejectReason || (dialogState.payment && processing[dialogState.payment.id])}
            color="error"
            variant="contained"
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Box>
      {renderFilters()}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircleIcon />}
            onClick={handleBulkApprove}
            disabled={selectedPayments.length === 0 || processing.bulk}
            aria-label="Bulk approve selected payments"
          >
            Bulk Approve
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="error"
            startIcon={<CancelIcon />}
            onClick={handleBulkReject}
            disabled={selectedPayments.length === 0 || processing.bulk}
            aria-label="Bulk reject selected payments"
          >
            Bulk Reject
          </Button>
        </Grid>
      </Grid>
      {renderTable()}
      {renderDialog()}
      {renderConfirmationDialog()}
      {renderRejectDialog()}
    </Box>
  );
};

export default PendingPayments;
