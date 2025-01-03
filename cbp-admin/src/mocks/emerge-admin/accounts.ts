import { Account } from '../../types/member-center.types';

export const mockAccounts: Account[] = [
  {
    id: '1',
    accountNumber: 'CHK-1234',
    type: 'checking',
    status: 'active',
    balance: 5000.00,
    currency: 'USD',
    lastTransaction: '2024-01-15T10:30:00',
    openDate: '2023-01-15',
    nickname: 'Primary Checking',
    routingNumber: '123456789',
    minimumBalance: 100,
    overdraftLimit: 1000
  },
  {
    id: '2',
    accountNumber: 'SAV-5678',
    type: 'savings',
    status: 'active',
    balance: 15000.00,
    currency: 'USD',
    lastTransaction: '2024-01-14T15:45:00',
    openDate: '2023-01-15',
    nickname: 'Emergency Fund',
    routingNumber: '123456789',
    interestRate: 0.025
  },
  {
    id: '3',
    accountNumber: 'CC-9012',
    type: 'credit',
    status: 'active',
    balance: -1500.00,
    currency: 'USD',
    lastTransaction: '2024-01-13T11:20:00',
    openDate: '2023-06-01',
    nickname: 'Rewards Credit Card',
    routingNumber: '123456789',
    interestRate: 0.1499
  }
];
