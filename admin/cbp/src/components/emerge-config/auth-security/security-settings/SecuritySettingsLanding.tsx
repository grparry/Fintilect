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
      id={`security-settings-tabpanel-${index}`}
      aria-labelledby={`security-settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `security-settings-tab-${index}`,
    'aria-controls': `security-settings-tabpanel-${index}`,
  };
}

export default function SecuritySettingsLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('device-management')) return 1;
    if (location.pathname.includes('ip-restrictions')) return 2;
    if (location.pathname.includes('audit-logs')) return 3;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('session');
        break;
      case 1:
        navigate('device-management');
        break;
      case 2:
        navigate('ip-restrictions');
        break;
      case 3:
        navigate('audit-logs');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Security settings configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Session Management" {...a11yProps(0)} />
          <Tab label="Device Management" {...a11yProps(1)} />
          <Tab label="IP Restrictions" {...a11yProps(2)} />
          <Tab label="Audit Logs" {...a11yProps(3)} />
        </Tabs>
      </Box>
    </Box>
  );
}
