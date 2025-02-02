import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface SmsSecurityCodeSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    SecurityCodeLength: number;
    MinutesUntilCodeExpires: number;
    ValidSecurityCodeCharacters: string;
    SkipEmail: boolean;
    VoiceDeliveryEnabled: boolean;
    VoiceMessageApiBaseUrl: string;
    VoiceServiceConfiguration: string;
    SmsProvider: string;
    VoiceMessageSendUsernameEnabled: boolean;
    VoiceMessageSendPasswordEnabled: boolean;
    EncryptionKey: string;
    MaxCodeResends: number;
    ResendCodeEnabled: boolean;
    VoiceMessageCodeDelimitingEnabled: boolean;
    VoiceMessageCodeDelimiter: string;
    UseForEnrollmentEnabled: boolean;
}

export class SmsSecurityCodeSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SmsSecurityCodeSettings'
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

            private _securityCodeLength: number;
            get securityCodeLength(): number {
                return this._securityCodeLength;
            }
            set securityCodeLength(value: number) {
                this._securityCodeLength = value;
            }

            private _minutesUntilCodeExpires: number;
            get minutesUntilCodeExpires(): number {
                return this._minutesUntilCodeExpires;
            }
            set minutesUntilCodeExpires(value: number) {
                this._minutesUntilCodeExpires = value;
            }

            private _validSecurityCodeCharacters: string;
            get validSecurityCodeCharacters(): string {
                return this._validSecurityCodeCharacters;
            }
            set validSecurityCodeCharacters(value: string) {
                this._validSecurityCodeCharacters = value;
            }

            private _skipEmail: boolean;
            get skipEmail(): boolean {
                return this._skipEmail;
            }
            set skipEmail(value: boolean) {
                this._skipEmail = value;
            }

            private _voiceDeliveryEnabled: boolean;
            get voiceDeliveryEnabled(): boolean {
                return this._voiceDeliveryEnabled;
            }
            set voiceDeliveryEnabled(value: boolean) {
                this._voiceDeliveryEnabled = value;
            }

            private _voiceMessageApiBaseUrl: string;
            get voiceMessageApiBaseUrl(): string {
                return this._voiceMessageApiBaseUrl;
            }
            set voiceMessageApiBaseUrl(value: string) {
                this._voiceMessageApiBaseUrl = value;
            }

            private _voiceServiceConfiguration: string;
            get voiceServiceConfiguration(): string {
                return this._voiceServiceConfiguration;
            }
            set voiceServiceConfiguration(value: string) {
                this._voiceServiceConfiguration = value;
            }

            private _smsProvider: string;
            get smsProvider(): string {
                return this._smsProvider;
            }
            set smsProvider(value: string) {
                this._smsProvider = value;
            }

            private _voiceMessageSendUsernameEnabled: boolean;
            get voiceMessageSendUsernameEnabled(): boolean {
                return this._voiceMessageSendUsernameEnabled;
            }
            set voiceMessageSendUsernameEnabled(value: boolean) {
                this._voiceMessageSendUsernameEnabled = value;
            }

            private _voiceMessageSendPasswordEnabled: boolean;
            get voiceMessageSendPasswordEnabled(): boolean {
                return this._voiceMessageSendPasswordEnabled;
            }
            set voiceMessageSendPasswordEnabled(value: boolean) {
                this._voiceMessageSendPasswordEnabled = value;
            }

            private _encryptionKey: string;
            get encryptionKey(): string {
                return this._encryptionKey;
            }
            set encryptionKey(value: string) {
                this._encryptionKey = value;
            }

            private _maxCodeResends: number;
            get maxCodeResends(): number {
                return this._maxCodeResends;
            }
            set maxCodeResends(value: number) {
                this._maxCodeResends = value;
            }

            private _resendCodeEnabled: boolean;
            get resendCodeEnabled(): boolean {
                return this._resendCodeEnabled;
            }
            set resendCodeEnabled(value: boolean) {
                this._resendCodeEnabled = value;
            }

            private _voiceMessageCodeDelimitingEnabled: boolean;
            get voiceMessageCodeDelimitingEnabled(): boolean {
                return this._voiceMessageCodeDelimitingEnabled;
            }
            set voiceMessageCodeDelimitingEnabled(value: boolean) {
                this._voiceMessageCodeDelimitingEnabled = value;
            }

            private _voiceMessageCodeDelimiter: string;
            get voiceMessageCodeDelimiter(): string {
                return this._voiceMessageCodeDelimiter;
            }
            set voiceMessageCodeDelimiter(value: string) {
                this._voiceMessageCodeDelimiter = value;
            }

            private _useForEnrollmentEnabled: boolean;
            get useForEnrollmentEnabled(): boolean {
                return this._useForEnrollmentEnabled;
            }
            set useForEnrollmentEnabled(value: boolean) {
                this._useForEnrollmentEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SmsSecurityCodeSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SmsSecurityCodeSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "SmsSecurityCodeSettings.SecurityCodeLength", value: this._securityCodeLength, dataType: 'number', label: "Security Code Length" },
                { key: "SmsSecurityCodeSettings.MinutesUntilCodeExpires", value: this._minutesUntilCodeExpires, dataType: 'number', label: "Minutes Until Code Expires" },
                { key: "SmsSecurityCodeSettings.ValidSecurityCodeCharacters", value: this._validSecurityCodeCharacters, dataType: 'string', label: "Valid Security Code Characters" },
                { key: "SmsSecurityCodeSettings.SkipEmail", value: this._skipEmail, dataType: 'boolean', label: "Skip Email" },
                { key: "SmsSecurityCodeSettings.VoiceDeliveryEnabled", value: this._voiceDeliveryEnabled, dataType: 'boolean', label: "Voice Delivery Enabled" },
                { key: "SmsSecurityCodeSettings.VoiceMessageApiBaseUrl", value: this._voiceMessageApiBaseUrl, dataType: 'string', label: "Voice Message Api Base Url" },
                { key: "SmsSecurityCodeSettings.VoiceServiceConfiguration", value: this._voiceServiceConfiguration, dataType: 'string', label: "Voice Service Configuration" },
                { key: "SmsSecurityCodeSettings.SmsProvider", value: this._smsProvider, dataType: 'string', label: "Sms Provider" },
                { key: "SmsSecurityCodeSettings.VoiceMessageSendUsernameEnabled", value: this._voiceMessageSendUsernameEnabled, dataType: 'boolean', label: "Voice Message Send Username Enabled" },
                { key: "SmsSecurityCodeSettings.VoiceMessageSendPasswordEnabled", value: this._voiceMessageSendPasswordEnabled, dataType: 'boolean', label: "Voice Message Send Password Enabled" },
                { key: "SmsSecurityCodeSettings.EncryptionKey", value: this._encryptionKey, dataType: 'string', label: "Encryption Key" },
                { key: "SmsSecurityCodeSettings.MaxCodeResends", value: this._maxCodeResends, dataType: 'number', label: "Max Code Resends" },
                { key: "SmsSecurityCodeSettings.ResendCodeEnabled", value: this._resendCodeEnabled, dataType: 'boolean', label: "Resend Code Enabled" },
                { key: "SmsSecurityCodeSettings.VoiceMessageCodeDelimitingEnabled", value: this._voiceMessageCodeDelimitingEnabled, dataType: 'boolean', label: "Voice Message Code Delimiting Enabled" },
                { key: "SmsSecurityCodeSettings.VoiceMessageCodeDelimiter", value: this._voiceMessageCodeDelimiter, dataType: 'string', label: "Voice Message Code Delimiter" },
                { key: "SmsSecurityCodeSettings.UseForEnrollmentEnabled", value: this._useForEnrollmentEnabled, dataType: 'boolean', label: "Use For Enrollment Enabled" },
            ];
        }

}