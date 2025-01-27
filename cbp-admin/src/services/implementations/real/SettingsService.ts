import { ISettingsService } from '@/../interfaces/ISettingsService';
import { Setting, SettingGroup } from '@/../../types/settings.types';
import { BaseService } from '@/BaseService';
import { ApiSuccessResponse } from '@/../../types/api.types';

export class SettingsService extends BaseService implements ISettingsService {
  constructor(baseUrl: string = '/api/v1/settings') {
    super(baseUrl);
  }

  async getSettingsGroup(groupName: string): Promise<ApiSuccessResponse<SettingGroup>> {
    try {
      return await this.get<ApiSuccessResponse<SettingGroup>>(`/groups/${groupName}`);
    } catch (error) {
      throw this.handleError(error, `Failed to get settings group: ${groupName}`);
    }
  }

  async getSetting(key: string): Promise<ApiSuccessResponse<Setting>> {
    try {
      return await this.get<ApiSuccessResponse<Setting>>(`/${encodeURIComponent(key)}`);
    } catch (error) {
      throw this.handleError(error, `Failed to get setting: ${key}`);
    }
  }

  async updateSetting(key: string, value: any): Promise<ApiSuccessResponse<Setting>> {
    try {
      return await this.put<ApiSuccessResponse<Setting>>(`/${encodeURIComponent(key)}`, {
        value: this.serializeValue(value)
      });
    } catch (error) {
      throw this.handleError(error, `Failed to update setting: ${key}`);
    }
  }

  async updateSettings(settings: Array<{ key: string; value: any }>): Promise<ApiSuccessResponse<Setting[]>> {
    try {
      const serializedSettings = settings.map(setting => ({
        key: setting.key,
        value: this.serializeValue(setting.value)
      }));
      return await this.put<ApiSuccessResponse<Setting[]>>('/batch', { settings: serializedSettings });
    } catch (error) {
      throw this.handleError(error, 'Failed to update settings batch');
    }
  }

  async getSettingsByPrefix(prefix: string): Promise<ApiSuccessResponse<Setting[]>> {
    try {
      return await this.get<ApiSuccessResponse<Setting[]>>(`/prefix/${encodeURIComponent(prefix)}`);
    } catch (error) {
      throw this.handleError(error, `Failed to get settings by prefix: ${prefix}`);
    }
  }

  async validateSetting(key: string, value: any): Promise<ApiSuccessResponse<{ isValid: boolean; errors?: string[] }>> {
    try {
      return await this.post<ApiSuccessResponse<{ isValid: boolean; errors?: string[] }>>('/validate', {
        key,
        value: this.serializeValue(value)
      });
    } catch (error) {
      throw this.handleError(error, `Failed to validate setting: ${key}`);
    }
  }

  private serializeValue(value: any): string {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  private handleError(error: any, defaultMessage: string): Error {
    if (error instanceof Error) {
      return error;
    }
    return new Error(defaultMessage);
  }
}
