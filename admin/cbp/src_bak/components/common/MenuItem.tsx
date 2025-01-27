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




    // Prevent default Link behavior



    <ListItem
        '&.Mui-selected': {
          '&:hover': {
        '&:hover': {
        ...sx
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText
      />
    </ListItem>
  );
