import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Security } from '@infrastructure/System.Security.Cryptography.X509Certificates.StoreName';
import { FiservCardHistoryCycleTypes } from '@infrastructure/FiservCardHistoryCycleTypes';
export interface CardHistoryConfig {
    ShowPendingTransactionsFirst: boolean;
    EnableCardHistoryDateRangeSearch: boolean;
    PSCUSSOConfigID: string;
    UsePscuSsoUrl: boolean;
    ShouldSetPendingTransactionAmountAsNeutral: boolean;
    FiservApiBaseUrl: string;
    FiservTokenCreateApiEndpoint: string;
    FiservUserId: string;
    FiservPassword: string;
    Fiservx500Id: string;
    FiservCertificateStore: StoreName;
    FiservCertificateThumbPrint: string;
    FiservDebugModeEnabled: boolean;
    FiservStatementDetailsApiEndpoint: string;
    FiservCustomerInquiryApiEndpoint: string;
    PscuShouldShowDateForPendingTransactions: boolean;
    PscuSsoEnabled: boolean;
    FiservCycle: FiservCardHistoryCycleTypes;
}

export class CardHistory implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'CardHistory'
    };


            private _showPendingTransactionsFirst: boolean;
            get showPendingTransactionsFirst(): boolean {
                return this._showPendingTransactionsFirst;
            }
            set showPendingTransactionsFirst(value: boolean) {
                this._showPendingTransactionsFirst = value;
            }

            private _enableCardHistoryDateRangeSearch: boolean;
            get enableCardHistoryDateRangeSearch(): boolean {
                return this._enableCardHistoryDateRangeSearch;
            }
            set enableCardHistoryDateRangeSearch(value: boolean) {
                this._enableCardHistoryDateRangeSearch = value;
            }

            private _pSCUSSOConfigID: string;
            get pSCUSSOConfigID(): string {
                return this._pSCUSSOConfigID;
            }
            set pSCUSSOConfigID(value: string) {
                this._pSCUSSOConfigID = value;
            }

            private _usePscuSsoUrl: boolean;
            get usePscuSsoUrl(): boolean {
                return this._usePscuSsoUrl;
            }
            set usePscuSsoUrl(value: boolean) {
                this._usePscuSsoUrl = value;
            }

            private _shouldSetPendingTransactionAmountAsNeutral: boolean;
            get shouldSetPendingTransactionAmountAsNeutral(): boolean {
                return this._shouldSetPendingTransactionAmountAsNeutral;
            }
            set shouldSetPendingTransactionAmountAsNeutral(value: boolean) {
                this._shouldSetPendingTransactionAmountAsNeutral = value;
            }

            private _fiservApiBaseUrl: string;
            get fiservApiBaseUrl(): string {
                return this._fiservApiBaseUrl;
            }
            set fiservApiBaseUrl(value: string) {
                this._fiservApiBaseUrl = value;
            }

            private _fiservTokenCreateApiEndpoint: string;
            get fiservTokenCreateApiEndpoint(): string {
                return this._fiservTokenCreateApiEndpoint;
            }
            set fiservTokenCreateApiEndpoint(value: string) {
                this._fiservTokenCreateApiEndpoint = value;
            }

            private _fiservUserId: string;
            get fiservUserId(): string {
                return this._fiservUserId;
            }
            set fiservUserId(value: string) {
                this._fiservUserId = value;
            }

            private _fiservPassword: string;
            get fiservPassword(): string {
                return this._fiservPassword;
            }
            set fiservPassword(value: string) {
                this._fiservPassword = value;
            }

            private _fiservx500Id: string;
            get fiservx500Id(): string {
                return this._fiservx500Id;
            }
            set fiservx500Id(value: string) {
                this._fiservx500Id = value;
            }

            private _fiservCertificateStore: StoreName;
            get fiservCertificateStore(): StoreName {
                return this._fiservCertificateStore;
            }
            set fiservCertificateStore(value: StoreName) {
                this._fiservCertificateStore = value;
            }

            private _fiservCertificateThumbPrint: string;
            get fiservCertificateThumbPrint(): string {
                return this._fiservCertificateThumbPrint;
            }
            set fiservCertificateThumbPrint(value: string) {
                this._fiservCertificateThumbPrint = value;
            }

            private _fiservDebugModeEnabled: boolean;
            get fiservDebugModeEnabled(): boolean {
                return this._fiservDebugModeEnabled;
            }
            set fiservDebugModeEnabled(value: boolean) {
                this._fiservDebugModeEnabled = value;
            }

            private _fiservStatementDetailsApiEndpoint: string;
            get fiservStatementDetailsApiEndpoint(): string {
                return this._fiservStatementDetailsApiEndpoint;
            }
            set fiservStatementDetailsApiEndpoint(value: string) {
                this._fiservStatementDetailsApiEndpoint = value;
            }

            private _fiservCustomerInquiryApiEndpoint: string;
            get fiservCustomerInquiryApiEndpoint(): string {
                return this._fiservCustomerInquiryApiEndpoint;
            }
            set fiservCustomerInquiryApiEndpoint(value: string) {
                this._fiservCustomerInquiryApiEndpoint = value;
            }

            private _pscuShouldShowDateForPendingTransactions: boolean;
            get pscuShouldShowDateForPendingTransactions(): boolean {
                return this._pscuShouldShowDateForPendingTransactions;
            }
            set pscuShouldShowDateForPendingTransactions(value: boolean) {
                this._pscuShouldShowDateForPendingTransactions = value;
            }

            private _pscuSsoEnabled: boolean;
            get pscuSsoEnabled(): boolean {
                return this._pscuSsoEnabled;
            }
            set pscuSsoEnabled(value: boolean) {
                this._pscuSsoEnabled = value;
            }

            private _fiservCycle: FiservCardHistoryCycleTypes;
            get fiservCycle(): FiservCardHistoryCycleTypes {
                return this._fiservCycle;
            }
            set fiservCycle(value: FiservCardHistoryCycleTypes) {
                this._fiservCycle = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "CardHistory.ShowPendingTransactionsFirst", value: this._showPendingTransactionsFirst, dataType: 'boolean', label: "Show Pending Transactions First" },
                { key: "CardHistory.EnableCardHistoryDateRangeSearch", value: this._enableCardHistoryDateRangeSearch, dataType: 'boolean', label: "Enable Card History Date Range Search" },
                { key: "CardHistory.PSCUSSOConfigID", value: this._pSCUSSOConfigID, dataType: 'string', label: "P S C U S S O Config I D" },
                { key: "CardHistory.UsePscuSsoUrl", value: this._usePscuSsoUrl, dataType: 'boolean', label: "Use Pscu Sso Url" },
                { key: "CardHistory.ShouldSetPendingTransactionAmountAsNeutral", value: this._shouldSetPendingTransactionAmountAsNeutral, dataType: 'boolean', label: "Should Set Pending Transaction Amount As Neutral" },
                { key: "CardHistory.FiservApiBaseUrl", value: this._fiservApiBaseUrl, dataType: 'string', label: "Fiserv Api Base Url" },
                { key: "CardHistory.FiservTokenCreateApiEndpoint", value: this._fiservTokenCreateApiEndpoint, dataType: 'string', label: "Fiserv Token Create Api Endpoint" },
                { key: "CardHistory.FiservUserId", value: this._fiservUserId, dataType: 'string', label: "Fiserv User Id" },
                { key: "CardHistory.FiservPassword", value: this._fiservPassword, dataType: 'string', label: "Fiserv Password" },
                { key: "CardHistory.Fiservx500Id", value: this._fiservx500Id, dataType: 'string', label: "Fiservx500 Id" },
                { key: "CardHistory.FiservCertificateStore", value: this._fiservCertificateStore, dataType: 'system.security.cryptography.x509certificates.storename', label: "Fiserv Certificate Store" },
                { key: "CardHistory.FiservCertificateThumbPrint", value: this._fiservCertificateThumbPrint, dataType: 'string', label: "Fiserv Certificate Thumb Print" },
                { key: "CardHistory.FiservDebugModeEnabled", value: this._fiservDebugModeEnabled, dataType: 'boolean', label: "Fiserv Debug Mode Enabled" },
                { key: "CardHistory.FiservStatementDetailsApiEndpoint", value: this._fiservStatementDetailsApiEndpoint, dataType: 'string', label: "Fiserv Statement Details Api Endpoint" },
                { key: "CardHistory.FiservCustomerInquiryApiEndpoint", value: this._fiservCustomerInquiryApiEndpoint, dataType: 'string', label: "Fiserv Customer Inquiry Api Endpoint" },
                { key: "CardHistory.PscuShouldShowDateForPendingTransactions", value: this._pscuShouldShowDateForPendingTransactions, dataType: 'boolean', label: "Pscu Should Show Date For Pending Transactions" },
                { key: "CardHistory.PscuSsoEnabled", value: this._pscuSsoEnabled, dataType: 'boolean', label: "Pscu Sso Enabled" },
                { key: "CardHistory.FiservCycle", value: this._fiservCycle, dataType: 'fiservcardhistorycycletypes', label: "Fiserv Cycle" },
            ];
        }

}