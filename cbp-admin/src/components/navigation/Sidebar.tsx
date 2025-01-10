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
import { NavigationItem, NavigationSection } from '../../types/navigation.types';
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
  const navigationConfig = useMemo<NavigationSection[]>(() => getNavigationConfig(), []);

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
      pl: 2,
      py: 1.5,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    icon: {
      color: theme.palette.text.secondary,
      minWidth: 36,
    },
    text: {
      color: theme.palette.text.primary,
    },
  };

  const renderNavigationItem = (item: NavigationItem) => {
    if (item.hideFromSidebar) return null;
    
    const Icon = item.icon ? Icons[item.icon as keyof typeof Icons] : null;

    return (
      <ListItem key={item.id} disablePadding>
        <ListItemButton
          onClick={() => handleNavigate(item.path)}
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
          }}
        >
          {Icon && (
            <ListItemIcon sx={menuItemStyles.icon}>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.title}
            sx={menuItemStyles.text}
          />
          {item.children && (
            state.expandedSections.includes(item.id) ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )
          )}
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
        <Collapse in={state.expandedSections.includes(section.id)}>
          <List component="div" disablePadding>
            {section.items.map((item) => renderNavigationItem(item))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: open ? 240 : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          p: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <IconButton onClick={onClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      <List sx={{ pt: 0 }}>
        {navigationConfig.map((section) => renderNavigationSection(section))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
