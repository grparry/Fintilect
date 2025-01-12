import { Dayjs } from 'dayjs';
import { ApiResponse } from '../utils/api';

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
  Startup = 'STARTUP'
}

export enum ClientStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Suspended = 'SUSPENDED'
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

export interface PasswordPolicy {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSpecialChars: boolean;
  expirationDays: number;
}

export interface LoginPolicy {
  maxAttempts: number;
  lockoutDuration: number;
}

export interface SecuritySettings {
  passwordPolicy: PasswordPolicy;
  loginPolicy: LoginPolicy;
  sessionTimeout: number;
  mfaEnabled: boolean;
  ipWhitelist: string[];
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  frequency: NotificationFrequency;
  alertTypes: AlertType[];
}

export interface ClientSettings {
  general: GeneralSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
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
  PENDING = 'PENDING'
}

export interface User {
  id: string;
  clientId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  lastLogin: string | null;
  locked: boolean;
  password?: string;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface AuditSearchRequest {
  startDate: string;
  endDate: string;
  username: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  action: string;
  userId: string;
  userName: string;
  resourceType: string;
  resourceId: string;
  details: string;
  status: string;
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

// Re-export ApiResponse type for backwards compatibility
export type { ApiResponse } from '../utils/api';
