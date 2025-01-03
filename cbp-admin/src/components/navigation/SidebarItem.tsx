import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  styled,
  IconButton,
  List,
} from '@mui/material';
import {
  Circle,
  ExpandLess,
  ExpandMore,
  Payment,
  Settings,
  People,
  Security,
  Assessment,
  AccountBalance,
  Dashboard,
} from '@mui/icons-material';
import { useNavigation } from '../../context/NavigationContext';
import { NavigationItem } from '../../types/navigation.types';

// Create an icons map
const IconMap: Record<string, typeof Circle> = {
  Circle,
  Payment,
  Settings,
  People,
  Security,
  Assessment,
  AccountBalance,
  Dashboard,
};

interface SidebarItemProps {
  item: NavigationItem;
  depth?: number;
}

interface StyledListItemProps {
  component?: typeof Link | 'div';
  isSection?: boolean;
}

const StyledListItem = styled(ListItem)<StyledListItemProps>(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  paddingLeft: theme.spacing(4),
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.grey[800] 
      : theme.palette.grey[100],
    '& .MuiListItemIcon-root': {
      color: theme.palette.text.primary,
    }
  },
  '&.active': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? theme.palette.grey[800] 
      : theme.palette.grey[100],
    color: theme.palette.text.primary,
    borderRight: `3px solid ${theme.palette.primary.main}`,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: 40,
    color: theme.palette.text.secondary,
    '& svg': {
      fontSize: '1.25rem', // 20px to complement the 18px text
    }
  },
  '& .MuiListItemText-root': {
    margin: 0,
    '& .MuiTypography-root': {
      fontSize: '1.125rem', // 18px
      fontWeight: 500,
      lineHeight: 1.3,
    }
  }
}));

const SidebarItem: React.FC<SidebarItemProps> = ({ item, depth = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleSection } = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = location.pathname === item.path;
  const isSection = Boolean(!item.path && item.children && item.children.length > 0);

  const handleClick = (e: React.MouseEvent) => {
    if (!item.path) {
      e.preventDefault();
      toggleSection(item.id);
      setIsExpanded(!isExpanded);
    }
  };

  const IconComponent = item.icon ? IconMap[item.icon] || Circle : Circle;

  return (
    <>
      <StyledListItem
        {...(item.path ? { component: Link, to: item.path } : { component: 'div' })}
        className={isActive ? 'active' : ''}
        sx={{ pl: depth * 2 + 2 }}
        onClick={handleClick}
        isSection={isSection}
      >
        <ListItemIcon>
          <IconComponent />
        </ListItemIcon>
        <ListItemText primary={item.title} />
        {item.children && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            size="small"
            sx={{ 
              color: isSection ? 'common.white' : 'inherit',
              '&:hover': {
                backgroundColor: isSection 
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.04)',
              }
            }}
          >
            {isExpanded ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )}
      </StyledListItem>
      {item.children && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children.map((child) => (
              <SidebarItem key={child.id} item={child} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default SidebarItem;
