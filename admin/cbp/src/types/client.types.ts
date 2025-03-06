import type { Dayjs } from 'dayjs';
import type { PaginationOptions, PaginatedResponse } from './common.types';
import type { PasswordPolicy, SecuritySettings } from './security.types';

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

export interface Client {
  id: number;
  externalId?: string;
  name: string;
  tenantId: number;
  isActive: boolean;
  createdOn: string;
  updatedOn?: string;
  type: ClientType;
  status: ClientStatus;
  environment: Environment;
  domain?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  sponsorId?: string;
  routingId?: string;
  require2fa: boolean;
  logoUrl?: string;
}

/**
 * User model that maps to the database Users table
 */
export interface User {
  id: number;
  username: string;
  email?: string;
  mobilePhone?: string;
  tenantId: number;
  isActive: boolean;
  creationDate: string;
  lastLogin?: string;
  externalId?: string;
  clientId: number;
  firstName?: string;
  lastName?: string;
  department?: string;
  isLocked: boolean;
  password?: string;
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
  security?: SecuritySettings;
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
  id: number;
  name: string;
}

export interface Group {
  id: number;
  name?: string;
  clientId: number;
  createdAt: string;
  updatedAt: string;
}

export interface GroupRole {
  groupId: number;
  roleId: number;
}

export interface UserGroup {
  userId: number;
  groupId: number;
}

export interface SecurityRole {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
  isSystem?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  category?: string;
  actions: string[];
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
export type ClientListResponse = PaginatedResponse<Client>;
export type UserListResponse = PaginatedResponse<User>;
export type GroupListResponse = PaginatedResponse<UserGroup>;
export type RoleListResponse = PaginatedResponse<SecurityRole>;

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
}

// Re-export PaginatedResponse for backward compatibility
export type { PaginatedResponse };

// Re-export security types
export type { PasswordPolicy, SecuritySettings } from './security.types';

/**
 * Derived type that represents a flattened view of a user's roles and groups
 * This is returned by the permission service but not stored in the database
 */
export type UserPermissions = {
  roles: Role[];
}
