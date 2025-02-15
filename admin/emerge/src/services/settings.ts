import { ValidationResult } from './validation';

export class SettingsService {
    private static instance: SettingsService;
    private settings: { [key: string]: any } = {};
    private constructor() {}
    static getInstance(): SettingsService {
        if (!SettingsService.instance) {
            SettingsService.instance = new SettingsService();
        }
        return SettingsService.instance;
    }
    getValue<T>(key: string): T | null {
        return this.settings[key] as T;
    }
    setValue(key: string, value: any): void {
        this.settings[key] = value;
    }
    validate(value: any): ValidationResult {
        // Basic validation implementation
        return {
            valid: true,
            errors: []
        };
    }
}