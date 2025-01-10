import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
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
  const { user } = useAuth();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        bgcolor: theme.palette.background.paper,
        backgroundImage: 'none',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
      }}
      elevation={1}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" noWrap component="div" color="textPrimary">
            {user?.firstName ? `Welcome, ${user.firstName}` : 'Welcome'}
          </Typography>
        </Box>
        <IconButton
          sx={{ ml: 1 }}
          onClick={toggleTheme}
          color="inherit"
          aria-label="toggle theme"
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
