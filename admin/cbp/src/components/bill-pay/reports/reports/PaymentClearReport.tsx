import React, { useState, useEffect } from 'react';
import logger from '../../../../utils/logger';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import { 
  PaymentClearSearchType, 
  PAYMENT_CLEAR_SEARCH_TYPES, 
  PaymentClearSortColumn, 
  PaymentClearParams, 
  PaymentClearItem, 
  PaymentClearItemPagedResponse, 
  getPaymentClearReport 
} from '../../../../utils/reports/paymentClear';

/**
 * Payment Clear Report Component
 * Displays a form to search for payment clear data and shows results in a table
 */
const PaymentClearReport: React.FC = () => {
  // State for form inputs
  const [searchType, setSearchType] = useState<PaymentClearSearchType>(PaymentClearSearchType.Member);
  const [memberID, setMemberID] = useState<string>('');
  const [paymentID, setPaymentID] = useState<string>('');
  const [recurringPaymentID, setRecurringPaymentID] = useState<string>('');
  const [userPayeeListID, setUserPayeeListID] = useState<string>('');
  const [payeeID, setPayeeID] = useState<string>('');
  const [days, setDays] = useState<number>(30);
  const [sortColumn, setSortColumn] = useState<PaymentClearSortColumn>(PaymentClearSortColumn.ClearedDate);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // State for API response
  const [data, setData] = useState<PaymentClearItemPagedResponse | null>(null);
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
      memberID: searchType === PaymentClearSearchType.Member && !memberID ? 'Member ID is required' : '',
      paymentID: searchType === PaymentClearSearchType.Payment && !paymentID ? 'Payment ID is required' : '',
      recurringPaymentID: searchType === PaymentClearSearchType.RecurringPayment && !recurringPaymentID ? 'Recurring Payment ID is required' : '',
      userPayeeListID: searchType === PaymentClearSearchType.UserPayeeList && !userPayeeListID ? 'User Payee List ID is required' : '',
      payeeID: searchType === PaymentClearSearchType.Payee && !payeeID ? 'Payee ID is required' : '',
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
      const params: PaymentClearParams = {
        searchType,
        days,
        sortColumn,
        sortDirection,
        pageNumber: page,
        pageSize
      };
      
      // Add conditional parameters based on search type
      if (searchType === PaymentClearSearchType.Member) {
        params.memberID = memberID;
      } else if (searchType === PaymentClearSearchType.Payment) {
        params.paymentID = paymentID;
      } else if (searchType === PaymentClearSearchType.RecurringPayment) {
        params.recurringPaymentID = recurringPaymentID;
      } else if (searchType === PaymentClearSearchType.UserPayeeList) {
        params.userPayeeListID = userPayeeListID;
      } else if (searchType === PaymentClearSearchType.Payee) {
        params.payeeID = payeeID;
      }
      
      // Call API
      const response = await getPaymentClearReport(params);
      setData(response);
      setPageNumber(page);
    } catch (err) {
      setError('Failed to load payment clear data. Please try again.');
      logger.error('Error fetching payment clear data:', err);
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
  const handleSortChange = (newSortColumn: PaymentClearSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    logger.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Validate form inputs based on search type
    const errors = {
      memberID: searchType === PaymentClearSearchType.Member && !memberID ? 'Member ID is required' : '',
      paymentID: searchType === PaymentClearSearchType.Payment && !paymentID ? 'Payment ID is required' : '',
      recurringPaymentID: searchType === PaymentClearSearchType.RecurringPayment && !recurringPaymentID ? 'Recurring Payment ID is required' : '',
      userPayeeListID: searchType === PaymentClearSearchType.UserPayeeList && !userPayeeListID ? 'User Payee List ID is required' : '',
      payeeID: searchType === PaymentClearSearchType.Payee && !payeeID ? 'Payee ID is required' : '',
      days: days < 1 || days > 3650 ? 'Days must be between 1 and 3650' : ''
    };
    
    setFormErrors(errors);
    
    // If there are validation errors, don't run the report
    if (Object.values(errors).some(error => error)) {
      setLoading(false);
      return;
    }
    
    // Create params with the new sort values
    const params: PaymentClearParams = {
      searchType,
      days,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    // Add parameters based on search type
    switch (searchType) {
      case PaymentClearSearchType.Member:
        params.memberID = memberID;
        break;
      case PaymentClearSearchType.Payment:
        params.paymentID = paymentID;
        break;
      case PaymentClearSearchType.RecurringPayment:
        params.recurringPaymentID = recurringPaymentID;
        break;
      case PaymentClearSearchType.UserPayeeList:
        params.userPayeeListID = userPayeeListID;
        break;
      case PaymentClearSearchType.Payee:
        params.payeeID = payeeID;
        break;
    }
    
    logger.log('Making API call with params:', params);
    
    // Reset to page 1
    setPageNumber(1);
    
    // Call API directly with new sort parameters
    getPaymentClearReport(params)
      .then((response: PaymentClearItemPagedResponse) => {
        logger.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setData(response);
      })
      .catch((error: any) => {
        logger.error('Error sorting report:', error);
        setError('Failed to sort report. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  // Handle page change for ReportTableV2
  const handlePageChange = (page: number, newPageSize?: number) => {
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setPageNumber(1); // Reset to first page when changing page size
      runReport(1);
    } else {
      setPageNumber(page);
      runReport(page);
    }
  };
  
  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent<PaymentClearSearchType>) => {
    setSearchType(event.target.value as PaymentClearSearchType);
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
  

  
  // Run report when sort parameters change
  // No longer need the useEffect hook for sort parameters as we're making the API call directly in handleSortChange
  
  // Define table columns
  const columns = [
    {
      key: 'paymentID',
      label: 'Payment ID',
      sortable: true,
      sortKey: PaymentClearSortColumn.PaymentID,
      render: (value: string) => value || ''
    },
    {
      key: 'memberID',
      label: 'Member ID',
      sortable: true,
      sortKey: PaymentClearSortColumn.MemberID,
      render: (value: string) => value || ''
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      sortKey: PaymentClearSortColumn.Amount,
      render: (value: number) => value !== undefined ? `$${value.toFixed(2)}` : ''
    },
    {
      key: 'clearedDate',
      label: 'Cleared Date',
      sortable: true,
      sortKey: PaymentClearSortColumn.ClearedDate,
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : ''
    },
    {
      key: 'dateProcessed',
      label: 'Date Processed',
      sortable: false,
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : ''
    },
    {
      key: 'payeeName',
      label: 'Payee Name',
      sortable: true,
      sortKey: PaymentClearSortColumn.PayeeName,
      render: (value: string) => value || ''
    },
    {
      key: 'paymentMethod',
      label: 'Payment Method',
      sortable: false,
      render: (value: string) => value || ''
    },
    {
      key: 'checkNumber',
      label: 'Check Number',
      sortable: false,
      render: (value: string) => value || ''
    }
  ];
  
  return (
    <ReportContainer
      title="Payment Clear Report"
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
                  {Object.entries(PAYMENT_CLEAR_SEARCH_TYPES).map(([value, label]) => (
                    <MenuItem key={value} value={value as PaymentClearSearchType}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {searchType === PaymentClearSearchType.Member && (
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
            
            {searchType === PaymentClearSearchType.Payment && (
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
            
            {searchType === PaymentClearSearchType.RecurringPayment && (
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
            
            {searchType === PaymentClearSearchType.UserPayeeList && (
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
            
            {searchType === PaymentClearSearchType.Payee && (
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
            getPagedData: async (request) => {
              // Build parameters for the API call
              const params: PaymentClearParams = {
                searchType,
                days,
                pageNumber: request.page,
                pageSize: request.pageSize,
                sortColumn: request.sortColumn,
                sortDirection: request.sortDirection
              };
              
              // Add conditional parameters based on search type
              if (searchType === PaymentClearSearchType.Member) {
                params.memberID = memberID;
              } else if (searchType === PaymentClearSearchType.Payment) {
                params.paymentID = paymentID;
              } else if (searchType === PaymentClearSearchType.RecurringPayment) {
                params.recurringPaymentID = recurringPaymentID;
              } else if (searchType === PaymentClearSearchType.UserPayeeList) {
                params.userPayeeListID = userPayeeListID;
              } else if (searchType === PaymentClearSearchType.Payee) {
                params.payeeID = payeeID;
              }

              // Call the API
              const response = await getPaymentClearReport(params);
              
              return {
                items: response.items || [],
                pageNumber: response.pageNumber,
                totalCount: response.totalCount
              };
            },
            maxPageSize: 100
          }}
          exportFileName={`payment-clear-report-${dayjs().format('YYYY-MM-DD')}`}
        />
      ) : data && data.items && data.items.length === 0 ? (
        <Typography variant="body1">No payment clear data found for the selected criteria.</Typography>
      ) : null}
    </ReportContainer>
  );
};

export default PaymentClearReport;
