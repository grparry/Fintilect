import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface MfaSettingsConfig {
    MfaTextQuestionsEnabled: boolean;
}

export class MfaSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'MfaSettings'
    };


            private _mfaTextQuestionsEnabled: boolean;
            get mfaTextQuestionsEnabled(): boolean {
                return this._mfaTextQuestionsEnabled;
            }
            set mfaTextQuestionsEnabled(value: boolean) {
                this._mfaTextQuestionsEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "MfaSettings.MfaTextQuestionsEnabled", value: this._mfaTextQuestionsEnabled, dataType: 'boolean', label: "Mfa Text Questions Enabled" },
            ];
        }

}