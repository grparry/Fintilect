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
      id={`core-features-tabpanel-${index}`}
      aria-labelledby={`core-features-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `core-features-tab-${index}`,
    'aria-controls': `core-features-tabpanel-${index}`,
  };
}

export default function CoreFeaturesLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('transfers')) return 1;
    if (location.pathname.includes('bill-pay')) return 2;
    if (location.pathname.includes('statements')) return 3;
    if (location.pathname.includes('alerts')) return 4;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('general');
        break;
      case 1:
        navigate('transfers');
        break;
      case 2:
        navigate('bill-pay');
        break;
      case 3:
        navigate('statements');
        break;
      case 4:
        navigate('alerts');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Core features configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General Features" {...a11yProps(0)} />
          <Tab label="Transfers" {...a11yProps(1)} />
          <Tab label="Bill Pay" {...a11yProps(2)} />
          <Tab label="Statements" {...a11yProps(3)} />
          <Tab label="Alerts" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
