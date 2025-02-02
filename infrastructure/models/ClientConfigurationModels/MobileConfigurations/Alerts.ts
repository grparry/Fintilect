import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface AlertsConfig {
    Enabled: boolean;
    AlertInboxUrl: string;
    AlertManagementUrl: string;
}

export class Alerts implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Alerts'
    };


            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _alertInboxUrl: string;
            get alertInboxUrl(): string {
                return this._alertInboxUrl;
            }
            set alertInboxUrl(value: string) {
                this._alertInboxUrl = value;
            }

            private _alertManagementUrl: string;
            get alertManagementUrl(): string {
                return this._alertManagementUrl;
            }
            set alertManagementUrl(value: string) {
                this._alertManagementUrl = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Alerts.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "Alerts.AlertInboxUrl", value: this._alertInboxUrl, dataType: 'string', label: "Alert Inbox Url" },
                { key: "Alerts.AlertManagementUrl", value: this._alertManagementUrl, dataType: 'string', label: "Alert Management Url" },
            ];
        }

}