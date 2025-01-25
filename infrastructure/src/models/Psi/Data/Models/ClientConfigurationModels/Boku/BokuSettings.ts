import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface BokuSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    ApiUrl: string;
    MerchantId: string;
    SubMerchantId: string;
    ClientAccessKey: string;
    ApiSecret: string;
    EncryptionKey: string;
    PhoneNumberEncryptionKey: string;
    PhoneNumberCipherKey: string;
    EvurlEncryptionKey: string;
    EvurlBaseUrl: string;
    PhoneVerificationEnabled: boolean;
    PhoneVerificationMinVersion: number;
    PhoneVerificationMinVersionAndroid: string;
    PhoneVerificationMinVersionIos: string;
    PhoneVerificationDaysBeforeRetry: number;
    PhoneVerificationDaysBeforeTokenExpires: number;
}

export class BokuSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'BokuSettings'
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

            private _apiUrl: string;
            get apiUrl(): string {
                return this._apiUrl;
            }
            set apiUrl(value: string) {
                this._apiUrl = value;
            }

            private _merchantId: string;
            get merchantId(): string {
                return this._merchantId;
            }
            set merchantId(value: string) {
                this._merchantId = value;
            }

            private _subMerchantId: string;
            get subMerchantId(): string {
                return this._subMerchantId;
            }
            set subMerchantId(value: string) {
                this._subMerchantId = value;
            }

            private _clientAccessKey: string;
            get clientAccessKey(): string {
                return this._clientAccessKey;
            }
            set clientAccessKey(value: string) {
                this._clientAccessKey = value;
            }

            private _apiSecret: string;
            get apiSecret(): string {
                return this._apiSecret;
            }
            set apiSecret(value: string) {
                this._apiSecret = value;
            }

            private _encryptionKey: string;
            get encryptionKey(): string {
                return this._encryptionKey;
            }
            set encryptionKey(value: string) {
                this._encryptionKey = value;
            }

            private _phoneNumberEncryptionKey: string;
            get phoneNumberEncryptionKey(): string {
                return this._phoneNumberEncryptionKey;
            }
            set phoneNumberEncryptionKey(value: string) {
                this._phoneNumberEncryptionKey = value;
            }

            private _phoneNumberCipherKey: string;
            get phoneNumberCipherKey(): string {
                return this._phoneNumberCipherKey;
            }
            set phoneNumberCipherKey(value: string) {
                this._phoneNumberCipherKey = value;
            }

            private _evurlEncryptionKey: string;
            get evurlEncryptionKey(): string {
                return this._evurlEncryptionKey;
            }
            set evurlEncryptionKey(value: string) {
                this._evurlEncryptionKey = value;
            }

            private _evurlBaseUrl: string;
            get evurlBaseUrl(): string {
                return this._evurlBaseUrl;
            }
            set evurlBaseUrl(value: string) {
                this._evurlBaseUrl = value;
            }

            private _phoneVerificationEnabled: boolean;
            get phoneVerificationEnabled(): boolean {
                return this._phoneVerificationEnabled;
            }
            set phoneVerificationEnabled(value: boolean) {
                this._phoneVerificationEnabled = value;
            }

            private _phoneVerificationMinVersion: number;
            get phoneVerificationMinVersion(): number {
                return this._phoneVerificationMinVersion;
            }
            set phoneVerificationMinVersion(value: number) {
                this._phoneVerificationMinVersion = value;
            }

            private _phoneVerificationMinVersionAndroid: string;
            get phoneVerificationMinVersionAndroid(): string {
                return this._phoneVerificationMinVersionAndroid;
            }
            set phoneVerificationMinVersionAndroid(value: string) {
                this._phoneVerificationMinVersionAndroid = value;
            }

            private _phoneVerificationMinVersionIos: string;
            get phoneVerificationMinVersionIos(): string {
                return this._phoneVerificationMinVersionIos;
            }
            set phoneVerificationMinVersionIos(value: string) {
                this._phoneVerificationMinVersionIos = value;
            }

            private _phoneVerificationDaysBeforeRetry: number;
            get phoneVerificationDaysBeforeRetry(): number {
                return this._phoneVerificationDaysBeforeRetry;
            }
            set phoneVerificationDaysBeforeRetry(value: number) {
                this._phoneVerificationDaysBeforeRetry = value;
            }

            private _phoneVerificationDaysBeforeTokenExpires: number;
            get phoneVerificationDaysBeforeTokenExpires(): number {
                return this._phoneVerificationDaysBeforeTokenExpires;
            }
            set phoneVerificationDaysBeforeTokenExpires(value: number) {
                this._phoneVerificationDaysBeforeTokenExpires = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "BokuSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "BokuSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "BokuSettings.ApiUrl", value: this._apiUrl, dataType: 'string', label: "Api Url" },
                { key: "BokuSettings.MerchantId", value: this._merchantId, dataType: 'string', label: "Merchant Id" },
                { key: "BokuSettings.SubMerchantId", value: this._subMerchantId, dataType: 'string', label: "Sub Merchant Id" },
                { key: "BokuSettings.ClientAccessKey", value: this._clientAccessKey, dataType: 'string', label: "Client Access Key" },
                { key: "BokuSettings.ApiSecret", value: this._apiSecret, dataType: 'string', label: "Api Secret" },
                { key: "BokuSettings.EncryptionKey", value: this._encryptionKey, dataType: 'string', label: "Encryption Key" },
                { key: "BokuSettings.PhoneNumberEncryptionKey", value: this._phoneNumberEncryptionKey, dataType: 'string', label: "Phone Number Encryption Key" },
                { key: "BokuSettings.PhoneNumberCipherKey", value: this._phoneNumberCipherKey, dataType: 'string', label: "Phone Number Cipher Key" },
                { key: "BokuSettings.EvurlEncryptionKey", value: this._evurlEncryptionKey, dataType: 'string', label: "Evurl Encryption Key" },
                { key: "BokuSettings.EvurlBaseUrl", value: this._evurlBaseUrl, dataType: 'string', label: "Evurl Base Url" },
                { key: "BokuSettings.PhoneVerificationEnabled", value: this._phoneVerificationEnabled, dataType: 'boolean', label: "Phone Verification Enabled" },
                { key: "BokuSettings.PhoneVerificationMinVersion", value: this._phoneVerificationMinVersion, dataType: 'number', label: "Phone Verification Min Version" },
                { key: "BokuSettings.PhoneVerificationMinVersionAndroid", value: this._phoneVerificationMinVersionAndroid, dataType: 'string', label: "Phone Verification Min Version Android" },
                { key: "BokuSettings.PhoneVerificationMinVersionIos", value: this._phoneVerificationMinVersionIos, dataType: 'string', label: "Phone Verification Min Version Ios" },
                { key: "BokuSettings.PhoneVerificationDaysBeforeRetry", value: this._phoneVerificationDaysBeforeRetry, dataType: 'number', label: "Phone Verification Days Before Retry" },
                { key: "BokuSettings.PhoneVerificationDaysBeforeTokenExpires", value: this._phoneVerificationDaysBeforeTokenExpires, dataType: 'number', label: "Phone Verification Days Before Token Expires" },
            ];
        }

}