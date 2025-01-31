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
      id={`estatements-tabpanel-${index}`}
      aria-labelledby={`estatements-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `estatements-tab-${index}`,
    'aria-controls': `estatements-tabpanel-${index}`,
  };
}

export default function EStatementsLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('delivery')) return 1;
    if (location.pathname.includes('templates')) return 2;
    if (location.pathname.includes('notifications')) return 3;
    if (location.pathname.includes('archive')) return 4;
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
        navigate('delivery');
        break;
      case 2:
        navigate('templates');
        break;
      case 3:
        navigate('notifications');
        break;
      case 4:
        navigate('archive');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="eStatements configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General Settings" {...a11yProps(0)} />
          <Tab label="Delivery Settings" {...a11yProps(1)} />
          <Tab label="Statement Templates" {...a11yProps(2)} />
          <Tab label="Notifications" {...a11yProps(3)} />
          <Tab label="Archive Settings" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
