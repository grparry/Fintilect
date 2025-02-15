import { User } from '../../../../../types/user.types';

export const mockUsers: User[] = [
  {
    id: "1",
    username: 'john.doe',
    firstName: 'John',
    lastName: 'Doe',
    lastLogin: new Date().toISOString(),
    password: 'Admin@123!Secure', // For testing only
    roles: [],
    status: 'active',
    permissions: []
  },
  {
    id: "2",
    username: 'jane.smith',
    firstName: 'Jane',
    lastName: 'Smith',
    password: 'Admin@123!Secure', // For testing only
    roles: [],
    status: 'active',
    permissions: []
  }
];