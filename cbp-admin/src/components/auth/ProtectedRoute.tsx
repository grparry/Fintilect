import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';
import { ProtectedRouteProps } from '../../types/auth.types';
import { UserRole } from '../../types/index';

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles = [],
  redirectPath = '/login',
}) => {
  const { state } = useAuth();
  const location = useLocation();

  if (state.loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!state.isAuthenticated || !state.user) {
    console.log('ProtectedRoute: User not authenticated, redirecting to:', redirectPath);
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.includes(state.user.role);
    console.log('ProtectedRoute: Checking roles:', { required: requiredRoles, userRole: state.user.role, hasAccess: hasRequiredRole });
    
    if (!hasRequiredRole) {
      console.log('ProtectedRoute: User lacks required role, redirecting to unauthorized');
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
