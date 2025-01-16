using System.Collections.Generic;
using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class Transfers : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private AchTransfer _ach;
        private WireTransfer _wire;
        private TransferLimits _transferLimits;
        private AnyMemberTransfers _anyMember;
        private TransferTimeouts _timeouts;

        public Transfers(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public AchTransfer ACH
        {
            get => _ach ?? (_ach = new AchTransfer(_settingsBase));
            set => _ach = value;
        }

        public WireTransfer Wire
        {
            get => _wire ?? (_wire = new WireTransfer(_settingsBase));
            set => _wire = value;
        }

        public TransferLimits TransferLimits
        {
            get => _transferLimits ?? (_transferLimits = new TransferLimits(_settingsBase));
            set => _transferLimits = value;
        }

        [SettingKey("Transfers.CustomTransferLimitMessagesEnabled")]
        public bool CustomTransferLimitMessagesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.DisplayTransferLimitOnError")]
        public bool DisplayTransferLimitOnError
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.ShowShareLoanIds")]
        public bool ShowShareLoanIds
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Transfers.LimtInExcessTransferToCards")]
        public bool LimtInExcessTransferToCards
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Gets or sets a value indicating whether scheduled transfer open end date is disabled for daily transfers.  If this value if false (the default)
        /// The no end date option will be available to users.  
        /// </summary>
        [SettingKey("Transfers.ScheduledTransferIsOpenEndDateDisabledForDaily")] //TODO: Add this key to the database.
        public bool ScheduledTransferIsOpenEndDateDisabledForDaily
        {
            get => GetBoolValue();

            set => SetValue(value);
        }

        [SettingKey("Transfers.AllowLoanToLoanTransfers")]
        public bool AllowLoanToLoanTransfers
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Loans that have a category that matches one of the categories in this list will be treated as mortgage loans by the transfers widget and transfers2.
        /// </summary>
        /// <remarks>
        /// This is used to determine whether or not to display a message about transferring to a mortgage on the transfer page.
        /// </remarks>
        [SettingKey("Transfers.MortgageLoanCategories")]
        public List<string> MortgageLoanCategories
        {
            get => GetListValue();
            set => SetValue(value);
        }

        [SettingKey("Admin.ScheduledTransfers.HideEndDateOption")]
        public bool HideEndDateOption
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Allows users to make scheduled payments greater than their payoff amount
        ///True - Can overpay
        ///False - Cannot Overpay, if Payment Amount is greater than Payoff Amount, Payment Amount will be set to the Payoff Amount or 0 if Payoff Amount is 0
        /// </summary>
        [SettingKey("Transfers.AllowPaymentsGreaterThanPayoffAmount")]
        public bool AllowPaymentsGreaterThanPayoffAmount
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, hide the previous balance and the previous available on the transfer result screen in the CompletedTransferDetails template
        /// </summary>
        [SettingKey("Transfers.HidePreviousBalanceAndPreviousAvailable")]
        public bool ShouldHidePreviousBalanceAndPreviousAvailable
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, set transfer 'sub items' (is scheduled transfer checkbox, apply extra to principal checkbox, etc) into a separate area that can be expanded and contracted
        /// </summary>
        [SettingKey("Transfers.GroupAdditionalTransferOptions")]
        public bool GroupAdditionalTransferOptions
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, allow members to transfer the balance of their credit card to another card, thus "paying it off". Default: FALSE
        /// </summary>
        [SettingKey("Transfers.AllowBalanceTransferBetweenCreditCards")]
        public bool AllowBalanceTransferBetweenCreditCards
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, send the credit card balance transfer as a secure message to the credit union, instead of an email to the credit union. Default: FALSE
        /// </summary>
        [SettingKey("Transfers.CreditCardBalanceTransfersSendAsSecureMessage")]
        public bool CreditCardBalanceTransfersSendAsSecureMessage
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// the recipient email address for the credit union
        /// </summary>
        [SettingKey("Transfers.CreditCardBalanceTransfersRecipientEmailAddress")]
        public string CreditCardBalanceTransfersRecipientEmailAddress
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, allow members to transfer the balance of their credit card to another cards using PSCU E-Balcon. Default: FALSE
        /// </summary>
        [SettingKey("Transfers.AllowEBalconTransfersBetweenCreditCards")]
        public bool AllowEBalconTransfersBetweenCreditCards
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, allow adjusted 'ToBalance' on Mortgages to be re-calculated by subtracting the interest due amount on the payment. Default: FALSE
        /// </summary>
        [SettingKey("Transfers.AllowAdjustedToBalanceForMortgageTransfersEnabled")]
        public bool AllowAdjustedToBalanceOnMortgageTransfersEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Categories of Mortgages to be considered when calculating the 'ToBalance' when considering interest due.
        /// </summary>
        [SettingKey("Transfers.AdjustedToBalanceForMortgageTransfersCategories")]
        public List<string> MortgageTransfersCategoriesForAdjustedToBalance
        {
            get => GetListValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, then when transfers are viewed, the suffix will be shown for each account
        /// </summary>
        [SettingKey("Transfers.SuffixLabelEnabled")]
        public bool SuffixLabelEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, then the member will be presented with buttons/options to navigate to after a transfer.
        /// </summary>
        [SettingKey("Transfers.PostTransferNavigationOptionsEnabled")]
        public bool PostTransferNavigationOptionsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Categories of Mortgages to be considered when calculating the 'ToBalance' when considering interest due.
        /// </summary>
        [SettingKey("X.App.HomeBanking.TransLoanCollateralForBal")]
        public List<string> TransLoanCollateralForBal
        {
            get => GetListValue() ?? new List<string>();
            set => SetValue(value);
        }

        /// <summary>
        /// Categories of Mortgages to be considered when calculating the 'ToBalance' when considering interest due.
        /// </summary>
        [SettingKey("X.App.HomeBanking.TransExternalLoan")]
        public List<string> TransExternalLoan
        {
            get => GetListValue() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsMortgages")]
        public List<string> MortgageCategories
        {
            get => GetListValue() ?? new List<string>();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, then show today's date on the transfer reciept in OLB.
        /// </summary>
        [SettingKey("Transfers.ShowTodaysDateOnTransferReceipt")]
        public bool ShowTodaysDateOnTransferReceipt
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, then show the Transfer Description on the transfer receipt in OLB.
        /// </summary>
        [SettingKey("Transfers.ShowTransferDescriptionOnTransferReceipt")]
        public bool ShowTransferDescriptionOnTransferReceipt
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Admin.ScheduledTransfers.GetHouseholdingAccounts.Enabled")]
        public bool GetHouseholdingAccountsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.AllowCreditCardTransfer")]
        public bool AllowCreditCardTransfer
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.Homebanking.obsTransferToAccounts")]
        public List<string> AllowedTransferToAccountCategories
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.obsTransferFromAccounts")]
        public List<string> AllowedTransferFromAccountCategories
        {
            get => GetListValue()?.Where(x => !string.IsNullOrEmpty(x)).ToList() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("Admin.ScheduledTransfers.NonOlbMember.Enabled")]
        public bool NonOlbMemberEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, then the QuickAction button will allow member to transfer
        /// </summary>
        [SettingKey("Transfers.QuickAction.Enabled")]
        public bool QuickActionEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, then the QuickAction button will have separate To/From transfer options
        /// </summary>
        [SettingKey("Transfers.QuickAction.ToAndFromEnabled")]
        public bool QuickActionToAndFromEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public AnyMemberTransfers AnyMember
        {
            get => _anyMember ?? (_anyMember = new AnyMemberTransfers(_settingsBase));
            set => _anyMember = value;
        }

        public TransferTimeouts Timeouts
        {
            get => _timeouts ?? (_timeouts = new TransferTimeouts(_settingsBase));
            set => _timeouts = value;
        }
    }
}


