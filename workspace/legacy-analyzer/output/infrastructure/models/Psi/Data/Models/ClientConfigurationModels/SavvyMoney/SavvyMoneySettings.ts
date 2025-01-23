import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { ServiceSettingsModel } from './ServiceSettingsModel';
export interface SavvyMoneySettingsConfig {
    ServiceSettings: ServiceSettingsModel;
    ServiceSettingsIframe: ServiceSettingsModel;
    HomeBankingEnabled: boolean;
    MinVersion: number;
    ApiAuthId: string;
    ApiAuthKey: string;
    ApiDomain: string;
    ApiPartnerId: string;
    ApiBaseUrl: string;
}

export class SavvyMoneySettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'SavvyMoneySettings'
    };


            private _serviceSettings: ServiceSettingsModel;
            get serviceSettings(): ServiceSettingsModel {
                return this._serviceSettings;
            }
            set serviceSettings(value: ServiceSettingsModel) {
                this._serviceSettings = value;
            }

            private _serviceSettingsIframe: ServiceSettingsModel;
            get serviceSettingsIframe(): ServiceSettingsModel {
                return this._serviceSettingsIframe;
            }
            set serviceSettingsIframe(value: ServiceSettingsModel) {
                this._serviceSettingsIframe = value;
            }

            private _homeBankingEnabled: boolean;
            get homeBankingEnabled(): boolean {
                return this._homeBankingEnabled;
            }
            set homeBankingEnabled(value: boolean) {
                this._homeBankingEnabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _apiAuthId: string;
            get apiAuthId(): string {
                return this._apiAuthId;
            }
            set apiAuthId(value: string) {
                this._apiAuthId = value;
            }

            private _apiAuthKey: string;
            get apiAuthKey(): string {
                return this._apiAuthKey;
            }
            set apiAuthKey(value: string) {
                this._apiAuthKey = value;
            }

            private _apiDomain: string;
            get apiDomain(): string {
                return this._apiDomain;
            }
            set apiDomain(value: string) {
                this._apiDomain = value;
            }

            private _apiPartnerId: string;
            get apiPartnerId(): string {
                return this._apiPartnerId;
            }
            set apiPartnerId(value: string) {
                this._apiPartnerId = value;
            }

            private _apiBaseUrl: string;
            get apiBaseUrl(): string {
                return this._apiBaseUrl;
            }
            set apiBaseUrl(value: string) {
                this._apiBaseUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "SavvyMoneySettings.ServiceSettings", value: this._serviceSettings, dataType: 'servicesettingsmodel', label: "Service Settings" },
                { key: "SavvyMoneySettings.ServiceSettingsIframe", value: this._serviceSettingsIframe, dataType: 'servicesettingsmodel', label: "Service Settings Iframe" },
                { key: "SavvyMoneySettings.HomeBankingEnabled", value: this._homeBankingEnabled, dataType: 'boolean', label: "Home Banking Enabled" },
                { key: "SavvyMoneySettings.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "SavvyMoneySettings.ApiAuthId", value: this._apiAuthId, dataType: 'string', label: "Api Auth Id" },
                { key: "SavvyMoneySettings.ApiAuthKey", value: this._apiAuthKey, dataType: 'string', label: "Api Auth Key" },
                { key: "SavvyMoneySettings.ApiDomain", value: this._apiDomain, dataType: 'string', label: "Api Domain" },
                { key: "SavvyMoneySettings.ApiPartnerId", value: this._apiPartnerId, dataType: 'string', label: "Api Partner Id" },
                { key: "SavvyMoneySettings.ApiBaseUrl", value: this._apiBaseUrl, dataType: 'string', label: "Api Base Url" },
            ];
        }

}