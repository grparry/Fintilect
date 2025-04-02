import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import {
  LargePaymentSortColumn,
  LARGE_PAYMENT_SORT_COLUMNS,
  LargePaymentParams,
  LargePaymentResponse,
  LargePaymentItem,
  getLargePayment
} from '../../../../utils/reports/largePayment';

/**
 * Large Payment Report Component
 * Displays large payments for a specific run date with sorting and pagination
 */
const LargePaymentReport: React.FC = () => {
  // State for form inputs
  const [runDate, setRunDate] = useState<Dayjs | null>(dayjs());
  
  // State for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  
  // State for sorting
  const [sortColumn, setSortColumn] = useState<LargePaymentSortColumn>(
    LargePaymentSortColumn.Amount
  );
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  
  // State for data
  const [data, setData] = useState<LargePaymentResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Column definitions for the report table
  const columns = [
    { 
      key: 'memberID', 
      label: 'Member ID',
      sortable: true,
      sortKey: LargePaymentSortColumn.MemberID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === LargePaymentSortColumn.MemberID && (
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
      sortKey: LargePaymentSortColumn.Amount,
      render: (value: number) => value ? `$${value.toFixed(2)}` : '$0.00',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Amount
          {sortColumn === LargePaymentSortColumn.Amount && (
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
      sortKey: LargePaymentSortColumn.PayeeName,
      render: (value: any) => value || 'N/A',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === LargePaymentSortColumn.PayeeName && (
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
      sortKey: LargePaymentSortColumn.Status,
      render: (value: any) => value || 'N/A',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Status
          {sortColumn === LargePaymentSortColumn.Status && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    }
  ];

  /**
   * Run report with current parameters
   * @param page Page number to fetch
   */
  const runReport = async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build parameters
      const params: LargePaymentParams = {
        runDate: runDate ? runDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
        pageNumber: page,
        pageSize,
        sortColumn,
        sortDirection
      };
      
      // Call API
      const response = await getLargePayment(params);
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
    // Find the column definition to get the sortKey
    const columnDef = columns.find(col => col.key === column);
    if (columnDef && columnDef.sortKey) {
      const newSortColumn = columnDef.sortKey;
      
      // If clicking the same column, toggle direction
      if (sortColumn === newSortColumn) {
        setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
      } else {
        setSortColumn(newSortColumn);
        setSortDirection('ASC');
      }
    }
  };

  // Run report when sort parameters change
  useEffect(() => {
    if (data) {
      runReport(pageNumber);
    }
  }, [sortColumn, sortDirection]);

  /**
   * Export data as CSV
   */
  const handleExportCsv = () => {
    if (!data || !data.items.length) return;
    
    // Format data for CSV
    const csvContent = [
      // Header row
      ['Member ID', 'Amount', 'Payee Name', 'Status'].join(','),
      // Data rows
      ...data.items.map(item => [
        item.memberID || '',
        item.amount ? `$${item.amount.toFixed(2)}` : '$0.00',
        item.payeeName || '',
        item.status || ''
      ].join(','))
    ].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `large-payments-${runDate ? runDate.format('YYYY-MM-DD') : 'report'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <ReportContainer
        title="Large Payment Report"
        onRunReport={handleSubmit}
        onExportCsv={data && data.items.length > 0 ? handleExportCsv : undefined}
        loading={loading}
        error={error}
        hasData={!!data && data.items.length > 0}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Run Date
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={runDate}
                  onChange={(newValue) => setRunDate(newValue)}
                  format="MM/DD/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      InputLabelProps: { shrink: true }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </form>

        {data && data.items.length > 0 && (
          <ReportTable
            data={data.items}
            columns={columns}
            pagination={{
              pageNumber: data.pageNumber,
              pageSize: data.pageSize,
              totalCount: data.totalCount,
              onPageChange: handlePageChange,
              onPageSizeChange: setPageSize
            }}
            onSort={handleSortChange}
          />
        )}
      </ReportContainer>
    </Box>
  );
};

export default LargePaymentReport;
