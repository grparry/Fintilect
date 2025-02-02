import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ChangePhoneConfig {
    ZelleUpdatePhoneEnabled: boolean;
}

export class ChangePhone implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ChangePhone'
    };


            private _zelleUpdatePhoneEnabled: boolean;
            get zelleUpdatePhoneEnabled(): boolean {
                return this._zelleUpdatePhoneEnabled;
            }
            set zelleUpdatePhoneEnabled(value: boolean) {
                this._zelleUpdatePhoneEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ChangePhone.ZelleUpdatePhoneEnabled", value: this._zelleUpdatePhoneEnabled, dataType: 'boolean', label: "Zelle Update Phone Enabled" },
            ];
        }

}