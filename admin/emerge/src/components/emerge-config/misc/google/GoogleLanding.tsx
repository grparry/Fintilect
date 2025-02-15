import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const GoogleLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/misc/google/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="google settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="General Settings"
            value="settings"
            id="google-tab-settings"
          />
          <Tab
            label="Google Tags"
            value="tags"
            id="google-tab-tags"
          />
          <Tab
            label="Analytics"
            value="analytics"
            id="google-tab-analytics"
          />
          <Tab
            label="API Settings"
            value="api"
            id="google-tab-api"
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

export default GoogleLanding;
