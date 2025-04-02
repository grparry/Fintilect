import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import {
  PayeeSearchType,
  PAYEE_SEARCH_TYPES,
  PayeeSortColumn,
  PayeeItem,
  PayeeParams,
  getPayeeReport
} from '../../../../utils/reports/payee';
import useClientApi from '../../../../hooks/useClientApi';

/**
 * Payee Report Component
 * Displays a form to search for payee information and displays results in a table
 */
const PayeeReport: React.FC = () => {
  // Indicate that this component uses client-specific API
  useClientApi(true);

  // Search parameters
  const [searchType, setSearchType] = useState<PayeeSearchType>(PayeeSearchType.Member);
  const [memberId, setMemberId] = useState<string>('');
  const [paymentId, setPaymentId] = useState<string>('');
  const [recurringPaymentId, setRecurringPaymentId] = useState<string>('');
  const [userPayeeListId, setUserPayeeListId] = useState<string>('');
  const [payeeId, setPayeeId] = useState<string>('');

  // Report state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reportData, setReportData] = useState<PayeeItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(20);
  const [sortColumn, setSortColumn] = useState<PayeeSortColumn>(PayeeSortColumn.PayeeName);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');

  // Reset form values when search type changes
  useEffect(() => {
    setMemberId('');
    setPaymentId('');
    setRecurringPaymentId('');
    setUserPayeeListId('');
    setPayeeId('');
  }, [searchType]);

  // Get label for search value based on search type
  const getSearchValueLabel = useCallback(() => {
    switch (searchType) {
      case PayeeSearchType.Member:
        return 'Member ID';
      case PayeeSearchType.Payment:
        return 'Payment ID';
      case PayeeSearchType.RecurringPayment:
        return 'Recurring Payment ID';
      case PayeeSearchType.UserPayeeList:
        return 'User Payee List ID';
      case PayeeSearchType.Payee:
        return 'Payee ID';
      default:
        return '';
    }
  }, [searchType]);

  // Handle page change
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    runReport(value);
  };

  // Handle sort column change
  const handleSort = (columnKey: string) => {
    const newSortDirection = 
      sortColumn === columnKey && sortDirection === 'ASC' ? 'DESC' : 'ASC';
    
    setSortColumn(columnKey as PayeeSortColumn);
    setSortDirection(newSortDirection);
    runReport(1, columnKey as PayeeSortColumn, newSortDirection);
  };

  // Run the report
  const runReport = useCallback(async (
    currentPage: number = 1,
    currentSortColumn: PayeeSortColumn = sortColumn,
    currentSortDirection: 'ASC' | 'DESC' = sortDirection
  ) => {
    // Validate required parameters based on search type
    let hasRequiredParams = false;
    
    switch (searchType) {
      case PayeeSearchType.Member:
        hasRequiredParams = !!memberId;
        break;
      case PayeeSearchType.Payment:
        hasRequiredParams = !!paymentId;
        break;
      case PayeeSearchType.RecurringPayment:
        hasRequiredParams = !!recurringPaymentId;
        break;
      case PayeeSearchType.UserPayeeList:
        hasRequiredParams = !!userPayeeListId;
        break;
      case PayeeSearchType.Payee:
        hasRequiredParams = !!payeeId;
        break;
    }

    if (!hasRequiredParams) {
      setError(`Please enter ${getSearchValueLabel().toLowerCase()} to search`);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Build parameters for the API call
      const params: PayeeParams = {
        searchType,
        pageNumber: currentPage,
        pageSize,
        sortColumn: currentSortColumn,
        sortDirection: currentSortDirection,
        days: 3650 // Add default Days parameter for historical data
      };

      // Add specific parameters based on search type
      switch (searchType) {
        case PayeeSearchType.Member:
          params.memberID = memberId;
          break;
        case PayeeSearchType.Payment:
          params.paymentID = paymentId;
          break;
        case PayeeSearchType.RecurringPayment:
          params.recurringPaymentID = recurringPaymentId;
          break;
        case PayeeSearchType.UserPayeeList:
          params.userPayeeListID = userPayeeListId;
          break;
        case PayeeSearchType.Payee:
          params.payeeID = payeeId;
          break;
      }

      // Call the API
      const response = await getPayeeReport(params);
      
      // Update state with response data
      setReportData(response.items || []);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
      setPage(response.pageNumber);
    } catch (err) {
      console.error('Error fetching payee report:', err);
      setError('Failed to fetch payee report. Please try again.');
      setReportData([]);
    } finally {
      setLoading(false);
    }
  }, [
    searchType,
    memberId,
    paymentId,
    recurringPaymentId,
    userPayeeListId,
    payeeId,
    pageSize,
    sortColumn,
    sortDirection,
    getSearchValueLabel
  ]);

  // Handle form submission
  const handleSubmit = (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    runReport(1);
  };

  // Export to CSV
  const handleExportCsv = useCallback(() => {
    if (reportData.length === 0) return;
    
    const headers = [
      'Payee ID',
      'Payee Name',
      'Member ID',
      'Member Name',
      'Account Number',
      'Date Added',
      'Status',
      'Payment Method',
      'Address',
      'City',
      'State',
      'Zip Code',
      'Phone Number'
    ];
    
    const rows = reportData.map(item => [
      item.payeeID,
      item.payeeName,
      item.memberID,
      item.memberName,
      item.accountNumber,
      item.dateAdded,
      item.status,
      item.paymentMethod,
      item.address,
      item.city,
      item.state,
      item.zipCode,
      item.phoneNumber
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const csvBlob = new Blob([csvContent], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const csvLink = document.createElement('a');
    csvLink.href = csvUrl;
    csvLink.download = 'payee_report.csv';
    csvLink.click();
  }, [reportData]);

  // Table columns definition
  const columns = [
    {
      key: 'payeeID',
      label: 'Payee ID',
      sortable: true
    },
    {
      key: 'payeeName',
      label: 'Payee Name',
      sortable: true
    },
    {
      key: 'memberID',
      label: 'Member ID',
      sortable: true
    },
    {
      key: 'memberName',
      label: 'Member Name',
      sortable: true
    },
    {
      key: 'accountNumber',
      label: 'Account Number',
      sortable: false
    },
    {
      key: 'dateAdded',
      label: 'Date Added',
      sortable: true,
      render: (value: string) => dayjs(value).format('MM/DD/YYYY')
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true
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
        title="Payee Report"
        description="Search for payee information by member ID, payment ID, recurring payment ID, user payee list ID, or payee ID."
        onRunReport={handleSubmit}
        onExportCsv={handleExportCsv}
        loading={loading}
        error={error}
        hasData={reportData.length > 0}
      >
        <Grid container spacing={2} sx={{ p: 1 }}>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="search-type-label">Search By</InputLabel>
              <Select
                labelId="search-type-label"
                id="search-type"
                value={searchType}
                label="Search By"
                onChange={(e: SelectChangeEvent) => {
                  setSearchType(e.target.value as PayeeSearchType);
                }}
              >
                {Object.entries(PAYEE_SEARCH_TYPES).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <TextField
              fullWidth
              size="small"
              value={
                searchType === PayeeSearchType.Member
                  ? memberId
                  : searchType === PayeeSearchType.Payment
                  ? paymentId
                  : searchType === PayeeSearchType.RecurringPayment
                  ? recurringPaymentId
                  : searchType === PayeeSearchType.UserPayeeList
                  ? userPayeeListId
                  : payeeId
              }
              onChange={(e) => {
                switch (searchType) {
                  case PayeeSearchType.Member:
                    setMemberId(e.target.value);
                    break;
                  case PayeeSearchType.Payment:
                    setPaymentId(e.target.value);
                    break;
                  case PayeeSearchType.RecurringPayment:
                    setRecurringPaymentId(e.target.value);
                    break;
                  case PayeeSearchType.UserPayeeList:
                    setUserPayeeListId(e.target.value);
                    break;
                  case PayeeSearchType.Payee:
                    setPayeeId(e.target.value);
                    break;
                  default:
                    break;
                }
              }}
              placeholder={`Enter ${getSearchValueLabel().toLowerCase()}`}
            />
          </Grid>
        </Grid>

        {reportData && reportData.length > 0 ? (
          <>
            <ReportTable
              data={reportData}
              columns={columns}
              onSort={handleSort}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Typography variant="body2">
                Showing {reportData.length} of {totalCount} results
              </Typography>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
              />
            </Box>
          </>
        ) : null}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default PayeeReport;
