import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface NicknamesConfig {
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    Enabled: boolean;
}

export class Nicknames implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Nicknames'
    };


            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Nicknames.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "Nicknames.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "Nicknames.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
            ];
        }

}