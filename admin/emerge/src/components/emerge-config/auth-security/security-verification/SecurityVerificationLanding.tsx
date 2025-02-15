import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PasswordVerificationSettingsConfig from './PasswordVerificationSettingsConfig';

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
      id={`security-verification-tabpanel-${index}`}
      aria-labelledby={`security-verification-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SecurityVerificationLanding: React.FC = () => {
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'password-verification';
  const [value, setValue] = useState(currentTab);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Security Verification Settings
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="security verification settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Password Verification"
            value="password-verification"
            id="security-verification-tab-password"
          />
          <Tab
            label="Security Code Verification"
            value="security-code"
            id="security-verification-tab-security-code"
          />
          <Tab
            label="MFA Settings"
            value="mfa"
            id="security-verification-tab-mfa"
          />
          <Tab
            label="Device Settings"
            value="device"
            id="security-verification-tab-device"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index="password-verification">
        <PasswordVerificationSettingsConfig />
      </TabPanel>
      <TabPanel value={value} index="security-code">
        <Typography variant="h6">Security Code Verification Settings</Typography>
        {/* Security Code Verification content will go here */}
      </TabPanel>
      <TabPanel value={value} index="mfa">
        <Typography variant="h6">MFA Settings</Typography>
        {/* MFA Settings content will go here */}
      </TabPanel>
      <TabPanel value={value} index="device">
        <Typography variant="h6">Device Settings</Typography>
        {/* Device Settings content will go here */}
      </TabPanel>
    </Box>
  );
};

export default SecurityVerificationLanding;
