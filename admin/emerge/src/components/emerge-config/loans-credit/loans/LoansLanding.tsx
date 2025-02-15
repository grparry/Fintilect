import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const LoansLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/loans-credit/loans/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="loan management tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Loan Settings"
            value="settings"
            id="loans-tab-settings"
          />
          <Tab
            label="Loan Offers"
            value="offers"
            id="loans-tab-offers"
          />
          <Tab
            label="Qcash Loan Application"
            value="qcash"
            id="loans-tab-qcash"
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

export default LoansLanding;
