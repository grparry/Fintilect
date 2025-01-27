import { IBaseService } from '@/IBaseService';
import {
    Client,
    ClientType,
    ClientStatus,
    Environment,
    ClientSettings,
    GeneralSettings,
    SecuritySettings,
    NotificationSettings,
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
    PaginatedResponse
} from '@/../types/client.types';

/**
 * Interface for client management
 * Handles client operations, settings, and relationships
 */
export interface IClientService extends IBaseService {
    /**
     * Get clients with pagination and filtering
     * @param params Filter and pagination parameters
     * @returns Paginated list of clients
     */
    getClients(params?: {
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
    getClient(clientId: string): Promise<Client>;

    /**
     * Create client
     * @param client Client to create
     * @returns Created client
     */
    createClient(client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client>;

    /**
     * Update client
     * @param clientId Client identifier
     * @param client Updated client data
     * @returns Updated client
     */
    updateClient(clientId: string, client: Partial<Client>): Promise<Client>;

    /**
     * Delete client
     * @param clientId Client identifier
     */
    deleteClient(clientId: string): Promise<void>;

    /**
     * Get client settings
     * @param clientId Client identifier
     * @returns Client settings
     */
    getClientSettings(clientId: string): Promise<ClientSettings>;

    /**
     * Update client settings
     * @param clientId Client identifier
     * @param settings Updated settings
     * @returns Updated settings
     */
    updateClientSettings(clientId: string, settings: {
        general?: Partial<GeneralSettings>;
        security?: Partial<SecuritySettings>;
        notifications?: Partial<NotificationSettings>;
    }): Promise<ClientSettings>;

    /**
     * Get client configuration
     * @param clientId Client identifier
     * @returns Client configuration
     */
    getClientConfiguration(clientId: string): Promise<ClientConfiguration>;

    /**
     * Update client configuration
     * @param clientId Client identifier
     * @param config Updated configuration
     * @returns Updated configuration
     */
    updateClientConfiguration(clientId: string, config: Partial<ClientConfiguration>): Promise<ClientConfiguration>;

    /**
     * Get client API keys
     * @param clientId Client identifier
     * @returns List of API keys
     */
    getClientApiKeys(clientId: string): Promise<ClientApiKey[]>;

    /**
     * Create client API key
     * @param clientId Client identifier
     * @param keyData API key data
     * @returns Created API key
     */
    createClientApiKey(clientId: string, keyData: {
        keyName: string;
        environment: Environment;
        expiresAt?: string;
    }): Promise<ClientApiKey>;

    /**
     * Revoke client API key
     * @param clientId Client identifier
     * @param keyId API key identifier
     */
    revokeClientApiKey(clientId: string, keyId: number): Promise<void>;

    /**
     * Get client contacts
     * @param clientId Client identifier
     * @returns List of contacts
     */
    getClientContacts(clientId: string): Promise<ClientContact[]>;

    /**
     * Update client contacts
     * @param clientId Client identifier
     * @param contacts Updated contact information
     * @returns Updated contacts
     */
    updateClientContacts(clientId: string, contacts: ContactInformation): Promise<ContactInformation>;

    /**
     * Get client services
     * @param clientId Client identifier
     * @returns List of services
     */
    getClientServices(clientId: string): Promise<ClientService[]>;

    /**
     * Update client service
     * @param clientId Client identifier
     * @param serviceId Service identifier
     * @param service Updated service data
     * @returns Updated service
     */
    updateClientService(
        clientId: string,
        serviceId: number,
        service: Partial<ClientService>
    ): Promise<ClientService>;

    /**
     * Get client users
     * @param clientId Client identifier
     * @returns Paginated list of users
     */
    getClientUsers(clientId: string, params?: {
        role?: UserRole;
        searchTerm?: string;
        page?: number;
        limit?: number;
    }): Promise<PaginatedResponse<User>>;

    /**
     * Get client user groups
     * @param clientId Client identifier
     * @returns List of user groups
     */
    getClientUserGroups(clientId: string): Promise<UserGroup[]>;

    /**
     * Get client roles
     * @param clientId Client identifier
     * @returns List of security roles
     */
    getClientRoles(clientId: string): Promise<SecurityRole[]>;

    /**
     * Get client permissions
     * @param clientId Client identifier
     * @returns List of permissions
     */
    getClientPermissions(clientId: string): Promise<Permission[]>;

    /**
     * Get client audit logs
     * @param clientId Client identifier
     * @param request Search parameters
     * @returns Paginated list of audit logs
     */
    getClientAuditLogs(clientId: string, request: AuditSearchRequest): Promise<{ logs: AuditLog[]; total: number }>;

    /**
     * Get client address
     * @param clientId Client identifier
     * @returns Client address
     */
    getClientAddress(clientId: string): Promise<Address>;

    /**
     * Update client address
     * @param clientId Client identifier
     * @param address Updated address
     * @returns Updated address
     */
    updateClientAddress(clientId: string, address: Address): Promise<Address>;

    /**
     * Get client statistics
     * @param clientId Client identifier
     * @returns Client statistics
     */
    getClientStats(clientId: string): Promise<{
        userCount: number;
        activeUserCount: number;
        totalTransactions: number;
        activeServices: number;
        lastActivityDate: string;
    }>;

    /**
     * Get all available permissions
     * @returns List of all permissions
     */
    getPermissions(): Promise<Permission[]>;

    /**
     * Get client security settings
     * @param clientId Client identifier
     * @returns Client security settings
     */
    getSecuritySettings(clientId: string): Promise<SecuritySettings>;

    /**
     * Update client security settings
     * @param clientId Client identifier
     * @param settings Updated security settings
     * @returns Updated security settings
     */
    updateSecuritySettings(clientId: string, settings: Partial<SecuritySettings>): Promise<SecuritySettings>;

    /**
     * Get a specific user group
     * @param clientId Client identifier
     * @param groupId Group identifier
     * @returns User group details
     */
    getGroup(clientId: string, groupId: string): Promise<UserGroup>;

    /**
     * Create a new user group
     * @param clientId Client identifier
     * @param group Group to create
     * @returns Created group
     */
    createGroup(clientId: string, group: Omit<UserGroup, 'id'>): Promise<UserGroup>;

    /**
     * Update an existing user group
     * @param clientId Client identifier
     * @param groupId Group identifier
     * @param group Updated group data
     * @returns Updated group
     */
    updateGroup(clientId: string, groupId: string, group: Partial<UserGroup>): Promise<UserGroup>;

    /**
     * Delete a user group
     * @param clientId Client identifier
     * @param groupId Group identifier
     */
    deleteGroup(clientId: string, groupId: string): Promise<void>;

    /**
     * Get all groups for a client
     * @param clientId Client identifier
     * @returns List of user groups
     */
    getGroups(clientId: string): Promise<UserGroup[]>;

    /**
     * Get a specific user
     * @param clientId Client identifier
     * @param userId User identifier
     * @returns User details
     */
    getUser(clientId: string, userId: string): Promise<User>;

    /**
     * Create a new user
     * @param clientId Client identifier
     * @param user User to create
     * @returns Created user
     */
    createUser(clientId: string, user: Omit<User, 'id'>): Promise<User>;

    /**
     * Update an existing user
     * @param clientId Client identifier
     * @param userId User identifier
     * @param user Updated user data
     * @returns Updated user
     */
    updateUser(clientId: string, userId: string, user: Partial<User>): Promise<User>;

    /**
     * Delete a user
     * @param clientId Client identifier
     * @param userId User identifier
     */
    deleteUser(clientId: string, userId: string): Promise<void>;

    /**
     * Lock or unlock a user account
     * @param clientId Client identifier
     * @param userId User identifier
     * @param locked Whether to lock or unlock the account
     */
    setUserLockStatus(clientId: string, userId: string, locked: boolean): Promise<void>;
}
