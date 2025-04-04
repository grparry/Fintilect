import React, { useState, useCallback, useEffect } from 'react';
import { Grid, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Typography, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import { 
  FAILED_ON_US_SEARCH_TYPES, 
  FAILED_ON_US_SORT_COLUMNS,
  FailedOnUsSearchType,
  FailedOnUsSortColumn,
  FailedOnUsParams,
  FailedOnUsItem,
  getFailedOnUs 
} from '../../../../utils/reports/failedOnUs';
import useClientApi from '../../../../hooks/useClientApi';

const DEFAULT_PAGE_SIZE = 20;

const FailedOnUsReport: React.FC = () => {
  // Indicate that this component uses client-specific API
  useClientApi(true);
  
  // State for report parameters
  const [searchType, setSearchType] = useState<FailedOnUsSearchType>(FailedOnUsSearchType.DateRange);
  const [memberId, setMemberId] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sortColumn, setSortColumn] = useState<FailedOnUsSortColumn>(FailedOnUsSortColumn.FailedDate);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  
  // State for report results
  const [reportData, setReportData] = useState<FailedOnUsItem[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as FailedOnUsSearchType);
    // Reset search values when changing search type
    setMemberId('');
    setPaymentId('');
    setStartDate(dayjs().subtract(30, 'day'));
    setEndDate(dayjs());
  };

  // Handle MemberID input change
  const handleMemberIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemberId(event.target.value);
  };

  // Handle PaymentID input change
  const handlePaymentIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentId(event.target.value);
  };

  // Handle start date change
  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
  };

  // Handle end date change
  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
  };

  // Handle page change
  const handlePageChange = (page: number, pageSize?: number) => {
    setPage(page);
    if (pageSize !== undefined) {
      setPageSize(pageSize);
    }
    runReport(page, pageSize);
  };

  // Handle sort change
  const handleSortChange = (newSortColumn: FailedOnUsSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Reset to page 1 when sort changes
    if (page === 1) {
      runReport(1);
    } else {
      setPage(1);
    }
  };

  // Run report with updated sort parameters
  useEffect(() => {
    if (reportData) {
      runReport(page);
    }
  }, [sortColumn, sortDirection]);

  // Run the report
  const runReport = useCallback(async (pageNumber: number = 1, pageSizeParam?: number) => {
    // Validate required parameters based on search type
    if (searchType === FailedOnUsSearchType.MemberID && !memberId) {
      setError('Please enter a Member ID');
      return;
    } else if (searchType === FailedOnUsSearchType.PaymentID && !paymentId) {
      setError('Please enter a Payment ID');
      return;
    } else if (searchType === FailedOnUsSearchType.DateRange && (!startDate || !endDate)) {
      setError('Please select both start and end dates');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params: FailedOnUsParams = {
        searchType: searchType,
        pageNumber: pageNumber,
        pageSize: pageSizeParam || pageSize,
        sortColumn: sortColumn,
        sortDirection: sortDirection
      };

      // Add parameters based on search type
      if (searchType === FailedOnUsSearchType.MemberID) {
        params.memberId = memberId;
      } else if (searchType === FailedOnUsSearchType.PaymentID) {
        params.paymentId = paymentId;
      } else if (searchType === FailedOnUsSearchType.DateRange) {
        params.startDate = startDate ? startDate.toISOString() : undefined;
        params.endDate = endDate ? endDate.toISOString() : undefined;
      }

      const response = await getFailedOnUs(params);
      
      setReportData(response.items || []);
      setTotalPages(response.totalPages);
      setTotalCount(response.totalCount);
      setPage(pageNumber);
    } catch (err) {
      console.error('Error fetching Failed On Us data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching the report');
      setReportData(null);
    } finally {
      setLoading(false);
    }
  }, [searchType, memberId, paymentId, startDate, endDate, sortColumn, sortDirection, pageSize]);

  // Handle form submit
  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    runReport(1);
  };

  // Define columns for the report table
  const columns = [
    { 
      key: 'paymentId', 
      label: 'Payment ID', 
      sortable: true,
      sortKey: FailedOnUsSortColumn.PaymentId
    },
    { 
      key: 'memberId', 
      label: 'Member ID', 
      sortable: true,
      sortKey: FailedOnUsSortColumn.MemberId
    },
    { 
      key: 'memberFirstName', 
      label: 'First Name', 
      sortable: false 
    },
    { 
      key: 'memberLastName', 
      label: 'Last Name', 
      sortable: false 
    },
    { 
      key: 'email', 
      label: 'Email', 
      sortable: false 
    },
    { 
      key: 'failedDate', 
      label: 'Failed Date', 
      sortable: true,
      sortKey: FailedOnUsSortColumn.FailedDate,
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY HH:mm:ss') : ''
    },
    { 
      key: 'processedDate', 
      label: 'Processed Date', 
      sortable: true,
      sortKey: FailedOnUsSortColumn.ProcessedDate,
      render: (value: string) => value ? dayjs(value).format('MM/DD/YYYY HH:mm:ss') : ''
    },
    { 
      key: 'amount', 
      label: 'Amount', 
      sortable: true,
      sortKey: FailedOnUsSortColumn.Amount,
      render: (value: number) => value ? `$${value.toFixed(2)}` : '$0.00'
    },
    {
      key: 'fundingAccount',
      label: 'Funding Account',
      sortable: false
    },
    { 
      key: 'userPayeeListId', 
      label: 'User Payee List ID', 
      sortable: true,
      sortKey: FailedOnUsSortColumn.UserPayeeListId
    },
    { 
      key: 'payeeId', 
      label: 'Payee ID', 
      sortable: true,
      sortKey: FailedOnUsSortColumn.PayeeId
    },
    { 
      key: 'payeeName', 
      label: 'Payee Name', 
      sortable: true,
      sortKey: FailedOnUsSortColumn.PayeeName
    },
    {
      key: 'usersAccountAtPayee',
      label: 'Account at Payee',
      sortable: false
    },
    {
      key: 'nameOnAccount',
      label: 'Name on Account',
      sortable: false
    },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      sortKey: FailedOnUsSortColumn.Status
    },
    { 
      key: 'statusCode', 
      label: 'Status Code', 
      sortable: true,
      sortKey: FailedOnUsSortColumn.StatusCode
    },
    {
      key: 'recurringPaymentId',
      label: 'Recurring Payment ID',
      sortable: false
    }
  ];

  // Run the report when component mounts with initial sort settings
  useEffect(() => {
    runReport(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ReportContainer
        title="Failed On Us Report"
        onRunReport={handleSubmit}
        loading={loading}
        error={error}
        hasData={!!reportData && reportData.length > 0}
      >
        {/* Search Form */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small" margin="dense">
              <InputLabel id="search-type-label">Search Type</InputLabel>
              <Select
                labelId="search-type-label"
                id="search-type-select"
                value={searchType}
                label="Search Type"
                onChange={handleSearchTypeChange}
                size="small"
              >
                {Object.entries(FailedOnUsSearchType).map(([key, value]) => (
                  <MenuItem key={key} value={value}>{FAILED_ON_US_SEARCH_TYPES[value]}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {searchType === FailedOnUsSearchType.MemberID && (
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="member-id-input"
                label="Member ID"
                value={memberId}
                onChange={handleMemberIdChange}
                required
                size="small"
                margin="dense"
              />
            </Grid>
          )}

          {searchType === FailedOnUsSearchType.PaymentID && (
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                id="payment-id-input"
                label="Payment ID"
                value={paymentId}
                onChange={handlePaymentIdChange}
                required
                size="small"
                margin="dense"
              />
            </Grid>
          )}

          {searchType === FailedOnUsSearchType.DateRange && (
            <>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  slotProps={{ textField: { size: 'small', margin: 'dense', fullWidth: true } }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  slotProps={{ textField: { size: 'small', margin: 'dense', fullWidth: true } }}
                />
              </Grid>
            </>
          )}
        </Grid>

        {/* Results Table */}
        {reportData && reportData.length > 0 ? (
          <ReportTableV2
            data={reportData}
            columns={columns}
            pagination={{
              pageNumber: page,
              totalCount: totalCount,
              onPageChange: handlePageChange
            }}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
            enableExport={{
              getPagedData: async (request) => {
                const params = {
                  searchType: searchType,
                  pageNumber: request.page,
                  pageSize: request.pageSize,
                  sortColumn: request.sortColumn,
                  sortDirection: request.sortDirection
                } as FailedOnUsParams;
                
                // Add parameters based on search type
                if (searchType === FailedOnUsSearchType.MemberID) {
                  (params as any).memberId = memberId;
                } else if (searchType === FailedOnUsSearchType.PaymentID) {
                  (params as any).paymentId = paymentId;
                } else if (searchType === FailedOnUsSearchType.DateRange) {
                  (params as any).startDate = startDate ? startDate.toISOString() : undefined;
                  (params as any).endDate = endDate ? endDate.toISOString() : undefined;
                }
                
                const response = await getFailedOnUs(params);
                return {
                  items: response.items,
                  pageNumber: response.pageNumber,
                  totalCount: response.totalCount
                };
              },
              maxPageSize: 100
            }}
            exportFileName={`failed-on-us-${dayjs().format('YYYY-MM-DD')}`}
          />
        ) : !loading && (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
            No data to display. Please adjust your search criteria and try again.
          </Typography>
        )}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default FailedOnUsReport;
