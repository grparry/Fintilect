import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MultipleEmailSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    EmailTypes: string[];
    EmailTypesThatCanBeDeleted: string[];
    DefaultEmailType: string;
}

export class MultipleEmailSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MultipleEmailSettings'
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

            private _emailTypes: string[];
            get emailTypes(): string[] {
                return this._emailTypes;
            }
            set emailTypes(value: string[]) {
                this._emailTypes = value;
            }

            private _emailTypesThatCanBeDeleted: string[];
            get emailTypesThatCanBeDeleted(): string[] {
                return this._emailTypesThatCanBeDeleted;
            }
            set emailTypesThatCanBeDeleted(value: string[]) {
                this._emailTypesThatCanBeDeleted = value;
            }

            private _defaultEmailType: string;
            get defaultEmailType(): string {
                return this._defaultEmailType;
            }
            set defaultEmailType(value: string) {
                this._defaultEmailType = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MultipleEmailSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "MultipleEmailSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "MultipleEmailSettings.EmailTypes", value: this._emailTypes, dataType: 'list<string>', label: "Email Types" },
                { key: "MultipleEmailSettings.EmailTypesThatCanBeDeleted", value: this._emailTypesThatCanBeDeleted, dataType: 'list<string>', label: "Email Types That Can Be Deleted" },
                { key: "MultipleEmailSettings.DefaultEmailType", value: this._defaultEmailType, dataType: 'string', label: "Default Email Type" },
            ];
        }

}