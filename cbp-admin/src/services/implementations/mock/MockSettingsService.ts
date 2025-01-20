import { BaseMockService } from './BaseMockService';
import { ISettingsService } from '../../interfaces/ISettingsService';
import { Setting, SettingGroup } from '@models/settings/types';
import { ApiSuccessResponse } from '../../../types/api.types';
import { mockSettings, mockSettingGroups } from './data/settings/mockSettingsData';

export class MockSettingsService extends BaseMockService implements ISettingsService {
    private settings: Setting[] = [];
    private settingGroups: Record<string, SettingGroup> = {};

    constructor(baseUrl: string) {
        super(baseUrl);
        this.initializeMockData();
    }

    private initializeMockData(): void {
        this.settings = JSON.parse(JSON.stringify(mockSettings));
        this.settingGroups = JSON.parse(JSON.stringify(mockSettingGroups));
    }

    async getSettingsGroup(groupName: string): Promise<ApiSuccessResponse<SettingGroup>> {
        const group = this.settingGroups[groupName];
        if (!group) {
            throw new Error(`Settings group '${groupName}' not found`);
        }
        return this.createSuccessResponse(group);
    }

    async getSetting(key: string): Promise<ApiSuccessResponse<Setting>> {
        const setting = this.settings.find(s => s.key === key);
        if (!setting) {
            throw new Error(`Setting '${key}' not found`);
        }
        return this.createSuccessResponse(setting);
    }

    async updateSetting(key: string, value: any): Promise<ApiSuccessResponse<Setting>> {
        const index = this.settings.findIndex(s => s.key === key);
        if (index === -1) {
            throw new Error(`Setting '${key}' not found`);
        }
        
        const updatedSetting = {
            ...this.settings[index],
            value: this.serializeValue(value)
        };
        
        this.settings[index] = updatedSetting;
        this.updateSettingInGroups(key, updatedSetting);
        
        return this.createSuccessResponse(updatedSetting);
    }

    async updateSettings(settings: Array<{ key: string; value: any }>): Promise<ApiSuccessResponse<Setting[]>> {
        const updatedSettings: Setting[] = [];
        
        for (const { key, value } of settings) {
            const index = this.settings.findIndex(s => s.key === key);
            if (index === -1) {
                throw new Error(`Setting '${key}' not found`);
            }
            
            const updatedSetting = {
                ...this.settings[index],
                value: this.serializeValue(value)
            };
            
            this.settings[index] = updatedSetting;
            this.updateSettingInGroups(key, updatedSetting);
            updatedSettings.push(updatedSetting);
        }
        
        return this.createSuccessResponse(updatedSettings);
    }

    async getSettingsByPrefix(prefix: string): Promise<ApiSuccessResponse<Setting[]>> {
        const matchingSettings = this.settings.filter(setting => setting.key.startsWith(prefix));
        return this.createSuccessResponse(matchingSettings);
    }

    async validateSetting(key: string, value: any): Promise<ApiSuccessResponse<{ isValid: boolean; errors?: string[] }>> {
        const setting = this.settings.find(s => s.key === key);
        if (!setting) {
            throw new Error(`Setting '${key}' not found`);
        }

        const errors: string[] = [];
        const serializedValue = this.serializeValue(value);

        // Type validation
        switch (setting.dataType) {
            case 'number':
                if (isNaN(Number(serializedValue))) {
                    errors.push('Value must be a number');
                }
                break;
            case 'boolean':
                if (serializedValue !== 'true' && serializedValue !== 'false') {
                    errors.push('Value must be a boolean');
                }
                break;
            case 'json':
                try {
                    JSON.parse(serializedValue);
                } catch {
                    errors.push('Value must be valid JSON');
                }
                break;
        }

        // Validation rules
        if (setting.validation) {
            if (setting.validation.required && !serializedValue) {
                errors.push(`${key} is required`);
            }
            if (setting.validation.range) {
                const num = Number(serializedValue);
                const { min, max } = setting.validation.range;
                if (num < min || num > max) {
                    errors.push(`Value must be between ${min} and ${max}`);
                }
            }
        }

        return this.createSuccessResponse({
            isValid: errors.length === 0,
            errors: errors.length > 0 ? errors : undefined
        });
    }

    private updateSettingInGroups(key: string, setting: Setting): void {
        for (const groupName in this.settingGroups) {
            const group = this.settingGroups[groupName];
            const settingIndex = group.settings.findIndex(s => s.key === key);
            if (settingIndex !== -1) {
                group.settings[settingIndex] = setting;
            }
        }
    }

    private serializeValue(value: any): string {
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return String(value);
    }

    private createSuccessResponse<T>(data: T): ApiSuccessResponse<T> {
        return {
            success: true,
            data,
            message: 'Success',
            meta: {
                timestamp: new Date().toISOString(),
                requestId: `mock-${Date.now()}`
            }
        };
    }
}
