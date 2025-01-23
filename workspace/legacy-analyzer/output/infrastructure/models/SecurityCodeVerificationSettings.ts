import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SecurityCodeVerificationSettingsConfig {
    Enabled: boolean;
    VoiceMessageEnabled: boolean;
    NonOlbMemberEnabled: boolean;
}

export class SecurityCodeVerificationSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SecurityCodeVerificationSettings'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _voiceMessageEnabled: boolean;
            get voiceMessageEnabled(): boolean {
                return this._voiceMessageEnabled;
            }
            set voiceMessageEnabled(value: boolean) {
                this._voiceMessageEnabled = value;
            }

            private _nonOlbMemberEnabled: boolean;
            get nonOlbMemberEnabled(): boolean {
                return this._nonOlbMemberEnabled;
            }
            set nonOlbMemberEnabled(value: boolean) {
                this._nonOlbMemberEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SecurityCodeVerificationSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SecurityCodeVerificationSettings.VoiceMessageEnabled", value: this._voiceMessageEnabled, dataType: 'boolean', label: "Voice Message Enabled" },
                { key: "SecurityCodeVerificationSettings.NonOlbMemberEnabled", value: this._nonOlbMemberEnabled, dataType: 'boolean', label: "Non Olb Member Enabled" },
            ];
        }

}