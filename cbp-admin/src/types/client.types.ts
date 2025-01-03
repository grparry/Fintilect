import { Dayjs } from 'dayjs';

// Payment Types
export type PaymentMethod = 'ACH' | 'Wire' | 'RTP' | 'Check';

// Environment Types
export enum Environment {
  Production = 'production',
  Staging = 'staging',
  Development = 'development'
}

// Client Types
export enum ClientType {
  Enterprise = 'Enterprise',
  Small = 'Small',
  Medium = 'Medium',
  Other = 'Other'
}

export enum ClientStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending'
}

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  status: ClientStatus;
  environment: Environment;
  domain: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  settings: ClientSettings;
  createdAt: string;
  updatedAt: string;
}

export interface GeneralSettings {
  timezone: string;
  dateFormat: string;
  timeFormat: string;
  currency: string;
  language: string;
}

export interface SecuritySettings {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
    expirationDays: number;
  };
  loginPolicy: {
    maxAttempts: number;
    lockoutDuration: number;
  };
  sessionTimeout: number;
  mfaEnabled: boolean;
  ipWhitelist: string[];
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  frequency: 'realtime' | 'daily' | 'weekly';
  alertTypes: string[];
}

export interface BrandingSettings {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  favicon: string;
}

export interface FeatureSettings {
  billPay: boolean;
  moneyDesktop: boolean;
  mobileDeposit: boolean;
  p2p: boolean;
  cardControls: boolean;
}

export interface ClientSettings {
  general: GeneralSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
  branding: BrandingSettings;
  features: FeatureSettings;
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
  Active = 'Active',
  Inactive = 'Inactive',
  Pending = 'Pending',
  Locked = 'Locked'
}

export interface User {
  id: number;
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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
