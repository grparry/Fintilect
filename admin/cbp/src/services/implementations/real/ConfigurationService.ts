import { BaseService } from './BaseService';
import { IConfigurationService } from '../../interfaces/IConfigurationService';
import { ConfigurationSetting, ConfigurationResponse } from '../../../types/configuration.types';
import { ServiceFactory } from '../../factory/ServiceFactory';

/**
 * Service for interacting with the configuration settings API
 */
export class ConfigurationService extends BaseService implements IConfigurationService {
  constructor() {
    super(ServiceFactory.getAdminCuEndpoint('/api/v1/Configuration'));
  }
  
  /**
   * Get all configuration settings
   * @returns Promise with all configuration settings
   */
  async getAllSettings(): Promise<ConfigurationResponse> {
    return this.get('/all');
  }
  
  /**
   * Get a specific configuration setting by name
   * @param configName The name of the configuration setting
   * @returns Promise with the requested configuration setting or undefined if not found
   */
  async getSettingByName(configName: string): Promise<ConfigurationSetting | undefined> {
    const response = await this.getAllSettings();
    return response.configurations.find(config => config.configName === configName);
  }
  
  /**
   * Update a configuration setting
   * @param setting The configuration setting to update
   * @returns Promise indicating success
   */
  async updateSetting(setting: ConfigurationSetting): Promise<void> {
    await this.put('', setting);
  }
}
