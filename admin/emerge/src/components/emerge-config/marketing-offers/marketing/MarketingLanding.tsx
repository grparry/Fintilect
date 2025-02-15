import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const MarketingLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/marketing-offers/marketing/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="marketing settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="General Settings"
            value="settings"
            id="marketing-tab-settings"
          />
          <Tab
            label="Deep Target"
            value="deep-target"
            id="marketing-tab-deep-target"
          />
          <Tab
            label="Skip Pay"
            value="skip-pay"
            id="marketing-tab-skip-pay"
          />
          <Tab
            label="Promotions"
            value="promotions"
            id="marketing-tab-promotions"
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

export default MarketingLanding;
