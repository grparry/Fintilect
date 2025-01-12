import { IBaseService } from './IBaseService';
import {
  Permission,
  PermissionGroup,
  PermissionGroupInput,
  PermissionGroupFilters,
  PermissionGroupValidation,
  PermissionCategoryType,
  PermissionAction
} from '../../types/permission.types';
import { PaginatedResponse } from '../../types/common.types';

/**
 * Interface for permission management
 * Handles permission groups, access control, and role management
 */
export interface IPermissionService extends IBaseService {
  /**
   * Get all available permissions
   * @param category Optional category filter
   */
  getPermissions(category?: PermissionCategoryType): Promise<Permission[]>;

  /**
   * Get all permission groups with optional filtering
   * @param filters Optional filters for permission groups
   */
  getPermissionGroups(filters?: PermissionGroupFilters): Promise<PaginatedResponse<PermissionGroup>>;

  /**
   * Get a permission group by ID
   * @param groupId Permission group ID
   */
  getPermissionGroup(groupId: number): Promise<PermissionGroup>;

  /**
   * Create a new permission group
   * @param group Permission group data
   */
  createPermissionGroup(group: PermissionGroupInput): Promise<PermissionGroup>;

  /**
   * Update an existing permission group
   * @param groupId Permission group ID
   * @param group Updated permission group data
   */
  updatePermissionGroup(groupId: number, group: Partial<PermissionGroupInput>): Promise<PermissionGroup>;

  /**
   * Delete a permission group
   * @param groupId Permission group ID
   */
  deletePermissionGroup(groupId: number): Promise<void>;

  /**
   * Validate permission group data
   * @param group Permission group data to validate
   */
  validatePermissionGroup(group: PermissionGroupInput): Promise<PermissionGroupValidation>;

  /**
   * Check if a user has specific permissions
   * @param userId User ID
   * @param category Permission category
   * @param actions Required actions
   */
  checkUserPermissions(
    userId: string,
    category: PermissionCategoryType,
    actions: PermissionAction[]
  ): Promise<boolean>;

  /**
   * Get all permissions for a user
   * @param userId User ID
   */
  getUserPermissions(userId: string): Promise<Record<PermissionCategoryType, PermissionAction[]>>;

  /**
   * Assign permission groups to a user
   * @param userId User ID
   * @param groupIds Permission group IDs
   */
  assignUserPermissionGroups(userId: string, groupIds: number[]): Promise<void>;

  /**
   * Remove permission groups from a user
   * @param userId User ID
   * @param groupIds Permission group IDs
   */
  removeUserPermissionGroups(userId: string, groupIds: number[]): Promise<void>;

  /**
   * Get all users in a permission group
   * @param groupId Permission group ID
   */
  getPermissionGroupUsers(groupId: number): Promise<string[]>;

  /**
   * Clone a permission group
   * @param sourceGroupId Source permission group ID
   * @param newGroupName Name for the cloned group
   */
  clonePermissionGroup(sourceGroupId: number, newGroupName: string): Promise<PermissionGroup>;

  /**
   * Get permission group audit log
   * @param groupId Permission group ID
   */
  getPermissionGroupAuditLog(groupId: number): Promise<Array<{
    timestamp: string;
    action: string;
    userId: string;
    changes: Record<string, any>;
  }>>;
}
