import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
  PhoneAndroid as PhoneAndroidIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Visibility as VisibilityIcon,
  Close as CloseIcon,
  Update as UpdateIcon,
  Computer as ComputerIcon,
  History as HistoryIcon,
  Devices as DevicesIcon,
} from '@mui/icons-material';
import {
  Member,
  MemberSearchFilters,
  MemberSearchResult,
  MemberActivity,
  Alert as MemberAlert,
  MemberStatus,
  SecuritySettings,
  Device,
  Account
} from '../../../types/member-center.types';
import type { ApiResponse } from '../../../types/api.types';
import { IMemberService } from '../../../services/interfaces/IMemberService';
import { useService } from '../../../hooks/useService';
import MemberSearch from './components/search/MemberSearch';
import SearchResults from './components/search/SearchResults';
import MemberSecuritySettings from './security/MemberSecuritySettings';
import ManageDevicesDialog from './ManageDevicesDialog';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div role="tabpanel" hidden={value !== index}>



  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

  




    





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
                    <IconButton
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
                            ? `${selectedMember.address.street}, ${selectedMember.address.city}, ${selectedMember.address.state} ${selectedMember.address.zip}`
                            : 'No address on file'}
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
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <AccountIcon />
                      </ListItemIcon>
                      <ListItemText
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircleIcon />
                      </ListItemIcon>
                      <ListItemText
                          <Chip
                                ? 'success'
                                : selectedMember.status === 'Suspended'
                                ? 'error'
                                : 'warning'
                          />
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
                    </Button>
                    <Button size="small" startIcon={<HistoryIcon />}>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
            {(!selectedMember.accounts || selectedMember.accounts.length === 0) && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body1" color="textSecondary">
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
                  </Typography>
                  <List>
                    {selectedMember.securitySettings && (
                      <>
                        <ListItem>
                          <ListItemIcon>
                            <LockIcon />
                          </ListItemIcon>
                          <ListItemText
                          />
                          <Button
                          >
                          </Button>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <DevicesIcon />
                          </ListItemIcon>
                          <ListItemText
                          />
                          <Button
                          >
                          </Button>
                        </ListItem>
                      </>
                    )}
                    <ListItem>
                      <ListItemIcon>
                        <UpdateIcon />
                      </ListItemIcon>
                      <ListItemText
                          'Not available'}
                      />
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
                <IconButton
                >
                  {alertsExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Typography>
              <List>
                {selectedMember.alerts?.map((alert: MemberAlert) => (
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
                        <Typography variant="body2" component="span">
                          {`${alert.type} - ${new Date(alert.createdAt).toLocaleDateString()}`}
                          {alert.expiresAt && ` (Expires: ${new Date(alert.expiresAt).toLocaleDateString()})`}
                          {alert.acknowledged && ' - Acknowledged'}
                        </Typography>
                    />
                  </ListItem>
                ))}
                {(!selectedMember.alerts || selectedMember.alerts.length === 0) && (
                  <ListItem>
                    <ListItemText
                    />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={activeTab} index={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
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
                      />
                    </ListItem>
                  ))}
                  {activities.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography variant="body1" color="textSecondary">
                      </Typography>
                    </Box>
                  )}
                </List>
              )}
            </CardContent>
          </Card>
        </TabPanel>
        
        {/* Add ManageDevicesDialog */}
        {selectedMember && (
          <ManageDevicesDialog
                ...selectedMember,
          />
        )}
      </Box>
    );


      <List>
        {selectedMember.devices.map((device: Device) => (
          <ListItem key={device.id}>
            <ListItemIcon>
              {device.type === 'mobile' ? <PhoneAndroidIcon /> : <ComputerIcon />}
            </ListItemIcon>
            <ListItemText
                <Typography variant="body2" component="div">
                  {`Last used: ${new Date(device.lastUsed).toLocaleDateString()}`}
                  {device.browser && <Box component="span">{` - ${device.browser}`}</Box>}
                  {device.operatingSystem && <Box component="span">{` - ${device.operatingSystem}`}</Box>}
                  {device.location && <Box component="span">{` - ${device.location}`}</Box>}
                  <Box component="span" sx={{ display: 'block', mt: 0.5 }}>
                    />
                    {device.trusted && (
                      <Chip 
                      />
                    )}
                  </Box>
                </Typography>
            />
            <IconButton
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
        {selectedMember.devices.length === 0 && (
          <ListItem>
            <ListItemText
            />
          </ListItem>
        )}
      </List>
    );

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );

    <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!selectedMember ? (
        <Card sx={{ mb: 3, width: '100%' }}>
          <CardContent>
            <MemberSearch onSearch={handleSearch} />
            {searching ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
                <CircularProgress />
              </Box>
            ) : (
                <SearchResults
                />
              )
            )}
          </CardContent>
        </Card>
      ) : (
      )}

      <Dialog
      >
        <DialogTitle>
          <IconButton
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {renderDevices()}
        </DialogContent>
      </Dialog>

      <Dialog
      >
        <DialogTitle>
          <IconButton
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedMember && (
            <MemberSecuritySettings
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );

