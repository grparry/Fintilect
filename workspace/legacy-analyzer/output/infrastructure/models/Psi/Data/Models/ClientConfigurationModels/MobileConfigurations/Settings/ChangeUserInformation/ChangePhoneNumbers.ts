import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { RequiredPhoneNumberField } from './RequiredPhoneNumberField';
export interface ChangePhoneNumbersConfig {
    RequiredField: RequiredPhoneNumberField;
    AllowForeignPhoneNumbers: boolean;
    Enabled: boolean;
    ForeignPhoneNumbersEnabled: boolean;
}

export class ChangePhoneNumbers implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ChangePhoneNumbers'
    };


            private _requiredField: RequiredPhoneNumberField;
            get requiredField(): RequiredPhoneNumberField {
                return this._requiredField;
            }
            set requiredField(value: RequiredPhoneNumberField) {
                this._requiredField = value;
            }

            private _allowForeignPhoneNumbers: boolean;
            get allowForeignPhoneNumbers(): boolean {
                return this._allowForeignPhoneNumbers;
            }
            set allowForeignPhoneNumbers(value: boolean) {
                this._allowForeignPhoneNumbers = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _foreignPhoneNumbersEnabled: boolean;
            get foreignPhoneNumbersEnabled(): boolean {
                return this._foreignPhoneNumbersEnabled;
            }
            set foreignPhoneNumbersEnabled(value: boolean) {
                this._foreignPhoneNumbersEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ChangePhoneNumbers.RequiredField", value: this._requiredField, dataType: 'requiredphonenumberfield', label: "Required Field" },
                { key: "ChangePhoneNumbers.AllowForeignPhoneNumbers", value: this._allowForeignPhoneNumbers, dataType: 'boolean', label: "Allow Foreign Phone Numbers" },
                { key: "ChangePhoneNumbers.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "ChangePhoneNumbers.ForeignPhoneNumbersEnabled", value: this._foreignPhoneNumbersEnabled, dataType: 'boolean', label: "Foreign Phone Numbers Enabled" },
            ];
        }

}