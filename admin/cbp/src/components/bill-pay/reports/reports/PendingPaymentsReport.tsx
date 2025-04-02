import React, { useState, useEffect, useCallback } from 'react';
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
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
      sortKey: PendingPaymentsSortColumn.PaymentID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payment ID
          {sortColumn === PendingPaymentsSortColumn.PaymentID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'recurringID', 
      label: 'Recurring ID',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.RecurringID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Recurring ID
          {sortColumn === PendingPaymentsSortColumn.RecurringID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'memberID', 
      label: 'Member ID',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.MemberID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === PendingPaymentsSortColumn.MemberID && (
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
      sortKey: PendingPaymentsSortColumn.PayeeName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === PendingPaymentsSortColumn.PayeeName && (
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
      sortable: true,
      sortKey: PendingPaymentsSortColumn.Amount,
      render: (value: any) => `$${(value as number).toFixed(2)}`,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Amount
          {sortColumn === PendingPaymentsSortColumn.Amount && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'willProcessDate', 
      label: 'Process Date',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.WillProcessDate,
      render: (value: any) => dayjs(value as string).format('MM/DD/YYYY'),
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Process Date
          {sortColumn === PendingPaymentsSortColumn.WillProcessDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'deliveryDate', 
      label: 'Delivery Date',
      sortable: true,
      sortKey: PendingPaymentsSortColumn.DeliveryDate,
      render: (value: any) => value ? dayjs(value as string).format('MM/DD/YYYY') : 'N/A',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Delivery Date
          {sortColumn === PendingPaymentsSortColumn.DeliveryDate && (
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
   * Handle page change
   * @param page New page number
   */
  const handlePageChange = (page: number) => {
    setPageNumber(page);
    runReport(page);
  };

  /**
   * Handle sort change
   * @param columnKey Column key to sort by
   */
  const handleSort = (columnKey: string) => {
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
          onSort={handleSort}
        />
      )}
    </ReportContainer>
  );
};

export default PendingPaymentsReport;
