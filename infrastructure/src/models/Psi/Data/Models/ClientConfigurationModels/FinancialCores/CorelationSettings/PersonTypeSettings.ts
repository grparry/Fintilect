import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PersonTypeSettingsConfig {
    SubUserPersonTypeSerial: string;
    LoginIdFormat: string;
    PersonCentricLoginIdFormat: string;
}

export class PersonTypeSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PersonTypeSettings'
    };


            private _subUserPersonTypeSerial: string;
            get subUserPersonTypeSerial(): string {
                return this._subUserPersonTypeSerial;
            }
            set subUserPersonTypeSerial(value: string) {
                this._subUserPersonTypeSerial = value;
            }

            private _loginIdFormat: string;
            get loginIdFormat(): string {
                return this._loginIdFormat;
            }
            set loginIdFormat(value: string) {
                this._loginIdFormat = value;
            }

            private _personCentricLoginIdFormat: string;
            get personCentricLoginIdFormat(): string {
                return this._personCentricLoginIdFormat;
            }
            set personCentricLoginIdFormat(value: string) {
                this._personCentricLoginIdFormat = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PersonTypeSettings.SubUserPersonTypeSerial", value: this._subUserPersonTypeSerial, dataType: 'string', label: "Sub User Person Type Serial" },
                { key: "PersonTypeSettings.LoginIdFormat", value: this._loginIdFormat, dataType: 'string', label: "Login Id Format" },
                { key: "PersonTypeSettings.PersonCentricLoginIdFormat", value: this._personCentricLoginIdFormat, dataType: 'string', label: "Person Centric Login Id Format" },
            ];
        }

}