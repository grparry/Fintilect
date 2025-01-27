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





      '&:hover': {
      '&.Mui-selected': {
        '&:hover': {


    <>
      <ListItem disablePadding>
        <ListItemButton
        >
          {Icon && (
            <ListItemIcon sx={menuItemStyles.icon}>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText
          />
          {item.children && (
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
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );

