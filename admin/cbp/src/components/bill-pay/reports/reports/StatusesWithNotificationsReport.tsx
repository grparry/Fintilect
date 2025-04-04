import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import dayjs from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  
  // State for data
  const [data, setData] = useState<StatusesWithNotificationsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // State for notification text dialog
  const [notificationTextDialogOpen, setNotificationTextDialogOpen] = useState<boolean>(false);
  const [selectedNotificationText, setSelectedNotificationText] = useState<string>('');

  // Column definitions for the report table
  const columns = [
    { 
      key: 'statusCode', 
      label: 'Status Code',
      sortable: true,
      sortKey: StatusesWithNotificationsSortColumn.StatusCode
    },
    { 
      key: 'statusDescription', 
      label: 'Status Description',
      sortable: true,
      sortKey: StatusesWithNotificationsSortColumn.StatusDescription
    },
    { 
      key: 'statusFriendlyName', 
      label: 'Status Friendly Name',
      sortable: true,
      sortKey: StatusesWithNotificationsSortColumn.StatusFriendlyName,
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'statusHostCode', 
      label: 'Status Host Code',
      sortable: true,
      sortKey: StatusesWithNotificationsSortColumn.StatusHostCode,
      render: (value: any) => value || 'N/A'
    },
    { 
      key: 'notificationId', 
      label: 'Notification ID',
      sortable: true,
      sortKey: StatusesWithNotificationsSortColumn.NotificationId,
      render: (value: any) => value || 'N/A'
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
      render: (value: any, row: any) => row.notificationMessageSubject || 'N/A'
    },
    { 
      key: 'notificationText', 
      label: 'Notification Text',
      render: (value: any, row: any) => {
        const text = row.notificationMessageBody || 'N/A';
        if (text === 'N/A') return text;
        
        // Truncate text if it's longer than 50 characters
        const truncatedText = text.length > 50 ? `${text.substring(0, 50)}...` : text;
        
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Click to view full text">
              <span>{truncatedText}</span>
            </Tooltip>
            {text.length > 50 && (
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNotificationText(text);
                  setNotificationTextDialogOpen(true);
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        );
      }
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
   * Handle page change for ReportTableV2
   * @param page New page number
   * @param newPageSize New page size
   */
  const handlePageChange = (page: number, newPageSize: number) => {
    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
    setPageNumber(page);
    runReport(page);
  };

  /**
   * Handle sort change for ReportTableV2
   * @param newSortColumn Column to sort by
   * @param newSortDirection Direction to sort
   */
  const handleSortChange = (newSortColumn: StatusesWithNotificationsSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Reset to page 1 when sort changes
    if (pageNumber === 1) {
      runReport(1);
    } else {
      setPageNumber(1);
    }
  };

  // Run report when sort parameters change
  useEffect(() => {
    if (data) {
      runReport(pageNumber);
    }
  }, [sortColumn, sortDirection]);

  /**
   * Function to get paged data for CSV export
   * @param request Export request parameters
   */
  const getPagedData = async (request: { page: number; pageSize: number; sortColumn: StatusesWithNotificationsSortColumn; sortDirection: 'ASC' | 'DESC' }) => {
    try {
      // Build parameters
      const params: StatusesWithNotificationsParams = {
        pageNumber: request.page,
        pageSize: request.pageSize,
        sortColumn: request.sortColumn,
        sortDirection: request.sortDirection
      };
      
      // Call API
      const response = await getStatusesWithNotifications(params);
      return {
        items: response.items || [],
        pageNumber: response.pageNumber,
        totalCount: response.totalCount
      };
    } catch (error) {
      console.error('Error fetching statuses with notifications data for export:', error);
      throw error;
    }
  };

  return (
    <Box>
      <ReportContainer
        title="Statuses with Notifications"
        onRunReport={handleSubmit}
        loading={loading}
        error={error}
        hasData={!!data?.items.length}
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
              getPagedData,
              maxPageSize: 100
            }}
            exportFileName={`statuses-with-notifications-${dayjs().format('YYYY-MM-DD')}`}
          />
        )}

        {/* Notification Text Dialog */}
        <Dialog
          open={notificationTextDialogOpen}
          onClose={() => setNotificationTextDialogOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Notification Text</DialogTitle>
          <DialogContent>
            <Typography 
              variant="body1" 
              sx={{ 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word',
                fontFamily: 'monospace'
              }}
            >
              {selectedNotificationText}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setNotificationTextDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </ReportContainer>
    </Box>
  );
};

export default StatusesWithNotificationsReport;
