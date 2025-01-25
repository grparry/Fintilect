import { BaseMockService } from './BaseMockService';
import { ISettingsService } from '../../interfaces/ISettingsService';
import { Setting, SettingGroup } from '../../../types/settings.types';
import { ApiSuccessResponse, ApiErrorResponse } from '../../../types/api.types';
import { mockSettings, mockSettingGroups } from './data/settings/mockSettingsData';

export class MockSettingsService extends BaseMockService implements ISettingsService {
    private settings: Setting[] = mockSettings;
    private settingGroups: SettingGroup[] = mockSettingGroups;

    async getSettings(): Promise<ApiSuccessResponse<Setting[]>> {
        return this.createSuccessResponse(this.settings);
    }

    async getSetting(key: string): Promise<ApiSuccessResponse<Setting>> {
        const setting = this.settings.find(s => s.key === key);
        if (!setting) {
            return {
                success: true,
                data: this.createEmptySetting(key),
                message: 'Setting not found',
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: Math.random().toString(36).substring(7)
                }
            };
        }
        return this.createSuccessResponse(setting);
    }

    async getSettingsByPrefix(prefix: string): Promise<ApiSuccessResponse<Setting[]>> {
        const matchingSettings = this.settings.filter(s => s.key.startsWith(prefix));
        return this.createSuccessResponse(matchingSettings);
    }

    async getSettingGroups(): Promise<ApiSuccessResponse<SettingGroup[]>> {
        return this.createSuccessResponse(this.settingGroups);
    }

    async getSettingsGroup(groupKey: string): Promise<ApiSuccessResponse<SettingGroup>> {
        const group = this.settingGroups.find(g => g.key === groupKey);
        if (!group) {
            return {
                success: true,
                data: this.createEmptyGroup(groupKey),
                message: 'Setting group not found',
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: Math.random().toString(36).substring(7)
                }
            };
        }
        return this.createSuccessResponse(group);
    }

    async updateSetting(key: string, value: string | number | boolean): Promise<ApiSuccessResponse<Setting>> {
        const setting = this.settings.find(s => s.key === key);
        if (!setting) {
            return {
                success: true,
                data: this.createEmptySetting(key),
                message: 'Setting not found',
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: Math.random().toString(36).substring(7)
                }
            };
        }

        if (setting.isReadOnly) {
            return {
                success: true,
                data: setting,
                message: 'Setting is read-only',
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: Math.random().toString(36).substring(7)
                }
            };
        }

        const validationResult = await this.validateSetting(key, value);
        if (!validationResult.data.isValid) {
            return {
                success: true,
                data: setting,
                message: validationResult.data.errors?.join(', ') || 'Validation failed',
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: Math.random().toString(36).substring(7)
                }
            };
        }

        setting.value = value;
        return this.createSuccessResponse(setting);
    }

    async updateSettings(settings: Setting[]): Promise<ApiSuccessResponse<Setting[]>> {
        const updatedSettings: Setting[] = [];
        const errors: string[] = [];

        for (const setting of settings) {
            const existingSetting = this.settings.find(s => s.key === setting.key);
            if (!existingSetting) {
                errors.push(`Setting ${setting.key} not found`);
                continue;
            }

            if (existingSetting.isReadOnly) {
                errors.push(`Setting ${setting.key} is read-only`);
                continue;
            }

            const validationResult = await this.validateSetting(setting.key, setting.value);
            if (!validationResult.data.isValid) {
                errors.push(`${setting.key}: ${validationResult.data.errors?.join(', ')}`);
                continue;
            }

            existingSetting.value = setting.value;
            updatedSettings.push(existingSetting);
        }

        if (errors.length > 0) {
            return {
                success: true,
                data: updatedSettings,
                message: errors.join('\n'),
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: Math.random().toString(36).substring(7)
                }
            };
        }

        return this.createSuccessResponse(updatedSettings);
    }

    async validateSetting(key: string, value: any): Promise<ApiSuccessResponse<{ isValid: boolean; errors?: string[] }>> {
        const setting = this.settings.find(s => s.key === key);
        if (!setting) {
            return this.createSuccessResponse({ isValid: false, errors: ['Setting not found'] });
        }

        const errors: string[] = [];

        if (setting.isRequired && !value) {
            errors.push('Value is required');
        }

        if (typeof value !== setting.type) {
            errors.push(`Value must be of type ${setting.type}`);
        }

        if (setting.validationRules) {
            const rules = setting.validationRules;

            if (typeof value === 'number') {
                if (rules.min !== undefined && value < rules.min) {
                    errors.push(`Value must be greater than or equal to ${rules.min}`);
                }
                if (rules.max !== undefined && value > rules.max) {
                    errors.push(`Value must be less than or equal to ${rules.max}`);
                }
            }

            if (typeof value === 'string' && rules.pattern) {
                const regex = new RegExp(rules.pattern);
                if (!regex.test(value)) {
                    errors.push(`Value must match pattern ${rules.pattern}`);
                }
            }

            if (rules.options) {
                const validValues = rules.options.map(o => o.value);
                if (!validValues.includes(value)) {
                    errors.push(`Value must be one of: ${validValues.join(', ')}`);
                }
            }
        }

        return this.createSuccessResponse({
            isValid: errors.length === 0,
            errors: errors.length > 0 ? errors : undefined
        });
    }

    private createSuccessResponse<T>(data: T): ApiSuccessResponse<T> {
        return {
            success: true,
            data,
            message: 'Success',
            meta: {
                timestamp: new Date().toISOString(),
                requestId: Math.random().toString(36).substring(7)
            }
        };
    }

    private createEmptySetting(key: string): Setting {
        return {
            key,
            value: '',
            label: key,
            type: 'string'
        };
    }

    private createEmptyGroup(key: string): SettingGroup {
        return {
            key,
            label: key,
            settings: []
        };
    }
}
