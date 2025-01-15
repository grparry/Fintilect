import { IClientService } from '../../interfaces/IClientService';
import { BaseMockService } from './BaseMockService';
import {
    Client,
    ClientType,
    ClientStatus,
    Environment,
    ClientSettings,
    ClientConfiguration,
    ClientApiKey,
    ClientContact,
    ClientService,
    User,
    UserRole,
    UserGroup,
    SecurityRole,
    Permission,
    ContactInformation,
    Address,
    PaginatedResponse,
    Contact,
    UserStatus
} from '../../../types/client.types';
import { AuditLog, AuditSearchRequest, SecuritySettings, LoginPolicy } from '../../../types/security.types';
import { mockClients, mockUsers, defaultSettings, mockPermissions } from './data/client/mockClientData';

/**
 * Mock implementation of ClientService
 * Uses in-memory data for testing and development
 */
export class MockClientService extends BaseMockService implements IClientService {
    private clients: Client[] = [...mockClients];
    private users: Map<string, User[]> = new Map();
    private apiKeys: Map<string, ClientApiKey[]> = new Map();
    private contacts: Map<string, ClientContact[]> = new Map();
    private services: Map<string, ClientService[]> = new Map();
    private userGroups: Map<string, UserGroup[]> = new Map();
    private auditLogs: Map<string, AuditLog[]> = new Map();
    private addresses: Map<string, Address> = new Map();

    constructor(basePath: string = '/api/v1/clients') {
        super(basePath);
        this.initializeData();
    }

    private initializeData(): void {
        // Initialize mock data structures
        this.clients.forEach(client => {
            this.apiKeys.set(client.id, []);
            this.contacts.set(client.id, []);
            this.services.set(client.id, []);
            this.userGroups.set(client.id, []);
            this.auditLogs.set(client.id, []);
            this.addresses.set(client.id, {
                street1: '123 Main St',
                street2: 'Suite 100',
                city: 'Denver',
                state: 'CO',
                zipCode: '80202',
                country: 'USA'
            });
            this.users.set(client.id, []);
        });
    }

    async getClients(params?: {
        type?: ClientType;
        status?: ClientStatus;
        environment?: Environment;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Client>> {
        let filteredClients = [...this.clients];

        if (params) {
            if (params.type) {
                filteredClients = filteredClients.filter(c => c.type === params.type);
            }
            if (params.status) {
                filteredClients = filteredClients.filter(c => c.status === params.status);
            }
            if (params.environment) {
                filteredClients = filteredClients.filter(c => c.environment === params.environment);
            }
            if (params.searchTerm) {
                const search = params.searchTerm.toLowerCase();
                filteredClients = filteredClients.filter(c =>
                    c.name.toLowerCase().includes(search) ||
                    (c.domain?.toLowerCase() || '').includes(search) ||
                    (c.contactName?.toLowerCase() || '').includes(search)
                );
            }
        }

        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const start = (page - 1) * limit;
        const end = start + limit;
        const items = filteredClients.slice(start, end);
        const total = filteredClients.length;

        return {
            items,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        };
    }

    async getClient(clientId: string): Promise<Client> {
        this.validateRequired({ clientId }, ['clientId']);

        const client = this.clients.find(c => c.id === clientId);
        if (!client) {
            this.createError(`Client not found: ${clientId}`, 404);
        }

        return client!;
    }

    async createClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
        const newClient: Client = {
            ...client,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            settings: defaultSettings
        };

        this.clients.push(newClient);
        this.initializeData();
        return newClient;
    }

    async updateClient(clientId: string, client: Partial<Client>): Promise<Client> {
        this.validateRequired({ clientId }, ['clientId']);

        const index = this.clients.findIndex(c => c.id === clientId);
        if (index === -1) {
            this.createError(`Client not found: ${clientId}`, 404);
        }

        const updatedClient = {
            ...this.clients[index],
            ...client,
            updatedAt: new Date().toISOString()
        };

        this.clients[index] = updatedClient;
        return updatedClient;
    }

    async deleteClient(clientId: string): Promise<void> {
        this.validateRequired({ clientId }, ['clientId']);

        const index = this.clients.findIndex(c => c.id === clientId);
        if (index === -1) {
            this.createError(`Client not found: ${clientId}`, 404);
        }

        this.clients.splice(index, 1);
        this.apiKeys.delete(clientId);
        this.contacts.delete(clientId);
        this.services.delete(clientId);
        this.userGroups.delete(clientId);
        this.auditLogs.delete(clientId);
        this.addresses.delete(clientId);
        this.users.delete(clientId);
    }

    async getClientSettings(clientId: string): Promise<ClientSettings> {
        this.validateRequired({ clientId }, ['clientId']);

        const client = await this.getClient(clientId);
        return client.settings;
    }

    async updateClientSettings(clientId: string, settings: {
        general?: Partial<ClientSettings['general']>;
        security?: Partial<ClientSettings['security']>;
        notifications?: Partial<ClientSettings['notifications']>;
    }): Promise<ClientSettings> {
        this.validateRequired({ clientId }, ['clientId']);

        const client = await this.getClient(clientId);
        const updatedSettings = {
            ...client.settings,
            general: { ...client.settings.general, ...settings.general },
            security: { ...client.settings.security, ...settings.security },
            notifications: { ...client.settings.notifications, ...settings.notifications }
        };

        await this.updateClient(clientId, { settings: updatedSettings });
        return updatedSettings;
    }

    async getClientConfiguration(clientId: string): Promise<ClientConfiguration> {
        this.validateRequired({ clientId }, ['clientId']);

        return {
            id: parseInt(clientId),
            clientId: parseInt(clientId),
            maxDailyLimit: 100000,
            maxTransactionLimit: 10000,
            allowWeekendProcessing: false,
            requireDualApproval: true,
            notificationEmail: 'notifications@example.com',
            lastModified: new Date().toISOString()
        };
    }

    async updateClientConfiguration(clientId: string, config: Partial<ClientConfiguration>): Promise<ClientConfiguration> {
        this.validateRequired({ clientId }, ['clientId']);

        const currentConfig = await this.getClientConfiguration(clientId);
        return { ...currentConfig, ...config, lastModified: new Date().toISOString() };
    }

    async getClientApiKeys(clientId: string): Promise<ClientApiKey[]> {
        this.validateRequired({ clientId }, ['clientId']);

        return this.apiKeys.get(clientId) || [];
    }

    async createClientApiKey(clientId: string, keyData: {
        keyName: string;
        environment: Environment;
        expiresAt?: string;
    }): Promise<ClientApiKey> {
        this.validateRequired({ clientId, keyData }, ['clientId', 'keyData']);

        const newKey: ClientApiKey = {
            id: parseInt(Math.random().toString().substr(2, 8)),
            clientId: parseInt(clientId),
            keyName: keyData.keyName,
            environment: keyData.environment,
            createdAt: new Date().toISOString(),
            expiresAt: keyData.expiresAt || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            lastUsed: null,
            status: 'Active'
        };

        const keys = this.apiKeys.get(clientId) || [];
        keys.push(newKey);
        this.apiKeys.set(clientId, keys);

        return newKey;
    }

    async revokeClientApiKey(clientId: string, keyId: number): Promise<void> {
        this.validateRequired({ clientId, keyId }, ['clientId', 'keyId']);

        const keys = this.apiKeys.get(clientId);
        if (!keys) {
            this.createError(`Client not found: ${clientId}`, 404);
        }

        const keyIndex = keys!.findIndex(k => k.id === keyId);
        if (keyIndex === -1) {
            this.createError(`API key not found: ${keyId}`, 404);
        }

        keys![keyIndex].status = 'Revoked';
    }

    async getClientContacts(clientId: string): Promise<ClientContact[]> {
        this.validateRequired({ clientId }, ['clientId']);

        return this.contacts.get(clientId) || [];
    }

    async updateClientContacts(clientId: string, contacts: ContactInformation): Promise<ContactInformation> {
        this.validateRequired({ clientId }, ['clientId']);

        const clientContacts: ClientContact[] = [
            this.createClientContact(clientId, contacts.primaryContact, 'Primary'),
            this.createClientContact(clientId, contacts.technicalContact, 'Technical'),
            this.createClientContact(clientId, contacts.billingContact, 'Billing'),
            ...contacts.emergencyContacts.map(c => this.createClientContact(clientId, c, 'Emergency'))
        ];

        this.contacts.set(clientId, clientContacts);
        return contacts;
    }

    private createClientContact(clientId: string, contact: Contact, role: string): ClientContact {
        return {
            id: parseInt(Math.random().toString().substr(2, 8)),
            clientId: parseInt(clientId),
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
            role,
            isPrimary: role === 'Primary',
            lastModified: new Date().toISOString()
        };
    }

    async getClientServices(clientId: string): Promise<ClientService[]> {
        this.validateRequired({ clientId }, ['clientId']);

        return this.services.get(clientId) || [];
    }

    async updateClientService(
        clientId: string,
        serviceId: number,
        service: Partial<ClientService>
    ): Promise<ClientService> {
        this.validateRequired({ clientId, serviceId }, ['clientId', 'serviceId']);

        const services = this.services.get(clientId);
        if (!services) {
            this.createError(`Client not found: ${clientId}`, 404);
        }

        const serviceIndex = services!.findIndex(s => s.id === serviceId);
        if (serviceIndex === -1) {
            this.createError(`Service not found: ${serviceId}`, 404);
        }

        const updatedService = {
            ...services![serviceIndex],
            ...service,
            clientId: parseInt(clientId)
        };

        services![serviceIndex] = updatedService;
        return updatedService;
    }

    async getClientUsers(clientId: string, params?: {
        role?: UserRole;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<User>> {
        this.validateRequired({ clientId }, ['clientId']);

        let filteredUsers = this.users.get(clientId) || [];

        if (params) {
            if (params.role) {
                filteredUsers = filteredUsers.filter(u => u.role === params.role);
            }
            if (params.searchTerm) {
                const search = params.searchTerm.toLowerCase();
                filteredUsers = filteredUsers.filter(u =>
                    u.username.toLowerCase().includes(search) ||
                    u.firstName.toLowerCase().includes(search) ||
                    u.lastName.toLowerCase().includes(search) ||
                    u.email.toLowerCase().includes(search)
                );
            }
        }

        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const start = (page - 1) * limit;
        const end = start + limit;
        const items = filteredUsers.slice(start, end);
        const total = filteredUsers.length;

        return {
            items,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        };
    }

    async getClientUserGroups(clientId: string): Promise<UserGroup[]> {
        this.validateRequired({ clientId }, ['clientId']);

        return this.userGroups.get(clientId) || [];
    }

    async getClientRoles(clientId: string): Promise<SecurityRole[]> {
        this.validateRequired({ clientId }, ['clientId']);

        return [
            {
                id: 'admin',
                name: 'Administrator',
                description: 'Full system access',
                permissions: mockPermissions,
                isSystem: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'user',
                name: 'User',
                description: 'Standard user access',
                permissions: mockPermissions.filter(p => !p.id.includes('admin')),
                isSystem: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: 'viewer',
                name: 'Viewer',
                description: 'Read-only access',
                permissions: mockPermissions.filter(p => p.id.includes('read')),
                isSystem: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
    }

    async getClientPermissions(clientId: string): Promise<Permission[]> {
        this.validateRequired({ clientId }, ['clientId']);

        return mockPermissions;
    }

    async getPermissions(): Promise<Permission[]> {
        return mockPermissions;
    }

    async getClientAuditLogs(clientId: string, request: AuditSearchRequest): Promise<AuditLog[]> {
        this.validateRequired({ clientId }, ['clientId']);
        
        const logs = this.auditLogs.get(clientId) || [];
        // Convert security audit logs to client audit logs by adding userEmail
        return logs.map(log => ({
            ...log,
            userEmail: `user-${log.userId}@example.com` // Add required userEmail field
        }));
    }

    async getClientAddress(clientId: string): Promise<Address> {
        this.validateRequired({ clientId }, ['clientId']);

        const address = this.addresses.get(clientId);
        if (!address) {
            this.createError(`Address not found for client: ${clientId}`, 404);
        }

        return address!;
    }

    async updateClientAddress(clientId: string, address: Address): Promise<Address> {
        this.validateRequired({ clientId }, ['clientId']);

        this.addresses.set(clientId, address);
        return address;
    }

    async getClientStats(clientId: string): Promise<{
        userCount: number;
        activeUserCount: number;
        totalTransactions: number;
        activeServices: number;
        lastActivityDate: string;
    }> {
        this.validateRequired({ clientId }, ['clientId']);

        const clientUsers = this.users.get(clientId) || [];
        const activeUsers = clientUsers.filter(u => !u.locked);

        return {
            userCount: clientUsers.length,
            activeUserCount: activeUsers.length,
            totalTransactions: Math.floor(Math.random() * 10000),
            activeServices: (this.services.get(clientId) || []).length,
            lastActivityDate: new Date().toISOString()
        };
    }

    async getSecuritySettings(clientId: string): Promise<SecuritySettings> {
        this.validateRequired({ clientId }, ['clientId']);
        return {
            passwordPolicy: {
                minLength: 8,
                requireUppercase: true,
                requireLowercase: true,
                requireNumbers: true,
                requireSpecialChars: true,
                expirationDays: 90,
                preventReuse: 5,
                complexityScore: 3
            },
            loginPolicy: {
                maxAttempts: 5,
                lockoutDuration: 30,
                sessionTimeout: 30,
                requireMFA: true,
                allowRememberMe: false,
                allowMultipleSessions: false,
                requirePasswordChange: false
            },
            ipWhitelist: {
                enabled: false,
                addresses: [],
                allowedRanges: []
            },
            mfaSettings: {
                methods: ['email', 'authenticator'],
                defaultMethod: 'email',
                gracePeriod: 7,
                trustDuration: 30
            },
            auditSettings: {
                retentionDays: 90,
                highRiskEvents: ['login', 'password_change', 'mfa_update'],
                alertThresholds: {
                    login_attempts: 5,
                    password_changes: 3,
                    mfa_updates: 2
                }
            },
            alertSettings: {
                enableEmailAlerts: true,
                enableSMSAlerts: false,
                recipients: [],
                severityLevels: ['high', 'critical']
            }
        };
    }

    async updateSecuritySettings(clientId: string, settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
        this.validateRequired({ clientId }, ['clientId']);
        const currentSettings = await this.getSecuritySettings(clientId);
        return { ...currentSettings, ...settings };
    }

    async getGroup(clientId: string, groupId: string): Promise<UserGroup> {
        this.validateRequired({ clientId, groupId }, ['clientId', 'groupId']);
        const groups = this.userGroups.get(clientId) || [];
        const group = groups.find(g => g.id === groupId);
        if (!group) {
            this.createError(`Group not found: ${groupId}`, 404);
        }
        return group!;
    }

    async createGroup(clientId: string, group: Omit<UserGroup, 'id'>): Promise<UserGroup> {
        this.validateRequired({ clientId, group }, ['clientId', 'group']);
        const groups = this.userGroups.get(clientId) || [];
        const newGroup: UserGroup = {
            ...group,
            id: Math.random().toString(36).substr(2, 9),
            clientId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        groups.push(newGroup);
        this.userGroups.set(clientId, groups);
        return newGroup;
    }

    async updateGroup(clientId: string, groupId: string, group: Partial<UserGroup>): Promise<UserGroup> {
        this.validateRequired({ clientId, groupId }, ['clientId', 'groupId']);
        const groups = this.userGroups.get(clientId) || [];
        const groupIndex = groups.findIndex(g => g.id === groupId);
        if (groupIndex === -1) {
            this.createError(`Group not found: ${groupId}`, 404);
        }
        const updatedGroup = {
            ...groups[groupIndex],
            ...group,
            updatedAt: new Date().toISOString()
        };
        groups[groupIndex] = updatedGroup;
        this.userGroups.set(clientId, groups);
        return updatedGroup;
    }

    async deleteGroup(clientId: string, groupId: string): Promise<void> {
        this.validateRequired({ clientId, groupId }, ['clientId', 'groupId']);
        const groups = this.userGroups.get(clientId) || [];
        const groupIndex = groups.findIndex(g => g.id === groupId);
        if (groupIndex === -1) {
            this.createError(`Group not found: ${groupId}`, 404);
        }
        groups.splice(groupIndex, 1);
        this.userGroups.set(clientId, groups);
    }

    async getGroups(clientId: string): Promise<UserGroup[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.userGroups.get(clientId) || [];
    }

    async getUser(clientId: string, userId: string): Promise<User> {
        this.validateRequired({ clientId, userId }, ['clientId', 'userId']);
        const users = this.users.get(clientId) || [];
        const user = users.find(u => u.id === userId);
        if (!user) {
            this.createError(`User not found: ${userId}`, 404);
        }
        return user!;
    }

    async createUser(clientId: string, user: Omit<User, 'id'>): Promise<User> {
        this.validateRequired({ clientId, user }, ['clientId', 'user']);
        const users = this.users.get(clientId) || [];
        const newUser: User = {
            ...user,
            id: Math.random().toString(36).substr(2, 9),
            clientId,
            status: UserStatus.PENDING,
            locked: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        users.push(newUser);
        this.users.set(clientId, users);
        return newUser;
    }

    async updateUser(clientId: string, userId: string, user: Partial<User>): Promise<User> {
        this.validateRequired({ clientId, userId }, ['clientId', 'userId']);
        const users = this.users.get(clientId) || [];
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            this.createError(`User not found: ${userId}`, 404);
        }
        const updatedUser = {
            ...users[userIndex],
            ...user,
            updatedAt: new Date().toISOString()
        };
        users[userIndex] = updatedUser;
        this.users.set(clientId, users);
        return updatedUser;
    }

    async deleteUser(clientId: string, userId: string): Promise<void> {
        this.validateRequired({ clientId, userId }, ['clientId', 'userId']);
        const users = this.users.get(clientId) || [];
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            this.createError(`User not found: ${userId}`, 404);
        }
        users.splice(userIndex, 1);
        this.users.set(clientId, users);
    }

    async setUserLockStatus(clientId: string, userId: string, locked: boolean): Promise<void> {
        this.validateRequired({ clientId, userId }, ['clientId', 'userId']);
        const users = this.users.get(clientId) || [];
        const userIndex = users.findIndex(u => u.id === userId);
        if (userIndex === -1) {
            this.createError(`User not found: ${userId}`, 404);
        }
        users[userIndex] = {
            ...users[userIndex],
            locked,
            status: locked ? UserStatus.LOCKED : UserStatus.ACTIVE,
            updatedAt: new Date().toISOString()
        };
        this.users.set(clientId, users);
    }
}
