import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ConnectNativeConfig {
    ShowThemeSelectorOverFlowMenu: boolean;
    DefaultTheme: string;
    ThemeSelectorEnabled: boolean;
    ConnectNativeMenuConfiguration: string;
    FooterContent: string;
    FooterEnabled: boolean;
}

export class ConnectNative implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ConnectNative'
    };


            private _showThemeSelectorOverFlowMenu: boolean;
            get showThemeSelectorOverFlowMenu(): boolean {
                return this._showThemeSelectorOverFlowMenu;
            }
            set showThemeSelectorOverFlowMenu(value: boolean) {
                this._showThemeSelectorOverFlowMenu = value;
            }

            private _defaultTheme: string;
            get defaultTheme(): string {
                return this._defaultTheme;
            }
            set defaultTheme(value: string) {
                this._defaultTheme = value;
            }

            private _themeSelectorEnabled: boolean;
            get themeSelectorEnabled(): boolean {
                return this._themeSelectorEnabled;
            }
            set themeSelectorEnabled(value: boolean) {
                this._themeSelectorEnabled = value;
            }

            private _connectNativeMenuConfiguration: string;
            get connectNativeMenuConfiguration(): string {
                return this._connectNativeMenuConfiguration;
            }
            set connectNativeMenuConfiguration(value: string) {
                this._connectNativeMenuConfiguration = value;
            }

            private _footerContent: string;
            get footerContent(): string {
                return this._footerContent;
            }
            set footerContent(value: string) {
                this._footerContent = value;
            }

            private _footerEnabled: boolean;
            get footerEnabled(): boolean {
                return this._footerEnabled;
            }
            set footerEnabled(value: boolean) {
                this._footerEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ConnectNative.ShowThemeSelectorOverFlowMenu", value: this._showThemeSelectorOverFlowMenu, dataType: 'boolean', label: "Show Theme Selector Over Flow Menu" },
                { key: "ConnectNative.DefaultTheme", value: this._defaultTheme, dataType: 'string', label: "Default Theme" },
                { key: "ConnectNative.ThemeSelectorEnabled", value: this._themeSelectorEnabled, dataType: 'boolean', label: "Theme Selector Enabled" },
                { key: "ConnectNative.ConnectNativeMenuConfiguration", value: this._connectNativeMenuConfiguration, dataType: 'string', label: "Connect Native Menu Configuration" },
                { key: "ConnectNative.FooterContent", value: this._footerContent, dataType: 'string', label: "Footer Content" },
                { key: "ConnectNative.FooterEnabled", value: this._footerEnabled, dataType: 'boolean', label: "Footer Enabled" },
            ];
        }

}