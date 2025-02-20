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
      position="relative"
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        zIndex: theme.zIndex.drawer + 1,
        mb: 0,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ 
        bgcolor: 'primary.main',
        minHeight: 64,
        p: 0
      }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Link
          component={RouterLink}
          to="/admin"
          color="inherit"
          underline="none"
          sx={{ flexGrow: 1 }}
        >
          <Typography variant="h6" color="text.primary" noWrap component="div">
            Admin Portal
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Typography variant="body2" color="text.primary" sx={{ ml: 2, mr: 2 }}>
            {user?.email || 'Guest'}
          </Typography>
          <Tooltip title="Logout">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleLogout}
              sx={{ ml: 1 }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
