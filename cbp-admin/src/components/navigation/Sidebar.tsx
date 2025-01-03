import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import * as Icons from '@mui/icons-material';
import { getNavigationConfig } from '../../routes';
import { NavigationSection } from '../../types/route.types';
import { useNavigation } from '../../context/NavigationContext';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { state, toggleSection } = useNavigation();
  const navigationConfig = useMemo(() => getNavigationConfig(), []);

  const handleNavigate = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const handleSectionToggle = (sectionId: string) => {
    toggleSection(sectionId);
  };

  const menuItemStyles = {
    button: {
      paddingLeft: '0px',  
    },
    subMenuContent: {
      '& .MuiListItemButton-root': {
        paddingLeft: '16px',  
      },
    },
    label: {
      fontSize: '0.875rem',
    },
    icon: {
      marginRight: '0px',  
    },
  };

  const renderNavigationItem = (item: any) => {
    const Icon = item.icon ? Icons[item.icon as keyof typeof Icons] : null;
    console.log(`Rendering nav item: ${item.title}, path: ${item.path}`);

    return (
      <ListItem key={item.path} disablePadding>
        <ListItemButton
          onClick={() => {
            console.log(`Navigating to: ${item.path}`);
            handleNavigate(item.path);
          }}
          selected={isCurrentPath(item.path)}
          sx={{
            ...menuItemStyles.button,
            '&.Mui-selected': {
              backgroundColor: theme.palette.action.selected,
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          {Icon && (
            <ListItemIcon sx={{ 
              color: 'inherit',
              minWidth: '32px',  
              marginRight: '6px'  
            }}>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText primary={item.title} sx={menuItemStyles.label} />
        </ListItemButton>
      </ListItem>
    );
  };

  const renderNavigationSection = (section: NavigationSection) => {
    return (
      <React.Fragment key={section.id}>
        <ListItem
          sx={{
            backgroundColor: theme.palette.primary.main,
            cursor: 'pointer',
            py: 1.5,
            borderBottom: `1px solid ${theme.palette.divider}`,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          onClick={() => handleSectionToggle(section.id)}
        >
          <ListItemText 
            primary={section.title}
            primaryTypographyProps={{
              variant: 'subtitle1',
              fontWeight: 'medium',
              color: theme.palette.primary.contrastText,
            }}
          />
          {state.expandedSections.includes(section.id) ? (
            <ExpandLessIcon sx={{ color: theme.palette.primary.contrastText }} />
          ) : (
            <ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />
          )}
        </ListItem>
        <Collapse in={state.expandedSections.includes(section.id)} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={menuItemStyles.subMenuContent}>
            {section.items.map(renderNavigationItem)}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  const drawerWidth = 240;
  const closedWidth = '0px';

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : closedWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : closedWidth,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: 'hidden',
          backgroundColor: theme.palette.background.default,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
      open={open}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Box
        sx={{
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          transition: theme.transitions.create(['opacity', 'visibility'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <List>
          {navigationConfig.map(renderNavigationSection)}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
