import React, { useState, useCallback, useEffect } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Pagination, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import { 
  ERROR_RECAP_SEARCH_TYPES, 
  ErrorRecapSearchType,
  ErrorRecapSortColumn,
  ErrorRecapParams,
  ErrorRecapItem,
  getErrorRecap 
} from '../../../../utils/reports/errorRecap';
import useClientApi from '../../../../hooks/useClientApi';

const DEFAULT_PAGE_SIZE = 20;

const ErrorRecapReport: React.FC = () => {
  // Indicate that this component uses client-specific API
  useClientApi(true);
  
  // State for report parameters
  const [searchType, setSearchType] = useState<ErrorRecapSearchType>(ErrorRecapSearchType.MemberID);
  const [memberId, setMemberId] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [userPayeeListId, setUserPayeeListId] = useState<string>('');
  const [statusCode, setStatusCode] = useState<string>('');
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [payeeId, setPayeeId] = useState<string>('');
  const [payeeName, setPayeeName] = useState<string>('');
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<ErrorRecapSortColumn | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  
  // State for report results
  const [reportData, setReportData] = useState<ErrorRecapItem[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as ErrorRecapSearchType);
    // Reset search values when changing search type
    setMemberId('');
    setPaymentId('');
    setUserPayeeListId('');
    setStatusCode('');
    setPayeeId('');
    setPayeeName('');
  };

  // Handle sort change
  const handleSort = (columnKey: string) => {
    // Find the column definition to get the sortKey
    const columnDef = columns.find(col => col.key === columnKey);
    if (columnDef && columnDef.sortKey) {
      const newSortColumn = columnDef.sortKey;
      let newDirection: 'ASC' | 'DESC';
      
      // If clicking the same column, toggle direction
      if (sortColumn === newSortColumn) {
        newDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
      } else {
        newDirection = 'DESC'; // Start with descending sort on first click
      }
      
      // Update state
      setSortColumn(newSortColumn);
      setSortDirection(newDirection);
      
      // Reset to page 1 when sort changes
      if (page === 1) {
        // Force immediate report run with the new sort parameters
        const params: ErrorRecapParams = {
          searchType: searchType,
          pageNumber: 1,
          pageSize: DEFAULT_PAGE_SIZE,
          sortColumn: newSortColumn,
          sortDirection: newDirection
        };
        
        // Add specific parameters based on search type
        switch (searchType) {
          case ErrorRecapSearchType.MemberID:
            params.memberId = memberId;
            break;
          case ErrorRecapSearchType.PaymentID:
            params.paymentId = paymentId;
            break;
          case ErrorRecapSearchType.UserPayeeListID:
            params.userPayeeListId = userPayeeListId;
            break;
          case ErrorRecapSearchType.StatusCode:
            params.statusCode = statusCode;
            break;
          case ErrorRecapSearchType.DateRange:
            if (startDate) params.startDate = startDate.format('YYYY-MM-DD');
            if (endDate) params.endDate = endDate.format('YYYY-MM-DD');
            break;
          case ErrorRecapSearchType.PayeeID:
            params.payeeId = payeeId;
            break;
          case ErrorRecapSearchType.PayeeName:
            params.payeeName = payeeName;
            break;
        }
        
        setLoading(true);
        setError(null);
        
        getErrorRecap(params)
          .then(response => {
            setReportData(response.items);
            setTotalPages(response.totalPages);
            setTotalCount(response.totalCount);
          })
          .catch(err => {
            setError('Failed to load error recap data. Please try again.');
            console.error('Error fetching error recap data:', err);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setPage(1);
      }
    }
  };

  // Handle page change
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    
    // Check if required parameters are available based on search type
    let hasRequiredParams = false;
    
    switch (searchType) {
      case ErrorRecapSearchType.MemberID:
        hasRequiredParams = !!memberId;
        break;
      case ErrorRecapSearchType.PaymentID:
        hasRequiredParams = !!paymentId;
        break;
      case ErrorRecapSearchType.UserPayeeListID:
        hasRequiredParams = !!userPayeeListId;
        break;
      case ErrorRecapSearchType.StatusCode:
        hasRequiredParams = !!statusCode;
        break;
      case ErrorRecapSearchType.DateRange:
        hasRequiredParams = !!startDate && !!endDate;
        if (!hasRequiredParams) setError('Start Date and End Date are required');
        else if (startDate && endDate && startDate.isAfter(endDate)) {
          setError('Start Date must be before End Date');
          hasRequiredParams = false;
        }
        break;
      case ErrorRecapSearchType.PayeeID:
        hasRequiredParams = !!payeeId;
        break;
      case ErrorRecapSearchType.PayeeName:
        hasRequiredParams = !!payeeName;
        break;
    }
    
    if (hasRequiredParams) {
      runReport(value);
    }
  };

  // Run the error recap report
  const runReport = useCallback(async (currentPage: number = 1) => {
    // Validate required parameters based on search type
    let hasRequiredParams = false;
    
    switch (searchType) {
      case ErrorRecapSearchType.MemberID:
        hasRequiredParams = !!memberId;
        if (!hasRequiredParams) setError('Member ID is required');
        break;
      case ErrorRecapSearchType.PaymentID:
        hasRequiredParams = !!paymentId;
        if (!hasRequiredParams) setError('Payment ID is required');
        break;
      case ErrorRecapSearchType.UserPayeeListID:
        hasRequiredParams = !!userPayeeListId;
        if (!hasRequiredParams) setError('User Payee List ID is required');
        break;
      case ErrorRecapSearchType.StatusCode:
        hasRequiredParams = !!statusCode;
        if (!hasRequiredParams) setError('Status Code is required');
        break;
      case ErrorRecapSearchType.DateRange:
        hasRequiredParams = !!startDate && !!endDate;
        if (!hasRequiredParams) {
          setError('Start Date and End Date are required');
        } else if (startDate && endDate && startDate.isAfter(endDate)) {
          setError('Start Date must be before End Date');
          hasRequiredParams = false;
        }
        break;
      case ErrorRecapSearchType.PayeeID:
        hasRequiredParams = !!payeeId;
        if (!hasRequiredParams) setError('Payee ID is required');
        break;
      case ErrorRecapSearchType.PayeeName:
        hasRequiredParams = !!payeeName;
        if (!hasRequiredParams) setError('Payee Name is required');
        break;
      default:
        setError('Invalid search type');
        return;
    }
    
    if (!hasRequiredParams) {
      return;
    }
    
    setLoading(true);
    setReportData(null);
    setError(null);
    
    try {
      // Prepare report parameters with specific fields based on search type
      const params: ErrorRecapParams = {
        searchType: searchType,
        pageNumber: currentPage,
        pageSize: DEFAULT_PAGE_SIZE,
        sortColumn: sortColumn,
        sortDirection: sortDirection
      };
      
      // Add specific parameters based on search type
      switch (searchType) {
        case ErrorRecapSearchType.MemberID:
          params.memberId = memberId;
          break;
        case ErrorRecapSearchType.PaymentID:
          params.paymentId = paymentId;
          break;
        case ErrorRecapSearchType.UserPayeeListID:
          params.userPayeeListId = userPayeeListId;
          break;
        case ErrorRecapSearchType.StatusCode:
          params.statusCode = statusCode;
          break;
        case ErrorRecapSearchType.DateRange:
          params.startDate = startDate?.format('YYYY-MM-DD');
          params.endDate = endDate?.format('YYYY-MM-DD');
          console.log('Date search parameters:', { startDate: params.startDate, endDate: params.endDate });
          break;
        case ErrorRecapSearchType.PayeeID:
          params.payeeId = payeeId;
          break;
        case ErrorRecapSearchType.PayeeName:
          params.payeeName = payeeName;
          break;
      }
      
      // Call the error recap API
      const response = await getErrorRecap(params);
      
      // Update state with response data
      if (response.items) {
        setReportData(response.items);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
      } else {
        setReportData([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    } catch (err) {
      console.error('Error running error recap report:', err);
      setError('Failed to load error recap data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchType, memberId, paymentId, userPayeeListId, statusCode, startDate, endDate, payeeId, payeeName, sortColumn, sortDirection]);

  // Export report data to CSV
  const handleExportCsv = useCallback(() => {
    if (!reportData || reportData.length === 0) return;
    
    // Define CSV columns
    const header = [
      'failedDate', 'memberId', 'paymentId', 'amount', 'payeeId', 
      'payeeName', 'userPayeeListId', 'usersAccountAtPayee', 'nameOnAccount', 
      'status', 'hostCode', 'error'
    ].join(',');
    
    // Convert data to CSV rows
    const rows = reportData.map(row => {
      return [
        row.failedDate ? dayjs(row.failedDate).format('MM/DD/YYYY HH:mm:ss') : '',
        row.memberId || '',
        row.paymentId || '',
        row.amount || 0,
        row.payeeId || '',
        row.payeeName || '',
        row.userPayeeListId || '',
        row.usersAccountAtPayee || '',
        row.nameOnAccount || '',
        row.status || '',
        row.hostCode || '',
        row.error ? `"${row.error.replace(/"/g, '""')}"` : ''
      ].join(',');
    });
    
    // Combine header and rows
    const csv = [header, ...rows].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `error-recap-${dayjs().format('YYYY-MM-DD')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [reportData]);

  // Get the label for the search value field based on search type
  const getSearchValueLabel = () => {
    switch (searchType) {
      case ErrorRecapSearchType.MemberID:
        return 'Member ID';
      case ErrorRecapSearchType.PaymentID:
        return 'Payment ID';
      case ErrorRecapSearchType.PayeeID:
        return 'Payee ID';
      case ErrorRecapSearchType.PayeeName:
        return 'Payee Name';
      case ErrorRecapSearchType.UserPayeeListID:
        return 'User Payee List ID';
      case ErrorRecapSearchType.StatusCode:
        return 'Status Code';
      case ErrorRecapSearchType.DateRange:
        return 'Date';
      default:
        return 'Search Value';
    }
  };

  // Define table columns
  const columns = [
    { 
      key: 'failedDate', 
      label: 'Failed Date',
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY HH:mm:ss') : '',
      sortable: true,
      sortKey: ErrorRecapSortColumn.FailedDate,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Failed Date
          {sortColumn === ErrorRecapSortColumn.FailedDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'memberId', 
      label: 'Member ID', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.MemberID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === ErrorRecapSortColumn.MemberID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'paymentId', 
      label: 'Payment ID', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.PaymentID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payment ID
          {sortColumn === ErrorRecapSortColumn.PaymentID && (
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
      render: (value: number) => value ? `$${value.toFixed(2)}` : '$0.00',
      sortable: true,
      sortKey: ErrorRecapSortColumn.Amount,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Amount
          {sortColumn === ErrorRecapSortColumn.Amount && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'userPayeeListId', 
      label: 'User Payee List ID', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.UserPayeeListID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          User Payee List ID
          {sortColumn === ErrorRecapSortColumn.UserPayeeListID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'payeeId', 
      label: 'Payee ID', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.PayeeID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee ID
          {sortColumn === ErrorRecapSortColumn.PayeeID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'payeeName', 
      label: 'Payee Name', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.PayeeName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === ErrorRecapSortColumn.PayeeName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { key: 'usersAccountAtPayee', label: 'Account At Payee' },
    { key: 'nameOnAccount', label: 'Name On Account' },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.Status,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Status
          {sortColumn === ErrorRecapSortColumn.Status && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { key: 'hostCode', label: 'Host Code' },
    { key: 'error', label: 'Error' }
  ];

  // Run report when sort parameters change
  useEffect(() => {
    if (reportData) {
      runReport(page);
    }
  }, [sortColumn, sortDirection]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReportContainer
        title="Error Recap Report"
        onRunReport={() => runReport(1)}
        onExportCsv={handleExportCsv}
        loading={loading}
        error={error}
        hasData={!!reportData && reportData.length > 0}
      >
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={12} md={6} lg={3}>
            <FormControl fullWidth size="small" margin="dense">
              <InputLabel>Search Type</InputLabel>
              <Select
                value={searchType.toString()}
                label="Search Type"
                onChange={handleSearchTypeChange}
                size="small"
              >
                {Object.entries(ERROR_RECAP_SEARCH_TYPES).map(([key, value]) => (
                  <MenuItem key={key} value={key}>{value}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            {searchType === ErrorRecapSearchType.DateRange ? (
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    margin="dense"
                    label="Start Date"
                    type="date"
                    value={startDate?.format('YYYY-MM-DD')}
                    onChange={(e) => setStartDate(dayjs(e.target.value))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    margin="dense"
                    label="End Date"
                    type="date"
                    value={endDate?.format('YYYY-MM-DD')}
                    onChange={(e) => setEndDate(dayjs(e.target.value))}
                  />
                </Grid>
              </Grid>
            ) : (
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label={getSearchValueLabel()}
                value={
                  searchType === ErrorRecapSearchType.MemberID ? memberId :
                  searchType === ErrorRecapSearchType.PaymentID ? paymentId :
                  searchType === ErrorRecapSearchType.PayeeID ? payeeId :
                  searchType === ErrorRecapSearchType.PayeeName ? payeeName :
                  searchType === ErrorRecapSearchType.UserPayeeListID ? userPayeeListId :
                  searchType === ErrorRecapSearchType.StatusCode ? statusCode : ''
                }
                onChange={(e) => {
                  switch (searchType) {
                    case ErrorRecapSearchType.MemberID:
                      setMemberId(e.target.value);
                      break;
                    case ErrorRecapSearchType.PaymentID:
                      setPaymentId(e.target.value);
                      break;
                    case ErrorRecapSearchType.PayeeID:
                      setPayeeId(e.target.value);
                      break;
                    case ErrorRecapSearchType.PayeeName:
                      setPayeeName(e.target.value);
                      break;
                    case ErrorRecapSearchType.UserPayeeListID:
                      setUserPayeeListId(e.target.value);
                      break;
                    case ErrorRecapSearchType.StatusCode:
                      setStatusCode(e.target.value);
                      break;
                    default:
                      break;
                  }
                }}
                placeholder={`Enter ${getSearchValueLabel().toLowerCase()}`}
              />
            )}
          </Grid>
        </Grid>

        {reportData && reportData.length > 0 ? (
          <>
            <ReportTable
              data={reportData}
              columns={columns}
              onSort={handleSort}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2">
                Showing {reportData.length} of {totalCount} results
              </Typography>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
              />
            </Box>
          </>
        ) : null}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default ErrorRecapReport;
