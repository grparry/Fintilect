import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import {
  ProcessingConfirmationParams,
  ProcessingConfirmationResponse,
  ProcessingConfirmationItem,
  ProcessingConfirmationSearchType,
  ProcessingConfirmationSortColumn,
  PROCESSING_CONFIRMATION_SORT_COLUMNS,
  getProcessingConfirmation
} from '../../../../utils/reports/processingConfirmation';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';

const ProcessingConfirmationReport: React.FC = () => {
  // State for form inputs
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [sortColumn, setSortColumn] = useState<ProcessingConfirmationSortColumn>(
    ProcessingConfirmationSortColumn.Start
  );
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // State for API response
  const [data, setData] = useState<ProcessingConfirmationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form validation
  const [formErrors, setFormErrors] = useState({
    startDate: '',
    endDate: ''
  });
  
  // Run report with current parameters
  const runReport = async (page: number = pageNumber) => {
    // Validate form inputs
    const errors = {
      startDate: !startDate ? 'Start date is required' : '',
      endDate: !endDate ? 'End date is required' : ''
    };
    
    setFormErrors(errors);
    
    // If there are validation errors, don't run the report
    if (Object.values(errors).some(error => error)) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Format dates for API request
      const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : '';
      const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : '';
      
      // Prepare request parameters
      const params: ProcessingConfirmationParams = {
        searchType: ProcessingConfirmationSearchType.DateRange,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sortColumn,
        sortDirection,
        pageNumber: page,
        pageSize
      };
      
      // Call API
      const response = await getProcessingConfirmation(params);
      setData(response);
      setPageNumber(page);
    } catch (err) {
      setError('Failed to load processing confirmation data. Please try again.');
      console.error('Error fetching processing confirmation data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    runReport(1); // Reset to first page on new search
  };
  
  // Handle sort change for ReportTableV2
  const handleSortChange = (newSortColumn: ProcessingConfirmationSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    console.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Format dates for API request
    const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : '';
    const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : '';
    
    // Validate required parameters
    if (!formattedStartDate || !formattedEndDate) {
      setError('Please provide both start and end dates');
      return;
    }
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Create params with the new sort values
    const params: ProcessingConfirmationParams = {
      searchType: ProcessingConfirmationSearchType.DateRange,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize: pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    console.log('Making API call with params:', params);
    
    // Reset to page 1
    setPageNumber(1);
    
    // Call API directly with new sort parameters
    getProcessingConfirmation(params)
      .then(response => {
        console.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setData(response);
      })
      .catch(error => {
        console.error('Error sorting report:', error);
        setError('Failed to sort report. Please try again.');
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  // Handle page change for ReportTableV2
  const handlePageChange = (page: number, newPageSize: number) => {
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
    runReport(page);
  };
  
  // Function to get paged data for CSV export
  const getPagedData = async (request: { page: number; pageSize: number; sortColumn: ProcessingConfirmationSortColumn; sortDirection: 'ASC' | 'DESC' }) => {
    try {
      // Format dates for API request
      const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : '';
      const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : '';
      
      // Prepare request parameters
      const params: ProcessingConfirmationParams = {
        searchType: ProcessingConfirmationSearchType.DateRange,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sortColumn: request.sortColumn,
        sortDirection: request.sortDirection,
        pageNumber: request.page,
        pageSize: request.pageSize
      };
      
      // Call API
      const response = await getProcessingConfirmation(params);
      return {
        items: response.items || [],
        pageNumber: response.pageNumber,
        totalCount: response.totalCount
      };
    } catch (error) {
      console.error('Error fetching processing confirmation data for export:', error);
      throw error;
    }
  };
  
  // No longer need the useEffect hook for sort parameters as we're making the API call directly in handleSortChange
  
  // Define table columns for ReportTableV2
  const columns = [
    {
      key: 'start',
      label: 'Start Time',
      sortable: true,
      sortKey: ProcessingConfirmationSortColumn.Start,
      render: (value: any, item: ProcessingConfirmationItem) => {
        if (!item || !item.start) return '';
        return dayjs(item.start).format('MM/DD/YYYY hh:mm:ss A');
      }
    },
    {
      key: 'end',
      label: 'End Time',
      sortable: true,
      sortKey: ProcessingConfirmationSortColumn.End,
      render: (value: any, item: ProcessingConfirmationItem) => {
        if (!item || !item.end) return '';
        return dayjs(item.end).format('MM/DD/YYYY hh:mm:ss A');
      }
    },
    {
      key: 'message',
      label: 'Message',
      sortable: true,
      sortKey: ProcessingConfirmationSortColumn.Message,
      render: (value: any, item: ProcessingConfirmationItem) => (item && item.message) || ''
    }
  ];
  
  return (
    <ReportContainer
      title="Processing Confirmation Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!data && data.items.length > 0}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Start Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                format="MM/DD/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!formErrors.startDate,
                    helperText: formErrors.startDate,
                    InputLabelProps: { shrink: true }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              End Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                format="MM/DD/YYYY"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    variant: 'outlined',
                    error: !!formErrors.endDate,
                    helperText: formErrors.endDate,
                    InputLabelProps: { shrink: true }
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
      
      {data && data.items.length > 0 ? (
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
            getPagedData,
            maxPageSize: 100
          }}
          exportFileName={`processing-confirmation-${dayjs().format('YYYY-MM-DD')}`}
        />
      ) : !loading && !error && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No data to display. Please adjust your search criteria and try again.
        </Typography>
      )}
    </ReportContainer>
  );
};

export default ProcessingConfirmationReport;
