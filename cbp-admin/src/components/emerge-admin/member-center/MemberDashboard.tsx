import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Tabs,
  Tab,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  Container,
} from '@mui/material';
import {
  Person as PersonIcon,
  Payment as PaymentIcon,
  AccountBalanceWallet as WalletIcon,
  Description as DescriptionIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  AccountBalance as AccountIcon,
  CreditCard as CreditCardIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Lock as LockIcon,
  Security as SecurityIcon,
  PhoneAndroid as DeviceIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Visibility as VisibilityIcon,
  History as HistoryIcon,
  Tablet as TabletIcon,
  Computer as ComputerIcon,
  Devices as DevicesIcon,
  PhoneAndroid as PhoneAndroidIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  Member,
  MemberDashboardStats,
  MemberSearchResult,
  MemberSearchFilters,
  Alert as MemberAlert,
  SecurityQuestion,
  DeviceType,
  DeviceStatus,
  Account,
  MemberActivity,
  MemberStatus,
} from '../../../types/member-center.types';
import type { ApiResponse } from '../../../utils/api';
import { memberService } from '../../../services/member.service';
import MemberSearch from './components/search/MemberSearch';
import SearchResults from './components/search/SearchResults';
import MemberSecuritySettings from '../security/MemberSecuritySettings';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const MemberDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<MemberSearchResult | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [expandedInfo, setExpandedInfo] = useState<boolean>(false);
  const [alertsExpanded, setAlertsExpanded] = useState<boolean>(false);
  const [devicesDialogOpen, setDevicesDialogOpen] = useState<boolean>(false);
  const [securitySettingsOpen, setSecuritySettingsOpen] = useState<boolean>(false);
  const [activities, setActivities] = useState<MemberActivity[]>([]);
  const [loadingActivities, setLoadingActivities] = useState<boolean>(false);

  const handleSearch = useCallback(async (filters: MemberSearchFilters) => {
    try {
      setSearching(true);
      setError(null);
      const response = await memberService.searchMembers(filters);
      if (response.success) {
        setSearchResults(response.data);
      } else {
        setError(response.error.message);
        setSearchResults(null);
      }
    } catch (err) {
      setError('Failed to search members');
      console.error('Error searching members:', err);
      setSearchResults(null);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleMemberSelect = async (member: Member) => {
    try {
      setLoading(true);
      setError(null);
      const response = await memberService.getMemberDetails(member.id);
      if (response.success) {
        setSelectedMember(response.data);
        setActiveTab(0); // Reset to overview tab
      } else {
        setError(response.error.message);
        setSelectedMember(null);
      }
    } catch (err) {
      setError('Failed to load member details');
      console.error('Error loading member details:', err);
      setSelectedMember(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (member: Member, newStatus: MemberStatus) => {
    try {
      setError(null);
      const response = await memberService.updateMemberStatus(member.id, newStatus);
      if (response.success) {
        if (searchResults) {
          const updatedMembers = searchResults.members.map(m =>
            m.id === member.id ? { ...m, status: newStatus } : m
          );
          setSearchResults({
            ...searchResults,
            members: updatedMembers,
          });
        }
        if (selectedMember?.id === member.id) {
          setSelectedMember(selectedMember ? { ...selectedMember, status: newStatus } : null);
        }
      } else {
        setError(response.error.message);
      }
    } catch (err) {
      setError('Failed to update member status');
      console.error('Error updating member status:', err);
    }
  };

  const handleRemoveDevice = async (deviceId: string) => {
    if (!selectedMember) return;
    
    try {
      setError(null);
      const response = await memberService.removeDevice(selectedMember.id, deviceId);
      if (response.success) {
        setSelectedMember({
          ...selectedMember,
          devices: selectedMember.devices?.filter(device => device.id !== deviceId) || []
        });
      } else {
        setError(response.error.message);
      }
    } catch (err) {
      setError('Failed to remove device');
      console.error('Error removing device:', err);
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const loadMemberActivities = async (memberId: string) => {
    try {
      setLoadingActivities(true);
      const response = await memberService.getMemberActivity(memberId);
      if (response.success) {
        setActivities(response.data.items);
      } else {
        setError(response.error.message);
        setActivities([]);
      }
    } catch (err) {
      console.error('Error loading member activities:', err);
      setError('Failed to load member activities');
      setActivities([]);
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    if (selectedMember && activeTab === 4) {
      loadMemberActivities(selectedMember.id);
    }
  }, [selectedMember, activeTab]);

  const renderMemberDetails = () => {
    if (!selectedMember) return null;

    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ mb: 2 }}>
          <Tabs value={activeTab} onChange={(event, newValue) => setActiveTab(newValue)} aria-label="member tabs">
            <Tab label="Overview" icon={<PersonIcon />} />
            <Tab label="Accounts" icon={<AccountIcon />} />
            <Tab label="Security" icon={<SecurityIcon />} />
            <Tab label="Alerts" icon={<WarningIcon />} />
            <Tab label="Activity" icon={<DescriptionIcon />} />
          </Tabs>
        </Paper>

        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                    <IconButton
                      onClick={() => setExpandedInfo(!expandedInfo)}
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      {expandedInfo ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${selectedMember.firstName} ${selectedMember.lastName}`}
                        secondary="Name"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText primary={selectedMember.email} secondary="Email" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText primary={selectedMember.phone} secondary="Phone" />
                    </ListItem>
                    <Collapse in={expandedInfo}>
                      <ListItem>
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={selectedMember.address 
                            ? `${selectedMember.address.street}, ${selectedMember.address.city}, ${selectedMember.address.state} ${selectedMember.address.zip}`
                            : 'No address on file'}
                          secondary="Address"
                        />
                      </ListItem>
                    </Collapse>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Account Status
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <AccountIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={selectedMember.accountNumber}
                        secondary="Account Number"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Chip
                            label={selectedMember.status}
                            color={
                              selectedMember.status === 'Active'
                                ? 'success'
                                : selectedMember.status === 'Suspended'
                                ? 'error'
                                : 'warning'
                            }
                            size="small"
                          />
                        }
                        secondary="Status"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            {selectedMember.accounts?.map((account: Account) => (
              <Grid item xs={12} md={6} key={account.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {account.nickname || `${account.type.charAt(0).toUpperCase()}${account.type.slice(1)} Account`}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                      Account #: {account.accountNumber}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body1" component="div">
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <span>Balance:</span>
                          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: account.currency }).format(account.balance)}</span>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <span>Status:</span>
                          <Chip
                            label={account.status}
                            color={account.status === 'active' ? 'success' : account.status === 'frozen' ? 'error' : 'warning'}
                            size="small"
                          />
                        </Box>
                        {account.lastTransaction && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <span>Last Transaction:</span>
                            <span>{new Date(account.lastTransaction).toLocaleDateString()}</span>
                          </Box>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <span>Opened:</span>
                          <span>{new Date(account.openDate).toLocaleDateString()}</span>
                        </Box>
                        {account.interestRate !== undefined && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <span>Interest Rate:</span>
                            <span>{(account.interestRate * 100).toFixed(2)}%</span>
                          </Box>
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<VisibilityIcon />}>
                      View Details
                    </Button>
                    <Button size="small" startIcon={<HistoryIcon />}>
                      Transaction History
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {(!selectedMember.accounts || selectedMember.accounts.length === 0) && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
                    No accounts found for this member.
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Security Settings
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <LockIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Two-Factor Authentication"
                        secondary={
                          selectedMember.securitySettings?.twoFactorEnabled ? 'Enabled' : 'Disabled'
                        }
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setSecuritySettingsOpen(true)}
                      >
                        Manage
                      </Button>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <DeviceIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Registered Devices"
                        secondary={`${selectedMember.devices?.length || 0} devices`}
                      />
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setDevicesDialogOpen(true)}
                      >
                        Manage
                      </Button>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Alerts
                <IconButton
                  onClick={() => setAlertsExpanded(!alertsExpanded)}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  {alertsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Typography>
              <List>
                {selectedMember.alerts?.map((alert) => (
                  <ListItem key={alert.id}>
                    <ListItemIcon>
                      {alert.severity === 'error' ? (
                        <ErrorIcon color="error" />
                      ) : alert.severity === 'warning' ? (
                        <WarningIcon color="warning" />
                      ) : (
                        <InfoIcon color="info" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={alert.message}
                      secondary={`${alert.type} - ${new Date(
                        alert.createdAt
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              {loadingActivities ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <List>
                  {activities.map((activity) => (
                    <ListItem key={activity.id}>
                      <ListItemIcon>
                        {activity.type === 'Login' ? (
                          <LockIcon color="primary" />
                        ) : activity.type === 'PasswordChange' ? (
                          <SecurityIcon color="warning" />
                        ) : activity.type === 'ProfileUpdate' ? (
                          <EditIcon color="info" />
                        ) : (
                          <HistoryIcon />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={activity.description}
                        secondary={
                          <Box component="span">
                            <Typography variant="body2" component="span">
                              {new Date(activity.timestamp).toLocaleString()}
                            </Typography>
                            {activity.device && (
                              <>
                                <br />
                                <Typography variant="body2" component="span">
                                  {`Device: ${activity.device}`}
                                </Typography>
                              </>
                            )}
                            {activity.ipAddress && (
                              <>
                                <br />
                                <Typography variant="body2" color="textSecondary" component="span">
                                  {`IP: ${activity.ipAddress}`}
                                </Typography>
                              </>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                  {activities.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body1" color="textSecondary">
                        No activity records found.
                      </Typography>
                    </Box>
                  )}
                </List>
              )}
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    );
  };

  const renderDevices = () => {
    if (!selectedMember?.devices) return null;

    return (
      <List>
        {selectedMember.devices.map((device) => (
          <ListItem key={device.id}>
            <ListItemIcon>
              {device.type === 'mobile' ? <PhoneAndroidIcon /> : <ComputerIcon />}
            </ListItemIcon>
            <ListItemText
              primary={device.name}
              secondary={`Last used: ${new Date(device.lastUsed).toLocaleDateString()}`}
            />
            <IconButton
              onClick={() => handleRemoveDevice(device.id)}
              size="small"
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column'
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Member Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!selectedMember ? (
        <>
          <Card sx={{ mb: 3, width: '100%' }}>
            <CardContent>
              <MemberSearch onSearch={handleSearch} />
              {searching ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                searchResults && (
                  <SearchResults
                    results={searchResults}
                    onSelect={handleMemberSelect}
                    onUpdateStatus={handleUpdateStatus}
                  />
                )
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        renderMemberDetails()
      )}

      <Dialog
        open={devicesDialogOpen}
        onClose={() => setDevicesDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DevicesIcon />
            <Typography variant="h6">Registered Devices</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          {renderDevices()}
        </DialogContent>
      </Dialog>

      {selectedMember && (
        <MemberSecuritySettings
          open={securitySettingsOpen}
          onClose={() => setSecuritySettingsOpen(false)}
          memberId={selectedMember.id}
        />
      )}
    </Box>
  );
};

export default MemberDashboard;
