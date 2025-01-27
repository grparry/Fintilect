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
import { NavigationSection } from '@/../types/navigation.types';
import SidebarItem from '@/SidebarItem';

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
    backgroundColor: theme.palette.primary.dark,
  },
  '& .MuiListItemIcon-root': {
    color: theme.palette.primary.contrastText,
    minWidth: 'auto',
    marginLeft: theme.spacing(1),
    '& svg': {
      fontSize: '1.25rem', // 20px to match text
    }
  },
  '& .MuiListItemText-primary': {
    fontWeight: 600,
    fontSize: '1.25rem', // 20px
    letterSpacing: '0.01em',
    lineHeight: 1.2,
  },
}));

const SidebarSection: React.FC<SidebarSectionProps> = ({ section }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
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
};

export default SidebarSection;
