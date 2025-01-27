import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigation } from '@/../context/NavigationContext';
import { NavigationSection } from '@/../types/section-navigation.types';

const Breadcrumbs: React.FC = () => {
  const { navigationConfig, state } = useNavigation();

  const findActiveSection = (): NavigationSection | undefined => {
    return navigationConfig.sections.find(section => section.id === state.activeSection);
  };

  const findActivePath = (): { section: NavigationSection; item: any } | undefined => {
    for (const section of navigationConfig.sections) {
      const item = section.items?.find(item => item.path === state.activePath);
      if (item) {
        return { section, item };
      }
    }
    return undefined;
  };

  const activeSection = findActiveSection();
  const activePath = findActivePath();

  if (!activeSection && !activePath) {
    return null;
  }

  return (
    <Box sx={{ mb: 2 }}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} to="/" color="inherit">
          Home
        </Link>
        {activeSection && (
          <Link
            component={RouterLink}
            to={activeSection.basePath || '#'}
            color="inherit"
          >
            {activeSection.title}
          </Link>
        )}
        {activePath && (
          <Typography color="textPrimary">
            {activePath.item.title}
          </Typography>
        )}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
