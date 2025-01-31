import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { BaseConfigurationSettings } from './BaseConfigurationSettings';
import CorelationSettings from './CorelationSettings';

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
      id={`financial-cores-tabpanel-${index}`}
      aria-labelledby={`financial-cores-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `financial-cores-tab-${index}`,
    'aria-controls': `financial-cores-tabpanel-${index}`,
  };
}

export default function FinancialCoresLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('corelation')) return 1;
    if (location.pathname.includes('symitar')) return 2;
    if (location.pathname.includes('summit')) return 3;
    if (location.pathname.includes('psi')) return 4;
    if (location.pathname.includes('dna')) return 5;
    if (location.pathname.includes('epl')) return 6;
    if (location.pathname.includes('loan-origination')) return 7;
    return 0; // Base configuration
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        navigate('base');
        break;
      case 1:
        navigate('corelation');
        break;
      case 2:
        navigate('symitar');
        break;
      case 3:
        navigate('summit');
        break;
      case 4:
        navigate('psi');
        break;
      case 5:
        navigate('dna');
        break;
      case 6:
        navigate('epl');
        break;
      case 7:
        navigate('loan-origination');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Financial Cores configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Base Configuration" {...a11yProps(0)} />
          <Tab label="Corelation" {...a11yProps(1)} />
          <Tab label="Symitar" {...a11yProps(2)} />
          <Tab label="Summit" {...a11yProps(3)} />
          <Tab label="PSI Core" {...a11yProps(4)} />
          <Tab label="DNA" {...a11yProps(5)} />
          <Tab label="EPL" {...a11yProps(6)} />
          <Tab label="Loan Origination" {...a11yProps(7)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BaseConfigurationSettings />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CorelationSettings />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>Symitar settings coming soon...</Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>Summit settings coming soon...</Typography>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography>PSI Core settings coming soon...</Typography>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Typography>DNA settings coming soon...</Typography>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Typography>EPL settings coming soon...</Typography>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Typography>Loan Origination settings coming soon...</Typography>
      </TabPanel>
    </Box>
  );
}
