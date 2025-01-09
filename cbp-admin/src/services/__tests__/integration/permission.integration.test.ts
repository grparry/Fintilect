import { api } from '../../../utils/api';
import { permissionService } from '../../permission.service';
import { 
  PermissionGroup, 
  PermissionGroupInput, 
  PermissionCategory,
  PermissionGroupValidation,
  PermissionGroupFilters
} from '../../../types/permission.types';

jest.mock('../../../utils/api');
const mockApi = api as jest.Mocked<typeof api>;

describe('PermissionService Integration Tests', () => {
  const mockPermissions: PermissionCategory = {
    system: ['view', 'edit', 'delete'],
    users: ['view', 'create', 'edit'],
  };

  const mockPermissionGroup: PermissionGroup = {
    id: 1,
    name: 'Admin Group',
    description: 'Administrative permissions',
    permissions: mockPermissions,
    createdAt: '2025-01-09T15:51:55-07:00',
    updatedAt: '2025-01-09T15:51:55-07:00',
  };

  const mockPermissionGroupInput: PermissionGroupInput = {
    name: 'Admin Group',
    description: 'Administrative permissions',
    permissions: mockPermissions,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroups', () => {
    it('should fetch permission groups with filters', async () => {
      const filters: PermissionGroupFilters = { searchTerm: 'admin' };
      const mockResponse = {
        success: true as const,
        data: {
          groups: [mockPermissionGroup],
          total: 1,
        },
      };

      mockApi.get.mockResolvedValueOnce(mockResponse);

      const result = await permissionService.getGroups(filters);

      expect(mockApi.get).toHaveBeenCalledWith('/system/permissions', { params: filters });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('getGroup', () => {
    it('should fetch a single permission group', async () => {
      const mockResponse = {
        success: true as const,
        data: mockPermissionGroup,
      };

      mockApi.get.mockResolvedValueOnce(mockResponse);

      const result = await permissionService.getGroup(1);

      expect(mockApi.get).toHaveBeenCalledWith('/system/permissions/1');
      expect(result).toEqual(mockPermissionGroup);
    });
  });

  describe('createGroup', () => {
    it('should create a new permission group', async () => {
      const mockResponse = {
        success: true as const,
        data: mockPermissionGroup,
      };

      mockApi.post.mockResolvedValueOnce(mockResponse);

      const result = await permissionService.createGroup(mockPermissionGroupInput);

      expect(mockApi.post).toHaveBeenCalledWith('/system/permissions', mockPermissionGroupInput);
      expect(result).toEqual(mockPermissionGroup);
    });
  });

  describe('updateGroup', () => {
    it('should update an existing permission group', async () => {
      const updateData: Partial<PermissionGroupInput> = {
        name: 'Updated Admin Group',
        description: 'Updated permissions',
      };
      const mockResponse = {
        success: true as const,
        data: { ...mockPermissionGroup, ...updateData },
      };

      mockApi.patch.mockResolvedValueOnce(mockResponse);

      const result = await permissionService.updateGroup(1, updateData);

      expect(mockApi.patch).toHaveBeenCalledWith('/system/permissions/1', updateData);
      expect(result).toEqual({ ...mockPermissionGroup, ...updateData });
    });
  });

  describe('deleteGroup', () => {
    it('should delete a permission group', async () => {
      const mockResponse = {
        success: true as const,
        data: undefined,
      };

      mockApi.delete.mockResolvedValueOnce(mockResponse);

      await permissionService.deleteGroup(1);

      expect(mockApi.delete).toHaveBeenCalledWith('/system/permissions/1');
    });
  });

  describe('validateGroup', () => {
    it('should validate a permission group', async () => {
      const mockValidation: PermissionGroupValidation = {
        isValid: true,
        errors: {},
      };
      const mockResponse = {
        success: true as const,
        data: mockValidation,
      };

      mockApi.post.mockResolvedValueOnce(mockResponse);

      const result = await permissionService.validateGroup(mockPermissionGroupInput);

      expect(mockApi.post).toHaveBeenCalledWith('/system/permissions/validate', mockPermissionGroupInput);
      expect(result).toEqual(mockValidation);
    });
  });

  describe('getPermissionCategories', () => {
    it('should fetch permission categories', async () => {
      const mockCategories = [
        { admin: ['view', 'edit', 'delete'] },
        { user: ['view', 'create'] },
      ];
      const mockResponse = {
        success: true as const,
        data: mockCategories,
      };

      mockApi.get.mockResolvedValueOnce(mockResponse);

      const result = await permissionService.getPermissionCategories();

      expect(mockApi.get).toHaveBeenCalledWith('/system/permissions/categories');
      expect(result).toEqual({
        admin: ['view', 'edit', 'delete'],
        user: ['view', 'create'],
      });
    });
  });

  describe('exportGroups', () => {
    it('should export permission groups as a blob', async () => {
      const filters: PermissionGroupFilters = { searchTerm: 'admin' };
      const mockBlob = new Blob(['test'], { type: 'text/csv' });
      const mockResponse = {
        success: true as const,
        data: mockBlob,
      };

      mockApi.get.mockResolvedValueOnce(mockResponse);

      const result = await permissionService.exportGroups(filters);

      expect(mockApi.get).toHaveBeenCalledWith('/system/permissions/export', {
        params: filters,
        responseType: 'blob',
      });
      expect(result).toEqual(mockBlob);
    });
  });

  describe('importGroups', () => {
    it('should import permission groups from a file', async () => {
      const mockFile = new File(['test'], 'test.csv', { type: 'text/csv' });
      const mockImportResult = {
        imported: [mockPermissionGroup],
        errors: [],
      };
      const mockResponse = {
        success: true as const,
        data: mockImportResult,
      };

      mockApi.post.mockResolvedValueOnce(mockResponse);

      const result = await permissionService.importGroups(mockFile);

      expect(mockApi.post).toHaveBeenCalledWith('/system/permissions/import', expect.any(FormData), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      expect(result).toEqual(mockImportResult);
    });
  });

  describe('error handling', () => {
    it('should handle API errors', async () => {
      const mockError = {
        success: false as const,
        error: {
          message: 'Permission group not found',
          code: 'NOT_FOUND',
        },
      };

      mockApi.get.mockResolvedValueOnce(mockError);

      await expect(permissionService.getGroup(1)).rejects.toThrow('Permission group not found');
    });
  });
});
