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
      id={`deployment-tabpanel-${index}`}
      aria-labelledby={`deployment-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `deployment-tab-${index}`,
    'aria-controls': `deployment-tabpanel-${index}`,
  };
}

export default function DeploymentLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('environments')) return 1;
    if (location.pathname.includes('deployment-history')) return 2;
    if (location.pathname.includes('rollback')) return 3;
    if (location.pathname.includes('monitoring')) return 4;
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
        navigate('environments');
        break;
      case 2:
        navigate('deployment-history');
        break;
      case 3:
        navigate('rollback');
        break;
      case 4:
        navigate('monitoring');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Deployment configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Deployment Settings" {...a11yProps(0)} />
          <Tab label="Environments" {...a11yProps(1)} />
          <Tab label="Deployment History" {...a11yProps(2)} />
          <Tab label="Rollback" {...a11yProps(3)} />
          <Tab label="Monitoring" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
