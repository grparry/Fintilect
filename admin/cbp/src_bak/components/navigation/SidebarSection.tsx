import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  styled,
  ListItemButton,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { NavigationSection } from '../../types/navigation.types';
import SidebarItem from './SidebarItem';

interface SidebarSectionProps {
  section: NavigationSection;
}

const StyledSection = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: 360,
  backgroundColor: theme.palette.background.paper,
}));

const StyledSectionHeader = styled(ListItemButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.5, 2),
  '&:hover': {




  '&:hover': {
  '& .MuiListItemIcon-root': {
    '& svg': {
  '& .MuiListItemText-primary': {



    <StyledSection>
      <StyledSectionHeader onClick={handleClick}>
        <ListItemText primary={section.title} />
        <ListItemIcon>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemIcon>
      </StyledSectionHeader>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {section.items.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </List>
      </Collapse>
    </StyledSection>
  );

