import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Authentication } from './Authentication.Authentication';
import { ServiceSettingsModel } from './ServiceSettingsModel';
export interface SavvyMoneyConfig {
    Enabled: boolean;
    Authentication: Authentication;
    MinimumVersion: string;
    MinimumAndroidVersion: string;
    MinimumIosVersion: string;
    MobileServiceSettings: ServiceSettingsModel;
    CreditScoreEnabled: boolean;
    ScoreChangeEnabled: boolean;
    AlertBadgeEnabled: boolean;
    BannerEnabled: boolean;
    BannerDismissalDays: number;
}

export class SavvyMoney implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SavvyMoney'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _authentication: Authentication;
            get authentication(): Authentication {
                return this._authentication;
            }
            set authentication(value: Authentication) {
                this._authentication = value;
            }

            private _minimumVersion: string;
            get minimumVersion(): string {
                return this._minimumVersion;
            }
            set minimumVersion(value: string) {
                this._minimumVersion = value;
            }

            private _minimumAndroidVersion: string;
            get minimumAndroidVersion(): string {
                return this._minimumAndroidVersion;
            }
            set minimumAndroidVersion(value: string) {
                this._minimumAndroidVersion = value;
            }

            private _minimumIosVersion: string;
            get minimumIosVersion(): string {
                return this._minimumIosVersion;
            }
            set minimumIosVersion(value: string) {
                this._minimumIosVersion = value;
            }

            private _mobileServiceSettings: ServiceSettingsModel;
            get mobileServiceSettings(): ServiceSettingsModel {
                return this._mobileServiceSettings;
            }
            set mobileServiceSettings(value: ServiceSettingsModel) {
                this._mobileServiceSettings = value;
            }

            private _creditScoreEnabled: boolean;
            get creditScoreEnabled(): boolean {
                return this._creditScoreEnabled;
            }
            set creditScoreEnabled(value: boolean) {
                this._creditScoreEnabled = value;
            }

            private _scoreChangeEnabled: boolean;
            get scoreChangeEnabled(): boolean {
                return this._scoreChangeEnabled;
            }
            set scoreChangeEnabled(value: boolean) {
                this._scoreChangeEnabled = value;
            }

            private _alertBadgeEnabled: boolean;
            get alertBadgeEnabled(): boolean {
                return this._alertBadgeEnabled;
            }
            set alertBadgeEnabled(value: boolean) {
                this._alertBadgeEnabled = value;
            }

            private _bannerEnabled: boolean;
            get bannerEnabled(): boolean {
                return this._bannerEnabled;
            }
            set bannerEnabled(value: boolean) {
                this._bannerEnabled = value;
            }

            private _bannerDismissalDays: number;
            get bannerDismissalDays(): number {
                return this._bannerDismissalDays;
            }
            set bannerDismissalDays(value: number) {
                this._bannerDismissalDays = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SavvyMoney.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "SavvyMoney.Authentication", value: this._authentication, dataType: 'authentication.authentication', label: "Authentication" },
                { key: "SavvyMoney.MinimumVersion", value: this._minimumVersion, dataType: 'string', label: "Minimum Version" },
                { key: "SavvyMoney.MinimumAndroidVersion", value: this._minimumAndroidVersion, dataType: 'string', label: "Minimum Android Version" },
                { key: "SavvyMoney.MinimumIosVersion", value: this._minimumIosVersion, dataType: 'string', label: "Minimum Ios Version" },
                { key: "SavvyMoney.MobileServiceSettings", value: this._mobileServiceSettings, dataType: 'servicesettingsmodel', label: "Mobile Service Settings" },
                { key: "SavvyMoney.CreditScoreEnabled", value: this._creditScoreEnabled, dataType: 'boolean', label: "Credit Score Enabled" },
                { key: "SavvyMoney.ScoreChangeEnabled", value: this._scoreChangeEnabled, dataType: 'boolean', label: "Score Change Enabled" },
                { key: "SavvyMoney.AlertBadgeEnabled", value: this._alertBadgeEnabled, dataType: 'boolean', label: "Alert Badge Enabled" },
                { key: "SavvyMoney.BannerEnabled", value: this._bannerEnabled, dataType: 'boolean', label: "Banner Enabled" },
                { key: "SavvyMoney.BannerDismissalDays", value: this._bannerDismissalDays, dataType: 'number', label: "Banner Dismissal Days" },
            ];
        }

}