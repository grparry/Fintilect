import React, { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, SxProps, Theme } from '@mui/material';
import logger from '../../utils/logger';

interface MenuItemProps {
  to: string;
  icon?: React.ReactElement;
  primary: string;
  secondary?: string;
  sx?: SxProps<Theme>;
  itemId?: string;
}
export const MenuItem: React.FC<MenuItemProps> = ({ 
  to, 
  icon, 
  primary, 
  secondary,
  sx = {},
  itemId = `menu-${primary.toLowerCase().replace(/\s+/g, '-')}`,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSelected = location.pathname === to;
  const handleNavigation = useCallback((event: React.MouseEvent) => {
    // Prevent default Link behavior
    event.preventDefault();
    logger.info({
      message: 'Navigation: Menu item clicked',
      itemId,
      from: location.pathname,
      to,
      item: {
        primary,
        secondary,
        isSelected
      },
      timestamp: new Date().toISOString()
    });
    navigate(to);
  }, [to, location.pathname, primary, secondary, isSelected, itemId, navigate]);
  return (
    <ListItem
      button
      component={Link}
      to={to}
      selected={isSelected}
      onClick={handleNavigation}
      sx={{
        pl: 3,
        '&.Mui-selected': {
          bgcolor: 'action.selected',
          '&:hover': {
            bgcolor: 'action.selectedHover',
          },
        },
        '&:hover': {
          bgcolor: 'action.hover',
        },
        ...sx
      }}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText
        primary={primary}
        secondary={secondary}
        secondaryTypographyProps={{
          sx: {
            color: isSelected ? 'primary.main' : 'text.secondary',
            opacity: 0.7,
          },
        }}
      />
    </ListItem>
  );
};