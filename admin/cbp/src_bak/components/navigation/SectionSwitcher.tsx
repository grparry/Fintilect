import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup, useTheme, alpha } from '@mui/material';
import { NavigationSection } from '../../types/section-navigation.types';

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






    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <ToggleButtonGroup
          '& .MuiToggleButton-root': {
            '&.Mui-selected': {
              '&:hover': {
      >
        {sections.map((section) => (
          <ToggleButton
              '&.Mui-selected': {
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {section.icon && React.createElement(section.icon, { 
              {section.title}
              {section.badge !== undefined && section.badge > 0 && (
                <Box
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

