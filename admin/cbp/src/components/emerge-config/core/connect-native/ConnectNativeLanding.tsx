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
      id={`connect-native-tabpanel-${index}`}
      aria-labelledby={`connect-native-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `connect-native-tab-${index}`,
    'aria-controls': `connect-native-tabpanel-${index}`,
  };
}

export default function ConnectNativeLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('account-history')) return 1;
    if (location.pathname.includes('transfers')) return 2;
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
        navigate('account-history');
        break;
      case 2:
        navigate('transfers');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Connect Native configuration tabs"
        >
          <Tab label="Settings" {...a11yProps(0)} />
          <Tab label="Account History" {...a11yProps(1)} />
          <Tab label="Transfers" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
  );
}
