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
      id={`support-settings-tabpanel-${index}`}
      aria-labelledby={`support-settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `support-settings-tab-${index}`,
    'aria-controls': `support-settings-tabpanel-${index}`,
  };
}

export default function SupportSettingsLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('chat')) return 1;
    if (location.pathname.includes('ticketing')) return 2;
    if (location.pathname.includes('knowledge-base')) return 3;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('contact');
        break;
      case 1:
        navigate('chat');
        break;
      case 2:
        navigate('ticketing');
        break;
      case 3:
        navigate('knowledge-base');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Support settings configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Contact Information" {...a11yProps(0)} />
          <Tab label="Chat Support" {...a11yProps(1)} />
          <Tab label="Ticketing System" {...a11yProps(2)} />
          <Tab label="Knowledge Base" {...a11yProps(3)} />
        </Tabs>
      </Box>
    </Box>
  );
}
