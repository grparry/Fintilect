import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import Header from '../navigation/Header';
import Sidebar from '../navigation/Sidebar';
import Breadcrumbs from '../navigation/Breadcrumbs';
import { navigationConfig } from '../../config/navigation';

const DRAWER_WIDTH = 240;
interface MainLayoutProps {
  children?: React.ReactNode;
  toggleTheme: () => void;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children, toggleTheme }) => {
  const theme = useTheme();
  const location = useLocation();
  const { state, setActivePath, toggleSidebar } = useNavigation();
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname, setActivePath]);
  return (
    <Box sx={{ 
      display: 'flex', 
      flex: 1,
      flexDirection: 'column',
      bgcolor: 'background.default'
    }}>
      <Header 
        open={state.sidebarOpen}
        isDarkMode={theme.palette.mode === 'dark'}
        onMenuClick={toggleSidebar}
        toggleTheme={toggleTheme}
        drawerWidth={DRAWER_WIDTH}
      />
      <Box sx={{
        display: 'flex',
        flex: 1,
        position: 'relative',
        mt: 0,
        bgcolor: 'background.default'
      }}>
        <Sidebar 
          open={state.sidebarOpen}
          onClose={toggleSidebar}
          width={DRAWER_WIDTH}
          navigationConfig={navigationConfig.sections}
        />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            p: 3,
            bgcolor: 'background.paper'
          }}
        >
          <Breadcrumbs />
          {children || <Outlet />}
        </Box>
      </Box>
    </Box>
  );
};
export default MainLayout;