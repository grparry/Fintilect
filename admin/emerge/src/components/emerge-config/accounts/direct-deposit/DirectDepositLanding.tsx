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
      id={`direct-deposit-tabpanel-${index}`}
      aria-labelledby={`direct-deposit-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `direct-deposit-tab-${index}`,
    'aria-controls': `direct-deposit-tabpanel-${index}`,
  };
}

export default function DirectDepositLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('forms')) return 1;
    if (location.pathname.includes('processing')) return 2;
    if (location.pathname.includes('notifications')) return 3;
    if (location.pathname.includes('history')) return 4;
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
        navigate('forms');
        break;
      case 2:
        navigate('processing');
        break;
      case 3:
        navigate('notifications');
        break;
      case 4:
        navigate('history');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Direct deposit configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General Settings" {...a11yProps(0)} />
          <Tab label="Direct Deposit Forms" {...a11yProps(1)} />
          <Tab label="Processing Rules" {...a11yProps(2)} />
          <Tab label="Notifications" {...a11yProps(3)} />
          <Tab label="Transaction History" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
