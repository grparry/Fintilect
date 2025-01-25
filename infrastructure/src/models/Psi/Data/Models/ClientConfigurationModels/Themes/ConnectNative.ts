import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ConnectNativeConfig {
    Enabled: boolean;
    MinVersion: number;
    DeployedThemes: string[];
    UseVersionBundles: boolean;
    BrowserThemes: string[];
    UseRelativeSitePathForThemesFiles: boolean;
    ThemesFilesPath: string;
    BaseThemeSubThemesFilesPath: string;
    CoreAttributeThemeMemoNumber: string;
    DeployedThemesWithTitles: string;
    BrowserThemesWithTitles: string;
}

export class ConnectNative implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ConnectNative'
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

            private _deployedThemes: string[];
            get deployedThemes(): string[] {
                return this._deployedThemes;
            }
            set deployedThemes(value: string[]) {
                this._deployedThemes = value;
            }

            private _useVersionBundles: boolean;
            get useVersionBundles(): boolean {
                return this._useVersionBundles;
            }
            set useVersionBundles(value: boolean) {
                this._useVersionBundles = value;
            }

            private _browserThemes: string[];
            get browserThemes(): string[] {
                return this._browserThemes;
            }
            set browserThemes(value: string[]) {
                this._browserThemes = value;
            }

            private _useRelativeSitePathForThemesFiles: boolean;
            get useRelativeSitePathForThemesFiles(): boolean {
                return this._useRelativeSitePathForThemesFiles;
            }
            set useRelativeSitePathForThemesFiles(value: boolean) {
                this._useRelativeSitePathForThemesFiles = value;
            }

            private _themesFilesPath: string;
            get themesFilesPath(): string {
                return this._themesFilesPath;
            }
            set themesFilesPath(value: string) {
                this._themesFilesPath = value;
            }

            private _baseThemeSubThemesFilesPath: string;
            get baseThemeSubThemesFilesPath(): string {
                return this._baseThemeSubThemesFilesPath;
            }
            set baseThemeSubThemesFilesPath(value: string) {
                this._baseThemeSubThemesFilesPath = value;
            }

            private _coreAttributeThemeMemoNumber: string;
            get coreAttributeThemeMemoNumber(): string {
                return this._coreAttributeThemeMemoNumber;
            }
            set coreAttributeThemeMemoNumber(value: string) {
                this._coreAttributeThemeMemoNumber = value;
            }

            private _deployedThemesWithTitles: string;
            get deployedThemesWithTitles(): string {
                return this._deployedThemesWithTitles;
            }
            set deployedThemesWithTitles(value: string) {
                this._deployedThemesWithTitles = value;
            }

            private _browserThemesWithTitles: string;
            get browserThemesWithTitles(): string {
                return this._browserThemesWithTitles;
            }
            set browserThemesWithTitles(value: string) {
                this._browserThemesWithTitles = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ConnectNative.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "ConnectNative.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "ConnectNative.DeployedThemes", value: this._deployedThemes, dataType: 'list<string>', label: "Deployed Themes" },
                { key: "ConnectNative.UseVersionBundles", value: this._useVersionBundles, dataType: 'boolean', label: "Use Version Bundles" },
                { key: "ConnectNative.BrowserThemes", value: this._browserThemes, dataType: 'list<string>', label: "Browser Themes" },
                { key: "ConnectNative.UseRelativeSitePathForThemesFiles", value: this._useRelativeSitePathForThemesFiles, dataType: 'boolean', label: "Use Relative Site Path For Themes Files" },
                { key: "ConnectNative.ThemesFilesPath", value: this._themesFilesPath, dataType: 'string', label: "Themes Files Path" },
                { key: "ConnectNative.BaseThemeSubThemesFilesPath", value: this._baseThemeSubThemesFilesPath, dataType: 'string', label: "Base Theme Sub Themes Files Path" },
                { key: "ConnectNative.CoreAttributeThemeMemoNumber", value: this._coreAttributeThemeMemoNumber, dataType: 'string', label: "Core Attribute Theme Memo Number" },
                { key: "ConnectNative.DeployedThemesWithTitles", value: this._deployedThemesWithTitles, dataType: 'string', label: "Deployed Themes With Titles" },
                { key: "ConnectNative.BrowserThemesWithTitles", value: this._browserThemesWithTitles, dataType: 'string', label: "Browser Themes With Titles" },
            ];
        }

}