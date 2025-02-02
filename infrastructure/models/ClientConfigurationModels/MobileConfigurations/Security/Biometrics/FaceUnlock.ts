import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface FaceUnlockConfig {
    MinimumAndroidVersion: string;
    Enabled: boolean;
}

export class FaceUnlock implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'FaceUnlock'
    };


            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
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
                { key: "FaceUnlock.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "FaceUnlock.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
            ];
        }

}