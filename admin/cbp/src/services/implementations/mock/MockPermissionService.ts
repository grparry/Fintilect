import { IPermissionService } from '../../interfaces/IPermissionService';
import { 
  Role,
  Group,
  GroupRole,
  UserGroup,
  PaginatedResponse,
  UserPermissions
} from '../../../types/client.types';
import { BaseMockService } from './BaseMockService';

// Mock data
const mockRoles: Role[] = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Manager' },
  { id: 3, name: 'User' }
];

const mockGroups: Group[] = [
  { id: 1, name: 'System Admins', customerId: 1, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 2, name: 'Managers', customerId: 1, createdAt: '2025-01-01', updatedAt: '2025-01-01' },
  { id: 3, name: 'Users', customerId: 1, createdAt: '2025-01-01', updatedAt: '2025-01-01' }
];

const mockGroupRoles: GroupRole[] = [
  { groupId: 1, roleId: 1 },
  { groupId: 2, roleId: 2 },
  { groupId: 3, roleId: 3 }
];

const mockUserGroups: UserGroup[] = [
  { userId: 1, groupId: 1 },
  { userId: 2, groupId: 2 },
  { userId: 3, groupId: 3 }
];

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
    mockRoles.forEach(role => this.roles.set(role.id, role));
    mockGroups.forEach(group => this.groups.set(group.id, group));
    mockGroupRoles.forEach(gr => this.groupRoles.set(`${gr.groupId}-${gr.roleId}`, gr));
    mockUserGroups.forEach(ug => this.userGroups.set(`${ug.userId}-${ug.groupId}`, ug));
  }

  async getRoles(): Promise<Role[]> {
    return Array.from(this.roles.values());
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

  async getGroups(params?: { customerId?: number; searchTerm?: string; page?: number; limit?: number; }): Promise<PaginatedResponse<Group>> {
    let groups = Array.from(this.groups.values());
    
    if (params?.customerId) {
      groups = groups.filter(g => g.customerId === params.customerId);
    }
    
    if (params?.searchTerm) {
      const term = params.searchTerm.toLowerCase();
      groups = groups.filter(g => g.name?.toLowerCase().includes(term));
    }

    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const filteredGroups = groups
      .filter(group => {
        if (params?.customerId && group.customerId !== params.customerId) return false;
        if (params?.searchTerm && !group.name?.toLowerCase().includes(params.searchTerm.toLowerCase())) return false;
        return true;
      });

    const paginatedGroups = filteredGroups.slice(startIndex, endIndex);
    const total = filteredGroups.length;
    const totalPages = Math.ceil(total / limit);

    return {
      items: paginatedGroups,
      total,
      page,
      limit,
      totalPages
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

  async getGroupUsers(groupId: number): Promise<UserGroup[]> {
    return Array.from(this.userGroups.values())
      .filter(ug => ug.groupId === groupId);
  }

  async getGroupRoles(groupId: number): Promise<GroupRole[]> {
    return Array.from(this.groupRoles.values())
      .filter(gr => gr.groupId === groupId);
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

  async getUserGroups(userId: number): Promise<UserGroup[]> {
    return Array.from(this.userGroups.values())
      .filter(ug => ug.userId === userId);
  }

  async getUserPermissions(userId: number): Promise<UserPermissions> {
    // Get user's groups
    const userGroups = Array.from(this.userGroups.values())
      .filter(ug => ug.userId === userId);
    const groups = userGroups
      .map(ug => this.groups.get(ug.groupId))
      .filter((g): g is Group => g !== undefined);

    // Get roles from those groups
    const groupRoles = Array.from(this.groupRoles.values())
      .filter(gr => userGroups.some(ug => ug.groupId === gr.groupId));
    const roles = groupRoles
      .map(gr => this.roles.get(gr.roleId))
      .filter((r): r is Role => r !== undefined);

    return {
      groups,
      roles
    };
  }
}