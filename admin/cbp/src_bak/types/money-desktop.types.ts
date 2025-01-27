import { ChipProps } from '@mui/material';

export type ConnectionStatus = 'Connected' | 'Error' | 'Pending';
export type AccountStatus = 'Active' | 'Inactive' | 'Error' | 'Pending';
export type AccountType = 'Checking' | 'Savings' | 'Credit Card' | 'Investment' | 'Loan';

export interface Connection {
  id: number;
  institutionName: string;
  status: ConnectionStatus;
  lastSync: string;
  accountCount: number;
  totalBalance: number;
  createdAt: string;
  lastError: string | null;
}

export interface Account {
  id: number;
  connectionId: number;
  institutionName: string;
  accountName: string;
  accountNumber: string;
  type: AccountType;
  balance: number;
  status: AccountStatus;
  lastUpdated: string;
}

export type StatusColor = {
  [key in ConnectionStatus | AccountStatus]: ChipProps['color'];





  [key in ConnectionStatus | AccountStatus]: ChipProps['color'];



