import { Account, Connection } from '../../../../../types/money-desktop.types';

export const mockConnections: Connection[] = [
  {
    id: 1,
    institutionName: 'Bank of America',
    status: 'Connected',
    lastSync: '2025-01-22T10:00:00Z',
    accountCount: 3,
    totalBalance: 25000.50,
    createdAt: '2024-12-01T08:00:00Z',
    lastError: null
  },
  {
    id: 2,
    institutionName: 'Chase Bank',
    status: 'Error',
    lastSync: '2025-01-21T14:30:00Z',
    accountCount: 2,
    totalBalance: 15000.75,
    createdAt: '2024-12-15T09:00:00Z',
    lastError: 'Authentication failed'
  },
  {
    id: 3,
    institutionName: 'Wells Fargo',
    status: 'Pending',
    lastSync: '2025-01-22T09:45:00Z',
    accountCount: 1,
    totalBalance: 5000.25,
    createdAt: '2025-01-20T11:00:00Z',
    lastError: null
  }
];
export const mockAccounts: Account[] = [
  {
    id: 101,
    connectionId: 1,
    institutionName: 'Bank of America',
    accountName: 'Premium Checking',
    accountNumber: '*****1234',
    type: 'Checking',
    status: 'Active',
    balance: 10000.50,
    lastUpdated: '2025-01-22T10:00:00Z'
  },
  {
    id: 102,
    connectionId: 1,
    institutionName: 'Bank of America',
    accountName: 'Savings Plus',
    accountNumber: '*****5678',
    type: 'Savings',
    status: 'Active',
    balance: 15000.00,
    lastUpdated: '2025-01-22T10:00:00Z'
  },
  {
    id: 201,
    connectionId: 2,
    institutionName: 'Chase Bank',
    accountName: 'Total Checking',
    accountNumber: '*****9012',
    type: 'Checking',
    status: 'Error',
    balance: 5000.75,
    lastUpdated: '2025-01-21T14:30:00Z'
  },
  {
    id: 202,
    connectionId: 2,
    institutionName: 'Chase Bank',
    accountName: 'Savings',
    accountNumber: '*****3456',
    type: 'Savings',
    status: 'Error',
    balance: 10000.00,
    lastUpdated: '2025-01-21T14:30:00Z'
  },
  {
    id: 301,
    connectionId: 3,
    institutionName: 'Wells Fargo',
    accountName: 'Everyday Checking',
    accountNumber: '*****7890',
    type: 'Checking',
    status: 'Pending',
    balance: 5000.25,
    lastUpdated: '2025-01-22T09:45:00Z'
  }
];