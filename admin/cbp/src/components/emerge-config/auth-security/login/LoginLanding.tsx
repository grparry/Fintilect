import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import PasswordSettingsConfig from './PasswordSettingsConfig';

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
      id={`login-tabpanel-${index}`}
      aria-labelledby={`login-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const LoginLanding: React.FC = () => {
  const location = useLocation();
  
  // Extract the current tab from the URL path
  const currentTab = location.pathname.split('/').pop() || 'home-banking-login';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [value, setValue] = useState(currentTab);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Login Settings
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="login settings tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Home Banking Login"
            value="home-banking-login"
            id="login-tab-home-banking"
          />
          <Tab
            label="Password Settings"
            value="password"
            id="login-tab-password"
          />
          <Tab
            label="Username Settings"
            value="username"
            id="login-tab-username"
          />
          <Tab
            label="ReCAPTCHA Settings"
            value="recaptcha"
            id="login-tab-recaptcha"
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index="home-banking-login">
        <Typography variant="h6" gutterBottom>Home Banking Login Settings</Typography>
        {/* Home Banking Login content will go here */}
      </TabPanel>
      <TabPanel value={value} index="password">
        <PasswordSettingsConfig />
      </TabPanel>
      <TabPanel value={value} index="username">
        <Typography variant="h6" gutterBottom>Username Settings</Typography>
        {/* Username Settings content will go here */}
      </TabPanel>
      <TabPanel value={value} index="recaptcha">
        <Typography variant="h6" gutterBottom>ReCAPTCHA Settings</Typography>
        {/* ReCAPTCHA Settings content will go here */}
      </TabPanel>
    </Box>
  );
};

export default LoginLanding;
