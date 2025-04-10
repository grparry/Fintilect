import React, { useState, useEffect } from 'react';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import { 
  PaymentSearchType, 
  PAYMENT_SEARCH_TYPES, 
  PaymentSortColumn, 
  PaymentParams, 
  PaymentItem, 
  PaymentItemPagedResponse, 
  getPaymentReport 
} from '../../../../utils/reports/payment';

/**
 * Payment Report Component
 * Displays a form to search for payment data and shows results in a table
 */
const PaymentReport: React.FC = () => {
  // State for form inputs
  const [searchType, setSearchType] = useState<PaymentSearchType>(PaymentSearchType.Member);
  const [memberID, setMemberID] = useState<string>('');
  const [paymentID, setPaymentID] = useState<string>('');
  const [recurringPaymentID, setRecurringPaymentID] = useState<string>('');
  const [userPayeeListID, setUserPayeeListID] = useState<string>('');
  const [payeeID, setPayeeID] = useState<string>('');
  const [days, setDays] = useState<number>(30);
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs());
  const [sortColumn, setSortColumn] = useState<PaymentSortColumn>(PaymentSortColumn.DateProcessed);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // State for API response
  const [data, setData] = useState<PaymentItemPagedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form validation
  const [formErrors, setFormErrors] = useState({
    memberID: '',
    paymentID: '',
    recurringPaymentID: '',
    userPayeeListID: '',
    payeeID: '',
    days: ''
  });
  
  // Run report with current parameters
  const runReport = async (page: number = pageNumber) => {
    // Validate form inputs based on search type
    const errors = {
      memberID: searchType === PaymentSearchType.Member && !memberID ? 'Member ID is required' : '',
      paymentID: searchType === PaymentSearchType.Payment && !paymentID ? 'Payment ID is required' : '',
      recurringPaymentID: searchType === PaymentSearchType.RecurringPayment && !recurringPaymentID ? 'Recurring Payment ID is required' : '',
      userPayeeListID: searchType === PaymentSearchType.UserPayeeList && !userPayeeListID ? 'User Payee List ID is required' : '',
      payeeID: searchType === PaymentSearchType.Payee && !payeeID ? 'Payee ID is required' : '',
      days: days < 1 || days > 3650 ? 'Days must be between 1 and 3650' : ''
    };
    
    setFormErrors(errors);
    
    // If there are validation errors, don't run the report
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Prepare request parameters
      const params: PaymentParams = {
        searchType,
        days,
        sortColumn,
        sortDirection,
        pageNumber: page,
        pageSize
      };
      
      // Add conditional parameters based on search type
      if (searchType === PaymentSearchType.Member) {
        params.memberID = memberID;
      } else if (searchType === PaymentSearchType.Payment) {
        params.paymentID = paymentID;
      } else if (searchType === PaymentSearchType.RecurringPayment) {
        params.recurringPaymentID = recurringPaymentID;
      } else if (searchType === PaymentSearchType.UserPayeeList) {
        params.userPayeeListID = userPayeeListID;
      } else if (searchType === PaymentSearchType.Payee) {
        params.payeeID = payeeID;
      }
      
      // Call API
      const response = await getPaymentReport(params);
      setData(response);
      setPageNumber(page);
    } catch (err) {
      setError('Failed to load payment data. Please try again.');
      console.error('Error fetching payment data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    runReport(1); // Reset to first page on new search
  };
  
  // Handle sort change for ReportTableV2
  const handleSortChange = (newSortColumn: PaymentSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    console.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Validate required parameters based on search type
    let hasRequiredParams = false;
    
    switch (searchType) {
      case PaymentSearchType.Member:
        hasRequiredParams = !!memberID;
        if (!hasRequiredParams) {
          setError('Member ID is required');
          setLoading(false);
          return;
        }
        break;
      case PaymentSearchType.Payment:
        hasRequiredParams = !!paymentID;
        if (!hasRequiredParams) {
          setError('Payment ID is required');
          setLoading(false);
          return;
        }
        break;
      case PaymentSearchType.RecurringPayment:
        hasRequiredParams = !!recurringPaymentID;
        if (!hasRequiredParams) {
          setError('Recurring Payment ID is required');
          setLoading(false);
          return;
        }
        break;
      case PaymentSearchType.UserPayeeList:
        hasRequiredParams = !!userPayeeListID;
        if (!hasRequiredParams) {
          setError('User Payee List ID is required');
          setLoading(false);
          return;
        }
        break;
      case PaymentSearchType.Payee:
        hasRequiredParams = !!payeeID;
        if (!hasRequiredParams) {
          setError('Payee ID is required');
          setLoading(false);
          return;
        }
        break;

      default:
        setError('Invalid search type');
        setLoading(false);
        return;
    }
    
    // Create params with the new sort values
    const params: PaymentParams = {
      searchType,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    // Add parameters based on search type
    switch (searchType) {
      case PaymentSearchType.Member:
        params.memberID = memberID;
        break;
      case PaymentSearchType.Payment:
        params.paymentID = paymentID;
        break;
      case PaymentSearchType.RecurringPayment:
        params.recurringPaymentID = recurringPaymentID;
        break;
      case PaymentSearchType.UserPayeeList:
        params.userPayeeListID = userPayeeListID;
        break;
      case PaymentSearchType.Payee:
        params.payeeID = payeeID;
        break;

    }
    
    console.log('Making API call with params:', params);
    
    // Reset to page 1
    setPageNumber(1);
    
    // Call API directly with new sort parameters
    getPaymentReport(params)
      .then((response: PaymentItemPagedResponse) => {
        console.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setData(response);
      })
      .catch((error: any) => {
        console.error('Error sorting report:', error);
        setError('Failed to sort report. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  // Handle page change for ReportTableV2
  const handlePageChange = (page: number, newPageSize: number) => {
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
    runReport(page);
  };
  
  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent<PaymentSearchType>) => {
    setSearchType(event.target.value as PaymentSearchType);
    // Reset form errors when changing search type
    setFormErrors({
      memberID: '',
      paymentID: '',
      recurringPaymentID: '',
      userPayeeListID: '',
      payeeID: '',
      days: ''
    });
  };
  
  // Function to get paged data for CSV export
  const getPagedData = async (request: { page: number; pageSize: number; sortColumn: PaymentSortColumn; sortDirection: 'ASC' | 'DESC' }) => {
    try {
      // Prepare request parameters
      const params: PaymentParams = {
        searchType,
        days,
        sortColumn: request.sortColumn,
        sortDirection: request.sortDirection,
        pageNumber: request.page,
        pageSize: request.pageSize
      };
      
      // Add conditional parameters based on search type
      if (searchType === PaymentSearchType.Member) {
        params.memberID = memberID;
      } else if (searchType === PaymentSearchType.Payment) {
        params.paymentID = paymentID;
      } else if (searchType === PaymentSearchType.RecurringPayment) {
        params.recurringPaymentID = recurringPaymentID;
      } else if (searchType === PaymentSearchType.UserPayeeList) {
        params.userPayeeListID = userPayeeListID;
      } else if (searchType === PaymentSearchType.Payee) {
        params.payeeID = payeeID;
      }
      
      // Call API
      const response = await getPaymentReport(params);
      return {
        items: response.items || [],
        pageNumber: response.pageNumber,
        totalCount: response.totalCount
      };
    } catch (error) {
      console.error('Error fetching payment data for export:', error);
      throw error;
    }
  };
  
  // Run report when sort parameters change
  useEffect(() => {
    if (data && data.items && data.items.length > 0) {
      runReport(pageNumber);
    }
  }, [sortColumn, sortDirection]);
  
  // Define table columns for ReportTableV2
  const columns = [
    {
      key: 'paymentID',
      label: 'Payment ID',
      sortable: true,
      sortKey: PaymentSortColumn.PaymentID,
      render: (value: any, item: PaymentItem) => (item && item.paymentID) || ''
    },
    {
      key: 'memberID',
      label: 'Member ID',
      sortable: true,
      sortKey: PaymentSortColumn.MemberID,
      render: (value: any, item: PaymentItem) => (item && item.memberID) || ''
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      sortKey: PaymentSortColumn.Amount,
      render: (value: any, item: PaymentItem) => (item && item.amount !== undefined) ? `$${item.amount.toFixed(2)}` : ''
    },
    {
      key: 'dateProcessed',
      label: 'Date Processed',
      sortable: true,
      sortKey: PaymentSortColumn.DateProcessed,
      render: (value: any, item: PaymentItem) => {
        if (!item || !item.dateProcessed) return '';
        return dayjs(item.dateProcessed).format('MM/DD/YYYY hh:mm A');
      }
    },
    {
      key: 'payeeName',
      label: 'Payee Name',
      sortable: true,
      sortKey: PaymentSortColumn.PayeeName,
      render: (value: any, item: PaymentItem) => (item && item.payeeName) || ''
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      sortKey: PaymentSortColumn.Status,
      render: (value: any, item: PaymentItem) => (item && item.status) || ''
    }
  ];
  
  return (
    <ReportContainer
      title="Payment Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!(data && data.items && data.items.length > 0)}
    >
      <Paper sx={{ p: 2, mb: 2 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="search-type-label">Search By</InputLabel>
                <Select
                  labelId="search-type-label"
                  id="search-type"
                  value={searchType}
                  label="Search By"
                  onChange={handleSearchTypeChange}
                >
                  {Object.entries(PAYMENT_SEARCH_TYPES).map(([value, label]) => (
                    <MenuItem key={value} value={value as PaymentSearchType}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {searchType === PaymentSearchType.Member && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  id="member-id"
                  label="Member ID"
                  value={memberID}
                  onChange={(e) => setMemberID(e.target.value)}
                  error={!!formErrors.memberID}
                  helperText={formErrors.memberID}
                />
              </Grid>
            )}
            
            {searchType === PaymentSearchType.Payment && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  id="payment-id"
                  label="Payment ID"
                  value={paymentID}
                  onChange={(e) => setPaymentID(e.target.value)}
                  error={!!formErrors.paymentID}
                  helperText={formErrors.paymentID}
                />
              </Grid>
            )}
            
            {searchType === PaymentSearchType.RecurringPayment && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  id="recurring-payment-id"
                  label="Recurring Payment ID"
                  value={recurringPaymentID}
                  onChange={(e) => setRecurringPaymentID(e.target.value)}
                  error={!!formErrors.recurringPaymentID}
                  helperText={formErrors.recurringPaymentID}
                />
              </Grid>
            )}
            
            {searchType === PaymentSearchType.UserPayeeList && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  id="user-payee-list-id"
                  label="User Payee List ID"
                  value={userPayeeListID}
                  onChange={(e) => setUserPayeeListID(e.target.value)}
                  error={!!formErrors.userPayeeListID}
                  helperText={formErrors.userPayeeListID}
                />
              </Grid>
            )}
            
            {searchType === PaymentSearchType.Payee && (
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  id="payee-id"
                  label="Payee ID"
                  value={payeeID}
                  onChange={(e) => setPayeeID(e.target.value)}
                  error={!!formErrors.payeeID}
                  helperText={formErrors.payeeID}
                />
              </Grid>
            )}
            
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                id="days"
                label="Days"
                type="number"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value) || 0)}
                error={!!formErrors.days}
                helperText={formErrors.days || 'Number of days to look back'}
                InputProps={{ inputProps: { min: 1, max: 3650 } }}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      {data && data.items && data.items.length > 0 ? (
        <ReportTableV2
          columns={columns}
          data={data.items}
          pagination={{
            pageNumber: data.pageNumber,
            totalCount: data.totalCount,
            onPageChange: handlePageChange
          }}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          enableExport={{
            getPagedData,
            maxPageSize: 100
          }}
          exportFileName={`payment-report-${dayjs().format('YYYY-MM-DD')}`}
        />
      ) : data && data.items && data.items.length === 0 ? (
        <Typography variant="body1">No payment data found for the selected criteria.</Typography>
      ) : null}
    </ReportContainer>
  );
};

export default PaymentReport;
