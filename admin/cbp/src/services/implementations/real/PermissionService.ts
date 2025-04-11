import { IPermissionService } from '../../interfaces/IPermissionService';
import logger from '../../../utils/logger';
import {
  User,
  Role,
  Group,
  GroupRole,
  UserGroup,
  GroupListResponse,
  RoleListResponse,
  UserGroupListResponse,
  GroupRoleListResponse,
} from '../../../types/client.types';
import { BaseService } from './BaseService';

export class PermissionService extends BaseService implements IPermissionService {
  constructor(basePath: string = '/api') {
    super(basePath);
    logger.log('PermissionService initialized with base path:', basePath);
  }

  async getRoles(): Promise<RoleListResponse> {
    return this.get<RoleListResponse>('/Role');
  }

  async getRole(roleId: number): Promise<Role> {
    return this.get<Role>(`/Role/${roleId}`);
  }

  async createRole(role: Omit<Role, 'id'>): Promise<Role> {
    return this.post<Role>('/Role', role);
  }

  async updateRole(roleId: number, role: Partial<Role>): Promise<Role> {
    return this.put<Role>(`/Role/${roleId}`, role);
  }

  async deleteRole(roleId: number): Promise<void> {
    await this.delete(`/Role/${roleId}`);
  }

  async getGroups(params?: {
    clientId?: number;
    searchTerm?: string;
    page?: number;
    limit?: number;
  }): Promise<GroupListResponse> {
    try {
      logger.log('Calling getGroups with params:', params);
      const groups = await this.get<Group[]>('/Group', { params });
      logger.log('Groups response:', groups);
      return { groups };
    } catch (error) {
      logger.error('Error in getGroups:', error);
      throw error;
    }
  }

  async getGroup(groupId: number): Promise<Group> {
    return this.get<Group>(`/Group/${groupId}`);
  }

  async createGroup(group: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>): Promise<Group> {
    return this.post<Group>('/Group', group);
  }

  async updateGroup(groupId: number, group: Partial<Group>): Promise<Group> {
    return this.put<Group>('/Group', group);
  }

  async deleteGroup(groupId: number): Promise<void> {
    await this.delete(`/Group/${groupId}`);
  }

  async getGroupUsers(groupId: number): Promise<{ userGroups: UserGroup[] }> {
    const users = await this.get<User[]>(`/UserGroup/group/${groupId}/users`);
    return { userGroups: users.map(user => ({ userId: user.id, groupId })) };
  }

  async getGroupRoles(groupId: number): Promise<{ groupRoles: GroupRole[] }> {
    // According to the API spec, the response should be a GroupRoleListResponse object
    // with a groupRoles property that is an array of GroupRoleResponse objects
    const response = await this.get<GroupRoleListResponse>(`/GroupRole/${groupId}`);
    
    // Return the response directly as it should already be in the correct format
    return response;
  }

  async addGroupRoles(groupId: number, roleIds: number[]): Promise<void> {
    await Promise.all(roleIds.map(roleId => this.post('/GroupRole', { groupId, roleId })));
  }

  async removeGroupRoles(groupId: number, roleIds: number[]): Promise<void> {
    await Promise.all(roleIds.map(roleId => this.delete(`/GroupRole/${groupId}/${roleId}`)));
  }

  async assignUserGroups(userId: number, groupIds: number[]): Promise<void> {
    await Promise.all(groupIds.map(groupId => this.post('/UserGroup', { userId, groupId })));
  }

  async removeUserGroups(userId: number, groupIds: number[]): Promise<void> {
    await Promise.all(groupIds.map(groupId => this.delete(`/UserGroup/${userId}/${groupId}`)));
  }

  async getUserGroups(userId: number): Promise<{ userGroups: UserGroup[] }> {
    const groups = await this.get<Group[]>(`/UserGroup/user/${userId}/groups`);
    return { userGroups: groups.map(group => ({ userId, groupId: group.id })) };
  }
}