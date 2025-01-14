import { IClientService } from '../../interfaces/IClientService';
import { BaseMockService } from './BaseMockService';
import {
    Client,
    ClientStatus,
    ClientType,
    ClientSettings,
    ClientConfiguration,
    ClientApiKey,
    ClientContact,
    ContactInformation,
    ClientService as IClientServiceType,
    SecurityRole,
    Environment,
    User,
    UserGroup,
    Permission,
    Address,
    AuditLog,
    AuditSearchRequest,
    PaginatedResponse,
    GeneralSettings,
    SecuritySettings,
    NotificationSettings,
    UserRole
} from '../../../types/client.types';
import { mockClients, mockUsers, defaultSettings, mockPermissions } from './data/client/mockClientData';

/**
 * Mock implementation of ClientService for development and testing
 */
export class ClientService extends BaseMockService implements IClientService {
    constructor() {
        super('/api/clients');
    }

    async getClients(params?: {
        type?: ClientType;
        status?: ClientStatus;
        environment?: Environment;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Client>> {
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const start = (page - 1) * limit;
        const end = start + limit;

        const filteredClients = mockClients.filter((client: Client) => {
            if (params?.status && client.status !== params.status) return false;
            if (params?.type && client.type !== params.type) return false;
            if (params?.searchTerm && !client.name.toLowerCase().includes(params.searchTerm.toLowerCase())) return false;
            return true;
        });

        const paginatedClients = filteredClients.slice(start, end);
        const totalPages = Math.ceil(filteredClients.length / limit);

        return {
            items: paginatedClients,
            pagination: {
                total: filteredClients.length,
                page,
                limit,
                pages: totalPages
            }
        };
    }

    async getClient(clientId: string): Promise<Client> {
        const client = mockClients.find(c => c.id === clientId);
        if (!client) {
            throw new Error(`Client not found: ${clientId}`);
        }
        return client;
    }

    async createClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
        return {
            ...client,
            id: Math.random().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    async updateClient(clientId: string, client: Partial<Client>): Promise<Client> {
        const existingClient = await this.getClient(clientId);
        return {
            ...existingClient,
            ...client,
            updatedAt: new Date().toISOString()
        };
    }

    async deleteClient(clientId: string): Promise<void> {
        // Mock implementation - no actual deletion needed
    }

    async getClientSettings(clientId: string): Promise<ClientSettings> {
        const client = await this.getClient(clientId);
        return client.settings;
    }

    async updateClientSettings(clientId: string, settings: {
        general?: Partial<GeneralSettings>;
        security?: Partial<SecuritySettings>;
        notifications?: Partial<NotificationSettings>;
    }): Promise<ClientSettings> {
        return defaultSettings;
    }

    async getClientConfiguration(clientId: string): Promise<ClientConfiguration> {
        return {
            id: 1,
            clientId: 1,
            maxDailyLimit: 10000,
            maxTransactionLimit: 1000,
            allowWeekendProcessing: false,
            requireDualApproval: true,
            notificationEmail: 'test@example.com',
            lastModified: new Date().toISOString()
        };
    }

    async updateClientConfiguration(clientId: string, config: Partial<ClientConfiguration>): Promise<ClientConfiguration> {
        const existingConfig = await this.getClientConfiguration(clientId);
        return {
            ...existingConfig,
            ...config
        };
    }

    async getClientApiKeys(clientId: string): Promise<ClientApiKey[]> {
        return [{
            id: 1,
            clientId: 1,
            keyName: 'Test Key',
            environment: Environment.Development,
            createdAt: new Date().toISOString(),
            expiresAt: new Date().toISOString(),
            lastUsed: null,
            status: 'Active'
        }];
    }

    async createClientApiKey(clientId: string, keyData: {
        keyName: string;
        environment: Environment;
        expiresAt: string;
    }): Promise<ClientApiKey> {
        return {
            id: 1,
            clientId: 1,
            keyName: keyData.keyName,
            environment: keyData.environment,
            createdAt: new Date().toISOString(),
            expiresAt: keyData.expiresAt,
            lastUsed: null,
            status: 'Active'
        };
    }

    async revokeClientApiKey(clientId: string, keyId: number): Promise<void> {
        // Mock implementation - no actual revocation needed
    }

    async getClientContacts(clientId: string): Promise<ClientContact[]> {
        return [{
            id: 1,
            clientId: 1,
            name: 'Test Contact',
            email: 'test@example.com',
            phone: '123-456-7890',
            role: 'primary',
            isPrimary: true,
            lastModified: new Date().toISOString()
        }];
    }

    async updateClientContacts(clientId: string, contacts: ContactInformation): Promise<ContactInformation> {
        return contacts;
    }

    async getClientServices(clientId: string): Promise<IClientServiceType[]> {
        return [];
    }

    async updateClientService(
        clientId: string,
        serviceId: number,
        service: Partial<IClientServiceType>
    ): Promise<IClientServiceType> {
        return {
            id: serviceId,
            clientId: 1,
            serviceName: 'Test Service',
            status: 'Enabled',
            startDate: new Date().toISOString(),
            configuration: {}
        };
    }

    async getClientUsers(clientId: string, params?: {
        role?: UserRole;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<User>> {
        const page = params?.page || 1;
        const limit = params?.limit || 10;
        const start = (page - 1) * limit;
        const end = start + limit;

        const filteredUsers = mockUsers.filter(user => {
            if (user.clientId !== clientId) return false;
            if (params?.role && user.role !== params.role) return false;
            if (params?.searchTerm) {
                const searchTerm = params.searchTerm.toLowerCase();
                return (
                    user.firstName.toLowerCase().includes(searchTerm) ||
                    user.lastName.toLowerCase().includes(searchTerm) ||
                    user.email.toLowerCase().includes(searchTerm)
                );
            }
            return true;
        });

        const paginatedUsers = filteredUsers.slice(start, end);
        const totalPages = Math.ceil(filteredUsers.length / limit);

        return {
            items: paginatedUsers,
            pagination: {
                total: filteredUsers.length,
                page,
                limit,
                pages: totalPages
            }
        };
    }

    async getClientUserGroups(clientId: string): Promise<UserGroup[]> {
        return [];
    }

    async getClientRoles(clientId: string): Promise<SecurityRole[]> {
        return [];
    }

    async getClientPermissions(clientId: string): Promise<Permission[]> {
        return mockPermissions;
    }

    async getClientAuditLogs(clientId: string, request: AuditSearchRequest): Promise<AuditLog[]> {
        return [];
    }

    async getClientAddress(clientId: string): Promise<Address> {
        return {
            street1: '123 Test St',
            city: 'Test City',
            state: 'TS',
            zipCode: '12345',
            country: 'US'
        };
    }

    async updateClientAddress(clientId: string, address: Address): Promise<Address> {
        return address;
    }

    async getClientStats(clientId: string): Promise<{
        userCount: number;
        activeUserCount: number;
        totalTransactions: number;
        activeServices: number;
        lastActivityDate: string;
    }> {
        return {
            userCount: 1,
            activeUserCount: 1,
            totalTransactions: 0,
            activeServices: 0,
            lastActivityDate: new Date().toISOString()
        };
    }

    async getPermissions(): Promise<Permission[]> {
        return [];
    }

    async getSecuritySettings(clientId: string): Promise<SecuritySettings> {
        const client = await this.getClient(clientId);
        return client.settings.security;
    }

    async updateSecuritySettings(clientId: string, settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
        const client = mockClients.find(c => c.id === clientId);
        if (!client) {
            throw this.createError(`Client not found: ${clientId}`, 404);
        }

        client.settings.security = {
            ...client.settings.security,
            ...settings
        };

        return client.settings.security;
    }
}
