import { User } from '../../../../../types/client.types';

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'john.doe',
    tenantId: 1,
    isActive: true,
    creationDate: '2024-01-01T00:00:00Z',
    lastLogin: '2024-02-20T15:30:00Z',
    externalId: 'ext-001',
    clientId: 1,
    firstName: 'John',
    lastName: 'Doe',
    department: 'Engineering',
    isLocked: false,
    password: 'Admin@123!Secure'
  },
  {
    id: 2,
    username: 'jane.smith',
    tenantId: 1,
    isActive: true,
    creationDate: '2024-01-02T00:00:00Z',
    lastLogin: '2024-02-21T09:15:00Z',
    externalId: 'ext-002',
    clientId: 1,
    firstName: 'Jane',
    lastName: 'Smith',
    department: 'Finance',
    isLocked: false,
    password: 'Admin@123!Secure'
  }
];