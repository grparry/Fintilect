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
      id={`ach-service-tabpanel-${index}`}
      aria-labelledby={`ach-service-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `ach-service-tab-${index}`,
    'aria-controls': `ach-service-tabpanel-${index}`,
  };
}

export default function AchServiceLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('external-transfers')) return 1;
    if (location.pathname.includes('internal-transfers')) return 2;
    if (location.pathname.includes('recurring-transfers')) return 3;
    if (location.pathname.includes('limits')) return 4;
    if (location.pathname.includes('processing')) return 5;
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
        navigate('external-transfers');
        break;
      case 2:
        navigate('internal-transfers');
        break;
      case 3:
        navigate('recurring-transfers');
        break;
      case 4:
        navigate('limits');
        break;
      case 5:
        navigate('processing');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="ACH service configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="ACH Settings" {...a11yProps(0)} />
          <Tab label="External Transfers" {...a11yProps(1)} />
          <Tab label="Internal Transfers" {...a11yProps(2)} />
          <Tab label="Recurring Transfers" {...a11yProps(3)} />
          <Tab label="Transfer Limits" {...a11yProps(4)} />
          <Tab label="ACH Processing" {...a11yProps(5)} />
        </Tabs>
      </Box>
    </Box>
  );
}
