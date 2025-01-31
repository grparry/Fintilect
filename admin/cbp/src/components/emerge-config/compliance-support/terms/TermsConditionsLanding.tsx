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
      id={`terms-conditions-tabpanel-${index}`}
      aria-labelledby={`terms-conditions-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `terms-conditions-tab-${index}`,
    'aria-controls': `terms-conditions-tabpanel-${index}`,
  };
}

export default function TermsConditionsLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('privacy-policy')) return 1;
    if (location.pathname.includes('user-agreement')) return 2;
    if (location.pathname.includes('disclaimers')) return 3;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('terms');
        break;
      case 1:
        navigate('privacy-policy');
        break;
      case 2:
        navigate('user-agreement');
        break;
      case 3:
        navigate('disclaimers');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Terms and conditions configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Terms of Service" {...a11yProps(0)} />
          <Tab label="Privacy Policy" {...a11yProps(1)} />
          <Tab label="User Agreement" {...a11yProps(2)} />
          <Tab label="Disclaimers" {...a11yProps(3)} />
        </Tabs>
      </Box>
    </Box>
  );
}
