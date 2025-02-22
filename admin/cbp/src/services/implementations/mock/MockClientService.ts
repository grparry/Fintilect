import { IClientService } from '../../interfaces/IClientService';
import { BaseMockService } from './BaseMockService';
import {
    Customer,
    ClientType,
    ClientStatus,
    Environment,
    ClientConfiguration,
    ClientApiKey,
    ClientContact,
    ClientService as ClientServiceType,
    PaginatedResponse,
    User,
    UserGroup,
    Group
} from '../../../types/client.types';
import { mockCustomers } from './data/client/mockClientData';
import { mockUsers } from './data/users/mockUserData';
import { mockPermissionGroups as mockGroups, mockUserGroups } from './data/permissions/mockPermissionData';

/**
 * Mock implementation of ClientService
 * Uses in-memory data for testing and development
 */
export class MockClientService extends BaseMockService implements IClientService {
    private customers: Map<number, Customer>;
    private apiKeys: Map<number, ClientApiKey[]>;
    private contacts: Map<number, ClientContact[]>;
    private services: Map<number, ClientServiceType[]>;
    private configurations: Map<number, ClientConfiguration>;

    constructor(basePath: string = '/api/v1/customers') {
        super(basePath);
        this.customers = new Map(mockCustomers.map(c => [c.id, c]));
        this.apiKeys = new Map();
        this.contacts = new Map();
        this.services = new Map();
        this.configurations = new Map();
        this.initializeData();
    }

    private initializeData(): void {
        // Initialize mock data for each customer
        this.customers.forEach((customer, id) => {
            // Initialize API keys
            this.apiKeys.set(id, [
                {
                    id: 1,
                    clientId: id,
                    keyName: 'Production API Key',
                    environment: Environment.Production,
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
                    role: 'Primary',
                    isPrimary: true,
                    lastModified: new Date().toISOString()
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
                notificationEmail: `notifications@${customer.domain || 'example.com'}`,
                lastModified: '2025-01-01T00:00:00Z'
            });
        });
    }

    async getCustomers(params?: {
        tenantId?: number;
        isActive?: boolean;
        type?: ClientType;
        status?: ClientStatus;
        environment?: Environment;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Customer>> {
        let filteredCustomers = Array.from(this.customers.values());

        if (params) {
            if (params.tenantId !== undefined) {
                filteredCustomers = filteredCustomers.filter(c => c.tenantId === params.tenantId);
            }
            if (params.isActive !== undefined) {
                filteredCustomers = filteredCustomers.filter(c => c.isActive === params.isActive);
            }
            if (params.type) {
                filteredCustomers = filteredCustomers.filter(c => c.type === params.type);
            }
            if (params.status) {
                filteredCustomers = filteredCustomers.filter(c => c.status === params.status);
            }
            if (params.environment) {
                filteredCustomers = filteredCustomers.filter(c => c.environment === params.environment);
            }
            if (params.searchTerm) {
                const search = params.searchTerm.toLowerCase();
                filteredCustomers = filteredCustomers.filter(c =>
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
        const items = filteredCustomers.slice(start, end);
        const total = filteredCustomers.length;

        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        };
    }

    async getCustomer(customerId: number): Promise<Customer> {
        const customer = this.customers.get(customerId);
        if (!customer) {
            throw this.createError(`Customer not found: ${customerId}`, 404);
        }
        return customer;
    }

    async createCustomer(customer: Omit<Customer, 'id' | 'createdOn' | 'updatedOn'>): Promise<Customer> {
        const newId = Math.max(...Array.from(this.customers.keys()), 0) + 1;
        const now = new Date().toISOString();

        const newCustomer: Customer = {
            ...customer,
            id: newId,
            createdOn: now,
            updatedOn: now
        };

        this.customers.set(newId, newCustomer);
        this.initializeData();
        return newCustomer;
    }

    async updateCustomer(customerId: number, customer: Partial<Customer>): Promise<Customer> {
        const existingCustomer = await this.getCustomer(customerId);
        const updatedCustomer = {
            ...existingCustomer,
            ...customer,
            updatedOn: new Date().toISOString()
        };

        this.customers.set(customerId, updatedCustomer);
        return updatedCustomer;
    }

    async deleteCustomer(customerId: number): Promise<void> {
        if (!this.customers.has(customerId)) {
            throw this.createError(`Customer not found: ${customerId}`, 404);
        }

        this.customers.delete(customerId);
        this.apiKeys.delete(customerId);
        this.contacts.delete(customerId);
        this.services.delete(customerId);
        this.configurations.delete(customerId);
    }

    async getCustomerConfig(customerId: number): Promise<ClientConfiguration> {
        await this.getCustomer(customerId); // Verify customer exists
        const config = this.configurations.get(customerId);
        if (!config) {
            throw this.createError(`Configuration not found for customer: ${customerId}`, 404);
        }
        return config;
    }

    async updateCustomerConfig(customerId: number, config: Partial<ClientConfiguration>): Promise<ClientConfiguration> {
        const currentConfig = await this.getCustomerConfig(customerId);
        const updatedConfig = {
            ...currentConfig,
            ...config,
            lastModified: new Date().toISOString()
        };

        this.configurations.set(customerId, updatedConfig);
        return updatedConfig;
    }

    async getCustomerApiKeys(customerId: number): Promise<ClientApiKey[]> {
        await this.getCustomer(customerId); // Verify customer exists
        return this.apiKeys.get(customerId) || [];
    }

    async createCustomerApiKey(customerId: number, apiKey: Omit<ClientApiKey, 'id' | 'clientId' | 'createdAt' | 'lastUsed'>): Promise<ClientApiKey> {
        await this.getCustomer(customerId); // Verify customer exists
        const keys = this.apiKeys.get(customerId) || [];
        const newId = Math.max(...keys.map(k => k.id), 0) + 1;
        const now = new Date().toISOString();

        const newApiKey: ClientApiKey = {
            ...apiKey,
            id: newId,
            clientId: customerId,
            createdAt: now,
            lastUsed: null
        };

        keys.push(newApiKey);
        this.apiKeys.set(customerId, keys);
        return newApiKey;
    }

    async updateCustomerApiKey(customerId: number, apiKeyId: number, apiKey: Partial<ClientApiKey>): Promise<ClientApiKey> {
        const keys = await this.getCustomerApiKeys(customerId);
        const keyIndex = keys.findIndex(k => k.id === apiKeyId);
        if (keyIndex === -1) {
            throw this.createError(`API key not found: ${apiKeyId}`, 404);
        }

        const updatedKey = {
            ...keys[keyIndex],
            ...apiKey
        };

        keys[keyIndex] = updatedKey;
        this.apiKeys.set(customerId, keys);
        return updatedKey;
    }

    async deleteCustomerApiKey(customerId: number, apiKeyId: number): Promise<void> {
        const keys = await this.getCustomerApiKeys(customerId);
        const keyIndex = keys.findIndex(k => k.id === apiKeyId);
        if (keyIndex === -1) {
            throw this.createError(`API key not found: ${apiKeyId}`, 404);
        }

        keys.splice(keyIndex, 1);
        this.apiKeys.set(customerId, keys);
    }

    async getCustomerServices(customerId: number): Promise<ClientServiceType[]> {
        await this.getCustomer(customerId); // Verify customer exists
        return this.services.get(customerId) || [];
    }

    async updateCustomerService(customerId: number, serviceId: number, service: Partial<ClientServiceType>): Promise<ClientServiceType> {
        const services = await this.getCustomerServices(customerId);
        const serviceIndex = services.findIndex(s => s.id === serviceId);
        if (serviceIndex === -1) {
            throw this.createError(`Service not found: ${serviceId}`, 404);
        }

        const updatedService = {
            ...services[serviceIndex],
            ...service
        };

        services[serviceIndex] = updatedService;
        this.services.set(customerId, services);
        return updatedService;
    }

    async getCustomerContacts(customerId: number): Promise<ClientContact[]> {
        await this.getCustomer(customerId); // Verify customer exists
        return this.contacts.get(customerId) || [];
    }

    async createCustomerContact(customerId: number, contact: Omit<ClientContact, 'id' | 'clientId'>): Promise<ClientContact> {
        await this.getCustomer(customerId); // Verify customer exists
        const contacts = this.contacts.get(customerId) || [];
        const newId = Math.max(...contacts.map(c => c.id), 0) + 1;

        const newContact: ClientContact = {
            ...contact,
            id: newId,
            clientId: customerId
        };

        contacts.push(newContact);
        this.contacts.set(customerId, contacts);
        return newContact;
    }

    async updateCustomerContact(customerId: number, contactId: number, contact: Partial<ClientContact>): Promise<ClientContact> {
        const contacts = await this.getCustomerContacts(customerId);
        const contactIndex = contacts.findIndex(c => c.id === contactId);
        if (contactIndex === -1) {
            throw this.createError(`Contact not found: ${contactId}`, 404);
        }

        const updatedContact = {
            ...contacts[contactIndex],
            ...contact
        };

        contacts[contactIndex] = updatedContact;
        this.contacts.set(customerId, contacts);
        return updatedContact;
    }

    async deleteCustomerContact(customerId: number, contactId: number): Promise<void> {
        const contacts = await this.getCustomerContacts(customerId);
        const contactIndex = contacts.findIndex(c => c.id === contactId);
        if (contactIndex === -1) {
            throw this.createError(`Contact not found: ${contactId}`, 404);
        }

        contacts.splice(contactIndex, 1);
        this.contacts.set(customerId, contacts);
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
            return group && group.customerId === clientId;
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