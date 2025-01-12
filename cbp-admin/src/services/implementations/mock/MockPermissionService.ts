import { injectable } from 'inversify';
import { IPermissionService } from '../../interfaces/IPermissionService';
import {
  Permission,
  PermissionGroup,
  PermissionGroupInput,
  PermissionGroupFilters,
  PermissionGroupValidation,
  PermissionCategoryType,
  PermissionAction
} from '../../../types/permission.types';
import { PaginatedResponse } from '../../../types/common.types';
import { BaseMockService } from './BaseMockService';
import {
  mockPermissions,
  mockPermissionGroups,
  mockUserPermissionGroups
} from '../../../mocks/permissions';
import { mockPermissionAuditLog } from '../../../mocks/permission-audit';

@injectable()
export class MockPermissionService extends BaseMockService implements IPermissionService {
  private permissions: Map<string, Permission> = new Map();
  private permissionGroups: Map<number, PermissionGroup> = new Map();
  private userPermissionGroups: Map<string, number[]> = new Map();
  private auditLog: Map<number, Array<{
    timestamp: string;
    action: string;
    userId: string;
    changes: Record<string, any>;
  }>> = new Map();

  constructor() {
    super('/api/v1/permissions');
    this.initializeData();
  }

  private initializeData(): void {
    mockPermissions.forEach(permission => {
      this.permissions.set(permission.id, permission);
    });

    mockPermissionGroups.forEach(group => {
      this.permissionGroups.set(group.id, group);
    });

    Object.entries(mockUserPermissionGroups).forEach(([userId, groupIds]) => {
      this.userPermissionGroups.set(userId, groupIds);
    });

    Object.entries(mockPermissionAuditLog).forEach(([groupId, logs]) => {
      this.auditLog.set(Number(groupId), logs);
    });
  }

  async getPermissions(category?: PermissionCategoryType): Promise<Permission[]> {
    await this.delay();
    const permissions = Array.from(this.permissions.values());
    return category
      ? permissions.filter(p => p.category === category)
      : permissions;
  }

  async getPermissionGroups(filters?: PermissionGroupFilters): Promise<PaginatedResponse<PermissionGroup>> {
    await this.delay();
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

    return {
      items: groups,
      total: groups.length,
      page: 1,
      limit: 10,
      totalPages: 1
    };
  }

  async getPermissionGroup(groupId: number): Promise<PermissionGroup> {
    await this.delay();
    const group = this.permissionGroups.get(groupId);
    if (!group) {
      throw this.createError(`Permission group not found: ${groupId}`);
    }
    return group;
  }

  async createPermissionGroup(group: PermissionGroupInput): Promise<PermissionGroup> {
    await this.delay();
    const validation = await this.validatePermissionGroup(group);
    if (!validation.isValid) {
      throw this.createError('Invalid permission group data', 400);
    }

    const newGroup: PermissionGroup = {
      ...group,
      id: Math.max(...Array.from(this.permissionGroups.keys())) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'system',
      updatedBy: 'system'
    };

    this.permissionGroups.set(newGroup.id, newGroup);

    // Add audit log entry
    const auditEntry = {
      timestamp: new Date().toISOString(),
      action: 'CREATE',
      userId: 'system',
      changes: { ...group }
    };
    this.auditLog.set(newGroup.id, [auditEntry]);

    return newGroup;
  }

  async updatePermissionGroup(groupId: number, group: Partial<PermissionGroupInput>): Promise<PermissionGroup> {
    await this.delay();
    const existingGroup = await this.getPermissionGroup(groupId);
    
    const updatedGroup: PermissionGroup = {
      ...existingGroup,
      ...group,
      id: groupId,
      updatedAt: new Date().toISOString(),
      updatedBy: 'system'
    };

    this.permissionGroups.set(groupId, updatedGroup);

    // Add audit log entry
    const auditEntry = {
      timestamp: new Date().toISOString(),
      action: 'UPDATE',
      userId: 'system',
      changes: { ...group }
    };
    const existingLogs = this.auditLog.get(groupId) || [];
    this.auditLog.set(groupId, [...existingLogs, auditEntry]);

    return updatedGroup;
  }

  async deletePermissionGroup(groupId: number): Promise<void> {
    await this.delay();
    if (!this.permissionGroups.has(groupId)) {
      throw this.createError(`Permission group not found: ${groupId}`);
    }
    this.permissionGroups.delete(groupId);

    // Remove group from all user assignments
    Array.from(this.userPermissionGroups.entries()).forEach(([userId, groupIds]) => {
      this.userPermissionGroups.set(
        userId,
        groupIds.filter((groupIdToFilter: number) => groupIdToFilter !== groupId)
      );
    });

    // Add final audit log entry
    const auditEntry = {
      timestamp: new Date().toISOString(),
      action: 'DELETE',
      userId: 'system',
      changes: {}
    };
    const existingLogs = this.auditLog.get(groupId) || [];
    this.auditLog.set(groupId, [...existingLogs, auditEntry]);
  }

  async validatePermissionGroup(group: PermissionGroupInput): Promise<PermissionGroupValidation> {
    await this.delay();
    const errors: Record<string, string> = {};

    if (!group.name) {
      errors.name = 'Name is required';
    }
    if (!group.description) {
      errors.description = 'Description is required';
    }
    if (!group.permissions || Object.keys(group.permissions).length === 0) {
      errors.permissions = 'At least one permission must be specified';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  async checkUserPermissions(
    userId: string,
    category: PermissionCategoryType,
    actions: PermissionAction[]
  ): Promise<boolean> {
    await this.delay();
    const userPermissions = await this.getUserPermissions(userId);
    const categoryPermissions = userPermissions[category] || [];
    return actions.every(action => categoryPermissions.includes(action));
  }

  async getUserPermissions(userId: string): Promise<Record<PermissionCategoryType, PermissionAction[]>> {
    await this.delay();
    const groupIds = this.userPermissionGroups.get(userId) || [];
    const permissions: Record<PermissionCategoryType, PermissionAction[]> = {} as Record<PermissionCategoryType, PermissionAction[]>;

    for (const groupId of Array.from(groupIds)) {
      const group = await this.getPermissionGroup(groupId);
      Object.entries(group.permissions).forEach(([category, actions]) => {
        permissions[category as PermissionCategoryType] = Array.from(new Set([
          ...(permissions[category as PermissionCategoryType] || []),
          ...actions
        ]));
      });
    }

    return permissions;
  }

  async assignUserPermissionGroups(userId: string, groupIds: number[]): Promise<void> {
    await this.delay();
    // Validate all groups exist
    for (const groupId of groupIds) {
      if (!this.permissionGroups.has(groupId)) {
        throw this.createError(`Permission group not found: ${groupId}`);
      }
    }

    const existingGroupIds = this.userPermissionGroups.get(userId) || [];
    this.userPermissionGroups.set(userId, Array.from(new Set([...existingGroupIds, ...groupIds])));
  }

  async removeUserPermissionGroups(userId: string, groupIds: number[]): Promise<void> {
    await this.delay();
    const existingGroupIds = this.userPermissionGroups.get(userId) || [];
    this.userPermissionGroups.set(
      userId,
      existingGroupIds.filter(id => !groupIds.includes(id))
    );
  }

  async getPermissionGroupUsers(groupId: number): Promise<string[]> {
    await this.delay();
    if (!this.permissionGroups.has(groupId)) {
      throw this.createError(`Permission group not found: ${groupId}`);
    }

    return Array.from(this.userPermissionGroups.entries())
      .filter(([userId, groups]) => groups.includes(groupId))
      .map(([userId]) => userId);
  }

  async clonePermissionGroup(sourceGroupId: number, newName: string): Promise<PermissionGroup> {
    await this.delay();
    const sourceGroup = await this.getPermissionGroup(sourceGroupId);
    
    const clonedGroup: PermissionGroupInput = {
      name: newName,
      description: `Clone of ${sourceGroup.name}`,
      permissions: { ...sourceGroup.permissions }
    };

    return this.createPermissionGroup(clonedGroup);
  }

  async getPermissionGroupAuditLog(groupId: number): Promise<Array<{
    timestamp: string;
    action: string;
    userId: string;
    changes: Record<string, any>;
  }>> {
    await this.delay();
    if (!this.permissionGroups.has(groupId)) {
      throw this.createError(`Permission group not found: ${groupId}`);
    }
    return this.auditLog.get(groupId) || [];
  }
}
