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
      id={`application-settings-tabpanel-${index}`}
      aria-labelledby={`application-settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `application-settings-tab-${index}`,
    'aria-controls': `application-settings-tabpanel-${index}`,
  };
}

export default function ApplicationSettingsLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('theme-deployment')) return 1;
    if (location.pathname.includes('features')) return 2;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('app-info');
        break;
      case 1:
        navigate('theme-deployment');
        break;
      case 2:
        navigate('features');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Application settings configuration tabs"
        >
          <Tab label="App Info Settings" {...a11yProps(0)} />
          <Tab label="Theme Deployment" {...a11yProps(1)} />
          <Tab label="Features" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
  );
}
