import { IClientService } from '../../interfaces/IClientService';
import { BaseService } from './BaseService';
import {
    Client,
    ClientType,
    ClientStatus,
    Environment,
    ClientSettings,
    ClientConfiguration,
    ClientApiKey,
    ClientContact,
    ClientService as ClientServiceType,
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
    SecuritySettings,
    ApiResponse
} from '../../../types/client.types';
import logger from '../../../utils/logger';

/**
 * Real implementation of ClientService
 * Communicates with the backend API
 */
export class ClientService extends BaseService implements IClientService {
    constructor(
        basePath: string = '/api/v1/clients'
    ) {
        super(basePath);
    }

    async getClients(params?: {
        type?: ClientType;
        status?: ClientStatus;
        environment?: Environment;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Client>> {
        return this.get<PaginatedResponse<Client>>('', { params });
    }

    async getClient(clientId: string): Promise<Client> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<Client>(`/${clientId}`);
    }

    async createClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
        return this.post<Client>('', client);
    }

    async updateClient(clientId: string, client: Partial<Client>): Promise<Client> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.put<Client>(`/${clientId}`, client);
    }

    async deleteClient(clientId: string): Promise<void> {
        this.validateRequired({ clientId }, ['clientId']);
        await this.delete<void>(`/${clientId}`);
    }

    async getClientSettings(clientId: string): Promise<ClientSettings> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<ClientSettings>(`/${clientId}/settings`);
    }

    async updateClientSettings(clientId: string, settings: {
        general?: Partial<ClientSettings['general']>;
        security?: Partial<ClientSettings['security']>;
        notifications?: Partial<ClientSettings['notifications']>;
    }): Promise<ClientSettings> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.put<ClientSettings>(`/${clientId}/settings`, settings);
    }

    async getClientConfiguration(clientId: string): Promise<ClientConfiguration> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<ClientConfiguration>(`/${clientId}/configuration`);
    }

    async updateClientConfiguration(clientId: string, config: Partial<ClientConfiguration>): Promise<ClientConfiguration> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.put<ClientConfiguration>(`/${clientId}/configuration`, config);
    }

    async getClientApiKeys(clientId: string): Promise<ClientApiKey[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<ClientApiKey[]>(`/${clientId}/api-keys`);
    }

    async createClientApiKey(clientId: string, keyData: {
        keyName: string;
        environment: Environment;
        expiresAt?: string;
    }): Promise<ClientApiKey> {
        this.validateRequired({ clientId, keyData }, ['clientId', 'keyData']);
        return this.post<ClientApiKey>(`/${clientId}/api-keys`, keyData);
    }

    async revokeClientApiKey(clientId: string, keyId: number): Promise<void> {
        this.validateRequired({ clientId, keyId }, ['clientId', 'keyId']);
        await this.delete<void>(`/${clientId}/api-keys/${keyId}`);
    }

    async getClientContacts(clientId: string): Promise<ClientContact[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<ClientContact[]>(`/${clientId}/contacts`);
    }

    async updateClientContacts(clientId: string, contacts: ContactInformation): Promise<ContactInformation> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.put<ContactInformation>(`/${clientId}/contacts`, contacts);
    }

    async getClientServices(clientId: string): Promise<ClientServiceType[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<ClientServiceType[]>(`/${clientId}/services`);
    }

    async updateClientService(
        clientId: string,
        serviceId: number,
        service: Partial<ClientServiceType>
    ): Promise<ClientServiceType> {
        this.validateRequired({ clientId, serviceId }, ['clientId', 'serviceId']);
        return this.put<ClientServiceType>(`/${clientId}/services/${serviceId}`, service);
    }

    async getClientUsers(clientId: string, params?: {
        role?: UserRole;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<User>> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<PaginatedResponse<User>>(`/${clientId}/users`, { params });
    }

    async getClientUserGroups(clientId: string): Promise<UserGroup[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<UserGroup[]>(`/${clientId}/groups`);
    }

    async getClientRoles(clientId: string): Promise<SecurityRole[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<SecurityRole[]>(`/${clientId}/roles`);
    }

    async getClientPermissions(clientId: string): Promise<Permission[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<Permission[]>(`/${clientId}/permissions`);
    }

    async getClientAuditLogs(clientId: string, request: AuditSearchRequest): Promise<AuditLog[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<AuditLog[]>(`/${clientId}/audit-logs`, { params: request });
    }

    async getClientAddress(clientId: string): Promise<Address> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<Address>(`/${clientId}/address`);
    }

    async updateClientAddress(clientId: string, address: Address): Promise<Address> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.put<Address>(`/${clientId}/address`, address);
    }

    async getClientStats(clientId: string): Promise<{
        userCount: number;
        activeUserCount: number;
        totalTransactions: number;
        activeServices: number;
        lastActivityDate: string;
    }> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<{
            userCount: number;
            activeUserCount: number;
            totalTransactions: number;
            activeServices: number;
            lastActivityDate: string;
        }>(`/${clientId}/stats`);
    }

    async getPermissions(): Promise<Permission[]> {
        try {
            return await this.get<Permission[]>('/permissions');
        } catch (error) {
            throw this.handleError(error, 'Failed to get permissions');
        }
    }

    async getSecuritySettings(clientId: string): Promise<SecuritySettings> {
        try {
            this.validateRequired({ clientId }, ['clientId']);
            return await this.get<SecuritySettings>(`/${clientId}/security-settings`);
        } catch (error) {
            throw this.handleError(error, 'Failed to get security settings');
        }
    }

    async updateSecuritySettings(clientId: string, settings: Partial<SecuritySettings>): Promise<SecuritySettings> {
        try {
            this.validateRequired({ clientId }, ['clientId']);
            return await this.put<SecuritySettings>(`/${clientId}/security-settings`, settings);
        } catch (error) {
            throw this.handleError(error, 'Failed to update security settings');
        }
    }

    protected handleError(error: unknown, defaultMessage: string): Error {
        logger.error(`${defaultMessage}: ${error instanceof Error ? error.message : String(error)}`);
        if (error instanceof Error) {
            return error;
        }
        return new Error(defaultMessage);
    }
}
