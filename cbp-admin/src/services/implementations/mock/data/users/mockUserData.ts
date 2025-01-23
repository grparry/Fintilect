import { User, UserRole, UserStatus } from '../../../../../types/client.types';

export const mockUsers: User[] = [
  {
    id: "1",
    username: 'john.doe',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.Admin,
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
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: UserRole.User,
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
