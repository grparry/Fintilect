import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
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
      sortKey: LargePaymentSortColumn.MemberID
    },
    { 
      key: 'amount', 
      label: 'Amount',
      sortable: true,
      sortKey: LargePaymentSortColumn.Amount,
      render: (value: number) => value ? `$${value.toFixed(2)}` : '$0.00'
    },
    { 
      key: 'payeeName', 
      label: 'Payee Name',
      sortable: true,
      sortKey: LargePaymentSortColumn.PayeeName,
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'status', 
      label: 'Status',
      sortable: true,
      sortKey: LargePaymentSortColumn.Status,
      render: (value: any) => value || 'N/A'
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
   * @param newPageSize Optional new page size
   */
  const handlePageChange = (page: number, newPageSize?: number) => {
    setPageNumber(page);
    if (newPageSize !== undefined) {
      setPageSize(newPageSize);
    }
    runReport(page);
  };

  /**
   * Handle sort change for ReportTableV2
   * @param newSortColumn Column to sort by
   * @param newSortDirection Sort direction
   */
  const handleSortChange = (newSortColumn: LargePaymentSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    console.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Validate required parameters
    if (!runDate) {
      setError('Please select a run date');
      return;
    }
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Create params with the new sort values
    const params: LargePaymentParams = {
      runDate: runDate.format('YYYY-MM-DD'),
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize: pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    console.log('Making API call with params:', params);
    
    // Reset to page 1
    setPageNumber(1);
    
    // Call API directly with new sort parameters
    getLargePayment(params)
      .then(response => {
        console.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setData(response);
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



  return (
    <Box>
      <ReportContainer
        title="Large Payment Report"
        onRunReport={handleSubmit}
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
          <ReportTableV2
            data={data.items}
            columns={columns}
            pagination={{
              pageNumber: data.pageNumber,
              totalCount: data.totalCount,
              onPageChange: handlePageChange
            }}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            enableExport={{
              getPagedData: async (request) => {
                const params = {
                  runDate: runDate ? runDate.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
                  pageNumber: request.page,
                  pageSize: request.pageSize,
                  sortColumn: request.sortColumn,
                  sortDirection: request.sortDirection
                };
                
                const response = await getLargePayment(params);
                return {
                  items: response.items,
                  pageNumber: response.pageNumber,
                  totalCount: response.totalCount
                };
              },
              maxPageSize: 100
            }}
            exportFileName={`large-payments-${runDate ? runDate.format('YYYY-MM-DD') : 'report'}`}
          />
        )}
      </ReportContainer>
    </Box>
  );
};

export default LargePaymentReport;
