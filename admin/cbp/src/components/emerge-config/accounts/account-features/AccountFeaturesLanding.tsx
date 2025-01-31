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
      id={`account-features-tabpanel-${index}`}
      aria-labelledby={`account-features-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `account-features-tab-${index}`,
    'aria-controls': `account-features-tabpanel-${index}`,
  };
}

export default function AccountFeaturesLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('checking-rewards')) return 1;
    if (location.pathname.includes('direct-deposit')) return 2;
    if (location.pathname.includes('security-code')) return 3;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('overdraft-protection');
        break;
      case 1:
        navigate('checking-rewards');
        break;
      case 2:
        navigate('direct-deposit');
        break;
      case 3:
        navigate('security-code');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Account features configuration tabs"
        >
          <Tab label="Overdraft Protection" {...a11yProps(0)} />
          <Tab label="Checking Rewards" {...a11yProps(1)} />
          <Tab label="Direct Deposit" {...a11yProps(2)} />
          <Tab label="Primary Account Security Code" {...a11yProps(3)} />
        </Tabs>
      </Box>
    </Box>
  );
}
