import React, { useState, useCallback, useEffect } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import { getSuspendedPayments, SuspendedPaymentSortColumn, SuspendedPaymentItem } from '../../../../utils/reports/suspendedPayment';
import { reportService } from '../../../../services/factory/ServiceFactory';
import { useSnackbar } from 'notistack';
import dayjs from 'dayjs';

const SuspendedPaymentReport: React.FC = () => {
  // Report state
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<SuspendedPaymentItem[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [sortColumn, setSortColumn] = useState<SuspendedPaymentSortColumn>(SuspendedPaymentSortColumn.LastUpdated);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');

  const { enqueueSnackbar } = useSnackbar();

  // Define columns for the report table
  const columns = [
    {
      key: 'paymentID',
      label: 'Payment ID',
      width: 150,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.PaymentID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payment ID
          {sortColumn === SuspendedPaymentSortColumn.PaymentID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'recurringID',
      label: 'Recurring ID',
      width: 150,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.RecurringID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Recurring ID
          {sortColumn === SuspendedPaymentSortColumn.RecurringID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'memberID',
      label: 'Member ID',
      width: 150,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.MemberID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Member ID
          {sortColumn === SuspendedPaymentSortColumn.MemberID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'account',
      label: 'Account',
      width: 150,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.Account,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Account
          {sortColumn === SuspendedPaymentSortColumn.Account && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'amount',
      label: 'Amount',
      width: 120,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.Amount,
      renderHeader: () => {
        // Compare as strings to ensure equality check works
        const isCurrentSortColumn = String(sortColumn) === String(SuspendedPaymentSortColumn.Amount);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            Amount
            {isCurrentSortColumn && (
              sortDirection === 'ASC' ? 
              <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
              <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
            )}
          </Box>
        );
      },
      render: (value: number, item: SuspendedPaymentItem) => value !== undefined && value !== null ? `$${value.toFixed(2)}` : ''
    },
    {
      key: 'payeeID',
      label: 'Payee ID',
      width: 150,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.PayeeID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee ID
          {sortColumn === SuspendedPaymentSortColumn.PayeeID && (
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
      width: 180,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.PayeeName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === SuspendedPaymentSortColumn.PayeeName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'userPayeeListID',
      label: 'User Payee List ID',
      width: 180,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.UserPayeeListID,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          User Payee List ID
          {sortColumn === SuspendedPaymentSortColumn.UserPayeeListID && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'usersAccountAtPayee',
      label: 'Account at Payee',
      width: 180,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.UsersAccountAtPayee,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Account at Payee
          {sortColumn === SuspendedPaymentSortColumn.UsersAccountAtPayee && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'nameOnAccount',
      label: 'Name on Account',
      width: 180,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.NameOnAccount,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Name on Account
          {sortColumn === SuspendedPaymentSortColumn.NameOnAccount && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'processDate',
      label: 'Process Date',
      width: 150,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.ProcessDate,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Process Date
          {sortColumn === SuspendedPaymentSortColumn.ProcessDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      ),
      render: (value: string) => value ? dayjs(value).format('YYYY-MM-DD') : ''
    },
    {
      key: 'deliveryDate',
      label: 'Delivery Date',
      width: 150,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.DeliveryDate,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Delivery Date
          {sortColumn === SuspendedPaymentSortColumn.DeliveryDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      ),
      render: (value: string) => value ? dayjs(value).format('YYYY-MM-DD') : ''
    },
    {
      key: 'comments',
      label: 'Comments',
      width: 200,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.Comments,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Comments
          {sortColumn === SuspendedPaymentSortColumn.Comments && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'source',
      label: 'Source',
      width: 120,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.Source,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Source
          {sortColumn === SuspendedPaymentSortColumn.Source && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'entryDate',
      label: 'Entry Date',
      width: 150,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.EntryDate,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Entry Date
          {sortColumn === SuspendedPaymentSortColumn.EntryDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      ),
      render: (value: string) => value ? dayjs(value).format('YYYY-MM-DD') : ''
    },
    {
      key: 'lastUpdated',
      label: 'Last Updated',
      width: 150,
      sortable: true,
      sortKey: SuspendedPaymentSortColumn.LastUpdated,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Last Updated
          {sortColumn === SuspendedPaymentSortColumn.LastUpdated && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      ),
      render: (value: string) => value ? dayjs(value).format('YYYY-MM-DD') : ''
    }
  ];

  // Handle sort column change directly from ReportTableV2
  const handleSortChange = (newSortColumn: SuspendedPaymentSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    console.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    
    // Create params with the new sort values
    const params = {
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    console.log('Making API call with params:', params);
    
    // Reset to page 1
    setPage(1);
    
    // Call API directly with new sort parameters
    getSuspendedPayments(params)
      .then(response => {
        console.log('API response received:', { 
          totalCount: response.totalCount,
          totalPages: response.totalPages,
          itemCount: response.items?.length || 0 
        });
        setReportData(response.items || []);
        setTotalCount(response.totalCount);
        setTotalPages(response.totalPages);
      })
      .catch(error => {
        console.error('Error sorting report:', error);
        enqueueSnackbar('Failed to sort report. Please try again.', { variant: 'error' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Run the report with the current parameters
  const runReport = useCallback(async (currentPage: number = 1) => {
    setLoading(true);
    
    try {
      // Prepare parameters for the API call
      const params = {
        pageNumber: currentPage,
        pageSize,
        sortColumn,
        sortDirection
      };
      
      // Log the parameters being sent to the API
      console.log('Running report with params:', params);
      
      // Call the Suspended Payment API
      const response = await getSuspendedPayments(params);
      
      // Log the response from the API
      console.log('API response received:', { 
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        itemCount: response.items?.length || 0 
      });
      
      setReportData(response.items || []);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
      
    } catch (error) {
      console.error('Error running Suspended Payment report:', error);
      enqueueSnackbar('Failed to run report. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [pageSize, sortColumn, sortDirection, enqueueSnackbar]);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    runReport(newPage);
  };

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
    runReport(1);
  };



  // Run report when sort parameters change
  useEffect(() => {
    // Log sort parameters for debugging
    console.log('Sort parameters changed:', { sortColumn, sortDirection });
    
    if (reportData) {
      runReport(page);
    }
  }, [sortColumn, sortDirection]);

  // Initial report load
  useEffect(() => {
    runReport(1);
  }, []);

  return (
    <ReportContainer 
      title="Suspended Payment Report"
      onRunReport={() => runReport(1)}
      loading={loading}
      error={null}
      hasData={!!reportData && reportData.length > 0}>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" color="textSecondary">
              This report shows all suspended payments in the system.
            </Typography>
          </Grid>

        </Grid>
      </Box>

      {reportData && reportData.length > 0 ? (
        <ReportTableV2
          columns={columns}
          data={reportData}
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
                pageNumber: request.page,
                pageSize: request.pageSize,
                sortColumn: request.sortColumn,
                sortDirection: request.sortDirection
              };

              const response = await getSuspendedPayments(params);
              return {
                items: response.items,
                pageNumber: response.pageNumber,
                totalCount: response.totalCount
              };
            },
            maxPageSize: 100
          }}
          exportFileName={`suspended-payment-${dayjs().format('YYYY-MM-DD')}`}
        />
      ) : (
        <Typography variant="body1" sx={{ py: 2, textAlign: 'center' }}>
          No suspended payments found matching the search criteria.
        </Typography>
      )}
    </ReportContainer>
  );
};

export default SuspendedPaymentReport;
