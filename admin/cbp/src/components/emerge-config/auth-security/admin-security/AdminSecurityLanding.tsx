import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminSecurityLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'admin-settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/auth-security/admin-security/${newValue}`);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="admin security settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Admin Settings"
            value="admin-settings"
            id="admin-security-tab-settings"
          />
          <Tab
            label="SMS Settings"
            value="sms"
            id="admin-security-tab-sms"
          />
          <Tab
            label="Audit Logs"
            value="audit-logs"
            id="admin-security-tab-audit"
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

export default AdminSecurityLanding;
