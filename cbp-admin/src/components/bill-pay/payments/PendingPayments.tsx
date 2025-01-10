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

import {
  Payment,
  PendingPayment,
  PaymentMethod,
  PaymentStatus,
  Priority,
  PaymentFilters,
  PendingPaymentFilters,
  PendingPaymentSearchRequest,
  PendingPaymentListResponse,
  PendingPaymentSummary,
  PaymentHistory,
  PaymentAction,
  PaymentConfirmationRequest,
  PaymentConfirmationResponse,
  ConfirmationMethod,
  ConfirmationStatus,
  PendingPaymentApproval,
  PendingPaymentRejection
} from '../../../types/bill-pay.types';

import { ApiResponse, ApiSuccessResponse, PaymentApiResponse } from '../../../types/api.types';
import { pendingPaymentsApi } from '../../../services/api/pending-payments.api';
import { useAuth } from '../../../hooks/useAuth';

interface PaymentDialogState {
  open: boolean;
  payment: PendingPayment | null;
  action: 'view' | 'approve' | 'reject' | 'history' | 'confirm' | null;
}

interface FilterState {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  priority: Priority[];
  searchTerm: string;
  method?: PaymentMethod[];
  status?: PaymentStatus[];
}

interface ConfirmationState {
  method: ConfirmationMethod;
  code: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: string | null;
  error: string | null;
  processing: boolean;
}

const initialConfirmationState: ConfirmationState = {
  method: ConfirmationMethod.OTP,
  code: '',
  attempts: 0,
  maxAttempts: 3,
  expiresAt: null,
  error: null,
  processing: false,
};

const PendingPayments: React.FC = () => {
  const { user } = useAuth();

  // State
  const [payments, setPayments] = useState<PendingPayment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PendingPayment[] | null>(null);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPayments, setTotalPayments] = useState(0);
  const [dialogState, setDialogState] = useState<PaymentDialogState>({
    open: false,
    payment: null,
    action: null,
  });
  const [filters, setFilters] = useState<FilterState>({
    startDate: null,
    endDate: null,
    priority: [],
    searchTerm: '',
    method: [],
    status: [PaymentStatus.PENDING],
  });
  const [summary, setSummary] = useState<PendingPaymentSummary | null>(null);
  const [history, setHistory] = useState<Array<{
    action: string;
    performedBy: string;
    timestamp: string;
    details: Record<string, any>;
  }> | null>(null);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const [confirmation, setConfirmation] = useState<ConfirmationState>(initialConfirmationState);

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

  // Fetch data
  const fetchPayments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const requestParams = {
        page: page + 1,
        limit: rowsPerPage,
        startDate: filters.startDate?.format('YYYY-MM-DD'),
        endDate: filters.endDate?.format('YYYY-MM-DD'),
        status: filters.status?.[0],
        priority: filters.priority?.[0],
        method: filters.method?.[0]
      };
      
      console.log('Component - Fetching payments with params:', requestParams);

      const response = await pendingPaymentsApi.fetchPayments(requestParams);
      
      console.log('Component - Raw API Response:', response);
      console.log('Component - Response data:', response.data);
      
      // Extract payments from the nested response
      const paymentsResponse = response.data;
      console.log('Component - Payments response:', paymentsResponse);
      
      setPayments(paymentsResponse.data);
      setFilteredPayments(paymentsResponse.data);
      setTotalPayments(paymentsResponse.total || 0);
    } catch (err) {
      console.error('Component - Error details:', err);
      setError('Failed to fetch payments');
      setPayments([]);
      setFilteredPayments([]);
      setTotalPayments(0);
    } finally {
      setLoading(false);
    }
  }, [filters, page, rowsPerPage]);

  const fetchSummary = useCallback(async () => {
    try {
      const searchRequest: PendingPaymentSearchRequest = {
        startDate: filters.startDate?.format('YYYY-MM-DD'),
        endDate: filters.endDate?.format('YYYY-MM-DD'),
        status: filters.status?.[0],
        priority: filters.priority?.[0],
        method: filters.method?.[0],
      };
      const response = await pendingPaymentsApi.getSummary(searchRequest);
      if (response.success) {
        setSummary(response.data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  }, [filters]);

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
    setTotalPayments(filteredPayments?.length || 0);
  }, [filteredPayments]);

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
    setPage(0);
  };

  const handleDateChange = (field: 'startDate' | 'endDate') => (date: Dayjs | null) => {
    handleFilterChange(field, date);
  };

  const handleStatusChange = (event: SelectChangeEvent<PaymentStatus[]>) => {
    const {
      target: { value },
    } = event;
    setFilters(prev => ({
      ...prev,
      status: typeof value === 'string' ? [value as PaymentStatus] : value as PaymentStatus[],
    }));
    setPage(0);
  };

  const handlePriorityChange = (event: SelectChangeEvent<Priority[]>) => {
    const {
      target: { value },
    } = event;
    setFilters(prev => ({
      ...prev,
      priority: typeof value === 'string' ? [value as Priority] : value as Priority[],
    }));
    setPage(0);
  };

  const handleMethodChange = (event: SelectChangeEvent<PaymentMethod[]>) => {
    const {
      target: { value },
    } = event;
    setFilters(prev => ({
      ...prev,
      method: typeof value === 'string' ? [value as PaymentMethod] : value as PaymentMethod[],
    }));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFilterChange('searchTerm', event.target.value);
  };

  const handleExport = async () => {
    try {
      const blob = await pendingPaymentsApi.exportPayments({
        startDate: filters.startDate?.format('YYYY-MM-DD'),
        endDate: filters.endDate?.format('YYYY-MM-DD'),
        status: filters.status?.[0],
        priority: filters.priority?.[0],
        method: filters.method?.[0],
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
      setError('Failed to export payments');
      console.error('Error exporting payments:', err);
    }
  };

  const handleApprove = async (payment: PendingPayment) => {
    try {
      setProcessing((prev) => ({ ...prev, [payment.id]: true }));
      await pendingPaymentsApi.approvePayment(payment.id, {
        approvedBy: user?.id?.toString() || '',
        approvedAt: new Date().toISOString(),
      });
      await fetchPayments();
    } catch (err) {
      setError('Failed to approve payment');
      console.error('Error approving payment:', err);
    } finally {
      setProcessing((prev) => ({ ...prev, [payment.id]: false }));
    }
  };

  const handleRejectPayment = useCallback(async (payment: PendingPayment, reason: string) => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }

    try {
      setProcessing((prev) => ({ ...prev, [payment.id]: true }));
      await pendingPaymentsApi.rejectPayment(payment.id, {
        rejectedBy: user.id.toString(),
        rejectedAt: new Date().toISOString(),
        reason,
      });
      await fetchPayments();
    } catch (err) {
      console.error('Error rejecting payment:', err);
      setError('Failed to reject payment');
    } finally {
      setProcessing((prev) => ({ ...prev, [payment.id]: false }));
    }
  }, [user?.id, fetchPayments]);

  const handleBulkApprove = async () => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }
    
    try {
      setProcessing(prev => ({ ...prev, bulk: true }));
      const results = await pendingPaymentsApi.bulkApprove(selectedPayments, {
        approvedBy: user.id.toString(),
        approvedAt: new Date().toISOString(),
      });
      if (results.data) {
        await fetchPayments();
        setSelectedPayments([]);
      }
    } catch (err) {
      setError('Failed to approve payments');
      console.error('Error approving payments:', err);
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
      const results = await pendingPaymentsApi.bulkReject(selectedPayments, {
        rejectedBy: user.id.toString(),
        rejectedAt: new Date().toISOString(),
        reason: 'Bulk rejection',
      });
      if (results.data) {
        await fetchPayments();
        setSelectedPayments([]);
      }
    } catch (err) {
      setError('Failed to reject payments');
      console.error('Error rejecting payments:', err);
    } finally {
      setProcessing(prev => ({ ...prev, bulk: false }));
    }
  };

  const handleViewHistory = async (payment: PendingPayment) => {
    try {
      const response = await pendingPaymentsApi.getPaymentHistory(payment.id);
      if (response.data) {
        setHistory([{
          action: response.data.action,
          performedBy: response.data.performedBy,
          timestamp: response.data.timestamp,
          details: response.data.details,
        }]);
      }
      setDialogState({ open: true, payment, action: 'history' });
    } catch (err) {
      setError('Failed to fetch payment history');
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

  const handleConfirmPayment = async () => {
    if (!dialogState.payment) return;

    try {
      setConfirmation(prev => ({ ...prev, processing: true }));
      const response = await pendingPaymentsApi.confirmPayment(dialogState.payment.id, {
        paymentId: dialogState.payment.id,
        method: PaymentMethod.ACH,
        confirmationMethod: ConfirmationMethod.OTP,
        code: confirmation.code,
        userId: user?.id?.toString(),
      });

      if (response.success) {
        setConfirmation(prev => ({
          ...prev,
          attempts: response.data.attempts,
          maxAttempts: response.data.maxAttempts,
          expiresAt: response.data.expiresAt,
          error: null,
          method: ConfirmationMethod.OTP,
          code: '',
          processing: false,
        }));
      }
    } catch (err) {
      handleConfirmationError(err instanceof Error ? err.message : 'Failed to confirm payment');
    } finally {
      setConfirmation(prev => ({ ...prev, processing: false }));
    }
  };

  const handlePaymentAction = async (paymentId: string, action: 'approve' | 'reject', data: PendingPaymentApproval | PendingPaymentRejection) => {
    try {
      setProcessing(prev => ({ ...prev, [paymentId]: true }));
      const response = action === 'approve'
        ? await pendingPaymentsApi.approvePayment(paymentId, data as PendingPaymentApproval)
        : await pendingPaymentsApi.rejectPayment(paymentId, data as PendingPaymentRejection);
      
      if (response.success) {
        fetchPayments();
        setDialogState({ open: false, payment: null, action: null });
      }
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

      const request: PaymentConfirmationRequest = {
        paymentId,
        method: PaymentMethod.ACH,
        confirmationMethod: ConfirmationMethod.OTP,
        code: confirmation.code,
        userId: user?.id?.toString() // Convert number to string
      };

      const response = await pendingPaymentsApi.confirmPayment(paymentId, request);
      if (response.success) {
        setConfirmation(prev => ({
          ...prev,
          attempts: response.data.attempts,
          maxAttempts: response.data.maxAttempts,
          expiresAt: response.data.expiresAt,
          error: null,
          method: ConfirmationMethod.OTP,
          code: '',
          processing: false
        }));
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
                multiple
                value={filters.status}
                onChange={handleStatusChange}
                label="Status"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        size="small"
                        color={getStatusColor(value)}
                      />
                    ))}
                  </Box>
                )}
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
                multiple
                value={filters.priority}
                onChange={handlePriorityChange}
                label="Priority"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
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
              <InputLabel>Payment Method</InputLabel>
              <Select
                name="method"
                value={filters.method || ''}
                onChange={handleMethodChange}
                label="Payment Method"
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

    console.log('Rendering table with payments:', filteredPayments);
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
                              onClick={() => handleRejectPayment(payment, 'Rejected by admin')}
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
          count={totalPayments}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={rowsPerPage}
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
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Rejection Reason"
            required
            sx={{ mt: 2 }}
          />
        )}
        {dialogState.action === 'history' && history && (
          <Box sx={{ mt: 2 }}>
            {history.map((entry, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle2">
                  {dayjs(entry.timestamp).format('MM/DD/YYYY HH:mm:ss')}
                </Typography>
                <Typography>
                  {entry.action} by {entry.performedBy}
                </Typography>
                {Object.entries(entry.details).map(([key, value]) => (
                  <Typography
                    key={key}
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 2 }}
                  >
                    {key}: {value}
                  </Typography>
                ))}
                {index < history.length - 1 && (
                  <Divider sx={{ mt: 1, mb: 1 }} />
                )}
              </Box>
            ))}
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
              handleRejectPayment(
                dialogState.payment,
                'Rejected by admin' // TODO: Get from text field
              )
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
    if (dialogState.action !== 'confirm' || !dialogState.payment) return null;

    const timeLeft = confirmation.expiresAt
      ? Math.max(0, Math.floor((new Date(confirmation.expiresAt).getTime() - Date.now()) / 1000))
      : 0;

    return (
      <Dialog open={dialogState.open} onClose={() => setDialogState({ open: false, payment: null, action: null })}>
        <DialogTitle>Confirm Payment</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ minWidth: 400, mt: 2 }}>
            <Typography variant="body1">
              Please confirm payment #{dialogState.payment.id} for ${dialogState.payment.amount.toFixed(2)}
            </Typography>

            <FormControl fullWidth>
              <InputLabel>Confirmation Method</InputLabel>
              <Select
                value={confirmation.method}
                onChange={handleConfirmationMethodChange}
                label="Confirmation Method"
              >
                <MenuItem value="otp">One-Time Password</MenuItem>
                <MenuItem value="password">Password</MenuItem>
                <MenuItem value="biometric">Biometric</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined">
              <InputLabel>Confirmation Code</InputLabel>
              <OutlinedInput
                type="text"
                value={confirmation.code}
                onChange={handleConfirmationCodeChange}
                label="Confirmation Code"
                error={!!confirmation.error}
                disabled={confirmation.processing}
                endAdornment={
                  <LockIcon color="action" sx={{ mr: 1 }} />
                }
              />
            </FormControl>

            {confirmation.error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {confirmation.error}
              </Alert>
            )}

            {confirmation.attempts > 0 && (
              <Typography color="warning.main">
                Attempts: {confirmation.attempts} / {confirmation.maxAttempts}
              </Typography>
            )}

            {timeLeft > 0 && (
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Expires in: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(timeLeft / (5 * 60)) * 100}
                  sx={{ mt: 1 }}
                />
              </Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogState({ open: false, payment: null, action: null })}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmPayment}
            disabled={!confirmation.code || confirmation.processing}
            variant="contained"
            aria-label="Confirm payment"
          >
            {confirmation.processing ? <CircularProgress size={24} /> : 'Confirm'}
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
    </Box>
  );
};

export default PendingPayments;
