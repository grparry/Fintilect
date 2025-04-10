import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography, CircularProgress } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import {
  UserPayeeChangeHistorySearchType,
  USER_PAYEE_CHANGE_HISTORY_SEARCH_TYPES,
  UserPayeeChangeHistorySortColumn,
  USER_PAYEE_CHANGE_HISTORY_SORT_COLUMNS,
  UserPayeeChangeHistoryParams,
  UserPayeeChangeHistoryResponse,
  UserPayeeChangeHistoryItem,
  getUserPayeeChangeHistory
} from '../../../../utils/reports/userPayeeChangeHistory';

const UserPayeeChangeHistoryReport: React.FC = () => {
  // State for search parameters
  const [searchType, setSearchType] = useState<UserPayeeChangeHistorySearchType>(
    UserPayeeChangeHistorySearchType.MemberID
  );
  const [userPayeeListID, setUserPayeeListID] = useState<string>('');
  const [memberID, setMemberID] = useState<string>('');
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  
  // State for sorting
  const [sortColumn, setSortColumn] = useState<UserPayeeChangeHistorySortColumn>(
    UserPayeeChangeHistorySortColumn.UpdatedOn
  );
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');

  // Column definitions for the report table
  const columns = [
    { 
      key: 'memberID', 
      label: 'Member ID',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.MemberID
    },
    { 
      key: 'userPayeeListId', 
      label: 'User Payee List ID',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.UserPayeeListId
    },
    { 
      key: 'payeeName', 
      label: 'Payee Name',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.PayeeName
    },
    { 
      key: 'payeeId', 
      label: 'Payee ID',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.PayeeId
    },
    { 
      key: 'updatedOn', 
      label: 'Updated On',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.UpdatedOn,
      render: (value: any) => value ? dayjs(value).format('MM/DD/YYYY') : 'N/A'
    },
    { 
      key: 'changeType', 
      label: 'Change Type',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.ChangeType
    },
    { 
      key: 'updatedBy', 
      label: 'Updated By',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.UpdatedBy
    },
    { 
      key: 'paymentMethod', 
      label: 'Payment Method',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.PaymentMethod,
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'active', 
      label: 'Active',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.Active,
      render: (value: any) => value === true ? 'Yes' : value === false ? 'No' : 'N/A'
    },
    { 
      key: 'reason', 
      label: 'Reason',
      sortable: false,
      render: (value: any) => value || 'N/A'
    }
  ];

  // State for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  
  // State for report data
  const [data, setData] = useState<UserPayeeChangeHistoryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Format date as YYYY-MM-DD
   */
  const formatDate = (date: Dayjs): string => {
    return date.format('YYYY-MM-DD');
  };

  /**
   * Run the report with the current parameters
   * @param page Page number to fetch
   */
  const runReport = async (page: number, newPageSize?: number) => {
    // Use provided page size if specified, otherwise use state value
    const effectivePageSize = newPageSize !== undefined ? newPageSize : pageSize;
    setLoading(true);
    setError(null);
    
    try {
      // Build parameters based on search type
      const params: UserPayeeChangeHistoryParams = {
        searchType,
        pageNumber: page,
        pageSize: effectivePageSize,
        sortColumn,
        sortDirection,
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
      };
      
      // Add parameters based on search type
      switch (searchType) {
        case UserPayeeChangeHistorySearchType.UserPayeeListID:
          if (!userPayeeListID) {
            throw new Error('User Payee List ID is required');
          }
          params.userPayeeListID = userPayeeListID;
          break;
        case UserPayeeChangeHistorySearchType.MemberID:
          if (!memberID) {
            throw new Error('Member ID is required');
          }
          params.memberID = memberID;
          break;
      }
      
      // Call API
      const response = await getUserPayeeChangeHistory(params);
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
   * Handle page or page size change
   * @param page New page number
   * @param newPageSize New page size (optional)
   */
  const handlePageChange = (page: number, newPageSize?: number) => {
    // If page size changed, update it
    if (newPageSize !== undefined && newPageSize !== pageSize) {
      console.log(`Page size changed from ${pageSize} to ${newPageSize}`);
      setPageSize(newPageSize);
    }
    
    // Always update the page number
    setPageNumber(page);
    
    // Run the report with updated values
    runReport(page, newPageSize);
  };

  /**
   * Handle sort change
   * @param columnKey Column key to sort by
   */
  // handleSort function removed - now handled by ReportTableV2

  // CSV export functionality now handled by ReportTableV2

  // Render search form based on search type
  const renderSearchForm = () => {
    return (
      <>
        {/* Date Range Pickers */}
        <Grid item xs={12} sm={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => newValue && setStartDate(newValue)}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => newValue && setEndDate(newValue)}
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        
        {/* ID Field */}
        <Grid item xs={12} sm={5}>
          <TextField
            size="small"
            label={searchType === UserPayeeChangeHistorySearchType.MemberID ? "Member ID" : "User Payee List ID"}
            value={searchType === UserPayeeChangeHistorySearchType.MemberID ? memberID : userPayeeListID}
            onChange={(e) => searchType === UserPayeeChangeHistorySearchType.MemberID ? 
              setMemberID(e.target.value) : 
              setUserPayeeListID(e.target.value)
            }
            fullWidth
            required
          />
        </Grid>
      </>
    );
  };

  useEffect(() => {
    if (data) {
      runReport(pageNumber);
    }
  }, [sortColumn, sortDirection]);

  return (
    <ReportContainer
      title="User Payee Change History Report"
      onRunReport={handleSubmit}
      loading={loading}
      error={error}
      hasData={!!data?.items.length}
    >
      <Box sx={{ mt: 1, mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search Type */}
          <Grid item xs={12} sm={2}>
            <TextField
              select
              size="small"
              fullWidth
              label="Search Type"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as UserPayeeChangeHistorySearchType)}
            >
              {Object.entries(USER_PAYEE_CHANGE_HISTORY_SEARCH_TYPES).map(([value, label]) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          
          {/* Dynamic search fields based on search type */}
          <Grid item xs={12} sm={10}>
            <Grid container spacing={2} alignItems="center">
              {renderSearchForm()}
            </Grid>
          </Grid>
        </Grid>
      </Box>
      
      {/* Results Table */}
      {data && data.items.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Results
          </Typography>
          <ReportTableV2
            columns={columns}
            data={data.items}
            pagination={{
              pageNumber: data.pageNumber,
              totalCount: data.totalCount,
              onPageChange: handlePageChange
            }}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSortChange={(newColumn, newDirection) => {
              console.log('Sort change:', { newColumn, newDirection });
              
              // Update state
              setSortColumn(newColumn);
              setSortDirection(newDirection);
              
              // Make API call with the new sort parameters directly
              setLoading(true);
              setError(null);
              
              // Create params with the new sort values
              const params: UserPayeeChangeHistoryParams = {
                searchType,
                pageNumber: 1, // Always reset to page 1 when sorting
                pageSize: pageSize,
                sortColumn: newColumn, // Use the new sort column directly
                sortDirection: newDirection, // Use the new sort direction directly
                startDate: formatDate(startDate),
                endDate: formatDate(endDate)
              };
              
              // Add parameters based on search type
              switch (searchType) {
                case UserPayeeChangeHistorySearchType.UserPayeeListID:
                  if (!userPayeeListID) {
                    setError('User Payee List ID is required');
                    setLoading(false);
                    return;
                  }
                  params.userPayeeListID = userPayeeListID;
                  break;
                case UserPayeeChangeHistorySearchType.MemberID:
                  if (!memberID) {
                    setError('Member ID is required');
                    setLoading(false);
                    return;
                  }
                  params.memberID = memberID;
                  break;
              }
              
              console.log('Making API call with params:', params);
              
              // Reset to page 1
              setPageNumber(1);
              
              // Call API directly with new sort parameters
              getUserPayeeChangeHistory(params)
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
            }}
            enableExport={{
              getPagedData: async (request) => {
                // Build params for the API call
                const params: UserPayeeChangeHistoryParams = {
                  pageNumber: request.page,
                  pageSize: request.pageSize,
                  sortColumn: request.sortColumn,
                  sortDirection: request.sortDirection,
                  startDate: startDate.toISOString(),
                  endDate: endDate.toISOString(),
                  searchType: searchType
                };

                // Add search parameter based on search type
                switch (searchType) {
                  case UserPayeeChangeHistorySearchType.UserPayeeListID:
                    if (!userPayeeListID) {
                      throw new Error('User Payee List ID is required');
                    }
                    params.userPayeeListID = userPayeeListID;
                    break;
                  case UserPayeeChangeHistorySearchType.MemberID:
                    if (!memberID) {
                      throw new Error('Member ID is required');
                    }
                    params.memberID = memberID;
                    break;
                }

                // Call API and return in the format expected by ReportTableV2
                const response = await getUserPayeeChangeHistory(params);
                return {
                  items: response.items,
                  pageNumber: response.pageNumber,
                  totalCount: response.totalCount
                };
              },
              maxPageSize: 100
            }}
            exportFileName={`user-payee-change-history-${new Date().toISOString().split('T')[0]}`}
          />
        </Box>
      )}
    </ReportContainer>
  );
};

export default UserPayeeChangeHistoryReport;
