import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { BaseConfigurationSettings } from './BaseConfigurationSettings';
import CorelationSettings from './CorelationSettings';
import SymitarSettings from './SymitarSettings';
import DNASettings from './DNASettings';
import EplSettings from './EplSettings';
import PsiCoreSettings from './PsiCoreSettings';
import SummitSettings from './SummitSettings';

interface TabPanelProps {
  children?: React.ReactNode;
  index: string;
  value: string;
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

export default function FinancialCoresLanding() {
  const location = useLocation();
  
  // Extract the current tab from the URL path, defaulting to 'base' if not found
  const currentTab = location.pathname.split('/').filter(segment => 
    ['base', 'corelation', 'symitar', 'summit', 'psi', 'dna', 'epl'].includes(segment)
  )[0] || 'base';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [value, setValue] = useState(currentTab);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Financial Cores Settings
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="financial cores settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Base Configuration"
            value="base"
            id="financial-cores-tab-base"
          />
          <Tab
            label="Corelation"
            value="corelation"
            id="financial-cores-tab-corelation"
          />
          <Tab
            label="Symitar"
            value="symitar"
            id="financial-cores-tab-symitar"
          />
          <Tab
            label="Summit"
            value="summit"
            id="financial-cores-tab-summit"
          />
          <Tab
            label="PSI Core"
            value="psi"
            id="financial-cores-tab-psi"
          />
          <Tab
            label="DNA"
            value="dna"
            id="financial-cores-tab-dna"
          />
          <Tab
            label="EPL"
            value="epl"
            id="financial-cores-tab-epl"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index="base">
        <BaseConfigurationSettings />
      </TabPanel>
      <TabPanel value={value} index="corelation">
        <CorelationSettings />
      </TabPanel>
      <TabPanel value={value} index="symitar">
        <SymitarSettings />
      </TabPanel>
      <TabPanel value={value} index="summit">
        <SummitSettings />
      </TabPanel>
      <TabPanel value={value} index="psi">
        <PsiCoreSettings />
      </TabPanel>
      <TabPanel value={value} index="dna">
        <DNASettings />
      </TabPanel>
      <TabPanel value={value} index="epl">
        <EplSettings />
      </TabPanel>
    </Box>
  );
}
