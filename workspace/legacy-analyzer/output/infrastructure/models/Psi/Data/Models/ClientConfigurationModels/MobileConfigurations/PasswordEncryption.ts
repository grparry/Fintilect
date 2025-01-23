import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PasswordEncryptionConfig {
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    MinimumServerVersion: number;
}

export class PasswordEncryption implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PasswordEncryption'
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

            private _minimumServerVersion: number;
            get minimumServerVersion(): number {
                return this._minimumServerVersion;
            }
            set minimumServerVersion(value: number) {
                this._minimumServerVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PasswordEncryption.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "PasswordEncryption.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "PasswordEncryption.MinimumServerVersion", value: this._minimumServerVersion, dataType: 'number', label: "Minimum Server Version" },
            ];
        }

}