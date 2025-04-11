import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logger from '../../utils/logger';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  useTheme,
  alpha
} from '@mui/material';
import * as Icons from '@mui/icons-material';
import { NavigationItem } from '../../types/navigation.types';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigation } from '../../context/NavigationContext';

interface SidebarItemProps {
  item: NavigationItem;
  depth?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item, depth = 0 }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { state, toggleSection } = useNavigation();
  const Icon = item.icon ? Icons[item.icon as keyof typeof Icons] : null;

  const isItemActive = React.useMemo(() => {
    const active = item.path === state.activePath;
    logger.log('[SidebarItem] Checking active state:', {
      itemId: item.id,
      itemPath: item.path,
      activePath: state.activePath,
      isActive: active
    });
    return active;
  }, [item.path, state.activePath, item.id]);

  React.useEffect(() => {
    logger.log('[SidebarItem] Active state changed:', {
      id: item.id,
      path: item.path,
      isActive: isItemActive
    });
  }, [isItemActive, item.id, item.path]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    logger.log('[SidebarItem] Item clicked:', {
      id: item.id,
      path: item.path,
      currentPath: location.pathname,
      isActive: isItemActive
    });

    const isGrandChild = depth > 1;

    if (isGrandChild) {
      if (item.path) {
        navigate(item.path);
      }
      return;
    }

    if (item.children) {
      toggleSection(item.id);
    } else if (item.path) {
      navigate(item.path);
      toggleSection(item.id);
    }
  };

  const menuItemStyles = {
    button: {
      pl: 2 + depth * 2,
      py: 1.5,
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' 
          ? theme.palette.action.hover
          : 'rgba(255, 255, 255, 0.1)',
      },
    },
  };

  if (item.hideFromSidebar) {
    return null;
  }

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          backgroundColor: isItemActive ? theme.palette.primary.main : 'transparent',
          borderLeft: isItemActive ? `4px solid ${theme.palette.primary.dark}` : '4px solid transparent',
          mb: 0.5,
          '&:hover': {
            backgroundColor: isItemActive 
              ? theme.palette.primary.dark
              : theme.palette.action.hover,
          },
        }}
      >
        <ListItemButton
          onClick={handleClick}
          sx={{
            pl: 2 + depth * 2,
            py: 1.5,
            ...(isItemActive && {
              bgcolor: 'rgba(255, 255, 255, 0.12)',
            }),
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          {Icon && (
            <ListItemIcon 
              sx={{
                minWidth: 36
              }}
            >
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.title}
            sx={{
              '& .MuiTypography-root': {
                fontWeight: isItemActive ? 600 : 400
              },
            }}
          />
          {item.children && (
            <ExpandMore
              sx={{
                transform: state.expandedItems.includes(item.id)
                  ? 'rotate(180deg)'
                  : 'rotate(0)',
                transition: 'transform 200ms',
              }}
            />
          )}
        </ListItemButton>
      </ListItem>
      {item.children && (
        <Collapse
          in={state.expandedItems.includes(item.id)}
          timeout="auto"
          unmountOnExit
        >
          <List
            component="div"
            disablePadding
            sx={{
              '& .MuiListItemButton-root': {
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.08)',
                },
              }
            }}
          >
            {item.children.map((child) => (
              <SidebarItem
                key={child.id}
                item={child}
                depth={depth + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarItem;
