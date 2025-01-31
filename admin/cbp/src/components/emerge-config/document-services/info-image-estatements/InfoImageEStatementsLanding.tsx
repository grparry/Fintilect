import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const InfoImageEStatementsLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/document-services/info-image-estatements/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="info image estatements settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="General Settings"
            value="settings"
            id="info-image-estatements-tab-settings"
          />
          <Tab
            label="Document Settings"
            value="documents"
            id="info-image-estatements-tab-documents"
          />
          <Tab
            label="Integration Settings"
            value="integration"
            id="info-image-estatements-tab-integration"
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

export default InfoImageEStatementsLanding;
