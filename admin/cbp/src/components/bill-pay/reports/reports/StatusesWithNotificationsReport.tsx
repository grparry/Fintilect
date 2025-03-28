import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ReportContainer from '../components/ReportContainer';
import ReportTable from '../components/ReportTable';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  StatusesWithNotificationsSortColumn,
  STATUSES_WITH_NOTIFICATIONS_SORT_COLUMNS,
  StatusesWithNotificationsParams,
  StatusesWithNotificationsResponse,
  StatusesWithNotificationsItem,
  getStatusesWithNotifications
} from '../../../../utils/reports/statusesWithNotifications';

const StatusesWithNotificationsReport: React.FC = () => {
  // State for pagination
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  
  // State for sorting
  const [sortColumn, setSortColumn] = useState<StatusesWithNotificationsSortColumn>(
    StatusesWithNotificationsSortColumn.StatusDescription
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // State for data
  const [data, setData] = useState<StatusesWithNotificationsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Column definitions for the report table
  const columns = [
    { 
      key: 'statusCode', 
      label: 'Status Code',
      sortable: true,
      sortKey: StatusesWithNotificationsSortColumn.StatusCode,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Status Code
          {sortColumn === StatusesWithNotificationsSortColumn.StatusCode && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'statusDescription', 
      label: 'Status Description',
      sortable: true,
      sortKey: StatusesWithNotificationsSortColumn.StatusDescription,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Status Description
          {sortColumn === StatusesWithNotificationsSortColumn.StatusDescription && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'statusFriendlyName', 
      label: 'Status Friendly Name',
      sortable: true,
      sortKey: StatusesWithNotificationsSortColumn.StatusFriendlyName,
      render: (value: any) => value || 'N/A',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Status Friendly Name
          {sortColumn === StatusesWithNotificationsSortColumn.StatusFriendlyName && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'statusHostCode', 
      label: 'Status Host Code',
      sortable: true,
      sortKey: StatusesWithNotificationsSortColumn.StatusHostCode,
      render: (value: any) => value || 'N/A',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Status Host Code
          {sortColumn === StatusesWithNotificationsSortColumn.StatusHostCode && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'notificationId', 
      label: 'Notification ID',
      sortable: true,
      sortKey: StatusesWithNotificationsSortColumn.NotificationId,
      render: (value: any) => value || 'N/A',
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Notification ID
          {sortColumn === StatusesWithNotificationsSortColumn.NotificationId && (
            sortDirection === 'asc' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    { 
      key: 'notificationErrorNumber', 
      label: 'Notification Error Number',
      render: (value: any) => value !== null && value !== undefined ? value : 'N/A'
    },
    { 
      key: 'notificationMatchMode', 
      label: 'Notification Match Mode',
      render: (value: any) => value !== null && value !== undefined ? value : 'N/A'
    },
    { 
      key: 'notificationMatchOrder', 
      label: 'Notification Match Order',
      render: (value: any) => value !== null && value !== undefined ? value : 'N/A'
    },
    { 
      key: 'notificationDescription', 
      label: 'Notification Description',
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'notificationText', 
      label: 'Notification Text',
      render: (value: any) => value || 'N/A'
    }
  ];

  /**
   * Run the report with the current parameters
   * @param page Page number to fetch
   */
  const runReport = async (page: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Build parameters
      const params: StatusesWithNotificationsParams = {
        pageNumber: page,
        pageSize,
        sortColumn,
        sortDirection
      };
      
      // Call API
      const response = await getStatusesWithNotifications(params);
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
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(newSortColumn);
        setSortDirection('asc');
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
    
    // Create CSV header row
    const headers = columns.map(col => col.label);
    const csvContent = [headers.join(',')];
    
    // Add data rows
    data.items.forEach(item => {
      const row = columns.map(col => {
        const key = col.key as keyof StatusesWithNotificationsItem;
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
    link.href = url;
    link.download = 'statuses-with-notifications.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box>
      <ReportContainer
        title="Statuses with Notifications"
        onRunReport={handleSubmit}
        loading={loading}
        error={error}
        hasData={!!data?.items.length}
        onExportCsv={handleExportCsv}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Click on column headers to sort the report. The report will automatically run when you click the Run Report button.
              </Typography>
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

export default StatusesWithNotificationsReport;
