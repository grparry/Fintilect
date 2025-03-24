import { IBaseService } from './IBaseService';
import {
  Role,
  Group,
  GroupRole,
  UserGroup,
  GroupListResponse,
  RoleListResponse,
  UserGroupListResponse,
  GroupRoleListResponse,
} from '../../types/client.types';

/**
 * Interface for permission service
 * Handles groups, roles, and their relationships
 */
export interface IPermissionService extends IBaseService {
  /**
   * Get all roles
   */
  getRoles(): Promise<RoleListResponse>;

  /**
   * Get role by ID
   * @param roleId Role identifier
   */
  getRole(roleId: number): Promise<Role>;

  /**
   * Create role
   * @param role Role to create
   */
  createRole(role: Omit<Role, 'id'>): Promise<Role>;

  /**
   * Update role
   * @param roleId Role identifier
   * @param role Updated role data
   */
  updateRole(roleId: number, role: Partial<Role>): Promise<Role>;

  /**
   * Delete role
   * @param roleId Role identifier
   */
  deleteRole(roleId: number): Promise<void>;

  /**
   * Get groups with pagination and filtering
   * @param params Filter and pagination parameters
   */
  getGroups(params?: {
    clientId?: number;
    searchTerm?: string;
    page?: number;
    limit?: number;
  }): Promise<GroupListResponse>;

  /**
   * Get group by ID
   * @param groupId Group identifier
   */
  getGroup(groupId: number): Promise<Group>;

  /**
   * Create group
   * @param group Group to create
   */
  createGroup(group: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>): Promise<Group>;

  /**
   * Update group
   * @param groupId Group identifier
   * @param group Updated group data
   */
  updateGroup(groupId: number, group: Partial<Group>): Promise<Group>;

  /**
   * Delete group
   * @param groupId Group identifier
   */
  deleteGroup(groupId: number): Promise<void>;

  /**
   * Get users in a group
   * @param groupId Group identifier
   */
  getGroupUsers(groupId: number): Promise<UserGroupListResponse>;

  /**
   * Get roles assigned to a group
   * @param groupId Group identifier
   */
  getGroupRoles(groupId: number): Promise<GroupRoleListResponse>;

  /**
   * Add roles to a group
   * @param groupId Group identifier
   * @param roleIds Role IDs to add
   */
  addGroupRoles(groupId: number, roleIds: number[]): Promise<void>;

  /**
   * Remove roles from a group
   * @param groupId Group identifier
   * @param roleIds Role IDs to remove
   */
  removeGroupRoles(groupId: number, roleIds: number[]): Promise<void>;

  /**
   * Assign user to groups
   * @param userId User identifier
   * @param groupIds Group IDs to assign
   */
  assignUserGroups(userId: number, groupIds: number[]): Promise<void>;

  /**
   * Remove user from groups
   * @param userId User identifier
   * @param groupIds Group IDs to remove
   */
  removeUserGroups(userId: number, groupIds: number[]): Promise<void>;

  /**
   * Get groups assigned to a user
   * @param userId User identifier
   */
  getUserGroups(userId: number): Promise<UserGroupListResponse>;
}