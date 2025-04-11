import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHost } from '../../context/HostContext';
import { usePermissions } from '../../hooks/usePermissions';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ResourceId } from '../../types/permissions.types';
import logger from '../../utils/logger';

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
  resourceId?: ResourceId;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  resourceId,
}) => {
  const { isAuthenticated, loading } = useAuth();
  const { isAdmin } = useHost();
  const { checkPermission } = usePermissions();
  const location = useLocation();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      if (!resourceId) {
        setHasPermission(true);
        return;
      }

      try {
        const result = await checkPermission(resourceId);
        setHasPermission(result.hasAccess);
      } catch (error) {
        logger.error('Error checking permissions:', error);
        setHasPermission(false);
      }
    };

    checkAccess();
  }, [resourceId, checkPermission]);

  logger.log('=== ProtectedRoute Debug ===');
  logger.log('Current Path:', location.pathname);
  logger.log('Auth State:', { 
    isAuthenticated, 
    loading,
    resourceId,
    hasPermission,
    isAdmin
  });

  if (loading || hasPermission === null) {
    logger.log('ProtectedRoute - Loading auth state or checking permissions');
    return <LoadingFallback />;
  }

  if (!isAuthenticated) {
    logger.log('ProtectedRoute - Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if required permissions are met
  if (resourceId && !hasPermission) {
    logger.log('ProtectedRoute - Permission denied for resource:', resourceId);
    return <Navigate to="/unauthorized" replace />;
  }

  logger.log('ProtectedRoute - Access granted');
  return <>{children}</>;
};

export default ProtectedRoute;