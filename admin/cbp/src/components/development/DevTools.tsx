import React, { useState } from 'react';
import { Box, Button, Typography, Drawer, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import HostSwitcher from './HostSwitcher';

// Only show this component in development mode
const isDevelopment = process.env.NODE_ENV === 'development';

const DevToolsButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 9999,
  borderRadius: '50%',
  minWidth: 'auto',
  width: 56,
  height: 56,
  boxShadow: theme.shadows[6],
}));

const DevToolsDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '100%',
    maxWidth: 850,
    padding: theme.spacing(2),
  },
}));

const DevToolsHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

/**
 * Development Tools component that provides access to various development utilities
 * Only available in development mode
 */
const DevTools: React.FC = () => {
  // Don't render anything in production
  if (!isDevelopment) {
    return null;
  }

  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <DevToolsButton
        variant="contained"
        color="secondary"
        onClick={toggleDrawer}
        aria-label="Development Tools"
      >
        <SettingsIcon />
      </DevToolsButton>

      <DevToolsDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
      >
        <DevToolsHeader>
          <Typography variant="h5">Development Tools</Typography>
          <IconButton onClick={toggleDrawer} aria-label="Close">
            <CloseIcon />
          </IconButton>
        </DevToolsHeader>

        <Typography variant="body2" color="textSecondary" paragraph>
          These tools are only available in development mode and will not be included in production builds.
        </Typography>

        <HostSwitcher />
      </DevToolsDrawer>
    </>
  );
};

export default DevTools;
