import React, { useState, useEffect } from 'react';
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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
import ReportTable from '../components/ReportTable';

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
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
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
      console.error('Error fetching scheduled payment change history data:', err);
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
  
  // Handle export to CSV
  const handleExportCsv = () => {
    if (!data || !data.items.length) return;
    
    // Format data for CSV
    const csvContent = [
      // Header row
      ['Member ID', 'Updated By', 'Updated On', 'Reason', 'Change Type', 'Recurring Payment ID', 
       'Payee Name', 'Amount', 'Frequency', 'Active', 'Next Process Date'].join(','),
      // Data rows
      ...data.items.map(item => [
        item.memberID || '',
        item.updatedBy || '',
        item.updatedOn || '',
        item.reason || '',
        item.changeType || '',
        item.recurringPaymentId || '',
        item.payeeName || '',
        item.amount || '',
        item.frequency || '',
        item.active || '',
        item.nextProcessDate || ''
      ].join(','))
    ].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `scheduled-payment-change-history-${dayjs().format('YYYY-MM-DD')}.csv`);
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
      key: 'memberID',
      label: 'Member ID',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.MemberID,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.memberID) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === ScheduledPaymentChangeHistorySortColumn.MemberID && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'updatedBy',
      label: 'Updated By',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.UpdatedBy,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.updatedBy) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Updated By
          {sortColumn === ScheduledPaymentChangeHistorySortColumn.UpdatedBy && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'updatedOn',
      label: 'Updated On',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.UpdatedOn,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.updatedOn) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Updated On
          {sortColumn === ScheduledPaymentChangeHistorySortColumn.UpdatedOn && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'changeType',
      label: 'Change Type',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.ChangeType,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.changeType) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Change Type
          {sortColumn === ScheduledPaymentChangeHistorySortColumn.ChangeType && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'recurringPaymentId',
      label: 'Recurring Payment ID',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.RecurringPaymentId,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.recurringPaymentId) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Recurring Payment ID
          {sortColumn === ScheduledPaymentChangeHistorySortColumn.RecurringPaymentId && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'payeeName',
      label: 'Payee Name',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.PayeeName,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.payeeName) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === ScheduledPaymentChangeHistorySortColumn.PayeeName && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.Amount,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.amount !== undefined) ? `$${item.amount.toFixed(2)}` : '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Amount
          {sortColumn === ScheduledPaymentChangeHistorySortColumn.Amount && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'frequency',
      label: 'Frequency',
      sortable: true,
      sortKey: ScheduledPaymentChangeHistorySortColumn.Frequency,
      render: (value: any, item: ScheduledPaymentChangeHistoryItem) => (item && item.frequency) || '',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Frequency
          {sortColumn === ScheduledPaymentChangeHistorySortColumn.Frequency && (
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
      title="Scheduled Payment Change History Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!data && data.items.length > 0}
      onExportCsv={data && data.items.length > 0 ? handleExportCsv : undefined}
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

export default ScheduledPaymentChangeHistoryReport;
