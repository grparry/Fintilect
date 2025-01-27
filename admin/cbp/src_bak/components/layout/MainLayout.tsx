import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import Header from './navigation/Header';
import Sidebar from './navigation/Sidebar';
import Breadcrumbs from './navigation/Breadcrumbs';
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






    <Box sx={{ 
      <Header 
      />
      <Box sx={{
        <Sidebar 
        />
        <Box
        >
          <Breadcrumbs />
          {children || <Outlet />}
        </Box>
      </Box>
    </Box>
  );

