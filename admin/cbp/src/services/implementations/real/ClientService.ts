import { IClientService } from '../../interfaces/IClientService';
import { BaseService } from './BaseService';
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
    UserGroup
} from '../../../types/client.types';
import logger from '../../../utils/logger';

/**
 * Real implementation of ClientService
 * Communicates with the backend API for customer management
 */
export class ClientService extends BaseService implements IClientService {
    constructor(basePath: string = '/api/v1/customers') {
        super(basePath);
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
        return this.get<PaginatedResponse<Customer>>('', { params });
    }

    async getCustomer(customerId: number): Promise<Customer> {
        this.validateRequired({ customerId }, ['customerId']);
        return this.get<Customer>(`/${customerId}`);
    }

    async createCustomer(customer: Omit<Customer, 'id' | 'createdOn' | 'updatedOn'>): Promise<Customer> {
        return this.post<Customer>('', customer);
    }

    async updateCustomer(customerId: number, customer: Partial<Customer>): Promise<Customer> {
        this.validateRequired({ customerId }, ['customerId']);
        return this.put<Customer>(`/${customerId}`, customer);
    }

    async deleteCustomer(customerId: number): Promise<void> {
        this.validateRequired({ customerId }, ['customerId']);
        await this.delete<void>(`/${customerId}`);
    }

    async getCustomerConfig(customerId: number): Promise<ClientConfiguration> {
        this.validateRequired({ customerId }, ['customerId']);
        return this.get<ClientConfiguration>(`/${customerId}/configuration`);
    }

    async updateCustomerConfig(customerId: number, config: Partial<ClientConfiguration>): Promise<ClientConfiguration> {
        this.validateRequired({ customerId }, ['customerId']);
        return this.put<ClientConfiguration>(`/${customerId}/configuration`, config);
    }

    async getCustomerApiKeys(customerId: number): Promise<ClientApiKey[]> {
        this.validateRequired({ customerId }, ['customerId']);
        return this.get<ClientApiKey[]>(`/${customerId}/api-keys`);
    }

    async createCustomerApiKey(customerId: number, apiKey: Omit<ClientApiKey, 'id' | 'clientId' | 'createdAt' | 'lastUsed'>): Promise<ClientApiKey> {
        this.validateRequired({ customerId, apiKey }, ['customerId', 'apiKey']);
        return this.post<ClientApiKey>(`/${customerId}/api-keys`, apiKey);
    }

    async updateCustomerApiKey(customerId: number, apiKeyId: number, apiKey: Partial<ClientApiKey>): Promise<ClientApiKey> {
        this.validateRequired({ customerId, apiKeyId }, ['customerId', 'apiKeyId']);
        return this.put<ClientApiKey>(`/${customerId}/api-keys/${apiKeyId}`, apiKey);
    }

    async deleteCustomerApiKey(customerId: number, apiKeyId: number): Promise<void> {
        this.validateRequired({ customerId, apiKeyId }, ['customerId', 'apiKeyId']);
        await this.delete<void>(`/${customerId}/api-keys/${apiKeyId}`);
    }

    async getCustomerServices(customerId: number): Promise<ClientServiceType[]> {
        this.validateRequired({ customerId }, ['customerId']);
        return this.get<ClientServiceType[]>(`/${customerId}/services`);
    }

    async updateCustomerService(customerId: number, serviceId: number, service: Partial<ClientServiceType>): Promise<ClientServiceType> {
        this.validateRequired({ customerId, serviceId }, ['customerId', 'serviceId']);
        return this.put<ClientServiceType>(`/${customerId}/services/${serviceId}`, service);
    }

    async getCustomerContacts(customerId: number): Promise<ClientContact[]> {
        this.validateRequired({ customerId }, ['customerId']);
        return this.get<ClientContact[]>(`/${customerId}/contacts`);
    }

    async createCustomerContact(customerId: number, contact: Omit<ClientContact, 'id' | 'clientId'>): Promise<ClientContact> {
        this.validateRequired({ customerId, contact }, ['customerId', 'contact']);
        return this.post<ClientContact>(`/${customerId}/contacts`, contact);
    }

    async updateCustomerContact(customerId: number, contactId: number, contact: Partial<ClientContact>): Promise<ClientContact> {
        this.validateRequired({ customerId, contactId }, ['customerId', 'contactId']);
        return this.put<ClientContact>(`/${customerId}/contacts/${contactId}`, contact);
    }

    async deleteCustomerContact(customerId: number, contactId: number): Promise<void> {
        this.validateRequired({ customerId, contactId }, ['customerId', 'contactId']);
        await this.delete<void>(`/${customerId}/contacts/${contactId}`);
    }

    async getUser(clientId: number, userId: number): Promise<User> {
        const { data } = await this.get<{ data: User }>(`/clients/${clientId}/users/${userId}`);
        return data;
    }

    async getGroups(clientId: number): Promise<UserGroup[]> {
        const { data } = await this.get<{ data: UserGroup[] }>(`/clients/${clientId}/groups`);
        return data;
    }

    async updateUser(clientId: number, userId: number, userData: Partial<User>): Promise<User> {
        const { data } = await this.put<{ data: User }>(`/clients/${clientId}/users/${userId}`, userData);
        return data;
    }
}