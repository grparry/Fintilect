import {
  Permission,
  PermissionGroup,
  PermissionCategoryType,
  PermissionAction
} from '../types/permission.types';

export const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'Bill Pay Management',
    description: 'Manage bill pay operations',
    category: 'BillPay',
    actions: ['view', 'edit', 'process', 'approve']
  },
  {
    id: '2',
    name: 'Client Management',
    description: 'Manage client information',
    category: 'Client',
    actions: ['view', 'edit', 'create', 'delete']
  },
  {
    id: '3',
    name: 'User Management',
    description: 'Manage system users',
    category: 'Users',
    actions: ['view', 'edit', 'create', 'delete']
  },
  {
    id: '4',
    name: 'Report Access',
    description: 'Access and generate reports',
    category: 'Reports',
    actions: ['view', 'export', 'create']
  }
];

export const mockPermissionGroups: PermissionGroup[] = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access',
    permissions: {
      BillPay: ['view', 'edit', 'process', 'approve'],
      Client: ['view', 'edit', 'create', 'delete'],
      Users: ['view', 'edit', 'create', 'delete'],
      Reports: ['view', 'export', 'create']
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
      BillPay: ['view', 'process'],
      Client: ['view'],
      Reports: ['view', 'export']
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
      Reports: ['view', 'export']
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
