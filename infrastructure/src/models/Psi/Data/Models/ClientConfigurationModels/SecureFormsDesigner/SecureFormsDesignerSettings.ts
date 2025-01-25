import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SecureFormsDesignerSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    SecureFormsDesignerUrl: string;
}

export class SecureFormsDesignerSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SecureFormsDesignerSettings'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _secureFormsDesignerUrl: string;
            get secureFormsDesignerUrl(): string {
                return this._secureFormsDesignerUrl;
            }
            set secureFormsDesignerUrl(value: string) {
                this._secureFormsDesignerUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SecureFormsDesignerSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SecureFormsDesignerSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "SecureFormsDesignerSettings.SecureFormsDesignerUrl", value: this._secureFormsDesignerUrl, dataType: 'string', label: "Secure Forms Designer Url" },
            ];
        }

}