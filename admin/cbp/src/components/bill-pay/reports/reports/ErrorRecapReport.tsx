import React, { useState, useCallback, useEffect } from 'react';
import logger from '../../../../utils/logger';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
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
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
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
  const handleSortChange = (newSortColumn: ErrorRecapSortColumn, newDirection: 'ASC' | 'DESC') => {
    logger.log('Sort change:', { newSortColumn, newDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newDirection);
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Validate required parameters based on search type
    let hasRequiredParams = false;
    
    switch (searchType) {
      case ErrorRecapSearchType.MemberID:
        hasRequiredParams = !!memberId;
        if (!hasRequiredParams) {
          setError('Member ID is required');
          setLoading(false);
          return;
        }
        break;
      case ErrorRecapSearchType.PaymentID:
        hasRequiredParams = !!paymentId;
        if (!hasRequiredParams) {
          setError('Payment ID is required');
          setLoading(false);
          return;
        }
        break;
      case ErrorRecapSearchType.UserPayeeListID:
        hasRequiredParams = !!userPayeeListId;
        if (!hasRequiredParams) {
          setError('User Payee List ID is required');
          setLoading(false);
          return;
        }
        break;
      case ErrorRecapSearchType.StatusCode:
        hasRequiredParams = !!statusCode;
        if (!hasRequiredParams) {
          setError('Status Code is required');
          setLoading(false);
          return;
        }
        break;
      case ErrorRecapSearchType.DateRange:
        hasRequiredParams = !!startDate && !!endDate;
        if (!hasRequiredParams) {
          setError('Start Date and End Date are required');
          setLoading(false);
          return;
        } else if (startDate && endDate && startDate.isAfter(endDate)) {
          setError('Start Date must be before End Date');
          setLoading(false);
          return;
        }
        break;
      case ErrorRecapSearchType.PayeeID:
        hasRequiredParams = !!payeeId;
        if (!hasRequiredParams) {
          setError('Payee ID is required');
          setLoading(false);
          return;
        }
        break;
      case ErrorRecapSearchType.PayeeName:
        hasRequiredParams = !!payeeName;
        if (!hasRequiredParams) {
          setError('Payee Name is required');
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
    const params: ErrorRecapParams = {
      searchType,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newDirection // Use the new sort direction directly
    };
    
    // Add parameters based on search type
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
        params.startDate = startDate.format('YYYY-MM-DD');
        params.endDate = endDate.format('YYYY-MM-DD');
        break;
      case ErrorRecapSearchType.PayeeID:
        params.payeeId = payeeId;
        break;
      case ErrorRecapSearchType.PayeeName:
        params.payeeName = payeeName;
        break;
    }
    
    logger.log('Making API call with params:', params);
    
    // Reset to page 1
    setPage(1);
    
    // Call API directly with new sort parameters
    getErrorRecap(params)
      .then(response => {
        logger.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setReportData(response.items || []);
        setTotalCount(response.totalCount);
        setTotalPages(response.totalPages);
      })
      .catch(error => {
        logger.error('Error sorting report:', error);
        setError('Failed to sort report. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle page change
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    setPage(newPage);
    if (newPageSize) {
      setPageSize(newPageSize);
    }
    runReport(newPage);
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
        pageSize: pageSize,
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
          if (startDate) params.startDate = startDate.toISOString();
          if (endDate) params.endDate = endDate.toISOString();
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
      logger.error('Error running error recap report:', err);
      setError('Failed to load error recap data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchType, memberId, paymentId, userPayeeListId, statusCode, startDate, endDate, payeeId, payeeName, sortColumn, sortDirection, pageSize]);



  // Run report when sort parameters change
  useEffect(() => {
    if (reportData) {
      runReport(page);
    }
  }, [sortColumn, sortDirection]);

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
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : '',
      sortable: true,
      sortKey: ErrorRecapSortColumn.FailedDate,

    },
    { 
      key: 'memberId', 
      label: 'Member ID', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.MemberID,

    },
    { 
      key: 'paymentId', 
      label: 'Payment ID', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.PaymentID,

    },
    { 
      key: 'amount', 
      label: 'Amount',
      render: (value: number) => value ? `$${value.toFixed(2)}` : '$0.00',
      sortable: true,
      sortKey: ErrorRecapSortColumn.Amount,

    },
    { 
      key: 'userPayeeListId', 
      label: 'User Payee List ID', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.UserPayeeListID,

    },
    { 
      key: 'payeeId', 
      label: 'Payee ID', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.PayeeID,

    },
    { 
      key: 'payeeName', 
      label: 'Payee Name', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.PayeeName,

    },
    { 
      key: 'usersAccountAtPayee', 
      label: 'Account at Payee', 
      sortable: false
    },
    { 
      key: 'nameOnAccount', 
      label: 'Name on Account', 
      sortable: false
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      sortKey: ErrorRecapSortColumn.Status,

    },
    { 
      key: 'hostCode', 
      label: 'Host Code', 
      sortable: false
    },
    { 
      key: 'error', 
      label: 'Error', 
      sortable: false
    }
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
          <ReportTableV2
            columns={columns}
            data={reportData}
            pagination={{
              pageNumber: page,
              totalCount: totalCount,
              onPageChange: handlePageChange
            }}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            enableExport={{
              getPagedData: async (request) => {
                const params: ErrorRecapParams = {
                  pageNumber: request.page,
                  pageSize: request.pageSize,
                  sortColumn: request.sortColumn,
                  sortDirection: request.sortDirection,
                  searchType
                };

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
                    if (startDate) params.startDate = startDate.toISOString();
                    if (endDate) params.endDate = endDate.toISOString();
                    break;
                  case ErrorRecapSearchType.PayeeID:
                    params.payeeId = payeeId;
                    break;
                  case ErrorRecapSearchType.PayeeName:
                    params.payeeName = payeeName;
                    break;
                }

                const response = await getErrorRecap(params);
                return {
                  items: response.items,
                  pageNumber: response.pageNumber,
                  totalCount: response.totalCount
                };
              },
              maxPageSize: 100
            }}
            exportFileName={`error-recap-${dayjs().format('YYYY-MM-DD')}`}
          />
        ) : null}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default ErrorRecapReport;
