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
  lastError: string | null;
}

export type StatusColor = {
  [key in ConnectionStatus | AccountStatus]: ChipProps['color'];
};

export interface MoneyDesktopFilters {
  searchTerm: string;
  status?: ConnectionStatus | AccountStatus;
  type?: AccountType;
  dateRange?: { start: string; end: string };
}

export interface SyncDialogProps {
  open: boolean;
  onClose: () => void;
  connection: Connection | null;
  onSync: (connection: Connection) => void;
}

export interface DetailsDialogProps {
  open: boolean;
  onClose: () => void;
  item: Connection | Account | null;
  type: 'connection' | 'account';
  onSync?: (connection: Connection) => void;
}
