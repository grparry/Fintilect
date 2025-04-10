import React, { useState, useCallback, useEffect } from 'react';
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import {
  PayeeSearchType,
  PAYEE_SEARCH_TYPES,
  PayeeSortColumn,
  PayeeItem,
  PayeeParams,
  PayeeItemPagedResponse,
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
  const [payeeName, setPayeeName] = useState<string>('');

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
    setPayeeName('');
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
  const handlePageChange = (pageNumber: number, newPageSize?: number) => {
    setPage(pageNumber);
    runReport(pageNumber);
  };

  // Handle sort column change for ReportTableV2
  const handleSortChange = (newSortColumn: PayeeSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    console.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    setError(null);
    
    // Validate required parameters based on search type
    let hasRequiredParams = false;
    
    switch (searchType) {
      case PayeeSearchType.Payee:
        hasRequiredParams = !!payeeId;
        if (!hasRequiredParams) {
          setError('Payee ID is required');
          setLoading(false);
          return;
        }
        break;

      case PayeeSearchType.Member:
        hasRequiredParams = !!memberId;
        if (!hasRequiredParams) {
          setError('Member ID is required');
          setLoading(false);
          return;
        }
        break;
      default:
        setError('Invalid search type');
        setLoading(false);
        return;
    }
    
    // Create params with the new sort values
    const params: PayeeParams = {
      searchType,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    // Add parameters based on search type
    switch (searchType) {
      case PayeeSearchType.Payee:
        params.payeeID = payeeId;
        break;

      case PayeeSearchType.Member:
        params.memberID = memberId;
        break;
    }
    
    console.log('Making API call with params:', params);
    
    // Reset to page 1
    setPage(1);
    
    // Call API directly with new sort parameters
    getPayeeReport(params)
      .then((response: PayeeItemPagedResponse) => {
        console.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setReportData(response.items || []);
        setTotalCount(response.totalCount);
        setTotalPages(response.totalPages);
      })
      .catch((error: any) => {
        console.error('Error sorting report:', error);
        setError('Failed to sort report. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
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



  // Run report when sort parameters change
  useEffect(() => {
    if (reportData && reportData.length > 0) {
      runReport(page);
    }
  }, [sortColumn, sortDirection]);

  // Table columns definition
  const columns = [
    {
      key: 'payeeID',
      label: 'Payee ID',
      sortable: true,
      sortKey: PayeeSortColumn.PayeeID
    },
    {
      key: 'payeeName',
      label: 'Payee Name',
      sortable: true,
      sortKey: PayeeSortColumn.PayeeName
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
                // Build parameters for the API call
                const params: PayeeParams = {
                  searchType,
                  pageNumber: request.page,
                  pageSize: request.pageSize,
                  sortColumn: request.sortColumn,
                  sortDirection: request.sortDirection,
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
                
                return {
                  items: response.items || [],
                  pageNumber: response.pageNumber,
                  totalCount: response.totalCount
                };
              },
              maxPageSize: 100
            }}
            exportFileName={`payee-report-${dayjs().format('YYYY-MM-DD')}`}
          />
        ) : null}
      </ReportContainer>
    </LocalizationProvider>
  );
};

export default PayeeReport;
