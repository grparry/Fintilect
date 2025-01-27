import { Permission } from '../../../../../types/client.types';

export const mockPermissions: Permission[] = [
  {
    id: '1',
    name: 'View Users',
    description: 'Can view user list and details',
    category: 'user',
    actions: ['view']
  },
  {
    id: '2',
    name: 'Manage Users',
    description: 'Can create, edit, and delete users',
    category: 'user',
    actions: ['create', 'edit', 'delete']
  },
  {
    id: '3',
    name: 'Unlock Users',
    description: 'Can unlock user accounts',
    category: 'user',
    actions: ['unlock']
  },
  {
    id: '4',
    name: 'Reset User Passwords',
    description: 'Can reset user passwords',
    category: 'user',
    actions: ['reset_password']
  }
];
