import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorMessagesLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/compliance-support/error-messages/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="error messages settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="General Settings"
            value="settings"
            id="error-messages-tab-settings"
          />
          <Tab
            label="Message Templates"
            value="templates"
            id="error-messages-tab-templates"
          />
          <Tab
            label="Custom Messages"
            value="custom"
            id="error-messages-tab-custom"
          />
          <Tab
            label="Error Codes"
            value="codes"
            id="error-messages-tab-codes"
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

export default ErrorMessagesLanding;
