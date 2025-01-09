import api from './api';
import { CreditUnionApi } from './api/creditUnion.api';
import { 
  Client, 
  ClientType, 
  ClientStatus, 
  Environment,
  User,
  UserRole,
  UserStatus,
  UserGroup,
  SecurityRole,
  Permission,
  SecuritySettings,
  NotificationSettings,
  BrandingSettings,
  FeatureSettings,
  AuditLog,
  AuditSearchRequest,
  ApiResponse
} from '../types/client.types';
import { mockClients } from '../mocks/client-management/clients';
import { mockPermissions } from '../mocks/client-management/permissions';
import { mockGroups } from '../mocks/client-management/groups';
import { mockRoles } from '../mocks/client-management/roles';
import { shouldUseMockData } from '../config/api.config';
import dayjs from 'dayjs';

class ClientService {
  private readonly baseUrl = '/api/clients';
  private readonly api: CreditUnionApi;
  private static instance: ClientService;

  private constructor() {
    this.api = new CreditUnionApi(shouldUseMockData());
  }

  public static getInstance(): ClientService {
    if (!ClientService.instance) {
      ClientService.instance = new ClientService();
    }
    return ClientService.instance;
  }

  // For testing purposes
  public static resetInstance(): void {
    ClientService.instance = new ClientService();
  }

  // Client Management
  async getClients(): Promise<Client[]> {
    if (this.api.isMockDataEnabled()) {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockClients;
    }

    const response = await this.api.getAll();
    return response;
  }

  async getClient(id: string): Promise<Client> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const client = mockClients.find(c => c.id === id);
      if (!client) {
        throw new Error(`Client with id ${id} not found`);
      }
      return client;
    }

    return this.api.getById(id);
  }

  async updateClient(id: string, data: Partial<Client>): Promise<Client> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const existingClient = mockClients.find(c => c.id === id);
      if (!existingClient) {
        throw new Error(`Client with id ${id} not found`);
      }
      const updatedClient = {
        ...existingClient,
        ...data,
        updatedAt: new Date().toISOString(),
      };
      return updatedClient;
    }

    return this.api.update(id, data);
  }

  async createClient(clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const timestamp = new Date().toISOString();
      const newClient: Client = {
        id: Math.random().toString(36).substr(2, 9),
        name: clientData.name,
        type: clientData.type,
        status: clientData.status,
        environment: clientData.environment,
        domain: clientData.domain,
        contactName: clientData.contactName,
        contactEmail: clientData.contactEmail,
        contactPhone: clientData.contactPhone,
        settings: clientData.settings,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
      return newClient;
    }

    return this.api.createClient(clientData);
  }

  // User Management
  async getUsers(clientId: string): Promise<User[]> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          id: 1,
          username: 'john.doe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          role: UserRole.Admin,
          status: UserStatus.Active,
          department: 'IT',
          lastLogin: new Date().toISOString(),
          locked: false,
        },
        {
          id: 2,
          username: 'jane.smith',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          role: UserRole.Manager,
          status: UserStatus.Active,
          department: 'Operations',
          lastLogin: new Date().toISOString(),
          locked: false,
        },
      ];
    }

    return this.api.getUsers(clientId);
  }

  async getUser(clientId: string, userId: string): Promise<User> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const users = await this.getUsers(clientId);
      const user = users.find(u => String(u.id) === userId);
      if (!user) {
        throw new Error(`User with id ${userId} not found`);
      }
      return user;
    }

    return this.api.getUser(clientId, userId);
  }

  async createUser(clientId: string, userData: Partial<User>): Promise<User> {
    if (this.api.isMockDataEnabled()) {
      const timestamp = new Date().toISOString();
      return {
        id: Date.now(),
        username: userData.username || '',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        role: userData.role || UserRole.ReadOnly,
        status: userData.status || UserStatus.Pending,
        department: userData.department || '',
        lastLogin: null,
        locked: false,
      };
    }

    return this.api.createUser(clientId, userData);
  }

  async updateUser(clientId: string, userId: string, userData: Partial<User>): Promise<User> {
    if (this.api.isMockDataEnabled()) {
      const user = await this.getUser(clientId, userId);
      return {
        ...user,
        ...userData,
      };
    }

    return this.api.updateUser(clientId, userId, userData);
  }

  async deleteUser(clientId: string, userId: string): Promise<void> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return;
    }

    return this.api.deleteUser(clientId, userId);
  }

  // Group Management
  async getGroups(clientId: string): Promise<UserGroup[]> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [
        {
          id: '1',
          name: 'Administrators',
          description: 'Full system access',
          roles: await this.getRoles(),
          permissions: [],
          members: ['1'],
          createdAt: '2024-01-01',
          updatedAt: '2024-12-20'
        },
        {
          id: '2',
          name: 'Finance Team',
          description: 'Access to financial operations',
          roles: [],
          permissions: [],
          members: ['2'],
          createdAt: '2024-01-01',
          updatedAt: '2024-12-19'
        }
      ];
    }

    return this.api.getGroups(clientId);
  }

  async getGroup(clientId: string, groupId: string): Promise<UserGroup> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: groupId,
        name: 'Sample Group',
        description: 'A sample group',
        roles: await this.getRoles(),  // Default to all roles for now
        permissions: [],  // No direct permissions by default
        members: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    return this.api.getGroup(clientId, groupId);
  }

  async updateGroup(
    clientId: string,
    groupData: UserGroup | Partial<UserGroup>
  ): Promise<UserGroup> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        id: groupData.id!,
        name: groupData.name || '',
        description: groupData.description || '',
        roles: groupData.roles || [],
        permissions: groupData.permissions || [],
        members: groupData.members || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    return this.api.updateGroup(clientId, groupData.id!, groupData);
  }

  async createGroup(
    clientId: string,
    groupData: Partial<UserGroup>
  ): Promise<UserGroup> {
    if (this.api.isMockDataEnabled()) {
      const timestamp = new Date().toISOString();
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: groupData.name || 'New Group',
        description: groupData.description || '',
        roles: groupData.roles || [],
        permissions: groupData.permissions || [],
        members: groupData.members || [],
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    }

    return this.api.createGroup(clientId, groupData);
  }

  async deleteGroup(clientId: string, groupId: string): Promise<void> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return;
    }

    return this.api.deleteGroup(clientId, groupId);
  }

  // Role Management
  async getRoles(): Promise<SecurityRole[]> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [
        {
          id: 'admin',
          name: 'Administrator',
          description: 'Full system access',
          permissions: await this.getPermissions(),
          isSystem: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'user_admin',
          name: 'User Administrator',
          description: 'Can manage users and groups',
          permissions: (await this.getPermissions()).filter(p => 
            p.category === 'user'
          ),
          isSystem: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'security_admin',
          name: 'Security Administrator',
          description: 'Can manage security settings',
          permissions: (await this.getPermissions()).filter(p => 
            p.category === 'security'
          ),
          isSystem: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ];
    }

    return this.api.getRoles();
  }

  async getRole(roleId: string): Promise<SecurityRole> {
    if (this.api.isMockDataEnabled()) {
      const roles = await this.getRoles();
      const role = roles.find(r => r.id === roleId);
      if (!role) {
        throw new Error(`Role with id ${roleId} not found`);
      }
      return role;
    }

    return this.api.getRole(roleId);
  }

  async createRole(roleData: Partial<SecurityRole>): Promise<SecurityRole> {
    if (this.api.isMockDataEnabled()) {
      const timestamp = new Date().toISOString();
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: roleData.name || 'New Role',
        description: roleData.description || '',
        permissions: roleData.permissions || [],
        isSystem: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      };
    }

    return this.api.createRole(roleData);
  }

  async updateRole(roleId: string, roleData: Partial<SecurityRole>): Promise<SecurityRole> {
    if (this.api.isMockDataEnabled()) {
      const role = await this.getRole(roleId);
      if (role.isSystem) {
        throw new Error('Cannot modify system roles');
      }
      return {
        ...role,
        ...roleData,
        updatedAt: new Date().toISOString(),
      };
    }

    return this.api.updateRole(roleId, roleData);
  }

  async deleteRole(roleId: string): Promise<void> {
    if (this.api.isMockDataEnabled()) {
      const role = await this.getRole(roleId);
      if (role.isSystem) {
        throw new Error('Cannot delete system roles');
      }
      return;
    }

    return this.api.deleteRole(roleId);
  }

  // Permissions Management
  async getPermissions(): Promise<Permission[]> {
    if (this.api.isMockDataEnabled()) {
      return [
        // User Management Permissions
        {
          id: '1',
          name: 'View Users',
          description: 'Can view user list and details',
          category: 'user',
          actions: ['view']
        },
        {
          id: '2',
          name: 'Manage Users',
          description: 'Can create, edit, and delete users',
          category: 'user',
          actions: ['create', 'edit', 'delete']
        },
        {
          id: '3',
          name: 'Unlock Users',
          description: 'Can unlock user accounts',
          category: 'user',
          actions: ['unlock']
        },
        {
          id: '4',
          name: 'Reset User Passwords',
          description: 'Can reset user passwords',
          category: 'user',
          actions: ['reset_password']
        },
        // Security Permissions
        {
          id: '5',
          name: 'View Security Settings',
          description: 'Can view security settings and audit logs',
          category: 'security',
          actions: ['view']
        },
        {
          id: '6',
          name: 'Manage Password Policy',
          description: 'Can configure password requirements and expiration',
          category: 'security',
          actions: ['edit']
        },
        {
          id: '7',
          name: 'Manage MFA Settings',
          description: 'Can configure multi-factor authentication settings',
          category: 'security',
          actions: ['edit']
        },
        {
          id: '8',
          name: 'Manage IP Whitelist',
          description: 'Can manage IP address restrictions',
          category: 'security',
          actions: ['edit']
        },
        {
          id: '9',
          name: 'Audit Management',
          description: 'Can view and export audit logs',
          category: 'security',
          actions: ['view', 'export']
        },
        // Settings Permissions
        {
          id: '10',
          name: 'View Settings',
          description: 'Can view application settings',
          category: 'settings',
          actions: ['view']
        },
        {
          id: '11',
          name: 'Manage Notifications',
          description: 'Can configure email, SMS, and push notifications',
          category: 'settings',
          actions: ['edit']
        },
        {
          id: '12',
          name: 'Manage Branding',
          description: 'Can customize logos and colors',
          category: 'settings',
          actions: ['edit']
        },
        {
          id: '13',
          name: 'Manage Features',
          description: 'Can enable/disable system features',
          category: 'settings',
          actions: ['edit']
        },
        // Reports Permissions
        {
          id: '14',
          name: 'View Reports',
          description: 'Can view system reports',
          category: 'reports',
          actions: ['view']
        },
        {
          id: '15',
          name: 'Export Reports',
          description: 'Can export system reports',
          category: 'reports',
          actions: ['export']
        },
        {
          id: '16',
          name: 'Custom Reports',
          description: 'Can create and customize reports',
          category: 'reports',
          actions: ['create', 'edit']
        },
        // BillPay Permissions
        {
          id: '17',
          name: 'View Bill Pay',
          description: 'Can view bill pay transactions',
          category: 'billpay',
          actions: ['view']
        },
        {
          id: '18',
          name: 'Manage Payees',
          description: 'Can manage bill pay payees',
          category: 'billpay',
          actions: ['create', 'edit', 'delete']
        },
        {
          id: '19',
          name: 'Manage Payments',
          description: 'Can create and edit payments',
          category: 'billpay',
          actions: ['create', 'edit']
        },
        {
          id: '20',
          name: 'Approve Payments',
          description: 'Can approve bill pay transactions',
          category: 'billpay',
          actions: ['approve']
        },
        {
          id: '21',
          name: 'Manage Limits',
          description: 'Can set transaction and daily limits',
          category: 'billpay',
          actions: ['edit']
        },
        {
          id: '22',
          name: 'Bill Pay Settings',
          description: 'Can configure bill pay settings',
          category: 'billpay',
          actions: ['edit']
        },
        // MoneyDesktop Permissions
        {
          id: '23',
          name: 'View MoneyDesktop',
          description: 'Can view MoneyDesktop data',
          category: 'moneydesktop',
          actions: ['view']
        },
        {
          id: '24',
          name: 'Manage Accounts',
          description: 'Can manage MoneyDesktop account connections',
          category: 'moneydesktop',
          actions: ['create', 'edit', 'delete']
        },
        {
          id: '25',
          name: 'Manage Categories',
          description: 'Can manage transaction categories',
          category: 'moneydesktop',
          actions: ['create', 'edit', 'delete']
        },
        {
          id: '26',
          name: 'Manage Budgets',
          description: 'Can create and edit budgets',
          category: 'moneydesktop',
          actions: ['create', 'edit', 'delete']
        },
        {
          id: '27',
          name: 'Manage Goals',
          description: 'Can create and edit financial goals',
          category: 'moneydesktop',
          actions: ['create', 'edit', 'delete']
        },
        {
          id: '28',
          name: 'MoneyDesktop Settings',
          description: 'Can configure MoneyDesktop integration settings',
          category: 'moneydesktop',
          actions: ['edit']
        },
        // System Permissions
        {
          id: '29',
          name: 'View System Settings',
          description: 'Can view system configuration',
          category: 'system',
          actions: ['view']
        },
        {
          id: '30',
          name: 'System Maintenance',
          description: 'Can perform system maintenance tasks',
          category: 'system',
          actions: ['edit']
        },
        {
          id: '31',
          name: 'API Management',
          description: 'Can manage API keys and access',
          category: 'system',
          actions: ['create', 'edit', 'delete']
        },
        {
          id: '32',
          name: 'Backup Management',
          description: 'Can manage system backups',
          category: 'system',
          actions: ['create', 'restore']
        },
        {
          id: '33',
          name: 'System Logs',
          description: 'Can view and manage system logs',
          category: 'system',
          actions: ['view', 'export', 'delete']
        },
        {
          id: '34',
          name: 'System Administration',
          description: 'Full system administrative access',
          category: 'system',
          actions: ['create', 'edit', 'delete', 'approve']
        }
      ];
    }

    return this.api.getPermissions();
  }

  // Audit Logs
  async getAuditLogs(
    clientId: string,
    filters: AuditSearchRequest
  ): Promise<AuditLog[]> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return [];
    }

    return this.api.getAuditLogs(clientId, filters);
  }

  async exportAuditLogs(
    clientId: string,
    filters: AuditSearchRequest
  ): Promise<void> {
    if (this.api.isMockDataEnabled()) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return;
    }

    return this.api.exportAuditLogs(clientId, filters);
  }

  async searchAuditLogs(clientId: string, searchRequest: AuditSearchRequest): Promise<AuditLog[]> {
    console.log('ClientService: searchAuditLogs called with:', { clientId, searchRequest });
    if (this.api.isMockDataEnabled()) {
      console.log('ClientService: Using mock data');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockLogs: AuditLog[] = [
        {
          id: '1',
          timestamp: dayjs().subtract(1, 'hour').toISOString(),
          action: 'UPDATE_SETTINGS',
          userId: 'admin',
          userName: 'Admin User',
          resourceType: 'client',
          resourceId: clientId,
          details: JSON.stringify({
            before: { maxDailyLimit: 50000 },
            after: { maxDailyLimit: 100000 }
          }),
          status: 'Success'
        },
        {
          id: '2',
          timestamp: dayjs().subtract(2, 'hours').toISOString(),
          action: 'ADD_USER',
          userId: 'admin',
          userName: 'Admin User',
          resourceType: 'user',
          resourceId: 'new_user_1',
          details: JSON.stringify({
            email: 'newuser@example.com',
            role: 'USER'
          }),
          status: 'Success'
        },
        {
          id: '3',
          timestamp: dayjs().subtract(3, 'hours').toISOString(),
          action: 'UPDATE_SECURITY_SETTINGS',
          userId: 'admin',
          userName: 'Admin User',
          resourceType: 'security',
          resourceId: clientId,
          details: JSON.stringify({
            before: { mfaEnabled: false },
            after: { mfaEnabled: true }
          }),
          status: 'Success'
        }
      ];

      console.log('ClientService: Initial mock logs:', mockLogs);

      // Filter by username if provided
      let filteredLogs = mockLogs;
      if (searchRequest.username) {
        console.log('ClientService: Filtering by username:', searchRequest.username);
        filteredLogs = filteredLogs.filter(log => 
          log.userName.toLowerCase().includes(searchRequest.username.toLowerCase())
        );
      }

      // Filter by date range
      if (searchRequest.startDate) {
        console.log('ClientService: Filtering by start date:', searchRequest.startDate);
        filteredLogs = filteredLogs.filter(log => 
          dayjs(log.timestamp).isAfter(dayjs(searchRequest.startDate))
        );
      }

      if (searchRequest.endDate) {
        console.log('ClientService: Filtering by end date:', searchRequest.endDate);
        filteredLogs = filteredLogs.filter(log => 
          dayjs(log.timestamp).isBefore(dayjs(searchRequest.endDate).add(1, 'day'))
        );
      }

      // Filter by client ID
      console.log('ClientService: Filtering by client ID:', clientId);
      filteredLogs = filteredLogs.filter(log => 
        log.resourceId === clientId || log.resourceType === 'user'
      );

      console.log('ClientService: Returning filtered logs:', filteredLogs);
      return filteredLogs;
    }

    console.log('ClientService: Using real API');
    return this.api.searchAuditLogs(clientId, searchRequest);
  }

  // Settings Management
  async updateSecuritySettings(
    id: string,
    settings: SecuritySettings
  ): Promise<SecuritySettings> {
    if (this.api.isMockDataEnabled()) {
      const response = await api.patch<ApiResponse<SecuritySettings>>(
        `${this.baseUrl}/${id}/settings/security`,
        settings
      );
      return response.data.data;
    }

    return this.api.updateSecuritySettings(id, settings);
  }

  async updateNotificationSettings(
    id: string,
    settings: NotificationSettings
  ): Promise<NotificationSettings> {
    if (this.api.isMockDataEnabled()) {
      const response = await api.patch<ApiResponse<NotificationSettings>>(
        `${this.baseUrl}/${id}/settings/notifications`,
        settings
      );
      return response.data.data;
    }

    return this.api.updateNotificationSettings(id, settings);
  }

  async updateBrandingSettings(
    id: string,
    settings: BrandingSettings
  ): Promise<BrandingSettings> {
    if (this.api.isMockDataEnabled()) {
      const response = await api.patch<ApiResponse<BrandingSettings>>(
        `${this.baseUrl}/${id}/settings/branding`,
        settings
      );
      return response.data.data;
    }

    return this.api.updateBrandingSettings(id, settings);
  }

  async updateFeatureSettings(
    id: string,
    settings: FeatureSettings
  ): Promise<FeatureSettings> {
    if (this.api.isMockDataEnabled()) {
      const response = await api.patch<ApiResponse<FeatureSettings>>(
        `${this.baseUrl}/${id}/settings/features`,
        settings
      );
      return response.data.data;
    }

    return this.api.updateFeatureSettings(id, settings);
  }

  async getClientSecuritySettings(clientId: string): Promise<SecuritySettings> {
    if (this.api.isMockDataEnabled()) {
      const client = await this.getClient(clientId);
      return client.settings.security;
    }

    return this.api.getClientSecuritySettings(clientId);
  }

  async updateClientSecuritySettings(
    clientId: string,
    settings: SecuritySettings
  ): Promise<SecuritySettings> {
    if (this.api.isMockDataEnabled()) {
      const client = await this.getClient(clientId);
      client.settings.security = settings;
      return settings;
    }

    return this.api.updateClientSecuritySettings(clientId, settings);
  }
}

export const clientService = ClientService.getInstance();
