import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
  Box,
  Link,
  Chip,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/AuthContext';
import { useHost } from '../../context/HostContext';
import { User } from '../../types/client.types';
import UserMenu from './UserMenu';
import { getCurrentClientConfig } from '../../config/host.config';

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
  const { environment } = useHost();
  const clientConfig = getCurrentClientConfig();

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
          sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
        >
          {clientConfig.logoUrl && (
            <Box 
              component="img"
              src={clientConfig.logoUrl}
              alt={`${clientConfig.name} Logo`}
              sx={{ 
                height: 40, 
                maxWidth: 180, 
                mr: 2,
                objectFit: 'contain',
                backgroundColor: 'white',
                padding: '4px',
                borderRadius: '4px'
              }}
            />
          )}
          <Typography variant="h6" color="text.primary" noWrap component="div">
            Admin Portal
          </Typography>
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip
            label={environment.toUpperCase()}
            variant="outlined"
            size="small"
            color={environment === 'production' ? 'error' : 'default'}
            sx={{ 
              color: 'white',
              borderColor: 'white',
              mr: 2
            }}
          />
          <UserMenu 
            user={user} 
            logout={logout} 
            toggleTheme={toggleTheme} 
            isDarkMode={isDarkMode} 
            clientName={clientConfig.name}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
