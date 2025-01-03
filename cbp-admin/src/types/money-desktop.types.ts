import { ChipProps } from '@mui/material';

export type ConnectionStatus = 'Connected' | 'Error' | 'Pending';
export type AccountStatus = 'Active' | 'Inactive';
export type AccountType = 'Checking' | 'Savings' | 'Credit Card' | 'Investment' | 'Loan';

export interface Connection {
  id: number;
  clientName: string;
  institutionName: string;
  status: ConnectionStatus;
  lastSync: string;
  accounts: number;
  error: string | null;
}

export interface Account {
  id: number;
  clientName: string;
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
};

export interface MoneyDesktopFilters {
  searchTerm: string;
  selectedStatus: 'all' | ConnectionStatus | AccountStatus;
  startDate: string | null;
  endDate: string | null;
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
