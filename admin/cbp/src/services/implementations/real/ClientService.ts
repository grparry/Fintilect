import { IClientService } from '../../interfaces/IClientService';
import { BaseService } from './BaseService';
import {
    Client,
    ClientType,
    ClientStatus,
    Environment,
    ClientConfiguration,
    ClientApiKey,
    ClientContact,
    ClientService as ClientServiceType,
    PaginatedResponse,
    User,
    UserGroup
} from '../../../types/client.types';
import logger from '../../../utils/logger';
import { ClientListResponse } from '../../../types/client.types';

/**
 * Real implementation of ClientService
 * Communicates with the backend API for client management
 */
export class ClientService extends BaseService implements IClientService {
    constructor(basePath: string = '/api') {
        super(basePath);
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
        return this.get<ClientListResponse>('/Client', { params });
    }

    async getClient(clientId: number): Promise<Client> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<Client>(`/Client/${clientId}`);
    }

    async createClient(client: Omit<Client, 'id' | 'createdOn' | 'updatedOn'>): Promise<Client> {
        return this.post<Client>('/Client', client);
    }

    async updateClient(clientId: number, client: Partial<Client>): Promise<Client> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.put<Client>(`/Client/${clientId}`, client);
    }

    async deleteClient(clientId: number): Promise<void> {
        this.validateRequired({ clientId }, ['clientId']);
        await this.delete<void>(`/Client/${clientId}`);
    }

    async getClientConfig(clientId: number): Promise<ClientConfiguration> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<ClientConfiguration>(`/Client/${clientId}/configuration`);
    }

    async updateClientConfig(clientId: number, config: Partial<ClientConfiguration>): Promise<ClientConfiguration> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.put<ClientConfiguration>(`/Client/${clientId}/configuration`, config);
    }

    async getClientApiKeys(clientId: number): Promise<ClientApiKey[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<ClientApiKey[]>(`/Client/${clientId}/api-keys`);
    }

    async createClientApiKey(clientId: number, apiKey: Omit<ClientApiKey, 'id' | 'clientId' | 'createdAt' | 'lastUsed'>): Promise<ClientApiKey> {
        this.validateRequired({ clientId, apiKey }, ['clientId', 'apiKey']);
        return this.post<ClientApiKey>(`/Client/${clientId}/api-keys`, apiKey);
    }

    async updateClientApiKey(clientId: number, apiKeyId: number, apiKey: Partial<ClientApiKey>): Promise<ClientApiKey> {
        this.validateRequired({ clientId, apiKeyId }, ['clientId', 'apiKeyId']);
        return this.put<ClientApiKey>(`/Client/${clientId}/api-keys/${apiKeyId}`, apiKey);
    }

    async deleteClientApiKey(clientId: number, apiKeyId: number): Promise<void> {
        this.validateRequired({ clientId, apiKeyId }, ['clientId', 'apiKeyId']);
        await this.delete<void>(`/Client/${clientId}/api-keys/${apiKeyId}`);
    }

    async getClientServices(clientId: number): Promise<ClientServiceType[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<ClientServiceType[]>(`/Client/${clientId}/services`);
    }

    async updateClientService(clientId: number, serviceId: number, service: Partial<ClientServiceType>): Promise<ClientServiceType> {
        this.validateRequired({ clientId, serviceId }, ['clientId', 'serviceId']);
        return this.put<ClientServiceType>(`/Client/${clientId}/services/${serviceId}`, service);
    }

    async getClientContacts(clientId: number): Promise<ClientContact[]> {
        this.validateRequired({ clientId }, ['clientId']);
        const response = await this.get<{ contacts: ClientContact[] }>(`/Client/${clientId}/Contact`);
        return response.contacts;
    }

    async createClientContact(clientId: number, contact: Omit<ClientContact, 'id' | 'clientId'>): Promise<ClientContact> {
        this.validateRequired({ clientId, contact }, ['clientId', 'contact']);
        return this.post<ClientContact>(`/Client/${clientId}/Contact`, contact);
    }

    async updateClientContact(clientId: number, contactId: number, contact: Partial<ClientContact>): Promise<ClientContact> {
        this.validateRequired({ clientId, contactId }, ['clientId', 'contactId']);
        return this.put<ClientContact>(`/Client/${clientId}/Contact/${contactId}`, contact);
    }

    async deleteClientContact(clientId: number, contactId: number): Promise<void> {
        this.validateRequired({ clientId, contactId }, ['clientId', 'contactId']);
        await this.delete<void>(`/Client/${clientId}/Contact/${contactId}`);
    }

    async getUser(clientId: number, userId: number): Promise<User> {
        this.validateRequired({ clientId, userId }, ['clientId', 'userId']);
        return this.get<User>(`/Client/${clientId}/users/${userId}`);
    }

    async updateUser(clientId: number, userId: number, userData: Partial<User>): Promise<User> {
        this.validateRequired({ clientId, userId }, ['clientId', 'userId']);
        return this.put<User>(`/Client/${clientId}/users/${userId}`, userData);
    }

    async getGroups(clientId: number): Promise<UserGroup[]> {
        this.validateRequired({ clientId }, ['clientId']);
        return this.get<UserGroup[]>(`/Client/${clientId}/groups`);
    }
}