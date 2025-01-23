import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface UserDevicesConfig {
    EnableStaticSecurityCode: boolean;
    StaticSecurityCodes: string[];
    ValidSecurityCodeCharacters: string;
    AppKeyLength: number;
    ImplicitRegistrationEnabled: boolean;
    ImplicitRegistrationMinIosVersion: string;
    ImplicitRegistrationMinAndroidVersion: string;
}

export class UserDevices implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'UserDevices'
    };


            private _enableStaticSecurityCode: boolean;
            get enableStaticSecurityCode(): boolean {
                return this._enableStaticSecurityCode;
            }
            set enableStaticSecurityCode(value: boolean) {
                this._enableStaticSecurityCode = value;
            }

            private _staticSecurityCodes: string[];
            get staticSecurityCodes(): string[] {
                return this._staticSecurityCodes;
            }
            set staticSecurityCodes(value: string[]) {
                this._staticSecurityCodes = value;
            }

            private _validSecurityCodeCharacters: string;
            get validSecurityCodeCharacters(): string {
                return this._validSecurityCodeCharacters;
            }
            set validSecurityCodeCharacters(value: string) {
                this._validSecurityCodeCharacters = value;
            }

            private _appKeyLength: number;
            get appKeyLength(): number {
                return this._appKeyLength;
            }
            set appKeyLength(value: number) {
                this._appKeyLength = value;
            }

            private _implicitRegistrationEnabled: boolean;
            get implicitRegistrationEnabled(): boolean {
                return this._implicitRegistrationEnabled;
            }
            set implicitRegistrationEnabled(value: boolean) {
                this._implicitRegistrationEnabled = value;
            }

            private _implicitRegistrationMinIosVersion: string;
            get implicitRegistrationMinIosVersion(): string {
                return this._implicitRegistrationMinIosVersion;
            }
            set implicitRegistrationMinIosVersion(value: string) {
                this._implicitRegistrationMinIosVersion = value;
            }

            private _implicitRegistrationMinAndroidVersion: string;
            get implicitRegistrationMinAndroidVersion(): string {
                return this._implicitRegistrationMinAndroidVersion;
            }
            set implicitRegistrationMinAndroidVersion(value: string) {
                this._implicitRegistrationMinAndroidVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "UserDevices.EnableStaticSecurityCode", value: this._enableStaticSecurityCode, dataType: 'boolean', label: "Enable Static Security Code" },
                { key: "UserDevices.StaticSecurityCodes", value: this._staticSecurityCodes, dataType: 'string[]', label: "Static Security Codes" },
                { key: "UserDevices.ValidSecurityCodeCharacters", value: this._validSecurityCodeCharacters, dataType: 'string', label: "Valid Security Code Characters" },
                { key: "UserDevices.AppKeyLength", value: this._appKeyLength, dataType: 'number', label: "App Key Length" },
                { key: "UserDevices.ImplicitRegistrationEnabled", value: this._implicitRegistrationEnabled, dataType: 'boolean', label: "Implicit Registration Enabled" },
                { key: "UserDevices.ImplicitRegistrationMinIosVersion", value: this._implicitRegistrationMinIosVersion, dataType: 'string', label: "Implicit Registration Min Ios Version" },
                { key: "UserDevices.ImplicitRegistrationMinAndroidVersion", value: this._implicitRegistrationMinAndroidVersion, dataType: 'string', label: "Implicit Registration Min Android Version" },
            ];
        }

}