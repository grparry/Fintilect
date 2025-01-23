import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface RegularExpressionsFeatureConfig {
    WordWithCommonSpecialCharacters: string;
    SsnType: string;
    PhoneType: string;
}

export class RegularExpressionsFeature implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'RegularExpressionsFeature'
    };


            private _wordWithCommonSpecialCharacters: string;
            get wordWithCommonSpecialCharacters(): string {
                return this._wordWithCommonSpecialCharacters;
            }
            set wordWithCommonSpecialCharacters(value: string) {
                this._wordWithCommonSpecialCharacters = value;
            }

            private _ssnType: string;
            get ssnType(): string {
                return this._ssnType;
            }
            set ssnType(value: string) {
                this._ssnType = value;
            }

            private _phoneType: string;
            get phoneType(): string {
                return this._phoneType;
            }
            set phoneType(value: string) {
                this._phoneType = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "RegularExpressionsFeature.WordWithCommonSpecialCharacters", value: this._wordWithCommonSpecialCharacters, dataType: 'string', label: "Word With Common Special Characters" },
                { key: "RegularExpressionsFeature.SsnType", value: this._ssnType, dataType: 'string', label: "Ssn Type" },
                { key: "RegularExpressionsFeature.PhoneType", value: this._phoneType, dataType: 'string', label: "Phone Type" },
            ];
        }

}