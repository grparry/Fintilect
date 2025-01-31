import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const AdaComplianceLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/compliance-support/ada-compliance/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="ada compliance settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="ADA Settings"
            value="settings"
            id="ada-compliance-tab-settings"
          />
          <Tab
            label="Doc Center Settings"
            value="doc-center"
            id="ada-compliance-tab-doc-center"
          />
          <Tab
            label="Compliance Reports"
            value="reports"
            id="ada-compliance-tab-reports"
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

export default AdaComplianceLanding;
