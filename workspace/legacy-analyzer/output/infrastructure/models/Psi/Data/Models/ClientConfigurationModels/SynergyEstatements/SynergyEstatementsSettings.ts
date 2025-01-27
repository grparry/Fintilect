import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '@infrastructure/MobileConfigurations.Authentication.Authentication';
export interface SynergyEstatementsSettingsConfig {
    Enabled: boolean;
    MinVersion: number;
    MinAndroidVersion: string;
    MinIosVersion: string;
    OrgAlias: string;
    ValidationCode: string;
    Authentication: Authentication;
}

export class SynergyEstatementsSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SynergyEstatementsSettings'
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

            private _minAndroidVersion: string;
            get minAndroidVersion(): string {
                return this._minAndroidVersion;
            }
            set minAndroidVersion(value: string) {
                this._minAndroidVersion = value;
            }

            private _minIosVersion: string;
            get minIosVersion(): string {
                return this._minIosVersion;
            }
            set minIosVersion(value: string) {
                this._minIosVersion = value;
            }

            private _orgAlias: string;
            get orgAlias(): string {
                return this._orgAlias;
            }
            set orgAlias(value: string) {
                this._orgAlias = value;
            }

            private _validationCode: string;
            get validationCode(): string {
                return this._validationCode;
            }
            set validationCode(value: string) {
                this._validationCode = value;
            }

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SynergyEstatementsSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SynergyEstatementsSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "SynergyEstatementsSettings.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "SynergyEstatementsSettings.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "SynergyEstatementsSettings.OrgAlias", value: this._orgAlias, dataType: 'string', label: "Org Alias" },
                { key: "SynergyEstatementsSettings.ValidationCode", value: this._validationCode, dataType: 'string', label: "Validation Code" },
                { key: "SynergyEstatementsSettings.Authentication", value: this._authentication, dataType: 'mobileconfigurations.authentication.authentication', label: "Authentication" },
            ];
        }

}