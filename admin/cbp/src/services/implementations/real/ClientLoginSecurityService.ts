import { IClientLoginSecurityService } from '../../interfaces/IClientLoginSecurityService';
import { BaseService } from './BaseService';
import { ClientLoginSecurityResponse, ClientLoginSecurityUpdateRequest } from '../../../types/security.types';
import logger from '../../../utils/logger';

/**
 * Real implementation of ClientLoginSecurityService
 * Communicates with the backend API for client login security settings management
 */
export class ClientLoginSecurityService extends BaseService implements IClientLoginSecurityService {
  constructor(basePath: string = '/api') {
    super(basePath);
  }

  /**
   * Get login security settings by ID
   * @param id The ID of the login security settings to retrieve
   * @returns Promise resolving to the login security settings
   */
  async getLoginSecurityById(id: number): Promise<ClientLoginSecurityResponse> {
    this.validateRequired({ id }, ['id']);
    return this.get<ClientLoginSecurityResponse>(`/ClientLoginSecurity/${id}`);
  }

  /**
   * Get login security settings for a specific client
   * @param clientId The ID of the client
   * @returns Promise resolving to the login security settings for the client
   */
  async getLoginSecurityByClientId(clientId: number): Promise<ClientLoginSecurityResponse> {
    this.validateRequired({ clientId }, ['clientId']);
    return this.get<ClientLoginSecurityResponse>(`/ClientLoginSecurity/client/${clientId}`);
  }

  /**
   * Update login security settings
   * @param settings The updated login security settings
   * @returns Promise resolving to the updated login security settings
   */
  async updateLoginSecurity(settings: ClientLoginSecurityUpdateRequest): Promise<ClientLoginSecurityResponse> {
    this.validateRequired({ settings }, ['settings']);
    return this.put<ClientLoginSecurityResponse>('/ClientLoginSecurity', settings);
  }
}
