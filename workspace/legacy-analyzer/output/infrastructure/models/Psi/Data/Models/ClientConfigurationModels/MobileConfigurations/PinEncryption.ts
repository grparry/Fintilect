import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PinEncryptionConfig {
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
}

export class PinEncryption implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PinEncryption'
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


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PinEncryption.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "PinEncryption.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
            ];
        }

}