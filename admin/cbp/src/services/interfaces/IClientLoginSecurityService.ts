import { ClientLoginSecurityResponse, ClientLoginSecurityUpdateRequest } from '../../types/security.types';

/**
 * Interface for the Client Login Security service
 * Provides methods for managing client login security settings
 */
export interface IClientLoginSecurityService {
  /**
   * Get login security settings by ID
   * @param id The ID of the login security settings to retrieve
   * @returns Promise resolving to the login security settings
   */
  getLoginSecurityById(id: number): Promise<ClientLoginSecurityResponse>;

  /**
   * Get login security settings for a specific client
   * @param clientId The ID of the client
   * @returns Promise resolving to the login security settings for the client
   */
  getLoginSecurityByClientId(clientId: number): Promise<ClientLoginSecurityResponse>;

  /**
   * Update login security settings
   * @param settings The updated login security settings
   * @returns Promise resolving to the updated login security settings
   */
  updateLoginSecurity(settings: ClientLoginSecurityUpdateRequest): Promise<ClientLoginSecurityResponse>;
}
