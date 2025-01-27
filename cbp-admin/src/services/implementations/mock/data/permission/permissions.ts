import {
  Permission,
  SecurityRole,
  UserGroup,
  PermissionCategoryType
} from '@/../../../../types/client.types';

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
    name: 'Bill Pay Operator',
    description: 'Bill pay operations access',
    permissions: [mockPermissions[0], mockPermissions[3]],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Report Viewer',
    description: 'Report viewing access',
    permissions: [mockPermissions[3]],
    isSystem: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const mockPermissionGroups: UserGroup[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access',
    clientId: 'client1',
    roles: [mockRoles[0]],
    permissions: mockPermissions,
    members: ['user1'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Bill Pay Operator',
    description: 'Bill pay operations access',
    clientId: 'client1',
    roles: [mockRoles[1]],
    permissions: [mockPermissions[0], mockPermissions[3]],
    members: ['user2'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Report Viewer',
    description: 'Report viewing access',
    clientId: 'client1',
    roles: [],
    permissions: [mockPermissions[3]],
    members: ['user3'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

// Mock user-permission group assignments
export const mockUserPermissionGroups: Record<string, string[]> = {
  'user1': ['1'], // Administrator
  'user2': ['2'], // Bill Pay Operator
  'user3': ['2', '3'] // Bill Pay Operator + Report Viewer
};

export const mockUserPermissions = mockPermissions;
export const mockGroupPermissions = mockPermissionGroups;
