import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { RestrictedWordControlAreas } from '../RestrictedWordControlAreas';
export interface RestrictedWordSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    ControlAreas: RestrictedWordControlAreas[];
    RestrictedWordListEncrypted: string;
}

export class RestrictedWordSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RestrictedWordSettings'
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

            private _controlAreas: RestrictedWordControlAreas[];
            get controlAreas(): RestrictedWordControlAreas[] {
                return this._controlAreas;
            }
            set controlAreas(value: RestrictedWordControlAreas[]) {
                this._controlAreas = value;
            }

            private _restrictedWordListEncrypted: string;
            get restrictedWordListEncrypted(): string {
                return this._restrictedWordListEncrypted;
            }
            set restrictedWordListEncrypted(value: string) {
                this._restrictedWordListEncrypted = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "RestrictedWordSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "RestrictedWordSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "RestrictedWordSettings.ControlAreas", value: this._controlAreas, dataType: 'array<RestrictedWordControlAreas>', label: "Control Areas" },
                { key: "RestrictedWordSettings.RestrictedWordListEncrypted", value: this._restrictedWordListEncrypted, dataType: 'string', label: "Restricted Word List Encrypted" },
            ];
        }

}