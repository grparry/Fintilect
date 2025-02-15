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
      id={`mobile-features-tabpanel-${index}`}
      aria-labelledby={`mobile-features-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `mobile-features-tab-${index}`,
    'aria-controls': `mobile-features-tabpanel-${index}`,
  };
}

export default function MobileFeaturesLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('quick-balance')) return 1;
    if (location.pathname.includes('mobile-deposit')) return 2;
    if (location.pathname.includes('fingerprint-login')) return 3;
    if (location.pathname.includes('card-controls')) return 4;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('feature-flags');
        break;
      case 1:
        navigate('quick-balance');
        break;
      case 2:
        navigate('mobile-deposit');
        break;
      case 3:
        navigate('fingerprint-login');
        break;
      case 4:
        navigate('card-controls');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Mobile features configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Feature Flags" {...a11yProps(0)} />
          <Tab label="Quick Balance" {...a11yProps(1)} />
          <Tab label="Mobile Deposit" {...a11yProps(2)} />
          <Tab label="Fingerprint Login" {...a11yProps(3)} />
          <Tab label="Card Controls" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
