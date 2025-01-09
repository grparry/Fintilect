import { api } from '../utils/api';
import {
  PermissionGroup,
  PermissionGroupInput,
  PermissionGroupFilters,
  PermissionGroupValidation,
  PermissionCategoryDefinition,
} from '../types/permission.types';

class PermissionService {
  private readonly basePath = '/system/permissions';

  async getGroups(filters: PermissionGroupFilters): Promise<{
    groups: PermissionGroup[];
    total: number;
  }> {
    const response = await api.get<{
      groups: PermissionGroup[];
      total: number;
    }>(this.basePath, { params: filters });
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  async getGroup(id: number): Promise<PermissionGroup> {
    const response = await api.get<PermissionGroup>(`${this.basePath}/${id}`);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  async createGroup(group: PermissionGroupInput): Promise<PermissionGroup> {
    const response = await api.post<PermissionGroup>(this.basePath, group);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  async updateGroup(id: number, group: Partial<PermissionGroupInput>): Promise<PermissionGroup> {
    const response = await api.patch<PermissionGroup>(`${this.basePath}/${id}`, group);
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  async deleteGroup(id: number): Promise<void> {
    const response = await api.delete<void>(`${this.basePath}/${id}`);
    if (!response.success) {
      throw new Error(response.error.message);
    }
  }

  async validateGroup(group: PermissionGroupInput): Promise<PermissionGroupValidation> {
    const response = await api.post<PermissionGroupValidation>(
      `${this.basePath}/validate`,
      group
    );
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  async getPermissionCategories(): Promise<PermissionCategoryDefinition> {
    const response = await api.get<PermissionCategoryDefinition[]>(
      `${this.basePath}/categories`
    );
    if (!response.success) {
      throw new Error(response.error.message);
    }
    // Transform array of category definitions into a single object
    return response.data.reduce((acc, category) => ({
      ...acc,
      ...category
    }), {});
  }

  async exportGroups(filters: PermissionGroupFilters): Promise<Blob> {
    const response = await api.get<Blob>(`${this.basePath}/export`, {
      params: filters,
      responseType: 'blob'
    });
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }

  async importGroups(file: File): Promise<{
    imported: PermissionGroup[];
    errors: Array<{ line: number; error: string }>;
  }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<{
      imported: PermissionGroup[];
      errors: Array<{ line: number; error: string }>;
    }>(`${this.basePath}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!response.success) {
      throw new Error(response.error.message);
    }
    return response.data;
  }
}

export const permissionService = new PermissionService();
