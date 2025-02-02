import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { SecurityCodeVerificationSettings } from '../SecurityCodeVerificationSettings';
export interface SmsSettingsConfig {
    SecurityCodeVerification: SecurityCodeVerificationSettings;
    SmsCodeOneTimeEnabled: boolean;
    ShowSMSPrior: boolean;
}

export class SmsSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SmsSettings'
    };


            private _securityCodeVerification: SecurityCodeVerificationSettings;
            get securityCodeVerification(): SecurityCodeVerificationSettings {
                return this._securityCodeVerification;
            }
            set securityCodeVerification(value: SecurityCodeVerificationSettings) {
                this._securityCodeVerification = value;
            }

            private _smsCodeOneTimeEnabled: boolean;
            get smsCodeOneTimeEnabled(): boolean {
                return this._smsCodeOneTimeEnabled;
            }
            set smsCodeOneTimeEnabled(value: boolean) {
                this._smsCodeOneTimeEnabled = value;
            }

            private _showSMSPrior: boolean;
            get showSMSPrior(): boolean {
                return this._showSMSPrior;
            }
            set showSMSPrior(value: boolean) {
                this._showSMSPrior = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SmsSettings.SecurityCodeVerification", value: this._securityCodeVerification, dataType: 'securitycodeverificationsettings', label: "Security Code Verification" },
                { key: "SmsSettings.SmsCodeOneTimeEnabled", value: this._smsCodeOneTimeEnabled, dataType: 'boolean', label: "Sms Code One Time Enabled" },
                { key: "SmsSettings.ShowSMSPrior", value: this._showSMSPrior, dataType: 'boolean', label: "Show S M S Prior" },
            ];
        }

}