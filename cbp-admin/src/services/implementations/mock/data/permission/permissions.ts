import {
  Permission,
  SecurityRole,
  UserGroup,
  PermissionCategoryType
} from '../../../../../types/client.types';

interface PermissionGroup {
  id: number;
  name: string;
  description: string;
  permissions: Record<string, string[]>;
  createdAt: string;
  updatedAt: string;
}

export const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'Bill Pay Management',
    description: 'Manage bill pay operations',
    category: 'billpay' as PermissionCategoryType,
    actions: ['view', 'edit', 'process', 'approve']
  },
  {
    id: '2',
    name: 'Client Management',
    description: 'Manage client information',
    category: 'client' as PermissionCategoryType,
    actions: ['view', 'edit', 'create', 'delete']
  },
  {
    id: '3',
    name: 'User Management',
    description: 'Manage system users',
    category: 'user' as PermissionCategoryType,
    actions: ['view', 'edit', 'create', 'delete']
  },
  {
    id: '4',
    name: 'Report Access',
    description: 'Access and generate reports',
    category: 'reports' as PermissionCategoryType,
    actions: ['view', 'export', 'create']
  }
];

export const mockPermissionGroups: PermissionGroup[] = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access',
    permissions: {
      billpay: ['view', 'edit', 'process', 'approve'],
      client: ['view', 'edit', 'create', 'delete'],
      user: ['view', 'edit', 'create', 'delete'],
      reports: ['view', 'export', 'create']
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
    updatedBy: 'system'
  },
  {
    id: 2,
    name: 'Bill Pay Operator',
    description: 'Bill pay operations access',
    permissions: {
      billpay: ['view', 'process'],
      client: ['view'],
      reports: ['view', 'export']
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
    updatedBy: 'system'
  },
  {
    id: 3,
    name: 'Report Viewer',
    description: 'Report viewing access',
    permissions: {
      reports: ['view', 'export']
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    createdBy: 'system',
    updatedBy: 'system'
  }
];

// Mock user-permission group assignments
export const mockUserPermissionGroups: Record<string, number[]> = {
  'user1': [1], // Administrator
  'user2': [2], // Bill Pay Operator
  'user3': [2, 3] // Bill Pay Operator + Report Viewer
};

export const mockRoles: SecurityRole[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access',
    permissions: mockPermissions,
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Department management access',
    permissions: mockPermissions.filter(p => p.category !== 'system'),
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockUserPermissions = mockPermissions;
export const mockGroupPermissions = mockPermissionGroups;
