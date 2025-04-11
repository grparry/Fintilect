import React, { useState, useCallback, useEffect } from 'react';
import logger from '../../../../utils/logger';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import ReportContainer from '../components/ReportContainer';
import DateRangeSelector from '../components/DateRangeSelector';
import ReportTableV2 from '../components/ReportTableV2';
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

  // Handle page change for ReportTableV2
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
      setPageNumber(1); // Reset to first page when changing page size
      runReport(1, newPageSize);
    } else {
      setPageNumber(newPage);
      runReport(newPage, pageSize);
    }
  };

  // Handle sort change for ReportTableV2
  const handleSortChange = (newSortColumn: PaymentActivitySortColumn, newSortDirection: 'ASC' | 'DESC') => {
    logger.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    
    // Create params with the new sort values
    const params: PaymentActivityParams = {
      searchType,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    // Add conditional parameters based on search type
    if ([
      PaymentActivitySearchType.MemberID,
      PaymentActivitySearchType.MemberIDAndDate,
      PaymentActivitySearchType.MemberIDAndPayeeName,
      PaymentActivitySearchType.MemberIDAndDateAndPayeeName
    ].includes(searchType)) {
      params.memberID = memberId;
    }
    
    if ([
      PaymentActivitySearchType.PaymentID
    ].includes(searchType)) {
      params.paymentID = paymentId;
    }
    
    if ([
      PaymentActivitySearchType.PayeeName,
      PaymentActivitySearchType.MemberIDAndPayeeName,
      PaymentActivitySearchType.MemberIDAndDateAndPayeeName
    ].includes(searchType)) {
      params.payeeName = payeeName;
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
    
    logger.log('Making API call with params:', params);
    
    // Reset to page 1
    setPageNumber(1);
    
    // Call API directly with new sort parameters
    getPaymentActivity(params)
      .then(response => {
        logger.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setReportData(response.items || []);
        setTotalCount(response.totalCount);
      })
      .catch(error => {
        logger.error('Error sorting report:', error);
        setError('Failed to sort report. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
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
        params.memberID = memberId;
      }
      
      if (showPaymentId) {
        params.paymentID = paymentId;
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
        const mappedItems: PaymentActivityItem[] = result.items.map(apiItem => {
          return {
            id: apiItem.id || '',
            memberID: apiItem.memberID || '',
            paymentID: apiItem.paymentID || '',
            payeeID: apiItem.payeeID || '',
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
      logger.error('Error running payment activity report:', err);
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
        params.memberID = memberId;
      }
      
      if ([
        PaymentActivitySearchType.PaymentID
      ].includes(searchType)) {
        params.paymentID = paymentId;
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
      logger.log('Running report with parameters:', params);
      
      // Call the payment activity API
      const result: PaymentActivityItemPagedResponse = await getPaymentActivity(params);
      
      // Update state with response data
      if (result.items) {
        // Map API response properties to our interface
        const mappedItems: PaymentActivityItem[] = result.items.map(item => {
          // Use type assertion to handle API response format
          const apiItem = item as any;
          return {
            memberID: apiItem.memberID || null,
            paymentID: apiItem.paymentID || null,
            payeeID: apiItem.payeeID || null,
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
      logger.error('Error running payment activity report:', err);
      setError('Failed to load payment activity data. Please try again.');
    } finally {
      setLoading(false);
    }
  };





  // Define columns for the report table
  const columns = [
    {
      key: 'memberID',
      label: 'Member ID',
      sortable: true,
      sortKey: PaymentActivitySortColumn.MemberID
    },
    {
      key: 'paymentID',
      label: 'Payment ID',
      sortable: true,
      sortKey: PaymentActivitySortColumn.PaymentID
    },
    {
      key: 'payeeName',
      label: 'Payee Name',
      sortable: true,
      sortKey: PaymentActivitySortColumn.PayeeName
    },
    {
      key: 'dateProcessed',
      label: 'Date Processed',
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : '',
      sortable: true,
      sortKey: PaymentActivitySortColumn.DateProcessed
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : '',
      sortable: true,
      sortKey: PaymentActivitySortColumn.DueDate
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      sortKey: PaymentActivitySortColumn.Status
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (value: number) => value ? `$${value.toFixed(2)}` : '',
      sortable: true,
      sortKey: PaymentActivitySortColumn.Amount
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
          <ReportTableV2
            data={reportData}
            columns={columns}
            pagination={{
              pageNumber: pageNumber,
              totalCount: totalCount,
              onPageChange: handlePageChange
            }}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            enableExport={{
              getPagedData: async (request) => {
                // Build parameters for the API call
                const params: PaymentActivityParams = {
                  searchType,
                  pageNumber: request.page,
                  pageSize: request.pageSize,
                  sortColumn: request.sortColumn,
                  sortDirection: request.sortDirection
                };

                // Add conditional parameters based on search type
                if (showMemberId) {
                  params.memberID = memberId;
                }
                
                if (showPaymentId) {
                  params.paymentID = paymentId;
                }
                
                if (showDateRange) {
                  params.startDate = startDate.format('YYYY-MM-DD');
                  params.endDate = endDate.format('YYYY-MM-DD');
                }
                
                if (showPayeeName) {
                  params.payeeName = payeeName;
                }

                // Call the API
                const response = await getPaymentActivity(params);
                
                return {
                  items: response.items || [],
                  pageNumber: response.pageNumber,
                  totalCount: response.totalCount
                };
              },
              maxPageSize: 100
            }}
            exportFileName={`payment-activity-${dayjs().format('YYYY-MM-DD')}`}
          />
        ) : null}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default PaymentActivityReport;
