import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

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
  const { isAuthenticated, user, loading, permissions } = useAuth();
  const location = useLocation();
  console.log('=== ProtectedRoute Debug ===');
  console.log('Path:', location.pathname);
  console.log('Auth State:', { isAuthenticated, loading, hasUser: !!user });
  console.log('User:', user);
  console.log('Permissions:', permissions);
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
  // Check roles if required
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));
    console.log('ProtectedRoute - Checking roles:', { requiredRoles, userRoles: user.roles, hasRequiredRole });
    if (!hasRequiredRole) {
      console.log('ProtectedRoute - Missing required role, redirecting to unauthorized');
      return <Navigate to="/unauthorized" replace />;
    }
  }
  // Check permissions if required
  if (requiredPermissions.length > 0) {
    const hasRequiredPermissions = requiredPermissions.every(permission =>
      permissions.includes(permission)
    );
    console.log('ProtectedRoute - Checking permissions:', { requiredPermissions, userPermissions: permissions, hasRequiredPermissions });
    if (!hasRequiredPermissions) {
      console.log('ProtectedRoute - Missing required permissions, redirecting to unauthorized');
      return <Navigate to="/unauthorized" replace />;
    }
  }
  console.log('ProtectedRoute - Access granted');
  return <>{children}</>;
};
export default ProtectedRoute;