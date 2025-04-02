import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
      sortKey: OnUsPostingsSortColumn.PaymentID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payment ID
          {sortColumn === OnUsPostingsSortColumn.PaymentID && (
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
      sortKey: OnUsPostingsSortColumn.MemberID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === OnUsPostingsSortColumn.MemberID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'accountID', 
      label: 'Account ID',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.AccountID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Account ID
          {sortColumn === OnUsPostingsSortColumn.AccountID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'loanID', 
      label: 'Loan ID',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.LoanID,
      render: (value: any) => value || 'N/A',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Loan ID
          {sortColumn === OnUsPostingsSortColumn.LoanID && (
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
      sortKey: OnUsPostingsSortColumn.Amount,
      render: (value: any) => value ? `$${value.toFixed(2)}` : '$0.00',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Amount
          {sortColumn === OnUsPostingsSortColumn.Amount && (
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
      sortable: true,
      sortKey: OnUsPostingsSortColumn.EntryDate,
      render: (value: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : 'N/A',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Entry Date
          {sortColumn === OnUsPostingsSortColumn.EntryDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'modifiedDate', 
      label: 'Modified Date',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.ModifiedDate,
      render: (value: any) => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : 'N/A',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Modified Date
          {sortColumn === OnUsPostingsSortColumn.ModifiedDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'runID', 
      label: 'Run ID',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.RunID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Run ID
          {sortColumn === OnUsPostingsSortColumn.RunID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'errorCode', 
      label: 'Error Code',
      sortable: true,
      sortKey: OnUsPostingsSortColumn.ErrorCode,
      render: (value: any) => value || 'N/A',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Error Code
          {sortColumn === OnUsPostingsSortColumn.ErrorCode && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
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
   */
  const handlePageChange = (page: number) => {
    setPageNumber(page);
    runReport(page);
  };

  /**
   * Handle sort change
   * @param column Column to sort by
   */
  const handleSortChange = (column: string) => {
    // Find the column definition to get the sortKey
    const columnDef = columns.find(col => col.key === column);
    if (columnDef && columnDef.sortKey) {
      const newSortColumn = columnDef.sortKey;
      
      // If clicking the same column, toggle direction
      if (sortColumn === newSortColumn) {
        setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
      } else {
        // New column selected, set it and default to ascending
        setSortColumn(newSortColumn);
        setSortDirection('ASC');
      }
    }
  };

  /**
   * Export data as CSV
   */
  const handleExportCsv = () => {
    if (!data || !data.items.length) return;
    
    // Create CSV header row
    const headers = columns.map(col => col.label);
    const csvContent = [headers.join(',')];
    
    // Add data rows
    data.items.forEach(item => {
      const row = columns.map(col => {
        const key = col.key as keyof OnUsPostingsItem;
        const value = item[key];
        
        // Format value if render function exists
        if (col.render && value !== undefined) {
          return `"${col.render(value).toString().replace(/"/g, '""')}"`;
        }
        
        // Handle different value types
        if (value === undefined || value === null) {
          return '';
        } else if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        } else {
          return `"${value}"`;
        }
      });
      
      csvContent.push(row.join(','));
    });
    
    // Create and download CSV file
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `on-us-postings-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
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
      onExportCsv={handleExportCsv}
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
            onSort={handleSortChange}
          />
        </Box>
      )}
    </ReportContainer>
  );
};

export default OnUsPostingsReport;
