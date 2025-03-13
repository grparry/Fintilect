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
  { value: 'FisPayeeId', label: 'FIS Payee ID' },
  { value: 'PayeeId', label: 'Payee ID' },
  { value: 'MemberId', label: 'Member ID' },
  { value: 'PaymentId', label: 'Payment ID' },
  { value: 'RecurringPaymentId', label: 'Recurring Payment ID' },
  { value: 'PayeeName', label: 'Payee Name' },
  { value: 'MemberIdAndDate', label: 'Member ID and Date' },
  { value: 'MemberIdAndPayeeName', label: 'Member ID and Payee Name' },
  { value: 'MemberIdAndDateAndPayeeName', label: 'Member ID, Date, and Payee Name' }
];

// Helper function to get appropriate placeholder text based on search type
const getSearchPlaceholder = (type: string): string => {
  switch (type) {
    case 'Date':
      return 'Using date range only';
    case 'MemberId':
      return 'Enter Member ID';
    case 'PayeeId':
      return 'Enter Payee ID';
    case 'PaymentId':
      return 'Enter Payment ID';
    case 'RecurringPaymentId':
      return 'Enter Recurring Payment ID';
    case 'FisPayeeId':
      return 'Enter FIS Payee ID';
    case 'PayeeName':
      return 'Enter Payee Name';
    case 'MemberIdAndDate':
      return 'Enter Member ID';
    case 'MemberIdAndPayeeName':
      return 'Enter Member ID,Payee Name';
    case 'MemberIdAndDateAndPayeeName':
      return 'Enter Member ID,Payee Name';
    case 'UserPayeeListId':
      return 'Enter User Payee List ID';
    default:
      return `Enter ${type}`;
  }
};

// Helper function to get appropriate helper text based on search type
const getSearchHelperText = (type: string): string => {
  switch (type) {
    case 'Date':
      return 'Date range search only requires start and end dates';
    case 'MemberIdAndDate':
      return 'Date range will be applied with Member ID';
    case 'MemberIdAndPayeeName':
      return 'Format: MemberID,PayeeName';
    case 'MemberIdAndDateAndPayeeName':
      return 'Format: MemberID,PayeeName (Date range will be applied)';
    default:
      return '';
  }
};

const ChangeHistory: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs().subtract(1, 'month'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('MemberId');
  
  // Dedicated search fields for different search types
  const [memberId, setMemberId] = useState('');
  const [payeeName, setPayeeName] = useState('');
  const [fisPayeeId, setFisPayeeId] = useState('');
  const [payeeId, setPayeeId] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [routingNumber, setRoutingNumber] = useState('');
  
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
    // Clear all search values when switching tabs
    setSearchValue('');
    setMemberId('');
    setPayeeName('');
    setFisPayeeId('');
    setPayeeId('');
    setAccountNumber('');
    setRoutingNumber('');
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

    // Validate search value based on search type
    if (!searchValue.trim()) {
      setUserHistoryError(`Please enter a value for ${searchType} search`);
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

    // Prepare search value based on search type
    let finalSearchValue = '';
    
    switch (searchType) {
      case 'Date':
        // For Date search type, no search value is needed
        finalSearchValue = '';
        break;
        
      case 'MemberIdAndPayeeName':
        // Validate both fields are provided
        if (!memberId.trim()) {
          setGlobalHistoryError('Please enter a Member ID');
          return;
        }
        if (!payeeName.trim()) {
          setGlobalHistoryError('Please enter a Payee Name');
          return;
        }
        // Combine values with comma separator
        finalSearchValue = `${memberId.trim()},${payeeName.trim()}`;
        break;
        
      case 'MemberIdAndDateAndPayeeName':
        // Validate both fields are provided
        if (!memberId.trim()) {
          setGlobalHistoryError('Please enter a Member ID');
          return;
        }
        if (!payeeName.trim()) {
          setGlobalHistoryError('Please enter a Payee Name');
          return;
        }
        // Combine values with comma separator
        finalSearchValue = `${memberId.trim()},${payeeName.trim()}`;
        break;
        
      case 'MemberIdAndDate':
        // Validate Member ID is provided
        if (!memberId.trim()) {
          setGlobalHistoryError('Please enter a Member ID');
          return;
        }
        finalSearchValue = memberId.trim();
        break;
        
      case 'MemberId':
        // Validate Member ID is provided
        if (!memberId.trim()) {
          setGlobalHistoryError('Please enter a Member ID');
          return;
        }
        finalSearchValue = memberId.trim();
        break;
        
      case 'FisPayeeId':
        // Validate FIS Payee ID is provided
        if (!fisPayeeId.trim()) {
          setGlobalHistoryError('Please enter a FIS Payee ID');
          return;
        }
        finalSearchValue = fisPayeeId.trim();
        break;
        
      case 'PayeeId':
        // Validate Payee ID is provided
        if (!payeeId.trim()) {
          setGlobalHistoryError('Please enter a Payee ID');
          return;
        }
        finalSearchValue = payeeId.trim();
        break;
        
      case 'AccountNumber':
        // Validate Account Number is provided
        if (!accountNumber.trim()) {
          setGlobalHistoryError('Please enter an Account Number');
          return;
        }
        finalSearchValue = accountNumber.trim();
        break;
        
      case 'RoutingNumber':
        // Validate Routing Number is provided
        if (!routingNumber.trim()) {
          setGlobalHistoryError('Please enter a Routing Number');
          return;
        }
        finalSearchValue = routingNumber.trim();
        break;
        
      case 'PayeeName':
        // Validate Payee Name is provided
        if (!payeeName.trim()) {
          setGlobalHistoryError('Please enter a Payee Name');
          return;
        }
        finalSearchValue = payeeName.trim();
        break;
        
      default:
        // For all other search types, validate search value is provided
        if (!searchValue.trim()) {
          setGlobalHistoryError(`Please enter a value for ${searchType} search`);
          return;
        }
        finalSearchValue = searchValue.trim();
    }

    try {
      setIsGlobalHistoryLoading(true);
      setGlobalHistoryError(null);

      // Format request according to CBP Report API requirements
      const request: GlobalPayeeChangeHistoryReportRequest = {
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        searchValue: finalSearchValue,
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
              {/* Dynamic search fields based on search type */}
              {activeTab === 1 ? (
                // Dedicated search fields for global history
                <>
                  {searchType === 'MemberId' && (
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Member ID"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Enter Member ID"
                      />
                    </Grid>
                  )}
                  {(searchType === 'MemberIdAndPayeeName' || searchType === 'MemberIdAndDateAndPayeeName') && (
                    <>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Member ID"
                          value={memberId}
                          onChange={(e) => setMemberId(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                          placeholder="Enter Member ID"
                        />
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Payee Name"
                          value={payeeName}
                          onChange={(e) => setPayeeName(e.target.value)}
                          placeholder="Enter Payee Name"
                        />
                      </Grid>
                    </>
                  )}
                  {searchType === 'FisPayeeId' && (
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="FIS Payee ID"
                        value={fisPayeeId}
                        onChange={(e) => setFisPayeeId(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Enter FIS Payee ID"
                      />
                    </Grid>
                  )}
                  {searchType === 'PayeeId' && (
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Payee ID"
                        value={payeeId}
                        onChange={(e) => setPayeeId(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Enter Payee ID"
                      />
                    </Grid>
                  )}
                  {searchType === 'AccountNumber' && (
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Account Number"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Enter Account Number"
                      />
                    </Grid>
                  )}
                  {searchType === 'RoutingNumber' && (
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Routing Number"
                        value={routingNumber}
                        onChange={(e) => setRoutingNumber(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Enter Routing Number"
                      />
                    </Grid>
                  )}
                  {searchType === 'MemberIdAndDate' && (
                    <Grid item xs={12} sm={2}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Member ID"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Enter Member ID"
                      />
                    </Grid>
                  )}
                  {(searchType !== 'Date' && 
                    searchType !== 'MemberIdAndPayeeName' && 
                    searchType !== 'MemberIdAndDateAndPayeeName' && 
                    searchType !== 'MemberIdAndDate' && 
                    searchType !== 'FisPayeeId' && 
                    searchType !== 'PayeeId' && 
                    searchType !== 'AccountNumber' && 
                    searchType !== 'RoutingNumber' && 
                    searchType !== 'MemberId') && (
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
                        placeholder={getSearchPlaceholder(searchType)}
                        disabled={searchType === 'Date'}
                        helperText={getSearchHelperText(searchType)}
                      />
                    </Grid>
                  )}
                </>
              ) : (
                // Standard search field for other search types
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
                    placeholder={getSearchPlaceholder(searchType)}
                    disabled={searchType === 'Date'}
                    helperText={getSearchHelperText(searchType)}
                  />
                </Grid>
              )}
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
