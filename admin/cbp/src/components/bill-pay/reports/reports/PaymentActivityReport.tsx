import React, { useState, useCallback, useEffect } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import ReportContainer from '../components/ReportContainer';
import DateRangeSelector from '../components/DateRangeSelector';
import ReportTable from '../components/ReportTable';
import { 
  PAYMENT_ACTIVITY_SEARCH_TYPES, 
  PaymentActivityParams,
  PaymentActivityItem,
  PaymentActivityItemPagedResponse,
  PaymentActivitySearchType,
  PaymentActivitySortColumn,
  getPaymentActivity
} from '../../../../utils/reports/paymentActivity';
import useClientApi from '../../../../hooks/useClientApi';

const PaymentActivityReport: React.FC = () => {
  // Indicate that this component uses client-specific API
  useClientApi(true);
  
  // State for report parameters
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [searchType, setSearchType] = useState<PaymentActivitySearchType>(PaymentActivitySearchType.DateRange);
  const [memberId, setMemberId] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [payeeName, setPayeeName] = useState<string>('');
  
  // State for sorting - default to dateProcessed DESC for initial sort
  const [sortColumn, setSortColumn] = useState<PaymentActivitySortColumn>(PaymentActivitySortColumn.DateProcessed);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  
  // State for report results
  const [reportData, setReportData] = useState<PaymentActivityItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as PaymentActivitySearchType);
    // Reset search values when changing search type
    setMemberId('');
    setPaymentId('');
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
    runReport(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageNumber(1); // Reset to first page when changing page size
    runReport(1, newPageSize);
  };

  // Handle sort change
  const handleSortChange = (columnKey: string) => {
    // Find the column definition to get the sortKey
    const columnDef = columns.find(col => col.key === columnKey);
    if (columnDef && columnDef.sortKey) {
      const newSortColumn = columnDef.sortKey;
      
      // If clicking the same column, toggle direction
      if (sortColumn === newSortColumn) {
        setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
      } else {
        setSortColumn(newSortColumn);
        setSortDirection('DESC'); // Initial sort is descending
      }
      
      // Reset to page 1 when sort changes
      if (pageNumber === 1) {
        runReport(1);
      } else {
        setPageNumber(1);
      }
    }
  };

  // Determine if search value field should be shown
  const showMemberId = [
    PaymentActivitySearchType.MemberID,
    PaymentActivitySearchType.MemberIDAndDate,
    PaymentActivitySearchType.MemberIDAndPayeeName,
    PaymentActivitySearchType.MemberIDAndDateAndPayeeName
  ].includes(searchType);

  const showPaymentId = [
    PaymentActivitySearchType.PaymentID
  ].includes(searchType);

  // Determine if date range should be shown
  const showDateRange = [
    PaymentActivitySearchType.DateRange,
    PaymentActivitySearchType.MemberIDAndDate,
    PaymentActivitySearchType.MemberIDAndDateAndPayeeName
  ].includes(searchType);

  // Determine if payee name field should be shown
  const showPayeeName = [
    PaymentActivitySearchType.PayeeName,
    PaymentActivitySearchType.MemberIDAndPayeeName,
    PaymentActivitySearchType.MemberIDAndDateAndPayeeName
  ].includes(searchType);

  // Run the payment activity report
  const runReport = useCallback(async (page: number = pageNumber, size: number = pageSize) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build report parameters
      const params: PaymentActivityParams = {
        searchType,
        pageNumber: page,
        pageSize: size,
        sortColumn,
        sortDirection
      };
      
      // Add conditional parameters based on search type
      if (showMemberId) {
        params.memberId = memberId;
      }
      
      if (showPaymentId) {
        params.paymentId = paymentId;
      }
      
      if (showDateRange) {
        params.startDate = startDate.format('YYYY-MM-DD');
        params.endDate = endDate.format('YYYY-MM-DD');
      }
      
      if (showPayeeName) {
        params.payeeName = payeeName;
      }
      
      // Call API
      const result = await getPaymentActivity(params);
      
      if (result && result.items) {
        // Map API response to UI model
        const mappedItems = result.items.map(apiItem => {
          return {
            id: apiItem.id || '',
            memberId: apiItem.memberId || '',
            paymentId: apiItem.paymentId || '',
            payeeId: apiItem.payeeId || '',
            payeeName: apiItem.payeeName || '',
            dateProcessed: apiItem.dateProcessed || '',
            dueDate: apiItem.dueDate || '',
            status: apiItem.status || '',
            paymentMethod: apiItem.paymentMethod || '',
            amount: typeof apiItem.amount === 'number' ? apiItem.amount : 0
          };
        });
        
        setReportData(mappedItems);
        setTotalCount(result.totalCount);
        setPageNumber(page);
      } else {
        setReportData([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error('Error running payment activity report:', err);
      setError('Failed to load payment activity data. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchType, memberId, paymentId, startDate, endDate, payeeName, sortColumn, sortDirection, pageSize, showMemberId, showPaymentId, showDateRange, showPayeeName]);

  // Effect to run report when sort parameters change
  useEffect(() => {
    if (reportData) {
      runReport(pageNumber);
    }
  }, [sortColumn, sortDirection]);

  // Helper function to run report with specific sort parameters
  const runReportWithSort = async (page: number, size: number, column: PaymentActivitySortColumn, direction: 'ASC' | 'DESC') => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate inputs based on search type
      if ([
        PaymentActivitySearchType.MemberID,
        PaymentActivitySearchType.MemberIDAndDate,
        PaymentActivitySearchType.MemberIDAndPayeeName,
        PaymentActivitySearchType.MemberIDAndDateAndPayeeName,
        PaymentActivitySearchType.PaymentID
      ].includes(searchType) && (!memberId && !paymentId)) {
        setError('Search value is required for the selected search type');
        setLoading(false);
        return;
      }
      
      if ([
        PaymentActivitySearchType.MemberIDAndPayeeName,
        PaymentActivitySearchType.MemberIDAndDateAndPayeeName,
        PaymentActivitySearchType.PayeeName
      ].includes(searchType) && !payeeName) {
        setError('Payee name is required for the selected search type');
        setLoading(false);
        return;
      }
      
      if ([
        PaymentActivitySearchType.DateRange,
        PaymentActivitySearchType.MemberIDAndDate,
        PaymentActivitySearchType.MemberIDAndDateAndPayeeName
      ].includes(searchType) && (!startDate || !endDate)) {
        setError('Date range is required for the selected search type');
        setLoading(false);
        return;
      }
      
      // Prepare report parameters
      const params: PaymentActivityParams = {
        searchType: searchType,
        pageNumber: page,
        pageSize: size,
        sortColumn: column,
        sortDirection: direction
      };
      
      // Add conditional parameters based on search type
      if ([
        PaymentActivitySearchType.MemberID,
        PaymentActivitySearchType.MemberIDAndDate,
        PaymentActivitySearchType.MemberIDAndPayeeName,
        PaymentActivitySearchType.MemberIDAndDateAndPayeeName
      ].includes(searchType)) {
        params.memberId = memberId;
      }
      
      if ([
        PaymentActivitySearchType.PaymentID
      ].includes(searchType)) {
        params.paymentId = paymentId;
      }
      
      // Always include date parameters for date-related search types
      if ([
        PaymentActivitySearchType.DateRange,
        PaymentActivitySearchType.MemberIDAndDate,
        PaymentActivitySearchType.MemberIDAndDateAndPayeeName
      ].includes(searchType)) {
        params.startDate = startDate.format('YYYY-MM-DD');
        params.endDate = endDate.format('YYYY-MM-DD');
      }
      
      // Always include payee name for payee-related search types
      if ([
        PaymentActivitySearchType.PayeeName,
        PaymentActivitySearchType.MemberIDAndPayeeName,
        PaymentActivitySearchType.MemberIDAndDateAndPayeeName
      ].includes(searchType)) {
        params.payeeName = payeeName;
      }
      
      // Debug log to verify parameters
      console.log('Running report with parameters:', params);
      
      // Call the payment activity API
      const result: PaymentActivityItemPagedResponse = await getPaymentActivity(params);
      
      // Update state with response data
      if (result.items) {
        // Map API response properties to our interface
        const mappedItems = result.items.map(item => {
          // Use type assertion to handle API response format
          const apiItem = item as any;
          return {
            memberId: apiItem.memberID || null,
            paymentId: apiItem.paymentID || null,
            payeeId: apiItem.payeeID || null,
            payeeName: apiItem.payeeName || null,
            dateProcessed: apiItem.dateProcessed || null,
            dueDate: apiItem.dueDate || null,
            status: apiItem.status ? apiItem.status.trim() : null,
            paymentMethod: apiItem.paymentMethod ? apiItem.paymentMethod.trim() : null,
            amount: typeof apiItem.amount === 'number' ? apiItem.amount : 0
          };
        });
        
        setReportData(mappedItems);
        setTotalCount(result.totalCount);
      } else {
        setReportData([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error('Error running payment activity report:', err);
      setError('Failed to load payment activity data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get sort icon for column
  const getSortIcon = (column: PaymentActivitySortColumn) => {
    if (sortColumn === column) {
      return sortDirection === 'ASC' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />;
    }
    return null;
  };

  // Export report data to CSV
  const handleExportCsv = useCallback(() => {
    if (!reportData || reportData.length === 0) return;
    
    // Define CSV columns
    const header = [
      'Member ID',
      'Payment ID',
      'Payee ID',
      'Payee Name',
      'Date Processed',
      'Due Date',
      'Status',
      'Payment Method',
      'Amount'
    ].join(',');
    
    // Convert data to CSV rows
    const rows = reportData.map(row => {
      return [
        row.memberId || '',
        row.paymentId || '',
        row.payeeId || '',
        row.payeeName ? `"${row.payeeName.replace(/"/g, '""')}"` : '',
        row.dateProcessed ? dayjs(row.dateProcessed).format('MM/DD/YYYY') : '',
        row.dueDate ? dayjs(row.dueDate).format('MM/DD/YYYY') : '',
        row.status || '',
        row.paymentMethod || '',
        row.amount ? row.amount.toFixed(2) : '0.00'
      ].join(',');
    });
    
    // Combine header and rows
    const csv = [header, ...rows].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `payment-activity-${dayjs().format('YYYY-MM-DD')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [reportData]);

  // Define columns for the report table
  const columns = [
    {
      key: 'memberId',
      label: 'Member ID',
      sortable: true,
      sortKey: PaymentActivitySortColumn.MemberID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === PaymentActivitySortColumn.MemberID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'paymentId',
      label: 'Payment ID',
      sortable: true,
      sortKey: PaymentActivitySortColumn.PaymentID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payment ID
          {sortColumn === PaymentActivitySortColumn.PaymentID && (
            sortDirection === 'ASC' ? 
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
      sortKey: PaymentActivitySortColumn.PayeeName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === PaymentActivitySortColumn.PayeeName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'dateProcessed',
      label: 'Date Processed',
      render: (value: string) => value || '',
      sortable: true,
      sortKey: PaymentActivitySortColumn.DateProcessed,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Date Processed
          {sortColumn === PaymentActivitySortColumn.DateProcessed && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (value: string) => value || '',
      sortable: true,
      sortKey: PaymentActivitySortColumn.DueDate,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Due Date
          {sortColumn === PaymentActivitySortColumn.DueDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      sortKey: PaymentActivitySortColumn.Status,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Status
          {sortColumn === PaymentActivitySortColumn.Status && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value: number) => value ? `$${value.toFixed(2)}` : '',
      sortable: true,
      sortKey: PaymentActivitySortColumn.Amount,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Amount
          {sortColumn === PaymentActivitySortColumn.Amount && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    }
  ];

  const handleRunReport = () => {
    runReport(1);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReportContainer
        title="Payment Activity Report"
        onRunReport={handleRunReport}
        onExportCsv={handleExportCsv}
        loading={loading}
        error={error}
        hasData={!!reportData && reportData.length > 0}
      >
        <Grid container spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={12} md={6} lg={3}>
            <FormControl fullWidth size="small" margin="dense">
              <InputLabel>Search Type</InputLabel>
              <Select
                value={searchType}
                label="Search Type"
                onChange={handleSearchTypeChange}
                size="small"
              >
                {Object.entries(PaymentActivitySearchType).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {PAYMENT_ACTIVITY_SEARCH_TYPES[value]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {showMemberId && (
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Member ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="Enter member ID"
              />
            </Grid>
          )}

          {showPaymentId && (
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Payment ID"
                value={paymentId}
                onChange={(e) => setPaymentId(e.target.value)}
                placeholder="Enter payment ID"
              />
            </Grid>
          )}

          {showPayeeName && (
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                fullWidth
                size="small"
                margin="dense"
                label="Payee Name"
                value={payeeName}
                onChange={(e) => setPayeeName(e.target.value)}
                placeholder="Enter payee name"
              />
            </Grid>
          )}
        </Grid>

        {showDateRange && (
          <DateRangeSelector
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        )}

        {reportData && reportData.length > 0 ? (
          <>
            <ReportTable
              data={reportData}
              columns={columns}
              onSort={handleSortChange}
              pagination={{
                pageNumber: pageNumber,
                pageSize: pageSize,
                totalCount: totalCount,
                onPageChange: handlePageChange,
                onPageSizeChange: handlePageSizeChange
              }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2">
                Showing {reportData.length} of {totalCount} results
              </Typography>
            </Box>
          </>
        ) : null}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default PaymentActivityReport;
