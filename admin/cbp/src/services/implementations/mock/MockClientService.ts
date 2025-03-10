import { IClientService } from '../../interfaces/IClientService';
import { BaseMockService } from './BaseMockService';
import {
    Client,
    ClientType,
    ClientStatus,
    Environment,
    ClientConfiguration,
    ClientApiKey,
    ClientContact,
    ClientService as ClientServiceType,
    ClientListResponse,
    User,
    UserGroup,
    Group
} from '../../../types/client.types';
import { mockClients } from './data/client/mockClientData';
import { mockUsers } from './data/users/mockUserData';
import { mockPermissionGroups as mockGroups, mockUserGroups } from './data/permissions/mockPermissionData';

/**
 * Mock implementation of ClientService
 * Uses in-memory data for testing and development
 */
export class MockClientService extends BaseMockService implements IClientService {
    private clients: Map<number, Client>;
    private apiKeys: Map<number, ClientApiKey[]>;
    private contacts: Map<number, ClientContact[]>;
    private services: Map<number, ClientServiceType[]>;
    private configurations: Map<number, ClientConfiguration>;

    constructor(basePath: string = '/api/v1/clients') {
        super(basePath);
        this.clients = new Map(mockClients.map(c => [c.id, c]));
        this.apiKeys = new Map();
        this.contacts = new Map();
        this.services = new Map();
        this.configurations = new Map();
        this.initializeData();
    }

    private initializeData(): void {
        // Initialize mock data for each client
        this.clients.forEach((client, id) => {
            // Initialize API keys
            this.apiKeys.set(id, [
                {
                    id: 1,
                    clientId: id,
                    keyName: 'Production API Key',
                    environment: 'PRODUCTION',
                    createdAt: '2025-01-01T00:00:00Z',
                    expiresAt: '2026-01-01T00:00:00Z',
                    lastUsed: '2025-02-21T00:00:00Z',
                    status: 'Active'
                }
            ]);

            // Initialize contacts
            this.contacts.set(id, [
                {
                    id: 1,
                    clientId: id,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    phone: '555-0123',
                    isPrimary: true,
                    createdOn: '2025-01-01T00:00:00Z',
                    updatedOn: null,
                    isActive: true
                }
            ]);

            // Initialize services
            this.services.set(id, [
                {
                    id: 1,
                    clientId: id,
                    serviceName: 'Payment Processing',
                    status: 'Enabled',
                    startDate: '2025-01-01T00:00:00Z',
                    configuration: {}
                }
            ]);

            // Initialize configurations
            this.configurations.set(id, {
                id: 1,
                clientId: id,
                maxDailyLimit: 100000,
                maxTransactionLimit: 10000,
                allowWeekendProcessing: false,
                requireDualApproval: true,
                notificationEmail: `notifications@${client.domain || 'example.com'}`,
                lastModified: '2025-01-01T00:00:00Z'
            });
        });
    }

    async getClients(params?: {
        tenantId?: number;
        isActive?: boolean;
        type?: ClientType;
        status?: ClientStatus;
        environment?: Environment;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<ClientListResponse> {
        let filteredClients = Array.from(this.clients.values());

        if (params) {
            if (params.tenantId !== undefined) {
                filteredClients = filteredClients.filter(c => c.tenantId === params.tenantId);
            }
            if (params.isActive !== undefined) {
                filteredClients = filteredClients.filter(c => c.isActive === params.isActive);
            }
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
                    (c.domain?.toLowerCase() || '').includes(search)
                );
            }
        }

        // Note: We're ignoring pagination parameters since the real API doesn't support them
        return {
            clients: filteredClients
        };
    }

    async getClient(clientId: number): Promise<Client> {
        const client = this.clients.get(clientId);
        if (!client) {
            throw this.createError(`Client not found: ${clientId}`, 404);
        }
        return client;
    }

    async createClient(client: Omit<Client, 'id' | 'createdOn' | 'updatedOn'>): Promise<Client> {
        const newId = Math.max(...Array.from(this.clients.keys()), 0) + 1;
        const now = new Date().toISOString();

        const newClient: Client = {
            ...client,
            id: newId,
            createdOn: now,
            updatedOn: now
        };

        this.clients.set(newId, newClient);
        this.initializeData();
        return newClient;
    }

    async updateClient(clientId: number, client: Partial<Client>): Promise<Client> {
        const existingClient = await this.getClient(clientId);
        const updatedClient = {
            ...existingClient,
            ...client,
            updatedOn: new Date().toISOString()
        };

        this.clients.set(clientId, updatedClient);
        return updatedClient;
    }

    async deleteClient(clientId: number): Promise<void> {
        if (!this.clients.has(clientId)) {
            throw this.createError(`Client not found: ${clientId}`, 404);
        }

        this.clients.delete(clientId);
        this.apiKeys.delete(clientId);
        this.contacts.delete(clientId);
        this.services.delete(clientId);
        this.configurations.delete(clientId);
    }

    async getClientConfig(clientId: number): Promise<ClientConfiguration> {
        await this.getClient(clientId); // Verify client exists
        const config = this.configurations.get(clientId);
        if (!config) {
            throw this.createError(`Configuration not found for client: ${clientId}`, 404);
        }
        return config;
    }

    async updateClientConfig(clientId: number, config: Partial<ClientConfiguration>): Promise<ClientConfiguration> {
        const currentConfig = await this.getClientConfig(clientId);
        const updatedConfig = {
            ...currentConfig,
            ...config,
            lastModified: new Date().toISOString()
        };

        this.configurations.set(clientId, updatedConfig);
        return updatedConfig;
    }

    async getClientApiKeys(clientId: number): Promise<ClientApiKey[]> {
        await this.getClient(clientId); // Verify client exists
        return this.apiKeys.get(clientId) || [];
    }

    async createClientApiKey(clientId: number, apiKey: Omit<ClientApiKey, 'id' | 'clientId' | 'createdAt' | 'lastUsed'>): Promise<ClientApiKey> {
        await this.getClient(clientId); // Verify client exists
        const keys = this.apiKeys.get(clientId) || [];
        const newId = Math.max(...keys.map(k => k.id), 0) + 1;
        const now = new Date().toISOString();

        const newApiKey: ClientApiKey = {
            ...apiKey,
            id: newId,
            clientId: clientId,
            createdAt: now,
            lastUsed: null
        };

        keys.push(newApiKey);
        this.apiKeys.set(clientId, keys);
        return newApiKey;
    }

    async updateClientApiKey(clientId: number, apiKeyId: number, apiKey: Partial<ClientApiKey>): Promise<ClientApiKey> {
        const keys = await this.getClientApiKeys(clientId);
        const keyIndex = keys.findIndex(k => k.id === apiKeyId);
        if (keyIndex === -1) {
            throw this.createError(`API key not found: ${apiKeyId}`, 404);
        }

        const updatedKey = {
            ...keys[keyIndex],
            ...apiKey
        };

        keys[keyIndex] = updatedKey;
        this.apiKeys.set(clientId, keys);
        return updatedKey;
    }

    async deleteClientApiKey(clientId: number, apiKeyId: number): Promise<void> {
        const keys = await this.getClientApiKeys(clientId);
        const keyIndex = keys.findIndex(k => k.id === apiKeyId);
        if (keyIndex === -1) {
            throw this.createError(`API key not found: ${apiKeyId}`, 404);
        }

        keys.splice(keyIndex, 1);
        this.apiKeys.set(clientId, keys);
    }

    async getClientServices(clientId: number): Promise<ClientServiceType[]> {
        await this.getClient(clientId); // Verify client exists
        return this.services.get(clientId) || [];
    }

    async updateClientService(clientId: number, serviceId: number, service: Partial<ClientServiceType>): Promise<ClientServiceType> {
        const services = await this.getClientServices(clientId);
        const serviceIndex = services.findIndex(s => s.id === serviceId);
        if (serviceIndex === -1) {
            throw this.createError(`Service not found: ${serviceId}`, 404);
        }

        const updatedService = {
            ...services[serviceIndex],
            ...service
        };

        services[serviceIndex] = updatedService;
        this.services.set(clientId, services);
        return updatedService;
    }

    async getClientContacts(clientId: number): Promise<ClientContact[]> {
        await this.getClient(clientId); // Verify client exists
        return this.contacts.get(clientId) || [];
    }

    async createClientContact(clientId: number, contact: Omit<ClientContact, 'id' | 'clientId'>): Promise<ClientContact> {
        await this.getClient(clientId); // Verify client exists
        const contacts = this.contacts.get(clientId) || [];
        const newId = Math.max(...contacts.map(c => c.id), 0) + 1;

        const now = new Date().toISOString();
        const newContact: ClientContact = {
            ...contact,
            id: newId,
            clientId: clientId,
            createdOn: now,
            updatedOn: null,
            isActive: true
        };

        contacts.push(newContact);
        this.contacts.set(clientId, contacts);
        return newContact;
    }

    async updateClientContact(clientId: number, contactId: number, contact: Partial<ClientContact>): Promise<ClientContact> {
        const contacts = await this.getClientContacts(clientId);
        const contactIndex = contacts.findIndex(c => c.id === contactId);
        if (contactIndex === -1) {
            throw this.createError(`Contact not found: ${contactId}`, 404);
        }

        const updatedContact = {
            ...contacts[contactIndex],
            ...contact
        };

        contacts[contactIndex] = updatedContact;
        this.contacts.set(clientId, contacts);
        return updatedContact;
    }

    async deleteClientContact(clientId: number, contactId: number): Promise<void> {
        const contacts = await this.getClientContacts(clientId);
        const contactIndex = contacts.findIndex(c => c.id === contactId);
        if (contactIndex === -1) {
            throw this.createError(`Contact not found: ${contactId}`, 404);
        }

        contacts.splice(contactIndex, 1);
        this.contacts.set(clientId, contacts);
    }

    protected async simulateDelay(): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    async getUser(clientId: number, userId: number): Promise<User> {
        await this.simulateDelay();
        const user = mockUsers.find((u: User) => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    async getGroups(clientId: number): Promise<UserGroup[]> {
        await this.simulateDelay();
        return mockUserGroups.filter(ug => {
            const group = mockGroups.find(g => g.id === ug.groupId);
            return group && group.clientId === clientId;
        });
    }

    async updateUser(clientId: number, userId: number, userData: Partial<User>): Promise<User> {
        await this.simulateDelay();
        const userIndex = mockUsers.findIndex((u: User) => u.id === userId);
        if (userIndex === -1) {
            throw new Error('User not found');
        }
        const now = new Date().toISOString();
        mockUsers[userIndex] = {
            ...mockUsers[userIndex],
            ...userData,
            lastLogin: now
        };
        return mockUsers[userIndex];
    }
}