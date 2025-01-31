import React from 'react';
import { Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrollableTabs from '../../../common/ScrollableTabs';

const ImiMobileTextBankingLanding: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentTab = location.pathname.split('/').pop() || 'settings';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    navigate(`/admin/emerge-config/misc/imi-mobile-text-banking/${newValue}`);
  };

  const tabs = [
    {
      label: "General Settings",
      value: "settings",
      id: "imi-mobile-text-banking-tab-settings"
    },
    {
      label: "Integration Settings",
      value: "integration",
      id: "imi-mobile-text-banking-tab-integration"
    },
    {
      label: "Message Templates",
      value: "templates",
      id: "imi-mobile-text-banking-tab-templates"
    },
    {
      label: "Security Settings",
      value: "security",
      id: "imi-mobile-text-banking-tab-security"
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <ScrollableTabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="imi mobile text banking settings tabs"
        tabs={tabs}
      />
      <Box sx={{ p: 3 }}>
        {/* Child components will be rendered here by the router */}
      </Box>
    </Box>
  );
};

export default ImiMobileTextBankingLanding;
