import { ConfigurationSetting, ConfigurationResponse } from '../../types/configuration.types';

/**
 * Interface for the Configuration Service
 * Provides methods to interact with the configuration settings API
 */
export interface IConfigurationService {
  /**
   * Get all configuration settings
   * @returns Promise with all configuration settings
   */
  getAllSettings(): Promise<ConfigurationResponse>;
  
  /**
   * Get a specific configuration setting by name
   * @param configName The name of the configuration setting
   * @returns Promise with the requested configuration setting or undefined if not found
   */
  getSettingByName(configName: string): Promise<ConfigurationSetting | undefined>;
  
  /**
   * Update a configuration setting
   * @param setting The configuration setting to update
   * @returns Promise indicating success
   */
  updateSetting(setting: ConfigurationSetting): Promise<void>;
}
