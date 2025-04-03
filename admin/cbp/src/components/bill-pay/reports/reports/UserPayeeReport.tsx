import React, { useState, useEffect } from 'react';
import { Box, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import { 
  UserPayeeSearchType, 
  USER_PAYEE_SEARCH_TYPES, 
  UserPayeeSortColumn, 
  UserPayeeParams, 
  UserPayeeItem, 
  UserPayeeItemPagedResponse, 
  getUserPayeeReport 
} from '../../../../utils/reports/userPayee';

/**
 * User Payee Report Component
 * Displays a form to search for user payee data and shows results in a table
 */
const UserPayeeReport: React.FC = () => {
  // State for form inputs
  const [searchType, setSearchType] = useState<UserPayeeSearchType>(UserPayeeSearchType.Member);
  const [memberID, setMemberID] = useState<string>('');
  const [paymentID, setPaymentID] = useState<string>('');
  const [recurringPaymentID, setRecurringPaymentID] = useState<string>('');
  const [userPayeeListID, setUserPayeeListID] = useState<string>('');
  const [payeeID, setPayeeID] = useState<string>('');
  const [days, setDays] = useState<number>(30);
  const [sortColumn, setSortColumn] = useState<UserPayeeSortColumn>(UserPayeeSortColumn.PayeeName);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // State for API response
  const [data, setData] = useState<UserPayeeItemPagedResponse | null>(null);
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
  
  // Column definitions for the report table
  const columns = [
    { 
      key: 'memberID', 
      label: 'Member ID',
      sortable: true,
      sortKey: UserPayeeSortColumn.MemberID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === UserPayeeSortColumn.MemberID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'userPayeeListID', 
      label: 'User Payee List ID',
      sortable: true,
      sortKey: UserPayeeSortColumn.UserPayeeListID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          User Payee List ID
          {sortColumn === UserPayeeSortColumn.UserPayeeListID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'payeeID', 
      label: 'Payee ID',
      sortable: false
    },
    { 
      key: 'payeeName', 
      label: 'Payee Name',
      sortable: true,
      sortKey: UserPayeeSortColumn.PayeeName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === UserPayeeSortColumn.PayeeName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'nickName', 
      label: 'Nickname',
      sortable: false
    },
    { 
      key: 'payeeType', 
      label: 'Payee Type',
      sortable: false
    },
    { 
      key: 'accountNumber', 
      label: 'Account Number',
      sortable: true,
      sortKey: UserPayeeSortColumn.AccountNumber,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Account Number
          {sortColumn === UserPayeeSortColumn.AccountNumber && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'entryDate', 
      label: 'Entry Date',
      sortable: false,
      render: (value: any) => value ? dayjs(value).format('MM/DD/YYYY') : 'N/A'
    },
    { 
      key: 'lastUpdated', 
      label: 'Last Updated',
      sortable: false,
      render: (value: any) => value ? dayjs(value).format('MM/DD/YYYY') : 'N/A'
    },
    { 
      key: 'address', 
      label: 'Address',
      sortable: false,
      render: (value: any, row: UserPayeeItem) => {
        const parts = [];
        if (row.address1) parts.push(row.address1);
        if (row.address2) parts.push(row.address2);
        return parts.join(', ') || 'N/A';
      }
    },
    { 
      key: 'city', 
      label: 'City',
      sortable: false
    },
    { 
      key: 'state', 
      label: 'State',
      sortable: false
    },
    { 
      key: 'zipCode', 
      label: 'Zip Code',
      sortable: false
    },
    { 
      key: 'phone', 
      label: 'Phone',
      sortable: false
    }
  ];

  // Run report with current parameters
  const runReport = async (page: number = pageNumber) => {
    // Validate form inputs based on search type
    const errors = {
      memberID: searchType === UserPayeeSearchType.Member && !memberID ? 'Member ID is required' : '',
      paymentID: searchType === UserPayeeSearchType.Payment && !paymentID ? 'Payment ID is required' : '',
      recurringPaymentID: searchType === UserPayeeSearchType.RecurringPayment && !recurringPaymentID ? 'Recurring Payment ID is required' : '',
      userPayeeListID: searchType === UserPayeeSearchType.UserPayeeList && !userPayeeListID ? 'User Payee List ID is required' : '',
      payeeID: searchType === UserPayeeSearchType.Payee && !payeeID ? 'Payee ID is required' : '',
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
      const params: UserPayeeParams = {
        searchType,
        days,
        sortColumn,
        sortDirection,
        pageNumber: page,
        pageSize
      };
      
      // Add conditional parameters based on search type
      if (searchType === UserPayeeSearchType.Member) {
        params.memberID = memberID;
      } else if (searchType === UserPayeeSearchType.Payment) {
        params.paymentID = paymentID;
      } else if (searchType === UserPayeeSearchType.RecurringPayment) {
        params.recurringPaymentID = recurringPaymentID;
      } else if (searchType === UserPayeeSearchType.UserPayeeList) {
        params.userPayeeListID = userPayeeListID;
      } else if (searchType === UserPayeeSearchType.Payee) {
        params.payeeID = payeeID;
      }
      
      // Call API
      const response = await getUserPayeeReport(params);
      setData(response);
      setPageNumber(page);
    } catch (err) {
      setError('Failed to load user payee data. Please try again.');
      console.error('Error fetching user payee data:', err);
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
  const handleSort = (columnKey: string) => {
    const columnDef = columns.find(col => col.key === columnKey);
    if (columnDef && columnDef.sortKey) {
      const newSortColumn = columnDef.sortKey;
      // If clicking the same column, toggle direction
      if (sortColumn === newSortColumn) {
        setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
      } else {
        setSortColumn(newSortColumn);
        setSortDirection('DESC'); // Initial sort is descending
      }
      
      // Reset to page 1 when sort changes
      if (pageNumber === 1) {
        runReport(1);
      } else {
        setPageNumber(1);
      }
    }
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    runReport(page);
  };
  
  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent<UserPayeeSearchType>) => {
    setSearchType(event.target.value as UserPayeeSearchType);
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
      ['User Payee List ID', 'Member ID', 'Payee ID', 'Payee Name', 'Nickname', 'Payee Type', 'Account Number', 'Entry Date', 'Last Updated', 'Address', 'City', 'State', 'Zip Code', 'Phone'].join(','),
      // Data rows
      ...data.items.map((item: UserPayeeItem) => {
        // Format address from address1 and address2
        const address = [item.address1, item.address2].filter(Boolean).join(', ');
        
        return [
          item.userPayeeListID || '',
          item.memberID || '',
          item.payeeID || '',
          item.payeeName || '',
          item.nickName || '',
          item.payeeType || '',
          item.accountNumber || '',
          item.entryDate ? dayjs(item.entryDate).format('MM/DD/YYYY') : '',
          item.lastUpdated ? dayjs(item.lastUpdated).format('MM/DD/YYYY') : '',
          address || '',
          item.city || '',
          item.state || '',
          item.zipCode || '',
          item.phone || ''
        ].join(',');
      })
    ].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `user-payee-report-${dayjs().format('YYYY-MM-DD')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Effect to run report when sort parameters change
  useEffect(() => {
    if (data) {
      runReport(pageNumber);
    }
  }, [sortColumn, sortDirection]);
  
  return (
    <ReportContainer
      title="User Payee Report"
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
                  {Object.entries(USER_PAYEE_SEARCH_TYPES).map(([value, label]) => (
                    <MenuItem key={value} value={value as UserPayeeSearchType}>{label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {searchType === UserPayeeSearchType.Member && (
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
            
            {searchType === UserPayeeSearchType.Payment && (
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
            
            {searchType === UserPayeeSearchType.RecurringPayment && (
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
            
            {searchType === UserPayeeSearchType.UserPayeeList && (
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
            
            {searchType === UserPayeeSearchType.Payee && (
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
            onPageSizeChange: (newPageSize) => setPageSize(newPageSize)
          }}
          onSort={handleSort}
        />
      ) : data && data.items && data.items.length === 0 ? (
        <Typography variant="body1">No user payee data found for the selected criteria.</Typography>
      ) : null}
    </ReportContainer>
  );
};

export default UserPayeeReport;
