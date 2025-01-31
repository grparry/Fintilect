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
      id={`fraud-prevention-tabpanel-${index}`}
      aria-labelledby={`fraud-prevention-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `fraud-prevention-tab-${index}`,
    'aria-controls': `fraud-prevention-tabpanel-${index}`,
  };
}

export default function FraudPreventionLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('risk-scoring')) return 1;
    if (location.pathname.includes('transaction-monitoring')) return 2;
    if (location.pathname.includes('fraud-alerts')) return 3;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('rules');
        break;
      case 1:
        navigate('risk-scoring');
        break;
      case 2:
        navigate('transaction-monitoring');
        break;
      case 3:
        navigate('fraud-alerts');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Fraud prevention configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Fraud Rules" {...a11yProps(0)} />
          <Tab label="Risk Scoring" {...a11yProps(1)} />
          <Tab label="Transaction Monitoring" {...a11yProps(2)} />
          <Tab label="Fraud Alerts" {...a11yProps(3)} />
        </Tabs>
      </Box>
    </Box>
  );
}
