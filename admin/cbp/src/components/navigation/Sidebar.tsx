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
  
  const handleSectionClick = (sectionId: string) => {
    // Find the section in the navigation config
    const section = navigationConfig.find(s => s.id === sectionId);
    if (section) {
      // If clicking the active section, toggle it
      if (state.activeSection === sectionId) {
        toggleSection(sectionId);
      } else {
        // Otherwise, set it as active
        setActiveSection(sectionId);
      }
    }
  };

  return (
    <Box
      component="nav"
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'primary.dark',
          borderRight: `1px solid ${theme.palette.divider}`,
          height: 'calc(100vh - 64px)',
          position: 'fixed',
          top: 64,
          color: theme.palette.mode === 'dark' ? 'inherit' : '#fff',
          '& .MuiListItemIcon-root': {
            color: theme.palette.mode === 'dark' ? 'inherit' : '#fff',
          },
          '& .MuiListItemText-root': {
            color: theme.palette.mode === 'dark' ? 'inherit' : '#fff',
          }
        }
      }}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          width: width,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: width,
            boxSizing: 'border-box',
            bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : theme.palette.primary.main,
            color: '#fff',
            '& .MuiListItemIcon-root': {
              color: '#fff'
            },
            '& .MuiListItemText-root': {
              color: '#fff'
            },
            '& .MuiSvgIcon-root': {
              color: '#fff'
            }
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            p: 1
          }}>
            {/* Removed chevron icon button */}
          </Box>
          <Box
            sx={{
              flex: 1,
              overflowY: 'auto',
              minHeight: 0  // Important for flex child
            }}
          >
            {/* Active Section Area */}
            <Box
              sx={{
                height: 'calc(100vh - 64px - 160px)', // Increased space for active section, reduced space for inactive items
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
                }
              }}
            >
              {!state.activeSection ? (
                // When no section is active, show all sections as a list
                <List component="nav" disablePadding>
                  {navigationConfig.map((section) => (
                    <ListItemButton
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      sx={{
                        py: 1.5,
                        px: 3,
                        borderRadius: 1,
                        '&:hover': {
                          bgcolor: 'action.hover'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {React.createElement(section.icon || FolderIcon)}
                      </ListItemIcon>
                      <ListItemText primary={section.title} />
                    </ListItemButton>
                  ))}
                </List>
              ) : (
                // When a section is active, show that section with its children
                <NavigationSection
                  key={state.activeSection}
                  section={navigationConfig.find(s => s.id === state.activeSection)!}
                  level={0}
                  expandedItems={state.expandedItems}
                  activePath={state.activePath ?? ''}
                />
              )}
            </Box>

            {/* Inactive Sections Area - Only shown when a section is active */}
            {state.activeSection && (
              <Box
                sx={{
                  position: 'fixed',
                  bottom: 0,
                  width: width,
                  maxHeight: '160px',
                  overflowY: 'auto',
                  borderTop: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.mode === 'dark' 
                    ? 'rgba(144, 202, 249, 0.29)' 
                    : 'rgba(0, 0, 0, 0.03)',
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 -4px 6px -1px rgba(144, 202, 249, 0.2)'  
                    : '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: theme.palette.background.paper,
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: theme.palette.divider,
                    borderRadius: '2px',
                  }
                }}
              >
                <List component="nav" disablePadding>
                  {navigationConfig
                    .filter(section => section.id !== state.activeSection)
                    .map((section) => (
                      <ListItemButton
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        sx={{
                          py: 0.5,
                          minHeight: 32,
                          '&:hover': {
                            backgroundColor: theme.palette.mode === 'dark' 
                              ? 'rgba(255, 255, 255, 0.08)' 
                              : 'rgba(0, 0, 0, 0.08)'
                          }
                        }}
                      >
                        {section.icon && (
                          <ListItemIcon sx={{ 
                            minWidth: 40,
                            color: 'inherit'
                          }}>
                            {React.createElement(section.icon, { 
                              sx: { fontSize: '1.1rem' }
                            })}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={section.title}
                          sx={{ 
                            m: 0,
                            '& .MuiTypography-root': { 
                              fontWeight: 500,
                              fontSize: '0.85rem',
                              lineHeight: 1.2
                            }
                          }}
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
};

export default Sidebar;
