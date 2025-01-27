import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Font } from '@infrastructure/Font.Font';
export interface BrandingConfig {
    BackgroundColor: string;
    PrimaryColor: string;
    PrimaryDarkColor: string;
    SecondaryColor: string;
    MenuIconColor: string;
    InfoColor: string;
    SuccessColor: string;
    WarningColor: string;
    MutedColor: string;
    ListColor: string;
    ListDarkColor: string;
    NavigationBarColor: string;
    NavigationBarItemColor: string;
    SelectedListColor: string;
    StatusBarColor: string;
    LogoutButtonColor: string;
    Font: Font;
}

export class Branding implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Branding'
    };


            private _backgroundColor: string;
            get backgroundColor(): string {
                return this._backgroundColor;
            }
            set backgroundColor(value: string) {
                this._backgroundColor = value;
            }

            private _primaryColor: string;
            get primaryColor(): string {
                return this._primaryColor;
            }
            set primaryColor(value: string) {
                this._primaryColor = value;
            }

            private _primaryDarkColor: string;
            get primaryDarkColor(): string {
                return this._primaryDarkColor;
            }
            set primaryDarkColor(value: string) {
                this._primaryDarkColor = value;
            }

            private _secondaryColor: string;
            get secondaryColor(): string {
                return this._secondaryColor;
            }
            set secondaryColor(value: string) {
                this._secondaryColor = value;
            }

            private _menuIconColor: string;
            get menuIconColor(): string {
                return this._menuIconColor;
            }
            set menuIconColor(value: string) {
                this._menuIconColor = value;
            }

            private _infoColor: string;
            get infoColor(): string {
                return this._infoColor;
            }
            set infoColor(value: string) {
                this._infoColor = value;
            }

            private _successColor: string;
            get successColor(): string {
                return this._successColor;
            }
            set successColor(value: string) {
                this._successColor = value;
            }

            private _warningColor: string;
            get warningColor(): string {
                return this._warningColor;
            }
            set warningColor(value: string) {
                this._warningColor = value;
            }

            private _mutedColor: string;
            get mutedColor(): string {
                return this._mutedColor;
            }
            set mutedColor(value: string) {
                this._mutedColor = value;
            }

            private _listColor: string;
            get listColor(): string {
                return this._listColor;
            }
            set listColor(value: string) {
                this._listColor = value;
            }

            private _listDarkColor: string;
            get listDarkColor(): string {
                return this._listDarkColor;
            }
            set listDarkColor(value: string) {
                this._listDarkColor = value;
            }

            private _navigationBarColor: string;
            get navigationBarColor(): string {
                return this._navigationBarColor;
            }
            set navigationBarColor(value: string) {
                this._navigationBarColor = value;
            }

            private _navigationBarItemColor: string;
            get navigationBarItemColor(): string {
                return this._navigationBarItemColor;
            }
            set navigationBarItemColor(value: string) {
                this._navigationBarItemColor = value;
            }

            private _selectedListColor: string;
            get selectedListColor(): string {
                return this._selectedListColor;
            }
            set selectedListColor(value: string) {
                this._selectedListColor = value;
            }

            private _statusBarColor: string;
            get statusBarColor(): string {
                return this._statusBarColor;
            }
            set statusBarColor(value: string) {
                this._statusBarColor = value;
            }

            private _logoutButtonColor: string;
            get logoutButtonColor(): string {
                return this._logoutButtonColor;
            }
            set logoutButtonColor(value: string) {
                this._logoutButtonColor = value;
            }

            private _font: Font;
            get font(): Font {
                return this._font;
            }
            set font(value: Font) {
                this._font = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Branding.BackgroundColor", value: this._backgroundColor, dataType: 'string', label: "Background Color" },
                { key: "Branding.PrimaryColor", value: this._primaryColor, dataType: 'string', label: "Primary Color" },
                { key: "Branding.PrimaryDarkColor", value: this._primaryDarkColor, dataType: 'string', label: "Primary Dark Color" },
                { key: "Branding.SecondaryColor", value: this._secondaryColor, dataType: 'string', label: "Secondary Color" },
                { key: "Branding.MenuIconColor", value: this._menuIconColor, dataType: 'string', label: "Menu Icon Color" },
                { key: "Branding.InfoColor", value: this._infoColor, dataType: 'string', label: "Info Color" },
                { key: "Branding.SuccessColor", value: this._successColor, dataType: 'string', label: "Success Color" },
                { key: "Branding.WarningColor", value: this._warningColor, dataType: 'string', label: "Warning Color" },
                { key: "Branding.MutedColor", value: this._mutedColor, dataType: 'string', label: "Muted Color" },
                { key: "Branding.ListColor", value: this._listColor, dataType: 'string', label: "List Color" },
                { key: "Branding.ListDarkColor", value: this._listDarkColor, dataType: 'string', label: "List Dark Color" },
                { key: "Branding.NavigationBarColor", value: this._navigationBarColor, dataType: 'string', label: "Navigation Bar Color" },
                { key: "Branding.NavigationBarItemColor", value: this._navigationBarItemColor, dataType: 'string', label: "Navigation Bar Item Color" },
                { key: "Branding.SelectedListColor", value: this._selectedListColor, dataType: 'string', label: "Selected List Color" },
                { key: "Branding.StatusBarColor", value: this._statusBarColor, dataType: 'string', label: "Status Bar Color" },
                { key: "Branding.LogoutButtonColor", value: this._logoutButtonColor, dataType: 'string', label: "Logout Button Color" },
                { key: "Branding.Font", value: this._font, dataType: 'font.font', label: "Font" },
            ];
        }

}