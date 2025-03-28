import React, { useState, useCallback, useEffect } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Pagination, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import { 
  FAILED_ON_US_SEARCH_TYPES, 
  FAILED_ON_US_SORT_COLUMNS,
  FailedOnUsSearchType,
  FailedOnUsSortColumn,
  FailedOnUsParams,
  FailedOnUsItem,
  getFailedOnUs 
} from '../../../../utils/reports/failedOnUs';
import useClientApi from '../../../../hooks/useClientApi';

const DEFAULT_PAGE_SIZE = 20;

const FailedOnUsReport: React.FC = () => {
  // Indicate that this component uses client-specific API
  useClientApi(true);
  
  // State for report parameters
  const [searchType, setSearchType] = useState<FailedOnUsSearchType>(FailedOnUsSearchType.DateRange);
  const [memberID, setMemberID] = useState<string>('');
  const [paymentID, setPaymentID] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<FailedOnUsSortColumn>(FailedOnUsSortColumn.FailedDate);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  
  // State for report results
  const [reportData, setReportData] = useState<FailedOnUsItem[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as FailedOnUsSearchType);
    // Reset search values when changing search type
    setMemberID('');
    setPaymentID('');
    setStartDate(dayjs().subtract(30, 'day'));
    setEndDate(dayjs());
  };

  // Handle MemberID input change
  const handleMemberIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemberID(event.target.value);
  };

  // Handle PaymentID input change
  const handlePaymentIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentID(event.target.value);
  };

  // Handle start date change
  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
  };

  // Handle end date change
  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    runReport(value);
  };

  // Handle sort change
  const handleSortChange = (column: string) => {
    // Map the column key to the enum value
    const columnEnum = mapColumnKeyToEnum(column);
    let newDirection = sortDirection;
    
    if (sortColumn === columnEnum) {
      // Toggle sort direction if clicking the same column
      newDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
      setSortDirection(newDirection);
    } else {
      // Set new sort column and default to ASC
      setSortColumn(columnEnum);
      newDirection = 'ASC';
      setSortDirection(newDirection);
    }
    
    // Run report with the updated sort settings
    runReportWithSort(columnEnum, newDirection);
  };

  // Helper function to map column keys to enum values
  const mapColumnKeyToEnum = (key: string): FailedOnUsSortColumn => {
    switch (key) {
      case 'paymentID':
        return FailedOnUsSortColumn.PaymentID;
      case 'memberID':
        return FailedOnUsSortColumn.MemberID;
      case 'failedDate':
        return FailedOnUsSortColumn.FailedDate;
      case 'processedDate':
        return FailedOnUsSortColumn.ProcessedDate;
      case 'amount':
        return FailedOnUsSortColumn.Amount;
      case 'userPayeeListID':
        return FailedOnUsSortColumn.UserPayeeListID;
      case 'payeeID':
        return FailedOnUsSortColumn.PayeeID;
      case 'payeeName':
        return FailedOnUsSortColumn.PayeeName;
      case 'status':
        return FailedOnUsSortColumn.Status;
      case 'statusCode':
        return FailedOnUsSortColumn.StatusCode;
      default:
        return FailedOnUsSortColumn.FailedDate;
    }
  };

  // Run report with specific sort settings
  const runReportWithSort = (column: FailedOnUsSortColumn, direction: 'ASC' | 'DESC') => {
    const params: FailedOnUsParams = {
      searchType: searchType,
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      sortColumn: column,
      sortDirection: direction
    };

    // Add parameters based on search type
    if (searchType === FailedOnUsSearchType.MemberID) {
      if (!memberID) {
        setError('Please enter a Member ID');
        return;
      }
      params.memberID = memberID;
    } else if (searchType === FailedOnUsSearchType.PaymentID) {
      if (!paymentID) {
        setError('Please enter a Payment ID');
        return;
      }
      params.paymentID = paymentID;
    } else if (searchType === FailedOnUsSearchType.DateRange) {
      if (!startDate || !endDate) {
        setError('Please select both start and end dates');
        return;
      }
      params.startDate = startDate.format('YYYY-MM-DD');
      params.endDate = endDate.format('YYYY-MM-DD');
    }

    setLoading(true);
    setError(null);
    
    getFailedOnUs(params)
      .then(response => {
        setReportData(response.items || []);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
        setPage(1);
      })
      .catch(err => {
        console.error('Error fetching Failed On Us data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the report');
        setReportData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Run the report
  const runReport = useCallback(async (pageNumber: number = 1) => {
    // Validate required parameters based on search type
    if (searchType === FailedOnUsSearchType.MemberID && !memberID) {
      setError('Please enter a Member ID');
      return;
    } else if (searchType === FailedOnUsSearchType.PaymentID && !paymentID) {
      setError('Please enter a Payment ID');
      return;
    } else if (searchType === FailedOnUsSearchType.DateRange && (!startDate || !endDate)) {
      setError('Please select both start and end dates');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params: FailedOnUsParams = {
        searchType: searchType,
        pageNumber: pageNumber,
        pageSize: DEFAULT_PAGE_SIZE,
        sortColumn: sortColumn,
        sortDirection: sortDirection
      };

      // Add parameters based on search type
      if (searchType === FailedOnUsSearchType.MemberID) {
        params.memberID = memberID;
      } else if (searchType === FailedOnUsSearchType.PaymentID) {
        params.paymentID = paymentID;
      } else if (searchType === FailedOnUsSearchType.DateRange) {
        params.startDate = startDate ? startDate.format('YYYY-MM-DD') : undefined;
        params.endDate = endDate ? endDate.format('YYYY-MM-DD') : undefined;
      }

      const response = await getFailedOnUs(params);
      
      setReportData(response.items || []);
      setTotalPages(response.totalPages);
      setTotalCount(response.totalCount);
      setPage(pageNumber);
    } catch (err) {
      console.error('Error fetching Failed On Us data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching the report');
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [searchType, memberID, paymentID, startDate, endDate, sortColumn, sortDirection]);

  // Handle form submit
  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    runReport(1);
  };

  // Define columns for the report table
  const columns = [
    { 
      key: 'paymentID', 
      label: 'Payment ID', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payment ID
          {sortColumn === FailedOnUsSortColumn.PaymentID && (
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
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === FailedOnUsSortColumn.MemberID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'firstName', 
      label: 'First Name', 
      sortable: false 
    },
    { 
      key: 'lastName', 
      label: 'Last Name', 
      sortable: false 
    },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: false 
    },
    { 
      key: 'failedDate', 
      label: 'Failed Date', 
      sortable: true,
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Failed Date
          {sortColumn === FailedOnUsSortColumn.FailedDate && (
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
      render: (value: number) => `$${value.toFixed(2)}`,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Amount
          {sortColumn === FailedOnUsSortColumn.Amount && (
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
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          User Payee List ID
          {sortColumn === FailedOnUsSortColumn.UserPayeeListID && (
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
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee ID
          {sortColumn === FailedOnUsSortColumn.PayeeID && (
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
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === FailedOnUsSortColumn.PayeeName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Status
          {sortColumn === FailedOnUsSortColumn.Status && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'statusCode', 
      label: 'Status Code', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Status Code
          {sortColumn === FailedOnUsSortColumn.StatusCode && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'errorMessage', 
      label: 'Error Message', 
      sortable: false 
    }
  ];

  // Run the report when component mounts with initial sort settings
  useEffect(() => {
    runReport(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReportContainer
        title="Failed On Us Report"
        onRunReport={handleSubmit}
        loading={loading}
        error={error}
        hasData={!!reportData && reportData.length > 0}
        onExportCsv={() => {
          // CSV export functionality is handled by the ReportContainer
          // This is just a placeholder for the required prop
        }}
      >
        {/* Search Form */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" margin="dense">
              <InputLabel id="search-type-label">Search Type</InputLabel>
              <Select
                labelId="search-type-label"
                id="search-type-select"
                value={searchType}
                label="Search Type"
                onChange={handleSearchTypeChange}
                size="small"
              >
                {Object.entries(FailedOnUsSearchType).map(([key, value]) => (
                  <MenuItem key={key} value={value}>{FAILED_ON_US_SEARCH_TYPES[value]}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {searchType === FailedOnUsSearchType.MemberID && (
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="member-id-input"
                label="Member ID"
                value={memberID}
                onChange={handleMemberIDChange}
                required
                size="small"
                margin="dense"
              />
            </Grid>
          )}

          {searchType === FailedOnUsSearchType.PaymentID && (
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="payment-id-input"
                label="Payment ID"
                value={paymentID}
                onChange={handlePaymentIDChange}
                required
                size="small"
                margin="dense"
              />
            </Grid>
          )}

          {searchType === FailedOnUsSearchType.DateRange && (
            <>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  slotProps={{ textField: { size: 'small', margin: 'dense', fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  slotProps={{ textField: { size: 'small', margin: 'dense', fullWidth: true } }}
                />
              </Grid>
            </>
          )}
        </Grid>

        {/* Results Table */}
        {reportData && reportData.length > 0 ? (
          <>
            <ReportTable
              data={reportData}
              columns={columns}
              onSort={handleSortChange}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2">
                Total: {totalCount} {totalCount === 1 ? 'record' : 'records'}
              </Typography>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          </>
        ) : !loading && (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
            No data to display. Please adjust your search criteria and try again.
          </Typography>
        )}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default FailedOnUsReport;
