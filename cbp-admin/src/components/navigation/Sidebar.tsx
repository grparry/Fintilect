import React, { useMemo, useState, useEffect } from 'react';
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
  Toolbar,
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
import { permissionService } from '../../services/factory/ServiceFactory';
import { useAuth } from '../../context/AuthContext';

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
  const { user } = useAuth();
  const [filteredConfig, setFilteredConfig] = useState<NavigationSection[]>([]);
  
  useEffect(() => {
    const filterNavigation = async () => {
      const allConfig = getNavigationConfig();
      if (!user) {
        setFilteredConfig([]);
        return;
      }

      const permissions = await permissionService.getPermissions();
      console.log('Loaded permissions:', permissions.map(p => ({ 
        category: p.category, 
        actions: p.actions 
      })));

      // Check if a section has permission
      const hasSectionPermission = (sectionId: string): boolean => {
        const categoryMap: { [key: string]: string } = {
          'clientManagement': 'ClientManagement',
          'billPay': 'BillPay',
          'emerge': 'Emerge',
          'development': 'Development'
        };
        
        const category = categoryMap[sectionId] || sectionId;
        return permissions.some(p => 
          p.category.toLowerCase() === category.toLowerCase() && 
          p.actions.includes('view')
        );
      };

      // Filter navigation items based on user permissions
      const filterItems = async (items: NavigationItem[], sectionId: string): Promise<NavigationItem[]> => {
        const filteredItems = [];
        
        for (const item of items) {
          // Map route ID to permission category
          const categoryMap: { [key: string]: string } = {
            'client-management': 'ClientManagement',
            'client-list': 'ClientManagement',
            'api-testing': 'Development',
            'bill-pay': 'BillPay',
            'emerge-admin': 'Emerge',
            'member-center': 'Emerge',
            'money-desktop': 'Emerge',
            'payments': 'BillPay',
            'exceptions': 'BillPay',
            'settings': 'BillPay'
          };
          
          const category = categoryMap[item.id] || sectionId;
          const hasPermission = permissions.some(p => 
            p.category.toLowerCase() === category.toLowerCase() && 
            p.actions.includes('view')
          );
          
          console.log('Permission check result:', {
            itemId: item.id,
            sectionId: sectionId,
            category: category,
            hasPermission: hasPermission
          });
          
          if (hasPermission || item.id === 'dashboard') { // Always show dashboard
            if (item.children) {
              const filteredChildren = await filterItems(item.children, sectionId);
              if (filteredChildren.length > 0) {
                filteredItems.push({ ...item, children: filteredChildren });
              }
            } else {
              filteredItems.push(item);
            }
          }
        }
        return filteredItems;
      };

      const filteredSections = [];
      for (const section of allConfig) {
        console.log('Processing section:', {
          id: section.id,
          title: section.title,
          itemCount: section.items.length,
          items: section.items.map(i => i.id)
        });
        
        // Check section-level permission first
        if (hasSectionPermission(section.id)) {
          const filteredItems = await filterItems(section.items, section.id);
          if (filteredItems.length > 0) {
            filteredSections.push({ ...section, items: filteredItems });
          }
        } else {
          console.log('Skipping section - no permission:', section.id);
        }
      }

      console.log('Filtered navigation config:', 
        filteredSections.map(s => ({
          id: s.id,
          title: s.title,
          items: s.items.map(i => i.id)
        }))
      );
      setFilteredConfig(filteredSections);
    };

    filterNavigation();
  }, [user]);

  const handleNavigate = (path: string) => {
    navigate(path);
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
      <Toolbar /> {/* Add spacing for header */}
      {isMobile && (
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
      )}
      <List sx={{ pt: 0 }}>
        {filteredConfig.map((section) => renderNavigationSection(section))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
