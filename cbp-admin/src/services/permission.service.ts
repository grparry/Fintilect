import { ApiSuccessResponse } from '../types/api.types';
import api from './api';
import {
  PermissionGroup,
  PermissionGroupInput,
  PermissionGroupFilters,
  PermissionGroupValidation,
  PermissionCategoryDefinition,
} from '../types/permission.types';

class PermissionService {
  private readonly baseUrl = '/permission-groups';

  async getGroups(filters: PermissionGroupFilters): Promise<{
    groups: PermissionGroup[];
    total: number;
  }> {
    const response = await api.get<ApiSuccessResponse<{
      groups: PermissionGroup[];
      total: number;
    }>>(this.baseUrl, { params: filters });
    return response.data.data;
  }

  async getGroup(id: number): Promise<PermissionGroup> {
    const response = await api.get<ApiSuccessResponse<PermissionGroup>>(`${this.baseUrl}/${id}`);
    return response.data.data;
  }

  async createGroup(group: PermissionGroupInput): Promise<PermissionGroup> {
    const response = await api.post<ApiSuccessResponse<PermissionGroup>>(this.baseUrl, group);
    return response.data.data;
  }

  async updateGroup(id: number, group: PermissionGroupInput): Promise<PermissionGroup> {
    const response = await api.put<ApiSuccessResponse<PermissionGroup>>(`${this.baseUrl}/${id}`, group);
    return response.data.data;
  }

  async deleteGroup(id: number): Promise<void> {
    await api.delete(`${this.baseUrl}/${id}`);
  }

  async validateGroup(group: PermissionGroupInput): Promise<PermissionGroupValidation> {
    const response = await api.post<ApiSuccessResponse<PermissionGroupValidation>>(
      `${this.baseUrl}/validate`,
      group
    );
    return response.data.data;
  }

  async getPermissionCategories(): Promise<PermissionCategoryDefinition> {
    const response = await api.get<ApiSuccessResponse<PermissionCategoryDefinition[]>>(
      `${this.baseUrl}/categories`
    );
    // Transform array of category definitions into a single object
    return response.data.data.reduce((acc, category) => ({
      ...acc,
      ...category
    }), {});
  }

  async exportGroups(filters: PermissionGroupFilters): Promise<Blob> {
    const response = await api.get<Blob>(`${this.baseUrl}/export`, {
      params: filters,
      responseType: 'blob',
    });
    return response.data;
  }

  async importGroups(file: File): Promise<{
    imported: PermissionGroup[];
    errors: Array<{ line: number; error: string }>;
  }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<ApiSuccessResponse<{
      imported: PermissionGroup[];
      errors: Array<{ line: number; error: string }>;
    }>>(`${this.baseUrl}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  }
}

export const permissionService = new PermissionService();
