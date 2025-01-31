import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckImagesLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'validation';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/document-services/check-images/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="check images settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Validation Settings"
            value="validation"
            id="check-images-tab-validation"
          />
          <Tab
            label="Image Settings"
            value="settings"
            id="check-images-tab-settings"
          />
          <Tab
            label="Storage Settings"
            value="storage"
            id="check-images-tab-storage"
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

export default CheckImagesLanding;
