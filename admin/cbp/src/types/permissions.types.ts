/**
 * Unique identifier for each resource that needs permission control
 * Format: <context>:<resource-path>
 * Examples:
 * - navigation:billPay
 * - route:billPay.dashboard
 * - landing:billPay.welcome
 */
export type ResourceId = `navigation:${string}` | `route:${string}` | `landing:${string}`;

/**
 * Permission requirement defining what is needed to access a resource
 */
export type Environment = 'production' | 'test' | 'development';

export interface PermissionRequirement {
  resourceId: ResourceId;
  description?: string;  // Optional description of what this permission guards
  clientId?: string;
  roles?: string[];  // Required roles
  permissions?: string[];  // Required permissions
  adminPermissions?: string[];  // Admin roles where having any one grants access
  allowedEnvironments?: Environment[];  // Optional list of allowed environments
  requireAll?: boolean;  // If true, all permissions are required. If false, any permission is sufficient.
  customCheck?: () => Promise<boolean>;
}

/**
 * Registry mapping resources to their permission requirements
 */
export interface PermissionRegistry {
  [key: ResourceId]: PermissionRequirement;
}

/**
 * Result of a permission check, including reason for denial if applicable
 */
export interface PermissionResult {
  hasAccess: boolean;
  deniedReason?: string;
  deniedPermissions?: string[];  // List of specific permissions that were missing
}

/**
 * Context for permission checking, derived from AuthContext
 */
export interface PermissionContext {
  clientId?: string;
  userId?: string;
  roles: string[];
  isAuthenticated: boolean;
}

/**
 * Cache configuration for permission results
 */
export interface PermissionCacheConfig {
  enabled: boolean;
  ttlMs: number;
}

/**
 * Permission check options
 */
export interface PermissionCheckOptions {
  bypass?: boolean;
  cache?: PermissionCacheConfig;
  throwOnDenied?: boolean;
}
