import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText, SxProps, Theme } from '@mui/material';

interface MenuItemProps {
  to: string;
  icon?: React.ReactElement;
  primary: string;
  secondary?: string;
  sx?: SxProps<Theme>;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  to, 
  icon, 
  primary, 
  secondary,
  sx = {} 
}) => {
  const location = useLocation();
  const isSelected = location.pathname === to;

  return (
    <ListItem
      button
      component={Link}
      to={to}
      selected={isSelected}
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
