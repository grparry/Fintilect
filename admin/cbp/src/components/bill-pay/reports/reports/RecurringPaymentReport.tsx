import React, { useState, useEffect } from 'react';
import logger from '../../../../utils/logger';
import { Box, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import { 
  RecurringPaymentSearchType, 
  RECURRING_PAYMENT_SEARCH_TYPES, 
  RecurringPaymentSortColumn, 
  RecurringPaymentParams, 
  RecurringPaymentItem, 
  RecurringPaymentItemPagedResponse, 
  getRecurringPaymentReport 
} from '../../../../utils/reports/recurringPayment';

/**
 * Recurring Payment Report Component
 * Displays a form to search for recurring payment data and shows results in a table
 */
const RecurringPaymentReport: React.FC = () => {
  // State for form inputs
  const [searchType, setSearchType] = useState<RecurringPaymentSearchType>(RecurringPaymentSearchType.Member);
  const [memberID, setMemberID] = useState<string>('');
  const [paymentID, setPaymentID] = useState<string>('');
  const [recurringPaymentID, setRecurringPaymentID] = useState<string>('');
  const [userPayeeListID, setUserPayeeListID] = useState<string>('');
  const [payeeID, setPayeeID] = useState<string>('');
  const [days, setDays] = useState<number>(30);
  const [startDate, setStartDate] = useState<dayjs.Dayjs>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(dayjs());
  const [sortColumn, setSortColumn] = useState<RecurringPaymentSortColumn>(RecurringPaymentSortColumn.NextPaymentDate);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // State for API response
  const [data, setData] = useState<RecurringPaymentItemPagedResponse | null>(null);
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
      memberID: searchType === RecurringPaymentSearchType.Member && !memberID ? 'Member ID is required' : '',
      paymentID: searchType === RecurringPaymentSearchType.Payment && !paymentID ? 'Payment ID is required' : '',
      recurringPaymentID: searchType === RecurringPaymentSearchType.RecurringPayment && !recurringPaymentID ? 'Recurring Payment ID is required' : '',
      userPayeeListID: searchType === RecurringPaymentSearchType.UserPayeeList && !userPayeeListID ? 'User Payee List ID is required' : '',
      payeeID: searchType === RecurringPaymentSearchType.Payee && !payeeID ? 'Payee ID is required' : '',
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
      const params: RecurringPaymentParams = {
        searchType,
        days,
        sortColumn,
        sortDirection,
        pageNumber: page,
        pageSize
      };
      
      // Add conditional parameters based on search type
      if (searchType === RecurringPaymentSearchType.Member) {
        params.memberID = memberID;
      } else if (searchType === RecurringPaymentSearchType.Payment) {
        params.paymentID = paymentID;
      } else if (searchType === RecurringPaymentSearchType.RecurringPayment) {
        params.recurringPaymentID = recurringPaymentID;
      } else if (searchType === RecurringPaymentSearchType.UserPayeeList) {
        params.userPayeeListID = userPayeeListID;
      } else if (searchType === RecurringPaymentSearchType.Payee) {
        params.payeeID = payeeID;
      }
      
      // Call API
      const response = await getRecurringPaymentReport(params);
      setData(response);
      setPageNumber(page);
    } catch (err) {
      setError('Failed to load recurring payment data. Please try again.');
      logger.error('Error fetching recurring payment data:', err);
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
  const handleSortChange = (newSortColumn: RecurringPaymentSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    logger.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Validate required parameters based on search type
    let hasRequiredParams = false;
    
    switch (searchType) {
      case RecurringPaymentSearchType.Member:
        hasRequiredParams = !!memberID;
        if (!hasRequiredParams) {
          setError('Member ID is required');
          setLoading(false);
          return;
        }
        break;
      case RecurringPaymentSearchType.RecurringPayment:
        hasRequiredParams = !!recurringPaymentID;
        if (!hasRequiredParams) {
          setError('Recurring Payment ID is required');
          setLoading(false);
          return;
        }
        break;
      case RecurringPaymentSearchType.UserPayeeList:
        hasRequiredParams = !!userPayeeListID;
        if (!hasRequiredParams) {
          setError('User Payee List ID is required');
          setLoading(false);
          return;
        }
        break;
      case RecurringPaymentSearchType.Payee:
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
    const params: RecurringPaymentParams = {
      searchType,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection, // Use the new sort direction directly
      days: days // Required parameter
    };
    
    // Add parameters based on search type
    switch (searchType) {
      case RecurringPaymentSearchType.Member:
        params.memberID = memberID;
        break;
      case RecurringPaymentSearchType.RecurringPayment:
        params.recurringPaymentID = recurringPaymentID;
        break;
      case RecurringPaymentSearchType.UserPayeeList:
        params.userPayeeListID = userPayeeListID;
        break;
      case RecurringPaymentSearchType.Payee:
        params.payeeID = payeeID;
        break;

    }
    
    logger.log('Making API call with params:', params);
    
    // Reset to page 1
    setPageNumber(1);
    
    // Call API directly with new sort parameters
    getRecurringPaymentReport(params)
      .then((response: RecurringPaymentItemPagedResponse) => {
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
  const handlePageChange = (page: number, newPageSize: number) => {
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
    runReport(page);
  };
  
  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent<RecurringPaymentSearchType>) => {
    setSearchType(event.target.value as RecurringPaymentSearchType);
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
  const getPagedData = async (request: { page: number; pageSize: number; sortColumn: RecurringPaymentSortColumn; sortDirection: 'ASC' | 'DESC' }) => {
    try {
      // Prepare request parameters
      const params: RecurringPaymentParams = {
        searchType,
        days,
        sortColumn: request.sortColumn,
        sortDirection: request.sortDirection,
        pageNumber: request.page,
        pageSize: request.pageSize
      };
      
      // Add conditional parameters based on search type
      if (searchType === RecurringPaymentSearchType.Member) {
        params.memberID = memberID;
      } else if (searchType === RecurringPaymentSearchType.Payment) {
        params.paymentID = paymentID;
      } else if (searchType === RecurringPaymentSearchType.RecurringPayment) {
        params.recurringPaymentID = recurringPaymentID;
      } else if (searchType === RecurringPaymentSearchType.UserPayeeList) {
        params.userPayeeListID = userPayeeListID;
      } else if (searchType === RecurringPaymentSearchType.Payee) {
        params.payeeID = payeeID;
      }
      
      // Call API
      const response = await getRecurringPaymentReport(params);
      return {
        items: response.items || [],
        pageNumber: response.pageNumber,
        totalCount: response.totalCount
      };
    } catch (error) {
      logger.error('Error fetching recurring payment data for export:', error);
      throw error;
    }
  };
  
  // Run report when sort parameters change
  // No longer need the useEffect hook for sort parameters as we're making the API call directly in handleSortChange
  
  // Define table columns for ReportTableV2
  const columns = [
    {
      key: 'recurringPaymentID',
      label: 'Recurring Payment ID',
      sortable: true,
      sortKey: RecurringPaymentSortColumn.RecurringPaymentID,
      render: (value: any, item: RecurringPaymentItem) => (item && item.recurringPaymentID) || ''
    },
    {
      key: 'memberID',
      label: 'Member ID',
      sortable: false,
      render: (value: any, item: RecurringPaymentItem) => (item && item.memberID) || ''
    },
    {
      key: 'payeeName',
      label: 'Payee Name',
      sortable: false,
      render: (value: any, item: RecurringPaymentItem) => (item && item.payeeName) || ''
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      sortKey: RecurringPaymentSortColumn.Amount,
      render: (value: any, item: RecurringPaymentItem) => {
        if (item && typeof item.amount === 'number') {
          return `$${item.amount.toFixed(2)}`;
        }
        return '';
      }
    },
    {
      key: 'frequency',
      label: 'Frequency',
      sortable: true,
      sortKey: RecurringPaymentSortColumn.Frequency,
      render: (value: any, item: RecurringPaymentItem) => (item && item.frequency) || ''
    },
    {
      key: 'nextPaymentDate',
      label: 'Next Payment Date',
      sortable: true,
      sortKey: RecurringPaymentSortColumn.NextPaymentDate,
      render: (value: any, item: RecurringPaymentItem) => {
        if (item && item.nextPaymentDate) {
          return dayjs(item.nextPaymentDate).format('MM/DD/YYYY');
        }
        return '';
      }
    },
    {
      key: 'accountName',
      label: 'Account',
      sortable: false,
      render: (value: any, item: RecurringPaymentItem) => (item && item.accountName) || ''
    },
    {
      key: 'status',
      label: 'Status',
      sortable: false,
      render: (value: any, item: RecurringPaymentItem) => (item && item.status) || ''
    }
  ];
  
  return (
    <ReportContainer
      title="Recurring Payment Report"
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
                  {Object.entries(RECURRING_PAYMENT_SEARCH_TYPES).map(([value, label]) => (
                    <MenuItem key={value} value={value as RecurringPaymentSearchType}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {searchType === RecurringPaymentSearchType.Member && (
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
            
            {searchType === RecurringPaymentSearchType.Payment && (
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
            
            {searchType === RecurringPaymentSearchType.RecurringPayment && (
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
            
            {searchType === RecurringPaymentSearchType.UserPayeeList && (
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
            
            {searchType === RecurringPaymentSearchType.Payee && (
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
          exportFileName={`recurring-payment-report-${dayjs().format('YYYY-MM-DD')}`}
        />
      ) : data && data.items && data.items.length === 0 ? (
        <Typography variant="body1">No recurring payment data found for the selected criteria.</Typography>
      ) : null}
    </ReportContainer>
  );
};

export default RecurringPaymentReport;
