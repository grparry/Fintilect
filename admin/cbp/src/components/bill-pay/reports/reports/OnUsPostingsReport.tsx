import React, { useState, useEffect } from 'react';
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import {
  OnUsPostingsSearchType,
  ON_US_POSTINGS_SEARCH_TYPES,
  OnUsPostingsSortColumn,
  ON_US_POSTINGS_SORT_COLUMNS,
  OnUsPostingsParams,
  OnUsPostingsResponse,
  OnUsPostingsItem,
  getOnUsPostings
} from '../../../../utils/reports/onUsPostings';

const OnUsPostingsReport: React.FC = () => {
  // State for search parameters
  const [searchType, setSearchType] = useState<OnUsPostingsSearchType>(
    OnUsPostingsSearchType.DateRange
  );
  const [paymentID, setPaymentID] = useState<string>('');
  const [memberID, setMemberID] = useState<string>('');
  const [accountID, setAccountID] = useState<string>('');
  const [loanID, setLoanID] = useState<string>('');
  const [runID, setRunID] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  
  // State for sorting
  const [sortColumn, setSortColumn] = useState<OnUsPostingsSortColumn>(
    OnUsPostingsSortColumn.EntryDate
  );
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');

  // Column definitions for the report table
  const columns = [
    { 
      key: 'paymentID', 
      label: 'Payment ID',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.PaymentID
    },
    { 
      key: 'memberID', 
      label: 'Member ID',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.MemberID
    },
    { 
      key: 'accountID', 
      label: 'Account ID',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.AccountID
    },
    { 
      key: 'loanID', 
      label: 'Loan ID',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.LoanID,
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'amount', 
      label: 'Amount',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.Amount,
      render: (value: any) => value ? `$${value.toFixed(2)}` : '$0.00'
    },
    { 
      key: 'entryDate', 
      label: 'Entry Date',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.EntryDate,
      render: (value: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : 'N/A'
    },
    { 
      key: 'modifiedDate', 
      label: 'Modified Date',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.ModifiedDate,
      render: (value: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : 'N/A'
    },
    { 
      key: 'runID', 
      label: 'Run ID',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.RunID
    },
    { 
      key: 'errorCode', 
      label: 'Error Code',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.ErrorCode,
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'sourceApp', 
      label: 'Source App',
      sortable: false,
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'glCode', 
      label: 'GL Code',
      sortable: false,
      render: (value: any) => value || 'N/A'
    }
  ];

  // State for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  
  // State for report data
  const [data, setData] = useState<OnUsPostingsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Format date as YYYY-MM-DD
   */
  const formatDate = (date: Dayjs): string => {
    return date.format('YYYY-MM-DD');
  };

  /**
   * Run the report with the current parameters
   * @param page Page number to fetch
   */
  const runReport = async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Format dates
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      
      console.log('Date parameters:', {
        startDate: formattedStartDate,
        endDate: formattedEndDate
      });
      
      // Build parameters based on search type
      const params: OnUsPostingsParams = {
        searchType,
        pageNumber: page,
        pageSize,
        sortColumn,
        sortDirection,
        startDate: formattedStartDate,
        endDate: formattedEndDate
      };
      
      // Add parameters based on search type
      switch (searchType) {
        case OnUsPostingsSearchType.PaymentID:
          if (!paymentID) {
            throw new Error('Payment ID is required');
          }
          params.paymentID = paymentID;
          break;
        case OnUsPostingsSearchType.MemberID:
          if (!memberID) {
            throw new Error('Member ID is required');
          }
          params.memberID = memberID;
          break;
        case OnUsPostingsSearchType.AccountID:
          if (!accountID) {
            throw new Error('Account ID is required');
          }
          params.accountID = accountID;
          break;
        case OnUsPostingsSearchType.LoanID:
          if (!loanID) {
            throw new Error('Loan ID is required');
          }
          params.loanID = loanID;
          break;
        case OnUsPostingsSearchType.RunID:
          if (!runID) {
            throw new Error('Run ID is required');
          }
          params.runID = runID;
          break;
        case OnUsPostingsSearchType.DateRange:
          // Only date range parameters are required, which are already added
          break;
      }
      
      // Call API
      const response = await getOnUsPostings(params);
      setData(response);
      setPageNumber(response.pageNumber);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle form submission
   * @param event Form event
   */
  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    runReport(1);
  };

  /**
   * Handle page change
   * @param page New page number
   * @param newPageSize New page size
   */
  const handlePageChange = (page: number, newPageSize?: number) => {
    setPageNumber(page);
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
    runReport(page);
  };

  /**
   * Handle sort change for ReportTableV2
   * @param newSortColumn Column to sort by
   * @param newSortDirection Direction to sort
   */
  const handleSortChange = (newSortColumn: OnUsPostingsSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Reset to page 1 when sort changes
    if (pageNumber === 1) {
      runReport(1);
    } else {
      setPageNumber(1);
    }
  };



  // Run report when sort parameters change
  useEffect(() => {
    if (data) {
      runReport(pageNumber);
    }
  }, [sortColumn, sortDirection]);

  // Render search form based on search type
  const renderSearchForm = () => {
    return (
      <Grid container spacing={3}>
        {/* Date Range Pickers - Always visible for all search types */}
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => newValue && setStartDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => newValue && setEndDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        
        {/* Conditional Fields based on search type */}
        {searchType === OnUsPostingsSearchType.PaymentID && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Payment ID"
              value={paymentID}
              onChange={(e) => setPaymentID(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}
        
        {searchType === OnUsPostingsSearchType.MemberID && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Member ID"
              value={memberID}
              onChange={(e) => setMemberID(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}
        
        {searchType === OnUsPostingsSearchType.AccountID && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Account ID"
              value={accountID}
              onChange={(e) => setAccountID(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}
        
        {searchType === OnUsPostingsSearchType.LoanID && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Loan ID"
              value={loanID}
              onChange={(e) => setLoanID(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}
        
        {searchType === OnUsPostingsSearchType.RunID && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Run ID"
              value={runID}
              onChange={(e) => setRunID(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <ReportContainer
      title="On Us Postings Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!data?.items.length}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Search Type */}
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Search Type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as OnUsPostingsSearchType)}
            >
              {Object.entries(ON_US_POSTINGS_SEARCH_TYPES).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          {/* Dynamic search fields based on search type */}
          <Grid item xs={12}>
            {renderSearchForm()}
          </Grid>
        </Grid>
      </Box>
      
      {/* Results Table */}
      {data && data.items.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Results
          </Typography>
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
                // Format dates
                const formattedStartDate = formatDate(startDate);
                const formattedEndDate = formatDate(endDate);
                
                // Build parameters based on search type
                const params: OnUsPostingsParams = {
                  searchType,
                  pageNumber: request.page,
                  pageSize: request.pageSize,
                  sortColumn: request.sortColumn,
                  sortDirection: request.sortDirection,
                  startDate: formattedStartDate,
                  endDate: formattedEndDate
                };
                
                // Add parameters based on search type
                switch (searchType) {
                  case OnUsPostingsSearchType.PaymentID:
                    params.paymentID = paymentID;
                    break;
                  case OnUsPostingsSearchType.MemberID:
                    params.memberID = memberID;
                    break;
                  case OnUsPostingsSearchType.AccountID:
                    params.accountID = accountID;
                    break;
                  case OnUsPostingsSearchType.LoanID:
                    params.loanID = loanID;
                    break;
                  case OnUsPostingsSearchType.RunID:
                    params.runID = runID;
                    break;
                }
                
                const response = await getOnUsPostings(params);
                return {
                  items: response.items,
                  pageNumber: response.pageNumber,
                  totalCount: response.totalCount
                };
              },
              maxPageSize: 100
            }}
            exportFileName={`on-us-postings-${dayjs().format('YYYY-MM-DD')}`}
          />
        </Box>
      )}
    </ReportContainer>
  );
};

export default OnUsPostingsReport;
