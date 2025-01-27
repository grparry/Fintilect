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
    ContactInformation,
    Address,
    PaginatedResponse,
    Contact,
    UserStatus
} from '../../../types/client.types';
import { AuditLog, AuditSearchRequest, SecuritySettings, LoginPolicy } from '../../types/security.types';
import { mockClients, mockUsers, defaultSettings, mockPermissions, mockGroups, mockAuditLogs } from './data/client/mockClientData';

/**


/**
 * Mock implementation of ClientService
 * Uses in-memory data for testing and development
 */


        // Initialize mock data structures
            
            // Debug log


                    (c.domain?.toLowerCase() || '').includes(search) ||
                    (c.contactName?.toLowerCase() || '').includes(search)
                );






            ...client,




            ...this.clients[index],
            ...client,








            ...client.settings,



















            ...contacts.emergencyContacts.map(c => this.createClientContact(clientId, c, 'Emergency'))
        ];





    ): Promise<ClientService> {



            ...services![serviceIndex],
            ...service,




                );






            {
            {
            {
        ];




        
        
        
        // Apply filters

        // Store total before pagination

        // Apply sorting
                

        // Apply pagination













            ...group,

            ...groups[groupIndex],
            ...group,




            ...user,

            ...users[userIndex],
            ...user,


            ...users[userIndex],
