import { UserGroup, Permission } from '@/../../../../types/client.types';

export const mockGroups: UserGroup[] = [
  {
    id: '1',
    name: 'System Administrators',
    description: 'Full system access',
    clientId: '1',
    members: ['1', '2'],
    roles: [],  // Will be populated from client service
    permissions: [
      {
        id: '1',
        name: 'View System Settings',
        description: 'Can view system configuration',
        category: 'system',
        actions: ['view']
      },
      {
        id: '2',
        name: 'Manage System Settings',
        description: 'Can manage system configuration',
        category: 'system',
        actions: ['create', 'edit', 'delete']
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'User Managers',
    description: 'Can manage users and permissions',
    clientId: '1',
    members: ['3', '4'],
    roles: [],  // Will be populated from client service
    permissions: [
      {
        id: '3',
        name: 'View Users',
        description: 'Can view user list',
        category: 'user',
        actions: ['view']
      },
      {
        id: '4',
        name: 'Manage Users',
        description: 'Can manage users',
        category: 'user',
        actions: ['create', 'edit', 'delete']
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
