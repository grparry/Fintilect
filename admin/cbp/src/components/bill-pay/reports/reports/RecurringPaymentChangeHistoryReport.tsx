import React, { useState } from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
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
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Column definitions for the report table
  const columns = [
    { 
      key: 'recurringPaymentId', 
      label: 'Recurring Payment ID',
      sortable: true
    },
    { 
      key: 'memberID', 
      label: 'Member ID',
      sortable: true
    },
    { 
      key: 'payeeName', 
      label: 'Payee Name',
      sortable: true
    },
    { 
      key: 'updatedOn', 
      label: 'Updated On',
      sortable: true,
      render: (value: any) => value ? dayjs(value).format('MM/DD/YYYY') : 'N/A'
    },
    { 
      key: 'changeType', 
      label: 'Change Type',
      sortable: true
    },
    { 
      key: 'updatedBy', 
      label: 'Updated By',
      sortable: true
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
      render: (value: any) => value ? `$${value.toFixed(2)}` : 'N/A'
    },
    { 
      key: 'frequency', 
      label: 'Frequency',
      sortable: true,
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
   * Handle page change
   * @param page New page number
   */
  const handlePageChange = (page: number) => {
    setPageNumber(page);
    runReport(page);
  };

  /**
   * Handle sort change
   * @param column Column to sort by
   */
  const handleSortChange = (column: string) => {
    if (column in RecurringPaymentChangeHistorySortColumn) {
      const newSortColumn = column as RecurringPaymentChangeHistorySortColumn;
      
      // If clicking the same column, toggle direction
      if (sortColumn === newSortColumn) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        // Default to descending for date columns, ascending for others
        const isDateColumn = newSortColumn === RecurringPaymentChangeHistorySortColumn.UpdatedOn;
        setSortDirection(isDateColumn ? 'desc' : 'asc');
        setSortColumn(newSortColumn);
      }
      
      // Re-run report with new sort
      runReport(pageNumber);
    }
  };

  /**
   * Export data as CSV
   */
  const handleExportCsv = () => {
    if (!data || !data.items.length) return;
    
    // Create CSV header row
    const headers = columns.map(col => col.label);
    const csvContent = [headers.join(',')];
    
    // Add data rows
    data.items.forEach(item => {
      const row = columns.map(col => {
        const key = col.key as keyof RecurringPaymentChangeHistoryItem;
        const value = item[key];
        
        // Format value if render function exists
        if (col.render && value !== undefined) {
          return `"${col.render(value).toString().replace(/"/g, '""')}"`;
        }
        
        // Handle different value types
        if (value === undefined || value === null) {
          return '';
        } else if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        } else {
          return `"${value}"`;
        }
      });
      
      csvContent.push(row.join(','));
    });
    
    // Create and download CSV file
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `recurring-payment-change-history-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      onExportCsv={handleExportCsv}
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
          <ReportTable
            columns={columns}
            data={data.items}
            pagination={{
              pageNumber: data.pageNumber,
              pageSize: data.pageSize,
              totalCount: data.totalCount,
              onPageChange: handlePageChange,
              onPageSizeChange: (newPageSize) => setPageSize(newPageSize)
            }}
            onSort={handleSortChange}
          />
        </Box>
      )}
    </ReportContainer>
  );
};

export default RecurringPaymentChangeHistoryReport;
