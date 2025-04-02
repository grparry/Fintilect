import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  History as HistoryIcon,
  FileDownload as FileDownloadIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useAuth } from '../../../hooks/useAuth';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import PaymentDetails from './PaymentDetails';
import {
  Payment,
  PaymentAction,
  PaymentActivity,
  PaymentActivityListResponse,
  PaymentActivityRequest,
  PaymentMethod,
  PaymentStatus,
  PaymentHistory,
  SearchType
} from '../../../types/payment.types';
import dayjs, { Dayjs } from 'dayjs';
import useClientApi from '../../../hooks/useClientApi';

interface PaginationState {
  page: number;
  rowsPerPage: number;
  total: number;
}

interface FilterState {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  searchTerm: string;
  searchType: SearchType;
  status: PaymentStatus[];
  method: PaymentMethod[];
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
}

interface PaymentDialogState {
  open: boolean;
  payment: PaymentActivity | null;
  action: 'view' | 'history' | 'reject' | null;
  history?: PaymentAction[];
}

const initialFilterState: FilterState = {
  startDate: dayjs().subtract(30, 'days'),
  endDate: dayjs(),
  searchTerm: '',
  searchType: SearchType.Date,
  status: [],
  method: [],
  page: 1,
  limit: 10,
  sortBy: 'paymentID',
  sortOrder: 'DESC'
};

export const ManagePayments: React.FC = () => {
  // Indicate that this component uses client-specific API
  useClientApi(true);

  const { user } = useAuth();
  const paymentService = ServiceFactory.getInstance().getPaymentService();

  // State
  const [payments, setPayments] = useState<PaymentActivity[]>([]);
  const [pendingPayments, setPendingPayments] = useState<PaymentActivity[]>([]);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    rowsPerPage: 10,
    total: 0
  });
  const [dialogState, setDialogState] = useState<PaymentDialogState>({
    open: false,
    payment: null,
    action: null
  });
  const [filters, setFilters] = useState<FilterState>(initialFilterState);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const [rejectReason, setRejectReason] = useState('');
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    status: false,
    method: false
  });

  const handleError = (err: unknown, message?: string) => {
    console.error(message || 'An error occurred', err);
    setError(message || 'An error occurred');
  };

  // Fetch payments
  const fetchPendingPayments = useCallback(async () => {
    try {
      setLoading(true);
      
      // Determine the appropriate search type based on the search term and filters
      let searchType = filters.searchType;
      let searchValue = filters.searchTerm;
      let payeeName = '';
      
      // If no specific search type is selected, try to auto-detect based on the format
      if (searchValue && !searchType) {
        // If search term looks like a payment ID (e.g., TSTC00001785)
        if (/^TSTC\d+$/.test(searchValue)) {
          searchType = SearchType.PaymentID;
        } 
        // If search term looks like a member ID (numeric)
        else if (/^\d+$/.test(searchValue)) {
          searchType = SearchType.MemberID;
        }
        // If search term looks like a payee ID (e.g., TSTC0000000512)
        else if (/^TSTC\d+$/.test(searchValue)) {
          searchType = SearchType.PayeeID;
        }
        // If search term looks like a userPayeeListID
        else if (/^TSTC\d+$/.test(searchValue)) {
          searchType = SearchType.UserPayeeListId;
        }
        // If search term might be a payee name
        else {
          searchType = SearchType.PayeeName;
          payeeName = searchValue;
          searchValue = '';
        }
      }
      
      // Handle combined search types
      if (filters.startDate && filters.endDate) {
        if (searchType === SearchType.MemberID) {
          searchType = SearchType.MemberIDAndDate;
        } else if (searchType === SearchType.PayeeName || payeeName) {
          searchType = SearchType.Date;
          payeeName = payeeName || searchValue;
          searchValue = '';
        } else if (!searchValue) {
          // If we only have dates, use Date search type
          searchType = SearchType.Date;
        }
      } else if (searchType === SearchType.MemberID && payeeName) {
        searchType = SearchType.MemberIDAndPayeeName;
      }

      // Construct the search request with proper parameter casing
      const searchRequest: PaymentActivityRequest = {
        startDate: filters.startDate?.format('YYYY-MM-DD') || '',
        endDate: filters.endDate?.format('YYYY-MM-DD') || '',
        searchType: searchType,
        searchValue: searchValue,
        payeeName: payeeName
      };

      const response: PaymentActivityListResponse = await paymentService.getPendingPayments(searchRequest);
      
      // Handle both response formats - either paymentActivities or payments
      const paymentData = response.paymentActivities || (response as any).payments || [];
      
      // Map the response data to the expected format with proper ID casing
      const payments: PaymentActivity[] = paymentData.map((p: any) => ({
        ...p,
        // Map API response fields to expected fields with proper ID casing
        paymentID: p.paymentID || p.paymentId,
        memberID: p.memberID || p.memberId,
        payeeID: p.payeeID || p.payeeId,
        userPayeeListID: p.userPayeeListID || p.userPayeeListId,
        recurringPaymentID: p.recurringPaymentID || p.recurringPaymentId,
        payeeName: p.payeeName,
        amount: p.amount,
        dueDate: p.dueDate || p.willProcessDate,
        // Set a proper status name based on the payment data
        statusName: p.status || (p.willProcessDate && new Date(p.willProcessDate) > new Date() ? 
                  PaymentStatus.PENDING : PaymentStatus.PROCESSING),
        recipient: {
          name: p.payeeName || '',
          accountNumber: p.payeeID || p.payeeId || '',
          routingNumber: p.userPayeeListID || p.userPayeeListId || '',
          bankName: ''
        }
      }));
      
      // Apply client-side filtering for status and method if needed
      let filteredPayments = payments;
      
      if (filters.status && filters.status.length > 0) {
        filteredPayments = filteredPayments.filter(p => 
          filters.status.includes(p.statusName as PaymentStatus)
        );
      }
      
      if (filters.method && filters.method.length > 0) {
        filteredPayments = filteredPayments.filter(p => 
          filters.method.includes(p.paymentMethod as PaymentMethod)
        );
      }
      
      setPendingPayments(filteredPayments);
      setPagination(prev => ({ ...prev, total: filteredPayments.length }));
    } catch (err) {
      handleError(err);
      setPendingPayments([]);
      setPagination(prev => ({ ...prev, total: 0 }));
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.startDate, 
    filters.endDate, 
    filters.status, 
    filters.method, 
    filters.searchTerm, 
    filters.searchType, 
    paymentService
  ]);

  useEffect(() => {
    // Only fetch payments when the component mounts or when specific dependencies change
    fetchPendingPayments();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.startDate, 
    filters.endDate, 
    filters.status, 
    filters.method, 
    filters.searchTerm, 
    filters.searchType
  ]);

  // Apply client-side filtering whenever payments or searchTerm changes
  useEffect(() => {
    if (!filters.searchTerm) {
      return;
    }

    const searchTermLower = filters.searchTerm.toLowerCase();
    const filtered = pendingPayments.filter(payment => {
      return (
        payment.paymentID.toLowerCase().includes(searchTermLower) ||
        payment.payeeID.toLowerCase().includes(searchTermLower) ||
        payment.amount.toString().includes(searchTermLower) ||
        payment.statusName.toLowerCase().includes(searchTermLower)
      );
    });

    setPagination(prev => ({ ...prev, total: filtered.length }));
  }, [pendingPayments, filters.searchTerm]);

  // Helper function to get status color
  const getStatusColor = (status: PaymentStatus): 'warning' | 'success' | 'error' | 'info' => {
    switch (status) {
      case PaymentStatus.PENDING:
      case PaymentStatus.PENDING_APPROVAL:
        return 'warning';
      case PaymentStatus.COMPLETED:
        return 'success';
      case PaymentStatus.FAILED:
      case PaymentStatus.REJECTED:
      case PaymentStatus.CANCELLED:
      case PaymentStatus.EXPIRED:
        return 'error';
      case PaymentStatus.PROCESSING:
      case PaymentStatus.ON_HOLD:
        return 'info';
      default:
        return 'info';
    }
  };

  const handleApprove = useCallback(async (payment: PaymentActivity) => {
    try {
      setProcessing((prev) => ({ ...prev, [payment.paymentID]: true }));
      await paymentService.approvePayment(payment.paymentID);
      await fetchPendingPayments();
    } catch (err) {
      handleError(err);
    } finally {
      setProcessing((prev) => ({ ...prev, [payment.paymentID]: false }));
    }
  }, [fetchPendingPayments]);

  const handleRejectPayment = useCallback(async (paymentId: string) => {
    try {
      setProcessing((prev) => ({ ...prev, [paymentId]: true }));
      await paymentService.rejectPayment(paymentId, rejectReason);
      await fetchPendingPayments();
      setDialogState({ open: false, payment: null, action: null });
      setRejectReason('');
    } catch (err) {
      handleError(err);
    } finally {
      setProcessing((prev) => ({ ...prev, [paymentId]: false }));
    }
  }, [user?.id, fetchPendingPayments, rejectReason]);

  const handleViewHistory = async (payment: PaymentActivity) => {
    try {
      setLoading(true);
      
      // Create a request with the required parameters as specified in the cURL example
      const searchParams = {
        StartDate: "2021-01-01", // Using a wide date range to ensure results
        EndDate: new Date().toISOString().split('T')[0], // Current date
        SearchType: 2, // 2 is for PaymentId as per the instructions
        SearchValue: payment.paymentID
      };
      
      // Pass the search parameters to the service
      const response = await paymentService.getPaymentHistory(payment.paymentID, searchParams);
      
      // Handle the API response format
      const historyData = Array.isArray(response) ? response : [];
      
      // Always show the dialog, even if there's no history
      setDialogState({
        open: true,
        payment,
        action: 'history',
        history: historyData.length === 0 ? 
          [{ 
            action: 'No Payment History', 
            performedBy: '', 
            timestamp: '', 
            details: { 
              notes: 'No history is available for this payment.' 
            } 
          }] : 
          historyData.map((h: any) => ({
            action: h.action || h.paymentMethod || 'Unknown',
            performedBy: h.performedBy || h.memberID || h.memberId || '',
            timestamp: h.timestamp || h.entryDate || h.lastUpdate || '',
            details: {
              amount: h.amount || 0,
              method: h.method || h.paymentMethod || '',
              status: h.status || h.statusCode || 0,
              notes: h.notes || h.memo || ''
            }
          }))
      });
    } catch (error) {
      console.error('Error fetching payment history:', error);
      setError('Failed to fetch payment history');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkApprove = async () => {
    if (!user?.id) {
      setError('User not authenticated');
      return;
    }
    try {
      setProcessing(prev => ({ ...prev, bulk: true }));
      await Promise.all(selectedPayments.map(id => paymentService.approvePayment(id)));
      await fetchPendingPayments();
      setSelectedPayments([]);
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
      await Promise.all(selectedPayments.map(id => 
        paymentService.rejectPayment(id, rejectReason || 'Bulk rejected by admin')
      ));
      await fetchPendingPayments();
      setSelectedPayments([]);
    } catch (err) {
      handleError(err, 'Failed to reject payments');
    } finally {
      setProcessing(prev => ({ ...prev, bulk: false }));
    }
  };

  // Handlers
  const handlePageChange = (event: unknown, newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    setFilters(prev => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = parseInt(event.target.value, 10);
    setPagination(prev => ({ ...prev, rowsPerPage: newLimit, page: 0 }));
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

  const handleStatusChange = (event: SelectChangeEvent<PaymentStatus[]>) => {
    setFilters(prev => ({
      ...prev,
      status: event.target.value as PaymentStatus[]
    }));
  };

  const handleMethodChange = (event: SelectChangeEvent<PaymentMethod[]>) => {
    setFilters(prev => ({
      ...prev,
      method: event.target.value as PaymentMethod[]
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    
    // Determine search type based on the search term pattern
    let searchType = SearchType.Date;
    
    if (searchTerm) {
      if (/^P\d+$/.test(searchTerm)) {
        searchType = SearchType.PaymentID;
      } else if (/^M\d+$/.test(searchTerm)) {
        searchType = SearchType.MemberID;
      } else if (/^PAY\d+$/.test(searchTerm)) {
        searchType = SearchType.PayeeID;
      } else if (!/^\d+$/.test(searchTerm)) {
        searchType = SearchType.PayeeName;
      }
    }
    
    setFilters(prev => ({ 
      ...prev, 
      searchTerm, 
      searchType 
    }));
  };

  const handleDeleteFilterValue = (
    event: React.MouseEvent<HTMLElement>,
    field: keyof Pick<FilterState, 'status' | 'method'>,
    valueToDelete: PaymentStatus | PaymentMethod
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setFilters(prev => {
      const currentValue = prev[field] || [];
      return {
        ...prev,
        [field]: (currentValue as string[]).filter((value: string) => value !== valueToDelete)
      };
    });
    setOpenDropdowns(prev => ({ ...prev, [field]: false }));
  };

  const renderFilters = () => (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={handleDateChange('startDate')}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small'
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="End Date"
                value={filters.endDate}
                onChange={handleDateChange('endDate')}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small'
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                multiple
                value={filters.status || []}
                onChange={handleStatusChange}
                open={openDropdowns.status}
                onOpen={() => setOpenDropdowns(prev => ({ ...prev, status: true }))}
                onClose={() => setOpenDropdowns(prev => ({ ...prev, status: false }))}
                input={<OutlinedInput label="Status" />}
                renderValue={(selected) => (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 0.5,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onDelete={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          handleDeleteFilterValue(event, 'status', value as PaymentStatus);
                        }}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                        }}
                        size="small"
                        sx={{
                          position: 'relative',
                          zIndex: 1,
                          '& .MuiChip-deleteIcon': {
                            position: 'relative',
                            zIndex: 1
                          }
                        }}
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
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Method</InputLabel>
              <Select
                multiple
                value={filters.method || []}
                onChange={handleMethodChange}
                open={openDropdowns.method}
                onOpen={() => setOpenDropdowns(prev => ({ ...prev, method: true }))}
                onClose={() => setOpenDropdowns(prev => ({ ...prev, method: false }))}
                input={<OutlinedInput label="Method" />}
                renderValue={(selected) => (
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 0.5,
                      position: 'relative',
                      zIndex: 1
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        onDelete={(event) => {
                          event.stopPropagation();
                          handleDeleteFilterValue(event, 'method', value as PaymentMethod);
                        }}
                        size="small"
                        sx={{
                          position: 'relative',
                          zIndex: 2,
                          '& .MuiChip-deleteIcon': {
                            zIndex: 3
                          }
                        }}
                      />
                    ))}
                  </Box>
                )}
              >
                {Object.values(PaymentMethod).map((method) => (
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
    if (!pendingPayments) {
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
                  checked={selectedPayments.length === pendingPayments.length}
                  indeterminate={
                    selectedPayments.length > 0 &&
                    selectedPayments.length < pendingPayments.length
                  }
                  onChange={(event) =>
                    setSelectedPayments(
                      event.target.checked ? pendingPayments.map((p) => p.paymentID) : []
                    )
                  }
                  aria-label="Select all payments"
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Payee ID</TableCell>
              <TableCell>Member ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Process Date</TableCell>
              <TableCell>Will Process Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : !Array.isArray(pendingPayments) || pendingPayments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No payments found
                </TableCell>
              </TableRow>
            ) : (
              pendingPayments.map((payment) => (
                <TableRow key={payment.paymentID}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedPayments.includes(payment.paymentID)}
                      onChange={(event) =>
                        setSelectedPayments(
                          event.target.checked
                            ? [...selectedPayments, payment.paymentID]
                            : selectedPayments.filter((id) => id !== payment.paymentID)
                        )
                      }
                      aria-label="Select payment"
                    />
                  </TableCell>
                  <TableCell>{payment.paymentID}</TableCell>
                  <TableCell>{payment.payeeID}</TableCell>
                  <TableCell>{payment.memberID}</TableCell>
                  <TableCell>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(payment.amount)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={payment.statusName}
                      size="small"
                      color={getStatusColor(payment.statusName as PaymentStatus)}
                    />
                  </TableCell>
                  <TableCell>
                    {payment.dateProcessed ? dayjs(payment.dateProcessed).format('MM/DD/YYYY') : '-'}
                  </TableCell>
                  <TableCell>
                    {dayjs(payment.dueDate).format('MM/DD/YYYY')}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="View Details">
                        <IconButton
                          size="small"
                          onClick={() =>
                            setDialogState({
                              open: true,
                              payment: payment,
                              action: 'view',
                            })
                          }
                          aria-label="View Details"
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      {payment.statusName === PaymentStatus.PENDING && (
                        <>
                          <Tooltip title="Approve">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => handleApprove(payment)}
                              disabled={processing[payment.paymentID]}
                              aria-label="Approve"
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Reject">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => {
                                setDialogState({
                                  open: true,
                                  payment: null,
                                  action: 'reject'
                                });
                              }}
                              disabled={processing[payment.paymentID]}
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
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    );
  };

  const renderDialog = () => {
    if (dialogState.action === 'view' && dialogState.payment) {
      // Transform PaymentActivity to Payment
      const payment: Payment = {
        paymentID: dialogState.payment.paymentID,
        willProcessDate: dialogState.payment.dueDate || '',
        memo: '',  // PaymentActivity doesn't have this field
        billReference: '',  // PaymentActivity doesn't have this field
        fundingAccount: '',  // PaymentActivity doesn't have this field
        userPayeeListID: dialogState.payment.payeeID,
        memberID: dialogState.payment.memberID,
        amount: dialogState.payment.amount,
        sourceApplication: '',  // PaymentActivity doesn't have this field
        deliveryDate: dialogState.payment.dateProcessed,
        status: dialogState.payment.statusName,
        paymentMethod: dialogState.payment.paymentMethod
      };

      return (
        <PaymentDetails
          open={dialogState.open}
          onClose={() => setDialogState({ open: false, payment: null, action: null })}
          payment={payment}
        />
      );
    }

    if (dialogState.action === 'history' && dialogState.payment && dialogState.history) {
      return (
        <Dialog
          open={dialogState.open}
          onClose={() => setDialogState({ open: false, payment: null, action: null })}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Payment History</DialogTitle>
          <DialogContent>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                Payment Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.primary">
                    Payment ID
                  </Typography>
                  <Typography variant="body1">
                    {dialogState.payment.paymentID}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.primary">
                    Amount
                  </Typography>
                  <Typography variant="body1">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    }).format(dialogState.payment.amount)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.primary">
                    Status
                  </Typography>
                  <Typography variant="body1">
                    {dialogState.payment.statusName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.primary">
                    Will Process Date
                  </Typography>
                  <Typography variant="body1">
                    {dayjs(dialogState.payment.dueDate).format('MM/DD/YYYY')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: 1, borderColor: 'divider' }}>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Payment History
                    </Typography>
                    {dialogState.history.map((entry, index) => (
                      <Box key={index} sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.primary">
                          {entry.action}{entry.performedBy ? ` by ${entry.performedBy}` : ''}{entry.timestamp ? ` at ${dayjs(entry.timestamp).format('MM/DD/YYYY HH:mm:ss')}` : ''}
                        </Typography>
                        {entry.details && (
                          <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                            {Object.entries(entry.details).map(([key, value]) => (
                              <span key={key}>
                                {key}: {value.toString()}
                                <br />
                              </span>
                            ))}
                          </Typography>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogState({ open: false, payment: null, action: null })}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return null;
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
            onClick={() => dialogState.payment && handleRejectPayment(dialogState.payment.paymentID)}
            disabled={!rejectReason || (dialogState.payment && processing[dialogState.payment.paymentID])}
            color="error"
            variant="contained"
          >
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderSummary = () => {
    const stats = pendingPayments.reduce((acc, payment) => {
      return {
        totalAmount: (acc.totalAmount || 0) + payment.amount,
        totalCount: (acc.totalCount || 0) + 1,
        statusCounts: {
          ...acc.statusCounts,
          [payment.statusName]: ((acc.statusCounts || {})[payment.statusName] || 0) + 1
        }
      };
    }, { totalAmount: 0, totalCount: 0, statusCounts: {} as Record<string, number> });

    return (
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography variant="h6" color="text.primary" gutterBottom>
          Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" color="text.primary">
              Total Payments: {stats.totalCount}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" color="text.primary">
              Total Amount: {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(stats.totalAmount)}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" color="text.primary">
              Status Distribution:{' '}
              {Object.entries(stats.statusCounts).map(([status, count]) => (
                <span key={status}>
                  {status}: {count}
                  {' | '}
                </span>
              ))}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const handleExport = () => {
    if (!pendingPayments?.length) {
      return;
    }

    const headers = [
      'Payment ID',
      'Payee ID',
      'Member ID',
      'Amount',
      'Status',
      'Process Date',
      'Will Process Date'
    ];

    const csvData = pendingPayments.map(payment => [
      payment.paymentID,
      payment.payeeID,
      payment.memberID,
      payment.amount.toString(),
      payment.statusName,
      payment.dateProcessed ? dayjs(payment.dateProcessed).format('MM/DD/YYYY') : '',
      dayjs(payment.dueDate).format('MM/DD/YYYY')
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `pending-payments-${dayjs().format('YYYY-MM-DD')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box>
      {renderFilters()}
      {renderSummary()}
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          {selectedPayments.length > 0 && (
            <ButtonGroup variant="contained" size="small">
              <Button
                color="success"
                onClick={handleBulkApprove}
                disabled={processing.bulk}
                startIcon={<CheckCircleIcon />}
              >
                Approve Selected
              </Button>
              <Button
                color="error"
                onClick={handleBulkReject}
                disabled={processing.bulk}
                startIcon={<CancelIcon />}
              >
                Reject Selected
              </Button>
            </ButtonGroup>
          )}
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={handleExport}
          disabled={!pendingPayments?.length}
          startIcon={<FileDownloadIcon />}
        >
          Export
        </Button>
      </Box>
      {renderTable()}
      {renderDialog()}
      {renderRejectDialog()}
    </Box>
  );
};

export default ManagePayments;