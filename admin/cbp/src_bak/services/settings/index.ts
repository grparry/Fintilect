import { ValidationResult, ValidationError } from './types';
import ApiClient from '@services/api';
import Ajv from 'ajv';
import { ISettingsService } from './interfaces/ISettingsService';
import { ApiSuccessResponse, ApiErrorResponse } from '../types/api.types';
import { Setting as ApiSetting, SettingGroup } from '../types/settings.types';

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



    [key: string]: any;











            ...setting.data.validationRules


            ...(rules.min !== undefined && { minimum: rules.min }),
            ...(rules.max !== undefined && { maximum: rules.max }),
            ...(rules.pattern && { pattern: rules.pattern }),
            ...(rules.options && { enum: rules.options.map((o: { value: string | number | boolean; label: string }) => o.value) })




            ...setting,
