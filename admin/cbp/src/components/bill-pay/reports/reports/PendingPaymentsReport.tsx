import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
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
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Column definitions for the report table
  const columns = [
    { 
      key: 'paymentID', 
      label: 'Payment ID',
      sortable: true
    },
    { 
      key: 'recurringID', 
      label: 'Recurring ID',
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
      key: 'amount', 
      label: 'Amount',
      sortable: true,
      render: (value: any) => `$${(value as number).toFixed(2)}`
    },
    { 
      key: 'willProcessDate', 
      label: 'Process Date',
      sortable: true,
      render: (value: any) => dayjs(value as string).format('MM/DD/YYYY')
    },
    { 
      key: 'deliveryDate', 
      label: 'Delivery Date',
      sortable: true,
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
    // Map the column key to the sort column enum
    const columnToSortFieldMap: Record<string, PendingPaymentsSortColumn> = {
      'paymentID': PendingPaymentsSortColumn.PaymentID,
      'recurringID': PendingPaymentsSortColumn.RecurringID,
      'memberID': PendingPaymentsSortColumn.MemberID,
      'payeeName': PendingPaymentsSortColumn.PayeeName,
      'amount': PendingPaymentsSortColumn.Amount,
      'willProcessDate': PendingPaymentsSortColumn.WillProcessDate,
      'deliveryDate': PendingPaymentsSortColumn.DeliveryDate
    };
    
    const sortField = columnToSortFieldMap[column];
    if (sortField) {
      // If already sorting by this column, toggle direction
      if (sortColumn === sortField) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        // Otherwise, set new sort column and default to ascending
        setSortColumn(sortField);
        setSortDirection('asc');
      }
      // Refresh report with new sort
      runReport(1);
    }
  };

  /**
   * Handle CSV export
   */
  const handleExportCsv = () => {
    if (!data || !data.items.length) return;

    // Prepare CSV content
    const headers = columns.map(col => col.label).join(',');
    const rows = data.items.map(item => {
      return columns.map(col => {
        const value = item[col.key as keyof PendingPaymentsItem];
        // Format if renderer exists
        if (col.render && typeof col.render === 'function') {
          return String(col.render(value));
        }
        return value !== undefined ? value : '';
      }).join(',');
    }).join('\n');

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Create download link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `pending-payments-${dayjs().format('YYYY-MM-DD')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <ReportContainer
      title="Pending Payments Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!data && data.items.length > 0}
      onExportCsv={handleExportCsv}
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
        <ReportTable<PendingPaymentsItem>
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
      )}
    </ReportContainer>
  );
};

export default PendingPaymentsReport;
