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
import { BaseService } from './BaseService';

@injectable()
export class PermissionService extends BaseService implements IPermissionService {
  constructor() {
    super('/api/v1/permissions');
  }

  async getPermissions(category?: PermissionCategoryType): Promise<Permission[]> {
    const params = category ? { category } : undefined;
    return this.get<Permission[]>('', { params });
  }

  async getPermissionGroups(filters?: PermissionGroupFilters): Promise<PaginatedResponse<PermissionGroup>> {
    return this.get<PaginatedResponse<PermissionGroup>>('/groups', { params: filters });
  }

  async getPermissionGroup(groupId: number): Promise<PermissionGroup> {
    return this.get<PermissionGroup>(`/groups/${groupId}`);
  }

  async createPermissionGroup(group: PermissionGroupInput): Promise<PermissionGroup> {
    return this.post<PermissionGroup>('/groups', group);
  }

  async updatePermissionGroup(groupId: number, group: Partial<PermissionGroupInput>): Promise<PermissionGroup> {
    return this.patch<PermissionGroup>(`/groups/${groupId}`, group);
  }

  async deletePermissionGroup(groupId: number): Promise<void> {
    return this.delete(`/groups/${groupId}`);
  }

  async validatePermissionGroup(group: PermissionGroupInput): Promise<PermissionGroupValidation> {
    return this.post<PermissionGroupValidation>('/groups/validate', group);
  }

  async checkUserPermissions(
    userId: string,
    category: PermissionCategoryType,
    actions: PermissionAction[]
  ): Promise<boolean> {
    const response = await this.post<{ hasPermission: boolean }>('/check', {
      userId,
      category,
      actions
    });
    return response.hasPermission;
  }

  async getUserPermissions(userId: string): Promise<Record<PermissionCategoryType, PermissionAction[]>> {
    return this.get<Record<PermissionCategoryType, PermissionAction[]>>(`/users/${userId}`);
  }

  async assignUserPermissionGroups(userId: string, groupIds: number[]): Promise<void> {
    await this.post(`/users/${userId}/groups`, { groupIds });
  }

  async removeUserPermissionGroups(userId: string, groupIds: number[]): Promise<void> {
    await this.delete(`/users/${userId}/groups`, { groupIds });
  }

  async getPermissionGroupUsers(groupId: number): Promise<string[]> {
    return this.get<string[]>(`/groups/${groupId}/users`);
  }

  async clonePermissionGroup(sourceGroupId: number, newName: string): Promise<PermissionGroup> {
    return this.post<PermissionGroup>(`/groups/${sourceGroupId}/clone`, { name: newName });
  }

  async getPermissionGroupAuditLog(groupId: number): Promise<Array<{
    timestamp: string;
    action: string;
    userId: string;
    changes: Record<string, any>;
  }>> {
    return this.get<Array<{
      timestamp: string;
      action: string;
      userId: string;
      changes: Record<string, any>;
    }>>(`/groups/${groupId}/audit`);
  }
}
