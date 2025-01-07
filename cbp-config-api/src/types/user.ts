export interface UserDetails {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName?: string;
  lastName?: string;
  accountNumber?: string;
  ssn?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserPreferences {
  theme: string;
  language: string;
  notifications: boolean;
  timezone?: string;
  currency?: string;
  dateFormat?: string;
  timeFormat?: string;
}

export interface JwtUser {
  id: string;
  email: string;
  roles: string[];
}

export interface UserCreateData {
  username: string;
  email: string;
  password: string;
  role: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface UserUpdateData {
  username?: string;
  email?: string;
  role?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  status?: string;
}
