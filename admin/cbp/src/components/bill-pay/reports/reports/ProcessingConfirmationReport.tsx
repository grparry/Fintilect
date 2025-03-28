import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
import ReportTable from '../components/ReportTable';

const ProcessingConfirmationReport: React.FC = () => {
  // State for form inputs
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [sortColumn, setSortColumn] = useState<ProcessingConfirmationSortColumn>(
    ProcessingConfirmationSortColumn.Start
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
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
  
  // Handle sort change
  const handleSortChange = (column: string) => {
    // Find the column definition to get the sortKey
    const columnDef = columns.find(col => col.key === column);
    if (columnDef && columnDef.sortKey) {
      const newSortColumn = columnDef.sortKey;
      
      // If clicking the same column, toggle direction
      if (sortColumn === newSortColumn) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(newSortColumn);
        setSortDirection('asc');
      }
    }
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    runReport(page);
  };
  
  // Handle export to CSV
  const handleExportCsv = () => {
    if (!data || !data.items.length) return;
    
    // Format data for CSV
    const csvContent = [
      // Header row
      ['Start Time', 'End Time', 'Message'].join(','),
      // Data rows
      ...data.items.map(item => [
        item.start || '',
        item.end || '',
        item.message || ''
      ].join(','))
    ].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `processing-confirmation-${dayjs().format('YYYY-MM-DD')}.csv`);
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
  
  // Define table columns
  const columns = [
    {
      key: 'start',
      label: 'Start Time',
      sortable: true,
      sortKey: ProcessingConfirmationSortColumn.Start,
      render: (value: any, item: ProcessingConfirmationItem) => (item && item.start) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Start Time
          {sortColumn === ProcessingConfirmationSortColumn.Start && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'end',
      label: 'End Time',
      sortable: true,
      sortKey: ProcessingConfirmationSortColumn.End,
      render: (value: any, item: ProcessingConfirmationItem) => (item && item.end) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          End Time
          {sortColumn === ProcessingConfirmationSortColumn.End && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'message',
      label: 'Message',
      sortable: true,
      sortKey: ProcessingConfirmationSortColumn.Message,
      render: (value: any, item: ProcessingConfirmationItem) => (item && item.message) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Message
          {sortColumn === ProcessingConfirmationSortColumn.Message && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    }
  ];
  
  return (
    <ReportContainer
      title="Processing Confirmation Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!data && data.items.length > 0}
      onExportCsv={data && data.items.length > 0 ? handleExportCsv : undefined}
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
        <ReportTable
          columns={columns}
          data={data.items}
          pagination={{
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalCount: data.totalCount,
            onPageChange: handlePageChange,
            onPageSizeChange: setPageSize
          }}
          onSort={handleSortChange}
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
