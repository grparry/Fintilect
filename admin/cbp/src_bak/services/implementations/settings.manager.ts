import { ISettingsService } from './interfaces/ISettingsService';
import { Setting, SettingGroup, ISettingsMetadata } from '../types/settings.types';
import { ApiSuccessResponse, ApiErrorResponse } from '../types/api.types';

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
        










        


                    ...existingSetting,
                    ...setting











