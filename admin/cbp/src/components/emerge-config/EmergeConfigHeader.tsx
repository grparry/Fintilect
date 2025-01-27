import React, { useMemo } from 'react';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Breadcrumbs, Link } from '@mui/material';
import { NavigationRegistry } from './navigation/NavigationRegistry';
import { useConfigNavigation } from './navigation/hooks';
import { NavigationItem, CategoryItem } from './navigation/types';

interface NavigationCardProps extends NavigationItem {
    description?: string;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ title, path, icon: Icon, description }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Paper
      component={RouterLink}
      to={path}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[4],
        },
      }}
    >
      {Icon && <Icon sx={{ mb: 2, fontSize: 40, color: 'primary.main' }} />}
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Paper>
  </Grid>
);

const ConfigBreadcrumbs: React.FC = () => {
  const { breadcrumbs } = useConfigNavigation();
  
  if (breadcrumbs.length <= 1) return null;

  return (
    <Breadcrumbs sx={{ mb: 2 }}>
      <Link component={RouterLink} to="/admin/emerge-config" color="inherit">
        Emerge Config
      </Link>
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;
        return isLast ? (
          <Typography key={item.id} color="text.primary">
            {item.title}
          </Typography>
        ) : (
          <Link
            key={item.id}
            component={RouterLink}
            to={item.path}
            color="inherit"
          >
            {item.title}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

const EmergeConfigHeader: React.FC = () => {
  const location = useLocation();
  const isRootPath = location.pathname === '/admin/emerge-config' || location.pathname === '/admin/emerge-config/';
  
  // Memoize registry and navigation items
  const { registry, navigationItems } = useMemo(() => {
    const reg = NavigationRegistry.getInstance();
    return {
      registry: reg,
      navigationItems: reg.getNavigationItems()
    };
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <ConfigBreadcrumbs />
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="text.primary">
          Emerge Configuration
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Configure and manage all aspects of the Emerge platform, from settings to specific feature configurations.
        </Typography>
      </Box>

      {isRootPath && (
        <Grid container spacing={3}>
          {navigationItems.map((category: CategoryItem) => 
            category.children.map((item: NavigationItem) => (
              <NavigationCard key={item.id} {...item} />
            ))
          )}
        </Grid>
      )}

      <Outlet />
    </Box>
  );
};

export default EmergeConfigHeader;