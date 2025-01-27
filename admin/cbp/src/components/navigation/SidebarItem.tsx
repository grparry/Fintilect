import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  useTheme,
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
  const { state, toggleSection } = useNavigation();
  const Icon = item.icon ? Icons[item.icon as keyof typeof Icons] : null;
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.children) {
      toggleSection(item.id);
    } else {
      navigate(item.path);
    }
  };
  const menuItemStyles = {
    button: {
      pl: 2 + depth * 2,
      py: 1.5,
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-selected': {
        backgroundColor: theme.palette.action.selected,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
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
  if (item.hideFromSidebar) {
    return null;
  }
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleClick}
          sx={menuItemStyles.button}
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
            state.expandedItems.includes(item.id) ? (
              <ExpandLess />
            ) : (
              <ExpandMore />
            )
          )}
        </ListItemButton>
      </ListItem>
      {item.children && (
        <Collapse in={state.expandedItems.includes(item.id)}>
          <List component="div" disablePadding>
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