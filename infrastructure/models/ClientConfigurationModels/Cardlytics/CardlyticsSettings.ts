import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface CardlyticsSettingsConfig {
    CardlyticsEnabled: boolean;
    AdminCardlyticsEnabled: boolean;
    CardlyticsAccountTypes: string[];
    ShouldShowSuffixUpdateRowInAdmin: boolean;
    JQueryVersion: string;
    DomInjectionVersionEnabled: boolean;
    MainScriptName: string;
    ConfigScriptName: string;
    InitScriptName: string;
    FiFolder: string;
    OpsServerUrl: string;
    DomInjectionVersionJQueryVersion: string;
    VueVersion: string;
}

export class CardlyticsSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CardlyticsSettings'
    };


            private _cardlyticsEnabled: boolean;
            get cardlyticsEnabled(): boolean {
                return this._cardlyticsEnabled;
            }
            set cardlyticsEnabled(value: boolean) {
                this._cardlyticsEnabled = value;
            }

            private _adminCardlyticsEnabled: boolean;
            get adminCardlyticsEnabled(): boolean {
                return this._adminCardlyticsEnabled;
            }
            set adminCardlyticsEnabled(value: boolean) {
                this._adminCardlyticsEnabled = value;
            }

            private _cardlyticsAccountTypes: string[];
            get cardlyticsAccountTypes(): string[] {
                return this._cardlyticsAccountTypes;
            }
            set cardlyticsAccountTypes(value: string[]) {
                this._cardlyticsAccountTypes = value;
            }

            private _shouldShowSuffixUpdateRowInAdmin: boolean;
            get shouldShowSuffixUpdateRowInAdmin(): boolean {
                return this._shouldShowSuffixUpdateRowInAdmin;
            }
            set shouldShowSuffixUpdateRowInAdmin(value: boolean) {
                this._shouldShowSuffixUpdateRowInAdmin = value;
            }

            private _jQueryVersion: string;
            get jQueryVersion(): string {
                return this._jQueryVersion;
            }
            set jQueryVersion(value: string) {
                this._jQueryVersion = value;
            }

            private _domInjectionVersionEnabled: boolean;
            get domInjectionVersionEnabled(): boolean {
                return this._domInjectionVersionEnabled;
            }
            set domInjectionVersionEnabled(value: boolean) {
                this._domInjectionVersionEnabled = value;
            }

            private _mainScriptName: string;
            get mainScriptName(): string {
                return this._mainScriptName;
            }
            set mainScriptName(value: string) {
                this._mainScriptName = value;
            }

            private _configScriptName: string;
            get configScriptName(): string {
                return this._configScriptName;
            }
            set configScriptName(value: string) {
                this._configScriptName = value;
            }

            private _initScriptName: string;
            get initScriptName(): string {
                return this._initScriptName;
            }
            set initScriptName(value: string) {
                this._initScriptName = value;
            }

            private _fiFolder: string;
            get fiFolder(): string {
                return this._fiFolder;
            }
            set fiFolder(value: string) {
                this._fiFolder = value;
            }

            private _opsServerUrl: string;
            get opsServerUrl(): string {
                return this._opsServerUrl;
            }
            set opsServerUrl(value: string) {
                this._opsServerUrl = value;
            }

            private _domInjectionVersionJQueryVersion: string;
            get domInjectionVersionJQueryVersion(): string {
                return this._domInjectionVersionJQueryVersion;
            }
            set domInjectionVersionJQueryVersion(value: string) {
                this._domInjectionVersionJQueryVersion = value;
            }

            private _vueVersion: string;
            get vueVersion(): string {
                return this._vueVersion;
            }
            set vueVersion(value: string) {
                this._vueVersion = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CardlyticsSettings.CardlyticsEnabled", value: this._cardlyticsEnabled, dataType: 'boolean', label: "Cardlytics Enabled" },
                { key: "CardlyticsSettings.AdminCardlyticsEnabled", value: this._adminCardlyticsEnabled, dataType: 'boolean', label: "Admin Cardlytics Enabled" },
                { key: "CardlyticsSettings.CardlyticsAccountTypes", value: this._cardlyticsAccountTypes, dataType: 'list<string>', label: "Cardlytics Account Types" },
                { key: "CardlyticsSettings.ShouldShowSuffixUpdateRowInAdmin", value: this._shouldShowSuffixUpdateRowInAdmin, dataType: 'boolean', label: "Should Show Suffix Update Row In Admin" },
                { key: "CardlyticsSettings.JQueryVersion", value: this._jQueryVersion, dataType: 'string', label: "J Query Version" },
                { key: "CardlyticsSettings.DomInjectionVersionEnabled", value: this._domInjectionVersionEnabled, dataType: 'boolean', label: "Dom Injection Version Enabled" },
                { key: "CardlyticsSettings.MainScriptName", value: this._mainScriptName, dataType: 'string', label: "Main Script Name" },
                { key: "CardlyticsSettings.ConfigScriptName", value: this._configScriptName, dataType: 'string', label: "Config Script Name" },
                { key: "CardlyticsSettings.InitScriptName", value: this._initScriptName, dataType: 'string', label: "Init Script Name" },
                { key: "CardlyticsSettings.FiFolder", value: this._fiFolder, dataType: 'string', label: "Fi Folder" },
                { key: "CardlyticsSettings.OpsServerUrl", value: this._opsServerUrl, dataType: 'string', label: "Ops Server Url" },
                { key: "CardlyticsSettings.DomInjectionVersionJQueryVersion", value: this._domInjectionVersionJQueryVersion, dataType: 'string', label: "Dom Injection Version J Query Version" },
                { key: "CardlyticsSettings.VueVersion", value: this._vueVersion, dataType: 'string', label: "Vue Version" },
            ];
        }

}