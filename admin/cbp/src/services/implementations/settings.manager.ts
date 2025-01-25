import { ISettingsService } from '../interfaces/ISettingsService';
import { Setting, SettingGroup, ISettingsMetadata } from '../../types/settings.types';
import { ApiSuccessResponse, ApiErrorResponse } from '../../types/api.types';

export class SettingsManager {
    private readonly settingsService: ISettingsService;
    private settings: Map<string, Setting>;
    private metadata: ISettingsMetadata;

    constructor(settingsService: ISettingsService) {
        this.settingsService = settingsService;
        this.settings = new Map<string, Setting>();
        this.metadata = {
            groups: [],
            version: '1.0.0',
            lastUpdated: new Date().toISOString()
        };
    }

    async loadGroup(groupKey: string): Promise<void> {
        const response = await this.settingsService.getSettingsGroup(groupKey);
        if (!response.success || !response.data) {
            throw new Error('Failed to load settings group');
        }

        const group = response.data;
        this.settings = new Map(group.settings.map(s => [s.key, s]));
    }

    async saveGroup(groupKey: string): Promise<void> {
        const group = await this.settingsService.getSettingsGroup(groupKey);
        if (!group.success || !group.data) {
            throw new Error('Failed to get settings group');
        }

        const settings = Array.from(this.settings.values());
        const response = await this.settingsService.updateSettings(settings);
        if (!response.success || !response.data) {
            throw new Error('Failed to update settings');
        }
    }

    getSetting(key: string): Setting | undefined {
        return this.settings.get(key);
    }

    getSettings(): Setting[] {
        return Array.from(this.settings.values());
    }

    toGroups(): SettingGroup[] {
        const groups = new Map<string, SettingGroup>();
        
        Array.from(this.settings.values()).forEach(setting => {
            const groupKey = setting.category || 'default';
            if (!groups.has(groupKey)) {
                groups.set(groupKey, {
                    key: groupKey,
                    label: groupKey,
                    settings: []
                });
            }
            const group = groups.get(groupKey);
            if (group) {
                group.settings.push(setting);
            }
        });

        return Array.from(groups.values());
    }

    updateSettings(settings: Setting[]): void {
        settings.forEach(setting => {
            const existingSetting = this.settings.get(setting.key);
            if (existingSetting) {
                this.settings.set(setting.key, {
                    ...existingSetting,
                    ...setting
                });
            }
        });
    }

    validateSettings(settings: Setting[]): boolean {
        return settings.every(setting => {
            const result = this.validateSetting(setting);
            return result.isValid;
        });
    }

    private validateSetting(setting: Setting): { isValid: boolean; errors?: string[] } {
        const errors: string[] = [];
        const existingSetting = this.settings.get(setting.key);

        if (!existingSetting) {
            errors.push(`Setting ${setting.key} does not exist`);
            return { isValid: false, errors };
        }

        if (existingSetting.isReadOnly) {
            errors.push(`Setting ${setting.key} is read-only`);
            return { isValid: false, errors };
        }

        if (existingSetting.isRequired && !setting.value) {
            errors.push(`Setting ${setting.key} is required`);
            return { isValid: false, errors };
        }

        if (typeof setting.value !== existingSetting.type) {
            errors.push(`Setting ${setting.key} must be of type ${existingSetting.type}`);
            return { isValid: false, errors };
        }

        if (existingSetting.validationRules) {
            const rules = existingSetting.validationRules;

            if (typeof setting.value === 'number') {
                if (rules.min !== undefined && setting.value < rules.min) {
                    errors.push(`Setting ${setting.key} must be greater than or equal to ${rules.min}`);
                }
                if (rules.max !== undefined && setting.value > rules.max) {
                    errors.push(`Setting ${setting.key} must be less than or equal to ${rules.max}`);
                }
            }

            if (typeof setting.value === 'string' && rules.pattern) {
                const regex = new RegExp(rules.pattern);
                if (!regex.test(setting.value)) {
                    errors.push(`Setting ${setting.key} must match pattern ${rules.pattern}`);
                }
            }

            if (rules.options) {
                const validValues = rules.options.map(o => o.value);
                if (!validValues.includes(setting.value)) {
                    errors.push(`Setting ${setting.key} must be one of: ${validValues.join(', ')}`);
                }
            }
        }

        return { isValid: errors.length === 0, errors: errors.length > 0 ? errors : undefined };
    }
}
