import React, { useState, useCallback } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';

import ReportContainer from '../components/ReportContainer';
import DateRangeSelector from '../components/DateRangeSelector';
import ReportTable from '../components/ReportTable';
import { 
  PAYMENT_ACTIVITY_SEARCH_TYPES, 
  PaymentActivityParams,
  getPaymentActivity
} from '../../../../utils/reports/paymentActivity';
import { PaymentActivityItem, PaymentActivityItemPagedResponse } from '../../../../types/report.types';
import useClientApi from '../../../../hooks/useClientApi';

const PaymentActivityReport: React.FC = () => {
  // Indicate that this component uses client-specific API
  useClientApi(true);
  
  // State for report parameters
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [searchType, setSearchType] = useState<keyof typeof PAYMENT_ACTIVITY_SEARCH_TYPES>('DateRange');
  const [searchValue, setSearchValue] = useState<string>('');
  const [payeeName, setPayeeName] = useState<string>('');
  
  // State for report results
  const [reportData, setReportData] = useState<PaymentActivityItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as keyof typeof PAYMENT_ACTIVITY_SEARCH_TYPES);
    // Reset search value when changing search type
    setSearchValue('');
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

  // Run the payment activity report
  const runReport = useCallback(async (page: number = 1, size: number = pageSize) => {
    setLoading(true);
    setReportData(null);
    setError(null);
    
    try {
      console.log(`Running Payment Activity Report with search type: ${searchType}`);
      
      // Create parameters object based on search type
      const params: PaymentActivityParams = {
        searchType,
        pageNumber: page,
        pageSize: size
      };
      
      // Add appropriate parameters based on search type
      switch (searchType) {
        case 'MemberID':
        case 'PaymentID':
          if (!searchValue) {
            throw new Error(`${searchType} is required for this search type`);
          }
          params.searchValue = searchValue;
          break;
          
        case 'DateRange':
          params.startDate = startDate.toDate();
          params.endDate = endDate.toDate();
          
          // Optional payee name filter for date range search
          if (payeeName) {
            params.payeeName = payeeName;
          }
          break;
        case 'MemberIDAndDate':
          params.startDate = startDate.toDate();
          params.endDate = endDate.toDate();
          if (!searchValue) {
            throw new Error('Member ID is required for this search type');
          }
          params.searchValue = searchValue;
          break;
        case 'MemberIDAndPayeeName':
          if (!searchValue) {
            throw new Error('Member ID is required for this search type');
          }
          params.searchValue = searchValue;
          if (!payeeName) {
            throw new Error('Payee Name is required for this search type');
          }
          params.payeeName = payeeName;
          break;
        case 'MemberIDAndDateAndPayeeName':
          params.startDate = startDate.toDate();
          params.endDate = endDate.toDate();
          if (!searchValue) {
            throw new Error('Member ID is required for this search type');
          }
          params.searchValue = searchValue;
          if (!payeeName) {
            throw new Error('Payee Name is required for this search type');
          }
          params.payeeName = payeeName;
          break;
        case 'PayeeName':
          if (!payeeName) {
            throw new Error('Payee Name is required for this search type');
          }
          params.payeeName = payeeName;
          break;
      }
      
      console.log('Payment Activity Report parameters:', params);
      
      const result: PaymentActivityItemPagedResponse = await getPaymentActivity(params);
      
      if (result.items) {
        setReportData(result.items);
        setTotalCount(result.totalCount);
        setPageNumber(result.pageNumber);
        setPageSize(result.pageSize);
      } else {
        setReportData([]);
        setTotalCount(0);
      }
    } catch (err) {
      console.error('Error running payment activity report:', err);
      setError(`Failed to run report: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [searchType, startDate, endDate, searchValue, payeeName, pageSize]);

  // Export report data to CSV
  const handleExportCsv = useCallback(() => {
    if (!reportData || reportData.length === 0) return;
    
    // Define CSV columns
    const header = ['paymentID', 'memberID', 'payeeID', 'payeeName', 'amount', 'status', 'dateProcessed', 'dueDate', 'paymentMethod'].join(',');
    
    // Convert data to CSV rows
    const rows = reportData.map(row => {
      return [
        row.paymentID || '',
        row.memberID || '',
        row.payeeID || '',
        `"${(row.payeeName || '').replace(/"/g, '""')}"`, // Escape quotes in payee name
        row.amount || 0,
        row.status || '',
        row.dateProcessed || '',
        row.dueDate || '',
        row.paymentMethod || ''
      ].join(',');
    });
    
    // Combine header and rows
    const csv = [header, ...rows].join('\n');
    
    // Create and trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `payment_activity_${dayjs().format('YYYY-MM-DD')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [reportData]);

  // Define table columns
  const columns = [
    { key: 'paymentID', label: 'Payment ID' },
    { key: 'memberID', label: 'Member ID' },
    { key: 'payeeID', label: 'Payee ID' },
    { key: 'payeeName', label: 'Payee Name' },
    { key: 'amount', label: 'Amount', render: (value: number) => `$${value.toFixed(2)}` },
    { key: 'status', label: 'Status' },
    { key: 'dateProcessed', label: 'Date Processed' },
    { key: 'dueDate', label: 'Due Date' },
    { key: 'paymentMethod', label: 'Payment Method' }
  ];

  // Determine which fields to show based on search type
  const showDateRange = searchType === 'DateRange' || searchType === 'MemberIDAndDate' || searchType === 'MemberIDAndDateAndPayeeName';
  const showMemberID = searchType === 'MemberID' || searchType === 'MemberIDAndDate' || searchType === 'MemberIDAndPayeeName' || searchType === 'MemberIDAndDateAndPayeeName';
  const showPaymentID = searchType === 'PaymentID';
  const showPayeeName = searchType === 'PayeeName' || searchType === 'MemberIDAndPayeeName' || searchType === 'MemberIDAndDateAndPayeeName';

  // Get the label for the search value field based on search type
  const getSearchValueLabel = () => {
    switch (searchType) {
      case 'MemberID':
      case 'MemberIDAndDate':
      case 'MemberIDAndPayeeName':
      case 'MemberIDAndDateAndPayeeName':
        return 'Member ID';
      case 'PaymentID':
        return 'Payment ID';
      default:
        return 'Search Value';
    }
  };

  return (
    <ReportContainer
      title="Payment Activity Report"
      description="View payment activity based on various search criteria"
      onRunReport={() => runReport(1)}
      onExportCsv={handleExportCsv}
      loading={loading}
      error={error}
      hasResults={!!reportData && reportData.length > 0}
      resultsComponent={
        reportData ? (
          <ReportTable 
            data={reportData} 
            columns={columns} 
            pagination={{
              pageNumber,
              pageSize,
              totalCount,
              onPageChange: handlePageChange,
              onPageSizeChange: handlePageSizeChange
            }}
          />
        ) : null
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
              {Object.entries(PAYMENT_ACTIVITY_SEARCH_TYPES).map(([key, value]) => (
                <MenuItem key={key} value={key}>{key}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {(showMemberID || showPaymentID) && (
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              label={getSearchValueLabel()}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              fullWidth
            />
          </Grid>
        )}

        {showPayeeName && (
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              label="Payee Name"
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
              fullWidth
            />
          </Grid>
        )}

        {showDateRange && (
          <DateRangeSelector
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
        )}
      </Grid>
    </ReportContainer>
  );
};

export default PaymentActivityReport;
