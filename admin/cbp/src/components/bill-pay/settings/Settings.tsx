import React, { useState, useEffect } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import SecurityIcon from '@mui/icons-material/Security';
import EventIcon from '@mui/icons-material/Event';
import NotificationTemplates from './NotificationTemplates';
import BillPayConfig from './BillPayConfig';
import BillPaySecuritySettings from './security/BillPaySecuritySettings';
import Holidays from './Holidays';
import { TabPanelProps, SettingsState } from '../../../types/bill-pay.types';

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );
};
const a11yProps = (index: number) => {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
};
const Settings: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [state, setState] = useState<SettingsState>({
    activeTab: 0,
  });
  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setState((prev) => ({ ...prev, activeTab: newValue }));
  };
  // Load last active tab from local storage
  useEffect(() => {
    const savedTab = localStorage.getItem('billPaySettingsTab');
    if (savedTab !== null) {
      setState((prev) => ({
        ...prev,
        activeTab: parseInt(savedTab, 10),
      }));
    }
  }, []);
  // Save active tab to local storage
  useEffect(() => {
    localStorage.setItem('billPaySettingsTab', state.activeTab.toString());
  }, [state.activeTab]);
  return (
    <Box sx={{ width: '100%' }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          color="inherit"
          href="#"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            // Navigate to dashboard
          }}
        >
          Bill Pay
        </Link>
        <Typography color="text.primary">Settings</Typography>
      </Breadcrumbs>
      <Typography variant="h4" sx={{ mb: 3 }} color="text.primary">
        Bill Pay Settings
      </Typography>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={state.activeTab}
          onChange={handleTabChange}
          aria-label="settings tabs"
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons={isMobile ? 'auto' : false}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
          }}
        >
          <Tab
            icon={<SettingsIcon />}
            label={isMobile ? undefined : 'General'}
            {...a11yProps(0)}
          />
          <Tab
            icon={<NotificationsIcon />}
            label={isMobile ? undefined : 'Notifications'}
            {...a11yProps(1)}
          />
          <Tab
            icon={<GroupIcon />}
            label={isMobile ? undefined : 'Permissions'}
            {...a11yProps(2)}
          />
          <Tab
            icon={<SecurityIcon />}
            label={isMobile ? undefined : 'Security'}
            {...a11yProps(3)}
          />
          <Tab
            icon={<EventIcon />}
            label={isMobile ? undefined : 'Holidays'}
            {...a11yProps(4)}
          />
        </Tabs>
        <TabPanel value={state.activeTab} index={0}>
          <BillPayConfig />
        </TabPanel>
        <TabPanel value={state.activeTab} index={1}>
          <NotificationTemplates />
        </TabPanel>
        <TabPanel value={state.activeTab} index={3}>
          <BillPaySecuritySettings />
        </TabPanel>
        <TabPanel value={state.activeTab} index={4}>
          <Holidays />
        </TabPanel>
      </Paper>
    </Box>
  );
};
export default Settings;