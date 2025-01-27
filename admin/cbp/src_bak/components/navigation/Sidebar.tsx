import React from 'react';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, useTheme, IconButton } from '@mui/material';
import { useNavigation } from '../../context/NavigationContext';
import NavigationSection from './NavigationSection';
import FolderIcon from '@mui/icons-material/Folder';
import { NavigationSection as NavigationSectionType } from '../../types/section-navigation.types';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  width: number;
  navigationConfig: NavigationSectionType[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  open, 
  onClose, 
  width,
  navigationConfig 
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { state, setActiveSection, toggleSection } = useNavigation();
  



  
    // Find the section in the navigation config

    // Match admin landing page behavior: toggle section first, then navigate

    <Box
        '& .MuiDrawer-paper': {
    >
      <Drawer
      >
        <Box
        >
          <Box sx={{ 
            {/* Removed chevron icon button */}
          </Box>
          <Box
          >
            {/* Active Section Area */}
            <Box
                '&::-webkit-scrollbar': {
                '&::-webkit-scrollbar-track': {
                '&::-webkit-scrollbar-thumb': {
            >
              {!state.activeSection ? (
                // When no section is active, show all sections as a list
                <List component="nav" disablePadding>
                  {navigationConfig.map((section) => (
                    <ListItemButton
                        '&:hover': {
                            ? 'rgba(255, 255, 255, 0.08)' 
                            : 'rgba(0, 0, 0, 0.08)'
                    >
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        {React.createElement(section.icon || FolderIcon)}
                      </ListItemIcon>
                      <ListItemText
                      />
                    </ListItemButton>
                  ))}
                </List>
              ) : (
                // When a section is active, show that section with its children
                <NavigationSection
                />
              )}
            </Box>

            {/* Inactive Sections Area - Only shown when a section is active */}
            {state.activeSection && (
              <Box
                    ? 'rgba(144, 202, 249, 0.29)' 
                    : 'rgba(0, 0, 0, 0.03)',
                    ? '0 -4px 6px -1px rgba(144, 202, 249, 0.2)'  
                    : '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
                  '&::-webkit-scrollbar': {
                  '&::-webkit-scrollbar-track': {
                  '&::-webkit-scrollbar-thumb': {
              >
                <List component="nav" disablePadding>
                  {navigationConfig
                    .filter(section => section.id !== state.activeSection)
                    .map((section) => (
                      <ListItemButton
                          '&:hover': {
                              ? 'rgba(255, 255, 255, 0.08)' 
                              : 'rgba(0, 0, 0, 0.08)'
                      >
                        {section.icon && (
                          <ListItemIcon sx={{ 
                            {React.createElement(section.icon, { 
                          </ListItemIcon>
                        )}
                        <ListItemText
                            '& .MuiTypography-root': { 
                        />
                      </ListItemButton>
                    ))}
                </List>
              </Box>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );

