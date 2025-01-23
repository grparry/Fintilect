import React, { useEffect, useState } from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { getAllRoutes } from '../../routes';
import { RouteConfig } from '../../types/route.types';
import { clientService } from '../../services/factory/ServiceFactory';
import { decodeId, isValidEncodedId } from '../../utils/idEncoder';

// Map of URL segments to user-friendly titles
const urlSegmentTitles: Record<string, string> = {
  'admin': 'Home',
  'client-management': 'Client Management',
  'list': 'List',
  'users': 'Users',
  'groups': 'Groups',
  'settings': 'Settings',
  'contact': 'Contact',
  'security': 'Security',
  'audit': 'Audit',
  'bill-pay': 'Bill Pay',
  'emerge': 'Emerge Admin',
  'dev': 'Development',
  [Symbol.iterator]: function* () {
    for (const key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        yield [key, this[key]];
      }
    }
  }
};

interface CachedNames {
  clients: Record<string, string | null>;
  users: Record<string, string | null>;
}

export default function Breadcrumbs() {
  const { state } = useNavigation();
  const [cachedNames, setCachedNames] = useState<CachedNames>({
    clients: {},
    users: {}
  });

  // Function to check if a segment should be treated as an encoded ID
  const shouldBeEncodedId = (segment: string): boolean => {
    const path = state.breadcrumbs.join('/');
    
    // Skip validation for non-client-management paths
    if (!path.includes('client-management')) {
      return false;
    }

    // Skip validation for known route segments
    const knownSegments = ['admin', 'client-management', 'list', 'users', 'groups', 'contact', 'security', 'audit-log'];
    if (knownSegments.includes(segment)) {
      return false;
    }

    // Check if this segment is in the position where we expect a client ID
    const segments = path.split('/');
    const clientManagementIndex = segments.indexOf('client-management');
    
    // If we're on the list page, don't treat any segments as IDs
    if (segments.includes('list')) {
      return false;
    }

    if (clientManagementIndex !== -1 && segments[clientManagementIndex + 1] === segment) {
      return isValidEncodedId(segment);
    }

    // For user IDs in the users section
    if (path.includes('/users/')) {
      const userIdIndex = segments.indexOf('users') + 1;
      if (segments[userIdIndex] === segment) {
        return isValidEncodedId(segment);
      }
    }

    return false;
  };

  // Function to check if a segment is an encoded ID
  const isEncodedId = (segment: string): boolean => {
    return shouldBeEncodedId(segment);
  };

  // Function to get display name for a segment
  const getDisplayName = (segment: string, isUser: boolean = false): string => {
    if (!shouldBeEncodedId(segment)) {
      return urlSegmentTitles[segment] || segment;
    }

    // Verify it's a valid encoded ID before trying to fetch the name
    if (!isValidEncodedId(segment)) {
      return isUser ? 'User' : 'Client';
    }

    const cache = isUser ? cachedNames.users : cachedNames.clients;
    
    // If we haven't started loading this name yet
    if (!(segment in cache)) {
      return 'Loading...';
    }
    
    // If we have a cached name (even if null from error)
    return cache[segment] || (isUser ? 'User' : 'Client');
  };

  const fetchClientName = async (encodedId: string) => {
    try {
      // First check if this is a valid encoded ID
      if (!isValidEncodedId(encodedId)) {
        console.warn('Invalid encoded ID format:', encodedId);
        return null;
      }

      const clientId = decodeId(encodedId);
      if (!clientId) {
        console.warn('Failed to decode client ID:', encodedId);
        return null;
      }

      const client = await clientService.getClient(clientId);
      if (client) {
        const name = client.name || client.id;
        setCachedNames(prev => ({
          ...prev,
          clients: { ...prev.clients, [encodedId]: name }
        }));
        return name;
      }
      
      console.warn('Client not found:', clientId);
      return null;
    } catch (error) {
      console.error('Error fetching client name:', error);
      setCachedNames(prev => ({
        ...prev,
        clients: { ...prev.clients, [encodedId]: null }
      }));
      return null;
    }
  };

  const fetchUserName = async (encodedId: string, clientId: string) => {
    try {
      // First check if this is a valid encoded ID
      if (!isValidEncodedId(encodedId)) {
        console.warn('Invalid encoded user ID format:', encodedId);
        return null;
      }

      const userId = decodeId(encodedId);
      if (!userId) {
        console.warn('Failed to decode user ID:', encodedId);
        return null;
      }

      const response = await clientService.getClientUsers(clientId, { 
        searchTerm: userId,
        limit: 1
      });
      
      if (response.items.length > 0) {
        const user = response.items[0];
        const name = `${user.firstName} ${user.lastName}`;
        setCachedNames(prev => ({
          ...prev,
          users: { ...prev.users, [encodedId]: name }
        }));
        return name;
      }
      
      console.warn('User not found:', userId);
      return null;
    } catch (error) {
      console.error('Error fetching user name:', error);
      setCachedNames(prev => ({
        ...prev,
        users: { ...prev.users, [encodedId]: null }
      }));
      return null;
    }
  };

  // Load names for any encoded IDs in the breadcrumbs
  useEffect(() => {
    const loadNames = async () => {
      const segments = state.breadcrumbs;
      let clientId: string | null = null;
      
      // Find the client ID first
      const clientManagementIndex = segments.indexOf('client-management');
      if (clientManagementIndex !== -1 && segments[clientManagementIndex + 1]) {
        const potentialClientId = segments[clientManagementIndex + 1];
        if (shouldBeEncodedId(potentialClientId)) {
          clientId = potentialClientId;
          if (!(clientId in cachedNames.clients)) {
            // Set a loading state
            setCachedNames(prev => ({
              ...prev,
              clients: { ...prev.clients, [clientId!]: 'Loading...' }
            }));
            await fetchClientName(clientId);
          }
        }
      }

      // Then look for user ID if we're in the users section
      if (clientId && segments.includes('users')) {
        const usersIndex = segments.indexOf('users');
        if (usersIndex !== -1 && segments[usersIndex + 1]) {
          const potentialUserId = segments[usersIndex + 1];
          if (shouldBeEncodedId(potentialUserId) && !(potentialUserId in cachedNames.users)) {
            // Set a loading state
            setCachedNames(prev => ({
              ...prev,
              users: { ...prev.users, [potentialUserId]: 'Loading...' }
            }));
            await fetchUserName(potentialUserId, clientId);
          }
        }
      }
    };
    
    loadNames();
  }, [state.breadcrumbs, cachedNames]);

  // Build breadcrumb items with proper paths and titles
  const filteredSegments = state.breadcrumbs
    .filter((segment, index) => !(segment === 'admin' && index === 0));
  
  const breadcrumbItems = filteredSegments.map((segment, index) => {
    const pathSegments = ['admin', ...filteredSegments.slice(0, index + 1)];
    const fullPath = '/' + pathSegments.join('/');
    const routes = getAllRoutes();
    const route = routes.find(r => r.path === fullPath);
    
    let title;
    if (index === 0 && segment === 'admin') {
      title = 'Home';
    } else if (isEncodedId(segment)) {
      title = getDisplayName(segment, fullPath.includes('/users/'));
    } else {
      title = urlSegmentTitles[segment] || segment;
    }

    const isLast = index === filteredSegments.length - 1;

    return isLast ? (
      <Typography key={segment} color="text.primary">
        {title}
      </Typography>
    ) : (
      <Link
        key={segment}
        component={RouterLink}
        to={fullPath}
        color="inherit"
        underline="hover"
      >
        {title}
      </Link>
    );
  });

  return (
    <Box sx={{ p: 2 }}>
      <MUIBreadcrumbs separator="›">
        {breadcrumbItems}
      </MUIBreadcrumbs>
    </Box>
  );
}
