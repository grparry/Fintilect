import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from '../navigation/Header';
import Sidebar from '../navigation/Sidebar';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../navigation/Breadcrumbs';

const DRAWER_WIDTH = 240;

interface MainLayoutProps {
  children: React.ReactNode;
  toggleTheme: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, toggleTheme }) => {
  const { isDarkMode } = useTheme();
  const { state, toggleSidebar } = useNavigation();
  const location = useLocation();

  // Don't show breadcrumbs on error pages or login page
  const showBreadcrumbs = !location.pathname.includes('error') && location.pathname !== '/login';

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Header 
        drawerWidth={DRAWER_WIDTH}
        onMenuClick={toggleSidebar}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
        open={state.sidebarOpen}
      />
      <Sidebar 
        open={state.sidebarOpen} 
        onClose={toggleSidebar}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          mt: '64px',
          transition: theme => theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: theme => theme.palette.background.default,
        }}
      >
        {showBreadcrumbs && <Breadcrumbs />}
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
