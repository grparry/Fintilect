import { Member, MemberStatus } from '../../../../../types/member-center.types';

export const mockMembers: Member[] = [
  {
    id: '1',
    accountNumber: '12345',
    joinDate: '1995-01-01',
    lastLogin: '2023-01-01',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    status: 'Active',
    phone: '+1234567890',
    address: {
      street: '123 Main St',
      city: 'Sample City',
      state: 'CA',
      zip: '12345'
    }
  },
  {
    id: '2',
    accountNumber: '67890',
    joinDate: '1995-01-01',
    lastLogin: '2023-01-01',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    status: 'Pending',
    phone: '+1987654321',
    address: {
      street: '456 Oak Ave',
      city: 'Another City',
      state: 'NY',
      zip: '67890'
    }
  }
];
