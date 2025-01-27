import React, { useState, Suspense } from 'react';
import { Box, CssBaseline, useTheme as useMuiTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/navigation/Sidebar';
import Header from '@/navigation/Header';
import { NavigationProvider } from '@/../context/NavigationContext';
import { useTheme } from '@/../context/ThemeContext';
import { navigationConfig } from '@/../config/navigation';

const DRAWER_WIDTH = 280;

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <NavigationProvider config={navigationConfig}>
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: 'background.default'
      }}>
        <CssBaseline />
        <Header 
          onMenuClick={handleMenuClick}
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          drawerWidth={DRAWER_WIDTH}
          open={sidebarOpen}
        />
        <Box sx={{ 
          display: 'flex',
          flex: 1,
          bgcolor: 'background.default',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Sidebar 
            open={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            width={DRAWER_WIDTH}
            navigationConfig={navigationConfig.sections}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
              ml: { sm: `${sidebarOpen ? DRAWER_WIDTH : 0}px` },
              transition: muiTheme.transitions.create('margin', {
                easing: muiTheme.transitions.easing.sharp,
                duration: muiTheme.transitions.duration.leavingScreen,
              }),
              overflowY: 'auto',
              height: 'calc(100vh - 64px)' // Account for header height
            }}
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </NavigationProvider>
  );
};

export default AppLayout;
