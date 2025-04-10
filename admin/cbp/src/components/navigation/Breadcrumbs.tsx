import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { NavigationSection, NavigationItem } from '../../types/section-navigation.types';

interface BreadcrumbItem {
  title: string;
  path: string;
  isLast: boolean;
}

const Breadcrumbs: React.FC = () => {
  const { navigationConfig, state } = useNavigation();
  const location = useLocation();
  const currentPath = location.pathname;

  // Find all breadcrumb items for the current path
  const findBreadcrumbPath = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { title: 'Home', path: '/admin', isLast: false }
    ];
    
    // Find the matching section and items
    let matchedSection: NavigationSection | undefined;
    let exactMatch = false;
    
    // First, try to find an exact section match
    matchedSection = navigationConfig.sections.find(section => 
      section.path === currentPath
    );
    
    if (matchedSection) {
      breadcrumbs.push({
        title: matchedSection.title,
        path: matchedSection.path || '#',
        isLast: true
      });
      return breadcrumbs;
    }
    
    // If no exact section match, find the section that contains the current path
    for (const section of navigationConfig.sections) {
      if (!section.items) continue;
      
      // Check if current path starts with section path (is within this section)
      if (section.path && currentPath.startsWith(section.path)) {
        matchedSection = section;
        
        // Add section to breadcrumbs
        breadcrumbs.push({
          title: section.title,
          path: section.path,
          isLast: false
        });
        
        // Now look for matching items within this section
        const findMatchingItems = (items: NavigationItem[], parentPath: string = ''): boolean => {
          for (const item of items) {
            // Check for exact path match
            if (item.path === currentPath) {
              breadcrumbs.push({
                title: item.title,
                path: item.path,
                isLast: true
              });
              return true;
            } 
            // Check for dynamic route match (e.g., /path/:id)
            else if (item.path && item.path.includes(':')) {
              // Create a match pattern for routes with parameters
              const match = matchPath(
                {
                  path: item.path,
                  end: true
                },
                currentPath
              );
              
              if (match) {
                breadcrumbs.push({
                  title: item.title,
                  path: currentPath, // Use actual path with ID for linking
                  isLast: true
                });
                return true;
              }
            }
            // Special handling for report categories and their children
            else if (item.path && item.items && item.path.includes('/reports/') && 
                    currentPath.startsWith('/admin/bill-pay/reports/')) {
              
              // Check if this is a report category (like system-compliance-reports)
              const isCategoryMatch = item.path.includes('-reports');
              
              // Check if any child item matches the current path
              const hasMatchingChild = item.items.some(child => 
                child.path === currentPath || 
                (child.path && currentPath.startsWith(child.path))
              );
              
              if (isCategoryMatch && hasMatchingChild) {
                // Add the category to breadcrumbs
                breadcrumbs.push({
                  title: item.title,
                  path: item.path,
                  isLast: false
                });
                
                // Search in child items
                if (findMatchingItems(item.items, item.path)) {
                  return true;
                }
              }
            }
            // Check if this is a parent of the current path
            else if (item.path && currentPath.startsWith(item.path) && item.items) {
              breadcrumbs.push({
                title: item.title,
                path: item.path,
                isLast: false
              });
              
              // Search in child items
              if (findMatchingItems(item.items, item.path)) {
                return true;
              }
              
              // If no match in children, remove this item from breadcrumbs
              breadcrumbs.pop();
            }
          }
          return false;
        };
        
        // Start searching from section items
        exactMatch = findMatchingItems(section.items);
        if (exactMatch) break;
        
        // Handle dynamic routes that aren't explicitly defined in navigation
        // This is for deeply nested routes with record identifiers
        if (!exactMatch && breadcrumbs.length > 1) {
          // Extract potential record ID from URL
          const pathSegments = currentPath.split('/');
          const lastSegment = pathSegments[pathSegments.length - 1];
          const secondLastSegment = pathSegments[pathSegments.length - 2];
          
          // Check if the last segment looks like an ID (contains numbers or is encoded)
          const isIdSegment = /[0-9]/.test(lastSegment) || lastSegment.includes('%');
          
          if (isIdSegment) {
            // Add the parent route (without the ID) as a breadcrumb
            const parentPath = pathSegments.slice(0, -1).join('/');
            
            // Try to find a navigation item that matches the parent path
            let parentItem: NavigationItem | undefined;
            const findParentItem = (items: NavigationItem[]): NavigationItem | undefined => {
              for (const item of items) {
                if (item.path === parentPath) return item;
                if (item.items) {
                  const found = findParentItem(item.items);
                  if (found) return found;
                }
              }
              return undefined;
            };
            
            // Search in all sections
            for (const section of navigationConfig.sections) {
              if (section.items) {
                parentItem = findParentItem(section.items);
                if (parentItem) break;
              }
            }
            
            // If we found a parent item, use its title
            if (parentItem) {
              breadcrumbs.push({
                title: parentItem.title,
                path: parentPath,
                isLast: false
              });
            } else {
              // Otherwise, generate a title from the second last segment
              const parentTitle = secondLastSegment
                .split('-')
                .map(part => part.charAt(0).toUpperCase() + part.slice(1))
                .join(' ');
                
              breadcrumbs.push({
                title: parentTitle,
                path: parentPath,
                isLast: false
              });
            }
            
            // Add the ID segment as the final breadcrumb
            // Try to format it in a user-friendly way if possible
            let idTitle = 'Details';
            if (lastSegment.length < 12) { // Short IDs can be displayed
              idTitle = `ID: ${decodeURIComponent(lastSegment)}`;
            }
            
            breadcrumbs.push({
              title: idTitle,
              path: currentPath,
              isLast: true
            });
            
            return breadcrumbs;
          }
        }
        
        // If we didn't find an exact match but we're in this section,
        // keep the section breadcrumb and add a generic "current page" item
        if (breadcrumbs.length > 1) {
          const pathParts = currentPath.split('/');
          const currentPageName = pathParts[pathParts.length - 1]
            .split('-')
            .map(part => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
            
          breadcrumbs.push({
            title: currentPageName || 'Current Page',
            path: currentPath,
            isLast: true
          });
          break;
        }
      }
    }
    
    // If we didn't find any matches, just show Home and current path
    if (breadcrumbs.length === 1) {
      const pathParts = currentPath.split('/');
      const currentPageName = pathParts[pathParts.length - 1]
        .split('-')
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
        
      breadcrumbs.push({
        title: currentPageName || 'Current Page',
        path: currentPath,
        isLast: true
      });
    }
    
    return breadcrumbs;
  };

  const breadcrumbItems = findBreadcrumbPath();

  return (
    <Box sx={{ p: 0 }}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        {breadcrumbItems.map((item, index) => {
          return item.isLast ? (
            <Typography key={item.path} color="textPrimary">
              {item.title}
            </Typography>
          ) : (
            <Link
              key={item.path}
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={item.path}
            >
              {item.title}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
};

export default Breadcrumbs;
