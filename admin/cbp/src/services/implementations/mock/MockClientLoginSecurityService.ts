import { IClientLoginSecurityService } from '../../interfaces/IClientLoginSecurityService';
import { BaseMockService } from './BaseMockService';
import { ClientLoginSecurityResponse, ClientLoginSecurityUpdateRequest } from '../../../types/security.types';
import { mockClientLoginSecuritySettings } from './data/security/mockClientLoginSecurityData';

/**
 * Mock implementation of ClientLoginSecurityService
 * Uses in-memory data for testing and development
 */
export class MockClientLoginSecurityService extends BaseMockService implements IClientLoginSecurityService {
  private loginSecuritySettings: Map<number, ClientLoginSecurityResponse>;

  constructor(basePath: string = '/api') {
    super(basePath);
    this.loginSecuritySettings = new Map(mockClientLoginSecuritySettings.map(setting => [setting.id, setting]));
  }

  /**
   * Get login security settings by ID
   * @param id The ID of the login security settings to retrieve
   * @returns Promise resolving to the login security settings
   */
  async getLoginSecurityById(id: number): Promise<ClientLoginSecurityResponse> {
    this.validateRequired({ id }, ['id']);
    await this.delay();

    const settings = this.loginSecuritySettings.get(id);
    if (!settings) {
      throw this.createError(`Login security settings not found: ${id}`, 404);
    }
    
    return settings;
  }

  /**
   * Get login security settings for a specific client
   * @param clientId The ID of the client
   * @returns Promise resolving to the login security settings for the client
   */
  async getLoginSecurityByClientId(clientId: number): Promise<ClientLoginSecurityResponse> {
    this.validateRequired({ clientId }, ['clientId']);
    await this.delay();

    const settings = Array.from(this.loginSecuritySettings.values())
      .find(setting => setting.clientId === clientId);
    
    if (!settings) {
      throw this.createError(`Login security settings not found for client: ${clientId}`, 404);
    }
    
    return settings;
  }

  /**
   * Update login security settings
   * @param settings The updated login security settings
   * @returns Promise resolving to the updated login security settings
   */
  async updateLoginSecurity(settings: ClientLoginSecurityUpdateRequest): Promise<ClientLoginSecurityResponse> {
    this.validateRequired({ settings }, ['settings']);
    await this.delay();

    const existingSettings = this.loginSecuritySettings.get(settings.id);
    if (!existingSettings) {
      throw this.createError(`Login security settings not found: ${settings.id}`, 404);
    }

    const updatedSettings: ClientLoginSecurityResponse = {
      ...existingSettings,
      minPasswordLength: settings.minPasswordLength,
      requireUppercase: settings.requireUppercase,
      requireLowercase: settings.requireLowercase,
      requireNumbers: settings.requireNumbers,
      requireSpecialCharacters: settings.requireSpecialCharacters,
      passwordExpiryDays: settings.passwordExpiryDays,
      maxLoginAttempts: settings.maxLoginAttempts,
      sessionTimeoutMinutes: settings.sessionTimeoutMinutes,
      preventPasswordReuse: settings.preventPasswordReuse,
      twoFactorAuthRequired: settings.twoFactorAuthRequired,
      updatedOn: new Date().toISOString(),
      lastModifiedBy: 'mock-user@example.com'
    };

    this.loginSecuritySettings.set(settings.id, updatedSettings);
    
    return updatedSettings;
  }
}
