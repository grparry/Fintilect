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
      id={`checking-rewards-tabpanel-${index}`}
      aria-labelledby={`checking-rewards-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `checking-rewards-tab-${index}`,
    'aria-controls': `checking-rewards-tabpanel-${index}`,
  };
}

export default function CheckingRewardsLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('programs')) return 1;
    if (location.pathname.includes('points')) return 2;
    if (location.pathname.includes('redemption')) return 3;
    if (location.pathname.includes('tiers')) return 4;
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
        navigate('programs');
        break;
      case 2:
        navigate('points');
        break;
      case 3:
        navigate('redemption');
        break;
      case 4:
        navigate('tiers');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Checking rewards configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General Settings" {...a11yProps(0)} />
          <Tab label="Rewards Programs" {...a11yProps(1)} />
          <Tab label="Points Management" {...a11yProps(2)} />
          <Tab label="Redemption Options" {...a11yProps(3)} />
          <Tab label="Membership Tiers" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
