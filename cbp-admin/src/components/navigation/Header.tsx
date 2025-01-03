import React from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

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

  const iconColor = isDarkMode ? '#ffffff' : '#000000';

  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        bgcolor: isDarkMode ? '#000000 !important' : '#ffffff !important',
        backgroundImage: 'none !important',
        transition: theme.transitions.create(['margin', 'width', 'background-color'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Toolbar
        sx={{
          ml: open ? `${drawerWidth}px` : 0,
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
          }),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'inherit',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            edge="start"
            sx={{ 
              mr: 2,
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shorter,
              }),
              transform: open ? 'rotate(180deg)' : 'none',
              color: iconColor,
              '& .MuiSvgIcon-root': {
                color: iconColor,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              color: `${iconColor} !important`,
              '&&': {
                color: iconColor,
              }
            }}
          >
            CBP Admin
          </Typography>
        </div>
        <IconButton
          onClick={toggleTheme}
          color="inherit"
          aria-label="toggle theme"
          sx={{
            transition: theme.transitions.create(['transform', 'color'], {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': {
              transform: 'rotate(30deg)',
              backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
            },
            color: iconColor,
            '& .MuiSvgIcon-root': {
              color: iconColor,
            },
          }}
        >
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
