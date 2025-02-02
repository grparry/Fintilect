import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from '../MobileConfigurations.Authentication.Authentication';
export interface TalkativeChatSettingsConfig {
    Authentication: Authentication;
    Enabled: boolean;
    MinVersion: number;
    MinIosVersion: string;
    MinAndroidVersion: string;
    MenuItemEnabled: boolean;
    Url: string;
    HelpOptionEnabled: boolean;
    Javascript: string;
}

export class TalkativeChatSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'TalkativeChatSettings'
    };


            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }

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

            private _minIosVersion: string;
            get minIosVersion(): string {
                return this._minIosVersion;
            }
            set minIosVersion(value: string) {
                this._minIosVersion = value;
            }

            private _minAndroidVersion: string;
            get minAndroidVersion(): string {
                return this._minAndroidVersion;
            }
            set minAndroidVersion(value: string) {
                this._minAndroidVersion = value;
            }

            private _menuItemEnabled: boolean;
            get menuItemEnabled(): boolean {
                return this._menuItemEnabled;
            }
            set menuItemEnabled(value: boolean) {
                this._menuItemEnabled = value;
            }

            private _url: string;
            get url(): string {
                return this._url;
            }
            set url(value: string) {
                this._url = value;
            }

            private _helpOptionEnabled: boolean;
            get helpOptionEnabled(): boolean {
                return this._helpOptionEnabled;
            }
            set helpOptionEnabled(value: boolean) {
                this._helpOptionEnabled = value;
            }

            private _javascript: string;
            get javascript(): string {
                return this._javascript;
            }
            set javascript(value: string) {
                this._javascript = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "TalkativeChatSettings.Authentication", value: this._authentication, dataType: 'mobileconfigurations.authentication.authentication', label: "Authentication" },
                { key: "TalkativeChatSettings.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "TalkativeChatSettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "TalkativeChatSettings.MinIosVersion", value: this._minIosVersion, dataType: 'string', label: "Min Ios Version" },
                { key: "TalkativeChatSettings.MinAndroidVersion", value: this._minAndroidVersion, dataType: 'string', label: "Min Android Version" },
                { key: "TalkativeChatSettings.MenuItemEnabled", value: this._menuItemEnabled, dataType: 'boolean', label: "Menu Item Enabled" },
                { key: "TalkativeChatSettings.Url", value: this._url, dataType: 'string', label: "Url" },
                { key: "TalkativeChatSettings.HelpOptionEnabled", value: this._helpOptionEnabled, dataType: 'boolean', label: "Help Option Enabled" },
                { key: "TalkativeChatSettings.Javascript", value: this._javascript, dataType: 'string', label: "Javascript" },
            ];
        }

}