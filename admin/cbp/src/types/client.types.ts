import { Dayjs } from 'dayjs';
import type { ApiResponse } from './api.types';
import { PaginationOptions } from './common.types';
import { PasswordPolicy, SecuritySettings, AuditLog } from './security.types';

// Payment Types
export type PaymentMethod = 'ACH' | 'Wire' | 'RTP' | 'Check';

// Environment Types
export enum Environment {
  Production = 'PRODUCTION',
  Staging = 'STAGING',
  Development = 'DEVELOPMENT'
}

// Client Types
export enum ClientType {
  Enterprise = 'ENTERPRISE',
  SMB = 'SMB',
  Startup = 'STARTUP',
  Business = 'business',
  Personal = 'personal',
  Standard = 'STANDARD',
  Premium = 'PREMIUM'
}

export enum ClientStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED',
  active = 'active',
  inactive = 'inactive',
  pending = 'pending',
  Pending = 'PENDING'
}

// Date and Time Format Types
export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
export type TimeFormat = '12h' | '24h';
export type NotificationFrequency = 'realtime' | 'daily' | 'weekly' | 'monthly';
export type AlertType = 'payment' | 'security' | 'system';

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  status: ClientStatus;
  environment: Environment;
  domain?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  sponsorId?: string;
  sponsorName?: string;
  routingId?: string;
  settings: ClientSettings;
  createdAt?: string;
  updatedAt?: string;
}

export interface GeneralSettings {
  timezone: string;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
  currency: string;
  language: string;
}

export interface ClientSettings {
  general: GeneralSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  frequency: NotificationFrequency;
  alertTypes: AlertType[];
}

// Client Configuration Types
export interface ClientConfiguration {
  id: number;
  clientId: number;
  maxDailyLimit: number;
  maxTransactionLimit: number;
  allowWeekendProcessing: boolean;
  requireDualApproval: boolean;
  notificationEmail: string;
  lastModified: string;
}

// Client API Types
export interface ClientApiKey {
  id: number;
  clientId: number;
  keyName: string;
  environment: Environment;
  createdAt: string;
  expiresAt: string;
  lastUsed: string | null;
  status: 'Active' | 'Expired' | 'Revoked';
}

// Client Contact Types
export interface ClientContact {
  id: number;
  clientId: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  isPrimary: boolean;
  lastModified: string;
}

// Client Service Types
export interface ClientService {
  id: number;
  clientId: number;
  serviceName: string;
  status: 'Enabled' | 'Disabled';
  startDate: string;
  endDate?: string;
  configuration: Record<string, any>;
}

export enum UserRole {
  Admin = 'Admin',
  Manager = 'Manager',
  User = 'User',
  ReadOnly = 'ReadOnly',
  Support = 'Support'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  LOCKED = 'LOCKED',
  PENDING = 'PENDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Locked = 'LOCKED',
  PendingActivation = 'PENDING_ACTIVATION'
}

export interface User {
  id: string;
  clientId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  status: UserStatus;
  department: string;
  lastLogin: string | null;
  locked: boolean;
  password?: string;
  createdAt: string;
  updatedAt: string;
  groups: UserGroup[];
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  password: string;
  lastLogin?: string | null;
  locked?: boolean;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export type PermissionCategoryType = 
  | 'user'
  | 'client'
  | 'system'
  | 'security'
  | 'settings'
  | 'reports'
  | 'billpay'
  | 'moneydesktop';

export const PERMISSION_CATEGORIES: PermissionCategoryType[] = [
  'user',
  'client',
  'system',
  'security',
  'settings',
  'reports',
  'billpay',
  'moneydesktop'
];

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: PermissionCategoryType;
  actions: string[];
}

export interface SecurityRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroup {
  id: string;
  name: string;
  description: string;
  clientId: string;
  roles: SecurityRole[];
  permissions: Permission[];
  members: string[];
  users: User[];
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  clientId: string;
  roles: SecurityRole[];
  permissions: Permission[];
  members: string[];
  users: User[];
  createdAt: string;
  updatedAt: string;
}

export interface GroupInput {
  name: string;
  description: string;
  roles: string[];
  permissions: string[];
  members: string[];
}

export interface Address {
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactInformation {
  primaryContact: Contact;
  technicalContact: Contact;
  billingContact: Contact;
  emergencyContacts: Contact[];
}

// Contact Types
export type ContactType = 'Primary' | 'Technical' | 'Billing' | 'Emergency';
export type ContactRole = 'Admin' | 'Technical' | 'Business' | 'Billing';
export type NotificationType = 'Email' | 'SMS' | 'Push';

export interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  type: ContactType;
  role: ContactRole;
  notifications: NotificationType[];
  isEmergencyContact?: boolean;
  address?: Address;
}

// List Response Types
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export type ClientListResponse = PaginatedResponse<Client>;
export type UserListResponse = PaginatedResponse<User>;
export type GroupListResponse = PaginatedResponse<UserGroup>;
export type RoleListResponse = PaginatedResponse<SecurityRole>;

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  timezone: string;
  dateFormat: string;
  displayDensity: 'comfortable' | 'compact';
}

export interface UserFilters extends PaginationOptions {
  status?: UserStatus;
  role?: UserRole;
  groupId?: string;
  search?: string;
  lastLoginAfter?: string;
  lastLoginBefore?: string;
}

export interface UserStats {
  totalLogins: number;
  lastActiveDate: string;
  failedLoginAttempts: number;
  accountCreatedAt: string;
  lastPasswordChange: string;
  groupCount: number;
  activeSessionCount: number;
}

export type UsersResponse = PaginatedResponse<User>;

// Audit Log Types
export interface AuditSearchRequest {
  startDate?: string;
  endDate?: string;
  userId?: string;
  action?: string;
  resourceType?: string;
  resourceId?: string;
  page?: number;
  limit?: number;
}

// Re-export ApiResponse type for backwards compatibility
export type { ApiResponse } from './api.types';

// Re-export security types
export type { PasswordPolicy, SecuritySettings, AuditLog } from './security.types';