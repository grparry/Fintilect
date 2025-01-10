import { ApiResponse, ApiSuccessResponse } from '../../types/api.types';
import { 
  Client, 
  ClientSettings,
  User,
  UserRole,
  UserStatus,
  UserGroup,
  SecurityRole,
  Permission,
  AuditLog,
  AuditSearchRequest,
  SecuritySettings,
  NotificationSettings,
  BrandingSettings,
  FeatureSettings
} from '../../types/client.types';
import api from '../api';
import { mockClients, mockUsers, defaultSettings, mockGroups, mockPermissions, mockRoles } from '../../mocks/client-management/mockClientData';

const mergeSettings = (defaultSettings: ClientSettings, clientSettings: ClientSettings): ClientSettings => ({
  ...defaultSettings,
  ...clientSettings,
});

const generateId = () => Math.random().toString(36).substr(2, 9);

export interface CreditUnionResponse {
  sponsorId: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
  type: 'ENTERPRISE' | 'SMALL' | 'MEDIUM' | 'OTHER';
  domain: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  settings: {
    general: ClientSettings['general'];
    security: ClientSettings['security'];
    notifications: ClientSettings['notifications'];
    branding: ClientSettings['branding'];
    features: ClientSettings['features'];
  };
  createdDate: string;
  lastModifiedDate: string;
}

export interface CreditUnionRequest {
  sponsorId: string;
  name: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT';
  type: 'ENTERPRISE' | 'SMALL' | 'MEDIUM' | 'OTHER';
  domain: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  settings: {
    general: ClientSettings['general'];
    security: ClientSettings['security'];
    notifications: ClientSettings['notifications'];
    branding: ClientSettings['branding'];
    features: ClientSettings['features'];
  };
}

// Mapping functions
export const mapFromCreditUnionResponse = (response: CreditUnionResponse): Client => ({
  id: response.sponsorId,
  name: response.name,
  type: response.type as Client['type'],
  status: response.status as Client['status'],
  environment: response.environment as Client['environment'],
  domain: response.domain,
  contactName: response.contact.name,
  contactEmail: response.contact.email,
  contactPhone: response.contact.phone,
  settings: response.settings || defaultSettings,
  createdAt: response.createdDate,
  updatedAt: response.lastModifiedDate,
});

export const mapToCreditUnionResponse = (client: Client): Omit<CreditUnionResponse, 'createdDate' | 'lastModifiedDate'> => ({
  sponsorId: client.id,
  name: client.name,
  type: client.type.toUpperCase() as CreditUnionResponse['type'],
  status: client.status.toUpperCase() as CreditUnionResponse['status'],
  environment: client.environment.toUpperCase() as CreditUnionResponse['environment'],
  domain: client.domain,
  contact: {
    name: client.contactName,
    email: client.contactEmail,
    phone: client.contactPhone,
  },
  settings: client.settings,
});

export class CreditUnionApi {
  private readonly baseUrl = '/api/v1/creditunion';
  private useMockData: boolean;

  constructor(useMockData = false) {
    this.useMockData = useMockData;
  }

  isMockDataEnabled(): boolean {
    return this.useMockData;
  }

  // Client Management
  async getAll(): Promise<Client[]> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      return mockClients;
    }

    const response = await api.get<ApiSuccessResponse<CreditUnionResponse[]>>(`${this.baseUrl}/all`);
    return response.data.data.map(mapFromCreditUnionResponse);
  }

  async getById(sponsorId: string): Promise<Client> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const client = mockClients.find(c => c.id === sponsorId);
      if (!client) throw new Error('Client not found');
      return client;
    }

    const response = await api.get<ApiSuccessResponse<CreditUnionResponse>>(`${this.baseUrl}/${sponsorId}`);
    return mapFromCreditUnionResponse(response.data.data);
  }

  async createClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    if (this.useMockData) {
      const timestamp = new Date().toISOString();
      const newClient: Client = {
        ...client,
        id: Math.random().toString(36).substr(2, 9),
        settings: {
          ...defaultSettings,
          ...client.settings,
        },
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      return newClient;
    }

    const mappedRequest = mapToCreditUnionResponse(client as Client);
    const response = await api.post<ApiSuccessResponse<CreditUnionResponse>>(`${this.baseUrl}/create`, mappedRequest);
    return mapFromCreditUnionResponse(response.data.data);
  }

  async update(sponsorId: string, client: Partial<Client>): Promise<Client> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const index = mockClients.findIndex(c => c.id === sponsorId);
      if (index === -1) throw new Error('Client not found');
      mockClients[index] = { ...mockClients[index], ...client };
      return mockClients[index];
    }

    const mappedData = mapToCreditUnionResponse({ ...client, id: sponsorId } as Client);
    const response = await api.put<ApiSuccessResponse<CreditUnionResponse>>(this.baseUrl, {
      ...mappedData,
      sponsorId,
    });
    return mapFromCreditUnionResponse(response.data.data);
  }

  // User Management
  async getUsers(clientId: string): Promise<User[]> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockUsers;
    }

    const response = await api.get<ApiSuccessResponse<User[]>>(`${this.baseUrl}/${clientId}/users`);
    return response.data.data;
  }

  async getUser(clientId: string, userId: string): Promise<User> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = mockUsers.find(u => String(u.id) === userId);
      if (!user) {
        throw new Error(`User with id ${userId} not found`);
      }
      return user;
    }

    const response = await api.get<ApiSuccessResponse<User>>(`${this.baseUrl}/${clientId}/users/${userId}`);
    return response.data.data;
  }

  async createUser(clientId: string, userData: Partial<User>): Promise<User> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newUser: User = {
        id: Date.now(),
        username: userData.username || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        role: userData.role || UserRole.User,
        status: userData.status || UserStatus.ACTIVE,
        department: userData.department || '',
        lastLogin: null,
        locked: false,
      };
      return newUser;
    }

    const response = await api.post<ApiSuccessResponse<User>>(`${this.baseUrl}/${clientId}/users`, userData);
    return response.data.data;
  }

  async updateUser(clientId: string, userId: string, userData: Partial<User>): Promise<User> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const user = await this.getUser(clientId, userId);
      return {
        ...user,
        ...userData,
      };
    }

    const response = await api.put<ApiSuccessResponse<User>>(`${this.baseUrl}/${clientId}/users/${userId}`, userData);
    return response.data.data;
  }

  async deleteUser(clientId: string, userId: string): Promise<void> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return;
    }

    await api.delete(`${this.baseUrl}/${clientId}/users/${userId}`);
  }

  // Group Management
  async getGroups(clientId: string): Promise<UserGroup[]> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockGroups;
    }

    const response = await api.get<ApiSuccessResponse<UserGroup[]>>(`${this.baseUrl}/${clientId}/groups`);
    return response.data.data;
  }

  async getGroup(clientId: string, groupId: string): Promise<UserGroup> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const group = mockGroups.find(g => g.id === groupId);
      if (!group) {
        throw new Error(`Group with id ${groupId} not found`);
      }
      return group;
    }

    const response = await api.get<ApiSuccessResponse<UserGroup>>(`${this.baseUrl}/${clientId}/groups/${groupId}`);
    return response.data.data;
  }

  async createGroup(clientId: string, groupData: Partial<UserGroup>): Promise<UserGroup> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newGroup: UserGroup = {
        id: String(Date.now()),
        name: groupData.name || '',
        description: groupData.description || '',
        clientId,
        roles: groupData.roles || [],
        permissions: groupData.permissions || [],
        members: groupData.members || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockGroups.push(newGroup);
      return newGroup;
    }

    const response = await api.post<ApiSuccessResponse<UserGroup>>(`${this.baseUrl}/${clientId}/groups`, groupData);
    return response.data.data;
  }

  async updateGroup(clientId: string, groupId: string, groupData: Partial<UserGroup>): Promise<UserGroup> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const groupIndex = mockGroups.findIndex(g => g.id === groupId);
      if (groupIndex === -1) {
        throw new Error(`Group with id ${groupId} not found`);
      }
      const updatedGroup = {
        ...mockGroups[groupIndex],
        ...groupData,
        updatedAt: new Date().toISOString(),
      };
      mockGroups[groupIndex] = updatedGroup;
      return updatedGroup;
    }

    const response = await api.put<ApiSuccessResponse<UserGroup>>(`${this.baseUrl}/${clientId}/groups/${groupId}`, groupData);
    return response.data.data;
  }

  async deleteGroup(clientId: string, groupId: string): Promise<void> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const groupIndex = mockGroups.findIndex(g => g.id === groupId);
      if (groupIndex === -1) {
        throw new Error(`Group with id ${groupId} not found`);
      }
      mockGroups.splice(groupIndex, 1);
      return;
    }

    await api.delete(`${this.baseUrl}/${clientId}/groups/${groupId}`);
  }

  // Role Management
  async getRoles(): Promise<SecurityRole[]> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockRoles;
    }

    const response = await api.get<ApiSuccessResponse<SecurityRole[]>>(`${this.baseUrl}/roles`);
    return response.data.data;
  }

  async getRole(roleId: string): Promise<SecurityRole> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const role = mockRoles.find(r => r.id === roleId);
      if (!role) {
        throw new Error(`Role with id ${roleId} not found`);
      }
      return role;
    }

    const response = await api.get<ApiSuccessResponse<SecurityRole>>(`${this.baseUrl}/roles/${roleId}`);
    return response.data.data;
  }

  async createRole(roleData: Partial<SecurityRole>): Promise<SecurityRole> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newRole: SecurityRole = {
        id: String(Date.now()),
        name: roleData.name || '',
        description: roleData.description || '',
        permissions: roleData.permissions || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      mockRoles.push(newRole);
      return newRole;
    }

    const response = await api.post<ApiSuccessResponse<SecurityRole>>(`${this.baseUrl}/roles`, roleData);
    return response.data.data;
  }

  async updateRole(roleId: string, roleData: Partial<SecurityRole>): Promise<SecurityRole> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const roleIndex = mockRoles.findIndex(r => r.id === roleId);
      if (roleIndex === -1) {
        throw new Error(`Role with id ${roleId} not found`);
      }
      const updatedRole = {
        ...mockRoles[roleIndex],
        ...roleData,
        updatedAt: new Date().toISOString(),
      };
      mockRoles[roleIndex] = updatedRole;
      return updatedRole;
    }

    const response = await api.put<ApiSuccessResponse<SecurityRole>>(`${this.baseUrl}/roles/${roleId}`, roleData);
    return response.data.data;
  }

  async deleteRole(roleId: string): Promise<void> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const roleIndex = mockRoles.findIndex(r => r.id === roleId);
      if (roleIndex === -1) {
        throw new Error(`Role with id ${roleId} not found`);
      }
      mockRoles.splice(roleIndex, 1);
      return;
    }

    await api.delete(`${this.baseUrl}/roles/${roleId}`);
  }

  // Permissions Management
  async getPermissions(): Promise<Permission[]> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockPermissions;
    }

    const response = await api.get<ApiSuccessResponse<Permission[]>>(`${this.baseUrl}/permissions`);
    return response.data.data;
  }

  // Audit Logs
  async getAuditLogs(clientId: string, filters: AuditSearchRequest): Promise<AuditLog[]> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [];
    }

    const response = await api.get<ApiSuccessResponse<AuditLog[]>>(`${this.baseUrl}/${clientId}/audit-logs`, {
      params: filters,
    });
    return response.data.data;
  }

  async exportAuditLogs(clientId: string, filters: AuditSearchRequest): Promise<void> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return;
    }

    await api.get(`${this.baseUrl}/${clientId}/audit-logs/export`, {
      params: filters,
      responseType: 'blob',
    });
  }

  async searchAuditLogs(clientId: string, searchRequest: AuditSearchRequest): Promise<AuditLog[]> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [];
    }

    const response = await api.post<ApiSuccessResponse<AuditLog[]>>(
      `${this.baseUrl}/${clientId}/audit-logs/search`,
      searchRequest
    );
    return response.data.data;
  }

  // Settings Management
  async updateSecuritySettings(id: string, settings: SecuritySettings): Promise<SecuritySettings> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        ...defaultSettings.security,
        ...settings,
      };
    }

    const response = await api.put<ApiSuccessResponse<SecuritySettings>>(
      `${this.baseUrl}/${id}/settings/security`,
      settings
    );
    return response.data.data;
  }

  async updateNotificationSettings(id: string, settings: NotificationSettings): Promise<NotificationSettings> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        ...defaultSettings.notifications,
        ...settings,
      };
    }

    const response = await api.put<ApiSuccessResponse<NotificationSettings>>(
      `${this.baseUrl}/${id}/settings/notifications`,
      settings
    );
    return response.data.data;
  }

  async updateBrandingSettings(id: string, settings: BrandingSettings): Promise<BrandingSettings> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        ...defaultSettings.branding,
        ...settings,
      };
    }

    const response = await api.put<ApiSuccessResponse<BrandingSettings>>(
      `${this.baseUrl}/${id}/settings/branding`,
      settings
    );
    return response.data.data;
  }

  async updateFeatureSettings(id: string, settings: FeatureSettings): Promise<FeatureSettings> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        ...defaultSettings.features,
        ...settings,
      };
    }

    const response = await api.put<ApiSuccessResponse<FeatureSettings>>(
      `${this.baseUrl}/${id}/settings/features`,
      settings
    );
    return response.data.data;
  }

  async getClientSecuritySettings(clientId: string): Promise<SecuritySettings> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return defaultSettings.security;
    }

    const response = await api.get<ApiSuccessResponse<SecuritySettings>>(
      `${this.baseUrl}/${clientId}/settings/security`
    );
    return response.data.data;
  }

  async updateClientSecuritySettings(clientId: string, settings: SecuritySettings): Promise<SecuritySettings> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        ...defaultSettings.security,
        ...settings,
      };
    }

    const response = await api.put<ApiSuccessResponse<SecuritySettings>>(
      `${this.baseUrl}/${clientId}/settings/security`,
      settings
    );
    return response.data.data;
  }
}
