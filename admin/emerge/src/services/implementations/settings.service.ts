import api from '../api';
import { ApiSuccessResponse } from '../../types/api.types';

export interface Setting {
  key: string;
  value: string;
  description?: string;
  dataType: 'string' | 'number' | 'boolean' | 'json';
  validation?: Record<string, any>;
}
export interface SettingGroup {
  settings: Setting[];
  metadata: {
    __metadata?: Record<string, string>;
    __validations?: Record<string, any>;
    __display?: Record<string, any>;
  };
}
class SettingsService {
  private readonly baseUrl = '/v1/settings';
  /**
   * Get all settings for a specific settings group
   * @param groupName The settings group name (e.g., 'AccountSettings', 'TravelNotificationFeature')
   */
  async getSettingsGroup(groupName: string): Promise<ApiSuccessResponse<SettingGroup>> {
    return api.get<SettingGroup>(`${this.baseUrl}/groups/${groupName}`);
  }
  /**
   * Get a single setting by its key
   * @param key The setting key (e.g., 'Features.TravelNotification.TravelNotificationEnabled')
   */
  async getSetting(key: string): Promise<ApiSuccessResponse<Setting>> {
    return api.get<Setting>(`${this.baseUrl}/${encodeURIComponent(key)}`);
  }
  /**
   * Update a single setting
   * @param key The setting key
   * @param value The new value
   */
  async updateSetting(key: string, value: any): Promise<ApiSuccessResponse<Setting>> {
    return api.put<Setting>(`${this.baseUrl}/${encodeURIComponent(key)}`, {
      value: this.serializeValue(value)
    });
  }
  /**
   * Update multiple settings at once
   * @param settings Array of settings to update
   */
  async updateSettings(settings: Array<{ key: string; value: any }>): Promise<ApiSuccessResponse<Setting[]>> {
    const serializedSettings = settings.map(setting => ({
      key: setting.key,
      value: this.serializeValue(setting.value)
    }));
    return api.put<Setting[]>(`${this.baseUrl}/batch`, { settings: serializedSettings });
  }
  /**
   * Get settings by prefix
   * @param prefix The prefix to filter settings by (e.g., 'Features.TravelNotification')
   */
  async getSettingsByPrefix(prefix: string): Promise<ApiSuccessResponse<Setting[]>> {
    return api.get<Setting[]>(`${this.baseUrl}/prefix/${encodeURIComponent(prefix)}`);
  }
  /**
   * Validate a setting value against its metadata
   * @param key The setting key
   * @param value The value to validate
   */
  async validateSetting(key: string, value: any): Promise<ApiSuccessResponse<{ isValid: boolean; errors?: string[] }>> {
    return api.post<{ isValid: boolean; errors?: string[] }>(`${this.baseUrl}/validate`, {
      key,
      value: this.serializeValue(value)
    });
  }
  private serializeValue(value: any): string {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }
}
export const settingsService = new SettingsService();
export default settingsService;