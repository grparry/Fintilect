import {
  Connection,
  ConnectionStatus,
  Account,
  AccountType,
  AccountStatus
} from '../../types/money-desktop.types';

export const mockConnections: Connection[] = [
  {
    id: 1,
    clientName: 'John Doe',
    institutionName: 'Bank A',
    status: 'Connected' as ConnectionStatus,
    lastSync: '2024-12-16T12:00:00',
    accounts: 3,
    error: null
  },
  {
    id: 2,
    clientName: 'Jane Smith',
    institutionName: 'Bank B',
    status: 'Error' as ConnectionStatus,
    lastSync: '2024-12-15T09:30:00',
    accounts: 2,
    error: 'Authentication failed'
  }
];

export const mockAccounts: Account[] = [
  {
    id: 1,
    clientName: 'John Doe',
    institutionName: 'Bank A',
    accountName: 'Checking Account',
    accountNumber: '*****1234',
    type: 'Checking' as AccountType,
    balance: 5000.00,
    status: 'Active' as AccountStatus,
    lastUpdated: '2024-12-16T12:00:00'
  },
  {
    id: 2,
    clientName: 'John Doe',
    institutionName: 'Bank A',
    accountName: 'Savings Account',
    accountNumber: '*****5678',
    type: 'Savings' as AccountType,
    balance: 10000.00,
    status: 'Active' as AccountStatus,
    lastUpdated: '2024-12-16T12:00:00'
  }
];
