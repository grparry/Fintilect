import { Role } from '../../../../../types/client.types';

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access',
    permissions: ['*'],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'User Manager',
    description: 'Can manage users and groups',
    permissions: ['users.read', 'users.write', 'groups.read', 'groups.write'],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Auditor',
    description: 'Read-only access to audit logs',
    permissions: ['audit.read'],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-12-01T00:00:00Z'
  }
];
