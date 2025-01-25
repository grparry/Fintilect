import { IPermissionService } from '../../interfaces/IPermissionService';
import { 
  Permission, 
  PermissionGroup, 
  PermissionGroupInput, 
  PermissionGroupFilters, 
  PermissionGroupValidation, 
  PermissionCategoryType, 
  PermissionAction,
  PermissionCategory 
} from '../../../types/permission.types';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseMockService } from './BaseMockService';
import { mockPermissions, mockPermissionGroups } from './data/permissions/mockPermissionData';

export class MockPermissionService extends BaseMockService implements IPermissionService {
  private permissions: Map<string, Permission> = new Map();
  private permissionGroups: Map<string, PermissionGroup> = new Map();
  private userPermissionGroups: Map<string, string[]> = new Map();
  private auditLog: Map<string, Array<{
    timestamp: string;
    action: string;
    userId: string;
    details: string;
    changes: Record<string, any>;
  }>> = new Map();

  constructor(basePath: string = '/api/v1/permissions') {
    super(basePath);
    this.initializeData();
  }

  private initializeData(): void {
    mockPermissions.forEach(permission => {
      this.permissions.set(permission.id, permission);
    });

    mockPermissionGroups.forEach(group => {
      this.permissionGroups.set(String(group.id), group);
    });
  }

  async getPermissions(category?: PermissionCategoryType): Promise<Permission[]> {
    const permissions = Array.from(this.permissions.values());
    return category
      ? permissions.filter(p => p.category === category)
      : permissions;
  }

  async getPermissionGroups(filters?: PermissionGroupFilters): Promise<PaginatedResponse<PermissionGroup>> {
    let groups = Array.from(this.permissionGroups.values());

    if (filters) {
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        groups = groups.filter(g =>
          g.name.toLowerCase().includes(term) ||
          g.description.toLowerCase().includes(term)
        );
      }
      if (filters.createdBy) {
        groups = groups.filter(g => g.createdBy === filters.createdBy);
      }
      if (filters.updatedBy) {
        groups = groups.filter(g => g.updatedBy === filters.updatedBy);
      }
    }

    // Default pagination values
    const page = 1;
    const limit = 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      items: groups.slice(start, end),
      total: groups.length,
      page,
      limit,
      totalPages: Math.ceil(groups.length / limit)
    };
  }

  async getPermissionGroup(groupId: number): Promise<PermissionGroup> {
    const group = this.permissionGroups.get(String(groupId));
    if (!group) {
      throw this.createError(`Permission group not found: ${groupId}`, 404);
    }
    return group;
  }

  async createPermissionGroup(group: PermissionGroupInput): Promise<PermissionGroup> {
    const validation = await this.validatePermissionGroup(group);
    if (!validation.isValid) {
      throw this.createError('Invalid permission group data', 400);
    }

    const newId = Math.max(...Array.from(this.permissionGroups.keys()).map(Number)) + 1;
    const newGroup: PermissionGroup = {
      id: newId,
      name: group.name,
      description: group.description,
      permissions: group.permissions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'system',
      updatedBy: 'system'
    };

    this.permissionGroups.set(String(newId), newGroup);
    return newGroup;
  }

  async updatePermissionGroup(groupId: number, updates: Partial<PermissionGroupInput>): Promise<PermissionGroup> {
    const group = await this.getPermissionGroup(groupId);
    
    if (updates.name || updates.description || updates.permissions) {
      const validation = await this.validatePermissionGroup({
        name: updates.name || group.name,
        description: updates.description || group.description,
        permissions: updates.permissions || group.permissions
      });

      if (!validation.isValid) {
        throw this.createError('Invalid permission group data', 400);
      }
    }

    const updatedGroup = {
      ...group,
      ...updates,
      updatedAt: new Date().toISOString(),
      updatedBy: 'system'
    };

    this.permissionGroups.set(String(groupId), updatedGroup);
    return updatedGroup;
  }

  async deletePermissionGroup(groupId: number): Promise<void> {
    const exists = this.permissionGroups.has(String(groupId));
    if (!exists) {
      throw this.createError(`Permission group not found: ${groupId}`, 404);
    }
    this.permissionGroups.delete(String(groupId));
  }

  async validatePermissionGroup(group: PermissionGroupInput): Promise<PermissionGroupValidation> {
    const errors: Record<string, string> = {};

    if (!group.name || group.name.length < 3) {
      errors.name = 'Name must be at least 3 characters long';
    }

    if (!group.description || group.description.length < 10) {
      errors.description = 'Description must be at least 10 characters long';
    }

    if (!group.permissions || Object.keys(group.permissions).length === 0) {
      errors.permissions = 'At least one permission must be specified';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  async getUserPermissions(userId: string): Promise<Record<PermissionCategoryType, PermissionAction[]>> {
    const userGroups = this.userPermissionGroups.get(userId) || [];
    const result: Partial<Record<PermissionCategoryType, PermissionAction[]>> = {};

    for (const groupId of userGroups) {
      const group = await this.getPermissionGroup(Number(groupId));
      Object.entries(group.permissions).forEach(([category, actions]) => {
        const categoryType = category as PermissionCategoryType;
        if (!result[categoryType]) {
          result[categoryType] = [];
        }
        result[categoryType]!.push(...actions);
      });
    }

    // Initialize missing categories with empty arrays
    const allCategories: PermissionCategoryType[] = ['System', 'BillPay', 'Client', 'MoneyDesktop', 'Users', 'Security', 'Settings', 'Reports'];
    allCategories.forEach(category => {
      if (!result[category]) {
        result[category] = [];
      }
    });

    return result as Record<PermissionCategoryType, PermissionAction[]>;
  }

  async checkUserPermissions(
    userId: string,
    category: PermissionCategoryType,
    actions: PermissionAction[]
  ): Promise<boolean> {
    const userPermissions = await this.getUserPermissions(userId);
    const categoryPermissions = userPermissions[category] || [];
    return actions.every(action => categoryPermissions.includes(action));
  }

  async getPermissionGroupUsers(groupId: number): Promise<string[]> {
    await this.getPermissionGroup(groupId); // Verify group exists
    const users: string[] = [];

    this.userPermissionGroups.forEach((groups, userId) => {
      if (groups.includes(String(groupId))) {
        users.push(userId);
      }
    });

    return users;
  }

  async assignUserPermissionGroups(userId: string, groupIds: number[]): Promise<void> {
    // Verify all groups exist
    await Promise.all(groupIds.map(id => this.getPermissionGroup(id)));

    const currentGroups = this.userPermissionGroups.get(userId) || [];
    const newGroups = Array.from(new Set([...currentGroups, ...groupIds.map(String)]));
    this.userPermissionGroups.set(userId, newGroups);
  }

  async removeUserPermissionGroups(userId: string, groupIds: number[]): Promise<void> {
    const currentGroups = this.userPermissionGroups.get(userId) || [];
    const groupIdsToRemove = groupIds.map(String);
    const newGroups = currentGroups.filter(id => !groupIdsToRemove.includes(id));
    this.userPermissionGroups.set(userId, newGroups);
  }

  async getPermissionGroupAuditLog(groupId: number): Promise<Array<{
    timestamp: string;
    action: string;
    userId: string;
    details: string;
    changes: Record<string, any>;
  }>> {
    await this.getPermissionGroup(groupId); // Verify group exists
    return this.auditLog.get(String(groupId)) || [];
  }

  async clonePermissionGroup(sourceGroupId: number, newGroupName: string): Promise<PermissionGroup> {
    const sourceGroup = await this.getPermissionGroup(sourceGroupId);
    
    const input: PermissionGroupInput = {
      name: newGroupName,
      description: `Clone of ${sourceGroup.name}`,
      permissions: { ...sourceGroup.permissions }
    };

    return this.createPermissionGroup(input);
  }
}
