import React, { useState, useEffect } from 'react';
import logger from '../../../../utils/logger';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import {
  ScheduledPaymentChangeHistoryParams,
  ScheduledPaymentChangeHistoryResponse,
  ScheduledPaymentChangeHistoryItem,
  ScheduledPaymentChangeHistorySearchType,
  ScheduledPaymentChangeHistorySortColumn,
  SCHEDULED_PAYMENT_CHANGE_HISTORY_SORT_COLUMNS,
  SCHEDULED_PAYMENT_CHANGE_HISTORY_SEARCH_TYPES,
  getScheduledPaymentChangeHistory
} from '../../../../utils/reports/scheduledPaymentChangeHistory';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';

/**
 * Scheduled Payment Change History Report Component
 * Displays scheduled payment change history with filtering, sorting, and pagination
 */
const ScheduledPaymentChangeHistoryReport: React.FC = () => {
  // State for form inputs
  const [searchType, setSearchType] = useState<ScheduledPaymentChangeHistorySearchType>(
    ScheduledPaymentChangeHistorySearchType.DateRange
  );
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [memberID, setMemberID] = useState<string>('');
  const [recurringPaymentID, setRecurringPaymentID] = useState<string>('');
  const [sortColumn, setSortColumn] = useState<ScheduledPaymentChangeHistorySortColumn>(
    ScheduledPaymentChangeHistorySortColumn.UpdatedOn
  );
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // State for API response
  const [data, setData] = useState<ScheduledPaymentChangeHistoryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form validation
  const [formErrors, setFormErrors] = useState({
    startDate: '',
    endDate: '',
    memberID: '',
    recurringPaymentID: ''
  });
  
  // Run report with current parameters
  const runReport = async (page: number = pageNumber) => {
    // Validate form inputs based on search type
    const errors = {
      startDate: searchType === ScheduledPaymentChangeHistorySearchType.DateRange && !startDate ? 'Start date is required' : '',
      endDate: searchType === ScheduledPaymentChangeHistorySearchType.DateRange && !endDate ? 'End date is required' : '',
      memberID: searchType === ScheduledPaymentChangeHistorySearchType.MemberID && !memberID ? 'Member ID is required' : '',
      recurringPaymentID: searchType === ScheduledPaymentChangeHistorySearchType.RecurringPaymentID && !recurringPaymentID ? 'Recurring Payment ID is required' : ''
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
      const params: ScheduledPaymentChangeHistoryParams = {
        searchType,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sortColumn,
        sortDirection,
        pageNumber: page,
        pageSize
      };
      
      // Add conditional parameters based on search type
      if (searchType === ScheduledPaymentChangeHistorySearchType.MemberID) {
        params.memberID = memberID;
      } else if (searchType === ScheduledPaymentChangeHistorySearchType.RecurringPaymentID) {
        params.recurringPaymentID = recurringPaymentID;
      }
      
      // Call API
      const response = await getScheduledPaymentChangeHistory(params);
      setData(response);
      setPageNumber(page);
    } catch (err) {
      setError('Failed to load scheduled payment change history data. Please try again.');
      logger.error('Error fetching scheduled payment change history data:', err);
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
  const handleSortChange = (newSortColumn: ScheduledPaymentChangeHistorySortColumn, newSortDirection: 'ASC' | 'DESC') => {
    logger.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Format dates for API request
    const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : '';
    const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : '';
    
    // Validate required parameters based on search type
    if (!formattedStartDate || !formattedEndDate) {
      setError('Please provide both start and end dates');
      return;
    }
    
    if (searchType === ScheduledPaymentChangeHistorySearchType.MemberID && !memberID) {
      setError('Member ID is required');
      return;
    } else if (searchType === ScheduledPaymentChangeHistorySearchType.RecurringPaymentID && !recurringPaymentID) {
      setError('Recurring Payment ID is required');
      return;
    }
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Create params with the new sort values
    const params: ScheduledPaymentChangeHistoryParams = {
      searchType,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize: pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    // Add conditional parameters based on search type
    if (searchType === ScheduledPaymentChangeHistorySearchType.MemberID) {
      params.memberID = memberID;
    } else if (searchType === ScheduledPaymentChangeHistorySearchType.RecurringPaymentID) {
      params.recurringPaymentID = recurringPaymentID;
    }
    
    logger.log('Making API call with params:', params);
    
    // Reset to page 1
    setPageNumber(1);
    
    // Call API directly with new sort parameters
    getScheduledPaymentChangeHistory(params)
      .then(response => {
        logger.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setData(response);
      })
      .catch(error => {
        logger.error('Error sorting report:', error);
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
  
  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent<ScheduledPaymentChangeHistorySearchType>) => {
    setSearchType(event.target.value as ScheduledPaymentChangeHistorySearchType);
    // Reset form errors when changing search type
    setFormErrors({
      startDate: '',
      endDate: '',
      memberID: '',
      recurringPaymentID: ''
    });
  };
  
  // Function to get paged data for CSV export
  const getPagedData = async (request: { page: number; pageSize: number; sortColumn: ScheduledPaymentChangeHistorySortColumn; sortDirection: 'ASC' | 'DESC' }) => {
    try {
      // Format dates for API request
      const formattedStartDate = startDate ? startDate.format('YYYY-MM-DD') : '';
      const formattedEndDate = endDate ? endDate.format('YYYY-MM-DD') : '';
      
      // Prepare request parameters
      const params: ScheduledPaymentChangeHistoryParams = {
        searchType,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        sortColumn: request.sortColumn,
        sortDirection: request.sortDirection,
        pageNumber: request.page,
        pageSize: request.pageSize
      };
      
      // Add conditional parameters based on search type
      if (searchType === ScheduledPaymentChangeHistorySearchType.MemberID) {
        params.memberID = memberID;
      } else if (searchType === ScheduledPaymentChangeHistorySearchType.RecurringPaymentID) {
        params.recurringPaymentID = recurringPaymentID;
      }
      
      // Call API
      const response = await getScheduledPaymentChangeHistory(params);
      return {
        items: response.items || [],
        pageNumber: response.pageNumber,
        totalCount: response.totalCount
      };
    } catch (error) {
      logger.error('Error fetching scheduled payment change history data for export:', error);
      throw error;
    }
  };
  
  // No longer need the useEffect hook for sort parameters as we're making the API call directly in handleSortChange
  
  // Define table columns for ReportTableV2
  const columns = [
    {
      key: 'memberID',
      label: 'Member ID',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.MemberID,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.memberID) || ''
    },
    {
      key: 'updatedBy',
      label: 'Updated By',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.UpdatedBy,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.updatedBy) || ''
    },
    {
      key: 'updatedOn',
      label: 'Updated On',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.UpdatedOn,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.updatedOn) || ''
    },
    {
      key: 'reason',
      label: 'Reason',
      sortable: false,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.reason) || ''
    },
    {
      key: 'changeType',
      label: 'Change Type',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.ChangeType,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.changeType) || ''
    },
    {
      key: 'recurringPaymentId',
      label: 'Recurring Payment ID',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.RecurringPaymentId,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.recurringPaymentId) || ''
    },
    {
      key: 'payeeName',
      label: 'Payee Name',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.PayeeName,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.payeeName) || ''
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.Amount,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.amount !== undefined) ? `$${item.amount.toFixed(2)}` : ''
    },
    {
      key: 'frequency',
      label: 'Frequency',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.Frequency,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.frequency) || ''
    },
    {
      key: 'active',
      label: 'Active',
      sortable: false,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.active) || ''
    },
    {
      key: 'nextProcessDate',
      label: 'Next Process Date',
      sortable: false,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.nextProcessDate) || ''
    }
  ];
  
  return (
    <ReportContainer
      title="Scheduled Payment Change History Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!data && data.items.length > 0}
    >
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1" gutterBottom>
              Search Type
            </Typography>
            <FormControl fullWidth>
              <Select
                value={searchType}
                onChange={handleSearchTypeChange}
              >
                {SCHEDULED_PAYMENT_CHANGE_HISTORY_SEARCH_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {searchType === ScheduledPaymentChangeHistorySearchType.DateRange && (
            <>
              <Grid item xs={12} md={4}>
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
              <Grid item xs={12} md={4}>
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
            </>
          )}
          
          {searchType === ScheduledPaymentChangeHistorySearchType.MemberID && (
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" gutterBottom>
                Member ID
              </Typography>
              <TextField
                fullWidth
                value={memberID}
                onChange={(e) => setMemberID(e.target.value)}
                error={!!formErrors.memberID}
                helperText={formErrors.memberID}
                variant="outlined"
              />
            </Grid>
          )}
          
          {searchType === ScheduledPaymentChangeHistorySearchType.RecurringPaymentID && (
            <Grid item xs={12} md={8}>
              <Typography variant="subtitle1" gutterBottom>
                Recurring Payment ID
              </Typography>
              <TextField
                fullWidth
                value={recurringPaymentID}
                onChange={(e) => setRecurringPaymentID(e.target.value)}
                error={!!formErrors.recurringPaymentID}
                helperText={formErrors.recurringPaymentID}
                variant="outlined"
              />
            </Grid>
          )}
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
          exportFileName={`scheduled-payment-change-history-${dayjs().format('YYYY-MM-DD')}`}
        />
      ) : !loading && !error && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No data to display. Please adjust your search criteria and try again.
        </Typography>
      )}
    </ReportContainer>
  );
};

export default ScheduledPaymentChangeHistoryReport;
