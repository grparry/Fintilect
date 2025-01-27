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

export class PermissionService extends BaseService implements IPermissionService {
  constructor(basePath: string = '/api/v1/permissions') {
    super(basePath);
  }

  async getPermissions(): Promise<Permission[]> {
    return this.get<Permission[]>('/all');
  }

  async getPermissionGroups(filters?: PermissionGroupFilters): Promise<PaginatedResponse<PermissionGroup>> {
    return this.get<PaginatedResponse<PermissionGroup>>('/groups', { params: filters });
  }

  async getPermissionGroup(id: number): Promise<PermissionGroup> {
    return this.get<PermissionGroup>(`/groups/${id}`);
  }

  async createPermissionGroup(group: PermissionGroupInput): Promise<PermissionGroup> {
    return this.post<PermissionGroup>('/groups', group);
  }

  async updatePermissionGroup(id: number, group: Partial<PermissionGroupInput>): Promise<PermissionGroup> {
    return this.put<PermissionGroup>(`/groups/${id}`, group);
  }

  async deletePermissionGroup(groupId: number): Promise<void> {
    await this.delete(`/groups/${groupId}`);
  }

  async validatePermissionGroup(group: PermissionGroupInput): Promise<PermissionGroupValidation> {
    return this.post<PermissionGroupValidation>('/groups/validate', group);
  }

  async getPermissionCategories(): Promise<PermissionCategoryType[]> {
    return this.get<PermissionCategoryType[]>('/categories');
  }

  async getPermissionActions(): Promise<PermissionAction[]> {
    return this.get<PermissionAction[]>('/actions');
  }

  async assignPermissionGroup(userId: string, groupId: string): Promise<void> {
    await this.post<void>('/groups/assign', { userId, groupId });
  }

  async unassignPermissionGroup(userId: string, groupId: string): Promise<void> {
    await this.post<void>('/groups/unassign', { userId, groupId });
  }

  async getUserPermissionGroups(userId: string): Promise<PermissionGroup[]> {
    return this.get<PermissionGroup[]>(`/users/${userId}/groups`);
  }

  async getUserPermissions(userId: string): Promise<Record<PermissionCategoryType, PermissionAction[]>> {
    const permissions = await this.get<Permission[]>(`/users/${userId}/permissions`);
    return permissions.reduce((acc, permission) => {
      acc[permission.category] = permission.actions;
      return acc;
    }, {} as Record<PermissionCategoryType, PermissionAction[]>);
  }

  async checkUserPermissions(
    userId: string,
    category: PermissionCategoryType,
    actions: PermissionAction[]
  ): Promise<boolean> {
















  ): Promise<boolean> {





