import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`credit-cards-tabpanel-${index}`}
      aria-labelledby={`credit-cards-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `credit-cards-tab-${index}`,
    'aria-controls': `credit-cards-tabpanel-${index}`,
  };
}

export default function CreditCardsLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('pscu-sso')) return 1;
    if (location.pathname.includes('omaha-sso')) return 2;
    if (location.pathname.includes('goto-my-card')) return 3;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('settings');
        break;
      case 1:
        navigate('pscu-sso');
        break;
      case 2:
        navigate('omaha-sso');
        break;
      case 3:
        navigate('goto-my-card');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Credit cards configuration tabs"
        >
          <Tab label="Credit Card Settings" {...a11yProps(0)} />
          <Tab label="PSCU SSO" {...a11yProps(1)} />
          <Tab label="Omaha SSO" {...a11yProps(2)} />
          <Tab label="GoToMyCard" {...a11yProps(3)} />
        </Tabs>
      </Box>
    </Box>
  );
}
