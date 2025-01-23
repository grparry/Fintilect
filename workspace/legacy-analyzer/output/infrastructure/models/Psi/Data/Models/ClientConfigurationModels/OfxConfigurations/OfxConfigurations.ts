import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
export interface OfxConfigurationsConfig {
    OfxDirectIsAscending: boolean;
    TransactionMessageEZIV: string;
    TransactionPostingCreditMessage: string;
    TransactionPostingDebitMessage: string;
    LogLoginIsEnabled: boolean;
    OfxTranTypeShouldUseExtraFields: boolean;
    HideZeroValueTransactions: boolean;
    GenerateNamesIfNeeded: boolean;
    PositiveTransactionName: string;
    NegativeTransactionName: string;
    ShouldIncludeCrossAccounts: boolean;
    ShouldDeleteClosingTags: boolean;
    AllowedShareRestrictedFlags: string[];
    AllowedLoanRestrictedFlags: string[];
    AppIdsWithRestrictedFlagsExceptions: string[];
    UseSymmetryMethodOfCreatingFitid: boolean;
}

export class OfxConfigurations implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'OfxConfigurations'
    };


            private _ofxDirectIsAscending: boolean;
            get ofxDirectIsAscending(): boolean {
                return this._ofxDirectIsAscending;
            }
            set ofxDirectIsAscending(value: boolean) {
                this._ofxDirectIsAscending = value;
            }

            private _transactionMessageEZIV: string;
            get transactionMessageEZIV(): string {
                return this._transactionMessageEZIV;
            }
            set transactionMessageEZIV(value: string) {
                this._transactionMessageEZIV = value;
            }

            private _transactionPostingCreditMessage: string;
            get transactionPostingCreditMessage(): string {
                return this._transactionPostingCreditMessage;
            }
            set transactionPostingCreditMessage(value: string) {
                this._transactionPostingCreditMessage = value;
            }

            private _transactionPostingDebitMessage: string;
            get transactionPostingDebitMessage(): string {
                return this._transactionPostingDebitMessage;
            }
            set transactionPostingDebitMessage(value: string) {
                this._transactionPostingDebitMessage = value;
            }

            private _logLoginIsEnabled: boolean;
            get logLoginIsEnabled(): boolean {
                return this._logLoginIsEnabled;
            }
            set logLoginIsEnabled(value: boolean) {
                this._logLoginIsEnabled = value;
            }

            private _ofxTranTypeShouldUseExtraFields: boolean;
            get ofxTranTypeShouldUseExtraFields(): boolean {
                return this._ofxTranTypeShouldUseExtraFields;
            }
            set ofxTranTypeShouldUseExtraFields(value: boolean) {
                this._ofxTranTypeShouldUseExtraFields = value;
            }

            private _hideZeroValueTransactions: boolean;
            get hideZeroValueTransactions(): boolean {
                return this._hideZeroValueTransactions;
            }
            set hideZeroValueTransactions(value: boolean) {
                this._hideZeroValueTransactions = value;
            }

            private _generateNamesIfNeeded: boolean;
            get generateNamesIfNeeded(): boolean {
                return this._generateNamesIfNeeded;
            }
            set generateNamesIfNeeded(value: boolean) {
                this._generateNamesIfNeeded = value;
            }

            private _positiveTransactionName: string;
            get positiveTransactionName(): string {
                return this._positiveTransactionName;
            }
            set positiveTransactionName(value: string) {
                this._positiveTransactionName = value;
            }

            private _negativeTransactionName: string;
            get negativeTransactionName(): string {
                return this._negativeTransactionName;
            }
            set negativeTransactionName(value: string) {
                this._negativeTransactionName = value;
            }

            private _shouldIncludeCrossAccounts: boolean;
            get shouldIncludeCrossAccounts(): boolean {
                return this._shouldIncludeCrossAccounts;
            }
            set shouldIncludeCrossAccounts(value: boolean) {
                this._shouldIncludeCrossAccounts = value;
            }

            private _shouldDeleteClosingTags: boolean;
            get shouldDeleteClosingTags(): boolean {
                return this._shouldDeleteClosingTags;
            }
            set shouldDeleteClosingTags(value: boolean) {
                this._shouldDeleteClosingTags = value;
            }

            private _allowedShareRestrictedFlags: string[];
            get allowedShareRestrictedFlags(): string[] {
                return this._allowedShareRestrictedFlags;
            }
            set allowedShareRestrictedFlags(value: string[]) {
                this._allowedShareRestrictedFlags = value;
            }

            private _allowedLoanRestrictedFlags: string[];
            get allowedLoanRestrictedFlags(): string[] {
                return this._allowedLoanRestrictedFlags;
            }
            set allowedLoanRestrictedFlags(value: string[]) {
                this._allowedLoanRestrictedFlags = value;
            }

            private _appIdsWithRestrictedFlagsExceptions: string[];
            get appIdsWithRestrictedFlagsExceptions(): string[] {
                return this._appIdsWithRestrictedFlagsExceptions;
            }
            set appIdsWithRestrictedFlagsExceptions(value: string[]) {
                this._appIdsWithRestrictedFlagsExceptions = value;
            }

            private _useSymmetryMethodOfCreatingFitid: boolean;
            get useSymmetryMethodOfCreatingFitid(): boolean {
                return this._useSymmetryMethodOfCreatingFitid;
            }
            set useSymmetryMethodOfCreatingFitid(value: boolean) {
                this._useSymmetryMethodOfCreatingFitid = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "OfxConfigurations.OfxDirectIsAscending", value: this._ofxDirectIsAscending, dataType: 'boolean', label: "Ofx Direct Is Ascending" },
                { key: "OfxConfigurations.TransactionMessageEZIV", value: this._transactionMessageEZIV, dataType: 'string', label: "Transaction Message E Z I V" },
                { key: "OfxConfigurations.TransactionPostingCreditMessage", value: this._transactionPostingCreditMessage, dataType: 'string', label: "Transaction Posting Credit Message" },
                { key: "OfxConfigurations.TransactionPostingDebitMessage", value: this._transactionPostingDebitMessage, dataType: 'string', label: "Transaction Posting Debit Message" },
                { key: "OfxConfigurations.LogLoginIsEnabled", value: this._logLoginIsEnabled, dataType: 'boolean', label: "Log Login Is Enabled" },
                { key: "OfxConfigurations.OfxTranTypeShouldUseExtraFields", value: this._ofxTranTypeShouldUseExtraFields, dataType: 'boolean', label: "Ofx Tran Type Should Use Extra Fields" },
                { key: "OfxConfigurations.HideZeroValueTransactions", value: this._hideZeroValueTransactions, dataType: 'boolean', label: "Hide Zero Value Transactions" },
                { key: "OfxConfigurations.GenerateNamesIfNeeded", value: this._generateNamesIfNeeded, dataType: 'boolean', label: "Generate Names If Needed" },
                { key: "OfxConfigurations.PositiveTransactionName", value: this._positiveTransactionName, dataType: 'string', label: "Positive Transaction Name" },
                { key: "OfxConfigurations.NegativeTransactionName", value: this._negativeTransactionName, dataType: 'string', label: "Negative Transaction Name" },
                { key: "OfxConfigurations.ShouldIncludeCrossAccounts", value: this._shouldIncludeCrossAccounts, dataType: 'boolean', label: "Should Include Cross Accounts" },
                { key: "OfxConfigurations.ShouldDeleteClosingTags", value: this._shouldDeleteClosingTags, dataType: 'boolean', label: "Should Delete Closing Tags" },
                { key: "OfxConfigurations.AllowedShareRestrictedFlags", value: this._allowedShareRestrictedFlags, dataType: 'list<string>', label: "Allowed Share Restricted Flags" },
                { key: "OfxConfigurations.AllowedLoanRestrictedFlags", value: this._allowedLoanRestrictedFlags, dataType: 'list<string>', label: "Allowed Loan Restricted Flags" },
                { key: "OfxConfigurations.AppIdsWithRestrictedFlagsExceptions", value: this._appIdsWithRestrictedFlagsExceptions, dataType: 'list<string>', label: "App Ids With Restricted Flags Exceptions" },
                { key: "OfxConfigurations.UseSymmetryMethodOfCreatingFitid", value: this._useSymmetryMethodOfCreatingFitid, dataType: 'boolean', label: "Use Symmetry Method Of Creating Fitid" },
            ];
        }

}