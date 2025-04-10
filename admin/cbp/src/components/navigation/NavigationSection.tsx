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
import { usePermissions } from '../../hooks/usePermissions';
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
  const { checkPermission, checkPermissions, permissionContext } = usePermissions();
  const [visibleItems, setVisibleItems] = useState<NavigationItem[]>([]);

  useEffect(() => {
    const checkSectionAndItemPermissions = async () => {
      if (!section) return;

      console.log(`[NavigationSection] Starting permission check for section: ${section.title || 'unnamed'}`, {
        sectionId: section.id,
        userRoles: permissionContext.roles,
        userInfo: {
          clientId: permissionContext.clientId,
          userId: permissionContext.userId,
          isAuthenticated: permissionContext.isAuthenticated
        }
      });

      // Collect all resource IDs that need to be checked
      const resourceIds = [
        ...(section.resourceId ? [section.resourceId] : []),
        ...(section.items?.map(item => item.resourceId).filter(Boolean) || [])
      ];

      // Collect all required permissions that need to be checked
      const requiredPermissions = [
        ...(section.requiredPermission ? [section.requiredPermission] : []),
        ...(section.items?.map(item => item.requiredPermission).filter(Boolean) || [])
      ];

      console.log(`[NavigationSection] Resources and permissions for section: ${section.title || 'unnamed'}`, {
        resourceIds,
        requiredPermissions
      });

      if (resourceIds.length === 0 && requiredPermissions.length === 0) {
        // If no permissions to check, show all items
        console.log(`[NavigationSection] No permissions to check for section: ${section.title || 'unnamed'}, showing all items`);
        setVisibleItems(section.items || []);
        return;
      }

      try {
        // Check resource IDs
        const permissions = resourceIds.length > 0 ? await checkPermissions(resourceIds) : {};
        
        console.log(`[NavigationSection] Checking permissions for section: ${section.title}`, {
          sectionId: section.id,
          resourceId: section.resourceId,
          requiredPermission: section.requiredPermission,
          userRoles: permissionContext.roles,
          permissionResults: permissions
        });
        
        // If section has a resourceId, use that for permission check
        // This will properly handle both regular permissions and admin permissions
        let hasAccess = true;
        if (section.resourceId) {
          hasAccess = permissions[section.resourceId]?.hasAccess === true;
          console.log(`[NavigationSection] Resource ID check for ${section.title}:`, {
            resourceId: section.resourceId,
            hasAccess: hasAccess,
            permissionResult: permissions[section.resourceId]
          });
        }
        // Only if no resourceId is specified, fall back to direct role check
        else if (section.requiredPermission) {
          hasAccess = permissionContext.roles.includes(section.requiredPermission);
          console.log(`[NavigationSection] Direct role check for ${section.title}:`, {
            requiredPermission: section.requiredPermission,
            hasAccess: hasAccess,
            userRoles: permissionContext.roles
          });
        }

        if (!hasAccess) {
          console.log(`[NavigationSection] Access denied for section: ${section.title}`);
          setVisibleItems([]);
          return;
        }
        
        console.log(`[NavigationSection] Access granted for section: ${section.title}`);

        // Filter items based on permissions
        const filteredItems = await Promise.all((section.items || []).map(async (item) => {
          // If item has a resourceId, use that for permission check
          // This will properly handle both regular permissions and admin permissions
          let hasItemAccess = true;
          if (item.resourceId) {
            hasItemAccess = permissions[item.resourceId]?.hasAccess === true;
            console.log(`[NavigationSection] Item permission check for ${item.title} in ${section.title}:`, {
              resourceId: item.resourceId,
              hasAccess: hasItemAccess,
              permissionResult: permissions[item.resourceId]
            });
          }
          // Only if no resourceId is specified, fall back to direct role check
          else if (item.requiredPermission) {
            hasItemAccess = permissionContext.roles.includes(item.requiredPermission);
            console.log(`[NavigationSection] Item direct role check for ${item.title} in ${section.title}:`, {
              requiredPermission: item.requiredPermission,
              hasAccess: hasItemAccess,
              userRoles: permissionContext.roles
            });
          }
          
          return { item, hasAccess: hasItemAccess };
        }));

        const visibleItemsList = filteredItems.filter(({ hasAccess }) => hasAccess).map(({ item }) => item);
        console.log(`[NavigationSection] Filtered items for section: ${section.title}`, {
          totalItems: section.items?.length || 0,
          filteredItems: filteredItems.map(({ item, hasAccess }) => ({ title: item.title, hasAccess })),
          visibleItems: visibleItemsList.map(item => item.title)
        });
        setVisibleItems(visibleItemsList);
      } catch (error) {
        console.error('Error checking permissions:', error);
        setVisibleItems([]);
      }
    };

    checkSectionAndItemPermissions();
  }, [section, checkPermissions, checkPermission, permissionContext]);

  const isActive = section && section.id ? state.activeSection === section.id : false;
  const isSectionExpanded = level === 0 ? isActive : (section && section.id ? state.expandedItems.includes(section.id) : false);

  // Don't render if section is undefined or if no visible items and no section path
  if (!section) {
    console.log(`[NavigationSection] Not rendering - section is undefined`);
    return null;
  }
  
  if (visibleItems.length === 0 && !section.path) {
    console.log(`[NavigationSection] Not rendering section: ${section.title || 'unnamed'}`, {
      reason: 'No visible items and no section path',
      sectionId: section.id,
      visibleItemsCount: visibleItems.length,
      hasPath: !!section.path
    });
    return null;
  }
  
  console.log(`[NavigationSection] Rendering section: ${section.title || 'unnamed'}`, {
    sectionId: section.id,
    visibleItemsCount: visibleItems.length,
    visibleItems: visibleItems.map(item => item.title)
  });

  const handleSectionClick = () => {
    if (!section || !section.id) return;
    
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
    }
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 1) => {
    if (!item) return null;
    
    // Check if the user has the required permission for this item
    if (item.requiredPermission && !permissionContext.roles.includes(item.requiredPermission)) {
      return null; // Skip rendering this item if the user doesn't have the required permission
    }
    
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
              {/* Filter out items that require permissions the user doesn't have */}
              {(item.items || item.children || []).filter(child => 
                !child.requiredPermission || permissionContext.roles.includes(child.requiredPermission)
              ).map((child) => 
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
