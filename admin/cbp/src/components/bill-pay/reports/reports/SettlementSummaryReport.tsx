import React, { useState, useCallback, useEffect } from 'react';
import logger from '../../../../utils/logger';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  FormHelperText,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  SelectChangeEvent
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ReportContainer from '../components/ReportContainer';
import { 
  getSettlementSummary, 
  SettlementSummarySearchType, 
  SETTLEMENT_SUMMARY_SEARCH_TYPES, 
  SettlementSummaryItem 
} from '../../../../utils/reports/settlementSummary';
import { reportService } from '../../../../services/factory/ServiceFactory';
import { useSnackbar } from 'notistack';

// TabPanel component for displaying tab content
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settlement-summary-tabpanel-${index}`}
      aria-labelledby={`settlement-summary-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Helper function for tab accessibility
function a11yProps(index: number) {
  return {
    id: `settlement-summary-tab-${index}`,
    'aria-controls': `settlement-summary-tabpanel-${index}`,
  };
}

const SettlementSummaryReport: React.FC = () => {
  // Report state
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<SettlementSummaryItem[] | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  
  // Search parameters
  const [searchType, setSearchType] = useState<SettlementSummarySearchType>(SettlementSummarySearchType.DateRange);
  const [singleDate, setSingleDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs().subtract(7, 'day'));
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [month, setMonth] = useState<string>((dayjs().month() + 1).toString()); // 1-12
  const [year, setYear] = useState<number>(dayjs().year());

  // Validation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { enqueueSnackbar } = useSnackbar();

  // Group report data by category based on the API response
  const processingSummaryData = reportData?.filter(item => [
    'ScheduledPayments', 'CoreRejections', 'Duplicates', 'Rejections', 'FailedProcessing',
    'ProcessingSummaryNetBalance'
  ].includes(item.categoryName || '')) || [];
  
  const settlementAccountSummaryData = reportData?.filter(item => [
    'IntoSettlementAccount', 'SettlementAccountSummaryNetBalance'
  ].includes(item.categoryName || '')) || [];
  
  const remittanceProcessorSummaryData = reportData?.filter(item => [
    'SentToRemittanceProcessor', 'ProcessorExceptions', 'BadRecordsAndExceptions',
    'StopsAndRefunds', 'StaleDated', 'AdjustedPayments', 'PayeeReturns', 'RemittedToPayee',
    'RemittanceProcessorSummaryNetBalance'
  ].includes(item.categoryName || '')) || [];

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Handle search type change
  const handleSearchTypeChange = (event: SelectChangeEvent) => {
    setSearchType(event.target.value as SettlementSummarySearchType);
    // Clear errors when search type changes
    setErrors({});
  };

  // Handle month change
  const handleMonthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  // Handle year change
  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(Number(event.target.value));
  };

  // Run report
  const runReport = useCallback(async () => {
    // Validate input based on search type
    const newErrors: Record<string, string> = {};
    
    if (searchType === SettlementSummarySearchType.SingleDate && !singleDate) {
      newErrors.singleDate = 'Date is required';
    }
    
    if (searchType === SettlementSummarySearchType.DateRange) {
      if (!startDate) {
        newErrors.startDate = 'Start date is required';
      }
      if (!endDate) {
        newErrors.endDate = 'End date is required';
      }
      if (startDate && endDate && startDate.isAfter(endDate)) {
        newErrors.dateRange = 'Start date must be before end date';
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});
    
    try {
      const params: any = {
        searchType
      };
      
      // Add parameters based on search type
      switch (searchType) {
        case SettlementSummarySearchType.SingleDate:
          params.selectedSingleDate = singleDate?.format('YYYY-MM-DD');
          break;
        case SettlementSummarySearchType.MonthYear:
          params.monthSelected = parseInt(month, 10);
          params.yearSelected = year;
          break;
        case SettlementSummarySearchType.Year:
          params.yearSelected = year;
          break;
        case SettlementSummarySearchType.DateRange:
          params.selectedStartDate = startDate?.format('YYYY-MM-DD');
          params.selectedEndDate = endDate?.format('YYYY-MM-DD');
          break;
      }
      
      const data = await getSettlementSummary(params);
      setReportData(data);
    } catch (error) {
      logger.error('Error fetching settlement summary report:', error);
      enqueueSnackbar('Failed to fetch settlement summary report. Please try again.', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  }, [searchType, singleDate, startDate, endDate, month, year, enqueueSnackbar]);

  // Run the report only on initial load
  useEffect(() => {
    // Only run on initial component mount if we have default parameters set
    if (startDate && endDate && searchType === SettlementSummarySearchType.DateRange) {
      runReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format currency values
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  // Render summary table
  const renderSummaryTable = (data: SettlementSummaryItem[]) => {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell align="right">{item.count}</TableCell>
                <TableCell 
                  align="right" 
                  sx={{ 
                    color: item.amount < 0 ? 'error.main' : 'inherit'
                  }}
                >
                  {formatCurrency(item.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <ReportContainer 
      title="Settlement Summary Report"
      onRunReport={runReport}
      loading={loading}
      error={null}
      hasData={!!reportData && reportData.length > 0}>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth error={!!errors.searchType}>
              <InputLabel id="search-type-label">Search Type</InputLabel>
              <Select
                labelId="search-type-label"
                id="search-type"
                value={searchType}
                label="Search Type"
                onChange={handleSearchTypeChange}
              >
                {Object.entries(SETTLEMENT_SUMMARY_SEARCH_TYPES).map(([value, label]) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
              {errors.searchType && <FormHelperText>{errors.searchType}</FormHelperText>}
            </FormControl>
          </Grid>

          {/* Single Date Search */}
          {searchType === SettlementSummarySearchType.SingleDate && (
            <Grid item xs={12} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={singleDate}
                  onChange={(newValue) => setSingleDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.singleDate,
                      helperText: errors.singleDate
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
          )}

          {/* Month/Year Search */}
          {searchType === SettlementSummarySearchType.MonthYear && (
            <>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="month-label">Month</InputLabel>
                  <Select
                    labelId="month-label"
                    id="month"
                    value={month.toString()}
                    label="Month"
                    onChange={handleMonthChange}
                  >
                    <MenuItem value="1">January</MenuItem>
                    <MenuItem value="2">February</MenuItem>
                    <MenuItem value="3">March</MenuItem>
                    <MenuItem value="4">April</MenuItem>
                    <MenuItem value="5">May</MenuItem>
                    <MenuItem value="6">June</MenuItem>
                    <MenuItem value="7">July</MenuItem>
                    <MenuItem value="8">August</MenuItem>
                    <MenuItem value="9">September</MenuItem>
                    <MenuItem value="10">October</MenuItem>
                    <MenuItem value="11">November</MenuItem>
                    <MenuItem value="12">December</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value, 10))}
                  InputProps={{ inputProps: { min: 2000, max: 2100 } }}
                />
              </Grid>
            </>
          )}

          {/* Year Search */}
          {searchType === SettlementSummarySearchType.Year && (
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Year"
                type="number"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10))}
                InputProps={{ inputProps: { min: 2000, max: 2100 } }}
              />
            </Grid>
          )}

          {/* Date Range Search */}
          {searchType === SettlementSummarySearchType.DateRange && (
            <>
              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.startDate,
                        helperText: errors.startDate
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} md={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    slotProps={{
                      textField: {
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
                  <Typography color="error" variant="caption">
                    {errors.dateRange}
                  </Typography>
                </Grid>
              )}
            </>
          )}


        </Grid>
      </Box>

      {reportData && reportData.length > 0 && (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              aria-label="settlement summary tabs"
              variant="fullWidth"
            >
              <Tab label="Processing Summary" {...a11yProps(0)} />
              <Tab label="Settlement Account Summary" {...a11yProps(1)} />
              <Tab label="Remittance Processor Summary" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={activeTab} index={0}>
            {renderSummaryTable(processingSummaryData)}
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            {renderSummaryTable(settlementAccountSummaryData)}
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            {renderSummaryTable(remittanceProcessorSummaryData)}
          </TabPanel>
        </Box>
      )}

      {reportData && reportData.length === 0 && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          No data found for the selected criteria.
        </Typography>
      )}
    </ReportContainer>
  );
};

export default SettlementSummaryReport;
