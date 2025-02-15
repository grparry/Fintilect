import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const AddressLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'verification';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/user-services/address/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="address settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Address Verification"
            value="verification"
            id="address-tab-verification"
          />
          <Tab
            label="Multiple Addresses"
            value="multiple"
            id="address-tab-multiple"
          />
          <Tab
            label="Change Address"
            value="change"
            id="address-tab-change"
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

export default AddressLanding;
