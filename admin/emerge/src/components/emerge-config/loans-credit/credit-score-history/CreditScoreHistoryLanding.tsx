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
      id={`credit-score-history-tabpanel-${index}`}
      aria-labelledby={`credit-score-history-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `credit-score-history-tab-${index}`,
    'aria-controls': `credit-score-history-tabpanel-${index}`,
  };
}

export default function CreditScoreHistoryLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('history-settings')) return 1;
    if (location.pathname.includes('tracking')) return 2;
    if (location.pathname.includes('reporting')) return 3;
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
        navigate('history-settings');
        break;
      case 2:
        navigate('tracking');
        break;
      case 3:
        navigate('reporting');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Credit score history configuration tabs"
        >
          <Tab label="General Settings" {...a11yProps(0)} />
          <Tab label="History Settings" {...a11yProps(1)} />
          <Tab label="Score Tracking" {...a11yProps(2)} />
          <Tab label="Score Reporting" {...a11yProps(3)} />
        </Tabs>
      </Box>
    </Box>
  );
}
