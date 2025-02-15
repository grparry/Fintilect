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
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.paper,
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '2px',
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: '4px',
  margin: '4px 8px',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

const NavigationContent: React.FC<NavigationContentProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, toggleSection } = useNavigation();

  const handleItemClick = (item: NavigationItem) => {
    if (item.children) {
      toggleSection(item.id);
    } else {
      navigate(item.path);
    }
  };

  const renderNavigationItem = (item: NavigationItem, depth = 0) => {
    const isSelected = location.pathname === item.path;
    const isExpanded = state.expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    if (item.hideFromSidebar) {
      return null;
    }

    return (
      <React.Fragment key={item.id}>
        <ListItem disablePadding>
          <StyledListItemButton
            selected={isSelected}
            onClick={() => handleItemClick(item)}
            sx={{ pl: 2 + depth * 2 }}
          >
            {item.icon && (
              <ListItemIcon>
                {React.createElement(item.icon)}
              </ListItemIcon>
            )}
            <ListItemText primary={item.title} />
            {hasChildren && (
              isExpanded ? <ExpandLess /> : <ExpandMore />
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
  };

  return (
    <ContentContainer>
      <List>
        {items.map(item => renderNavigationItem(item))}
      </List>
    </ContentContainer>
  );
};

export default NavigationContent;
