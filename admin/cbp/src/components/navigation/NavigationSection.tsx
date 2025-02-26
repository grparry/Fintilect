import React, { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Collapse,
  useTheme,
  alpha,
  SvgIcon
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { NavigationSection as NavigationSectionType, NavigationItem } from '../../types/section-navigation.types';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface NavigationSectionProps {
  section: NavigationSectionType;
  level: number;
  expandedItems: string[];
  activePath: string;
}

const NavigationSection: React.FC<NavigationSectionProps> = ({ 
  section, 
  level, 
  expandedItems, 
  activePath 
}) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { state, toggleSection } = useNavigation();

  // Return null if section is undefined
  if (!section) return null;
  
  const isActive = section.id ? state.activeSection === section.id : false;
  
  // For top-level sections (level 0), always keep them expanded when active
  const isSectionExpanded = level === 0 ? isActive : state.expandedItems.includes(section.id || '');

  const handleSectionClick = () => {
    if (!section?.id) return;
    
    console.log('NavigationSection - Section clicked:', {
      id: section.id,
      path: section.path,
      basePath: section.basePath,
      currentPath: location.pathname
    });
    
    // Always toggle the section first
    toggleSection(section.id);
    
    // Then navigate if we have a path and we're not already there
    if (section.path && location.pathname !== section.path) {
      console.log('NavigationSection - Navigating to:', section.path);
      navigate(section.path);
    } else {
      console.log('NavigationSection - Not navigating because:', {
        hasPath: !!section.path,
        pathsMatch: location.pathname === section.path
      });
    }
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 1) => {
    if (!item) return null;
    
    const itemPath = item.path;
    const isSelected = activePath === itemPath;
    const hasChildren = !!(item.items?.length || item.children?.length);
    const isItemOpen = item.id ? state.expandedItems.includes(item.id) : false;

    const handleItemClick = () => {
      if (!item) return;
      
      // Toggle section if it has an ID
      if (item.id) {
        toggleSection(item.id);
      }

      // Navigate if we have a path and we're not already there
      if (item.path && location.pathname !== item.path) {
        navigate(item.path);
      }
    };

    const IconComponent = item.icon;

    return (
      <Box key={item.id || Math.random()}>
        <ListItemButton
          onClick={handleItemClick}
          selected={isSelected}
          sx={{
            pl: level * 2,
            py: 1,
            '&.Mui-selected': {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.2),
              },
            },
          }}
        >
          {IconComponent && (
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SvgIcon component={IconComponent} />
            </ListItemIcon>
          )}
          <ListItemText 
            primary={item.title} 
            sx={{
              '& .MuiTypography-root': {
                fontSize: '0.875rem',
                fontWeight: isSelected ? 600 : 400,
              },
            }}
          />
          {hasChildren && (
            isItemOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />
          )}
        </ListItemButton>
        {hasChildren && (
          <Collapse 
            in={isItemOpen} 
            timeout={300}
            mountOnEnter
          >
            <List component="div" disablePadding>
              {(item.items || item.children)?.map((child) => 
                child ? renderNavigationItem(child, level + 1) : null
              )}
            </List>
          </Collapse>
        )}
      </Box>
    );
  };

  const SectionIconComponent = section.icon;

  return (
    <Box>
      <ListItemButton
        onClick={(e) => {
          console.log('Section header clicked:', {
            id: section.id,
            title: section.title,
            path: section.path,
            event: e
          });
          handleSectionClick();
        }}
        selected={isActive}
        sx={{
          backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
          '&:hover': {
            backgroundColor: isActive 
              ? alpha(theme.palette.primary.main, 0.2)
              : alpha(theme.palette.action.hover, 0.1),
          },
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.2),
            },
          },
        }}
      >
        {SectionIconComponent && (
          <ListItemIcon sx={{ minWidth: 40 }}>
            <SvgIcon 
              component={SectionIconComponent}
              sx={{ 
                color: section.color || theme.palette.primary.main 
              }}
            />
          </ListItemIcon>
        )}
        <ListItemText 
          primary={section.title}
          sx={{
            '& .MuiTypography-root': {
              fontWeight: isActive ? 600 : 400,
            },
          }}
        />
        {/* Only show chevron for non-top-level sections */}
        {level > 0 && (isSectionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </ListItemButton>
      <Collapse 
        in={isSectionExpanded} 
        timeout={300}
        mountOnEnter
      >
        <List component="div" disablePadding>
          {section.items?.map((item) => renderNavigationItem(item))}
        </List>
      </Collapse>
    </Box>
  );
};

export default NavigationSection;
