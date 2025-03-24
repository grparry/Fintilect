import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  Menu,
  MenuItem,
  Typography,
  Chip,
  ListItemIcon,
  ListItemText,
  useTheme,
  alpha,
} from '@mui/material';
import { User } from '../../types/client.types';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import BusinessIcon from '@mui/icons-material/Business';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import UserPasswordChangeDialog from '../dialogs/UserPasswordChangeDialog';

interface UserMenuProps {
  user: User | null;
  logout: () => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  clientName: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, logout, toggleTheme, isDarkMode, clientName }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [passwordChangeDialogOpen, setPasswordChangeDialogOpen] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate('/login');
  };

  const handleThemeToggle = () => {
    toggleTheme();
    handleClose();
  };

  const handlePasswordChange = () => {
    handleClose();
    setPasswordChangeDialogOpen(true);
  };

  // Get user initials for the avatar
  const getUserInitials = (): string => {
    if (!user) return '?';
    
    if (user.firstName && user.lastName) {
      return (user.firstName[0] + user.lastName[0]).toUpperCase();
    }
    
    if (user.email) {
      const parts = user.email.split('@')[0].split('.');
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return user.email.substring(0, 2).toUpperCase();
    }
    
    return user.username.substring(0, 2).toUpperCase();
  };

  const getFullName = (): string => {
    if (!user) return 'User';
    return user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}`
      : user.username;
  };

  return (
    <Box>
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          padding: '2px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            backgroundColor: '#ffffff',
          },
        }}
        onClick={handleClick}
      >
        <Avatar 
          sx={{ 
            width: 32, 
            height: 32, 
            bgcolor: theme.palette.primary.main, // Match the header bar color
            fontSize: '0.75rem',
            color: '#ffffff', // Use the primary text color from the theme
          }}
        >
          {getUserInitials()}
        </Avatar>
      </Box>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'user-button',
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {getFullName()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email || 'Guest'}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip 
              icon={<BusinessIcon fontSize="small" />}
              label={clientName}
              size="small" 
              color="primary"
            />
          </Box>
        </Box>
        <Divider />
        <MenuItem onClick={handleThemeToggle}>
          <ListItemIcon>
            {isDarkMode ? <Brightness7Icon fontSize="small" /> : <Brightness4Icon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</ListItemText>
        </MenuItem>
        {user && !user.isLocked && (
          <MenuItem onClick={handlePasswordChange}>
            <ListItemIcon>
              <LockIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Change Password</ListItemText>
          </MenuItem>
        )}
        {user?.isLocked && (
          <MenuItem disabled>
            <ListItemIcon>
              <Typography variant="body2" color="error">Account Locked</Typography>
            </ListItemIcon>
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ color: 'error' }}>Logout</ListItemText>
        </MenuItem>
      </Menu>
      
      {user && (
        <UserPasswordChangeDialog
          open={passwordChangeDialogOpen}
          onClose={() => setPasswordChangeDialogOpen(false)}
        />
      )}
    </Box>
  );
};

export default UserMenu;
