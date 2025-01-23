import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface EscheatConfig {
    IsUpdateEscheatDateEnabled: boolean;
    EscheatDateFlagNumber: string;
    MinVersion: number;
}

export class Escheat implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Escheat'
    };


            private _isUpdateEscheatDateEnabled: boolean;
            get isUpdateEscheatDateEnabled(): boolean {
                return this._isUpdateEscheatDateEnabled;
            }
            set isUpdateEscheatDateEnabled(value: boolean) {
                this._isUpdateEscheatDateEnabled = value;
            }

            private _escheatDateFlagNumber: string;
            get escheatDateFlagNumber(): string {
                return this._escheatDateFlagNumber;
            }
            set escheatDateFlagNumber(value: string) {
                this._escheatDateFlagNumber = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Escheat.IsUpdateEscheatDateEnabled", value: this._isUpdateEscheatDateEnabled, dataType: 'boolean', label: "Is Update Escheat Date Enabled" },
                { key: "Escheat.EscheatDateFlagNumber", value: this._escheatDateFlagNumber, dataType: 'string', label: "Escheat Date Flag Number" },
                { key: "Escheat.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
            ];
        }

}