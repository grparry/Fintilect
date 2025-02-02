import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface PayzurConfig {
    SyncCardsEnabled: boolean;
    SyncCardsMinVersion: number;
    PublicKey: string;
    AccountTypes: string;
    ShouldOpenInIframe: boolean;
    SyncDuplicateCardsEnabled: boolean;
    UseOAEP: boolean;
    SyncAddedCardsEnabled: boolean;
    ShouldSkipCardSyncWhenCoreIsDown: boolean;
}

export class Payzur implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Payzur'
    };


            private _syncCardsEnabled: boolean;
            get syncCardsEnabled(): boolean {
                return this._syncCardsEnabled;
            }
            set syncCardsEnabled(value: boolean) {
                this._syncCardsEnabled = value;
            }

            private _syncCardsMinVersion: number;
            get syncCardsMinVersion(): number {
                return this._syncCardsMinVersion;
            }
            set syncCardsMinVersion(value: number) {
                this._syncCardsMinVersion = value;
            }

            private _publicKey: string;
            get publicKey(): string {
                return this._publicKey;
            }
            set publicKey(value: string) {
                this._publicKey = value;
            }

            private _accountTypes: string;
            get accountTypes(): string {
                return this._accountTypes;
            }
            set accountTypes(value: string) {
                this._accountTypes = value;
            }

            private _shouldOpenInIframe: boolean;
            get shouldOpenInIframe(): boolean {
                return this._shouldOpenInIframe;
            }
            set shouldOpenInIframe(value: boolean) {
                this._shouldOpenInIframe = value;
            }

            private _syncDuplicateCardsEnabled: boolean;
            get syncDuplicateCardsEnabled(): boolean {
                return this._syncDuplicateCardsEnabled;
            }
            set syncDuplicateCardsEnabled(value: boolean) {
                this._syncDuplicateCardsEnabled = value;
            }

            private _useOAEP: boolean;
            get useOAEP(): boolean {
                return this._useOAEP;
            }
            set useOAEP(value: boolean) {
                this._useOAEP = value;
            }

            private _syncAddedCardsEnabled: boolean;
            get syncAddedCardsEnabled(): boolean {
                return this._syncAddedCardsEnabled;
            }
            set syncAddedCardsEnabled(value: boolean) {
                this._syncAddedCardsEnabled = value;
            }

            private _shouldSkipCardSyncWhenCoreIsDown: boolean;
            get shouldSkipCardSyncWhenCoreIsDown(): boolean {
                return this._shouldSkipCardSyncWhenCoreIsDown;
            }
            set shouldSkipCardSyncWhenCoreIsDown(value: boolean) {
                this._shouldSkipCardSyncWhenCoreIsDown = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Payzur.SyncCardsEnabled", value: this._syncCardsEnabled, dataType: 'boolean', label: "Sync Cards Enabled" },
                { key: "Payzur.SyncCardsMinVersion", value: this._syncCardsMinVersion, dataType: 'number', label: "Sync Cards Min Version" },
                { key: "Payzur.PublicKey", value: this._publicKey, dataType: 'string', label: "Public Key" },
                { key: "Payzur.AccountTypes", value: this._accountTypes, dataType: 'string', label: "Account Types" },
                { key: "Payzur.ShouldOpenInIframe", value: this._shouldOpenInIframe, dataType: 'boolean', label: "Should Open In Iframe" },
                { key: "Payzur.SyncDuplicateCardsEnabled", value: this._syncDuplicateCardsEnabled, dataType: 'boolean', label: "Sync Duplicate Cards Enabled" },
                { key: "Payzur.UseOAEP", value: this._useOAEP, dataType: 'boolean', label: "Use O A E P" },
                { key: "Payzur.SyncAddedCardsEnabled", value: this._syncAddedCardsEnabled, dataType: 'boolean', label: "Sync Added Cards Enabled" },
                { key: "Payzur.ShouldSkipCardSyncWhenCoreIsDown", value: this._shouldSkipCardSyncWhenCoreIsDown, dataType: 'boolean', label: "Should Skip Card Sync When Core Is Down" },
            ];
        }

}