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
import { NavigationSection as NavigationSectionType, NavigationItem } from '../types/section-navigation.types';
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
  // Return null if section is undefined



  // Return null if section is undefined

  
  // For top-level sections (level 0), always keep them expanded when active

    
    
    // Always toggle the section first
    
    // Then navigate if we have a path and we're not already there

    

      
      // Toggle section if it has an ID

      // Navigate if we have a path and we're not already there


      <Box key={item.id || Math.random()}>
        <ListItemButton
            '&.Mui-selected': {
              '&:hover': {
        >
          {IconComponent && (
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SvgIcon component={IconComponent} />
            </ListItemIcon>
          )}
          <ListItemText 
              '& .MuiTypography-root': {
          />
          {hasChildren && (
          )}
        </ListItemButton>
        {hasChildren && (
          <Collapse in={isItemOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(item.items || item.children)?.map((child) => 
              )}
            </List>
          </Collapse>
        )}
      </Box>
    );


    <Box>
      <ListItemButton
          '&:hover': {
              ? alpha(theme.palette.primary.main, 0.2)
              : alpha(theme.palette.action.hover, 0.1),
          '&.Mui-selected': {
            '&:hover': {
      >
        {SectionIconComponent && (
          <ListItemIcon sx={{ minWidth: 40 }}>
            <SvgIcon 
            />
          </ListItemIcon>
        )}
        <ListItemText 
            '& .MuiTypography-root': {
        />
        {/* Only show chevron for non-top-level sections */}
        {level > 0 && (isSectionExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </ListItemButton>
      <Collapse in={isSectionExpanded} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {section.items?.map((item) => renderNavigationItem(item))}
        </List>
      </Collapse>
    </Box>
  );

