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
  Paper
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import dayjs from 'dayjs';

// Import services and utilities
import {
  GlobalHolidaysSearchType,
  GLOBAL_HOLIDAYS_SEARCH_TYPES,
  GlobalHolidaysSortColumn,
  GlobalHolidaysParams,
  GlobalHolidaysItem,
  getGlobalHolidays
} from '../../../../utils/reports/globalHolidays';
import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';

// Constants
const DEFAULT_PAGE_SIZE = 20;

/**
 * Global Holidays Report Component
 * Displays global holidays data with search, sort, and pagination
 */
const GlobalHolidaysReport: React.FC = () => {
  // Search form state
  const [searchType, setSearchType] = useState<GlobalHolidaysSearchType>(GlobalHolidaysSearchType.All);
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<GlobalHolidaysSortColumn>(GlobalHolidaysSortColumn.Date);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  
  // Report results state
  const [reportData, setReportData] = useState<GlobalHolidaysItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load data when component mounts or when search/sort parameters change
  useEffect(() => {
    runReport(1);
  }, [searchType, sortColumn, sortDirection]);

  // Helper function to map column keys to enum values
  const mapColumnKeyToEnum = (key: string): GlobalHolidaysSortColumn => {
    switch (key) {
      case 'date':
        return GlobalHolidaysSortColumn.Date;
      case 'id':
        return GlobalHolidaysSortColumn.Id;
      case 'description':
        return GlobalHolidaysSortColumn.Description;
      case 'holidayType':
        return GlobalHolidaysSortColumn.HolidayType;
      default:
        return GlobalHolidaysSortColumn.Date;
    }
  };

  // Run report with specific sort settings
  const runReportWithSort = (column: GlobalHolidaysSortColumn, direction: 'ASC' | 'DESC') => {
    const params: GlobalHolidaysParams = {
      searchType: searchType,
      pageNumber: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      sortColumn: column,
      sortDirection: direction
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
    const params: GlobalHolidaysParams = {
      searchType: searchType,
      pageNumber: pageNumber,
      pageSize: DEFAULT_PAGE_SIZE,
      sortColumn: sortColumn,
      sortDirection: sortDirection
    };

    fetchReport(params);
  };

  // Fetch report data from API
  const fetchReport = async (params: GlobalHolidaysParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getGlobalHolidays(params);
      
      setReportData(response.items || []);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
      setPage(params.pageNumber);
    } catch (err) {
      console.error('Error fetching Global Holidays report:', err);
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
      key: 'id', 
      label: 'ID', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          ID
          {sortColumn === GlobalHolidaysSortColumn.Id && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'date', 
      label: 'Date', 
      sortable: true,
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Date
          {sortColumn === GlobalHolidaysSortColumn.Date && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'description', 
      label: 'Description', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Description
          {sortColumn === GlobalHolidaysSortColumn.Description && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'holidayType', 
      label: 'Holiday Type', 
      sortable: true,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Holiday Type
          {sortColumn === GlobalHolidaysSortColumn.HolidayType && (
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
        title="Global Holidays Report"
        onRunReport={handleSubmit}
        loading={loading}
        error={error}
        hasData={!!reportData && reportData.length > 0}
        onExportCsv={handleExportCsv}
      >
        {/* Search Form */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="search-type-label">Search Type</InputLabel>
              <Select
                labelId="search-type-label"
                id="search-type"
                value={searchType}
                label="Search Type"
                onChange={(e) => setSearchType(e.target.value as GlobalHolidaysSearchType)}
              >
                {Object.entries(GLOBAL_HOLIDAYS_SEARCH_TYPES).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select search criteria</FormHelperText>
            </FormControl>
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

export default GlobalHolidaysReport;
