import { useCallback, useContext, useMemo, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { permissionRegistry, getResourceId, hasResource } from '../config/permissions';
import type { 
  ResourceId, 
  PermissionResult, 
  PermissionContext,
  PermissionCheckOptions
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
      const result = { hasAccess: true };
      if (cache.enabled) {
        cacheRef.current.set(resourceId, { result, timestamp: Date.now() });
      }
      return result;
    }

    // Get permission requirement
    if (!hasResource(resourceId)) {
      const result = { 
        hasAccess: false, 
        deniedReason: `No permission requirement found for resource: ${resourceId}` 
      };
      if (throwOnDenied) throw new Error(result.deniedReason);
      return result;
    }

    const requirement = permissionRegistry[resourceId];
    const deniedPermissions: string[] = [];

    // Check authentication
    if (!permissionContext.isAuthenticated) {
      const result = { 
        hasAccess: false, 
        deniedReason: 'User not authenticated' 
      };
      if (throwOnDenied) throw new Error(result.deniedReason);
      return result;
    }

    // Check client ID if required
    if (requirement.clientId) {
      const clientId = requirement.clientId;
      const hasClientAccess = userPermissions?.groups.some(g => g.clientId.toString() === clientId);
      if (!hasClientAccess) {
        const result = { 
          hasAccess: false, 
          deniedReason: 'Client access denied',
          deniedPermissions 
        };
        if (throwOnDenied) throw new Error(result.deniedReason);
        return result;
      }
    }

    // Check required permissions
    if (requirement.requiredPermissions?.length) {
      for (const permission of requirement.requiredPermissions) {
        if (!permissionContext.roles.includes(permission)) {
          deniedPermissions.push(permission);
        }
      }
      
      if (deniedPermissions.length > 0) {
        const result = { 
          hasAccess: false, 
          deniedReason: 'Missing required permissions',
          deniedPermissions 
        };
        if (throwOnDenied) throw new Error(result.deniedReason);
        return result;
      }
    }

    // Check custom validation if provided
    if (requirement.customCheck) {
      try {
        const customResult = await requirement.customCheck();
        if (!customResult) {
          const result = { 
            hasAccess: false, 
            deniedReason: 'Custom validation failed' 
          };
          if (throwOnDenied) throw new Error(result.deniedReason);
          return result;
        }
      } catch (error) {
        console.error('Error in custom permission check:', error);
        const result = { 
          hasAccess: false, 
          deniedReason: 'Custom validation error' 
        };
        if (throwOnDenied) throw new Error(result.deniedReason);
        return result;
      }
    }

    // All checks passed
    const result = { hasAccess: true };
    if (cache.enabled) {
      cacheRef.current.set(resourceId, { result, timestamp: Date.now() });
    }
    return result;
  }, [permissionContext, cleanCache]);

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
