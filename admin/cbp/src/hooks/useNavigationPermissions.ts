import { useCallback } from 'react';
import { usePermissions } from './usePermissions';
import { ResourceId } from '../types/permissions.types';

export const useNavigationPermissions = () => {
  const { checkPermission } = usePermissions();

  const hasPermission = useCallback(async (resourceId?: ResourceId): Promise<boolean> => {
    if (!resourceId) {
      return true;
    }

    const result = await checkPermission(resourceId);
    return result.hasAccess;
  }, [checkPermission]);

  return {
    hasPermission
  };
};
