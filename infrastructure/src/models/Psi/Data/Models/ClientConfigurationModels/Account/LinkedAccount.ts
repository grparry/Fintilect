import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { char } from './char';
export interface LinkedAccountConfig {
    ShouldShowAddNewAccountOnHistoryPage: boolean;
    ShouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled: boolean;
    LinkedAccountEncryptionKey: string;
    SearchByUuidEnabled: boolean;
    Enabled: boolean;
    MinVersion: number;
    DeleteAccountEnabled: boolean;
    IntraBankEnabled: boolean;
    CrossBankEnabled: boolean;
    ShowDeletedAccountsEnabled: boolean;
    ShowCfsAccounts: boolean;
    ShowAchAccounts: boolean;
    AccountMaskingCharacter: char;
    AchGlAccount: string;
}

export class LinkedAccount implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'LinkedAccount'
    };


            private _shouldShowAddNewAccountOnHistoryPage: boolean;
            get shouldShowAddNewAccountOnHistoryPage(): boolean {
                return this._shouldShowAddNewAccountOnHistoryPage;
            }
            set shouldShowAddNewAccountOnHistoryPage(value: boolean) {
                this._shouldShowAddNewAccountOnHistoryPage = value;
            }

            private _shouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled: boolean;
            get shouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled(): boolean {
                return this._shouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled;
            }
            set shouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled(value: boolean) {
                this._shouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled = value;
            }

            private _linkedAccountEncryptionKey: string;
            get linkedAccountEncryptionKey(): string {
                return this._linkedAccountEncryptionKey;
            }
            set linkedAccountEncryptionKey(value: string) {
                this._linkedAccountEncryptionKey = value;
            }

            private _searchByUuidEnabled: boolean;
            get searchByUuidEnabled(): boolean {
                return this._searchByUuidEnabled;
            }
            set searchByUuidEnabled(value: boolean) {
                this._searchByUuidEnabled = value;
            }

            private _enabled: boolean;
            get enabled(): boolean {
                return this._enabled;
            }
            set enabled(value: boolean) {
                this._enabled = value;
            }

            private _minVersion: number;
            get minVersion(): number {
                return this._minVersion;
            }
            set minVersion(value: number) {
                this._minVersion = value;
            }

            private _deleteAccountEnabled: boolean;
            get deleteAccountEnabled(): boolean {
                return this._deleteAccountEnabled;
            }
            set deleteAccountEnabled(value: boolean) {
                this._deleteAccountEnabled = value;
            }

            private _intraBankEnabled: boolean;
            get intraBankEnabled(): boolean {
                return this._intraBankEnabled;
            }
            set intraBankEnabled(value: boolean) {
                this._intraBankEnabled = value;
            }

            private _crossBankEnabled: boolean;
            get crossBankEnabled(): boolean {
                return this._crossBankEnabled;
            }
            set crossBankEnabled(value: boolean) {
                this._crossBankEnabled = value;
            }

            private _showDeletedAccountsEnabled: boolean;
            get showDeletedAccountsEnabled(): boolean {
                return this._showDeletedAccountsEnabled;
            }
            set showDeletedAccountsEnabled(value: boolean) {
                this._showDeletedAccountsEnabled = value;
            }

            private _showCfsAccounts: boolean;
            get showCfsAccounts(): boolean {
                return this._showCfsAccounts;
            }
            set showCfsAccounts(value: boolean) {
                this._showCfsAccounts = value;
            }

            private _showAchAccounts: boolean;
            get showAchAccounts(): boolean {
                return this._showAchAccounts;
            }
            set showAchAccounts(value: boolean) {
                this._showAchAccounts = value;
            }

            private _accountMaskingCharacter: char;
            get accountMaskingCharacter(): char {
                return this._accountMaskingCharacter;
            }
            set accountMaskingCharacter(value: char) {
                this._accountMaskingCharacter = value;
            }

            private _achGlAccount: string;
            get achGlAccount(): string {
                return this._achGlAccount;
            }
            set achGlAccount(value: string) {
                this._achGlAccount = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "LinkedAccount.ShouldShowAddNewAccountOnHistoryPage", value: this._shouldShowAddNewAccountOnHistoryPage, dataType: 'boolean', label: "Should Show Add New Account On History Page" },
                { key: "LinkedAccount.ShouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled", value: this._shouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled, dataType: 'boolean', label: "Should Disable Linked Account When Notice Of Change Received Enabled" },
                { key: "LinkedAccount.LinkedAccountEncryptionKey", value: this._linkedAccountEncryptionKey, dataType: 'string', label: "Linked Account Encryption Key" },
                { key: "LinkedAccount.SearchByUuidEnabled", value: this._searchByUuidEnabled, dataType: 'boolean', label: "Search By Uuid Enabled" },
                { key: "LinkedAccount.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "LinkedAccount.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "LinkedAccount.DeleteAccountEnabled", value: this._deleteAccountEnabled, dataType: 'boolean', label: "Delete Account Enabled" },
                { key: "LinkedAccount.IntraBankEnabled", value: this._intraBankEnabled, dataType: 'boolean', label: "Intra Bank Enabled" },
                { key: "LinkedAccount.CrossBankEnabled", value: this._crossBankEnabled, dataType: 'boolean', label: "Cross Bank Enabled" },
                { key: "LinkedAccount.ShowDeletedAccountsEnabled", value: this._showDeletedAccountsEnabled, dataType: 'boolean', label: "Show Deleted Accounts Enabled" },
                { key: "LinkedAccount.ShowCfsAccounts", value: this._showCfsAccounts, dataType: 'boolean', label: "Show Cfs Accounts" },
                { key: "LinkedAccount.ShowAchAccounts", value: this._showAchAccounts, dataType: 'boolean', label: "Show Ach Accounts" },
                { key: "LinkedAccount.AccountMaskingCharacter", value: this._accountMaskingCharacter, dataType: 'char', label: "Account Masking Character" },
                { key: "LinkedAccount.AchGlAccount", value: this._achGlAccount, dataType: 'string', label: "Ach Gl Account" },
            ];
        }

}