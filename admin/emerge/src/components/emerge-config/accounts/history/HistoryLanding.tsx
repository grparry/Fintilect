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
      id={`history-tabpanel-${index}`}
      aria-labelledby={`history-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `history-tab-${index}`,
    'aria-controls': `history-tabpanel-${index}`,
  };
}

export default function HistoryLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('transactions')) return 1;
    if (location.pathname.includes('filters')) return 2;
    if (location.pathname.includes('export')) return 3;
    if (location.pathname.includes('retention')) return 4;
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
        navigate('transactions');
        break;
      case 2:
        navigate('filters');
        break;
      case 3:
        navigate('export');
        break;
      case 4:
        navigate('retention');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Account history configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General Settings" {...a11yProps(0)} />
          <Tab label="Transaction History" {...a11yProps(1)} />
          <Tab label="History Filters" {...a11yProps(2)} />
          <Tab label="Export Settings" {...a11yProps(3)} />
          <Tab label="Retention Policy" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
