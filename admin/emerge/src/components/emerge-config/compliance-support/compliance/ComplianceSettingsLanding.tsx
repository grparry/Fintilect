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
      id={`compliance-settings-tabpanel-${index}`}
      aria-labelledby={`compliance-settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `compliance-settings-tab-${index}`,
    'aria-controls': `compliance-settings-tabpanel-${index}`,
  };
}

export default function ComplianceSettingsLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('kyc')) return 1;
    if (location.pathname.includes('aml')) return 2;
    if (location.pathname.includes('regulatory-reporting')) return 3;
    if (location.pathname.includes('audit-trail')) return 4;
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
        navigate('kyc');
        break;
      case 2:
        navigate('aml');
        break;
      case 3:
        navigate('regulatory-reporting');
        break;
      case 4:
        navigate('audit-trail');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Compliance settings configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="General Compliance" {...a11yProps(0)} />
          <Tab label="KYC Settings" {...a11yProps(1)} />
          <Tab label="AML Configuration" {...a11yProps(2)} />
          <Tab label="Regulatory Reporting" {...a11yProps(3)} />
          <Tab label="Audit Trail" {...a11yProps(4)} />
        </Tabs>
      </Box>
    </Box>
  );
}
