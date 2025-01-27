import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup, useTheme, alpha } from '@mui/material';
import { NavigationSection } from '@/../types/section-navigation.types';

interface SectionSwitcherProps {
  sections: NavigationSection[];
  activeSection: string | null;
  onSectionSwitch: (sectionId: string) => void;
}

const SectionSwitcher: React.FC<SectionSwitcherProps> = ({
  sections,
  activeSection,
  onSectionSwitch,
}) => {
  const theme = useTheme();

  const handleChange = (_: React.MouseEvent<HTMLElement>, sectionId: string) => {
    if (sectionId) {
      onSectionSwitch(sectionId);
    }
  };

  if (sections.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <ToggleButtonGroup
        value={activeSection}
        exclusive
        onChange={handleChange}
        aria-label="section switcher"
        orientation="vertical"
        sx={{
          width: '100%',
          gap: 1,
          '& .MuiToggleButton-root': {
            border: 'none',
            borderRadius: 1,
            justifyContent: 'flex-start',
            px: 2,
            py: 1.5,
            '&.Mui-selected': {
              backgroundColor: theme => alpha(theme.palette.primary.main, 0.1),
              '&:hover': {
                backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
              },
            },
          },
        }}
      >
        {sections.map((section) => (
          <ToggleButton
            key={section.id}
            value={section.id}
            aria-label={section.title}
            sx={{
              color: section.color,
              '&.Mui-selected': {
                color: section.color,
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {section.icon && React.createElement(section.icon, { 
                sx: { 
                  mr: 1,
                  color: 'inherit',
                }
              })}
              {section.title}
              {section.badge !== undefined && section.badge > 0 && (
                <Box
                  sx={{
                    ml: 'auto',
                    backgroundColor: section.color,
                    color: theme.palette.getContrastText(section.color),
                    borderRadius: '12px',
                    padding: '0 8px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    minWidth: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {section.badge}
                </Box>
              )}
            </Box>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default SectionSwitcher;
