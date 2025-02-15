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
      id={`payment-settings-tabpanel-${index}`}
      aria-labelledby={`payment-settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `payment-settings-tab-${index}`,
    'aria-controls': `payment-settings-tabpanel-${index}`,
  };
}

export default function PaymentSettingsLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('bill-pay')) return 1;
    if (location.pathname.includes('external-transfers')) return 2;
    if (location.pathname.includes('p2p-payments')) return 3;
    if (location.pathname.includes('wire-transfers')) return 4;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('ach');
        break;
      case 1:
        navigate('bill-pay');
        break;
      case 2:
        navigate('external-transfers');
        break;
      case 3:
        navigate('p2p-payments');
        break;
      case 4:
        navigate('wire-transfers');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Payment settings configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="ACH Settings" {...a11yProps(0)} />
          <Tab label="Bill Pay" {...a11yProps(1)} />
          <Tab label="External Transfers" {...a11yProps(2)} />
          <Tab label="P2P Payments" {...a11yProps(3)} />
          <Tab label="Wire Transfers" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
