import React, { useState, useCallback, useEffect } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import logger from '../../../../utils/logger';

import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
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
  const handlePageChange = (page: number, newPageSize?: number) => {
    setPage(page);
    runReport(page);
  };

  // Handle sort change
  const handleSortChange = (newColumn: ActiveUserCountSortColumn, newDirection: 'ASC' | 'DESC') => {
    logger.log('Sort change:', { newColumn, newDirection });
    
    // Update state
    setSortColumn(newColumn);
    setSortDirection(newDirection);
    
    // Validate required parameters
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Create params with the new sort values
    const params: ActiveUserCountParams = {
      searchType: searchType,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize: DEFAULT_PAGE_SIZE,
      sortColumn: newColumn, // Use the new sort column directly
      sortDirection: newDirection // Use the new sort direction directly
    };
    
    // Add date range parameters
    params.startDate = startDate ? startDate.format('YYYY-MM-DD') : undefined;
    params.endDate = endDate ? endDate.format('YYYY-MM-DD') : undefined;
    
    logger.log('Making API call with params:', params);
    
    // Reset to page 1
    setPage(1);
    
    // Call API directly with new sort parameters
    getActiveUserCount(params)
      .then(response => {
        logger.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setReportData(response.items || []);
        setTotalPages(response.totalPages);
        setTotalCount(response.totalCount);
      })
      .catch(error => {
        logger.error('Error sorting report:', error);
        setError('Failed to sort report. Please try again.');
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
      logger.error('Error fetching Active User Count data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching the report');
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [searchType, startDate, endDate, sortColumn, sortDirection]);

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
      sortKey: ActiveUserCountSortColumn.MemberID
    },
    { 
      key: 'firstName', 
      label: 'First Name', 
      sortable: true,
      sortKey: ActiveUserCountSortColumn.FirstName
    },
    { 
      key: 'lastName', 
      label: 'Last Name', 
      sortable: true,
      sortKey: ActiveUserCountSortColumn.LastName
    },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: true,
      sortKey: ActiveUserCountSortColumn.Email
    },
    { 
      key: 'lastActivityDate', 
      label: 'Last Activity Date', 
      sortable: true,
      sortKey: ActiveUserCountSortColumn.LastActivityDate,
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : ''
    },
    { 
      key: 'paymentCount', 
      label: 'Payment Count', 
      sortable: true,
      sortKey: ActiveUserCountSortColumn.PaymentCount
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
          <Box sx={{ mt: 4 }}>
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
                  const params: ActiveUserCountParams = {
                    searchType: searchType,
                    pageNumber: request.page,
                    pageSize: request.pageSize,
                    sortColumn: request.sortColumn,
                    sortDirection: request.sortDirection,
                    startDate: startDate.toISOString(),
                    endDate: endDate.toISOString()
                  };

                  const response = await getActiveUserCount(params);
                  return {
                    items: response.items,
                    pageNumber: response.pageNumber,
                    totalCount: response.totalCount
                  };
                },
                maxPageSize: 100
              }}
              exportFileName={`active-user-count-${dayjs().format('YYYY-MM-DD')}`}
            />
          </Box>
        )}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default ActiveUserCountReport;
