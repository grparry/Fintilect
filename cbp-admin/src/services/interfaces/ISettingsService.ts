import { ApiSuccessResponse } from '../../types/api.types';
import { Setting, SettingGroup } from '@models/settings/types';
import { IBaseService } from './IBaseService';

export interface ISettingsService extends IBaseService {
  getSettingsGroup(groupName: string): Promise<ApiSuccessResponse<SettingGroup>>;
  getSetting(key: string): Promise<ApiSuccessResponse<Setting>>;
  updateSetting(key: string, value: any): Promise<ApiSuccessResponse<Setting>>;
  updateSettings(settings: Array<{ key: string; value: any }>): Promise<ApiSuccessResponse<Setting[]>>;
  getSettingsByPrefix(prefix: string): Promise<ApiSuccessResponse<Setting[]>>;
  validateSetting(key: string, value: any): Promise<ApiSuccessResponse<{ isValid: boolean; errors?: string[] }>>;
}
