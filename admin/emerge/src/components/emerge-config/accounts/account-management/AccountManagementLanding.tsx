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
      id={`account-management-tabpanel-${index}`}
      aria-labelledby={`account-management-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `account-management-tab-${index}`,
    'aria-controls': `account-management-tabpanel-${index}`,
  };
}

export default function AccountManagementLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('account-reassignment')) return 1;
    if (location.pathname.includes('member-settings')) return 2;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('admin-account');
        break;
      case 1:
        navigate('account-reassignment');
        break;
      case 2:
        navigate('member-settings');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Account management configuration tabs"
        >
          <Tab label="Admin Account Settings" {...a11yProps(0)} />
          <Tab label="Account Number Reassignment" {...a11yProps(1)} />
          <Tab label="Member Settings" {...a11yProps(2)} />
        </Tabs>
      </Box>
    </Box>
  );
}
