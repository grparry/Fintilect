import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Alert,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  FormHelperText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import dayjs, { Dayjs } from 'dayjs';
import * as reportHelpers from '../../../utils/reportHelpers';
import { PAYMENT_ACTIVITY_SEARCH_TYPES, ERROR_RECAP_SEARCH_TYPES } from '../../../utils/reportHelpers';

// Define the available report types
type ReportType = 
  | 'paymentActivity'
  | 'errorRecap'
  | 'activeUserCount'
  | 'billpaySearch'
  | 'failedOnUs'
  | 'globalHolidays'
  | 'onUsPostings'
  | 'statusesWithNotifications'
  | 'largePayment'
  | 'monthlyUsers'
  | 'pendingPayments'
  | 'processingConfirmation'
  | 'recurringPaymentChangeHistory'
  | 'scheduledPaymentChangeHistory'
  | 'userPayeeChangeHistory';

// Interface for report metadata
interface ReportMetadata {
  label: string;
  description: string;
  requiresDateRange: boolean;
  requiresSearchType?: boolean;
  requiresSearchValue?: boolean;
  requiresId?: boolean;
  requiresRunDate?: boolean;
  requiresDate?: boolean;
  requiresDays?: boolean;
  requiresReportType?: boolean;
  requiresMemberId?: boolean;
  requiresPayeeName?: boolean;
  searchTypes?: string[];
}

// Report metadata for UI rendering and validation
const reportMetadata: Record<ReportType, ReportMetadata> = {
  paymentActivity: {
    label: 'Payment Activity',
    description: 'View payment activity within a date range',
    requiresDateRange: true,
    requiresSearchType: true,
    requiresMemberId: true,
    requiresPayeeName: true,
    searchTypes: Object.keys(PAYMENT_ACTIVITY_SEARCH_TYPES),
  },
  errorRecap: {
    label: 'Error Recap',
    description: 'View error history records',
    requiresDateRange: false,
    requiresSearchType: true,
    requiresSearchValue: true,
    searchTypes: Object.keys(ERROR_RECAP_SEARCH_TYPES),
  },
  activeUserCount: {
    label: 'Active User Count',
    description: 'View active user counts within a date range',
    requiresDateRange: true,
  },
  billpaySearch: {
    label: 'Billpay Search',
    description: 'Search billpay items by various criteria',
    requiresDateRange: false,
    requiresSearchType: true,
    requiresId: true,
    requiresDays: true,
    requiresReportType: true,
    searchTypes: ['MemberId', 'PaymentId', 'PayeeName'],
  },
  failedOnUs: {
    label: 'Failed On-Us Transactions',
    description: 'View failed on-us transactions within a date range',
    requiresDateRange: true,
  },
  globalHolidays: {
    label: 'Global Holidays',
    description: 'View global holidays',
    requiresDateRange: false,
  },
  onUsPostings: {
    label: 'On-Us Postings',
    description: 'View on-us postings within a date range',
    requiresDateRange: true,
  },
  statusesWithNotifications: {
    label: 'Statuses With Notifications',
    description: 'View statuses that have notifications',
    requiresDateRange: false,
  },
  largePayment: {
    label: 'Large Payments',
    description: 'View large payments for a specific date',
    requiresDateRange: false,
    requiresRunDate: true,
  },
  monthlyUsers: {
    label: 'Monthly Users',
    description: 'View monthly user counts within a date range',
    requiresDateRange: true,
  },
  pendingPayments: {
    label: 'Pending Payments',
    description: 'View pending payments for a specific date',
    requiresDateRange: false,
    requiresDate: true,
  },
  processingConfirmation: {
    label: 'Processing Confirmation',
    description: 'View processing confirmations within a date range',
    requiresDateRange: true,
  },
  recurringPaymentChangeHistory: {
    label: 'Recurring Payment Change History',
    description: 'View recurring payment change history',
    requiresDateRange: true,
    requiresSearchType: true,
    requiresSearchValue: true,
    searchTypes: ['MemberId', 'PaymentId'],
  },
  scheduledPaymentChangeHistory: {
    label: 'Scheduled Payment Change History',
    description: 'View scheduled payment change history',
    requiresDateRange: true,
    requiresSearchType: true,
    requiresSearchValue: true,
    searchTypes: ['MemberId', 'PaymentId'],
  },
  userPayeeChangeHistory: {
    label: 'User Payee Change History',
    description: 'View user payee change history',
    requiresDateRange: true,
    requiresSearchType: true,
    requiresSearchValue: true,
    searchTypes: ['MemberId', 'PayeeId'],
  },
};

// Report component
const Reports: React.FC = () => {
  // State for selected report type and parameters
  const [selectedReport, setSelectedReport] = useState<ReportType>('paymentActivity');
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [runDate, setRunDate] = useState<Dayjs>(dayjs());
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [searchType, setSearchType] = useState<string>('MemberId');
  const [searchValue, setSearchValue] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [days, setDays] = useState<number>(30);
  const [reportType, setReportType] = useState<string>('');
  const [memberId, setMemberId] = useState<string>('');
  const [payeeName, setPayeeName] = useState<string>('');
  
  // State for report results
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Reset form when report type changes
  useEffect(() => {
    setSearchType('MemberId');
    setSearchValue('');
    setId('');
    setDays(30);
    setReportType('');
    setMemberId('');
    setPayeeName('');
    setReportData(null);
    setError(null);
  }, [selectedReport]);

  // Handle report type change
  const handleReportChange = (event: SelectChangeEvent) => {
    setSelectedReport(event.target.value as ReportType);
  };

  // Handle tab change
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Run the selected report
  const runReport = useCallback(async () => {
    if (!selectedReport) return;
    
    setLoading(true);
    setReportData(null);
    setError(null);
    
    try {
      const metadata = reportMetadata[selectedReport];
      let result;
      
      switch (selectedReport) {
        case 'paymentActivity': {
          // Create base params with empty values
          const params: reportHelpers.PaymentActivityReportParams = {
            searchType: searchType as keyof typeof PAYMENT_ACTIVITY_SEARCH_TYPES,
            memberId: '',
            payeeName: '',
            startDate: undefined,
            endDate: undefined
          };
          
          // Set the appropriate parameters based on search type
          console.log('Before switch - searchType:', searchType, 'searchValue:', searchValue, 'memberId:', memberId);
          switch (searchType) {
            case 'PaymentActivity_MemberID':
              // Member ID only
              console.log('PaymentActivity_MemberID case - setting memberId to:', memberId);
              params.memberId = memberId;
              break;
              
            case 'PaymentActivity_MemberIDAndDate':
              // Member ID with date range
              params.memberId = searchValue;
              params.startDate = startDate?.toDate();
              params.endDate = endDate?.toDate();
              break;
              
            case 'PaymentActivity_MemberIDAndPayeeName':
              // Member ID with payee name
              params.memberId = searchValue;
              params.payeeName = payeeName;
              break;
              
            case 'PaymentActivity_MemberIDAndDateAndPayeeName':
              // Member ID with date range and payee name
              params.memberId = searchValue;
              params.startDate = startDate?.toDate();
              params.endDate = endDate?.toDate();
              params.payeeName = payeeName;
              break;
              
            case 'PaymentActivity_Date':
              // Date range only
              params.startDate = startDate?.toDate();
              params.endDate = endDate?.toDate();
              break;
              
            default:
              // For any other search types, include dates
              params.startDate = startDate?.toDate();
              params.endDate = endDate?.toDate();
              break;
          }
          
          result = await reportHelpers.getPaymentActivity(params);
          break;
        }
        case 'errorRecap': {
          // For Error Recap, we only need SearchType and SearchValue
          const params: reportHelpers.ErrorRecapReportParams = {
            searchType: searchType as keyof typeof ERROR_RECAP_SEARCH_TYPES,
            searchValue: searchValue || ''
          };
          
          result = await reportHelpers.getErrorRecap(params);
          break;
        }
        case 'activeUserCount':
          result = await reportHelpers.getActiveUserCount({
            startDate: startDate.toDate(),
            endDate: endDate.toDate()
          });
          break;
          
        case 'billpaySearch':
          result = await reportHelpers.getBillpaySearch({
            searchType,
            id,
            days: days || undefined,
            reportType: reportType || undefined
          });
          break;
          
        case 'failedOnUs':
          result = await reportHelpers.getFailedOnUs({
            startDate: startDate.toDate(),
            endDate: endDate.toDate()
          });
          break;
          
        case 'globalHolidays':
          result = await reportHelpers.getGlobalHolidays();
          break;
          
        case 'onUsPostings':
          result = await reportHelpers.getOnUsPostings({
            startDate: startDate.toDate(),
            endDate: endDate.toDate()
          });
          break;
          
        case 'statusesWithNotifications':
          result = await reportHelpers.getStatusesWithNotifications();
          break;
          
        case 'largePayment':
          result = await reportHelpers.getLargePayment({
            runDate: runDate.toDate()
          });
          break;
          
        case 'monthlyUsers':
          result = await reportHelpers.getMonthlyUsers({
            startDate: startDate.toDate(),
            endDate: endDate.toDate()
          });
          break;
          
        case 'pendingPayments':
          result = await reportHelpers.getPendingPayments({
            date: date.toDate()
          });
          break;
          
        case 'processingConfirmation':
          result = await reportHelpers.getProcessingConfirmation({
            startDate: startDate.toDate(),
            endDate: endDate.toDate()
          });
          break;
          
        case 'recurringPaymentChangeHistory':
          result = await reportHelpers.getRecurringPaymentChangeHistory({
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            searchType,
            searchValue
          });
          break;
          
        case 'scheduledPaymentChangeHistory':
          result = await reportHelpers.getScheduledPaymentChangeHistory({
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            searchType,
            searchValue
          });
          break;
          
        case 'userPayeeChangeHistory':
          result = await reportHelpers.getUserPayeeChangeHistory({
            startDate: startDate.toDate(),
            endDate: endDate.toDate(),
            searchType,
            searchValue
          });
          break;
          
        default:
          throw new Error('Unknown report type');
      }
      
      setReportData(result);
    } catch (err) {
      console.error('Error running report:', err);
      setError(`Failed to run report: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  }, [
    selectedReport, startDate, endDate, searchType, searchValue, 
    id, days, reportType, memberId, payeeName, runDate, date
  ]);

  // Export report data to CSV
  const handleExportCsv = useCallback(() => {
    if (!reportData) return;
    
    // Function to convert object to CSV row
    const objectToCsvRow = (obj: any): string => {
      const values = Object.values(obj);
      return values.map(value => {
        if (value === null || value === undefined) return '';
        return typeof value === 'object' ? JSON.stringify(value) : String(value);
      }).join(',');
    };
    
    let dataArray: any[] = [];
    let fileName = `${selectedReport}_${dayjs().format('YYYY-MM-DD')}.csv`;
    
    // Extract the appropriate data array based on report type
    if (selectedReport === 'paymentActivity') {
      dataArray = Array.isArray(reportData) ? reportData : [];
      fileName = `payment_activity_${dayjs().format('YYYY-MM-DD')}.csv`;
    } else if (reportData.payments) {
      dataArray = reportData.payments;
    } else if (reportData.errors) {
      dataArray = reportData.errors;
    } else if (reportData.dailyCounts) {
      dataArray = reportData.dailyCounts;
    } else if (reportData.billpayItems) {
      dataArray = reportData.billpayItems;
    } else if (reportData.failedItems) {
      dataArray = reportData.failedItems;
    } else if (reportData.holidays) {
      dataArray = reportData.holidays;
    } else if (reportData.postings) {
      dataArray = reportData.postings;
    } else if (reportData.monthlyCounts) {
      dataArray = reportData.monthlyCounts;
    } else if (reportData.confirmations) {
      dataArray = reportData.confirmations;
    } else if (reportData.changes) {
      dataArray = reportData.changes;
    } else {
      // Fallback for unknown data structure
      if (Object.keys(reportData).length > 0) {
        dataArray = [reportData];
      }
    }
    
    if (dataArray.length === 0) {
      setError('No data to export');
      return;
    }
    
    // Create CSV header and rows
    let header: string;
    if (selectedReport === 'paymentActivity' && Array.isArray(reportData) && reportData.length > 0) {
      header = ['paymentID', 'memberID', 'payeeName', 'amount', 'status', 'dateProcessed', 'dueDate', 'paymentMethod'].join(',');
    } else if (selectedReport === 'errorRecap' && Array.isArray(reportData) && reportData.length > 0) {
      header = ['failedDate', 'memberId', 'paymentId', 'amount', 'payeeId', 'payeeName', 'userPayeeListId', 'usersAccountAtPayee', 'nameOnAccount', 'status', 'hostCode', 'error'].join(',');
    } else {
      header = Object.keys(dataArray[0]).join(',');
    }
    
    const rows = dataArray.map(objectToCsvRow);
    const csv = [header, ...rows].join('\n');
    
    // Create and trigger download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [reportData, selectedReport]);

  // Render form fields based on report metadata
  const renderFormFields = () => {
    const metadata = reportMetadata[selectedReport];
    
    return (
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {metadata.requiresDateRange && (
          <>
            <Grid item xs={12} md={6} lg={3}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => date && setStartDate(date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => date && setEndDate(date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Grid>
          </>
        )}
        
        {metadata.requiresRunDate && (
          <Grid item xs={12} md={6} lg={3}>
            <DatePicker
              label="Run Date"
              value={runDate}
              onChange={(date) => date && setRunDate(date)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
        )}
        
        {metadata.requiresDate && (
          <Grid item xs={12} md={6} lg={3}>
            <DatePicker
              label="Date"
              value={date}
              onChange={(date) => date && setDate(date)}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
        )}
        
        {metadata.requiresSearchType && (
          <Grid item xs={12} md={6} lg={3}>
            <FormControl fullWidth>
              <InputLabel>Search Type</InputLabel>
              <Select
                value={searchType}
                label="Search Type"
                onChange={(e) => setSearchType(e.target.value)}
              >
                {metadata.searchTypes?.map((type) => (
                  <MenuItem key={type} value={type}>
                    {selectedReport === 'paymentActivity' && type in PAYMENT_ACTIVITY_SEARCH_TYPES 
                      ? PAYMENT_ACTIVITY_SEARCH_TYPES[type as keyof typeof PAYMENT_ACTIVITY_SEARCH_TYPES]
                      : selectedReport === 'errorRecap' && type in ERROR_RECAP_SEARCH_TYPES
                        ? ERROR_RECAP_SEARCH_TYPES[type as keyof typeof ERROR_RECAP_SEARCH_TYPES]
                        : type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        
        {metadata.requiresSearchValue && (
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              label="Search Value"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
        )}
        
        {metadata.requiresId && (
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              label="ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Grid>
        )}
        
        {metadata.requiresDays && (
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              label="Days"
              type="number"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value) || 0)}
            />
          </Grid>
        )}
        
        {metadata.requiresReportType && (
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            />
          </Grid>
        )}
        
        {metadata.requiresMemberId && (
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              label="Member ID"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
          </Grid>
        )}
        
        {metadata.requiresPayeeName && (
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              fullWidth
              label="Payee Name"
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
            />
          </Grid>
        )}
      </Grid>
    );
  };

  // Render the report results
  const renderReportResults = () => {
    if (!reportData) return null;
    
    return (
      <Box sx={{ mt: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Table View" />
          <Tab label="JSON View" />
        </Tabs>
        
        {activeTab === 0 && renderTableView()}
        {activeTab === 1 && (
          <Paper sx={{ p: 2, maxHeight: 500, overflow: 'auto' }}>
            <pre style={{ whiteSpace: 'pre-wrap' }}>
              {JSON.stringify(reportData, null, 2)}
            </pre>
          </Paper>
        )}
      </Box>
    );
  };

  // Render table view of report data
  const renderTableView = () => {
    if (!reportData) return null;
    
    // Determine which data array to display
    let dataArray: any[] = [];
    let columns: string[] = [];
    
    // Extract the appropriate data array based on report type
    if (selectedReport === 'paymentActivity' && Array.isArray(reportData)) {
      dataArray = reportData;
      columns = ['paymentID', 'memberID', 'payeeName', 'amount', 'status', 'dateProcessed', 'dueDate', 'paymentMethod'];
    } else if (selectedReport === 'errorRecap' && Array.isArray(reportData)) {
      dataArray = reportData;
      columns = ['failedDate', 'memberId', 'paymentId', 'amount', 'payeeId', 'payeeName', 'status', 'hostCode', 'error'];
    } else if (reportData.payments) {
      dataArray = reportData.payments;
      columns = ['paymentId', 'memberId', 'amount', 'status', 'createdDate', 'scheduledDate', 'payeeName'];
    } else if (reportData.errors) {
      dataArray = reportData.errors;
      columns = ['errorId', 'statusCode', 'errorType', 'errorMessage', 'occurredDate', 'resolvedDate'];
    } else if (reportData.dailyCounts) {
      dataArray = reportData.dailyCounts;
      columns = ['date', 'activeUsers', 'newUsers'];
    } else if (reportData.billpayItems) {
      dataArray = reportData.billpayItems;
      columns = ['id', 'memberId', 'type', 'status', 'amount', 'createdDate'];
    } else if (reportData.failedItems) {
      dataArray = reportData.failedItems;
      columns = ['id', 'memberId', 'amount', 'failedDate', 'reason'];
    } else if (reportData.holidays) {
      dataArray = reportData.holidays;
      columns = ['date', 'name', 'description', 'isBusinessDay'];
    } else if (reportData.postings) {
      dataArray = reportData.postings;
      columns = ['id', 'memberId', 'amount', 'postingDate', 'status'];
    } else if (reportData.monthlyCounts) {
      dataArray = reportData.monthlyCounts;
      columns = ['month', 'activeUsers', 'newUsers'];
    } else if (reportData.confirmations) {
      dataArray = reportData.confirmations;
      columns = ['id', 'processDate', 'itemCount', 'totalAmount', 'status'];
    } else if (reportData.changes) {
      dataArray = reportData.changes;
      columns = ['changeId', 'memberId', 'changeDate', 'changeType', 'oldValue', 'newValue', 'changedBy'];
    } else {
      // Fallback for unknown data structure
      if (Object.keys(reportData).length > 0) {
        dataArray = [reportData];
        columns = Object.keys(reportData);
      }
    }
    
    if (dataArray.length === 0) {
      return <Alert severity="info">No data available</Alert>;
    }
    
    return (
      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="report results table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataArray.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={`${index}-${column}`}>
                    {row[column] !== undefined && row[column] !== null
                      ? typeof row[column] === 'object'
                        ? JSON.stringify(row[column])
                        : String(row[column])
                      : ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h4" gutterBottom color="text.primary">
          Reports
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Report Type</InputLabel>
                  <Select
                    value={selectedReport}
                    label="Report Type"
                    onChange={handleReportChange}
                  >
                    {Object.entries(reportMetadata).map(([key, meta]) => (
                      <MenuItem key={key} value={key}>{meta.label}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>
                    {reportMetadata[selectedReport].description}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            
            {renderFormFields()}
            
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={runReport}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Run Report'}
              </Button>
              
              {reportData && (
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleExportCsv}
                >
                  Export CSV
                </Button>
              )}
            </Box>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
              renderReportResults()
            )}
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default Reports;