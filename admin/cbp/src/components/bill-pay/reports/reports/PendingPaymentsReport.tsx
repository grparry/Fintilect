import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import {
  PendingPaymentsSortColumn,
  PENDING_PAYMENTS_SORT_COLUMNS,
  PendingPaymentsParams,
  PendingPaymentsResponse,
  PendingPaymentsItem,
  getPendingPayments
} from '../../../../utils/reports/pendingPayments';

const PendingPaymentsReport: React.FC = () => {
  // State for search parameters
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  
  // State for sorting
  const [sortColumn, setSortColumn] = useState<PendingPaymentsSortColumn>(PendingPaymentsSortColumn.WillProcessDate);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');

  // Column definitions for the report table
  const columns = [
    { 
      key: 'paymentID', 
      label: 'Payment ID',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.PaymentID
    },
    { 
      key: 'recurringID', 
      label: 'Recurring ID',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.RecurringID
    },
    { 
      key: 'memberID', 
      label: 'Member ID',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.MemberID
    },
    { 
      key: 'payeeName', 
      label: 'Payee Name',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.PayeeName
    },
    { 
      key: 'amount', 
      label: 'Amount',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.Amount,
      render: (value: any) => `$${(value as number).toFixed(2)}`
    },
    { 
      key: 'willProcessDate', 
      label: 'Process Date',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.WillProcessDate,
      render: (value: any) => dayjs(value as string).format('MM/DD/YYYY')
    },
    { 
      key: 'deliveryDate', 
      label: 'Delivery Date',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.DeliveryDate,
      render: (value: any) => value ? dayjs(value as string).format('MM/DD/YYYY') : 'N/A'
    },
    { 
      key: 'status', 
      label: 'Status',
      sortable: false
    }
  ];

  // State for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  
  // State for report data
  const [data, setData] = useState<PendingPaymentsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Run report when sort parameters change
  useEffect(() => {
    if (data) {
      runReport(pageNumber);
    }
  }, [sortColumn, sortDirection]);

  /**
   * Run the report with the current parameters
   * @param page Page number to fetch
   */
  const runReport = async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build parameters
      const params: PendingPaymentsParams = {
        date: selectedDate.format('YYYY-MM-DD'),
        pageNumber: page,
        pageSize,
        sortColumn,
        sortDirection
      };
      
      // Call API
      const response = await getPendingPayments(params);
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
  const handleSortChange = (newSortColumn: PendingPaymentsSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    console.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Create params with the new sort values
    const params: PendingPaymentsParams = {
      date: selectedDate.format('YYYY-MM-DD'),
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize: pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    console.log('Making API call with params:', params);
    
    // Reset to page 1
    setPageNumber(1);
    
    // Call API directly with new sort parameters
    getPendingPayments(params)
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
   * @param request Page request parameters
   * @returns Promise with paged response
   */
  const getPagedData = async (request: { page: number; pageSize: number; sortColumn: PendingPaymentsSortColumn; sortDirection: 'ASC' | 'DESC' }) => {
    try {
      // Prepare request parameters
      const params: PendingPaymentsParams = {
        date: selectedDate.format('YYYY-MM-DD'),
        pageNumber: request.page,
        pageSize: request.pageSize,
        sortColumn: request.sortColumn,
        sortDirection: request.sortDirection
      };
      
      // Call API
      const response = await getPendingPayments(params);
      return {
        items: response.items || [],
        pageNumber: response.pageNumber,
        totalCount: response.totalCount
      };
    } catch (error) {
      console.error('Error fetching pending payments data for export:', error);
      throw error;
    }
  };

  return (
    <ReportContainer
      title="Pending Payments Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!data && data.items.length > 0}
    >
      {/* Search Form */}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <Typography variant="h6">Search Parameters</Typography>
          </Grid>
          
          {/* Date Selector */}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newValue) => newValue && setSelectedDate(newValue)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </form>

      {/* Results Table */}
      {data && data.items.length > 0 && (
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
          exportFileName={`pending-payments-${dayjs().format('YYYY-MM-DD')}`}
        />
      )}
    </ReportContainer>
  );
};

export default PendingPaymentsReport;
