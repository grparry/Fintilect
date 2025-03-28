import React, { useState, useCallback } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Pagination, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import { 
  BILL_PAY_SEARCH_TYPES, 
  BILL_PAY_REPORT_TYPES,
  BillPaySearchType,
  BillPayReportType,
  BillPaySearchSortColumn,
  BillPaySearchParams,
  BillPaySearchItem,
  getBillPaySearch 
} from '../../../../utils/reports/billPaySearch';
import useClientApi from '../../../../hooks/useClientApi';

const DEFAULT_PAGE_SIZE = 20;

const BillPaySearchReport: React.FC = () => {
  // Indicate that this component uses client-specific API
  useClientApi(true);
  
  // State for report parameters
  const [searchType, setSearchType] = useState<BillPaySearchType>(BillPaySearchType.Member);
  const [reportType, setReportType] = useState<BillPayReportType>(BillPayReportType.PaymentHistory);
  const [id, setId] = useState<string>('');
  const [days, setDays] = useState<number | null>(30);
  const [page, setPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<BillPaySearchSortColumn | undefined>(undefined);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  
  // State for report results
  const [reportData, setReportData] = useState<BillPaySearchItem[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as BillPaySearchType);
    // Reset search values when changing search type
    setId('');
  };

  // Handle ID input change
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  // Handle days input change
  const handleDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseInt(event.target.value, 10) : null;
    setDays(value);
  };

  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    runReport(value);
  };

  // Handle sort change
  const handleSortChange = (column: string) => {
    if (sortColumn === column) {
      // Toggle sort direction if clicking the same column
      setSortDirection(sortDirection === 'ASC' ? 'DESC' : 'ASC');
    } else {
      // Set new sort column and default to ASC
      setSortColumn(column as BillPaySearchSortColumn);
      setSortDirection('ASC');
    }
    // Run report with new sort settings
    runReport(1);
  };

  // Run the report
  const runReport = useCallback(async (pageNumber: number = 1) => {
    if (!id) {
      setError('Please enter an ID value');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params: BillPaySearchParams = {
        searchType: searchType,
        id: id,
        days: days,
        reportType: reportType,
        sortColumn: sortColumn,
        pageNumber: page,
        pageSize: DEFAULT_PAGE_SIZE,
        sortDirection: sortDirection
      };

      const response = await getBillPaySearch(params);
      
      setReportData(response.items || []);
      setTotalPages(response.totalPages);
      setTotalCount(response.totalCount);
      setPage(pageNumber);
    } catch (err) {
      console.error('Error fetching BillPay search data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching the report');
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [searchType, id, days, reportType, sortColumn, sortDirection]);

  // Handle report type change
  const handleReportTypeChange = (event: SelectChangeEvent) => {
    setReportType(event.target.value as BillPayReportType);
  };

  // Export report data to CSV
  const handleExportCsv = useCallback(() => {
    if (!reportData || reportData.length === 0) return;
    
    // Define CSV columns
    const header = [
      'paymentID', 'memberID', 'amount', 'dateProcessed', 'status',
      'payeeID', 'accountAtPayee', 'paymentMethod', 'memberFirstName',
      'memberLastName', 'memberEmail'
    ].join(',');
    
    // Convert data to CSV rows
    const rows = reportData.map(row => {
      return [
        row.paymentID || '',
        row.memberID || '',
        row.amount || 0,
        row.dateProcessed ? dayjs(row.dateProcessed).format('MM/DD/YYYY') : '',
        row.status || '',
        row.payeeID || '',
        row.accountAtPayee || '',
        row.paymentMethod || '',
        row.memberFirstName || '',
        row.memberLastName || '',
        row.memberEmail || ''
      ].join(',');
    });
    
    // Combine header and rows
    const csv = [header, ...rows].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `billpay-search-${dayjs().format('YYYY-MM-DD')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [reportData]);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    runReport(1); // Reset to first page when submitting new search
  };

  // Define columns for the report table
  const columns = [
    { 
      key: 'paymentID', 
      label: 'Payment ID', 
      sortable: true 
    },
    { 
      key: 'memberID', 
      label: 'Member ID', 
      sortable: true 
    },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      render: (value: number) => value ? `$${value.toFixed(2)}` : '$0.00'
    },
    { 
      key: 'dateProcessed', 
      label: 'Date Processed', 
      sortable: true,
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY') : ''
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true 
    },
    { 
      key: 'payeeID', 
      label: 'Payee ID', 
      sortable: false 
    },
    { 
      key: 'accountAtPayee', 
      label: 'Account At Payee', 
      sortable: false 
    },
    { 
      key: 'paymentMethod', 
      label: 'Payment Method', 
      sortable: false 
    }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReportContainer
        title="BillPay Search Report"
        description="Search for bill payments by various criteria"
        onRunReport={() => runReport(1)}
        onExportCsv={handleExportCsv}
        loading={loading}
        error={error}
        hasData={!!reportData && reportData.length > 0}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small" margin="dense">
                <InputLabel id="search-type-label">Search Type</InputLabel>
                <Select
                  labelId="search-type-label"
                  id="search-type"
                  value={searchType}
                  label="Search Type"
                  onChange={handleSearchTypeChange}
                  size="small"
                >
                  {Object.entries(BillPaySearchType).map(([key, value]) => (
                    <MenuItem key={key} value={value}>{BILL_PAY_SEARCH_TYPES[value]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="id-input"
                label={BILL_PAY_SEARCH_TYPES[searchType]}
                value={id}
                onChange={handleIdChange}
                required
                size="small"
                margin="dense"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="days-input"
                label="Days"
                type="number"
                value={days === null ? '' : days}
                onChange={handleDaysChange}
                InputProps={{ inputProps: { min: 1 } }}
                size="small"
                margin="dense"
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth size="small" margin="dense">
                <InputLabel id="report-type-label">Report Type</InputLabel>
                <Select
                  labelId="report-type-label"
                  id="report-type"
                  value={reportType}
                  label="Report Type"
                  onChange={handleReportTypeChange}
                  size="small"
                >
                  {Object.entries(BillPayReportType).map(([key, value]) => (
                    <MenuItem key={key} value={value}>{BILL_PAY_REPORT_TYPES[value]}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>

        {reportData && reportData.length > 0 && (
          <>
            <Box sx={{ mt: 4 }}>
              <ReportTable
                columns={columns}
                data={reportData}
                onSort={handleSortChange}
              />
            </Box>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">
                Showing {reportData.length} of {totalCount} results
              </Typography>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                disabled={loading}
                color="primary"
              />
            </Box>
          </>
        )}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default BillPaySearchReport;
