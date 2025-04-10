import React, { useState, useCallback, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Button, Typography, Grid, FormHelperText } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReportContainer from '../components/ReportContainer';
import ReportTableV2 from '../components/ReportTableV2';
import { getOFACExceptions, OFACExceptionsSearchType, OFAC_EXCEPTIONS_SEARCH_TYPES, OFACExceptionsSortColumn, OFACExceptionsItem } from '../../../../utils/reports/ofacExceptions';
import { reportService } from '../../../../services/factory/ServiceFactory';
import { useSnackbar } from 'notistack';

const OFACExceptionsReport: React.FC = () => {
  // Report state
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<OFACExceptionsItem[] | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [sortColumn, setSortColumn] = useState<OFACExceptionsSortColumn>(OFACExceptionsSortColumn.Created);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');

  // Search parameters
  const [searchType, setSearchType] = useState<OFACExceptionsSearchType>(OFACExceptionsSearchType.DateRange);
  const [singleDate, setSingleDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [month, setMonth] = useState<number>(dayjs().month() + 1); // 1-12
  const [year, setYear] = useState<number>(dayjs().year());

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { enqueueSnackbar } = useSnackbar();

  // Define columns for the report table
  const columns = [
    {
      key: 'sponsorTransactionId',
      label: 'Sponsor Transaction ID',
      width: 180,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.SponsorTransactionId,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Sponsor Transaction ID
          {sortColumn === OFACExceptionsSortColumn.SponsorTransactionId && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'sponsorId',
      label: 'Sponsor ID',
      width: 120,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.SponsorId,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Sponsor ID
          {sortColumn === OFACExceptionsSortColumn.SponsorId && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'sponsorName',
      label: 'Sponsor Name',
      width: 180,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.SponsorName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Sponsor Name
          {sortColumn === OFACExceptionsSortColumn.SponsorName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'customerId',
      label: 'Customer ID',
      width: 120,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.CustomerId,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Customer ID
          {sortColumn === OFACExceptionsSortColumn.CustomerId && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'primaryCustomerFirstName',
      label: 'First Name',
      width: 150,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.PrimaryCustomerFirstName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          First Name
          {sortColumn === OFACExceptionsSortColumn.PrimaryCustomerFirstName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'primaryCustomerLastName',
      label: 'Last Name',
      width: 150,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.PrimaryCustomerLastName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Last Name
          {sortColumn === OFACExceptionsSortColumn.PrimaryCustomerLastName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'businessName',
      label: 'Business Name',
      width: 180,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.BusinessName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Business Name
          {sortColumn === OFACExceptionsSortColumn.BusinessName && (
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
      sortKey: OFACExceptionsSortColumn.PayeeName,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Payee Name
          {sortColumn === OFACExceptionsSortColumn.PayeeName && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'confirmationNumber',
      label: 'Confirmation Number',
      width: 180,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.ConfirmationNumber,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Confirmation Number
          {sortColumn === OFACExceptionsSortColumn.ConfirmationNumber && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'transactionAmount',
      label: 'Amount',
      width: 120,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.TransactionAmount,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Amount
          {sortColumn === OFACExceptionsSortColumn.TransactionAmount && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      ),
      render: (item: OFACExceptionsItem) => `$${item.transactionAmount.toFixed(2)}`
    },
    {
      key: 'serviceRequestNumber',
      label: 'Service Request Number',
      width: 180,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.ServiceRequestNumber,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Service Request Number
          {sortColumn === OFACExceptionsSortColumn.ServiceRequestNumber && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'serviceRequestDate',
      label: 'Service Request Date',
      width: 180,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.ServiceRequestDate,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Service Request Date
          {sortColumn === OFACExceptionsSortColumn.ServiceRequestDate && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      ),
      render: (value: string) => value ? dayjs(value).format('YYYY-MM-DD') : ''
    },
    {
      key: 'checkNumber',
      label: 'Check Number',
      width: 150,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.CheckNumber,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Check Number
          {sortColumn === OFACExceptionsSortColumn.CheckNumber && (
            sortDirection === 'ASC' ? 
            <ArrowUpwardIcon fontSize="small" sx={{ ml: 0.5 }} /> : 
            <ArrowDownwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          )}
        </Box>
      )
    },
    {
      key: 'created',
      label: 'Created Date',
      width: 150,
      sortable: true,
      sortKey: OFACExceptionsSortColumn.Created,
      renderHeader: () => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          Created Date
          {sortColumn === OFACExceptionsSortColumn.Created && (
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
  const handleSortChange = (newSortColumn: OFACExceptionsSortColumn, newSortDirection: 'ASC' | 'DESC') => {
    console.log('Sort change:', { newSortColumn, newSortDirection });
    
    // Update state
    setSortColumn(newSortColumn);
    setSortDirection(newSortDirection);
    
    // Make API call with the new sort parameters directly
    setLoading(true);
    
    // Create params with the new sort values
    const params: any = {
      searchType,
      pageNumber: 1, // Always reset to page 1 when sorting
      pageSize,
      sortColumn: newSortColumn, // Use the new sort column directly
      sortDirection: newSortDirection // Use the new sort direction directly
    };
    
    // Add parameters based on search type
    if (searchType === OFACExceptionsSearchType.SingleDate && singleDate) {
      params.selectedSingleDate = singleDate.format('YYYY-MM-DD');
    } else if (searchType === OFACExceptionsSearchType.DateRange) {
      if (startDate && endDate) {
        params.selectedStartDate = startDate.format('YYYY-MM-DD');
        params.selectedEndDate = endDate.format('YYYY-MM-DD');
      }
    } else if (searchType === OFACExceptionsSearchType.MonthYear) {
      params.monthSelected = month;
      params.yearSelected = year;
    }
    
    console.log('Making API call with params:', params);
    
    // Reset to page 1
    setPage(1);
    
    // Call API directly with new sort parameters
    getOFACExceptions(params)
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
    setErrors({});
    
    try {
      // Validate required parameters based on search type
      let newErrors: Record<string, string> = {};
      let hasErrors = false;
      
      if (searchType === OFACExceptionsSearchType.SingleDate) {
        if (!singleDate || !singleDate.isValid()) {
          newErrors.singleDate = 'Valid date is required';
          hasErrors = true;
        }
      } else if (searchType === OFACExceptionsSearchType.DateRange) {
        if (!startDate || !startDate.isValid()) {
          newErrors.startDate = 'Valid start date is required';
          hasErrors = true;
        }
        if (!endDate || !endDate.isValid()) {
          newErrors.endDate = 'Valid end date is required';
          hasErrors = true;
        }
        if (startDate && endDate && startDate.isValid() && endDate.isValid() && startDate.isAfter(endDate)) {
          newErrors.dateRange = 'Start date must be before end date';
          hasErrors = true;
        }
      } else if (searchType === OFACExceptionsSearchType.MonthYear) {
        if (month < 1 || month > 12) {
          newErrors.month = 'Month must be between 1 and 12';
          hasErrors = true;
        }
        if (year < 2000 || year > 2100) {
          newErrors.year = 'Year must be between 2000 and 2100';
          hasErrors = true;
        }
      }
      
      if (hasErrors) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }
      
      // Prepare parameters for the API call
      const params: any = {
        searchType,
        pageNumber: currentPage,
        pageSize,
        sortColumn,
        sortDirection
      };
      
      // Add parameters based on search type
      if (searchType === OFACExceptionsSearchType.SingleDate && singleDate) {
        params.selectedSingleDate = singleDate.format('YYYY-MM-DD');
      } else if (searchType === OFACExceptionsSearchType.DateRange) {
        if (startDate && endDate) {
          params.selectedStartDate = startDate.format('YYYY-MM-DD');
          params.selectedEndDate = endDate.format('YYYY-MM-DD');
        }
      } else if (searchType === OFACExceptionsSearchType.MonthYear) {
        params.monthSelected = month;
        params.yearSelected = year;
      }
      
      // Call the OFAC exceptions API
      const response = await getOFACExceptions(params);
      
      setReportData(response.items || []);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
      
    } catch (error) {
      console.error('Error running OFAC exceptions report:', error);
      enqueueSnackbar('Failed to run report. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [searchType, singleDate, startDate, endDate, month, year, pageSize, sortColumn, sortDirection, enqueueSnackbar]);

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
    if (reportData) {
      runReport(page);
    }
  }, [sortColumn, sortDirection]);

  // Render search form based on search type
  const renderSearchForm = () => {
    switch (searchType) {
      case OFACExceptionsSearchType.SingleDate:
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={singleDate}
              onChange={(newDate) => setSingleDate(newDate)}
              slotProps={{ 
                textField: { 
                  size: 'small', 
                  margin: 'dense', 
                  fullWidth: true,
                  error: !!errors.singleDate,
                  helperText: errors.singleDate
                } 
              }}
            />
          </LocalizationProvider>
        );
      case OFACExceptionsSearchType.DateRange:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newDate) => setStartDate(newDate)}
                  slotProps={{ 
                    textField: { 
                      size: 'small', 
                      margin: 'dense', 
                      fullWidth: true,
                      error: !!errors.startDate,
                      helperText: errors.startDate
                    } 
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newDate) => setEndDate(newDate)}
                  slotProps={{ 
                    textField: { 
                      size: 'small', 
                      margin: 'dense', 
                      fullWidth: true,
                      error: !!errors.endDate,
                      helperText: errors.endDate
                    } 
                  }}
                />
              </LocalizationProvider>
            </Grid>
            {errors.dateRange && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.dateRange}</FormHelperText>
              </Grid>
            )}
          </Grid>
        );
      case OFACExceptionsSearchType.MonthYear:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.month}>
                <InputLabel>Month</InputLabel>
                <Select
                  value={month}
                  label="Month"
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  <MenuItem value={1}>January</MenuItem>
                  <MenuItem value={2}>February</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                  <MenuItem value={6}>June</MenuItem>
                  <MenuItem value={7}>July</MenuItem>
                  <MenuItem value={8}>August</MenuItem>
                  <MenuItem value={9}>September</MenuItem>
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={11}>November</MenuItem>
                  <MenuItem value={12}>December</MenuItem>
                </Select>
                {errors.month && <FormHelperText>{errors.month}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                error={!!errors.year}
                helperText={errors.year}
                InputProps={{ inputProps: { min: 2000, max: 2100 } }}
              />
            </Grid>
          </Grid>
        );
      case OFACExceptionsSearchType.All:
        return (
          <Typography variant="body2" color="textSecondary">
            This will return all OFAC exceptions. No additional parameters needed.
          </Typography>
        );
      default:
        return null;
    }
  };

  return (
    <ReportContainer 
      title="OFAC Exceptions Report"
      onRunReport={() => runReport(1)}
      loading={loading}
      error={null}
      hasData={!!reportData && reportData.length > 0}>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Search Type</InputLabel>
              <Select
                value={searchType}
                label="Search Type"
                onChange={(e) => setSearchType(e.target.value as OFACExceptionsSearchType)}
              >
                {Object.entries(OFAC_EXCEPTIONS_SEARCH_TYPES).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={8}>
            {renderSearchForm()}
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
              const params: any = {
                pageNumber: request.page,
                pageSize: request.pageSize,
                sortColumn: request.sortColumn,
                sortDirection: request.sortDirection,
                searchType
              };

              switch (searchType) {
                case OFACExceptionsSearchType.SingleDate:
                  if (singleDate) params.date = singleDate.format('YYYY-MM-DD');
                  break;
                case OFACExceptionsSearchType.DateRange:
                  if (startDate) params.startDate = startDate.format('YYYY-MM-DD');
                  if (endDate) params.endDate = endDate.format('YYYY-MM-DD');
                  break;
                case OFACExceptionsSearchType.MonthYear:
                  params.month = month;
                  params.year = year;
                  break;
              }

              const response = await getOFACExceptions(params);
              return {
                items: response.items,
                pageNumber: response.pageNumber,
                totalCount: response.totalCount
              };
            },
            maxPageSize: 100
          }}
          exportFileName={`ofac-exceptions-${dayjs().format('YYYY-MM-DD')}`}
        />
      ) : (
        <Typography variant="body1" sx={{ py: 2, textAlign: 'center' }}>
          No OFAC exceptions found matching the search criteria.
        </Typography>
      )}
    </ReportContainer>
  );
};

export default OFACExceptionsReport;
