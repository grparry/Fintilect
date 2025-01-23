import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PublicApiSettingsConfig {
    DefaultAccountHistoryDays: number;
    ConnectPublicApiUseCards: boolean;
}

export class PublicApiSettings implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'PublicApiSettings'
    };


            private _defaultAccountHistoryDays: number;
            get defaultAccountHistoryDays(): number {
                return this._defaultAccountHistoryDays;
            }
            set defaultAccountHistoryDays(value: number) {
                this._defaultAccountHistoryDays = value;
            }

            private _connectPublicApiUseCards: boolean;
            get connectPublicApiUseCards(): boolean {
                return this._connectPublicApiUseCards;
            }
            set connectPublicApiUseCards(value: boolean) {
                this._connectPublicApiUseCards = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "PublicApiSettings.DefaultAccountHistoryDays", value: this._defaultAccountHistoryDays, dataType: 'number', label: "Default Account History Days" },
                { key: "PublicApiSettings.ConnectPublicApiUseCards", value: this._connectPublicApiUseCards, dataType: 'boolean', label: "Connect Public Api Use Cards" },
            ];
        }

}