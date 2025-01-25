import { ValidationResult, ValidationError } from './types';
import ApiClient from '@services/api';
import Ajv from 'ajv';
import { ISettingsService } from '../interfaces/ISettingsService';
import { ApiSuccessResponse, ApiErrorResponse } from '../../types/api.types';
import { Setting as ApiSetting, SettingGroup } from '../../types/settings.types';

export interface Setting<T = any> {
    key: string;
    value: T;
    label: string;
    type: 'string' | 'number' | 'boolean';
    validationRules?: {
        min?: number;
        max?: number;
        pattern?: string;
        options?: Array<{ value: string | number | boolean; label: string }>;
    };
    metadata?: {
        schema?: object;
        version?: string;
        lastModified?: string;
    };
}

export interface ValidationRules {
    type: string;
    properties?: Record<string, ValidationRules>;
    required?: string[];
    minimum?: number;
    maximum?: number;
    enum?: any[];
    items?: ValidationRules;
    [key: string]: any;
}

export class SettingsService implements ISettingsService {
    readonly basePath = '/api/settings';
    private ajv = new Ajv({ 
        strict: false,
        allErrors: true
    });
    private apiClient;
    private cache = new Map<string, Setting<any>>();

    constructor() {
        this.apiClient = ApiClient;
    }

    private generateRequestId(): string {
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }

    async getSettingsGroup(groupName: string): Promise<ApiSuccessResponse<SettingGroup>> {
        throw new Error('Not implemented');
    }

    async getSetting(key: string): Promise<ApiSuccessResponse<Setting<any>>> {
        if (this.cache.has(key)) {
            const cachedSetting = this.cache.get(key)!;
            return {
                success: true,
                data: cachedSetting,
                meta: {
                    timestamp: new Date().toISOString(),
                    requestId: this.generateRequestId()
                }
            };
        }

        const response = await this.apiClient.get<Setting<any>>(`${this.basePath}/${key}`);
        if (!response.success || !response.data) {
            throw new Error('Failed to get setting');
        }
        const convertedSetting = this.convertFromApiSetting(response.data);
        this.cache.set(key, convertedSetting);
        return {
            success: true,
            data: convertedSetting,
            meta: response.meta || {
                timestamp: new Date().toISOString(),
                requestId: this.generateRequestId()
            }
        };
    }

    async updateSetting(key: string, value: string | number | boolean): Promise<ApiSuccessResponse<Setting<any>>> {
        const response = await this.apiClient.put<Setting<any>>(`${this.basePath}/${key}`, { value });
        if (!response.success || !response.data) {
            throw new Error('Failed to update setting');
        }
        const convertedSetting = this.convertFromApiSetting(response.data);
        this.cache.set(key, convertedSetting);
        return {
            success: true,
            data: convertedSetting,
            meta: response.meta || {
                timestamp: new Date().toISOString(),
                requestId: this.generateRequestId()
            }
        };
    }

    async updateSettings(settings: Setting[]): Promise<ApiSuccessResponse<Setting<any>[]>> {
        const response = await this.apiClient.put<Setting<any>[]>(`${this.basePath}/batch`, { settings });
        if (!response.success || !response.data) {
            throw new Error('Failed to update settings');
        }
        const convertedSettings = response.data.map((setting: Setting<any>) => this.convertFromApiSetting(setting));
        convertedSettings.forEach((setting: Setting<any>) => {
            this.cache.set(setting.key, setting);
        });
        return {
            success: true,
            data: convertedSettings,
            meta: response.meta || {
                timestamp: new Date().toISOString(),
                requestId: this.generateRequestId()
            }
        };
    }

    async getSettingsByPrefix(prefix: string): Promise<ApiSuccessResponse<Setting<any>[]>> {
        const response = await this.apiClient.get<Setting<any>[]>(`${this.basePath}/prefix/${prefix}`);
        if (!response.success || !response.data) {
            throw new Error('Failed to get settings by prefix');
        }
        const convertedSettings = response.data.map((setting: Setting<any>) => this.convertFromApiSetting(setting));
        convertedSettings.forEach((setting: Setting<any>) => {
            this.cache.set(setting.key, setting);
        });
        return {
            success: true,
            data: convertedSettings,
            meta: response.meta || {
                timestamp: new Date().toISOString(),
                requestId: this.generateRequestId()
            }
        };
    }

    async validateSetting(key: string, value: any): Promise<ApiSuccessResponse<ValidationResult>> {
        const setting = await this.getSetting(key);
        if (!setting.success || !setting.data) {
            throw new Error('Setting not found');
        }

        const validationResult = this.validateValue(value, {
            type: setting.data.type,
            ...setting.data.validationRules
        });

        return {
            success: true,
            data: validationResult,
            meta: {
                timestamp: new Date().toISOString(),
                requestId: this.generateRequestId()
            }
        };
    }

    private validateValue(value: any, rules: ValidationRules): ValidationResult {
        const schema = {
            ...(rules.min !== undefined && { minimum: rules.min }),
            ...(rules.max !== undefined && { maximum: rules.max }),
            ...(rules.pattern && { pattern: rules.pattern }),
            ...(rules.options && { enum: rules.options.map((o: { value: string | number | boolean; label: string }) => o.value) })
        };

        const valid = this.ajv.validate(schema, value);
        if (valid) {
            return {
                valid: true
            };
        }

        return {
            valid: false,
            errors: (this.ajv.errors || []).map(error => ({
                field: error.instancePath || 'value',
                message: 'Invalid value'
            }))
        };
    }

    private convertFromApiSetting(setting: Setting): Setting {
        return {
            key: setting.key,
            value: setting.value,
            label: setting.label,
            type: setting.type,
            validationRules: setting.validationRules ? {
                min: setting.validationRules.min,
                max: setting.validationRules.max,
                pattern: setting.validationRules.pattern,
                options: setting.validationRules.options
            } : undefined
        };
    }

    private convertToApiSetting(setting: Setting): Setting {
        return {
            ...setting,
            validationRules: setting.validationRules ? {
                min: setting.validationRules.min,
                max: setting.validationRules.max,
                pattern: setting.validationRules.pattern,
                options: setting.validationRules.options
            } : undefined
        };
    }
}
