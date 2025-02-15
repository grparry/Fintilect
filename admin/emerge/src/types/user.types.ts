export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
  status: 'active' | 'inactive' | 'suspended';
  password: string;
  lastLogin?: string;
  permissions: string[];
  preferences?: {
    theme?: 'light' | 'dark';
    language?: string;
    notifications?: {
      email?: boolean;
      sms?: boolean;
    };
  };
}

export interface UserGroup {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: {
    email: boolean;
    sms: boolean;
  };
}

export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface UserFilters {
  status?: UserStatus;
  role?: string;
  search?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
}
