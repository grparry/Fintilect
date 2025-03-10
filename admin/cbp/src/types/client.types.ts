import type { Dayjs } from 'dayjs';
import type { PaginationOptions, PaginatedResponse } from './common.types';
import type { PasswordPolicy, SecuritySettings } from './security.types';

// Payment Types
export type PaymentMethod = 'ACH' | 'Wire' | 'RTP' | 'Check';

// Environment Types
export type Environment = 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';

// Client Types
export type ClientType = 'ENTERPRISE' | 'SMB' | 'STARTUP' | 'STANDARD';

// Client Status Types
export type ClientStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface Client {
  id: number;
  name: string | null;
  tenantId: number;
  isActive: boolean;
  createdOn: string;
  updatedOn: string | null;
  type: string | null;
  status: string | null;
  environment: string | null;
  domain: string | null;
  sponsorId: number | null;
  routingId: string | null;
  require2FA: boolean;
  logoUrl: string | null;
}

export interface ClientUpdateRequest {
  /** @maxLength 255 @minLength 0 */
  name: string;
  /** @maxLength 255 @minLength 0 */
  domain: string;
  /** @maxLength 50 @minLength 0 */
  environment: string;
  /** @maxLength 50 @minLength 0 */
  type: string;
  /** @maxLength 50 @minLength 0 */
  status: string;
  isActive?: boolean;
  tenantId?: number;
}

export interface ClientAddRequest {
  /** @maxLength 255 @minLength 0 */
  name: string;
  /** @maxLength 255 @minLength 0 */
  domain: string;
  /** @maxLength 50 @minLength 0 */
  environment: string;
  /** @maxLength 50 @minLength 0 */
  type: string;
  /** @maxLength 50 @minLength 0 */
  status: string;
  tenantId?: number;
  isActive?: boolean;
}

export interface ClientAuthenticationRequest {
  username: string;
  password: string;
  clientId: number;
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
  invalidAttempts?: number;
  forcePasswordChange?: boolean;
  outSystemsPassword?: string;
  clientName?: string;
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
  name: string | null;
  email: string | null;
  phone: string | null;
  isPrimary: boolean;
  createdOn: string;
  updatedOn: string | null;
  isActive: boolean;
}

export interface ClientContactAddRequest {
  clientId: number;
  name: string;
  email: string;
  phone?: string;
  isPrimary: boolean;
}

export interface ClientContactUpdateRequest {
  id: number;
  name: string;
  email: string;
  phone?: string;
  isPrimary: boolean;
  isActive: boolean;
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
  description?: string;
  clientId: number;
  createdAt?: string;
  updatedAt?: string;
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
export interface ClientListResponse {
  clients: Client[] | null;
}
export type _ClientListResponse = PaginatedResponse<Client>;
export interface UserListResponse {
  users: User[];
}
export interface GroupListResponse {
  groups: Group[];
}
export interface RoleListResponse {
  roles: Role[];
}

export interface UserGroupListResponse {
  userGroups: UserGroup[];
}

export interface GroupRoleListResponse {
  groupRoles: GroupRole[];
}

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
