import React, { useState, useEffect } from 'react';
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import {
  RecurringPaymentChangeHistorySearchType,
  RECURRING_PAYMENT_CHANGE_HISTORY_SEARCH_TYPES,
  RecurringPaymentChangeHistorySortColumn,
  RECURRING_PAYMENT_CHANGE_HISTORY_SORT_COLUMNS,
  RecurringPaymentChangeHistoryParams,
  RecurringPaymentChangeHistoryResponse,
  RecurringPaymentChangeHistoryItem,
  getRecurringPaymentChangeHistory
} from '../../../../utils/reports/recurringPaymentChangeHistory';

const RecurringPaymentChangeHistoryReport: React.FC = () => {
  // State for search parameters
  const [searchType, setSearchType] = useState<RecurringPaymentChangeHistorySearchType>(
    RecurringPaymentChangeHistorySearchType.MemberID
  );
  const [recurringPaymentID, setRecurringPaymentID] = useState<string>('');
  const [memberID, setMemberID] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  
  // State for sorting
  const [sortColumn, setSortColumn] = useState<RecurringPaymentChangeHistorySortColumn>(
    RecurringPaymentChangeHistorySortColumn.UpdatedOn
  );
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');

  // Column definitions for the report table
  const columns = [
    { 
      key: 'recurringPaymentId', 
      label: 'Recurring Payment ID',
      sortable: true,
      sortKey: RecurringPaymentChangeHistorySortColumn.RecurringPaymentId
    },
    { 
      key: 'memberID', 
      label: 'Member ID',
      sortable: true,
      sortKey: RecurringPaymentChangeHistorySortColumn.MemberID
    },
    { 
      key: 'payeeName', 
      label: 'Payee Name',
      sortable: true,
      sortKey: RecurringPaymentChangeHistorySortColumn.PayeeName
    },
    { 
      key: 'updatedOn', 
      label: 'Updated On',
      sortable: true,
      sortKey: RecurringPaymentChangeHistorySortColumn.UpdatedOn,
      render: (value: any) => value ? dayjs(value).format('MM/DD/YYYY') : 'N/A'
    },
    { 
      key: 'changeType', 
      label: 'Change Type',
      sortable: true,
      sortKey: RecurringPaymentChangeHistorySortColumn.ChangeType
    },
    { 
      key: 'updatedBy', 
      label: 'Updated By',
      sortable: true,
      sortKey: RecurringPaymentChangeHistorySortColumn.UpdatedBy
    },
    { 
      key: 'fieldName', 
      label: 'Field Name',
      sortable: false,
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'oldValue', 
      label: 'Old Value',
      sortable: false,
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'newValue', 
      label: 'New Value',
      sortable: false,
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'amount', 
      label: 'Amount',
      sortable: true,
      sortKey: RecurringPaymentChangeHistorySortColumn.Amount,
      render: (value: any) => value ? `$${value.toFixed(2)}` : 'N/A'
    },
    { 
      key: 'frequency', 
      label: 'Frequency',
      sortable: true,
      sortKey: RecurringPaymentChangeHistorySortColumn.Frequency,
      render: (value: any) => value || 'N/A'
    }
  ];

  // State for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  
  // State for report data
  const [data, setData] = useState<RecurringPaymentChangeHistoryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Run report when sort parameters change
  useEffect(() => {
    if (data) {
      runReport(pageNumber);
    }
  }, [sortColumn, sortDirection]);

  /**
   * Format date as YYYY-MM-DD
   */
  const formatDate = (date: Dayjs): string => {
    return date.format('YYYY-MM-DD');
  };

  /**
   * Run the report with the current parameters
   * @param page Page number to fetch
   */
  const runReport = async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build parameters based on search type
      const params: RecurringPaymentChangeHistoryParams = {
        searchType,
        pageNumber: page,
        pageSize,
        sortColumn,
        sortDirection
      };
      
      // Add parameters based on search type
      switch (searchType) {
        case RecurringPaymentChangeHistorySearchType.DateRange:
          params.startDate = formatDate(startDate);
          params.endDate = formatDate(endDate);
          break;
        case RecurringPaymentChangeHistorySearchType.RecurringPaymentID:
          if (!recurringPaymentID) {
            throw new Error('Recurring Payment ID is required');
          }
          params.recurringPaymentID = recurringPaymentID;
          params.startDate = formatDate(startDate);
          params.endDate = formatDate(endDate);
          break;
        case RecurringPaymentChangeHistorySearchType.MemberID:
          if (!memberID) {
            throw new Error('Member ID is required');
          }
          params.memberID = memberID;
          params.startDate = formatDate(startDate);
          params.endDate = formatDate(endDate);
          break;
      }
      
      // Call API
      const response = await getRecurringPaymentChangeHistory(params);
      setData(response);
      setPageNumber(response.pageNumber);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle form submission
   * @param event Form event
   */
  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    runReport(1);
  };

  /**
   * Handle page change for ReportTableV2
   * @param page New page number
   * @param newPageSize New page size
   */
  const handlePageChange = (page: number, newPageSize: number) => {
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
    setPageNumber(page);
    runReport(page);
  };

  /**
   * Handle sort change for ReportTableV2
   * @param newSortColumn Column to sort by
   * @param newSortDirection Sort direction
   */
  const handleSortChange = (newSortColumn: RecurringPaymentChangeHistorySortColumn, newSortDirection: 'ASC' | 'DESC') => {
    console.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Create params with the new sort values
    const params: RecurringPaymentChangeHistoryParams = {
      searchType,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize: pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    // Add parameters based on search type
    const formatDate = (date: Dayjs | null) => date ? date.format('YYYY-MM-DD') : '';
    
    switch (searchType) {
      case RecurringPaymentChangeHistorySearchType.DateRange:
        params.startDate = formatDate(startDate);
        params.endDate = formatDate(endDate);
        break;
      case RecurringPaymentChangeHistorySearchType.RecurringPaymentID:
        if (!recurringPaymentID) {
          setError('Recurring Payment ID is required');
          setLoading(false);
          return;
        }
        params.recurringPaymentID = recurringPaymentID;
        params.startDate = formatDate(startDate);
        params.endDate = formatDate(endDate);
        break;
      case RecurringPaymentChangeHistorySearchType.MemberID:
        if (!memberID) {
          setError('Member ID is required');
          setLoading(false);
          return;
        }
        params.memberID = memberID;
        params.startDate = formatDate(startDate);
        params.endDate = formatDate(endDate);
        break;
    }
    
    console.log('Making API call with params:', params);
    
    // Reset to page 1
    setPageNumber(1);
    
    // Call API directly with new sort parameters
    getRecurringPaymentChangeHistory(params)
      .then(response => {
        console.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setData(response);
        setPageNumber(response.pageNumber);
      })
      .catch(error => {
        console.error('Error sorting report:', error);
        setError(error instanceof Error ? error.message : 'Failed to sort report. Please try again.');
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Function to get paged data for CSV export
   * @param request Export request parameters
   * @returns Promise with paged data
   */
  const getPagedData = async (request: { page: number; pageSize: number; sortColumn: RecurringPaymentChangeHistorySortColumn; sortDirection: 'ASC' | 'DESC' }) => {
    try {
      // Build parameters based on search type
      const params: RecurringPaymentChangeHistoryParams = {
        searchType,
        pageNumber: request.page,
        pageSize: request.pageSize,
        sortColumn: request.sortColumn,
        sortDirection: request.sortDirection
      };
      
      // Add parameters based on search type
      switch (searchType) {
        case RecurringPaymentChangeHistorySearchType.DateRange:
          params.startDate = formatDate(startDate);
          params.endDate = formatDate(endDate);
          break;
        case RecurringPaymentChangeHistorySearchType.RecurringPaymentID:
          if (!recurringPaymentID) {
            throw new Error('Recurring Payment ID is required');
          }
          params.recurringPaymentID = recurringPaymentID;
          params.startDate = formatDate(startDate);
          params.endDate = formatDate(endDate);
          break;
        case RecurringPaymentChangeHistorySearchType.MemberID:
          if (!memberID) {
            throw new Error('Member ID is required');
          }
          params.memberID = memberID;
          params.startDate = formatDate(startDate);
          params.endDate = formatDate(endDate);
          break;
      }
      
      // Call API
      const response = await getRecurringPaymentChangeHistory(params);
      return {
        items: response.items || [],
        pageNumber: response.pageNumber,
        totalCount: response.totalCount
      };
    } catch (error) {
      console.error('Error fetching recurring payment change history data for export:', error);
      throw error;
    }
  };

  // Render search form based on search type
  const renderSearchForm = () => {
    return (
      <Grid container spacing={3}>
        {/* Date Range Pickers - Always visible for all search types */}
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => newValue && setStartDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => newValue && setEndDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        
        {/* Conditional Fields based on search type */}
        {searchType === RecurringPaymentChangeHistorySearchType.RecurringPaymentID && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Recurring Payment ID"
              value={recurringPaymentID}
              onChange={(e) => setRecurringPaymentID(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}
        
        {searchType === RecurringPaymentChangeHistorySearchType.MemberID && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Member ID"
              value={memberID}
              onChange={(e) => setMemberID(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}
      </Grid>
    );
  };

  return (
    <ReportContainer
      title="Recurring Payment Change History Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!data?.items.length}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Search Type */}
          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Search Type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as RecurringPaymentChangeHistorySearchType)}
            >
              {Object.entries(RECURRING_PAYMENT_CHANGE_HISTORY_SEARCH_TYPES).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          {/* Dynamic search fields based on search type */}
          <Grid item xs={12}>
            {renderSearchForm()}
          </Grid>
        </Grid>
      </Box>
      
      {/* Results Table */}
      {data && data.items.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Results
          </Typography>
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
            exportFileName={`recurring-payment-change-history-${dayjs().format('YYYY-MM-DD')}`}
          />
        </Box>
      )}
    </ReportContainer>
  );
};

export default RecurringPaymentChangeHistoryReport;
