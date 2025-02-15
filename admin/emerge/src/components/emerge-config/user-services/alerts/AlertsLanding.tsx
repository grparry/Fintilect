import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const AlertsLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/user-services/alerts/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="alerts settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Alert Settings"
            value="settings"
            id="alerts-tab-settings"
          />
          <Tab
            label="Alert Types"
            value="types"
            id="alerts-tab-types"
          />
          <Tab
            label="Notification Preferences"
            value="preferences"
            id="alerts-tab-preferences"
          />
        </Tabs>
      </Box>
      {/* Content area for the child routes */}
      <Box sx={{ p: 3 }}>
        {/* Child components will be rendered here by the router */}
      </Box>
    </Box>
  );
};

export default AlertsLanding;
