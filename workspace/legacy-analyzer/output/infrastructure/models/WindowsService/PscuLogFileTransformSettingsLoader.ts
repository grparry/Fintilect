import { settingsService } from '../../../../../cbp-admin/src/services/factory/ServiceFactory';
import { PscuLogFileTransformServiceSettings } from './PscuLogFileTransformServiceSettings';

export class PscuLogFileTransformSettingsLoader {
    private static instance: PscuLogFileTransformServiceSettings;

    static async load(): Promise<PscuLogFileTransformServiceSettings> {
        if (!this.instance) {
            const settings = new PscuLogFileTransformServiceSettings();
            const group = await settingsService.getSettingsGroup('PscuLogFileTransformService');
            settings.fromSettings(group.data.settings);
            this.instance = settings;
        }
        return this.instance;
    }

    static async save(settings: PscuLogFileTransformServiceSettings): Promise<void> {
        const settingsToUpdate = settings.toSettings();
        await settingsService.updateSettings(
            settingsToUpdate.map(setting => ({
                key: setting.key,
                value: setting.value
            }))
        );
        this.instance = settings;
    }

    static async reload(): Promise<PscuLogFileTransformServiceSettings> {
        this.instance = undefined;
        return await this.load();
    }
}
