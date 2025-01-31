import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const BeneficiaryLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/user-services/beneficiary/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="beneficiary settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Beneficiary Settings"
            value="settings"
            id="beneficiary-tab-settings"
          />
          <Tab
            label="Beneficiary Types"
            value="types"
            id="beneficiary-tab-types"
          />
          <Tab
            label="Verification Rules"
            value="verification"
            id="beneficiary-tab-verification"
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

export default BeneficiaryLanding;
