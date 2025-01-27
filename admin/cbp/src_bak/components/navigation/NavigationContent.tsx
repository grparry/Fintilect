import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Collapse } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationItem } from '../../types/section-navigation.types';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigation } from '../../context/NavigationContext';

interface NavigationContentProps {
  items: NavigationItem[];
}

const ContentContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {



  '&::-webkit-scrollbar': {
  '&::-webkit-scrollbar-track': {
  '&::-webkit-scrollbar-thumb': {

  '&:hover': {
  '&.Mui-selected': {
    '&:hover': {





      <React.Fragment key={item.id}>
        <ListItem disablePadding>
          <StyledListItemButton
          >
            {item.icon && (
              <ListItemIcon>
                {React.createElement(item.icon)}
              </ListItemIcon>
            )}
            <ListItemText primary={item.title} />
            {hasChildren && (
            )}
          </StyledListItemButton>
        </ListItem>
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map(child => renderNavigationItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );

    <ContentContainer>
      <List>
        {items.map(item => renderNavigationItem(item))}
      </List>
    </ContentContainer>
  );

