import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHost } from '../../context/HostContext';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const LoadingFallback = () => (
  <LoaderContainer>
    <CircularProgress />
  </LoaderContainer>
);

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermissions = [],
}) => {
  const { isAuthenticated, loading, userPermissions } = useAuth();
  const { isAdmin } = useHost();
  const location = useLocation();

  console.log('=== ProtectedRoute Debug ===');
  console.log('Current Path:', location.pathname);
  console.log('Auth State:', { 
    isAuthenticated, 
    loading,
    hasPermissions: !!userPermissions,
    permissionCount: userPermissions?.roles?.length || 0,
    userPermissions: userPermissions || 'null',
    isAdmin
  });
  
  if (requiredPermissions?.length > 0) {
    console.log('Required vs Available Permissions:', {
      required: requiredPermissions,
      available: userPermissions?.roles?.map(r => r.name) || [],
      hasUserPermissions: !!userPermissions,
      hasRoles: !!userPermissions?.roles
    });
  }

  if (loading) {
    console.log('ProtectedRoute - Loading auth state');
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect if trying to access admin features without admin hostname
  if (location.pathname.startsWith('/admin') && !isAdmin) {
    console.log('ProtectedRoute - Non-admin hostname trying to access admin route');
    return <Navigate to="/unauthorized" replace />;
  }

  // Check if required permissions are met
  if (requiredPermissions?.length > 0) {
    console.log('ProtectedRoute - Starting permission check');

    if (!userPermissions?.roles) {
      console.log('ProtectedRoute - No user permissions or roles found');
      return <Navigate to="/unauthorized" replace />;
    }

    const permissionChecks = requiredPermissions.map(permission => {
      const normalizedPermission = permission.toLowerCase();
      console.log(`Checking permission "${permission}":`, {
        normalized: normalizedPermission,
        alternateFormat: normalizedPermission.replace(':', '_'),
        availableRoles: userPermissions.roles.map(r => r.name)
      });
      
      const matchingRoles = userPermissions.roles
        .filter(role => {
          const normalizedRole = role.name.toLowerCase();
          const isMatch = normalizedRole === normalizedPermission ||
                 normalizedRole === normalizedPermission.replace(':', '_');
          if (isMatch) {
            console.log(`Found matching role: ${role.name}`);
          }
          return isMatch;
        });

      const hasPermission = matchingRoles.length > 0;
      console.log(`Permission "${permission}" check result:`, {
        hasPermission,
        matchingRoles: matchingRoles.map(r => r.name)
      });
      
      return hasPermission;
    });

    const hasAllPermissions = permissionChecks.every(Boolean);
    console.log('ProtectedRoute - Permission check complete:', {
      hasAllRequiredPermissions: hasAllPermissions,
      requiredPermissions,
      availableRoles: userPermissions.roles.map(r => r.name)
    });

    if (!hasAllPermissions) {
      console.log('ProtectedRoute - Missing required permissions, redirecting to unauthorized');
      return <Navigate to="/unauthorized" replace />;
    }
  } else {
    console.log('ProtectedRoute - No permissions required for this route');
  }

  console.log('ProtectedRoute - Access granted');
  return <>{children}</>;
};

export default ProtectedRoute;