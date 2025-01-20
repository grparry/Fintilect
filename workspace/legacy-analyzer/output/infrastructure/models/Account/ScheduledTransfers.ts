// Generated imports
import { CoreErrorCodeToTransferResultMappings } from '../CoreErrorCodeToTransferResultMappings';
import { InternalTransfersRecurrenceTypes } from '../InternalTransfersRecurrenceTypes';
import { ExternalTransfersRecurrenceTypes } from '../ExternalTransfersRecurrenceTypes';
import { CreditCardTransfersRecurrenceTypes } from '../CreditCardTransfersRecurrenceTypes';
import { EndOptions } from '../EndOptions';
import { AutomaticLoanPaymentsLoanCategories } from '../AutomaticLoanPaymentsLoanCategories';

export interface ScheduledTransfers {
    /** @settingKey ScheduledTransfers.Enabled */
    enabled: boolean;
    /** @settingKey ScheduledTransfers.MinVersion */
    minVersion: number;
    /** @settingKey ScheduledTransfers.MonthsToCalculate */
    monthsToCalculate: number;
    /** @settingKey ScheduledTransfers.AdjustForWeekendsAndHolidays */
    adjustForWeekendsAndHolidays: boolean;
    /** @settingKey ScheduledTransfers.AddDayForWeekendOrHoliday */
    /**
     * /// <summary>
     * /// //{
     * /// //TODO: Make this configurable when we have a plan to handle converting transfer exceptions from non-business days to business days.
     * /// //get => GetBoolValue();
     * /// //set => SetValue(value);
     * /// //}
     * /// </summary>
     */
    addDayForWeekendOrHoliday: boolean;
    /** @settingKey ScheduledTransfers.MaxTransferAttempts */
    maxTransferAttempts: number;
    /** @settingKey X.App.HomeBanking.BillPayAccounts */
    homeBankingBillPayAccounts: string;
    /** @settingKey ScheduledTransfers.TransferAtLeastMinPaymentForLoans */
    transferAtLeastMinPaymentForLoans: boolean;
    /** @settingKey ScheduledTransfers.TransferAtLeastMinPaymentForCreditCards */
    transferAtLeastMinPaymentForCreditCards: boolean;
    /** @settingKey ScheduledTransfers.ContinueIfMinPaymentCheckFails */
    continueIfMinPaymentCheckFails: boolean;
    /** @settingKey X.App.HomeBanking.DefaultSuffixMask */
    defaultSuffixMask: string;
    /** @settingKey ScheduledTransfers.UseAmountDueInsteadOfPaymentForMinimumHelocPayment */
    shouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment: boolean;
    /** @settingKey ScheduledTransfers.StartDateTimePickerHourOffset */
    startDateTimePickerHourOffset: number;
    /** @settingKey ScheduledTransfers.LastDayOfMonthSchedulingEnabled */
    lastDayOfMonthSchedulingEnabled: boolean;
    /** @settingKey ScheduledTransfers.CoreErrorCodeToTransferResultMappings */
    dictionary: CoreErrorCodeToTransferResultMappings;
    /** @settingKey ScheduledTransfers.CoreErrorCodeToTransferResultMappingEnabled */
    coreErrorCodeToTransferResultMappingEnabled: boolean;
    /** @settingKey ScheduledTransfers.UseScheduledRunTimeAsEffectiveDate.Enabled */
    useScheduledRunTimeAsEffectiveDateEnabled: boolean;
    /** @settingKey ScheduledTransfers.CheckCoreForDuplicateTransactions.Enabled */
    checkCoreForDuplicateTransactionsEnabled: boolean;
    /** @settingKey ScheduledTransfers.CheckCoreForDuplicateTransactions.ShouldSendSecureMessageWhenDuplicateIsDetected */
    shouldSendSecureMessageWhenDuplicateIsDetected: boolean;
    /** @settingKey ScheduledTransfers.ReadOnly.Enabled */
    readOnlyEnabled: boolean;
    /** @settingKey ScheduledTransfers.ValidateProcessingIndicatorsEnabled */
    validateProcessingIndicatorsEnabled: boolean;
    /** @settingKey ScheduledTransfers.ShouldSendSecureMessageWhenManualReviewIsRequired */
    shouldSendSecureMessageWhenManualReviewIsRequired: boolean;
    /** @settingKey ScheduledTransfers.ManualReviewRequiredSecureMessageCategory */
    manualReviewRequiredSecureMessageCategory: string;
    /** @settingKey ScheduledTransfers.ManualReviewRequiredSecureMessageSenderMembershipUserId */
    manualReviewRequiredSecureMessageSenderMembershipUserId: number;
    /** @settingKey ScheduledTransfers.ShouldStoreIdentifierForCreditCards */
    shouldStoreIdentifierForCreditCards: boolean;
    /** @settingKey ScheduledTransfers.InternalTransfers.RecurrenceTypes */
    list: InternalTransfersRecurrenceTypes;
    /** @settingKey ScheduledTransfers.ExternalTransfers.RecurrenceTypes */
    list: ExternalTransfersRecurrenceTypes;
    /** @settingKey ScheduledTransfers.CreditCardTransfers.RecurrenceTypes */
    list: CreditCardTransfersRecurrenceTypes;
    /** @settingKey ScheduledTransfers.EndOptions */
    list: EndOptions;
    /** @settingKey ScheduledTransfers.OnHost.Enabled */
    onHostEnabled: boolean;
    /** @settingKey ScheduledTransfers.OnHost.MinVersion */
    onHostMinVersion: number;
    /** @settingKey ScheduledTransfers.AutomaticLoanPayments.Enabled */
    automaticLoanPaymentsEnabled: boolean;
    /** @settingKey ScheduledTransfers.AutomaticLoanPayments.LoanCategories */
    list: AutomaticLoanPaymentsLoanCategories;
    /** @settingKey ScheduledTransfers.ShouldUseNewUserInterface */
    shouldUseNewUserInterface: boolean;
    /** @settingKey ScheduledTransfers.CanSkipTransferOccurrence */
    canSkipTransferOccurrence: boolean;
    /** @settingKey ScheduledTransfers.CanEditTransferAmount */
    canEditTransferAmount: boolean;
}
