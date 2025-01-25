import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface ProfitStarsConfig {
    StoreId: number;
    EntityId: number;
    StoreKey: string;
    SharedSecret: string;
    FiIdentifier: string;
    AdminServiceUrl: string;
    ServiceUrl: string;
    VendorName: string;
    AndroidAppBundleId: string;
    IosAppBundleId: string;
    SyncAccountsEnabled: boolean;
}

export class ProfitStars implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ProfitStars'
    };


            private _storeId: number;
            get storeId(): number {
                return this._storeId;
            }
            set storeId(value: number) {
                this._storeId = value;
            }

            private _entityId: number;
            get entityId(): number {
                return this._entityId;
            }
            set entityId(value: number) {
                this._entityId = value;
            }

            private _storeKey: string;
            get storeKey(): string {
                return this._storeKey;
            }
            set storeKey(value: string) {
                this._storeKey = value;
            }

            private _sharedSecret: string;
            get sharedSecret(): string {
                return this._sharedSecret;
            }
            set sharedSecret(value: string) {
                this._sharedSecret = value;
            }

            private _fiIdentifier: string;
            get fiIdentifier(): string {
                return this._fiIdentifier;
            }
            set fiIdentifier(value: string) {
                this._fiIdentifier = value;
            }

            private _adminServiceUrl: string;
            get adminServiceUrl(): string {
                return this._adminServiceUrl;
            }
            set adminServiceUrl(value: string) {
                this._adminServiceUrl = value;
            }

            private _serviceUrl: string;
            get serviceUrl(): string {
                return this._serviceUrl;
            }
            set serviceUrl(value: string) {
                this._serviceUrl = value;
            }

            private _vendorName: string;
            get vendorName(): string {
                return this._vendorName;
            }
            set vendorName(value: string) {
                this._vendorName = value;
            }

            private _androidAppBundleId: string;
            get androidAppBundleId(): string {
                return this._androidAppBundleId;
            }
            set androidAppBundleId(value: string) {
                this._androidAppBundleId = value;
            }

            private _iosAppBundleId: string;
            get iosAppBundleId(): string {
                return this._iosAppBundleId;
            }
            set iosAppBundleId(value: string) {
                this._iosAppBundleId = value;
            }

            private _syncAccountsEnabled: boolean;
            get syncAccountsEnabled(): boolean {
                return this._syncAccountsEnabled;
            }
            set syncAccountsEnabled(value: boolean) {
                this._syncAccountsEnabled = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ProfitStars.StoreId", value: this._storeId, dataType: 'number', label: "Store Id" },
                { key: "ProfitStars.EntityId", value: this._entityId, dataType: 'number', label: "Entity Id" },
                { key: "ProfitStars.StoreKey", value: this._storeKey, dataType: 'string', label: "Store Key" },
                { key: "ProfitStars.SharedSecret", value: this._sharedSecret, dataType: 'string', label: "Shared Secret" },
                { key: "ProfitStars.FiIdentifier", value: this._fiIdentifier, dataType: 'string', label: "Fi Identifier" },
                { key: "ProfitStars.AdminServiceUrl", value: this._adminServiceUrl, dataType: 'string', label: "Admin Service Url" },
                { key: "ProfitStars.ServiceUrl", value: this._serviceUrl, dataType: 'string', label: "Service Url" },
                { key: "ProfitStars.VendorName", value: this._vendorName, dataType: 'string', label: "Vendor Name" },
                { key: "ProfitStars.AndroidAppBundleId", value: this._androidAppBundleId, dataType: 'string', label: "Android App Bundle Id" },
                { key: "ProfitStars.IosAppBundleId", value: this._iosAppBundleId, dataType: 'string', label: "Ios App Bundle Id" },
                { key: "ProfitStars.SyncAccountsEnabled", value: this._syncAccountsEnabled, dataType: 'boolean', label: "Sync Accounts Enabled" },
            ];
        }

}