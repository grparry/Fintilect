import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormHelperText,
  Paper
} from '@mui/material';
import logger from '../../../../utils/logger';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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
import ReportTableV2 from '../components/ReportTableV2';

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

  /**
   * Handle sort change for ReportTableV2
   * @param newSortColumn Column to sort by
   * @param newSortDirection Direction to sort
   */
  const handleSortChange = (newSortColumn: GlobalHolidaysSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    logger.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Make API call with the new sort parameters directly
    const params: GlobalHolidaysParams = {
      searchType: searchType,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize: DEFAULT_PAGE_SIZE,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    logger.log('Making API call with params:', params);
    
    // Reset to page 1
    setPage(1);
    
    // Call API directly with new sort parameters
    setLoading(true);
    setError(null);
    
    getGlobalHolidays(params)
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
        setReportData([]);
        setTotalCount(0);
        setTotalPages(0);
      })
      .finally(() => {
        setLoading(false);
      });
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
      logger.error('Error fetching Global Holidays report:', err);
      setError('Failed to fetch report data. Please try again.');
      setReportData([]);
      setTotalCount(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle page change for ReportTableV2
   * @param pageNumber New page number
   * @param newPageSize New page size
   */
  const handlePageChange = (pageNumber: number, newPageSize: number) => {
    if (newPageSize !== DEFAULT_PAGE_SIZE) {
      // If we need to handle page size changes in the future
    }
    setPage(pageNumber);
    runReport(pageNumber);
  };

  // Column definitions for the report table
  const columns = [
    { 
      key: 'id', 
      label: 'ID', 
      sortable: true,
      sortKey: GlobalHolidaysSortColumn.Id
    },
    { 
      key: 'date', 
      label: 'Date', 
      sortable: true,
      sortKey: GlobalHolidaysSortColumn.Date,
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : ''
    },
    { 
      key: 'description', 
      label: 'Description', 
      sortable: true,
      sortKey: GlobalHolidaysSortColumn.Description
    },
    { 
      key: 'holidayType', 
      label: 'Holiday Type', 
      sortable: true,
      sortKey: GlobalHolidaysSortColumn.HolidayType
    }
  ];

  /**
   * Function to get paged data for CSV export
   * @param request Export request parameters
   */
  const getPagedData = async (request: { page: number; pageSize: number; sortColumn: GlobalHolidaysSortColumn; sortDirection: 'ASC' | 'DESC' }) => {
    try {
      // Build parameters
      const params: GlobalHolidaysParams = {
        searchType: searchType,
        pageNumber: request.page,
        pageSize: request.pageSize,
        sortColumn: request.sortColumn,
        sortDirection: request.sortDirection
      };
      
      // Call API
      const response = await getGlobalHolidays(params);
      return {
        items: response.items || [],
        pageNumber: response.pageNumber,
        totalCount: response.totalCount
      };
    } catch (error) {
      logger.error('Error fetching global holidays data for export:', error);
      throw error;
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReportContainer
        title="Global Holidays Report"
        onRunReport={handleSubmit}
        loading={loading}
        error={error}
        hasData={!!reportData && reportData.length > 0}

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
                getPagedData,
                maxPageSize: 100
              }}
              exportFileName={`global-holidays-${dayjs().format('YYYY-MM-DD')}`}
            />
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
