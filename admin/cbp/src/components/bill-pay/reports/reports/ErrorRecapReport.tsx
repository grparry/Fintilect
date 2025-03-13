import React, { useState, useCallback } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Pagination, Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import { ERROR_RECAP_SEARCH_TYPES, ErrorRecapReportData, getErrorRecap } from '../../../../utils/reports/errorRecap';

const DEFAULT_PAGE_SIZE = 20;

const ErrorRecapReport: React.FC = () => {
  // State for report parameters
  const [searchType, setSearchType] = useState<keyof typeof ERROR_RECAP_SEARCH_TYPES>('MemberID');
  const [searchValue, setSearchValue] = useState<string>('');
  const [page, setPage] = useState(1);
  
  // State for report results
  const [reportData, setReportData] = useState<ErrorRecapReportData[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as keyof typeof ERROR_RECAP_SEARCH_TYPES);
  };

  // Handle page change
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (searchValue) {
      runReport(value);
    }
  };

  // Run the error recap report
  const runReport = useCallback(async (currentPage: number = 1) => {
    if (!searchValue) {
      setError('Search value is required');
      return;
    }
    
    setLoading(true);
    setReportData(null);
    setError(null);
    
    try {
      const result = await getErrorRecap({
        searchType,
        searchValue,
        pageNumber: currentPage,
        pageSize: DEFAULT_PAGE_SIZE
      });
      
      setReportData(result.items);
      setTotalPages(result.totalPages);
      setTotalCount(result.totalCount);
      
      if (result.items.length === 0) {
        setError('No error records found for the specified criteria');
      }
    } catch (err) {
      console.error('Error running error recap report:', err);
      setError(`Failed to run report: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [searchType, searchValue]);

  // Export report data to CSV
  const handleExportCsv = useCallback(() => {
    if (!reportData || reportData.length === 0) return;
    
    // Define CSV columns
    const header = [
      'failedDate', 'memberID', 'paymentID', 'amount', 'payeeID', 
      'payeeName', 'userPayeeListID', 'usersAccountAtPayee', 'nameOnAccount', 
      'status', 'hostCode', 'error'
    ].join(',');
    
    // Convert data to CSV rows
    const rows = reportData.map(row => {
      return [
        row.failedDate || '',
        row.memberID || '',
        row.paymentID || '',
        row.amount || 0,
        row.payeeID || '',
        `"${(row.payeeName || '').replace(/"/g, '""')}"`, // Escape quotes in payee name
        row.userPayeeListID || '',
        `"${(row.usersAccountAtPayee || '').replace(/"/g, '""')}"`, // Escape quotes
        `"${(row.nameOnAccount || '').replace(/"/g, '""')}"`, // Escape quotes
        row.status || '',
        row.hostCode || '',
        `"${(row.error || '').replace(/"/g, '""')}"` // Escape quotes in error message
      ].join(',');
    });
    
    // Combine header and rows
    const csv = [header, ...rows].join('\n');
    
    // Create and trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `error_recap_${dayjs().format('YYYY-MM-DD')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [reportData]);

  // Define table columns
  const columns = [
    { key: 'failedDate', label: 'Failed Date' },
    { key: 'memberID', label: 'Member ID' },
    { key: 'paymentID', label: 'Payment ID' },
    { key: 'amount', label: 'Amount', render: (value: number) => `$${value.toFixed(2)}` },
    { key: 'payeeName', label: 'Payee Name' },
    { key: 'status', label: 'Status' },
    { key: 'hostCode', label: 'Host Code' },
    { key: 'error', label: 'Error' }
  ];

  return (
    <ReportContainer
      title="Error Recap Report"
      description="View error history records by various search criteria"
      onRunReport={() => runReport(1)}
      onExportCsv={handleExportCsv}
      loading={loading}
      error={error}
      hasResults={!!reportData && reportData.length > 0}
      resultsComponent={
        <>
          {reportData && (
            <>
              <ReportTable data={reportData} columns={columns} />
              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Pagination 
                      count={totalPages} 
                      page={page} 
                      onChange={handlePageChange} 
                      color="primary" 
                    />
                    <Typography variant="body2" color="text.secondary">
                      {`Showing ${reportData.length} of ${totalCount} results`}
                    </Typography>
                  </Box>
                </Box>
              )}
            </>
          )}
        </>
      }
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth>
            <InputLabel>Search Type</InputLabel>
            <Select
              value={searchType}
              label="Search Type"
              onChange={handleSearchTypeChange}
            >
              {Object.entries(ERROR_RECAP_SEARCH_TYPES).map(([key, label]) => (
                <MenuItem key={key} value={key}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <TextField
            fullWidth
            label="Search Value"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Enter ${ERROR_RECAP_SEARCH_TYPES[searchType]}`}
            required
          />
        </Grid>
      </Grid>
    </ReportContainer>
  );
};

export default ErrorRecapReport;
