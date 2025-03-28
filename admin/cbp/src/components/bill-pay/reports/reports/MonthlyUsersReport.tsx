import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Pagination,
  FormHelperText,
  Paper,
  TextField
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import dayjs, { Dayjs } from 'dayjs';

// Import services and utilities
import {
  MonthlyUsersSearchType,
  MONTHLY_USERS_SEARCH_TYPES,
  MonthlyUsersSortColumn,
  MonthlyUsersParams,
  MonthlyUsersItem,
  getMonthlyUsers
} from '../../../../utils/reports/monthlyUsers';
import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';

// Constants
const DEFAULT_PAGE_SIZE = 20;

/**
 * Monthly Users Report Component
 * Displays monthly users data with search, sort, and pagination
 */
const MonthlyUsersReport: React.FC = () => {
  // Search form state
  const [searchType] = useState<MonthlyUsersSearchType>(MonthlyUsersSearchType.DateRange);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(1, 'month'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<MonthlyUsersSortColumn>(MonthlyUsersSortColumn.MemberID);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  
  // Report results state
  const [reportData, setReportData] = useState<MonthlyUsersItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper function to map column keys to enum values
  const mapColumnKeyToEnum = (key: string): MonthlyUsersSortColumn => {
    switch (key) {
      case 'memberID':
        return MonthlyUsersSortColumn.MemberID;
      case 'numberOfPayments':
        return MonthlyUsersSortColumn.NumberOfPayments;
      default:
        return MonthlyUsersSortColumn.MemberID;
    }
  };

  // Run report with specific sort settings
  const runReportWithSort = (column: MonthlyUsersSortColumn, direction: 'ASC' | 'DESC') => {
    const params: MonthlyUsersParams = {
      searchType: searchType,
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      sortColumn: column,
      sortDirection: direction,
      startDate: startDate ? startDate.format('YYYY-MM-DD') : undefined,
      endDate: endDate ? endDate.format('YYYY-MM-DD') : undefined
    };

    fetchReport(params);
  };

  // Handle column sort
  const handleSort = (columnKey: string) => {
    const columnEnum = mapColumnKeyToEnum(columnKey);
    
    // Determine new sort direction
    let newDirection: 'ASC' | 'DESC' = 'ASC';
    if (columnEnum === sortColumn) {
      // Toggle direction if same column
      newDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
    }
    
    // Update state
    setSortColumn(columnEnum);
    setSortDirection(newDirection);
    
    // Run report with new sort settings
    runReportWithSort(columnEnum, newDirection);
  };

  // Handle form submit
  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    runReport(1);
  };

  // Run report with current search parameters
  const runReport = (pageNumber: number) => {
    // Validate date range
    if (!startDate || !endDate) {
      setError('Please provide both start and end dates');
      return;
    }

    const params: MonthlyUsersParams = {
      searchType: searchType,
      pageNumber: pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      sortColumn: sortColumn,
      sortDirection: sortDirection,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD')
    };

    fetchReport(params);
  };

  // Fetch report data from API
  const fetchReport = async (params: MonthlyUsersParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getMonthlyUsers(params);
      
      setReportData(response.items || []);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
      setPage(params.pageNumber);
    } catch (err) {
      console.error('Error fetching Monthly Users report:', err);
      setError('Failed to fetch report data. Please try again.');
      setReportData([]);
      setTotalCount(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    runReport(value);
  };

  // Column definitions for the report table
  const columns = [
    { 
      key: 'memberID', 
      label: 'Member ID', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === MonthlyUsersSortColumn.MemberID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'numberOfPayments', 
      label: 'Number of Payments', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Number of Payments
          {sortColumn === MonthlyUsersSortColumn.NumberOfPayments && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    }
  ];

  // Export CSV data
  const handleExportCsv = () => {
    // This function is handled by the ReportContainer
    // Just a placeholder for the required prop
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReportContainer
        title="Monthly Users Report"
        onRunReport={handleSubmit}
        loading={loading}
        error={error}
        hasData={!!reportData && reportData.length > 0}
        onExportCsv={handleExportCsv}
      >
        {/* Search Form */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel id="search-type-label">Search Type</InputLabel>
              <Select
                labelId="search-type-label"
                id="search-type"
                value={searchType}
                label="Search Type"
                disabled={true} // Only one search type available
              >
                {Object.entries(MONTHLY_USERS_SEARCH_TYPES).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Date Range is the only available search criteria</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  helperText: 'Select start date'
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  helperText: 'Select end date'
                }
              }}
            />
          </Grid>
        </Grid>

        {/* Results Table */}
        {reportData && reportData.length > 0 ? (
          <>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <ReportTable
                columns={columns}
                data={reportData}
                onSort={handleSort}
              />
            </Paper>
            
            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                Total: {totalCount} items
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

export default MonthlyUsersReport;
