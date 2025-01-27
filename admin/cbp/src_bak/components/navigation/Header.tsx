import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Box,
  Link,
  Tooltip,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext';
import { User } from '../../types/index';

interface HeaderProps {
  drawerWidth: number;
  onMenuClick: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  open: boolean;
}

const Header: React.FC<HeaderProps> = ({
  drawerWidth,
  onMenuClick,
  toggleTheme,
  isDarkMode,
  open,
}) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar





    <AppBar
    >
      <Toolbar sx={{ 
        <IconButton
        >
          <MenuIcon />
        </IconButton>
        <Link
        >
          <Typography variant="h6" noWrap component="div">
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Typography variant="body2" sx={{ ml: 2, mr: 2 }}>
            {user?.email || 'Guest'}
          </Typography>
          <Tooltip title="Logout">
            <IconButton
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );

