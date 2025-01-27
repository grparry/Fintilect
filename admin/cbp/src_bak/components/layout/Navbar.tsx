import React, { MouseEvent, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Badge,
  Theme,
  useTheme,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleMenu: (event: MouseEvent<HTMLElement>) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  handleMenu,
  isDarkMode,
  toggleTheme,
}) => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      handleProfileMenuClose();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppBar







    <AppBar
    >
      <Toolbar>
        <IconButton
            ...(isSidebarOpen && {
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
          <IconButton
          >
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              {user ? user.firstName[0] : 'A'}
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>

      <Menu
            '& .MuiAvatar-root': {
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </AppBar>
  );

