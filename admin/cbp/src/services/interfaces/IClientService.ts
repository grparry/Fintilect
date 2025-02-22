import { IBaseService } from './IBaseService';
import {
    Customer,
    ClientType,
    ClientStatus,
    Environment,
    ClientConfiguration,
    ClientApiKey,
    ClientContact,
    ClientService,
    PaginatedResponse,
    User,
    UserGroup
} from '../../types/client.types';

/**
 * Interface for client/customer management
 * Handles customer operations, configurations, and API keys
 */
export interface IClientService extends IBaseService {
    /**
     * Get customers with pagination and filtering
     * @param params Filter and pagination parameters
     * @returns Paginated list of customers
     */
    getCustomers(params?: {
        tenantId?: number;
        isActive?: boolean;
        type?: ClientType;
        status?: ClientStatus;
        environment?: Environment;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Customer>>;

    /**
     * Get specific customer
     * @param customerId Customer identifier
     * @returns Customer details
     */
    getCustomer(customerId: number): Promise<Customer>;

    /**
     * Create customer
     * @param customer Customer data to create
     * @returns Created customer
     */
    createCustomer(customer: Omit<Customer, 'id' | 'createdOn' | 'updatedOn'>): Promise<Customer>;

    /**
     * Update customer
     * @param customerId Customer identifier
     * @param customer Updated customer data
     * @returns Updated customer
     */
    updateCustomer(customerId: number, customer: Partial<Customer>): Promise<Customer>;

    /**
     * Delete customer
     * @param customerId Customer identifier
     */
    deleteCustomer(customerId: number): Promise<void>;

    /**
     * Get customer configuration
     * @param customerId Customer identifier
     * @returns Customer configuration
     */
    getCustomerConfig(customerId: number): Promise<ClientConfiguration>;

    /**
     * Update customer configuration
     * @param customerId Customer identifier
     * @param config Updated configuration
     * @returns Updated configuration
     */
    updateCustomerConfig(customerId: number, config: Partial<ClientConfiguration>): Promise<ClientConfiguration>;

    /**
     * Get customer API keys
     * @param customerId Customer identifier
     * @returns List of API keys
     */
    getCustomerApiKeys(customerId: number): Promise<ClientApiKey[]>;

    /**
     * Create API key for customer
     * @param customerId Customer identifier
     * @param apiKey API key data
     * @returns Created API key
     */
    createCustomerApiKey(customerId: number, apiKey: Omit<ClientApiKey, 'id' | 'clientId' | 'createdAt' | 'lastUsed'>): Promise<ClientApiKey>;

    /**
     * Update API key
     * @param customerId Customer identifier
     * @param apiKeyId API key identifier
     * @param apiKey Updated API key data
     * @returns Updated API key
     */
    updateCustomerApiKey(customerId: number, apiKeyId: number, apiKey: Partial<ClientApiKey>): Promise<ClientApiKey>;

    /**
     * Delete API key
     * @param customerId Customer identifier
     * @param apiKeyId API key identifier
     */
    deleteCustomerApiKey(customerId: number, apiKeyId: number): Promise<void>;

    /**
     * Get customer services
     * @param customerId Customer identifier
     * @returns List of services
     */
    getCustomerServices(customerId: number): Promise<ClientService[]>;

    /**
     * Update customer service
     * @param customerId Customer identifier
     * @param serviceId Service identifier
     * @param service Updated service data
     * @returns Updated service
     */
    updateCustomerService(customerId: number, serviceId: number, service: Partial<ClientService>): Promise<ClientService>;

    /**
     * Get customer contacts
     * @param customerId Customer identifier
     * @returns List of contacts
     */
    getCustomerContacts(customerId: number): Promise<ClientContact[]>;

    /**
     * Create contact for customer
     * @param customerId Customer identifier
     * @param contact Contact data
     * @returns Created contact
     */
    createCustomerContact(customerId: number, contact: Omit<ClientContact, 'id' | 'clientId'>): Promise<ClientContact>;

    /**
     * Update contact
     * @param customerId Customer identifier
     * @param contactId Contact identifier
     * @param contact Updated contact data
     * @returns Updated contact
     */
    updateCustomerContact(customerId: number, contactId: number, contact: Partial<ClientContact>): Promise<ClientContact>;

    /**
     * Delete contact
     * @param customerId Customer identifier
     * @param contactId Contact identifier
     */
    deleteCustomerContact(customerId: number, contactId: number): Promise<void>;

    /**
     * Get user details
     * @param clientId Client identifier
     * @param userId User identifier
     * @returns User details
     */
    getUser(clientId: number, userId: number): Promise<User>;

    /**
     * Get groups for a client
     * @param clientId Client identifier
     * @returns List of groups
     */
    getGroups(clientId: number): Promise<UserGroup[]>;

    /**
     * Update user details
     * @param clientId Client identifier
     * @param userId User identifier
     * @param userData Updated user data
     * @returns Updated user
     */
    updateUser(clientId: number, userId: number, userData: Partial<User>): Promise<User>;
}