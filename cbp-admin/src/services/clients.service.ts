import { api } from '../utils/api';
import type { ApiResponse } from '../utils/api';

// Types based on API schema
export type ClientType = 'ENTERPRISE' | 'SMB' | 'STARTUP';
export type ClientStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
export type ClientEnvironment = 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  status: ClientStatus;
  environment: ClientEnvironment;
}

export interface ClientSettings {
  general?: {
    timezone?: string;
    dateFormat?: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
    timeFormat?: '12h' | '24h';
    currency?: string;
    language?: string;
  };
  security?: {
    passwordPolicy?: {
      minLength?: number;
      requireUppercase?: boolean;
      requireLowercase?: boolean;
      requireNumbers?: boolean;
      requireSpecialChars?: boolean;
      expirationDays?: number;
    };
    loginPolicy?: {
      maxAttempts?: number;
      lockoutDuration?: number;
    };
    sessionTimeout?: number;
    mfaEnabled?: boolean;
    ipWhitelist?: string[];
  };
  notifications?: {
    emailEnabled?: boolean;
    smsEnabled?: boolean;
    pushEnabled?: boolean;
    frequency?: 'realtime' | 'daily' | 'weekly' | 'monthly';
    alertTypes?: Array<'payment' | 'security' | 'system'>;
  };
}

export interface User {
  id: string;
  clientId: string;
  email: string;
  firstName: string;
  lastName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'LOCKED';
  role: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserGroup {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  members: string[];
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  scope: 'READ' | 'WRITE' | 'ADMIN';
}

export interface SecurityRole {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ClientListResponse {
  items: Client[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ClientCreateRequest extends Omit<Client, 'id'> {}
export interface ClientUpdateRequest extends Partial<Omit<Client, 'id'>> {}

export interface AuditLog {
  id: string;
  clientId: string;
  timestamp: string;
  eventType: string;
  userId: string;
  ipAddress: string;
  description: string;
}

export interface AuditSearchRequest {
  timestampFrom?: string;
  timestampTo?: string;
  eventType?: string;
  userId?: string;
  ipAddress?: string;
  description?: string;
}

/**
 * Service for managing clients and their settings
 */
export class ClientService {
  private static instance: ClientService;
  private readonly basePath = '/admin/client-management';

  private constructor() {}

  public static getInstance(): ClientService {
    if (!ClientService.instance) {
      ClientService.instance = new ClientService();
    }
    return ClientService.instance;
  }

  /**
   * Get a list of all clients with pagination
   */
  async getClients(page: number = 1, limit: number = 20): Promise<ApiResponse<ClientListResponse>> {
    return api.get(`${this.basePath}/list`, {
      params: { page, limit }
    });
  }

  /**
   * Get a single client by ID
   */
  async getClient(id: string): Promise<ApiResponse<Client>> {
    return api.get(`${this.basePath}/${id}`);
  }

  /**
   * Create a new client
   */
  async createClient(data: Partial<Client>): Promise<ApiResponse<Client>> {
    return api.post(this.basePath, data);
  }

  /**
   * Update an existing client
   */
  async updateClient(id: string, data: Partial<Client>): Promise<ApiResponse<Client>> {
    return api.put(`${this.basePath}/${id}`, data);
  }

  /**
   * Get client settings
   */
  async getClientSettings(id: string): Promise<ApiResponse<ClientSettings>> {
    return api.get(`${this.basePath}/${id}/settings`);
  }

  /**
   * Update client settings
   */
  async updateClientSettings(id: string, settings: Partial<ClientSettings>): Promise<ApiResponse<ClientSettings>> {
    return api.put(`${this.basePath}/${id}/settings`, settings);
  }

  /**
   * Delete a client
   */
  async deleteClient(id: string): Promise<ApiResponse<void>> {
    return api.delete(`${this.basePath}/${id}`);
  }

  // User Management
  /**
   * Get all users for a client
   */
  async getClientUsers(clientId: string, page: number = 1, limit: number = 20): Promise<ApiResponse<{ items: User[]; pagination: { total: number; page: number; limit: number; pages: number } }>> {
    return api.get(`${this.basePath}/${clientId}/users`, {
      params: { page, limit }
    });
  }

  /**
   * Get a specific user
   */
  async getClientUser(clientId: string, userId: string): Promise<ApiResponse<User>> {
    return api.get(`${this.basePath}/${clientId}/users/${userId}`);
  }

  /**
   * Create a new user
   */
  async createClientUser(clientId: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return api.post(`${this.basePath}/${clientId}/users`, userData);
  }

  /**
   * Update a user
   */
  async updateClientUser(clientId: string, userId: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return api.put(`${this.basePath}/${clientId}/users/${userId}`, userData);
  }

  /**
   * Delete a user
   */
  async deleteClientUser(clientId: string, userId: string): Promise<ApiResponse<void>> {
    return api.delete(`${this.basePath}/${clientId}/users/${userId}`);
  }

  // Group Management
  /**
   * Get all groups for a client
   */
  async getGroups(clientId: string, page: number = 1, limit: number = 20): Promise<ApiResponse<{ items: UserGroup[]; pagination: { total: number; page: number; limit: number; pages: number } }>> {
    return api.get(`${this.basePath}/${clientId}/groups`, {
      params: { page, limit }
    });
  }

  /**
   * Get a specific group
   */
  async getGroup(clientId: string, groupId: string): Promise<ApiResponse<UserGroup>> {
    return api.get(`${this.basePath}/${clientId}/groups/${groupId}`);
  }

  /**
   * Create a new group
   */
  async createGroup(clientId: string, groupData: Partial<UserGroup>): Promise<ApiResponse<UserGroup>> {
    return api.post(`${this.basePath}/${clientId}/groups`, groupData);
  }

  /**
   * Update a group
   */
  async updateGroup(clientId: string, groupId: string, groupData: Partial<UserGroup>): Promise<ApiResponse<UserGroup>> {
    return api.put(`${this.basePath}/${clientId}/groups/${groupId}`, groupData);
  }

  /**
   * Delete a group
   */
  async deleteGroup(clientId: string, groupId: string): Promise<ApiResponse<void>> {
    return api.delete(`${this.basePath}/${clientId}/groups/${groupId}`);
  }

  // Role Management
  /**
   * Get all roles
   */
  async getRoles(page: number = 1, limit: number = 20): Promise<ApiResponse<{ items: SecurityRole[]; pagination: { total: number; page: number; limit: number; pages: number } }>> {
    return api.get(`${this.basePath}/roles`, {
      params: { page, limit }
    });
  }

  /**
   * Get a specific role
   */
  async getRole(roleId: string): Promise<ApiResponse<SecurityRole>> {
    return api.get(`${this.basePath}/roles/${roleId}`);
  }

  /**
   * Create a new role
   */
  async createRole(roleData: Partial<SecurityRole>): Promise<ApiResponse<SecurityRole>> {
    return api.post(`${this.basePath}/roles`, roleData);
  }

  /**
   * Update a role
   */
  async updateRole(roleId: string, roleData: Partial<SecurityRole>): Promise<ApiResponse<SecurityRole>> {
    return api.put(`${this.basePath}/roles/${roleId}`, roleData);
  }

  /**
   * Delete a role
   */
  async deleteRole(roleId: string): Promise<ApiResponse<void>> {
    return api.delete(`${this.basePath}/roles/${roleId}`);
  }

  // Permission Management
  /**
   * Get all permissions
   */
  async getPermissions(): Promise<ApiResponse<Permission[]>> {
    return api.get(`${this.basePath}/permissions`);
  }

  /**
   * Search audit logs for a client
   */
  async searchAuditLogs(clientId: string, request: AuditSearchRequest): Promise<ApiResponse<AuditLog[]>> {
    return api.post(`${this.basePath}/${clientId}/audit/search`, request);
  }

  /**
   * Get client audit log
   */
  async getClientAuditLog(clientId: string, from?: string, to?: string): Promise<ApiResponse<AuditLog[]>> {
    return api.get(`${this.basePath}/${clientId}/audit-log`, {
      params: { from, to }
    });
  }
}

export const clientService = ClientService.getInstance();
