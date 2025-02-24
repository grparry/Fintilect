import { IPermissionService } from '../../interfaces/IPermissionService';
import {
  Role,
  Group,
  GroupRole,
  UserGroup,
  PaginatedResponse,
  UserPermissions
} from '../../../types/client.types';
import { BaseService } from './BaseService';

export class PermissionService extends BaseService implements IPermissionService {
  constructor(basePath: string = '/api/v1/permissions') {
    super(basePath);
  }

  async getRoles(): Promise<Role[]> {
    return this.get<Role[]>('/roles');
  }

  async getRole(roleId: number): Promise<Role> {
    return this.get<Role>(`/roles/${roleId}`);
  }

  async createRole(role: Omit<Role, 'id'>): Promise<Role> {
    return this.post<Role>('/roles', role);
  }

  async updateRole(roleId: number, role: Partial<Role>): Promise<Role> {
    return this.put<Role>(`/roles/${roleId}`, role);
  }

  async deleteRole(roleId: number): Promise<void> {
    await this.delete(`/roles/${roleId}`);
  }

  async getGroups(params?: {
    clientId?: number;
    searchTerm?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Group>> {
    return this.get<PaginatedResponse<Group>>('/groups', { params });
  }

  async getGroup(groupId: number): Promise<Group> {
    return this.get<Group>(`/groups/${groupId}`);
  }

  async createGroup(group: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>): Promise<Group> {
    return this.post<Group>('/groups', group);
  }

  async updateGroup(groupId: number, group: Partial<Group>): Promise<Group> {
    return this.put<Group>(`/groups/${groupId}`, group);
  }

  async deleteGroup(groupId: number): Promise<void> {
    await this.delete(`/groups/${groupId}`);
  }

  async getGroupUsers(groupId: number): Promise<UserGroup[]> {
    return this.get<UserGroup[]>(`/groups/${groupId}/users`);
  }

  async getGroupRoles(groupId: number): Promise<GroupRole[]> {
    return this.get<GroupRole[]>(`/groups/${groupId}/roles`);
  }

  async addGroupRoles(groupId: number, roleIds: number[]): Promise<void> {
    await this.post(`/groups/${groupId}/roles`, { roleIds });
  }

  async removeGroupRoles(groupId: number, roleIds: number[]): Promise<void> {
    await this.delete(`/groups/${groupId}/roles`, { data: { roleIds } });
  }

  async assignUserGroups(userId: number, groupIds: number[]): Promise<void> {
    await this.post<void>(`/users/${userId}/groups`, { groupIds });
  }

  async removeUserGroups(userId: number, groupIds: number[]): Promise<void> {
    await this.delete(`/users/${userId}/groups`, { data: { groupIds } });
  }

  async getUserGroups(userId: number): Promise<UserGroup[]> {
    return this.get<UserGroup[]>(`/users/${userId}/groups`);
  }

  async getUserPermissions(userId: number): Promise<UserPermissions> {
    // Get user's groups
    const userGroups = await this.getUserGroups(userId);
    const groups = await Promise.all(
      userGroups.map((ug: UserGroup) => this.getGroup(ug.groupId))
    );

    // Get roles from those groups
    const groupRoles = await Promise.all(
      userGroups.map((ug: UserGroup) => this.getGroupRoles(ug.groupId))
    );
    const roleIds = new Set(groupRoles.flat().map((gr: GroupRole) => gr.roleId));
    const roles = await Promise.all(
      Array.from(roleIds).map((id: number) => this.getRole(id))
    );

    return {
      groups,
      roles
    };
  }
}