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
      id={`authentication-tabpanel-${index}`}
      aria-labelledby={`authentication-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `authentication-tab-${index}`,
    'aria-controls': `authentication-tabpanel-${index}`,
  };
}

export default function AuthenticationLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('mfa')) return 1;
    if (location.pathname.includes('password-settings')) return 2;
    if (location.pathname.includes('biometric')) return 3;
    if (location.pathname.includes('oauth')) return 4;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('login');
        break;
      case 1:
        navigate('mfa');
        break;
      case 2:
        navigate('password-settings');
        break;
      case 3:
        navigate('biometric');
        break;
      case 4:
        navigate('oauth');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Authentication configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Login Settings" {...a11yProps(0)} />
          <Tab label="Multi-Factor Authentication" {...a11yProps(1)} />
          <Tab label="Password Settings" {...a11yProps(2)} />
          <Tab label="Biometric Authentication" {...a11yProps(3)} />
          <Tab label="OAuth & SSO" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
