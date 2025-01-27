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


/**
 * Interface for permission management
 * Handles permission groups, access control, and role management
 */
  /**
   * Get all available permissions
   * @param category Optional category filter
   */

  /**
   * Get all permission groups with optional filtering
   * @param filters Optional filters for permission groups
   */

  /**
   * Get a permission group by ID
   * @param groupId Permission group ID
   */

  /**
   * Create a new permission group
   * @param group Permission group data
   */

  /**
   * Update an existing permission group
   * @param groupId Permission group ID
   * @param group Updated permission group data
   */

  /**
   * Delete a permission group
   * @param groupId Permission group ID
   */

  /**
   * Validate permission group data
   * @param group Permission group data to validate
   */

  /**
   * Check if a user has specific permissions
   * @param userId User ID
   * @param category Permission category
   * @param actions Required actions
   */
  ): Promise<boolean>;

  /**
   * Get all permissions for a user
   * @param userId User ID
   */

  /**
   * Assign permission groups to a user
   * @param userId User ID
   * @param groupIds Permission group IDs
   */

  /**
   * Remove permission groups from a user
   * @param userId User ID
   * @param groupIds Permission group IDs
   */

  /**
   * Get all users in a permission group
   * @param groupId Permission group ID
   */

  /**
   * Clone a permission group
   * @param sourceGroupId Source permission group ID
   * @param newGroupName Name for the cloned group
   */

  /**
   * Get permission group audit log
   * @param groupId Permission group ID
   */
