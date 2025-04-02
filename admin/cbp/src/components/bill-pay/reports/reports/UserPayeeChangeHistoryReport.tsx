import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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
      sortKey: UserPayeeChangeHistorySortColumn.MemberID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === UserPayeeChangeHistorySortColumn.MemberID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'userPayeeListId', 
      label: 'User Payee List ID',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.UserPayeeListId,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          User Payee List ID
          {sortColumn === UserPayeeChangeHistorySortColumn.UserPayeeListId && (
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
      sortKey: UserPayeeChangeHistorySortColumn.PayeeName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === UserPayeeChangeHistorySortColumn.PayeeName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'payeeId', 
      label: 'Payee ID',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.PayeeId,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee ID
          {sortColumn === UserPayeeChangeHistorySortColumn.PayeeId && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'updatedOn', 
      label: 'Updated On',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.UpdatedOn,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Updated On
          {sortColumn === UserPayeeChangeHistorySortColumn.UpdatedOn && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      ),
      render: (value: any) => value ? dayjs(value).format('MM/DD/YYYY') : 'N/A'
    },
    { 
      key: 'changeType', 
      label: 'Change Type',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.ChangeType,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Change Type
          {sortColumn === UserPayeeChangeHistorySortColumn.ChangeType && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'updatedBy', 
      label: 'Updated By',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.UpdatedBy,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Updated By
          {sortColumn === UserPayeeChangeHistorySortColumn.UpdatedBy && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'paymentMethod', 
      label: 'Payment Method',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.PaymentMethod,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payment Method
          {sortColumn === UserPayeeChangeHistorySortColumn.PaymentMethod && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      ),
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'active', 
      label: 'Active',
      sortable: true,
      sortKey: UserPayeeChangeHistorySortColumn.Active,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Active
          {sortColumn === UserPayeeChangeHistorySortColumn.Active && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      ),
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
  const runReport = async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build parameters based on search type
      const params: UserPayeeChangeHistoryParams = {
        searchType,
        pageNumber: page,
        pageSize,
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
   * Export data as CSV
   */
  const handleExportCsv = () => {
    if (!data || !data.items.length) return;
    
    // Create CSV header row
    const headers = columns.map(col => col.label);
    const csvContent = [headers.join(',')];
    
    // Add data rows
    data.items.forEach(item => {
      const row = columns.map(col => {
        const key = col.key as keyof UserPayeeChangeHistoryItem;
        const value = item[key];
        
        // Format value if render function exists
        if (col.render && value !== undefined) {
          return `"${col.render(value).toString().replace(/"/g, '""')}"`;
        }
        
        // Handle different value types
        if (value === undefined || value === null) {
          return '';
        } else if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        } else {
          return `"${value}"`;
        }
      });
      
      csvContent.push(row.join(','));
    });
    
    // Create and download CSV file
    const blob = new Blob([csvContent.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `user-payee-change-history-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render search form based on search type
  const renderSearchForm = () => {
    return (
      <Grid container spacing={3}>
        {/* Date Range Pickers - Always visible for all search types */}
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => newValue && setStartDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => newValue && setEndDate(newValue)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </LocalizationProvider>
        </Grid>
        
        {/* Conditional Fields based on search type */}
        {searchType === UserPayeeChangeHistorySearchType.UserPayeeListID && (
          <Grid item xs={12} md={6}>
            <TextField
              label="User Payee List ID"
              value={userPayeeListID}
              onChange={(e) => setUserPayeeListID(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}
        
        {searchType === UserPayeeChangeHistorySearchType.MemberID && (
          <Grid item xs={12} md={6}>
            <TextField
              label="Member ID"
              value={memberID}
              onChange={(e) => setMemberID(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}
      </Grid>
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
      onExportCsv={handleExportCsv}
    >
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          {/* Search Type */}
          <Grid item xs={12} md={6}>
            <TextField
              select
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
          <Grid item xs={12}>
            {renderSearchForm()}
          </Grid>
        </Grid>
      </Box>
      
      {/* Results Table */}
      {data && data.items.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Results
          </Typography>
          <ReportTable
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
        </Box>
      )}
    </ReportContainer>
  );
};

export default UserPayeeChangeHistoryReport;
