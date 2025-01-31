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
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `account-tab-${index}`,
    'aria-controls': `account-tabpanel-${index}`,
  };
}

export default function AccountLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('types')) return 1;
    if (location.pathname.includes('statuses')) return 2;
    if (location.pathname.includes('restrictions')) return 3;
    if (location.pathname.includes('fees')) return 4;
    if (location.pathname.includes('interest')) return 5;
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
        navigate('types');
        break;
      case 2:
        navigate('statuses');
        break;
      case 3:
        navigate('restrictions');
        break;
      case 4:
        navigate('fees');
        break;
      case 5:
        navigate('interest');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Account configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Account Settings" {...a11yProps(0)} />
          <Tab label="Account Types" {...a11yProps(1)} />
          <Tab label="Account Statuses" {...a11yProps(2)} />
          <Tab label="Account Restrictions" {...a11yProps(3)} />
          <Tab label="Account Fees" {...a11yProps(4)} />
          <Tab label="Interest Rates" {...a11yProps(5)} />
        </Tabs>
      </Box>
    </Box>
  );
}
