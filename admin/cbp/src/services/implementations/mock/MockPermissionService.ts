import { IPermissionService } from '../../interfaces/IPermissionService';
import { 
  Role,
  Group,
  GroupRole,
  UserGroup,
  GroupListResponse,
  RoleListResponse,
  UserGroupListResponse,
  GroupRoleListResponse,
  UserPermissions
} from '../../../types/client.types';
import { BaseMockService } from './BaseMockService';
import { 
  mockPermissions,
  mockPermissionGroups,
  mockGroupRoles,
  mockUserGroups
} from './data/permissions/mockPermissionData';

export class MockPermissionService extends BaseMockService implements IPermissionService {
  private roles: Map<number, Role> = new Map();
  private groups: Map<number, Group> = new Map();
  private groupRoles: Map<string, GroupRole> = new Map();
  private userGroups: Map<string, UserGroup> = new Map();

  constructor(basePath: string = '/api/v1/permissions') {
    super(basePath);
    this.initializeData();
  }

  private initializeData(): void {
    // Convert mockPermissions to Role type
    const roles: Role[] = mockPermissions.map(p => ({
      id: parseInt(p.id),
      name: p.name,
      description: p.description
    }));

    roles.forEach(role => this.roles.set(role.id, role));
    mockPermissionGroups.forEach(group => this.groups.set(group.id, group));
    mockGroupRoles.forEach(gr => this.groupRoles.set(`${gr.groupId}-${gr.roleId}`, gr));
    mockUserGroups.forEach(ug => this.userGroups.set(`${ug.userId}-${ug.groupId}`, ug));
  }

  async getRoles(): Promise<RoleListResponse> {
    return { roles: Array.from(this.roles.values()) };
  }

  async getRole(roleId: number): Promise<Role> {
    const role = this.roles.get(roleId);
    if (!role) throw this.createError(`Role not found: ${roleId}`, 404);
    return role;
  }

  async createRole(role: Omit<Role, 'id'>): Promise<Role> {
    const newId = Math.max(...Array.from(this.roles.keys())) + 1;
    const newRole: Role = { id: newId, ...role };
    this.roles.set(newId, newRole);
    return newRole;
  }

  async updateRole(roleId: number, role: Partial<Role>): Promise<Role> {
    const existing = await this.getRole(roleId);
    const updated = { ...existing, ...role };
    this.roles.set(roleId, updated);
    return updated;
  }

  async deleteRole(roleId: number): Promise<void> {
    if (!this.roles.has(roleId)) throw this.createError(`Role not found: ${roleId}`, 404);
    this.roles.delete(roleId);
  }

  async getGroups(params?: { clientId?: number; searchTerm?: string; }): Promise<GroupListResponse> {
    let groups = Array.from(this.groups.values());
    
    if (params?.clientId) {
      groups = groups.filter(g => g.clientId === params.clientId);
    }
    
    if (params?.searchTerm) {
      const term = params.searchTerm.toLowerCase();
      groups = groups.filter(g => g.name?.toLowerCase().includes(term));
    }

    return {
      groups
    };
  }

  async getGroup(groupId: number): Promise<Group> {
    const group = this.groups.get(groupId);
    if (!group) throw this.createError(`Group not found: ${groupId}`, 404);
    return group;
  }

  async createGroup(group: Omit<Group, 'id' | 'createdAt' | 'updatedAt'>): Promise<Group> {
    const newId = Math.max(...Array.from(this.groups.keys())) + 1;
    const now = new Date().toISOString();
    const newGroup: Group = {
      id: newId,
      createdAt: now,
      updatedAt: now,
      ...group
    };
    this.groups.set(newId, newGroup);
    return newGroup;
  }

  async updateGroup(groupId: number, group: Partial<Group>): Promise<Group> {
    const existing = await this.getGroup(groupId);
    const updated = {
      ...existing,
      ...group,
      updatedAt: new Date().toISOString()
    };
    this.groups.set(groupId, updated);
    return updated;
  }

  async deleteGroup(groupId: number): Promise<void> {
    if (!this.groups.has(groupId)) throw this.createError(`Group not found: ${groupId}`, 404);
    this.groups.delete(groupId);
  }

  async getGroupUsers(groupId: number): Promise<UserGroupListResponse> {
    const userGroups = Array.from(this.userGroups.values())
      .filter(ug => ug.groupId === groupId);
    return { userGroups };
  }

  async getGroupRoles(groupId: number): Promise<GroupRoleListResponse> {
    const groupRoles = Array.from(this.groupRoles.values())
      .filter(gr => gr.groupId === groupId);
    return { groupRoles };
  }

  async addGroupRoles(groupId: number, roleIds: number[]): Promise<void> {
    // Validate group exists
    if (!this.groups.has(groupId)) {
      throw this.createError(`Group not found: ${groupId}`, 404);
    }

    // Validate roles exist
    for (const roleId of roleIds) {
      if (!this.roles.has(roleId)) {
        throw this.createError(`Role not found: ${roleId}`, 404);
      }
    }

    // Add roles
    for (const roleId of roleIds) {
      this.groupRoles.set(`${groupId}-${roleId}`, { groupId, roleId });
    }
  }

  async removeGroupRoles(groupId: number, roleIds: number[]): Promise<void> {
    // Validate group exists
    if (!this.groups.has(groupId)) {
      throw this.createError(`Group not found: ${groupId}`, 404);
    }

    // Remove roles
    for (const roleId of roleIds) {
      this.groupRoles.delete(`${groupId}-${roleId}`);
    }
  }

  async assignUserGroups(userId: number, groupIds: number[]): Promise<void> {
    for (const groupId of groupIds) {
      await this.getGroup(groupId); // Verify group exists
      this.userGroups.set(`${userId}-${groupId}`, { userId, groupId });
    }
  }

  async removeUserGroups(userId: number, groupIds: number[]): Promise<void> {
    for (const groupId of groupIds) {
      this.userGroups.delete(`${userId}-${groupId}`);
    }
  }

  async getUserGroups(userId: number): Promise<UserGroupListResponse> {
    const userGroups = Array.from(this.userGroups.values())
      .filter(ug => ug.userId === userId);
    return { userGroups };
  }
}