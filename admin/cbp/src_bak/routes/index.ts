import billPayRoutes from './billPayRoutes';
import clientManagementRoutes from './ClientManagementRoutes';
import emergeAdminRoutes from './emergeAdminRoutes';
import emergeConfigRoutes from './emergeConfigRoutes';
import developmentRoutes from './developmentRoutes';
import { NavigationConfig, NavigationSection, NavigationItem, RouteConfig, NavigationElement, NavigationPermissionRequirement } from './types/section-navigation.types';
import { sectionConfig, defaultSectionConfig } from './config/section.config';
import { lazy } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentIcon from '@mui/icons-material/Payment';
import CodeIcon from '@mui/icons-material/Code';

// Lazy load components


// Lazy load components

// Define the route sections configuration

// Helper function to get full path

// Helper function to process routes recursively
      ...route,

      ? processRoutes(route.children, sectionId, fullPath)
      : [];
    
    // Remove children from the processed route to avoid duplication
    

// Get all routes flattened with full paths
  
  // Add root admin route

  // Process all routes
    // Process section routes recursively

    // Only add header route if one doesn't already exist in the section routes
    );

      // Add section header route


  // Add admin route and return all routes

// Get navigation items for the sidebar
  // Get all processed routes
  
  // Helper function to build navigation tree

    // First pass: create all navigation items

    // Second pass: build the hierarchy
          // Find the parent by checking if this route's path starts with another route's path
                   !route.path.slice(potential.path.length + 1).includes('/');



  // Group routes by section



  // Convert to sections array with hierarchical navigation items


