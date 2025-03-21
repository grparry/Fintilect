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
      id={`mobile-security-tabpanel-${index}`}
      aria-labelledby={`mobile-security-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `mobile-security-tab-${index}`,
    'aria-controls': `mobile-security-tabpanel-${index}`,
  };
}

export default function MobileSecurityLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('device-registration')) return 1;
    if (location.pathname.includes('jailbreak-detection')) return 2;
    if (location.pathname.includes('certificate-pinning')) return 3;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('security-settings');
        break;
      case 1:
        navigate('device-registration');
        break;
      case 2:
        navigate('jailbreak-detection');
        break;
      case 3:
        navigate('certificate-pinning');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Mobile security configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Security Settings" {...a11yProps(0)} />
          <Tab label="Device Registration" {...a11yProps(1)} />
          <Tab label="Jailbreak Detection" {...a11yProps(2)} />
          <Tab label="Certificate Pinning" {...a11yProps(3)} />
        </Tabs>
      </Box>
    </Box>
  );
}
