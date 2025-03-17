import { useCallback, useContext, useMemo, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { permissionRegistry, getResourceId, hasResource } from '../config/permissions';
import { getEnvironment } from '../config/host.config';
import type { 
  ResourceId, 
  PermissionResult, 
  PermissionContext,
  PermissionCheckOptions,
  PermissionRequirement
} from '../types/permissions.types';

interface CacheEntry {
  result: PermissionResult;
  timestamp: number;
}

const DEFAULT_CACHE_TTL = 5000; // 5 seconds

export const usePermissions = () => {
  const { user, userPermissions } = useContext(AuthContext);
  const cacheRef = useRef<Map<ResourceId, CacheEntry>>(new Map());
  
  // Create permission context from auth state
  const permissionContext = useMemo<PermissionContext>(() => ({
    clientId: user?.clientId?.toString(),
    userId: user?.id?.toString(),
    roles: userPermissions?.roles?.map(r => r.name) ?? [],
    isAuthenticated: !!user
  }), [user, userPermissions]);

  // Clear expired cache entries
  const cleanCache = useCallback((ttl: number) => {
    const now = Date.now();
    Array.from(cacheRef.current.entries()).forEach(([key, entry]) => {
      if (now - entry.timestamp > ttl) {
        cacheRef.current.delete(key);
      }
    });
  }, []);

  // Check if user has required permissions
  const checkPermission = useCallback(async (
    resourceId: ResourceId,
    options: PermissionCheckOptions = {}
  ): Promise<PermissionResult> => {
    const {
      cache = { enabled: true, ttlMs: DEFAULT_CACHE_TTL },
      bypass = false,
      throwOnDenied = false
    } = options;

    // Check cache if enabled
    if (cache.enabled) {
      cleanCache(cache.ttlMs);
      const cached = cacheRef.current.get(resourceId);
      if (cached) {
        return cached.result;
      }
    }

    // Development bypass
    if (bypass && process.env.NODE_ENV === 'development') {
      const result: PermissionResult = { hasAccess: true };
      if (cache.enabled) {
        cacheRef.current.set(resourceId, { result, timestamp: Date.now() });
      }
      return result;
    }

    // Get permission requirement
    if (!hasResource(resourceId)) {
      const result: PermissionResult = { 
        hasAccess: false, 
        deniedReason: `No permission requirement found for resource: ${resourceId}` 
      };
      if (throwOnDenied) throw new Error(result.deniedReason);
      return result;
    }

    const requirement: PermissionRequirement = permissionRegistry[resourceId];

    // Check authentication
    if (!permissionContext.isAuthenticated) {
      const result: PermissionResult = { 
        hasAccess: false, 
        deniedReason: 'User not authenticated' 
      };
      if (throwOnDenied) throw new Error(result.deniedReason);
      return result;
    }

    // Check environment restrictions
    if (requirement.allowedEnvironments && requirement.allowedEnvironments.length > 0) {
      const currentEnvironment = getEnvironment();
      if (!requirement.allowedEnvironments.includes(currentEnvironment)) {
        const result: PermissionResult = {
          hasAccess: false,
          deniedReason: `Resource not available in ${currentEnvironment} environment`
        };
        if (throwOnDenied) throw new Error(result.deniedReason);
        return result;
      }
    }

    // Check client access
    if (requirement.clientId && user?.clientId) {
      const clientId = requirement.clientId;
      const hasClientAccess = user.clientId.toString() === clientId;
      if (!hasClientAccess) {
        const result: PermissionResult = { 
          hasAccess: false, 
          deniedReason: 'Client access denied',
          deniedPermissions: [] as string[]
        };
        if (throwOnDenied) throw new Error(result.deniedReason);
        return result;
      }
    }

    // Check admin permissions - any matching admin role grants access
    if (requirement.adminPermissions && requirement.adminPermissions.length > 0) {
      const userRoles = permissionContext.roles;
      const hasAdminRole = requirement.adminPermissions.some(role => userRoles.includes(role));
      
      if (hasAdminRole) {
        const result: PermissionResult = { hasAccess: true };
        if (cache.enabled) {
          cacheRef.current.set(resourceId, { result, timestamp: Date.now() });
        }
        return result;
      }
    }

    // Check roles
    if (requirement.roles && requirement.roles.length > 0) {
      const userRoles = permissionContext.roles;
      const missingRoles = requirement.roles.filter((role: string) => !userRoles.includes(role));
      
      if (missingRoles.length > 0) {
        const result: PermissionResult = { 
          hasAccess: false, 
          deniedReason: 'Missing required roles',
          deniedPermissions: missingRoles 
        };
        if (throwOnDenied) throw new Error(result.deniedReason);
        return result;
      }
    }

    // Check permissions
    if (requirement.permissions && requirement.permissions.length > 0) {
      const userRoles = permissionContext.roles.map(role => `role:${role}`);
      const missingPermissions = requirement.permissions.filter(
        (permission: string) => !userRoles.includes(permission.toLowerCase())
      );

      if (requirement.requireAll && missingPermissions.length > 0) {
        const result: PermissionResult = { 
          hasAccess: false, 
          deniedReason: 'Missing required permissions',
          deniedPermissions: missingPermissions 
        };
        if (throwOnDenied) throw new Error(result.deniedReason);
        return result;
      }

      if (!requirement.requireAll && missingPermissions.length === requirement.permissions.length) {
        const result: PermissionResult = { 
          hasAccess: false, 
          deniedReason: 'Missing required permissions',
          deniedPermissions: missingPermissions 
        };
        if (throwOnDenied) throw new Error(result.deniedReason);
        return result;
      }
    }

    // All checks passed
    const result: PermissionResult = { hasAccess: true };
    if (cache.enabled) {
      cacheRef.current.set(resourceId, { result, timestamp: Date.now() });
    }
    return result;
  }, [permissionContext, cleanCache, user]);

  // Helper to check multiple permissions at once
  const checkPermissions = useCallback(async (
    resourceIds: ResourceId[],
    options?: PermissionCheckOptions
  ): Promise<Record<ResourceId, PermissionResult>> => {
    const results: Record<ResourceId, PermissionResult> = {};
    await Promise.all(
      resourceIds.map(async (id) => {
        results[id] = await checkPermission(id, options);
      })
    );
    return results;
  }, [checkPermission]);

  return {
    checkPermission,
    checkPermissions,
    permissionContext,
    getResourceId
  };
};
