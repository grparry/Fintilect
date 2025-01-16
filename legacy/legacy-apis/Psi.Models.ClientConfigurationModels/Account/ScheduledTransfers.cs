using System;
using System.Collections.Generic;
using Psi.Business.ServiceContracts.RequestResponse.Transfers;
using Psi.Data.Models.Domain;
using Psi.Data.Models.Domain.Transfers;

namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class ScheduledTransfers : SettingsBaseHelper
    {
        public ScheduledTransfers(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("ScheduledTransfers.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.MonthsToCalculate")]
        public int MonthsToCalculate
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.AdjustForWeekendsAndHolidays")]
        public bool AdjustForWeekendsAndHolidays => false;
        //{
        //TODO: Make this configurable when we have a plan to handle converting transfer exceptions from non-business days to business days.
        //get => GetBoolValue();
        //set => SetValue(value);
        //}

        [SettingKey("ScheduledTransfers.AddDayForWeekendOrHoliday")]
        public bool AddDayForWeekendOrHoliday
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.MaxTransferAttempts")]
        public int MaxTransferAttempts
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.BillPayAccounts")]
        public string HomeBankingBillPayAccounts
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.TransferAtLeastMinPaymentForLoans")]
        public bool TransferAtLeastMinPaymentForLoans
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.TransferAtLeastMinPaymentForCreditCards")]
        public bool TransferAtLeastMinPaymentForCreditCards
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.ContinueIfMinPaymentCheckFails")]
        public bool ContinueIfMinPaymentCheckFails
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.DefaultSuffixMask")]
        public string DefaultSuffixMask
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.UseAmountDueInsteadOfPaymentForMinimumHelocPayment")]
        public bool ShouldUseAmountDueInsteadOfPaymentForMinimumHelocPayment
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.StartDateTimePickerHourOffset")]
        public int StartDateTimePickerHourOffset
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.LastDayOfMonthSchedulingEnabled")]
        public bool LastDayOfMonthSchedulingEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.CoreErrorCodeToTransferResultMappings")]
        public Dictionary<string, ScheduledTransferResult> CoreErrorCodeToTransferResultMappings
        {
            get
            {
                var value = GetJsonValueOrNull<Dictionary<string, ScheduledTransferResult>>();

                return value ?? new Dictionary<string, ScheduledTransferResult>();
            }
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.CoreErrorCodeToTransferResultMappingEnabled")]
        public bool CoreErrorCodeToTransferResultMappingEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.UseScheduledRunTimeAsEffectiveDate.Enabled")]
        public bool UseScheduledRunTimeAsEffectiveDateEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [Obsolete("This isn't used right now. A future project may be completed that uses this setting.")]
        [SettingKey("ScheduledTransfers.CheckCoreForDuplicateTransactions.Enabled")]
        public bool CheckCoreForDuplicateTransactionsEnabled
        {
            get => false;
            set => SetValue(value);
        }

        [Obsolete("This isn't used right now. A future project may be completed that uses this setting.")]
        [SettingKey("ScheduledTransfers.CheckCoreForDuplicateTransactions.ShouldSendSecureMessageWhenDuplicateIsDetected")]
        public bool ShouldSendSecureMessageWhenDuplicateIsDetected
        {
            get => false;
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.ReadOnly.Enabled")]
        public bool ReadOnlyEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.ValidateProcessingIndicatorsEnabled")]
        public bool ValidateProcessingIndicatorsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.ShouldSendSecureMessageWhenManualReviewIsRequired")]
        public bool ShouldSendSecureMessageWhenManualReviewIsRequired
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.ManualReviewRequiredSecureMessageCategory")]
        public string ManualReviewRequiredSecureMessageCategory
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.ManualReviewRequiredSecureMessageSenderMembershipUserId")]
        public int ManualReviewRequiredSecureMessageSenderMembershipUserId
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.ShouldStoreIdentifierForCreditCards")]
        public bool ShouldStoreIdentifierForCreditCards
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.InternalTransfers.RecurrenceTypes")]
        public List<RecurrenceType> InternalTransfersRecurrenceTypes
        {
            get
            {
                var recurrenceTypes = GetListValue() ?? new List<string>();
                var result = new List<RecurrenceType>();

                foreach (var recurrenceType in recurrenceTypes)
                {
                    if (Enum.TryParse(recurrenceType, true, out RecurrenceType type))
                    {
                        result.Add(type);
                    }
                }

                return result;
            }
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.ExternalTransfers.RecurrenceTypes")]
        public List<RecurrenceType> ExternalTransfersRecurrenceTypes
        {
            get
            {
                var recurrenceTypes = GetListValue() ?? new List<string>();
                var result = new List<RecurrenceType>();

                foreach (var recurrenceType in recurrenceTypes)
                {
                    if (Enum.TryParse(recurrenceType, true, out RecurrenceType type))
                    {
                        result.Add(type);
                    }
                }

                return result;
            }
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.CreditCardTransfers.RecurrenceTypes")]
        public List<RecurrenceType> CreditCardTransfersRecurrenceTypes
        {
            get
            {
                var recurrenceTypes = GetListValue() ?? new List<string>();
                var result = new List<RecurrenceType>();

                foreach (var recurrenceType in recurrenceTypes)
                {
                    if (Enum.TryParse(recurrenceType, true, out RecurrenceType type))
                    {
                        result.Add(type);
                    }
                }

                return result;
            }
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.EndOptions")]
        public List<ScheduledTransferEndOption> EndOptions
        {
            get
            {
                var endOptions = GetListValue() ?? new List<string>();
                var result = new List<ScheduledTransferEndOption>();

                foreach (var endOption in endOptions)
                {
                    if (Enum.TryParse(endOption, true, out ScheduledTransferEndOption option))
                    {
                        result.Add(option);
                    }
                }

                return result;
            }
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.OnHost.Enabled")]
        public bool OnHostEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.OnHost.MinVersion")]
        public double OnHostMinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.AutomaticLoanPayments.Enabled")]
        public bool AutomaticLoanPaymentsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.AutomaticLoanPayments.LoanCategories")]
        public List<string> AutomaticLoanPaymentsLoanCategories
        {
            get => GetListValue() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.ShouldUseNewUserInterface")]
        public bool ShouldUseNewUserInterface
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.CanSkipTransferOccurrence")]
        public bool CanSkipTransferOccurrence
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("ScheduledTransfers.CanEditTransferAmount")]
        public bool CanEditTransferAmount
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
