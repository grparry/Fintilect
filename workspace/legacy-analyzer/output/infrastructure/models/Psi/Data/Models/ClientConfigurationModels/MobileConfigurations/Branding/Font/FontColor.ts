import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface FontColorConfig {
    PrimaryColor: string;
    LightColor: string;
    HintColor: string;
    InvertedColor: string;
    NavigationBarTitleTextColor: string;
    MenuTextColor: string;
    LogoutButtonTextColor: string;
    MakeAPaymentColor: string;
    QuickAccessTextColor: string;
}

export class FontColor implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'FontColor'
    };


            private _primaryColor: string;
            get primaryColor(): string {
                return this._primaryColor;
            }
            set primaryColor(value: string) {
                this._primaryColor = value;
            }

            private _lightColor: string;
            get lightColor(): string {
                return this._lightColor;
            }
            set lightColor(value: string) {
                this._lightColor = value;
            }

            private _hintColor: string;
            get hintColor(): string {
                return this._hintColor;
            }
            set hintColor(value: string) {
                this._hintColor = value;
            }

            private _invertedColor: string;
            get invertedColor(): string {
                return this._invertedColor;
            }
            set invertedColor(value: string) {
                this._invertedColor = value;
            }

            private _navigationBarTitleTextColor: string;
            get navigationBarTitleTextColor(): string {
                return this._navigationBarTitleTextColor;
            }
            set navigationBarTitleTextColor(value: string) {
                this._navigationBarTitleTextColor = value;
            }

            private _menuTextColor: string;
            get menuTextColor(): string {
                return this._menuTextColor;
            }
            set menuTextColor(value: string) {
                this._menuTextColor = value;
            }

            private _logoutButtonTextColor: string;
            get logoutButtonTextColor(): string {
                return this._logoutButtonTextColor;
            }
            set logoutButtonTextColor(value: string) {
                this._logoutButtonTextColor = value;
            }

            private _makeAPaymentColor: string;
            get makeAPaymentColor(): string {
                return this._makeAPaymentColor;
            }
            set makeAPaymentColor(value: string) {
                this._makeAPaymentColor = value;
            }

            private _quickAccessTextColor: string;
            get quickAccessTextColor(): string {
                return this._quickAccessTextColor;
            }
            set quickAccessTextColor(value: string) {
                this._quickAccessTextColor = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "FontColor.PrimaryColor", value: this._primaryColor, dataType: 'string', label: "Primary Color" },
                { key: "FontColor.LightColor", value: this._lightColor, dataType: 'string', label: "Light Color" },
                { key: "FontColor.HintColor", value: this._hintColor, dataType: 'string', label: "Hint Color" },
                { key: "FontColor.InvertedColor", value: this._invertedColor, dataType: 'string', label: "Inverted Color" },
                { key: "FontColor.NavigationBarTitleTextColor", value: this._navigationBarTitleTextColor, dataType: 'string', label: "Navigation Bar Title Text Color" },
                { key: "FontColor.MenuTextColor", value: this._menuTextColor, dataType: 'string', label: "Menu Text Color" },
                { key: "FontColor.LogoutButtonTextColor", value: this._logoutButtonTextColor, dataType: 'string', label: "Logout Button Text Color" },
                { key: "FontColor.MakeAPaymentColor", value: this._makeAPaymentColor, dataType: 'string', label: "Make A Payment Color" },
                { key: "FontColor.QuickAccessTextColor", value: this._quickAccessTextColor, dataType: 'string', label: "Quick Access Text Color" },
            ];
        }

}