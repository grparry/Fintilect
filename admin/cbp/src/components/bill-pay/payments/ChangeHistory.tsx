import React, { useState } from 'react';
import { ServiceFactory } from '../../../services/factory/ServiceFactory';
import { IPayeeService } from '../../../services/interfaces/IPayeeService';
import {
  UserPayeeChangeHistoryResponse,
  GlobalPayeeChangeHistoryResponse,
  UserPayeeChangeHistoryReportRequest,
  GlobalPayeeChangeHistoryReportRequest
} from '../../../types/payees.types';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Grid,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`change-history-tabpanel-${index}`}
      aria-labelledby={`change-history-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `change-history-tab-${index}`,
    'aria-controls': `change-history-tabpanel-${index}`,
  };
};

// Search type options for each tab
const USER_SEARCH_TYPES = [
  { value: 'MemberId', label: 'Member ID' },
  { value: 'UserPayeeListId', label: 'User Payee List ID' }
];

const GLOBAL_SEARCH_TYPES = [
  { value: 'Date', label: 'Date Range' },
  { value: 'FisPayeeId', label: 'FIS Payee ID' }
];

const ChangeHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(1, 'month'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('MemberId');
  
  const [userHistories, setUserHistories] = useState<UserPayeeChangeHistoryResponse[]>([]);
  const [globalHistories, setGlobalHistories] = useState<GlobalPayeeChangeHistoryResponse[]>([]);
  
  const [isUserHistoryLoading, setIsUserHistoryLoading] = useState(false);
  const [isGlobalHistoryLoading, setIsGlobalHistoryLoading] = useState(false);
  
  const [userHistoryError, setUserHistoryError] = useState<string | null>(null);
  const [globalHistoryError, setGlobalHistoryError] = useState<string | null>(null);

  const payeeService = ServiceFactory.getInstance().getPayeeService();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    // Reset search type based on active tab
    if (newValue === 0) {
      setSearchType(USER_SEARCH_TYPES[0].value);
    } else {
      setSearchType(GLOBAL_SEARCH_TYPES[0].value);
    }
    // Clear search value when switching tabs
    setSearchValue('');
  };

  const handleSearchUserHistory = async () => {
    if (!startDate || !endDate) {
      setUserHistoryError('Please select both start and end dates');
      return;
    }

    if (startDate > endDate) {
      setUserHistoryError('Start date cannot be after end date');
      return;
    }

    try {
      setIsUserHistoryLoading(true);
      setUserHistoryError(null);

      const request: UserPayeeChangeHistoryReportRequest = {
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        searchValue: searchValue,
        searchType: searchType
      };

      const response = await payeeService.getUserPayeeChangeHistory(request);
      setUserHistories(response.histories || []);
    } catch (err) {
      setUserHistoryError('Failed to retrieve user change history. Please try again.');
      console.error('Error retrieving user change history:', err);
    } finally {
      setIsUserHistoryLoading(false);
    }
  };

  const handleSearchGlobalHistory = async () => {
    if (!startDate || !endDate) {
      setGlobalHistoryError('Please select both start and end dates');
      return;
    }

    if (startDate > endDate) {
      setGlobalHistoryError('Start date cannot be after end date');
      return;
    }

    try {
      setIsGlobalHistoryLoading(true);
      setGlobalHistoryError(null);

      const request: GlobalPayeeChangeHistoryReportRequest = {
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        searchValue: searchValue,
        searchType: searchType
      };

      const response = await payeeService.getGlobalPayeeChangeHistory(request);
      setGlobalHistories(response.histories || []);
    } catch (err) {
      setGlobalHistoryError('Failed to retrieve global change history. Please try again.');
      console.error('Error retrieving global change history:', err);
    } finally {
      setIsGlobalHistoryLoading(false);
    }
  };

  const handleSearch = () => {
    if (activeTab === 0) {
      handleSearchUserHistory();
    } else {
      handleSearchGlobalHistory();
    }
  };

  return (
    <Card sx={{ width: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Payee Change History
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="change history tabs"
          >
            <Tab label="User Change History" {...a11yProps(0)} />
            <Tab label="Global Change History" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* Search Controls - Common for both tabs */}
        <Box sx={{ mb: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      size: 'small',
                      error: (activeTab === 0 && !!userHistoryError && !startDate) || 
                             (activeTab === 1 && !!globalHistoryError && !startDate)
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      size: 'small',
                      error: (activeTab === 0 && !!userHistoryError && !endDate) || 
                             (activeTab === 1 && !!globalHistoryError && !endDate)
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl fullWidth size="small">
                  <InputLabel>Search Type</InputLabel>
                  <Select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    label="Search Type"
                  >
                    {(activeTab === 0 ? USER_SEARCH_TYPES : GLOBAL_SEARCH_TYPES).map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  size="small"
                  label="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder={searchType === 'Date' ? 'Using date range only' : `Enter ${searchType}`}
                  disabled={searchType === 'Date'}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSearch}
                  disabled={isUserHistoryLoading || isGlobalHistoryLoading || !startDate || !endDate}
                  startIcon={
                    (activeTab === 0 && isUserHistoryLoading) || (activeTab === 1 && isGlobalHistoryLoading) 
                      ? <CircularProgress size={20} color="inherit" /> 
                      : undefined
                  }
                >
                  {(activeTab === 0 && isUserHistoryLoading) || (activeTab === 1 && isGlobalHistoryLoading) 
                    ? 'Searching...' 
                    : 'Search'}
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>

        {/* Error Messages */}
        {activeTab === 0 && userHistoryError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {userHistoryError}
          </Alert>
        )}
        {activeTab === 1 && globalHistoryError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {globalHistoryError}
          </Alert>
        )}

        {/* User Change History Tab */}
        <TabPanel value={activeTab} index={0}>
          {userHistories.length > 0 ? (
            <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 600, overflow: 'auto' }}>
              <Table stickyHeader size="small" aria-label="user change history table">
                <TableHead>
                  <TableRow>
                    <TableCell>Member ID</TableCell>
                    <TableCell>Payee Name</TableCell>
                    <TableCell>Change Type</TableCell>
                    <TableCell>Updated By</TableCell>
                    <TableCell>Updated On</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Account Number</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userHistories.map((history, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{history.memberId}</TableCell>
                      <TableCell>{history.payeeName}</TableCell>
                      <TableCell>{history.changeType}</TableCell>
                      <TableCell>{history.updatedBy}</TableCell>
                      <TableCell>{new Date(history.updatedOn).toLocaleString()}</TableCell>
                      <TableCell>{history.reason}</TableCell>
                      <TableCell>{history.usersAccountAtPayee}</TableCell>
                      <TableCell>{history.paymentMethod}</TableCell>
                      <TableCell>{history.active === null ? 'N/A' : history.active ? 'Active' : 'Inactive'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
              {isUserHistoryLoading 
                ? 'Loading user change history...' 
                : 'No user change history records found. Please adjust your search criteria.'}
            </Typography>
          )}
        </TabPanel>

        {/* Global Change History Tab */}
        <TabPanel value={activeTab} index={1}>
          {globalHistories.length > 0 ? (
            <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 600, overflow: 'auto' }}>
              <Table stickyHeader size="small" aria-label="global change history table">
                <TableHead>
                  <TableRow>
                    <TableCell>Record Type</TableCell>
                    <TableCell>Payee Name</TableCell>
                    <TableCell>Member ID</TableCell>
                    <TableCell>Member Name</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>City</TableCell>
                    <TableCell>State</TableCell>
                    <TableCell>Zip</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {globalHistories.map((history, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{history.recordType}</TableCell>
                      <TableCell>{history.payeeName}</TableCell>
                      <TableCell>{history.memberId}</TableCell>
                      <TableCell>
                        {`${history.memberFirstName || ''} ${history.memberMiddleName || ''} ${history.memberLastName || ''}`.trim()}
                      </TableCell>
                      <TableCell>{history.addressLine1}</TableCell>
                      <TableCell>{history.city}</TableCell>
                      <TableCell>{history.state}</TableCell>
                      <TableCell>{history.zipCode}</TableCell>
                      <TableCell>{history.payeeStatus}</TableCell>
                      <TableCell>{history.reason}</TableCell>
                      <TableCell>{new Date(history.insertDate).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
              {isGlobalHistoryLoading 
                ? 'Loading global change history...' 
                : 'No global change history records found. Please adjust your search criteria.'}
            </Typography>
          )}
        </TabPanel>
      </CardContent>
    </Card>
  );
};

export default ChangeHistory;
