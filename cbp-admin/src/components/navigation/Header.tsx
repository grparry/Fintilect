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
import { useAuth } from '../../contexts/AuthContext';
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
        width: { sm: open ? `calc(100% - ${drawerWidth}px)` : '100%' },
        ml: { sm: open ? `${drawerWidth}px` : 0 },
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.primary.main,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onMenuClick}
          edge="start"
          sx={{
            marginRight: 2,
            ...(open && { display: { sm: 'none' } }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {user ? `Welcome, ${user.firstName}` : 'Welcome'}
        </Typography>
        <Box>
          <IconButton 
            onClick={toggleTheme} 
            color="inherit"
            aria-label="toggle theme"
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
