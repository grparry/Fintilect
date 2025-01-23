import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface jQuerySettingsConfig {
    MigratePluginEnabled: boolean;
    Version: string;
}

export class jQuerySettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'jQuerySettings'
    };


            private _migratePluginEnabled: boolean;
            get migratePluginEnabled(): boolean {
                return this._migratePluginEnabled;
            }
            set migratePluginEnabled(value: boolean) {
                this._migratePluginEnabled = value;
            }

            private _version: string;
            get version(): string {
                return this._version;
            }
            set version(value: string) {
                this._version = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "jQuerySettings.MigratePluginEnabled", value: this._migratePluginEnabled, dataType: 'boolean', label: "Migrate Plugin Enabled" },
                { key: "jQuerySettings.Version", value: this._version, dataType: 'string', label: "Version" },
            ];
        }

}