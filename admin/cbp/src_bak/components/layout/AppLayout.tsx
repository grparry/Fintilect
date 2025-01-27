import React, { useState, Suspense } from 'react';
import { Box, CssBaseline, useTheme as useMuiTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from './navigation/Sidebar';
import Header from './navigation/Header';
import { NavigationProvider } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { navigationConfig } from '../../config/navigation';

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





    <NavigationProvider config={navigationConfig}>
      <Box sx={{ 
        <CssBaseline />
        <Header 
        />
        <Box sx={{ 
          <Sidebar 
          />
          <Box
          >
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </Box>
        </Box>
      </Box>
    </NavigationProvider>
  );

