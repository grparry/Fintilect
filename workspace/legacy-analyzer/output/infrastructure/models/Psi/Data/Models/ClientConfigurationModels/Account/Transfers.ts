import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { AchTransfer } from '@infrastructure/AchTransfer';
import { WireTransfer } from '@infrastructure/WireTransfer';
import { TransferLimits } from '@infrastructure/TransferLimits';
import { AnyMemberTransfers } from '@infrastructure/AnyMemberTransfers';
import { TransferTimeouts } from '@infrastructure/TransferTimeouts';
export interface TransfersConfig {
    ACH: AchTransfer;
    Wire: WireTransfer;
    TransferLimits: TransferLimits;
    CustomTransferLimitMessagesEnabled: boolean;
    DisplayTransferLimitOnError: boolean;
    ShowShareLoanIds: boolean;
    LimtInExcessTransferToCards: boolean;
    ScheduledTransferIsOpenEndDateDisabledForDaily: boolean;
    AllowLoanToLoanTransfers: boolean;
    MortgageLoanCategories: string[];
    HideEndDateOption: boolean;
    AllowPaymentsGreaterThanPayoffAmount: boolean;
    ShouldHidePreviousBalanceAndPreviousAvailable: boolean;
    GroupAdditionalTransferOptions: boolean;
    AllowBalanceTransferBetweenCreditCards: boolean;
    CreditCardBalanceTransfersSendAsSecureMessage: boolean;
    CreditCardBalanceTransfersRecipientEmailAddress: string;
    AllowEBalconTransfersBetweenCreditCards: boolean;
    AllowAdjustedToBalanceOnMortgageTransfersEnabled: boolean;
    MortgageTransfersCategoriesForAdjustedToBalance: string[];
    SuffixLabelEnabled: boolean;
    PostTransferNavigationOptionsEnabled: boolean;
    TransLoanCollateralForBal: string[];
    TransExternalLoan: string[];
    MortgageCategories: string[];
    ShowTodaysDateOnTransferReceipt: boolean;
    ShowTransferDescriptionOnTransferReceipt: boolean;
    GetHouseholdingAccountsEnabled: boolean;
    AllowCreditCardTransfer: boolean;
    AllowedTransferToAccountCategories: string[];
    AllowedTransferFromAccountCategories: string[];
    NonOlbMemberEnabled: boolean;
    QuickActionEnabled: boolean;
    QuickActionToAndFromEnabled: boolean;
    AnyMember: AnyMemberTransfers;
    Timeouts: TransferTimeouts;
}

export class Transfers implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'Transfers'
    };


            private _aCH: AchTransfer;
            get aCH(): AchTransfer {
                return this._aCH;
            }
            set aCH(value: AchTransfer) {
                this._aCH = value;
            }

            private _wire: WireTransfer;
            get wire(): WireTransfer {
                return this._wire;
            }
            set wire(value: WireTransfer) {
                this._wire = value;
            }

            private _transferLimits: TransferLimits;
            get transferLimits(): TransferLimits {
                return this._transferLimits;
            }
            set transferLimits(value: TransferLimits) {
                this._transferLimits = value;
            }

            private _customTransferLimitMessagesEnabled: boolean;
            get customTransferLimitMessagesEnabled(): boolean {
                return this._customTransferLimitMessagesEnabled;
            }
            set customTransferLimitMessagesEnabled(value: boolean) {
                this._customTransferLimitMessagesEnabled = value;
            }

            private _displayTransferLimitOnError: boolean;
            get displayTransferLimitOnError(): boolean {
                return this._displayTransferLimitOnError;
            }
            set displayTransferLimitOnError(value: boolean) {
                this._displayTransferLimitOnError = value;
            }

            private _showShareLoanIds: boolean;
            get showShareLoanIds(): boolean {
                return this._showShareLoanIds;
            }
            set showShareLoanIds(value: boolean) {
                this._showShareLoanIds = value;
            }

            private _limtInExcessTransferToCards: boolean;
            get limtInExcessTransferToCards(): boolean {
                return this._limtInExcessTransferToCards;
            }
            set limtInExcessTransferToCards(value: boolean) {
                this._limtInExcessTransferToCards = value;
            }

            private _scheduledTransferIsOpenEndDateDisabledForDaily: boolean;
            get scheduledTransferIsOpenEndDateDisabledForDaily(): boolean {
                return this._scheduledTransferIsOpenEndDateDisabledForDaily;
            }
            set scheduledTransferIsOpenEndDateDisabledForDaily(value: boolean) {
                this._scheduledTransferIsOpenEndDateDisabledForDaily = value;
            }

            private _allowLoanToLoanTransfers: boolean;
            get allowLoanToLoanTransfers(): boolean {
                return this._allowLoanToLoanTransfers;
            }
            set allowLoanToLoanTransfers(value: boolean) {
                this._allowLoanToLoanTransfers = value;
            }

            private _mortgageLoanCategories: string[];
            get mortgageLoanCategories(): string[] {
                return this._mortgageLoanCategories;
            }
            set mortgageLoanCategories(value: string[]) {
                this._mortgageLoanCategories = value;
            }

            private _hideEndDateOption: boolean;
            get hideEndDateOption(): boolean {
                return this._hideEndDateOption;
            }
            set hideEndDateOption(value: boolean) {
                this._hideEndDateOption = value;
            }

            private _allowPaymentsGreaterThanPayoffAmount: boolean;
            get allowPaymentsGreaterThanPayoffAmount(): boolean {
                return this._allowPaymentsGreaterThanPayoffAmount;
            }
            set allowPaymentsGreaterThanPayoffAmount(value: boolean) {
                this._allowPaymentsGreaterThanPayoffAmount = value;
            }

            private _shouldHidePreviousBalanceAndPreviousAvailable: boolean;
            get shouldHidePreviousBalanceAndPreviousAvailable(): boolean {
                return this._shouldHidePreviousBalanceAndPreviousAvailable;
            }
            set shouldHidePreviousBalanceAndPreviousAvailable(value: boolean) {
                this._shouldHidePreviousBalanceAndPreviousAvailable = value;
            }

            private _groupAdditionalTransferOptions: boolean;
            get groupAdditionalTransferOptions(): boolean {
                return this._groupAdditionalTransferOptions;
            }
            set groupAdditionalTransferOptions(value: boolean) {
                this._groupAdditionalTransferOptions = value;
            }

            private _allowBalanceTransferBetweenCreditCards: boolean;
            get allowBalanceTransferBetweenCreditCards(): boolean {
                return this._allowBalanceTransferBetweenCreditCards;
            }
            set allowBalanceTransferBetweenCreditCards(value: boolean) {
                this._allowBalanceTransferBetweenCreditCards = value;
            }

            private _creditCardBalanceTransfersSendAsSecureMessage: boolean;
            get creditCardBalanceTransfersSendAsSecureMessage(): boolean {
                return this._creditCardBalanceTransfersSendAsSecureMessage;
            }
            set creditCardBalanceTransfersSendAsSecureMessage(value: boolean) {
                this._creditCardBalanceTransfersSendAsSecureMessage = value;
            }

            private _creditCardBalanceTransfersRecipientEmailAddress: string;
            get creditCardBalanceTransfersRecipientEmailAddress(): string {
                return this._creditCardBalanceTransfersRecipientEmailAddress;
            }
            set creditCardBalanceTransfersRecipientEmailAddress(value: string) {
                this._creditCardBalanceTransfersRecipientEmailAddress = value;
            }

            private _allowEBalconTransfersBetweenCreditCards: boolean;
            get allowEBalconTransfersBetweenCreditCards(): boolean {
                return this._allowEBalconTransfersBetweenCreditCards;
            }
            set allowEBalconTransfersBetweenCreditCards(value: boolean) {
                this._allowEBalconTransfersBetweenCreditCards = value;
            }

            private _allowAdjustedToBalanceOnMortgageTransfersEnabled: boolean;
            get allowAdjustedToBalanceOnMortgageTransfersEnabled(): boolean {
                return this._allowAdjustedToBalanceOnMortgageTransfersEnabled;
            }
            set allowAdjustedToBalanceOnMortgageTransfersEnabled(value: boolean) {
                this._allowAdjustedToBalanceOnMortgageTransfersEnabled = value;
            }

            private _mortgageTransfersCategoriesForAdjustedToBalance: string[];
            get mortgageTransfersCategoriesForAdjustedToBalance(): string[] {
                return this._mortgageTransfersCategoriesForAdjustedToBalance;
            }
            set mortgageTransfersCategoriesForAdjustedToBalance(value: string[]) {
                this._mortgageTransfersCategoriesForAdjustedToBalance = value;
            }

            private _suffixLabelEnabled: boolean;
            get suffixLabelEnabled(): boolean {
                return this._suffixLabelEnabled;
            }
            set suffixLabelEnabled(value: boolean) {
                this._suffixLabelEnabled = value;
            }

            private _postTransferNavigationOptionsEnabled: boolean;
            get postTransferNavigationOptionsEnabled(): boolean {
                return this._postTransferNavigationOptionsEnabled;
            }
            set postTransferNavigationOptionsEnabled(value: boolean) {
                this._postTransferNavigationOptionsEnabled = value;
            }

            private _transLoanCollateralForBal: string[];
            get transLoanCollateralForBal(): string[] {
                return this._transLoanCollateralForBal;
            }
            set transLoanCollateralForBal(value: string[]) {
                this._transLoanCollateralForBal = value;
            }

            private _transExternalLoan: string[];
            get transExternalLoan(): string[] {
                return this._transExternalLoan;
            }
            set transExternalLoan(value: string[]) {
                this._transExternalLoan = value;
            }

            private _mortgageCategories: string[];
            get mortgageCategories(): string[] {
                return this._mortgageCategories;
            }
            set mortgageCategories(value: string[]) {
                this._mortgageCategories = value;
            }

            private _showTodaysDateOnTransferReceipt: boolean;
            get showTodaysDateOnTransferReceipt(): boolean {
                return this._showTodaysDateOnTransferReceipt;
            }
            set showTodaysDateOnTransferReceipt(value: boolean) {
                this._showTodaysDateOnTransferReceipt = value;
            }

            private _showTransferDescriptionOnTransferReceipt: boolean;
            get showTransferDescriptionOnTransferReceipt(): boolean {
                return this._showTransferDescriptionOnTransferReceipt;
            }
            set showTransferDescriptionOnTransferReceipt(value: boolean) {
                this._showTransferDescriptionOnTransferReceipt = value;
            }

            private _getHouseholdingAccountsEnabled: boolean;
            get getHouseholdingAccountsEnabled(): boolean {
                return this._getHouseholdingAccountsEnabled;
            }
            set getHouseholdingAccountsEnabled(value: boolean) {
                this._getHouseholdingAccountsEnabled = value;
            }

            private _allowCreditCardTransfer: boolean;
            get allowCreditCardTransfer(): boolean {
                return this._allowCreditCardTransfer;
            }
            set allowCreditCardTransfer(value: boolean) {
                this._allowCreditCardTransfer = value;
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

            private _nonOlbMemberEnabled: boolean;
            get nonOlbMemberEnabled(): boolean {
                return this._nonOlbMemberEnabled;
            }
            set nonOlbMemberEnabled(value: boolean) {
                this._nonOlbMemberEnabled = value;
            }

            private _quickActionEnabled: boolean;
            get quickActionEnabled(): boolean {
                return this._quickActionEnabled;
            }
            set quickActionEnabled(value: boolean) {
                this._quickActionEnabled = value;
            }

            private _quickActionToAndFromEnabled: boolean;
            get quickActionToAndFromEnabled(): boolean {
                return this._quickActionToAndFromEnabled;
            }
            set quickActionToAndFromEnabled(value: boolean) {
                this._quickActionToAndFromEnabled = value;
            }

            private _anyMember: AnyMemberTransfers;
            get anyMember(): AnyMemberTransfers {
                return this._anyMember;
            }
            set anyMember(value: AnyMemberTransfers) {
                this._anyMember = value;
            }

            private _timeouts: TransferTimeouts;
            get timeouts(): TransferTimeouts {
                return this._timeouts;
            }
            set timeouts(value: TransferTimeouts) {
                this._timeouts = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "Transfers.ACH", value: this._aCH, dataType: 'achtransfer', label: "A C H" },
                { key: "Transfers.Wire", value: this._wire, dataType: 'wiretransfer', label: "Wire" },
                { key: "Transfers.TransferLimits", value: this._transferLimits, dataType: 'transferlimits', label: "Transfer Limits" },
                { key: "Transfers.CustomTransferLimitMessagesEnabled", value: this._customTransferLimitMessagesEnabled, dataType: 'boolean', label: "Custom Transfer Limit Messages Enabled" },
                { key: "Transfers.DisplayTransferLimitOnError", value: this._displayTransferLimitOnError, dataType: 'boolean', label: "Display Transfer Limit On Error" },
                { key: "Transfers.ShowShareLoanIds", value: this._showShareLoanIds, dataType: 'boolean', label: "Show Share Loan Ids" },
                { key: "Transfers.LimtInExcessTransferToCards", value: this._limtInExcessTransferToCards, dataType: 'boolean', label: "Limt In Excess Transfer To Cards" },
                { key: "Transfers.ScheduledTransferIsOpenEndDateDisabledForDaily", value: this._scheduledTransferIsOpenEndDateDisabledForDaily, dataType: 'boolean', label: "Scheduled Transfer Is Open End Date Disabled For Daily" },
                { key: "Transfers.AllowLoanToLoanTransfers", value: this._allowLoanToLoanTransfers, dataType: 'boolean', label: "Allow Loan To Loan Transfers" },
                { key: "Transfers.MortgageLoanCategories", value: this._mortgageLoanCategories, dataType: 'list<string>', label: "Mortgage Loan Categories" },
                { key: "Transfers.HideEndDateOption", value: this._hideEndDateOption, dataType: 'boolean', label: "Hide End Date Option" },
                { key: "Transfers.AllowPaymentsGreaterThanPayoffAmount", value: this._allowPaymentsGreaterThanPayoffAmount, dataType: 'boolean', label: "Allow Payments Greater Than Payoff Amount" },
                { key: "Transfers.ShouldHidePreviousBalanceAndPreviousAvailable", value: this._shouldHidePreviousBalanceAndPreviousAvailable, dataType: 'boolean', label: "Should Hide Previous Balance And Previous Available" },
                { key: "Transfers.GroupAdditionalTransferOptions", value: this._groupAdditionalTransferOptions, dataType: 'boolean', label: "Group Additional Transfer Options" },
                { key: "Transfers.AllowBalanceTransferBetweenCreditCards", value: this._allowBalanceTransferBetweenCreditCards, dataType: 'boolean', label: "Allow Balance Transfer Between Credit Cards" },
                { key: "Transfers.CreditCardBalanceTransfersSendAsSecureMessage", value: this._creditCardBalanceTransfersSendAsSecureMessage, dataType: 'boolean', label: "Credit Card Balance Transfers Send As Secure Message" },
                { key: "Transfers.CreditCardBalanceTransfersRecipientEmailAddress", value: this._creditCardBalanceTransfersRecipientEmailAddress, dataType: 'string', label: "Credit Card Balance Transfers Recipient Email Address" },
                { key: "Transfers.AllowEBalconTransfersBetweenCreditCards", value: this._allowEBalconTransfersBetweenCreditCards, dataType: 'boolean', label: "Allow E Balcon Transfers Between Credit Cards" },
                { key: "Transfers.AllowAdjustedToBalanceOnMortgageTransfersEnabled", value: this._allowAdjustedToBalanceOnMortgageTransfersEnabled, dataType: 'boolean', label: "Allow Adjusted To Balance On Mortgage Transfers Enabled" },
                { key: "Transfers.MortgageTransfersCategoriesForAdjustedToBalance", value: this._mortgageTransfersCategoriesForAdjustedToBalance, dataType: 'list<string>', label: "Mortgage Transfers Categories For Adjusted To Balance" },
                { key: "Transfers.SuffixLabelEnabled", value: this._suffixLabelEnabled, dataType: 'boolean', label: "Suffix Label Enabled" },
                { key: "Transfers.PostTransferNavigationOptionsEnabled", value: this._postTransferNavigationOptionsEnabled, dataType: 'boolean', label: "Post Transfer Navigation Options Enabled" },
                { key: "Transfers.TransLoanCollateralForBal", value: this._transLoanCollateralForBal, dataType: 'list<string>', label: "Trans Loan Collateral For Bal" },
                { key: "Transfers.TransExternalLoan", value: this._transExternalLoan, dataType: 'list<string>', label: "Trans External Loan" },
                { key: "Transfers.MortgageCategories", value: this._mortgageCategories, dataType: 'list<string>', label: "Mortgage Categories" },
                { key: "Transfers.ShowTodaysDateOnTransferReceipt", value: this._showTodaysDateOnTransferReceipt, dataType: 'boolean', label: "Show Todays Date On Transfer Receipt" },
                { key: "Transfers.ShowTransferDescriptionOnTransferReceipt", value: this._showTransferDescriptionOnTransferReceipt, dataType: 'boolean', label: "Show Transfer Description On Transfer Receipt" },
                { key: "Transfers.GetHouseholdingAccountsEnabled", value: this._getHouseholdingAccountsEnabled, dataType: 'boolean', label: "Get Householding Accounts Enabled" },
                { key: "Transfers.AllowCreditCardTransfer", value: this._allowCreditCardTransfer, dataType: 'boolean', label: "Allow Credit Card Transfer" },
                { key: "Transfers.AllowedTransferToAccountCategories", value: this._allowedTransferToAccountCategories, dataType: 'list<string>', label: "Allowed Transfer To Account Categories" },
                { key: "Transfers.AllowedTransferFromAccountCategories", value: this._allowedTransferFromAccountCategories, dataType: 'list<string>', label: "Allowed Transfer From Account Categories" },
                { key: "Transfers.NonOlbMemberEnabled", value: this._nonOlbMemberEnabled, dataType: 'boolean', label: "Non Olb Member Enabled" },
                { key: "Transfers.QuickActionEnabled", value: this._quickActionEnabled, dataType: 'boolean', label: "Quick Action Enabled" },
                { key: "Transfers.QuickActionToAndFromEnabled", value: this._quickActionToAndFromEnabled, dataType: 'boolean', label: "Quick Action To And From Enabled" },
                { key: "Transfers.AnyMember", value: this._anyMember, dataType: 'anymembertransfers', label: "Any Member" },
                { key: "Transfers.Timeouts", value: this._timeouts, dataType: 'transfertimeouts', label: "Timeouts" },
            ];
        }

}