import { IBaseService } from './IBaseService';
import {
    Client,
    ClientType,
    ClientStatus,
    Environment,
    ClientConfiguration,
    ClientApiKey,
    ClientContact,
    ClientService,
    PaginatedResponse,
    User,
    UserGroup,
    SecuritySettings,
} from '../../types/client.types';

/**
 * Interface for client/client management
 * Handles client operations, configurations, and API keys
 */
export interface IClientService extends IBaseService {
    /**
     * Get clients with pagination and filtering
     * @param params Filter and pagination parameters
     * @returns Paginated list of clients
     */
    getClients(params?: {
        tenantId?: number;
        isActive?: boolean;
        type?: ClientType;
        status?: ClientStatus;
        environment?: Environment;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<Client>>;

    /**
     * Get specific client
     * @param clientId Client identifier
     * @returns Client details
     */
    getClient(clientId: number): Promise<Client>;

    /**
     * Create client
     * @param client Client data to create
     * @returns Created client
     */
    createClient(client: Omit<Client, 'id' | 'createdOn' | 'updatedOn'>): Promise<Client>;

    /**
     * Update client
     * @param clientId Client identifier
     * @param client Updated client data
     * @returns Updated client
     */
    updateClient(clientId: number, client: Partial<Client>): Promise<Client>;

    /**
     * Delete client
     * @param clientId Client identifier
     */
    deleteClient(clientId: number): Promise<void>;

    /**
     * Get client configuration
     * @param clientId Client identifier
     * @returns Client configuration
     */
    getClientConfig(clientId: number): Promise<ClientConfiguration>;

    /**
     * Update client configuration
     * @param clientId Client identifier
     * @param config Updated configuration
     * @returns Updated configuration
     */
    updateClientConfig(clientId: number, config: Partial<ClientConfiguration>): Promise<ClientConfiguration>;

    /**
     * Get client API keys
     * @param clientId Client identifier
     * @returns List of API keys
     */
    getClientApiKeys(clientId: number): Promise<ClientApiKey[]>;

    /**
     * Create API key for client
     * @param clientId Client identifier
     * @param apiKey API key data
     * @returns Created API key
     */
    createClientApiKey(clientId: number, apiKey: Omit<ClientApiKey, 'id' | 'clientId' | 'createdAt' | 'lastUsed'>): Promise<ClientApiKey>;

    /**
     * Update API key
     * @param clientId Client identifier
     * @param apiKeyId API key identifier
     * @param apiKey Updated API key data
     * @returns Updated API key
     */
    updateClientApiKey(clientId: number, apiKeyId: number, apiKey: Partial<ClientApiKey>): Promise<ClientApiKey>;

    /**
     * Delete API key
     * @param clientId Client identifier
     * @param apiKeyId API key identifier
     */
    deleteClientApiKey(clientId: number, apiKeyId: number): Promise<void>;

    /**
     * Get client services
     * @param clientId Client identifier
     * @returns List of services
     */
    getClientServices(clientId: number): Promise<ClientService[]>;

    /**
     * Update client service
     * @param clientId Client identifier
     * @param serviceId Service identifier
     * @param service Updated service data
     * @returns Updated service
     */
    updateClientService(clientId: number, serviceId: number, service: Partial<ClientService>): Promise<ClientService>;

    /**
     * Get client contacts
     * @param clientId Client identifier
     * @returns List of contacts
     */
    getClientContacts(clientId: number): Promise<ClientContact[]>;

    /**
     * Create contact for client
     * @param clientId Client identifier
     * @param contact Contact data
     * @returns Created contact
     */
    createClientContact(clientId: number, contact: Omit<ClientContact, 'id' | 'clientId'>): Promise<ClientContact>;

    /**
     * Update contact
     * @param clientId Client identifier
     * @param contactId Contact identifier
     * @param contact Updated contact data
     * @returns Updated contact
     */
    updateClientContact(clientId: number, contactId: number, contact: Partial<ClientContact>): Promise<ClientContact>;

    /**
     * Delete contact
     * @param clientId Client identifier
     * @param contactId Contact identifier
     */
    deleteClientContact(clientId: number, contactId: number): Promise<void>;

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