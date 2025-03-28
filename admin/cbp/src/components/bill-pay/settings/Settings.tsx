import React, { useState, useEffect } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
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
import EventIcon from '@mui/icons-material/Event';
import NotificationTemplates from './NotificationTemplates';
import BillPayConfig from './BillPayConfig';
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
    const savedTab = sessionStorage.getItem('billPaySettingsTab');
    if (savedTab !== null) {
      // Convert the saved tab index, ensuring it's valid for our current tab structure
      const parsedTab = parseInt(savedTab, 10);
      // If the saved tab was 0 (General), default to 0 (now Notifications)
      // If it was 1 or 2, adjust to the new index (0 or 1)
      const adjustedTab = parsedTab >= 1 ? Math.min(parsedTab - 1, 1) : 0;
      
      setState((prev) => ({
        ...prev,
        activeTab: adjustedTab,
      }));
    }
  }, []);
  // Save active tab to local storage
  useEffect(() => {
    sessionStorage.setItem('billPaySettingsTab', state.activeTab.toString());
  }, [state.activeTab]);
  return (
    <Box sx={{ width: '100%' }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          component={RouterLink}
          to="/admin/bill-pay"
          color="inherit"
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
            icon={<NotificationsIcon />}
            label={isMobile ? undefined : 'Notifications'}
            {...a11yProps(0)}
          />
          <Tab
            icon={<EventIcon />}
            label={isMobile ? undefined : 'Holidays'}
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel value={state.activeTab} index={0}>
          <NotificationTemplates />
        </TabPanel>
        <TabPanel value={state.activeTab} index={1}>
          <Holidays />
        </TabPanel>
      </Paper>
      {/* Outlet for rendering nested routes */}
      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
export default Settings;