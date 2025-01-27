

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  accountNumber: string;
  status: MemberStatus;
  joinDate: string;
  lastLogin: string;
  address?: Address;
  accounts?: Account[];
  alerts?: Alert[];
  devices?: Device[];
  securitySettings?: SecuritySettings;
}
export type MemberStatus = 'Active' | 'Inactive' | 'Suspended' | 'Pending';
export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  severity: AlertSeverity;
  createdAt: string;
  expiresAt?: string;
  acknowledged: boolean;
}
export type AlertType = 'Security' | 'Account' | 'Transaction' | 'System';
export type AlertSeverity = 'info' | 'warning' | 'error';
export interface MemberSearchFilters {
  searchTerm: string;
  searchType: 'accountNumber' | 'name' | 'email' | 'phone';
  status: MemberStatus | 'all';
  startDate?: string;
  endDate?: string;
  alertType?: AlertType | 'all';
}
export interface MemberSearchResult {
  totalCount: number;
  members: Member[];
}
export interface MemberDashboardStats {
  totalMembers: number;
  activeMembers: number;
  newMembersToday: number;
  activeAlerts: number;
  membersByStatus: {
    [key in MemberStatus]: number;
  };
  alertsByType: {
    [key in AlertType]: number;
  };
}
export interface MemberActivity {
  id: string;
  memberId: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  ipAddress?: string;
  device?: string;
}
export type ActivityType = 
  | 'Login'
  | 'Logout'
  | 'PasswordChange'
  | 'ProfileUpdate'
  | 'AccountAccess'
  | 'TransactionInitiated'
  | 'AlertAcknowledged';
// Payment and Account Types
export type PaymentStatus = 'Completed' | 'Pending' | 'Failed' | 'Scheduled' | 'Cancelled';
export type AccountType = 'Checking' | 'Savings' | 'Credit' | 'Debit';
export type AccountStatus = 'Primary' | 'Active' | 'Inactive' | 'Suspended';
export type PayeeStatus = 'Active' | 'Inactive' | 'Pending' | 'Suspended';
// Device and Service Types
export type DeviceType = 'Mobile' | 'Desktop' | 'Tablet' | 'Other';
export type DeviceStatus = 'Active' | 'Inactive' | 'Blocked' | 'Unverified';
export type ServiceStatus = 'Available' | 'Unavailable' | 'Maintenance';
// Security Types
export interface SecurityQuestion {
  question: string;
  isSet: boolean;
}
// Service Types
export interface EnrolledService {
  id: number;
  name: string;
  status: ServiceStatus;
  enrollDate?: string | null;
}
// Search Types
export type SearchType = 'accountNumber' | 'name' | 'email' | 'phone';
export interface SearchOption {
  value: SearchType;
  label: string;
}
export interface SearchResult {
  id: string;
  name: string;
  email: string;
  status: MemberStatus;
}
// Member Dashboard Interface
export interface MemberDashboard {
  recentPayments: Array<{
    date: string;
    amount: number;
    status: PaymentStatus;
    description: string;
  }>;
  accountSummary: {
    totalPayments: number;
    activePayees: number;
    pendingPayments: number;
  };
  paymentAccounts: Array<{
    id: number;
    type: AccountType;
    number: string;
    status: AccountStatus;
  }>;
  payees: Array<{
    id: number;
    name: string;
    accountNumber: string;
    lastPayment: string;
    status: PayeeStatus;
  }>;
  scheduledPayments: Array<{
    id: number;
    payee: string;
    amount: number;
    date: string;
    status: PaymentStatus;
  }>;
  alerts: Array<{
    id: number;
    type: AlertType;
    message: string;
  }>;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    dateOfBirth: string;
    ssn: string;
  };
  security?: {
    twoFactorEnabled: boolean;
    lastLogin: string;
    passwordLastChanged: string;
    securityQuestions: SecurityQuestion[];
  };
  devices?: Array<{
    id: number;
    type: DeviceType;
    name: string;
    lastAccess: string;
    status: DeviceStatus;
  }>;
  serviceStatus?: {
    billPay: ServiceStatus;
    transfers: ServiceStatus;
    statements: ServiceStatus;
  };
  accounts?: Array<{
    id: number;
    type: AccountType;
    number: string;
    balance: number;
    status: AccountStatus;
  }>;
  otherServices?: EnrolledService[];
}
export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  preferredMethod: 'email' | 'sms';
  lastUpdated: string;
}
export interface Device {
  id: string;
  name: string;
  type: string;
  lastUsed: string;
  lastAccess: string;
  status: DeviceStatus;
  trusted: boolean;
  browser?: string;
  operatingSystem?: string;
  location?: string;
}
export interface Account {
  id: string;
  accountNumber: string;
  type: 'checking' | 'savings' | 'loan' | 'credit' | 'investment';
  status: 'active' | 'inactive' | 'frozen' | 'closed';
  balance: number;
  currency: string;
  lastTransaction?: string;
  openDate: string;
  nickname?: string;
  routingNumber: string;
  interestRate?: number;
  minimumBalance?: number;
  overdraftLimit?: number;
}