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
import HistoryIcon from '@mui/icons-material/History';
import NotificationTemplates from './NotificationTemplates';
import BillPayConfig from './BillPayConfig';
import PermissionGroups from './PermissionGroups';
import BillPaySecuritySettings from './security/BillPaySecuritySettings';
import Holidays from './Holidays';
import AuditLog from './AuditLog';
import { TabPanelProps, SettingsState } from '../../types/bill-pay.types';

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other


  ...other
    <div
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>}
    </div>
  );

    'aria-controls': `settings-tabpanel-${index}`,

  

  // Handle tab change

  // Load last active tab from local storage
        ...prev,

  // Save active tab to local storage

    <Box sx={{ width: '100%' }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
            // Navigate to dashboard
        >
        </Link>
        <Typography color="text.primary">Settings</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mb: 3 }}>
      </Typography>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        >
          <Tab
            {...a11yProps(0)}
          />
          <Tab
            {...a11yProps(1)}
          />
          <Tab
            {...a11yProps(2)}
          />
          <Tab
            {...a11yProps(3)}
          />
          <Tab
            {...a11yProps(4)}
          />
          <Tab
            {...a11yProps(5)}
          />
        </Tabs>

        <TabPanel value={state.activeTab} index={0}>
          <BillPayConfig />
        </TabPanel>
        <TabPanel value={state.activeTab} index={1}>
          <NotificationTemplates />
        </TabPanel>
        <TabPanel value={state.activeTab} index={2}>
          <PermissionGroups />
        </TabPanel>
        <TabPanel value={state.activeTab} index={3}>
          <BillPaySecuritySettings />
        </TabPanel>
        <TabPanel value={state.activeTab} index={4}>
          <Holidays />
        </TabPanel>
        <TabPanel value={state.activeTab} index={5}>
          <AuditLog />
        </TabPanel>
      </Paper>
    </Box>
  );

