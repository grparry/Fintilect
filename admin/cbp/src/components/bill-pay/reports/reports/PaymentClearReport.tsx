import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
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
      console.error('Error fetching payment clear data:', err);
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
  
  // Handle sort change
  const handleSortChange = (columnKey: string) => {
    // Find the column definition to get the sortKey
    const columnDef = columns.find(col => col.key === columnKey);
    if (columnDef && columnDef.sortKey) {
      const newSortColumn = columnDef.sortKey;
      
      // If clicking the same column, toggle direction
      if (sortColumn === newSortColumn) {
        setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
      } else {
        setSortColumn(newSortColumn);
        setSortDirection('ASC');
      }
    }
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    runReport(page);
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
  
  // Handle export to CSV
  const handleExportCsv = () => {
    if (!data || !data.items || !data.items.length) return;
    
    // Format data for CSV
    const csvContent = [
      // Header row
      ['Payment ID', 'Member ID', 'Amount', 'Cleared Date', 'Date Processed', 'Payee Name', 'Payment Method', 'Check Number'].join(','),
      // Data rows
      ...data.items.map((item: PaymentClearItem) => [
        item.paymentID || '',
        item.memberID || '',
        item.amount || '',
        item.clearedDate || '',
        item.dateProcessed || '',
        item.payeeName || '',
        item.paymentMethod || '',
        item.checkNumber || ''
      ].join(','))
    ].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `payment-clear-report-${dayjs().format('YYYY-MM-DD')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Run report when sort parameters change
  useEffect(() => {
    if (data) {
      runReport(pageNumber);
    }
  }, [sortColumn, sortDirection]);
  
  // Define table columns
  const columns = [
    {
      key: 'paymentID',
      label: 'Payment ID',
      sortable: true,
      sortKey: PaymentClearSortColumn.PaymentID,
      render: (value: any, item: PaymentClearItem) => (item && item.paymentID) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payment ID
          {sortColumn === PaymentClearSortColumn.PaymentID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'memberID',
      label: 'Member ID',
      sortable: true,
      sortKey: PaymentClearSortColumn.MemberID,
      render: (value: any, item: PaymentClearItem) => (item && item.memberID) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === PaymentClearSortColumn.MemberID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      sortKey: PaymentClearSortColumn.Amount,
      render: (value: any, item: PaymentClearItem) => (item && item.amount !== undefined) ? `$${item.amount.toFixed(2)}` : '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Amount
          {sortColumn === PaymentClearSortColumn.Amount && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'clearedDate',
      label: 'Cleared Date',
      sortable: true,
      sortKey: PaymentClearSortColumn.ClearedDate,
      render: (value: any, item: PaymentClearItem) => (item && item.clearedDate) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Cleared Date
          {sortColumn === PaymentClearSortColumn.ClearedDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'dateProcessed',
      label: 'Date Processed',
      sortable: false,
      render: (value: any, item: PaymentClearItem) => (item && item.dateProcessed) || ''
    },
    {
      key: 'payeeName',
      label: 'Payee Name',
      sortable: true,
      sortKey: PaymentClearSortColumn.PayeeName,
      render: (value: any, item: PaymentClearItem) => (item && item.payeeName) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === PaymentClearSortColumn.PayeeName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'paymentMethod',
      label: 'Payment Method',
      sortable: false,
      render: (value: any, item: PaymentClearItem) => (item && item.paymentMethod) || ''
    },
    {
      key: 'checkNumber',
      label: 'Check Number',
      sortable: false,
      render: (value: any, item: PaymentClearItem) => (item && item.checkNumber) || ''
    }
  ];
  
  return (
    <ReportContainer
      title="Payment Clear Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!(data && data.items && data.items.length > 0)}
      onExportCsv={handleExportCsv}
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
        <ReportTable
          columns={columns}
          data={data.items}
          pagination={{
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            onPageChange: handlePageChange,
            onPageSizeChange: setPageSize
          }}
          onSort={handleSortChange}
        />
      ) : data && data.items && data.items.length === 0 ? (
        <Typography variant="body1">No payment clear data found for the selected criteria.</Typography>
      ) : null}
    </ReportContainer>
  );
};

export default PaymentClearReport;
