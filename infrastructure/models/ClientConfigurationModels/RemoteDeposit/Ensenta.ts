import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface EnsentaConfig {
    ServiceUrl: string;
    DepositAccountIdentifierCacheExpireInMinutes: number;
}

export class Ensenta implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Ensenta'
    };


            private _serviceUrl: string;
            get serviceUrl(): string {
                return this._serviceUrl;
            }
            set serviceUrl(value: string) {
                this._serviceUrl = value;
            }

            private _depositAccountIdentifierCacheExpireInMinutes: number;
            get depositAccountIdentifierCacheExpireInMinutes(): number {
                return this._depositAccountIdentifierCacheExpireInMinutes;
            }
            set depositAccountIdentifierCacheExpireInMinutes(value: number) {
                this._depositAccountIdentifierCacheExpireInMinutes = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Ensenta.ServiceUrl", value: this._serviceUrl, dataType: 'string', label: "Service Url" },
                { key: "Ensenta.DepositAccountIdentifierCacheExpireInMinutes", value: this._depositAccountIdentifierCacheExpireInMinutes, dataType: 'number', label: "Deposit Account Identifier Cache Expire In Minutes" },
            ];
        }

}