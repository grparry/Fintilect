import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PromoChannelConfig {
    MinimumVersion: string;
    Enabled: boolean;
    MobileSmall: number;
    MobileMedium: number;
    MobileLarge: number;
}

export class PromoChannel implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PromoChannel'
    };


            private _minimumVersion: string;
            get minimumVersion(): string {
                return this._minimumVersion;
            }
            set minimumVersion(value: string) {
                this._minimumVersion = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _mobileSmall: number;
            get mobileSmall(): number {
                return this._mobileSmall;
            }
            set mobileSmall(value: number) {
                this._mobileSmall = value;
            }

            private _mobileMedium: number;
            get mobileMedium(): number {
                return this._mobileMedium;
            }
            set mobileMedium(value: number) {
                this._mobileMedium = value;
            }

            private _mobileLarge: number;
            get mobileLarge(): number {
                return this._mobileLarge;
            }
            set mobileLarge(value: number) {
                this._mobileLarge = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PromoChannel.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "PromoChannel.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "PromoChannel.MobileSmall", value: this._mobileSmall, dataType: 'number', label: "Mobile Small" },
                { key: "PromoChannel.MobileMedium", value: this._mobileMedium, dataType: 'number', label: "Mobile Medium" },
                { key: "PromoChannel.MobileLarge", value: this._mobileLarge, dataType: 'number', label: "Mobile Large" },
            ];
        }

}