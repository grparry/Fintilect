import React, { useState, useCallback, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Pagination, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import { 
  ACTIVE_USER_COUNT_SEARCH_TYPES, 
  ACTIVE_USER_COUNT_SORT_COLUMNS,
  ActiveUserCountSearchType,
  ActiveUserCountSortColumn,
  ActiveUserCountParams,
  ActiveUserCountItem,
  getActiveUserCount 
} from '../../../../utils/reports/activeUserCount';
import useClientApi from '../../../../hooks/useClientApi';

const DEFAULT_PAGE_SIZE = 20;

const ActiveUserCountReport: React.FC = () => {
  // Indicate that this component uses client-specific API
  useClientApi(true);
  
  // State for report parameters
  const [searchType, setSearchType] = useState<ActiveUserCountSearchType>(ActiveUserCountSearchType.DateRange);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<ActiveUserCountSortColumn>(ActiveUserCountSortColumn.MemberID);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  
  // State for report results
  const [reportData, setReportData] = useState<ActiveUserCountItem[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as ActiveUserCountSearchType);
    // Reset search values when changing search type
    setStartDate(dayjs().subtract(30, 'day'));
    setEndDate(dayjs());
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
  const mapColumnKeyToEnum = (key: string): ActiveUserCountSortColumn => {
    switch (key) {
      case 'memberID':
        return ActiveUserCountSortColumn.MemberID;
      case 'lastActivityDate':
        return ActiveUserCountSortColumn.LastActivityDate;
      case 'firstName':
        return ActiveUserCountSortColumn.FirstName;
      case 'lastName':
        return ActiveUserCountSortColumn.LastName;
      case 'email':
        return ActiveUserCountSortColumn.Email;
      case 'paymentCount':
        return ActiveUserCountSortColumn.PaymentCount;
      default:
        return ActiveUserCountSortColumn.MemberID;
    }
  };

  // Run report with specific sort settings
  const runReportWithSort = (column: ActiveUserCountSortColumn, direction: 'ASC' | 'DESC') => {
    const params: ActiveUserCountParams = {
      searchType: searchType,
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      sortColumn: column,
      sortDirection: direction
    };

    // Add date range parameters
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }
    
    params.startDate = startDate.format('YYYY-MM-DD');
    params.endDate = endDate.format('YYYY-MM-DD');

    setLoading(true);
    setError(null);
    
    getActiveUserCount(params)
      .then(response => {
        setReportData(response.items || []);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
        setPage(1);
      })
      .catch(err => {
        console.error('Error fetching Active User Count data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while fetching the report');
        setReportData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Run the report
  const runReport = useCallback(async (pageNumber: number = 1) => {
    // Validate required parameters
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params: ActiveUserCountParams = {
        searchType: searchType,
        pageNumber: pageNumber,
        pageSize: DEFAULT_PAGE_SIZE,
        sortColumn: sortColumn,
        sortDirection: sortDirection
      };

      // Add date range parameters
      params.startDate = startDate ? startDate.format('YYYY-MM-DD') : undefined;
      params.endDate = endDate ? endDate.format('YYYY-MM-DD') : undefined;

      const response = await getActiveUserCount(params);
      
      setReportData(response.items || []);
      setTotalPages(response.totalPages);
      setTotalCount(response.totalCount);
      setPage(pageNumber);
    } catch (err) {
      console.error('Error fetching Active User Count data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching the report');
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [searchType, startDate, endDate, sortColumn, sortDirection]);

  // Export report data to CSV
  const handleExportCsv = useCallback(() => {
    if (!reportData || reportData.length === 0) return;
    
    // Define CSV columns
    const header = [
      'memberID', 'firstName', 'lastName', 'email', 'lastActivityDate', 'paymentCount'
    ].join(',');
    
    // Convert data to CSV rows
    const rows = reportData.map(row => {
      return [
        row.memberID || '',
        row.firstName || '',
        row.lastName || '',
        row.email || '',
        row.lastActivityDate ? dayjs(row.lastActivityDate).format('MM/DD/YYYY') : '',
        row.paymentCount || 0
      ].join(',');
    });
    
    // Combine header and rows
    const csvContent = [header, ...rows].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `active_user_count_${dayjs().format('YYYYMMDD_HHmmss')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [reportData]);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    runReport(1); // Reset to first page when submitting new search
  };

  // Define columns for the report table
  const columns = [
    { 
      key: 'memberID', 
      label: 'Member ID', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === ActiveUserCountSortColumn.MemberID && (
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
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          First Name
          {sortColumn === ActiveUserCountSortColumn.FirstName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'lastName', 
      label: 'Last Name', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Last Name
          {sortColumn === ActiveUserCountSortColumn.LastName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Email
          {sortColumn === ActiveUserCountSortColumn.Email && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'lastActivityDate', 
      label: 'Last Activity Date', 
      sortable: true,
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Last Activity Date
          {sortColumn === ActiveUserCountSortColumn.LastActivityDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'paymentCount', 
      label: 'Payment Count', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payment Count
          {sortColumn === ActiveUserCountSortColumn.PaymentCount && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
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
        title="Active User Count Report"
        description="View active users and their payment activity"
        onRunReport={() => runReport(1)}
        onExportCsv={handleExportCsv}
        loading={loading}
        error={error}
        hasData={!!reportData && reportData.length > 0}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small" margin="dense">
                <InputLabel id="search-type-label">Search Type</InputLabel>
                <Select
                  labelId="search-type-label"
                  id="search-type"
                  value={searchType}
                  label="Search Type"
                  onChange={handleSearchTypeChange}
                  size="small"
                >
                  {Object.entries(ActiveUserCountSearchType).map(([key, value]) => (
                    <MenuItem key={key} value={value}>{ACTIVE_USER_COUNT_SEARCH_TYPES[value]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                slotProps={{ 
                  textField: { 
                    fullWidth: true,
                    size: "small",
                    margin: "dense",
                    required: true
                  } 
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                slotProps={{ 
                  textField: { 
                    fullWidth: true,
                    size: "small",
                    margin: "dense",
                    required: true
                  } 
                }}
              />
            </Grid>
          </Grid>
        </form>

        {reportData && reportData.length > 0 && (
          <>
            <Box sx={{ mt: 4 }}>
              <ReportTable
                columns={columns}
                data={reportData}
                onSort={handleSortChange}
              />
            </Box>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">
                Showing {reportData.length} of {totalCount} results
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
        )}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default ActiveUserCountReport;
