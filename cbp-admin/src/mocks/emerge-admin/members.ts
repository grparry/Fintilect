import { 
  SearchType, 
  Member, 
  MemberStatus, 
  SearchResult, 
  SearchOption 
} from '../../types/member-center.types';
import { mockAccounts } from './accounts';
import { mockAlerts } from './alerts';

export const searchTypeOptions: SearchOption[] = [
  { value: 'accountNumber' as SearchType, label: 'Account Number' },
  { value: 'name' as SearchType, label: 'Name' },
  { value: 'email' as SearchType, label: 'Email' },
  { value: 'phone' as SearchType, label: 'Phone' }
];

export const mockMembers: Member[] = [
  {
    id: '12345',
    firstName: 'John',
    lastName: 'Doe',
    accountNumber: '12345',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    status: 'Active' as MemberStatus,
    joinDate: '2023-01-15',
    lastLogin: '2024-01-15T10:30:00',
    accounts: [mockAccounts[0], mockAccounts[1]], // Checking and Savings
    alerts: [mockAlerts[0], mockAlerts[1]], // Security and Account alerts
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    }
  },
  {
    id: '12346',
    firstName: 'Jane',
    lastName: 'Smith',
    accountNumber: '12346',
    email: 'jane.smith@example.com',
    phone: '(555) 234-5678',
    status: 'Active' as MemberStatus,
    joinDate: '2023-02-01',
    lastLogin: '2024-01-14T15:45:00',
    accounts: [mockAccounts[2]], // Credit card
    alerts: [mockAlerts[2]], // Transaction alert
    address: {
      street: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zip: '67890'
    }
  }
];

export const mockSearchResults: SearchResult[] = [
  {
    id: '12345',
    name: 'John Doe',
    email: 'john.doe@example.com',
    status: 'Active' as MemberStatus,
  },
  {
    id: '12346',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'Active' as MemberStatus,
  }
];

export async function mockSearchMembers(term: string): Promise<SearchResult[]> {
  const results = mockMembers
    .filter(member => 
      member.accountNumber.includes(term) ||
      member.firstName.toLowerCase().includes(term.toLowerCase()) ||
      member.lastName.toLowerCase().includes(term.toLowerCase()) ||
      member.email.toLowerCase().includes(term.toLowerCase())
    )
    .map(member => ({
      id: member.id,
      name: `${member.firstName} ${member.lastName}`,
      email: member.email,
      status: member.status
    }));

  return new Promise(resolve => setTimeout(() => resolve(results), 500));
}
