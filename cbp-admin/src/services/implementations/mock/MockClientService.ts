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
    AuditLog,
    AuditSearchRequest,
    ContactInformation,
    Address,
    PaginatedResponse,
    Contact
} from '../../../types/client.types';
import { mockClients, mockUsers, defaultSettings, mockPermissions } from './data/client/mockClientData';

/**
 * Mock implementation of ClientService
 * Uses in-memory data for testing and development
 */
export class MockClientService extends BaseMockService implements IClientService {
    private clients: Client[] = [...mockClients];
    private users: User[] = [...mockUsers];
    private apiKeys: Map<string, ClientApiKey[]> = new Map();
    private contacts: Map<string, ClientContact[]> = new Map();
    private services: Map<string, ClientService[]> = new Map();
    private userGroups: Map<string, UserGroup[]> = new Map();
    private auditLogs: Map<string, AuditLog[]> = new Map();
    private addresses: Map<string, Address> = new Map();

    constructor() {
        super('/api/v1/clients');
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
        await this.delay();

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
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        const client = this.clients.find(c => c.id === clientId);
        if (!client) {
            this.createError(`Client not found: ${clientId}`, 404);
        }

        return client!;
    }

    async createClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
        await this.delay();

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
        await this.delay();
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
        await this.delay();
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
    }

    async getClientSettings(clientId: string): Promise<ClientSettings> {
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        const client = await this.getClient(clientId);
        return client.settings;
    }

    async updateClientSettings(clientId: string, settings: {
        general?: Partial<ClientSettings['general']>;
        security?: Partial<ClientSettings['security']>;
        notifications?: Partial<ClientSettings['notifications']>;
    }): Promise<ClientSettings> {
        await this.delay();
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
        await this.delay();
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
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        const currentConfig = await this.getClientConfiguration(clientId);
        return { ...currentConfig, ...config, lastModified: new Date().toISOString() };
    }

    async getClientApiKeys(clientId: string): Promise<ClientApiKey[]> {
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        return this.apiKeys.get(clientId) || [];
    }

    async createClientApiKey(clientId: string, keyData: {
        keyName: string;
        environment: Environment;
        expiresAt?: string;
    }): Promise<ClientApiKey> {
        await this.delay();
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
        await this.delay();
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
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        return this.contacts.get(clientId) || [];
    }

    async updateClientContacts(clientId: string, contacts: ContactInformation): Promise<ContactInformation> {
        await this.delay();
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
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        return this.services.get(clientId) || [];
    }

    async updateClientService(
        clientId: string,
        serviceId: number,
        service: Partial<ClientService>
    ): Promise<ClientService> {
        await this.delay();
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
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        let filteredUsers = this.users.filter(u => u.clientId === clientId);

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
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        return this.userGroups.get(clientId) || [];
    }

    async getClientRoles(clientId: string): Promise<SecurityRole[]> {
        await this.delay();
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
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        return mockPermissions;
    }

    async getClientAuditLogs(clientId: string, request: AuditSearchRequest): Promise<AuditLog[]> {
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        return this.auditLogs.get(clientId) || [];
    }

    async getClientAddress(clientId: string): Promise<Address> {
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        const address = this.addresses.get(clientId);
        if (!address) {
            this.createError(`Address not found for client: ${clientId}`, 404);
        }

        return address!;
    }

    async updateClientAddress(clientId: string, address: Address): Promise<Address> {
        await this.delay();
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
        await this.delay();
        this.validateRequired({ clientId }, ['clientId']);

        const clientUsers = this.users.filter(u => u.clientId === clientId);
        const activeUsers = clientUsers.filter(u => !u.locked);

        return {
            userCount: clientUsers.length,
            activeUserCount: activeUsers.length,
            totalTransactions: Math.floor(Math.random() * 10000),
            activeServices: (this.services.get(clientId) || []).length,
            lastActivityDate: new Date().toISOString()
        };
    }
}
