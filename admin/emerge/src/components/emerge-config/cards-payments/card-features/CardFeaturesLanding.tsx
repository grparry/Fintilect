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
      id={`card-features-tabpanel-${index}`}
      aria-labelledby={`card-features-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `card-features-tab-${index}`,
    'aria-controls': `card-features-tabpanel-${index}`,
  };
}

export default function CardFeaturesLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('travel-notices')) return 1;
    if (location.pathname.includes('rewards')) return 2;
    if (location.pathname.includes('pin-management')) return 3;
    if (location.pathname.includes('digital-wallet')) return 4;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('card-limits');
        break;
      case 1:
        navigate('travel-notices');
        break;
      case 2:
        navigate('rewards');
        break;
      case 3:
        navigate('pin-management');
        break;
      case 4:
        navigate('digital-wallet');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Card features configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Card Limits" {...a11yProps(0)} />
          <Tab label="Travel Notices" {...a11yProps(1)} />
          <Tab label="Rewards Program" {...a11yProps(2)} />
          <Tab label="PIN Management" {...a11yProps(3)} />
          <Tab label="Digital Wallet" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
