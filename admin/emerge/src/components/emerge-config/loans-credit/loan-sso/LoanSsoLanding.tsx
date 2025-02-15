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
      id={`loan-sso-tabpanel-${index}`}
      aria-labelledby={`loan-sso-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `loan-sso-tab-${index}`,
    'aria-controls': `loan-sso-tabpanel-${index}`,
  };
}

export default function LoanSsoLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('cu-direct')) return 1;
    if (location.pathname.includes('harland-engine')) return 2;
    if (location.pathname.includes('show-apply-button')) return 3;
    if (location.pathname.includes('cu-nexus')) return 4;
    if (location.pathname.includes('meridian-link')) return 5;
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
        navigate('cu-direct');
        break;
      case 2:
        navigate('harland-engine');
        break;
      case 3:
        navigate('show-apply-button');
        break;
      case 4:
        navigate('cu-nexus');
        break;
      case 5:
        navigate('meridian-link');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Loan SSO configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Loan SSO Settings" {...a11yProps(0)} />
          <Tab label="CU Direct Loan SSO" {...a11yProps(1)} />
          <Tab label="Harland Loan Engine" {...a11yProps(2)} />
          <Tab label="Apply for Loan Button" {...a11yProps(3)} />
          <Tab label="CU Nexus Loan Offers" {...a11yProps(4)} />
          <Tab label="MeridianLink SSO" {...a11yProps(5)} />
        </Tabs>
      </Box>
    </Box>
  );
}
