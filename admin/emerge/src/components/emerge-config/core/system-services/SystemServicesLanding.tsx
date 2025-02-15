import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PscuLogFileTransformServiceSettingsConfig from './PscuLogFileTransformServiceSettingsConfig';

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
      id={`system-services-tabpanel-${index}`}
      aria-labelledby={`system-services-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `system-services-tab-${index}`,
    'aria-controls': `system-services-tabpanel-${index}`,
  };
}

export default function SystemServicesLanding() {
  const location = useLocation();
  
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('pscu-log-file-transform')) return 1;
    if (path.includes('psi-services')) return 2;
    return 0;
  };

  const [value, setValue] = useState(getActiveTab());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        System Services
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="System services configuration tabs"
        >
          <Tab label="Verafin File Batch" {...a11yProps(0)} />
          <Tab label="PSCU Log File Transform" {...a11yProps(1)} />
          <Tab label="PSI Services" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography variant="h6" gutterBottom>Verafin File Batch Settings</Typography>
        {/* Verafin File Batch content will go here */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6" gutterBottom>PSCU Log File Transform Settings</Typography>
        <PscuLogFileTransformServiceSettingsConfig />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6" gutterBottom>PSI Services Settings</Typography>
        {/* PSI Services content will go here */}
      </TabPanel>
    </Box>
  );
}
