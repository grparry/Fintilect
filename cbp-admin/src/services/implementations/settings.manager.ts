import { ISettingsGroup, ISettingsMetadata, SettingGroup } from '@models/base/settings.types';
import { ISettingsService } from '../interfaces/ISettingsService';

export class SettingsManager {
    constructor(private settingsService: ISettingsService) {}

    /**
     * Load all settings for a settings group
     * @param groupType Settings group class with metadata
     * @returns Promise of initialized settings instance
     */
    async loadGroup<T extends ISettingsGroup>(
        groupType: { new(): T; metadata: ISettingsMetadata }
    ): Promise<T> {
        const settings = new groupType();
        const response = await this.settingsService.getSettingsGroup(groupType.metadata.groupName);
        settings.fromSettings(response.data.settings);
        return settings;
    }

    /**
     * Save all settings in a settings group
     * @param settings Settings instance to save
     */
    async saveGroup(settings: ISettingsGroup): Promise<void> {
        const metadata = (settings.constructor as any).metadata as ISettingsMetadata;
        if (!metadata) {
            throw new Error('Settings class missing static metadata property');
        }

        const settingsToUpdate = settings.toSettings().map(setting => ({
            key: setting.key,
            value: setting.value
        }));

        await this.settingsService.updateSettings(settingsToUpdate);
    }

    /**
     * Validate all settings in a settings group
     * @param settings Settings instance to validate
     * @returns Promise of validation result
     */
    async validateGroup(settings: ISettingsGroup): Promise<boolean> {
        const metadata = (settings.constructor as any).metadata as ISettingsMetadata;
        if (!metadata) {
            throw new Error('Settings class missing static metadata property');
        }

        // Validate each setting individually
        const settingsToValidate = settings.toSettings();
        const validationResults = await Promise.all(
            settingsToValidate.map(setting => 
                this.settingsService.validateSetting(setting.key, setting.value)
            )
        );

        // All settings must be valid
        return validationResults.every(result => result.data.isValid);
    }
}
