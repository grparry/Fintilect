import { useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavigationPermissionRequirement } from '../types/section-navigation.types';

export const useNavigationPermissions = () => {
  const { user, permissions } = useContext(AuthContext);
  const hasPermission = useCallback(async (requirement: NavigationPermissionRequirement): Promise<boolean> => {
    // If no requirements, allow access
    if (!requirement) {
      return true;
    }
    // Check custom validation if provided
    if (requirement.customCheck) {
      try {
        return await requirement.customCheck();
      } catch (error) {
        console.error('Error in custom permission check:', error);
        return false;
      }
    }
    // Check client ID if specified
    if (requirement.clientId && user?.clientId !== requirement.clientId) {
      return false;
    }
    // Check roles if specified
    if (requirement.roles && requirement.roles.length > 0) {
      const hasRequiredRole = requirement.roles.some(role => 
        user?.roles?.includes(role)
      );
      if (!hasRequiredRole) {
        return false;
      }
    }
    // Check permissions if specified
    if (requirement.permissions && requirement.permissions.length > 0) {
      const hasRequiredPermissions = requirement.permissions.every(permission =>
        permissions?.includes(permission)
      );
      if (!hasRequiredPermissions) {
        return false;
      }
    }
    return true;
  }, [user, permissions]);
  const checkPermissions = useCallback(async (requirements: NavigationPermissionRequirement[]): Promise<boolean> => {
    if (!requirements || requirements.length === 0) {
      return true;
    }
    try {
      const results = await Promise.all(
        requirements.map(requirement => hasPermission(requirement))
      );
      return results.every(result => result === true);
    } catch (error) {
      console.error('Error checking permissions:', error);
      return false;
    }
  }, [hasPermission]);
  return {
    checkPermissions,
    hasPermission,
  };
};