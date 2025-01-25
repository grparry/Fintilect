import { User, UserRole, UserStatus } from '../../../../../types/client.types';

export const mockUsers: User[] = [
  {
    id: "1",
    username: 'john.doe',
    email: 'john.doe',
    firstName: 'John',
    lastName: 'Doe',
    roles: ['Admin'],
    status: UserStatus.ACTIVE,
    department: 'IT',
    lastLogin: new Date().toISOString(),
    locked: false,
    password: 'Admin@123!Secure', // For testing only
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    clientId: 'default-client'
  },
  {
    id: "2",
    username: 'jane.smith',
    email: 'jane.smith',
    firstName: 'Jane',
    lastName: 'Smith',
    roles: ['User'],
    status: UserStatus.ACTIVE,
    department: 'Sales',
    lastLogin: new Date().toISOString(),
    locked: false,
    password: 'Admin@123!Secure', // For testing only
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    clientId: 'default-client'
  }
];
