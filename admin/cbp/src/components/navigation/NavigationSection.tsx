import React, { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Collapse,
  useTheme,
  alpha,
  SvgIcon
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { NavigationSection as NavigationSectionType, NavigationItem } from '../../types/section-navigation.types';
import { useNavigationPermissions } from '../../hooks/useNavigationPermissions';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface NavigationSectionProps {
  section: NavigationSectionType;
  level: number;
  expandedItems: string[];
  activePath: string;
}

const NavigationSection: React.FC<NavigationSectionProps> = ({ 
  section, 
  level, 
  expandedItems, 
  activePath 
}) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { state, toggleSection } = useNavigation();
  const { hasPermission } = useNavigationPermissions();
  const [visibleItems, setVisibleItems] = useState<NavigationItem[]>([]);

  // Return null if section is undefined
  if (!section) return null;

  // Check section permission and return null if no access
  useEffect(() => {
    const checkSectionPermissions = async () => {
      // Check section permission first
      if (section.resourceId) {
        const hasSectionAccess = await hasPermission(section.resourceId);
        if (!hasSectionAccess) {
          setVisibleItems([]);
          return;
        }
      }

      // Filter items based on permissions
      if (section.items) {
        const filteredItems = await Promise.all(
          section.items.map(async (item) => {
            if (item.resourceId) {
              const hasItemAccess = await hasPermission(item.resourceId);
              return hasItemAccess ? item : null;
            }
            return item;
          })
        );

        setVisibleItems(filteredItems.filter((item): item is NavigationItem => item !== null));
      }
    };

    checkSectionPermissions();
  }, [section, hasPermission]);
  
  const isActive = section.id ? state.activeSection === section.id : false;
  const isSectionExpanded = level === 0 ? isActive : state.expandedItems.includes(section.id || '');

  // Don't render if no visible items and no section path
  if (visibleItems.length === 0 && !section.path) {
    return null;
  }

  const handleSectionClick = () => {
    if (!section?.id) return;
    
    console.log('NavigationSection - Section clicked:', {
      id: section.id,
      path: section.path,
      basePath: section.basePath,
      currentPath: location.pathname
    });
    
    toggleSection(section.id);
    
    if (section.path && location.pathname !== section.path) {
      console.log('NavigationSection - Navigating to:', section.path);
      navigate(section.path);
    } else {
      console.log('NavigationSection - Not navigating because:', {
        hasPath: !!section.path,
        pathsMatch: location.pathname === section.path
      });
    }
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 1) => {
    if (!item) return null;
    
    const itemPath = item.path;
    const isSelected = activePath === itemPath;
    const hasChildren = !!(item.items?.length || item.children?.length);
    const isItemOpen = item.id ? state.expandedItems.includes(item.id) : false;

    const handleItemClick = () => {
      if (!item) return;
      
      if (item.id) {
        toggleSection(item.id);
      }

      if (item.path && location.pathname !== item.path) {
        navigate(item.path);
      }
    };

    const IconComponent = item.icon;

    return (
      <Box key={item.id || Math.random()}>
        <ListItemButton
          onClick={handleItemClick}
          selected={isSelected}
          sx={{
            pl: level * 2,
            py: 1,
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          {IconComponent && (
            <ListItemIcon sx={{ minWidth: 40 }}>
              <IconComponent />
            </ListItemIcon>
          )}
          <ListItemText 
            primary={item.title} 
            primaryTypographyProps={{
              variant: 'body2',
              sx: { fontWeight: isSelected ? 600 : 400 }
            }}
          />
          {hasChildren && (
            isItemOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
          )}
        </ListItemButton>
        {hasChildren && (
          <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(item.items || item.children || []).map((child) => 
                renderNavigationItem(child, level + 1)
              )}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box>
      {section.path && (
        <ListItemButton
          onClick={handleSectionClick}
          selected={isActive}
          sx={{
            pl: level * 2,
            py: 1,
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
            },
          }}
        >
          {section.icon && (
            <ListItemIcon sx={{ minWidth: 40 }}>
              <section.icon />
            </ListItemIcon>
          )}
          <ListItemText 
            primary={section.title}
            primaryTypographyProps={{
              variant: 'body2',
              sx: { fontWeight: isActive ? 600 : 400 }
            }}
          />
          {visibleItems.length > 0 && (
            isSectionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
          )}
        </ListItemButton>
      )}
      {visibleItems.length > 0 && (
        <Collapse in={isSectionExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {visibleItems.map((item) => renderNavigationItem(item, level + 1))}
          </List>
        </Collapse>
      )}
    </Box>
  );
};

export default NavigationSection;
