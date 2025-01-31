import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckReorderLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/document-services/check-reorder/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="check reorder settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="General Settings"
            value="settings"
            id="check-reorder-tab-settings"
          />
          <Tab
            label="Harland Check Reorder"
            value="harland"
            id="check-reorder-tab-harland"
          />
          <Tab
            label="Main Street Check Reorder"
            value="main-street"
            id="check-reorder-tab-main-street"
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

export default CheckReorderLanding;
