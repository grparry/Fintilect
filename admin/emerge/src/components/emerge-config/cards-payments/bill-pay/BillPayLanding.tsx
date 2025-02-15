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
      id={`bill-pay-tabpanel-${index}`}
      aria-labelledby={`bill-pay-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `bill-pay-tab-${index}`,
    'aria-controls': `bill-pay-tabpanel-${index}`,
  };
}

export default function BillPayLanding() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on URL path
  const getActiveTab = () => {
    if (location.pathname.includes('checkfree')) return 1;
    if (location.pathname.includes('checkfree-admin')) return 2;
    if (location.pathname.includes('metavante')) return 3;
    if (location.pathname.includes('symmetry')) return 4;
    if (location.pathname.includes('bill-matrix')) return 5;
    if (location.pathname.includes('good-funds')) return 6;
    if (location.pathname.includes('out-of-band')) return 7;
    if (location.pathname.includes('recurring')) return 8;
    if (location.pathname.includes('admin-member-menu')) return 9;
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
        navigate('checkfree');
        break;
      case 2:
        navigate('checkfree-admin');
        break;
      case 3:
        navigate('metavante');
        break;
      case 4:
        navigate('symmetry');
        break;
      case 5:
        navigate('bill-matrix');
        break;
      case 6:
        navigate('good-funds');
        break;
      case 7:
        navigate('out-of-band');
        break;
      case 8:
        navigate('recurring');
        break;
      case 9:
        navigate('admin-member-menu');
        break;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          aria-label="Bill Pay configuration tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Bill Pay Settings" {...a11yProps(0)} />
          <Tab label="CheckFree" {...a11yProps(1)} />
          <Tab label="CheckFree Admin" {...a11yProps(2)} />
          <Tab label="Metavante" {...a11yProps(3)} />
          <Tab label="Symmetry Bill Pay" {...a11yProps(4)} />
          <Tab label="Bill Matrix" {...a11yProps(5)} />
          <Tab label="Good Funds" {...a11yProps(6)} />
          <Tab label="Out of Band" {...a11yProps(7)} />
          <Tab label="Recurring Bill Pay" {...a11yProps(8)} />
          <Tab label="Bill Pay Admin Member Menu" {...a11yProps(9)} />
        </Tabs>
      </Box>
    </Box>
  );
}
