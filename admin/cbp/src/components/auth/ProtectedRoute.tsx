import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Role } from '../../types/client.types';

const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requiredPermissions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
}) => {
  const { isAuthenticated, user, loading, userPermissions } = useAuth();
  const location = useLocation();

  console.log('=== ProtectedRoute Debug ===');
  console.log('Path:', location.pathname);
  console.log('Auth State:', { isAuthenticated, loading, hasUser: !!user });
  console.log('User:', user);
  console.log('User Permissions:', userPermissions);
  console.log('Required Roles:', requiredRoles);
  console.log('Required Permissions:', requiredPermissions);

  if (loading) {
    console.log('ProtectedRoute - Loading auth state');
    return (
      <LoaderContainer>
        <CircularProgress />
      </LoaderContainer>
    );
  }

  if (!isAuthenticated || !user) {
    console.log('ProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check permissions if required
  if (requiredPermissions.length > 0 && userPermissions) {
    const hasRequiredPermissions = requiredPermissions.every(requiredPermission =>
      userPermissions.roles.some((role: Role) => 
        role.name === requiredPermission
      )
    );
    console.log('ProtectedRoute - Checking permissions:', { requiredPermissions, userPermissions, hasRequiredPermissions });
    if (!hasRequiredPermissions) {
      console.log('ProtectedRoute - Missing required permissions, redirecting to unauthorized');
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check roles if required (using roles from userPermissions)
  if (requiredRoles.length > 0 && userPermissions) {
    const hasRequiredRole = requiredRoles.some(requiredRole =>
      userPermissions.roles.some((role: Role) => role.name === requiredRole)
    );
    console.log('ProtectedRoute - Checking roles:', { requiredRoles, userRoles: userPermissions.roles, hasRequiredRole });
    if (!hasRequiredRole) {
      console.log('ProtectedRoute - Missing required role, redirecting to unauthorized');
      return <Navigate to="/unauthorized" replace />;
    }
  }

  console.log('ProtectedRoute - Access granted');
  return <>{children}</>;
};

export default ProtectedRoute;