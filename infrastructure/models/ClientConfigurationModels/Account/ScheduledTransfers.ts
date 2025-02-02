import { Setting, ISettingsGroup, ISettingsMetadata } from '@models/base/types';
import { ScheduledTransferResult } from '../ScheduledTransferResult';
import { RecurrenceType } from '../RecurrenceType';
import { ScheduledTransferEndOption } from '../ScheduledTransferEndOption';
export interface ScheduledTransfersConfig {
    Enabled: boolean;
    MinVersion: number;
    MonthsToCalculate: number;
    AdjustForWeekendsAndHolidays: boolean;
    AddDayForWeekendOrHoliday: boolean;
    MaxTransferAttempts: number;
    HomeBankingBillPayAccounts: string;
    TransferAtLeastMinPaymentForLoans: boolean;
    TransferAtLeastMinPaymentForCreditCards: boolean;
    ContinueIfMinPaymentCheckFails: boolean;
    DefaultSuffixMask: string;
    ShouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment: boolean;
    StartDateTimePickerHourOffset: number;
    LastDayOfMonthSchedulingEnabled: boolean;
    CoreErrorCodeToTransferResultMappings: Record<string, ScheduledTransferResult>;
    CoreErrorCodeToTransferResultMappingEnabled: boolean;
    UseScheduledRunTimeAsEffectiveDateEnabled: boolean;
    CheckCoreForDuplicateTransactionsEnabled: boolean;
    ShouldSendSecureMessageWhenDuplicateIsDetected: boolean;
    ReadOnlyEnabled: boolean;
    ValidateProcessingIndicatorsEnabled: boolean;
    ShouldSendSecureMessageWhenManualReviewIsRequired: boolean;
    ManualReviewRequiredSecureMessageCategory: string;
    ManualReviewRequiredSecureMessageSenderMembershipUserId: number;
    ShouldStoreIdentifierForCreditCards: boolean;
    InternalTransfersRecurrenceTypes: RecurrenceType[];
    ExternalTransfersRecurrenceTypes: RecurrenceType[];
    CreditCardTransfersRecurrenceTypes: RecurrenceType[];
    EndOptions: ScheduledTransferEndOption[];
    OnHostEnabled: boolean;
    OnHostMinVersion: number;
    AutomaticLoanPaymentsEnabled: boolean;
    AutomaticLoanPaymentsLoanCategories: string[];
    ShouldUseNewUserInterface: boolean;
    CanSkipTransferOccurrence: boolean;
    CanEditTransferAmount: boolean;
}

export class ScheduledTransfers implements ISettingsGroup {
    static readonly metadata: ISettingsMetadata = {
        groupName: 'ScheduledTransfers'
    };


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

            private _monthsToCalculate: number;
            get monthsToCalculate(): number {
                return this._monthsToCalculate;
            }
            set monthsToCalculate(value: number) {
                this._monthsToCalculate = value;
            }

            private _adjustForWeekendsAndHolidays: boolean;
            get adjustForWeekendsAndHolidays(): boolean {
                return this._adjustForWeekendsAndHolidays;
            }
            set adjustForWeekendsAndHolidays(value: boolean) {
                this._adjustForWeekendsAndHolidays = value;
            }

            private _addDayForWeekendOrHoliday: boolean;
            get addDayForWeekendOrHoliday(): boolean {
                return this._addDayForWeekendOrHoliday;
            }
            set addDayForWeekendOrHoliday(value: boolean) {
                this._addDayForWeekendOrHoliday = value;
            }

            private _maxTransferAttempts: number;
            get maxTransferAttempts(): number {
                return this._maxTransferAttempts;
            }
            set maxTransferAttempts(value: number) {
                this._maxTransferAttempts = value;
            }

            private _homeBankingBillPayAccounts: string;
            get homeBankingBillPayAccounts(): string {
                return this._homeBankingBillPayAccounts;
            }
            set homeBankingBillPayAccounts(value: string) {
                this._homeBankingBillPayAccounts = value;
            }

            private _transferAtLeastMinPaymentForLoans: boolean;
            get transferAtLeastMinPaymentForLoans(): boolean {
                return this._transferAtLeastMinPaymentForLoans;
            }
            set transferAtLeastMinPaymentForLoans(value: boolean) {
                this._transferAtLeastMinPaymentForLoans = value;
            }

            private _transferAtLeastMinPaymentForCreditCards: boolean;
            get transferAtLeastMinPaymentForCreditCards(): boolean {
                return this._transferAtLeastMinPaymentForCreditCards;
            }
            set transferAtLeastMinPaymentForCreditCards(value: boolean) {
                this._transferAtLeastMinPaymentForCreditCards = value;
            }

            private _continueIfMinPaymentCheckFails: boolean;
            get continueIfMinPaymentCheckFails(): boolean {
                return this._continueIfMinPaymentCheckFails;
            }
            set continueIfMinPaymentCheckFails(value: boolean) {
                this._continueIfMinPaymentCheckFails = value;
            }

            private _defaultSuffixMask: string;
            get defaultSuffixMask(): string {
                return this._defaultSuffixMask;
            }
            set defaultSuffixMask(value: string) {
                this._defaultSuffixMask = value;
            }

            private _shouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment: boolean;
            get shouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment(): boolean {
                return this._shouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment;
            }
            set shouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment(value: boolean) {
                this._shouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment = value;
            }

            private _startDateTimePickerHourOffset: number;
            get startDateTimePickerHourOffset(): number {
                return this._startDateTimePickerHourOffset;
            }
            set startDateTimePickerHourOffset(value: number) {
                this._startDateTimePickerHourOffset = value;
            }

            private _lastDayOfMonthSchedulingEnabled: boolean;
            get lastDayOfMonthSchedulingEnabled(): boolean {
                return this._lastDayOfMonthSchedulingEnabled;
            }
            set lastDayOfMonthSchedulingEnabled(value: boolean) {
                this._lastDayOfMonthSchedulingEnabled = value;
            }

            private _coreErrorCodeToTransferResultMappings: Record<string, ScheduledTransferResult>;
            get coreErrorCodeToTransferResultMappings(): Record<string, ScheduledTransferResult> {
                return this._coreErrorCodeToTransferResultMappings;
            }
            set coreErrorCodeToTransferResultMappings(value: Record<string, ScheduledTransferResult>) {
                this._coreErrorCodeToTransferResultMappings = value;
            }

            private _coreErrorCodeToTransferResultMappingEnabled: boolean;
            get coreErrorCodeToTransferResultMappingEnabled(): boolean {
                return this._coreErrorCodeToTransferResultMappingEnabled;
            }
            set coreErrorCodeToTransferResultMappingEnabled(value: boolean) {
                this._coreErrorCodeToTransferResultMappingEnabled = value;
            }

            private _useScheduledRunTimeAsEffectiveDateEnabled: boolean;
            get useScheduledRunTimeAsEffectiveDateEnabled(): boolean {
                return this._useScheduledRunTimeAsEffectiveDateEnabled;
            }
            set useScheduledRunTimeAsEffectiveDateEnabled(value: boolean) {
                this._useScheduledRunTimeAsEffectiveDateEnabled = value;
            }

            private _checkCoreForDuplicateTransactionsEnabled: boolean;
            get checkCoreForDuplicateTransactionsEnabled(): boolean {
                return this._checkCoreForDuplicateTransactionsEnabled;
            }
            set checkCoreForDuplicateTransactionsEnabled(value: boolean) {
                this._checkCoreForDuplicateTransactionsEnabled = value;
            }

            private _shouldSendSecureMessageWhenDuplicateIsDetected: boolean;
            get shouldSendSecureMessageWhenDuplicateIsDetected(): boolean {
                return this._shouldSendSecureMessageWhenDuplicateIsDetected;
            }
            set shouldSendSecureMessageWhenDuplicateIsDetected(value: boolean) {
                this._shouldSendSecureMessageWhenDuplicateIsDetected = value;
            }

            private _readOnlyEnabled: boolean;
            get readOnlyEnabled(): boolean {
                return this._readOnlyEnabled;
            }
            set readOnlyEnabled(value: boolean) {
                this._readOnlyEnabled = value;
            }

            private _validateProcessingIndicatorsEnabled: boolean;
            get validateProcessingIndicatorsEnabled(): boolean {
                return this._validateProcessingIndicatorsEnabled;
            }
            set validateProcessingIndicatorsEnabled(value: boolean) {
                this._validateProcessingIndicatorsEnabled = value;
            }

            private _shouldSendSecureMessageWhenManualReviewIsRequired: boolean;
            get shouldSendSecureMessageWhenManualReviewIsRequired(): boolean {
                return this._shouldSendSecureMessageWhenManualReviewIsRequired;
            }
            set shouldSendSecureMessageWhenManualReviewIsRequired(value: boolean) {
                this._shouldSendSecureMessageWhenManualReviewIsRequired = value;
            }

            private _manualReviewRequiredSecureMessageCategory: string;
            get manualReviewRequiredSecureMessageCategory(): string {
                return this._manualReviewRequiredSecureMessageCategory;
            }
            set manualReviewRequiredSecureMessageCategory(value: string) {
                this._manualReviewRequiredSecureMessageCategory = value;
            }

            private _manualReviewRequiredSecureMessageSenderMembershipUserId: number;
            get manualReviewRequiredSecureMessageSenderMembershipUserId(): number {
                return this._manualReviewRequiredSecureMessageSenderMembershipUserId;
            }
            set manualReviewRequiredSecureMessageSenderMembershipUserId(value: number) {
                this._manualReviewRequiredSecureMessageSenderMembershipUserId = value;
            }

            private _shouldStoreIdentifierForCreditCards: boolean;
            get shouldStoreIdentifierForCreditCards(): boolean {
                return this._shouldStoreIdentifierForCreditCards;
            }
            set shouldStoreIdentifierForCreditCards(value: boolean) {
                this._shouldStoreIdentifierForCreditCards = value;
            }

            private _internalTransfersRecurrenceTypes: RecurrenceType[];
            get internalTransfersRecurrenceTypes(): RecurrenceType[] {
                return this._internalTransfersRecurrenceTypes;
            }
            set internalTransfersRecurrenceTypes(value: RecurrenceType[]) {
                this._internalTransfersRecurrenceTypes = value;
            }

            private _externalTransfersRecurrenceTypes: RecurrenceType[];
            get externalTransfersRecurrenceTypes(): RecurrenceType[] {
                return this._externalTransfersRecurrenceTypes;
            }
            set externalTransfersRecurrenceTypes(value: RecurrenceType[]) {
                this._externalTransfersRecurrenceTypes = value;
            }

            private _creditCardTransfersRecurrenceTypes: RecurrenceType[];
            get creditCardTransfersRecurrenceTypes(): RecurrenceType[] {
                return this._creditCardTransfersRecurrenceTypes;
            }
            set creditCardTransfersRecurrenceTypes(value: RecurrenceType[]) {
                this._creditCardTransfersRecurrenceTypes = value;
            }

            private _endOptions: ScheduledTransferEndOption[];
            get endOptions(): ScheduledTransferEndOption[] {
                return this._endOptions;
            }
            set endOptions(value: ScheduledTransferEndOption[]) {
                this._endOptions = value;
            }

            private _onHostEnabled: boolean;
            get onHostEnabled(): boolean {
                return this._onHostEnabled;
            }
            set onHostEnabled(value: boolean) {
                this._onHostEnabled = value;
            }

            private _onHostMinVersion: number;
            get onHostMinVersion(): number {
                return this._onHostMinVersion;
            }
            set onHostMinVersion(value: number) {
                this._onHostMinVersion = value;
            }

            private _automaticLoanPaymentsEnabled: boolean;
            get automaticLoanPaymentsEnabled(): boolean {
                return this._automaticLoanPaymentsEnabled;
            }
            set automaticLoanPaymentsEnabled(value: boolean) {
                this._automaticLoanPaymentsEnabled = value;
            }

            private _automaticLoanPaymentsLoanCategories: string[];
            get automaticLoanPaymentsLoanCategories(): string[] {
                return this._automaticLoanPaymentsLoanCategories;
            }
            set automaticLoanPaymentsLoanCategories(value: string[]) {
                this._automaticLoanPaymentsLoanCategories = value;
            }

            private _shouldUseNewUserInterface: boolean;
            get shouldUseNewUserInterface(): boolean {
                return this._shouldUseNewUserInterface;
            }
            set shouldUseNewUserInterface(value: boolean) {
                this._shouldUseNewUserInterface = value;
            }

            private _canSkipTransferOccurrence: boolean;
            get canSkipTransferOccurrence(): boolean {
                return this._canSkipTransferOccurrence;
            }
            set canSkipTransferOccurrence(value: boolean) {
                this._canSkipTransferOccurrence = value;
            }

            private _canEditTransferAmount: boolean;
            get canEditTransferAmount(): boolean {
                return this._canEditTransferAmount;
            }
            set canEditTransferAmount(value: boolean) {
                this._canEditTransferAmount = value;
            }


    constructor() {}


        toSettings(): Setting[] {
            return [
                { key: "ScheduledTransfers.Enabled", value: this._enabled, dataType: 'boolean', label: "Enabled" },
                { key: "ScheduledTransfers.MinVersion", value: this._minVersion, dataType: 'number', label: "Min Version" },
                { key: "ScheduledTransfers.MonthsToCalculate", value: this._monthsToCalculate, dataType: 'number', label: "Months To Calculate" },
                { key: "ScheduledTransfers.AdjustForWeekendsAndHolidays", value: this._adjustForWeekendsAndHolidays, dataType: 'boolean', label: "Adjust For Weekends And Holidays" },
                { key: "ScheduledTransfers.AddDayForWeekendOrHoliday", value: this._addDayForWeekendOrHoliday, dataType: 'boolean', label: "Add Day For Weekend Or Holiday" },
                { key: "ScheduledTransfers.MaxTransferAttempts", value: this._maxTransferAttempts, dataType: 'number', label: "Max Transfer Attempts" },
                { key: "ScheduledTransfers.HomeBankingBillPayAccounts", value: this._homeBankingBillPayAccounts, dataType: 'string', label: "Home Banking Bill Pay Accounts" },
                { key: "ScheduledTransfers.TransferAtLeastMinPaymentForLoans", value: this._transferAtLeastMinPaymentForLoans, dataType: 'boolean', label: "Transfer At Least Min Payment For Loans" },
                { key: "ScheduledTransfers.TransferAtLeastMinPaymentForCreditCards", value: this._transferAtLeastMinPaymentForCreditCards, dataType: 'boolean', label: "Transfer At Least Min Payment For Credit Cards" },
                { key: "ScheduledTransfers.ContinueIfMinPaymentCheckFails", value: this._continueIfMinPaymentCheckFails, dataType: 'boolean', label: "Continue If Min Payment Check Fails" },
                { key: "ScheduledTransfers.DefaultSuffixMask", value: this._defaultSuffixMask, dataType: 'string', label: "Default Suffix Mask" },
                { key: "ScheduledTransfers.ShouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment", value: this._shouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment, dataType: 'boolean', label: "Should Use Amount Due Instead Of Payment For Minimum Heloc Payment" },
                { key: "ScheduledTransfers.StartDateTimePickerHourOffset", value: this._startDateTimePickerHourOffset, dataType: 'number', label: "Start Date Time Picker Hour Offset" },
                { key: "ScheduledTransfers.LastDayOfMonthSchedulingEnabled", value: this._lastDayOfMonthSchedulingEnabled, dataType: 'boolean', label: "Last Day Of Month Scheduling Enabled" },
                { key: "ScheduledTransfers.CoreErrorCodeToTransferResultMappings", value: this._coreErrorCodeToTransferResultMappings, dataType: 'record<string, scheduledtransferresult>', label: "Core Error Code To Transfer Result Mappings" },
                { key: "ScheduledTransfers.CoreErrorCodeToTransferResultMappingEnabled", value: this._coreErrorCodeToTransferResultMappingEnabled, dataType: 'boolean', label: "Core Error Code To Transfer Result Mapping Enabled" },
                { key: "ScheduledTransfers.UseScheduledRunTimeAsEffectiveDateEnabled", value: this._useScheduledRunTimeAsEffectiveDateEnabled, dataType: 'boolean', label: "Use Scheduled Run Time As Effective Date Enabled" },
                { key: "ScheduledTransfers.CheckCoreForDuplicateTransactionsEnabled", value: this._checkCoreForDuplicateTransactionsEnabled, dataType: 'boolean', label: "Check Core For Duplicate Transactions Enabled" },
                { key: "ScheduledTransfers.ShouldSendSecureMessageWhenDuplicateIsDetected", value: this._shouldSendSecureMessageWhenDuplicateIsDetected, dataType: 'boolean', label: "Should Send Secure Message When Duplicate Is Detected" },
                { key: "ScheduledTransfers.ReadOnlyEnabled", value: this._readOnlyEnabled, dataType: 'boolean', label: "Read Only Enabled" },
                { key: "ScheduledTransfers.ValidateProcessingIndicatorsEnabled", value: this._validateProcessingIndicatorsEnabled, dataType: 'boolean', label: "Validate Processing Indicators Enabled" },
                { key: "ScheduledTransfers.ShouldSendSecureMessageWhenManualReviewIsRequired", value: this._shouldSendSecureMessageWhenManualReviewIsRequired, dataType: 'boolean', label: "Should Send Secure Message When Manual Review Is Required" },
                { key: "ScheduledTransfers.ManualReviewRequiredSecureMessageCategory", value: this._manualReviewRequiredSecureMessageCategory, dataType: 'string', label: "Manual Review Required Secure Message Category" },
                { key: "ScheduledTransfers.ManualReviewRequiredSecureMessageSenderMembershipUserId", value: this._manualReviewRequiredSecureMessageSenderMembershipUserId, dataType: 'number', label: "Manual Review Required Secure Message Sender Membership User Id" },
                { key: "ScheduledTransfers.ShouldStoreIdentifierForCreditCards", value: this._shouldStoreIdentifierForCreditCards, dataType: 'boolean', label: "Should Store Identifier For Credit Cards" },
                { key: "ScheduledTransfers.InternalTransfersRecurrenceTypes", value: this._internalTransfersRecurrenceTypes, dataType: 'array<RecurrenceType>', label: "Internal Transfers Recurrence Types" },
                { key: "ScheduledTransfers.ExternalTransfersRecurrenceTypes", value: this._externalTransfersRecurrenceTypes, dataType: 'array<RecurrenceType>', label: "External Transfers Recurrence Types" },
                { key: "ScheduledTransfers.CreditCardTransfersRecurrenceTypes", value: this._creditCardTransfersRecurrenceTypes, dataType: 'array<RecurrenceType>', label: "Credit Card Transfers Recurrence Types" },
                { key: "ScheduledTransfers.EndOptions", value: this._endOptions, dataType: 'array<ScheduledTransferEndOption>', label: "End Options" },
                { key: "ScheduledTransfers.OnHostEnabled", value: this._onHostEnabled, dataType: 'boolean', label: "On Host Enabled" },
                { key: "ScheduledTransfers.OnHostMinVersion", value: this._onHostMinVersion, dataType: 'number', label: "On Host Min Version" },
                { key: "ScheduledTransfers.AutomaticLoanPaymentsEnabled", value: this._automaticLoanPaymentsEnabled, dataType: 'boolean', label: "Automatic Loan Payments Enabled" },
                { key: "ScheduledTransfers.AutomaticLoanPaymentsLoanCategories", value: this._automaticLoanPaymentsLoanCategories, dataType: 'list<string>', label: "Automatic Loan Payments Loan Categories" },
                { key: "ScheduledTransfers.ShouldUseNewUserInterface", value: this._shouldUseNewUserInterface, dataType: 'boolean', label: "Should Use New User Interface" },
                { key: "ScheduledTransfers.CanSkipTransferOccurrence", value: this._canSkipTransferOccurrence, dataType: 'boolean', label: "Can Skip Transfer Occurrence" },
                { key: "ScheduledTransfers.CanEditTransferAmount", value: this._canEditTransferAmount, dataType: 'boolean', label: "Can Edit Transfer Amount" },
            ];
        }

}