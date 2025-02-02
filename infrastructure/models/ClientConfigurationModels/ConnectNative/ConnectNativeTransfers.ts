import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { Money } from '../Money';
import { AchAllowedType } from '../AchAllowedType';
import { DefaultTransferAmounts } from '../DefaultTransferAmounts';
import { TransferAmountType } from '../TransferAmountType';
export interface ConnectNativeTransfersConfig {
    EnableTransfersFromShares: boolean;
    EnableTransfersToShares: boolean;
    EnableTransfersShareToShare: boolean;
    EnableTransfersFromLoans: boolean;
    EnableTransfersToLoans: boolean;
    EnableTransfersLoanToShare: boolean;
    EnableTransfersShareToLoan: boolean;
    EnableTransfersLoanToLoan: boolean;
    EnableTransfersToLinkedAccounts: boolean;
    EnableTransfersFromLinkedAccounts: boolean;
    EnableTransfersShareToLinkedAccount: boolean;
    EnableTransfersLoanToLinkedAccount: boolean;
    EnableTransfersLinkedAccountToShare: boolean;
    EnableTransfersLinkedAccountToLoan: boolean;
    EnableTransfersToCrossAccounts: boolean;
    EnableTransfersFromCrossAccounts: boolean;
    EnableTransfersCrossAccountToShare: boolean;
    EnableTransfersCrossAccountToLoan: boolean;
    EnableTransfersShareToCrossAccount: boolean;
    EnableTransfersLoanToCrossAccount: boolean;
    EnableTransfersCrossAccountToCrossAccount: boolean;
    EnablePrincipalOnlyOption: boolean;
    EnableExtraToPrincipalOption: boolean;
    ShouldDisplayPayoffAmount: boolean;
    AllowExtraToPrincipalPaymentLoanCategories: string[];
    AllowPrincipalOnlyPaymentLoanCategories: string[];
    AllowedAchTransferToAccountCategories: string[];
    AllowedAchTransferFromAccountCategories: string[];
    AllowedTransferToAccountCategories: string[];
    AllowedTransferFromAccountCategories: string[];
    ShareRestrictedInquireFlags: string[];
    ShareRestrictedWithdrawFlags: string[];
    ShareRestrictedDepositFlags: string[];
    LoanRestrictedInquireFlags: string[];
    LoanRestrictedWithdrawFlags: string[];
    LoanRestrictedDepositFlags: string[];
    ShouldDisplayAccountNicknames: boolean;
    ShouldDisplayRemainingRegDCount: boolean;
    MaxFreeInboundAchTransfersPerMonth: number;
    MaxFreeOutboundAchTransfersPerMonth: number;
    IntraBankTransfersOnlyAllowed: boolean;
    LinkedAchInboundFee: Money;
    LinkedAchOutboundFee: Money;
    AchAllowedTypes: AchAllowedType;
    PrefilledTransferAmountsEnabled: boolean;
    PrefilledTransferAmountDefaults: DefaultTransferAmounts;
    PrefilledTransferAmountsSortOrder: TransferAmountType[];
    MaxNumberOfPrefilledTransferAmounts: number;
    CashAdvanceWarningLoanCategories: string[];
    CashAdvanceFromCreditCardsEnabled: boolean;
    MicrNumberFirstFourDigitsForBillPay: string;
    EnableTransfersToCreditCards: boolean;
}

export class ConnectNativeTransfers implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ConnectNativeTransfers'
    };


            private _enableTransfersFromShares: boolean;
            get enableTransfersFromShares(): boolean {
                return this._enableTransfersFromShares;
            }
            set enableTransfersFromShares(value: boolean) {
                this._enableTransfersFromShares = value;
            }

            private _enableTransfersToShares: boolean;
            get enableTransfersToShares(): boolean {
                return this._enableTransfersToShares;
            }
            set enableTransfersToShares(value: boolean) {
                this._enableTransfersToShares = value;
            }

            private _enableTransfersShareToShare: boolean;
            get enableTransfersShareToShare(): boolean {
                return this._enableTransfersShareToShare;
            }
            set enableTransfersShareToShare(value: boolean) {
                this._enableTransfersShareToShare = value;
            }

            private _enableTransfersFromLoans: boolean;
            get enableTransfersFromLoans(): boolean {
                return this._enableTransfersFromLoans;
            }
            set enableTransfersFromLoans(value: boolean) {
                this._enableTransfersFromLoans = value;
            }

            private _enableTransfersToLoans: boolean;
            get enableTransfersToLoans(): boolean {
                return this._enableTransfersToLoans;
            }
            set enableTransfersToLoans(value: boolean) {
                this._enableTransfersToLoans = value;
            }

            private _enableTransfersLoanToShare: boolean;
            get enableTransfersLoanToShare(): boolean {
                return this._enableTransfersLoanToShare;
            }
            set enableTransfersLoanToShare(value: boolean) {
                this._enableTransfersLoanToShare = value;
            }

            private _enableTransfersShareToLoan: boolean;
            get enableTransfersShareToLoan(): boolean {
                return this._enableTransfersShareToLoan;
            }
            set enableTransfersShareToLoan(value: boolean) {
                this._enableTransfersShareToLoan = value;
            }

            private _enableTransfersLoanToLoan: boolean;
            get enableTransfersLoanToLoan(): boolean {
                return this._enableTransfersLoanToLoan;
            }
            set enableTransfersLoanToLoan(value: boolean) {
                this._enableTransfersLoanToLoan = value;
            }

            private _enableTransfersToLinkedAccounts: boolean;
            get enableTransfersToLinkedAccounts(): boolean {
                return this._enableTransfersToLinkedAccounts;
            }
            set enableTransfersToLinkedAccounts(value: boolean) {
                this._enableTransfersToLinkedAccounts = value;
            }

            private _enableTransfersFromLinkedAccounts: boolean;
            get enableTransfersFromLinkedAccounts(): boolean {
                return this._enableTransfersFromLinkedAccounts;
            }
            set enableTransfersFromLinkedAccounts(value: boolean) {
                this._enableTransfersFromLinkedAccounts = value;
            }

            private _enableTransfersShareToLinkedAccount: boolean;
            get enableTransfersShareToLinkedAccount(): boolean {
                return this._enableTransfersShareToLinkedAccount;
            }
            set enableTransfersShareToLinkedAccount(value: boolean) {
                this._enableTransfersShareToLinkedAccount = value;
            }

            private _enableTransfersLoanToLinkedAccount: boolean;
            get enableTransfersLoanToLinkedAccount(): boolean {
                return this._enableTransfersLoanToLinkedAccount;
            }
            set enableTransfersLoanToLinkedAccount(value: boolean) {
                this._enableTransfersLoanToLinkedAccount = value;
            }

            private _enableTransfersLinkedAccountToShare: boolean;
            get enableTransfersLinkedAccountToShare(): boolean {
                return this._enableTransfersLinkedAccountToShare;
            }
            set enableTransfersLinkedAccountToShare(value: boolean) {
                this._enableTransfersLinkedAccountToShare = value;
            }

            private _enableTransfersLinkedAccountToLoan: boolean;
            get enableTransfersLinkedAccountToLoan(): boolean {
                return this._enableTransfersLinkedAccountToLoan;
            }
            set enableTransfersLinkedAccountToLoan(value: boolean) {
                this._enableTransfersLinkedAccountToLoan = value;
            }

            private _enableTransfersToCrossAccounts: boolean;
            get enableTransfersToCrossAccounts(): boolean {
                return this._enableTransfersToCrossAccounts;
            }
            set enableTransfersToCrossAccounts(value: boolean) {
                this._enableTransfersToCrossAccounts = value;
            }

            private _enableTransfersFromCrossAccounts: boolean;
            get enableTransfersFromCrossAccounts(): boolean {
                return this._enableTransfersFromCrossAccounts;
            }
            set enableTransfersFromCrossAccounts(value: boolean) {
                this._enableTransfersFromCrossAccounts = value;
            }

            private _enableTransfersCrossAccountToShare: boolean;
            get enableTransfersCrossAccountToShare(): boolean {
                return this._enableTransfersCrossAccountToShare;
            }
            set enableTransfersCrossAccountToShare(value: boolean) {
                this._enableTransfersCrossAccountToShare = value;
            }

            private _enableTransfersCrossAccountToLoan: boolean;
            get enableTransfersCrossAccountToLoan(): boolean {
                return this._enableTransfersCrossAccountToLoan;
            }
            set enableTransfersCrossAccountToLoan(value: boolean) {
                this._enableTransfersCrossAccountToLoan = value;
            }

            private _enableTransfersShareToCrossAccount: boolean;
            get enableTransfersShareToCrossAccount(): boolean {
                return this._enableTransfersShareToCrossAccount;
            }
            set enableTransfersShareToCrossAccount(value: boolean) {
                this._enableTransfersShareToCrossAccount = value;
            }

            private _enableTransfersLoanToCrossAccount: boolean;
            get enableTransfersLoanToCrossAccount(): boolean {
                return this._enableTransfersLoanToCrossAccount;
            }
            set enableTransfersLoanToCrossAccount(value: boolean) {
                this._enableTransfersLoanToCrossAccount = value;
            }

            private _enableTransfersCrossAccountToCrossAccount: boolean;
            get enableTransfersCrossAccountToCrossAccount(): boolean {
                return this._enableTransfersCrossAccountToCrossAccount;
            }
            set enableTransfersCrossAccountToCrossAccount(value: boolean) {
                this._enableTransfersCrossAccountToCrossAccount = value;
            }

            private _enablePrincipalOnlyOption: boolean;
            get enablePrincipalOnlyOption(): boolean {
                return this._enablePrincipalOnlyOption;
            }
            set enablePrincipalOnlyOption(value: boolean) {
                this._enablePrincipalOnlyOption = value;
            }

            private _enableExtraToPrincipalOption: boolean;
            get enableExtraToPrincipalOption(): boolean {
                return this._enableExtraToPrincipalOption;
            }
            set enableExtraToPrincipalOption(value: boolean) {
                this._enableExtraToPrincipalOption = value;
            }

            private _shouldDisplayPayoffAmount: boolean;
            get shouldDisplayPayoffAmount(): boolean {
                return this._shouldDisplayPayoffAmount;
            }
            set shouldDisplayPayoffAmount(value: boolean) {
                this._shouldDisplayPayoffAmount = value;
            }

            private _allowExtraToPrincipalPaymentLoanCategories: string[];
            get allowExtraToPrincipalPaymentLoanCategories(): string[] {
                return this._allowExtraToPrincipalPaymentLoanCategories;
            }
            set allowExtraToPrincipalPaymentLoanCategories(value: string[]) {
                this._allowExtraToPrincipalPaymentLoanCategories = value;
            }

            private _allowPrincipalOnlyPaymentLoanCategories: string[];
            get allowPrincipalOnlyPaymentLoanCategories(): string[] {
                return this._allowPrincipalOnlyPaymentLoanCategories;
            }
            set allowPrincipalOnlyPaymentLoanCategories(value: string[]) {
                this._allowPrincipalOnlyPaymentLoanCategories = value;
            }

            private _allowedAchTransferToAccountCategories: string[];
            get allowedAchTransferToAccountCategories(): string[] {
                return this._allowedAchTransferToAccountCategories;
            }
            set allowedAchTransferToAccountCategories(value: string[]) {
                this._allowedAchTransferToAccountCategories = value;
            }

            private _allowedAchTransferFromAccountCategories: string[];
            get allowedAchTransferFromAccountCategories(): string[] {
                return this._allowedAchTransferFromAccountCategories;
            }
            set allowedAchTransferFromAccountCategories(value: string[]) {
                this._allowedAchTransferFromAccountCategories = value;
            }

            private _allowedTransferToAccountCategories: string[];
            get allowedTransferToAccountCategories(): string[] {
                return this._allowedTransferToAccountCategories;
            }
            set allowedTransferToAccountCategories(value: string[]) {
                this._allowedTransferToAccountCategories = value;
            }

            private _allowedTransferFromAccountCategories: string[];
            get allowedTransferFromAccountCategories(): string[] {
                return this._allowedTransferFromAccountCategories;
            }
            set allowedTransferFromAccountCategories(value: string[]) {
                this._allowedTransferFromAccountCategories = value;
            }

            private _shareRestrictedInquireFlags: string[];
            get shareRestrictedInquireFlags(): string[] {
                return this._shareRestrictedInquireFlags;
            }
            set shareRestrictedInquireFlags(value: string[]) {
                this._shareRestrictedInquireFlags = value;
            }

            private _shareRestrictedWithdrawFlags: string[];
            get shareRestrictedWithdrawFlags(): string[] {
                return this._shareRestrictedWithdrawFlags;
            }
            set shareRestrictedWithdrawFlags(value: string[]) {
                this._shareRestrictedWithdrawFlags = value;
            }

            private _shareRestrictedDepositFlags: string[];
            get shareRestrictedDepositFlags(): string[] {
                return this._shareRestrictedDepositFlags;
            }
            set shareRestrictedDepositFlags(value: string[]) {
                this._shareRestrictedDepositFlags = value;
            }

            private _loanRestrictedInquireFlags: string[];
            get loanRestrictedInquireFlags(): string[] {
                return this._loanRestrictedInquireFlags;
            }
            set loanRestrictedInquireFlags(value: string[]) {
                this._loanRestrictedInquireFlags = value;
            }

            private _loanRestrictedWithdrawFlags: string[];
            get loanRestrictedWithdrawFlags(): string[] {
                return this._loanRestrictedWithdrawFlags;
            }
            set loanRestrictedWithdrawFlags(value: string[]) {
                this._loanRestrictedWithdrawFlags = value;
            }

            private _loanRestrictedDepositFlags: string[];
            get loanRestrictedDepositFlags(): string[] {
                return this._loanRestrictedDepositFlags;
            }
            set loanRestrictedDepositFlags(value: string[]) {
                this._loanRestrictedDepositFlags = value;
            }

            private _shouldDisplayAccountNicknames: boolean;
            get shouldDisplayAccountNicknames(): boolean {
                return this._shouldDisplayAccountNicknames;
            }
            set shouldDisplayAccountNicknames(value: boolean) {
                this._shouldDisplayAccountNicknames = value;
            }

            private _shouldDisplayRemainingRegDCount: boolean;
            get shouldDisplayRemainingRegDCount(): boolean {
                return this._shouldDisplayRemainingRegDCount;
            }
            set shouldDisplayRemainingRegDCount(value: boolean) {
                this._shouldDisplayRemainingRegDCount = value;
            }

            private _maxFreeInboundAchTransfersPerMonth: number;
            get maxFreeInboundAchTransfersPerMonth(): number {
                return this._maxFreeInboundAchTransfersPerMonth;
            }
            set maxFreeInboundAchTransfersPerMonth(value: number) {
                this._maxFreeInboundAchTransfersPerMonth = value;
            }

            private _maxFreeOutboundAchTransfersPerMonth: number;
            get maxFreeOutboundAchTransfersPerMonth(): number {
                return this._maxFreeOutboundAchTransfersPerMonth;
            }
            set maxFreeOutboundAchTransfersPerMonth(value: number) {
                this._maxFreeOutboundAchTransfersPerMonth = value;
            }

            private _intraBankTransfersOnlyAllowed: boolean;
            get intraBankTransfersOnlyAllowed(): boolean {
                return this._intraBankTransfersOnlyAllowed;
            }
            set intraBankTransfersOnlyAllowed(value: boolean) {
                this._intraBankTransfersOnlyAllowed = value;
            }

            private _linkedAchInboundFee: Money;
            get linkedAchInboundFee(): Money {
                return this._linkedAchInboundFee;
            }
            set linkedAchInboundFee(value: Money) {
                this._linkedAchInboundFee = value;
            }

            private _linkedAchOutboundFee: Money;
            get linkedAchOutboundFee(): Money {
                return this._linkedAchOutboundFee;
            }
            set linkedAchOutboundFee(value: Money) {
                this._linkedAchOutboundFee = value;
            }

            private _achAllowedTypes: AchAllowedType;
            get achAllowedTypes(): AchAllowedType {
                return this._achAllowedTypes;
            }
            set achAllowedTypes(value: AchAllowedType) {
                this._achAllowedTypes = value;
            }

            private _prefilledTransferAmountsEnabled: boolean;
            get prefilledTransferAmountsEnabled(): boolean {
                return this._prefilledTransferAmountsEnabled;
            }
            set prefilledTransferAmountsEnabled(value: boolean) {
                this._prefilledTransferAmountsEnabled = value;
            }

            private _prefilledTransferAmountDefaults: DefaultTransferAmounts;
            get prefilledTransferAmountDefaults(): DefaultTransferAmounts {
                return this._prefilledTransferAmountDefaults;
            }
            set prefilledTransferAmountDefaults(value: DefaultTransferAmounts) {
                this._prefilledTransferAmountDefaults = value;
            }

            private _prefilledTransferAmountsSortOrder: TransferAmountType[];
            get prefilledTransferAmountsSortOrder(): TransferAmountType[] {
                return this._prefilledTransferAmountsSortOrder;
            }
            set prefilledTransferAmountsSortOrder(value: TransferAmountType[]) {
                this._prefilledTransferAmountsSortOrder = value;
            }

            private _maxNumberOfPrefilledTransferAmounts: number;
            get maxNumberOfPrefilledTransferAmounts(): number {
                return this._maxNumberOfPrefilledTransferAmounts;
            }
            set maxNumberOfPrefilledTransferAmounts(value: number) {
                this._maxNumberOfPrefilledTransferAmounts = value;
            }

            private _cashAdvanceWarningLoanCategories: string[];
            get cashAdvanceWarningLoanCategories(): string[] {
                return this._cashAdvanceWarningLoanCategories;
            }
            set cashAdvanceWarningLoanCategories(value: string[]) {
                this._cashAdvanceWarningLoanCategories = value;
            }

            private _cashAdvanceFromCreditCardsEnabled: boolean;
            get cashAdvanceFromCreditCardsEnabled(): boolean {
                return this._cashAdvanceFromCreditCardsEnabled;
            }
            set cashAdvanceFromCreditCardsEnabled(value: boolean) {
                this._cashAdvanceFromCreditCardsEnabled = value;
            }

            private _micrNumberFirstFourDigitsForBillPay: string;
            get micrNumberFirstFourDigitsForBillPay(): string {
                return this._micrNumberFirstFourDigitsForBillPay;
            }
            set micrNumberFirstFourDigitsForBillPay(value: string) {
                this._micrNumberFirstFourDigitsForBillPay = value;
            }

            private _enableTransfersToCreditCards: boolean;
            get enableTransfersToCreditCards(): boolean {
                return this._enableTransfersToCreditCards;
            }
            set enableTransfersToCreditCards(value: boolean) {
                this._enableTransfersToCreditCards = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ConnectNativeTransfers.EnableTransfersFromShares", value: this._enableTransfersFromShares, dataType: 'boolean', label: "Enable Transfers From Shares" },
                { key: "ConnectNativeTransfers.EnableTransfersToShares", value: this._enableTransfersToShares, dataType: 'boolean', label: "Enable Transfers To Shares" },
                { key: "ConnectNativeTransfers.EnableTransfersShareToShare", value: this._enableTransfersShareToShare, dataType: 'boolean', label: "Enable Transfers Share To Share" },
                { key: "ConnectNativeTransfers.EnableTransfersFromLoans", value: this._enableTransfersFromLoans, dataType: 'boolean', label: "Enable Transfers From Loans" },
                { key: "ConnectNativeTransfers.EnableTransfersToLoans", value: this._enableTransfersToLoans, dataType: 'boolean', label: "Enable Transfers To Loans" },
                { key: "ConnectNativeTransfers.EnableTransfersLoanToShare", value: this._enableTransfersLoanToShare, dataType: 'boolean', label: "Enable Transfers Loan To Share" },
                { key: "ConnectNativeTransfers.EnableTransfersShareToLoan", value: this._enableTransfersShareToLoan, dataType: 'boolean', label: "Enable Transfers Share To Loan" },
                { key: "ConnectNativeTransfers.EnableTransfersLoanToLoan", value: this._enableTransfersLoanToLoan, dataType: 'boolean', label: "Enable Transfers Loan To Loan" },
                { key: "ConnectNativeTransfers.EnableTransfersToLinkedAccounts", value: this._enableTransfersToLinkedAccounts, dataType: 'boolean', label: "Enable Transfers To Linked Accounts" },
                { key: "ConnectNativeTransfers.EnableTransfersFromLinkedAccounts", value: this._enableTransfersFromLinkedAccounts, dataType: 'boolean', label: "Enable Transfers From Linked Accounts" },
                { key: "ConnectNativeTransfers.EnableTransfersShareToLinkedAccount", value: this._enableTransfersShareToLinkedAccount, dataType: 'boolean', label: "Enable Transfers Share To Linked Account" },
                { key: "ConnectNativeTransfers.EnableTransfersLoanToLinkedAccount", value: this._enableTransfersLoanToLinkedAccount, dataType: 'boolean', label: "Enable Transfers Loan To Linked Account" },
                { key: "ConnectNativeTransfers.EnableTransfersLinkedAccountToShare", value: this._enableTransfersLinkedAccountToShare, dataType: 'boolean', label: "Enable Transfers Linked Account To Share" },
                { key: "ConnectNativeTransfers.EnableTransfersLinkedAccountToLoan", value: this._enableTransfersLinkedAccountToLoan, dataType: 'boolean', label: "Enable Transfers Linked Account To Loan" },
                { key: "ConnectNativeTransfers.EnableTransfersToCrossAccounts", value: this._enableTransfersToCrossAccounts, dataType: 'boolean', label: "Enable Transfers To Cross Accounts" },
                { key: "ConnectNativeTransfers.EnableTransfersFromCrossAccounts", value: this._enableTransfersFromCrossAccounts, dataType: 'boolean', label: "Enable Transfers From Cross Accounts" },
                { key: "ConnectNativeTransfers.EnableTransfersCrossAccountToShare", value: this._enableTransfersCrossAccountToShare, dataType: 'boolean', label: "Enable Transfers Cross Account To Share" },
                { key: "ConnectNativeTransfers.EnableTransfersCrossAccountToLoan", value: this._enableTransfersCrossAccountToLoan, dataType: 'boolean', label: "Enable Transfers Cross Account To Loan" },
                { key: "ConnectNativeTransfers.EnableTransfersShareToCrossAccount", value: this._enableTransfersShareToCrossAccount, dataType: 'boolean', label: "Enable Transfers Share To Cross Account" },
                { key: "ConnectNativeTransfers.EnableTransfersLoanToCrossAccount", value: this._enableTransfersLoanToCrossAccount, dataType: 'boolean', label: "Enable Transfers Loan To Cross Account" },
                { key: "ConnectNativeTransfers.EnableTransfersCrossAccountToCrossAccount", value: this._enableTransfersCrossAccountToCrossAccount, dataType: 'boolean', label: "Enable Transfers Cross Account To Cross Account" },
                { key: "ConnectNativeTransfers.EnablePrincipalOnlyOption", value: this._enablePrincipalOnlyOption, dataType: 'boolean', label: "Enable Principal Only Option" },
                { key: "ConnectNativeTransfers.EnableExtraToPrincipalOption", value: this._enableExtraToPrincipalOption, dataType: 'boolean', label: "Enable Extra To Principal Option" },
                { key: "ConnectNativeTransfers.ShouldDisplayPayoffAmount", value: this._shouldDisplayPayoffAmount, dataType: 'boolean', label: "Should Display Payoff Amount" },
                { key: "ConnectNativeTransfers.AllowExtraToPrincipalPaymentLoanCategories", value: this._allowExtraToPrincipalPaymentLoanCategories, dataType: 'list<string>', label: "Allow Extra To Principal Payment Loan Categories" },
                { key: "ConnectNativeTransfers.AllowPrincipalOnlyPaymentLoanCategories", value: this._allowPrincipalOnlyPaymentLoanCategories, dataType: 'list<string>', label: "Allow Principal Only Payment Loan Categories" },
                { key: "ConnectNativeTransfers.AllowedAchTransferToAccountCategories", value: this._allowedAchTransferToAccountCategories, dataType: 'list<string>', label: "Allowed Ach Transfer To Account Categories" },
                { key: "ConnectNativeTransfers.AllowedAchTransferFromAccountCategories", value: this._allowedAchTransferFromAccountCategories, dataType: 'list<string>', label: "Allowed Ach Transfer From Account Categories" },
                { key: "ConnectNativeTransfers.AllowedTransferToAccountCategories", value: this._allowedTransferToAccountCategories, dataType: 'list<string>', label: "Allowed Transfer To Account Categories" },
                { key: "ConnectNativeTransfers.AllowedTransferFromAccountCategories", value: this._allowedTransferFromAccountCategories, dataType: 'list<string>', label: "Allowed Transfer From Account Categories" },
                { key: "ConnectNativeTransfers.ShareRestrictedInquireFlags", value: this._shareRestrictedInquireFlags, dataType: 'list<string>', label: "Share Restricted Inquire Flags" },
                { key: "ConnectNativeTransfers.ShareRestrictedWithdrawFlags", value: this._shareRestrictedWithdrawFlags, dataType: 'list<string>', label: "Share Restricted Withdraw Flags" },
                { key: "ConnectNativeTransfers.ShareRestrictedDepositFlags", value: this._shareRestrictedDepositFlags, dataType: 'list<string>', label: "Share Restricted Deposit Flags" },
                { key: "ConnectNativeTransfers.LoanRestrictedInquireFlags", value: this._loanRestrictedInquireFlags, dataType: 'list<string>', label: "Loan Restricted Inquire Flags" },
                { key: "ConnectNativeTransfers.LoanRestrictedWithdrawFlags", value: this._loanRestrictedWithdrawFlags, dataType: 'list<string>', label: "Loan Restricted Withdraw Flags" },
                { key: "ConnectNativeTransfers.LoanRestrictedDepositFlags", value: this._loanRestrictedDepositFlags, dataType: 'list<string>', label: "Loan Restricted Deposit Flags" },
                { key: "ConnectNativeTransfers.ShouldDisplayAccountNicknames", value: this._shouldDisplayAccountNicknames, dataType: 'boolean', label: "Should Display Account Nicknames" },
                { key: "ConnectNativeTransfers.ShouldDisplayRemainingRegDCount", value: this._shouldDisplayRemainingRegDCount, dataType: 'boolean', label: "Should Display Remaining Reg D Count" },
                { key: "ConnectNativeTransfers.MaxFreeInboundAchTransfersPerMonth", value: this._maxFreeInboundAchTransfersPerMonth, dataType: 'number', label: "Max Free Inbound Ach Transfers Per Month" },
                { key: "ConnectNativeTransfers.MaxFreeOutboundAchTransfersPerMonth", value: this._maxFreeOutboundAchTransfersPerMonth, dataType: 'number', label: "Max Free Outbound Ach Transfers Per Month" },
                { key: "ConnectNativeTransfers.IntraBankTransfersOnlyAllowed", value: this._intraBankTransfersOnlyAllowed, dataType: 'boolean', label: "Intra Bank Transfers Only Allowed" },
                { key: "ConnectNativeTransfers.LinkedAchInboundFee", value: this._linkedAchInboundFee, dataType: 'money', label: "Linked Ach Inbound Fee" },
                { key: "ConnectNativeTransfers.LinkedAchOutboundFee", value: this._linkedAchOutboundFee, dataType: 'money', label: "Linked Ach Outbound Fee" },
                { key: "ConnectNativeTransfers.AchAllowedTypes", value: this._achAllowedTypes, dataType: 'achallowedtype', label: "Ach Allowed Types" },
                { key: "ConnectNativeTransfers.PrefilledTransferAmountsEnabled", value: this._prefilledTransferAmountsEnabled, dataType: 'boolean', label: "Prefilled Transfer Amounts Enabled" },
                { key: "ConnectNativeTransfers.PrefilledTransferAmountDefaults", value: this._prefilledTransferAmountDefaults, dataType: 'defaulttransferamounts', label: "Prefilled Transfer Amount Defaults" },
                { key: "ConnectNativeTransfers.PrefilledTransferAmountsSortOrder", value: this._prefilledTransferAmountsSortOrder, dataType: 'array<TransferAmountType>', label: "Prefilled Transfer Amounts Sort Order" },
                { key: "ConnectNativeTransfers.MaxNumberOfPrefilledTransferAmounts", value: this._maxNumberOfPrefilledTransferAmounts, dataType: 'number', label: "Max Number Of Prefilled Transfer Amounts" },
                { key: "ConnectNativeTransfers.CashAdvanceWarningLoanCategories", value: this._cashAdvanceWarningLoanCategories, dataType: 'list<string>', label: "Cash Advance Warning Loan Categories" },
                { key: "ConnectNativeTransfers.CashAdvanceFromCreditCardsEnabled", value: this._cashAdvanceFromCreditCardsEnabled, dataType: 'boolean', label: "Cash Advance From Credit Cards Enabled" },
                { key: "ConnectNativeTransfers.MicrNumberFirstFourDigitsForBillPay", value: this._micrNumberFirstFourDigitsForBillPay, dataType: 'string', label: "Micr Number First Four Digits For Bill Pay" },
                { key: "ConnectNativeTransfers.EnableTransfersToCreditCards", value: this._enableTransfersToCreditCards, dataType: 'boolean', label: "Enable Transfers To Credit Cards" },
            ];
        }

}