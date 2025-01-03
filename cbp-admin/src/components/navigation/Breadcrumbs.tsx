import React, { useEffect, useState } from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigation } from '../../context/NavigationContext';
import { getAllRoutes } from '../../routes';
import { RouteConfig } from '../../types/route.types';
import { clientService } from '../../services/clients.service';
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
  'dev': 'Development'
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
    const knownSegments = ['admin', 'client-management', 'users', 'groups', 'contact', 'security', 'audit-log'];
    if (knownSegments.includes(segment)) {
      return false;
    }

    // Check if this segment is in the position where we expect a client ID
    const segments = path.split('/');
    const clientManagementIndex = segments.indexOf('client-management');
    if (clientManagementIndex !== -1 && segments[clientManagementIndex + 1] === segment) {
      return true;
    }

    // For user IDs in the users section
    if (path.includes('/users/')) {
      const userIdIndex = segments.indexOf('users') + 1;
      if (segments[userIdIndex] === segment) {
        return true;
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
      return segment;
    }

    const cache = isUser ? cachedNames.users : cachedNames.clients;
    
    // If we haven't started loading this name yet
    if (!(segment in cache)) {
      return 'Loading...';
    }
    
    // If we have a cached name (even if null from error)
    return cache[segment] || (isUser ? 'User' : 'Client');
  };

  // Function to get client name
  const getClientName = async (encodedId: string) => {
    if (!shouldBeEncodedId(encodedId)) {
      console.warn('Not a client ID segment:', encodedId);
      return;
    }

    try {
      const decodedId = decodeId(encodedId);
      const client = await clientService.getClient(decodedId);
      setCachedNames(prev => ({
        ...prev,
        clients: {
          ...prev.clients,
          [encodedId]: client.name
        }
      }));
    } catch (err) {
      console.error('Error fetching client name:', err);
      setCachedNames(prev => ({
        ...prev,
        clients: {
          ...prev.clients,
          [encodedId]: 'Client'  // Fallback to generic name on error
        }
      }));
    }
  };

  // Function to get user name
  const getUserName = async (clientId: string, userId: string) => {
    if (!shouldBeEncodedId(clientId)) {
      console.warn('Not a client ID segment:', clientId);
      return;
    }

    if (!shouldBeEncodedId(userId)) {
      console.warn('Not a user ID segment:', userId);
      return;
    }

    try {
      const decodedClientId = decodeId(clientId);
      const decodedUserId = decodeId(userId);
      const user = await clientService.getUser(decodedClientId, decodedUserId);
      setCachedNames(prev => ({
        ...prev,
        users: {
          ...prev.users,
          [userId]: `${user.firstName} ${user.lastName}`
        }
      }));
    } catch (err) {
      console.error('Error fetching user name:', err);
      setCachedNames(prev => ({
        ...prev,
        users: {
          ...prev.users,
          [userId]: 'User'  // Fallback to generic name on error
        }
      }));
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
            await getClientName(clientId);
          }
        }
      }

      // Then look for user ID if we're in the users section
      if (clientId && segments.includes('users')) {
        const usersIndex = segments.indexOf('users');
        if (usersIndex !== -1 && segments[usersIndex + 1]) {
          const potentialUserId = segments[usersIndex + 1];
          if (shouldBeEncodedId(potentialUserId) && !(potentialUserId in cachedNames.users)) {
            await getUserName(clientId, potentialUserId);
          }
        }
      }
    };
    
    loadNames();
  }, [state.breadcrumbs]);

  // Build breadcrumb items with proper paths and titles
  const filteredSegments = state.breadcrumbs
    .filter((segment, index) => !(segment === 'admin' && index === 0));
  
  const breadcrumbItems = filteredSegments.map((segment, index) => {
    const pathSegments = ['admin', ...filteredSegments.slice(0, index + 1)];
    const fullPath = '/' + pathSegments.join('/');
    const route = getAllRoutes().find(r => r.path === fullPath);
    
    let title;
    if (index === 0 && segment === 'admin') {
      title = 'Home';
    } else if (shouldBeEncodedId(segment)) {
      const isUserSection = filteredSegments.includes('users');
      const isSecondEncodedId = filteredSegments.findIndex(s => shouldBeEncodedId(s)) !== index;
      title = getDisplayName(segment, isUserSection && isSecondEncodedId);
    } else {
      title = route?.title || urlSegmentTitles[segment] || 
              segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const isLast = index === filteredSegments.length - 1;

    return isLast ? (
      <Typography key={fullPath} color="text.primary">
        {title}
      </Typography>
    ) : (
      <Link
        key={fullPath}
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
    <MUIBreadcrumbs aria-label="breadcrumb">
      {breadcrumbItems}
    </MUIBreadcrumbs>
  );
}
