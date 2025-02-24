import { useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavigationPermissionRequirement } from '../types/section-navigation.types';
import { Role } from '../types/client.types';

export const useNavigationPermissions = () => {
  const { user, userPermissions } = useContext(AuthContext);

  const checkPermission = async (requirement: NavigationPermissionRequirement): Promise<boolean> => {
    // If no user, only allow if no requirements
    if (!user || !userPermissions) {
      return !requirement.clientId && !requirement.requiredPermissions;
    }

    // Check client ID if required
    if (requirement.clientId) {
      const clientId = parseInt(requirement.clientId, 10);
      const hasClientAccess = userPermissions.groups.some(g => g.clientId === clientId);
      if (!hasClientAccess) return false;
    }

    // Check required permissions
    if (requirement.requiredPermissions?.length) {
      const hasRequiredPermissions = requirement.requiredPermissions.every(requiredPermission =>
        userPermissions.roles.some((role: Role) => role.name === requiredPermission)
      );
      if (!hasRequiredPermissions) return false;
    }

    // Check custom validation if provided
    if (requirement.customCheck) {
      try {
        const result = await requirement.customCheck();
        if (!result) return false;
      } catch (error) {
        console.error('Error in custom permission check:', error);
        return false;
      }
    }

    return true;
  };

  const hasPermission = useCallback(async (requirement: NavigationPermissionRequirement): Promise<boolean> => {
    // If no requirements, allow access
    if (!requirement) {
      return true;
    }

    // If no user, only allow if no requirements
    if (!user || !userPermissions) {
      return !requirement.clientId && !requirement.requiredPermissions;
    }

    return checkPermission(requirement);
  }, [user, userPermissions]);

  const checkPermissions = useCallback(async (requirements: NavigationPermissionRequirement[]): Promise<boolean> => {
    if (!requirements || requirements.length === 0) {
      return true;
    }

    for (const requirement of requirements) {
      const hasAccess = await hasPermission(requirement);
      if (!hasAccess) return false;
    }

    return true;
  }, [hasPermission]);

  return {
    hasPermission,
    checkPermissions,
  };
};
