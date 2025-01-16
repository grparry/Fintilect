using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.History
{
    public class AccountHistory : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private DisplayCheckHolds _displayCheckHolds;
        private LinkedAccountHistory _linkedAccountHistory;

        public AccountHistory(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public DisplayCheckHolds DisplayCheckHolds
        {
            get => _displayCheckHolds ?? (_displayCheckHolds = new DisplayCheckHolds(_settingsBase));
            set => _displayCheckHolds = value;
        }

        public LinkedAccountHistory LinkedAccounts
        {
            get => _linkedAccountHistory ?? (_linkedAccountHistory = new LinkedAccountHistory(_settingsBase));
            set => _linkedAccountHistory = value;
        }


        [SettingKey("AccountHistoryDisplaySettings.IsOrderedBySequenceNumber")]
        public bool IsOrderedBySequenceNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistoryDisplaySettings.MortgagePaymentHistoryIncludesEscrowInfoEnabled")]
        public bool MortgagePaymentHistoryIncludesEscrowInfoEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If True, we will add 4 days to the end date of the escrow history date range selector.
        /// Default value is 'true'
        /// </summary>
        [SettingKey("EscrowHistory.ShouldAddDaysToEndDate")]
        public bool ShouldAddDaysToEndDate
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistoryDisplaySettings.DisplayMortgagePaymentEscrowDetails")]
        public bool DisplayMortgagePaymentEscrowDetails
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistory.DisplaySettings.ShowPendingPaymentPostDate")]
        public bool ShowPendingPaymentPostDate
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistoryDisplaySettings.ShowExtraInfoInRowInsteadOfPopover")]
        public bool ShouldShowExtraInfoInRowInsteadOfPopover
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        [SettingKey("AccountHistoryDisplaySettings.ShowAvailableBalanceMessagePopover")]
        public bool ShouldShowAvailableBalanceMessagePopover
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistoryDisplaySettings.ShowAvailableBalanceMessagePopoverOnlyForShares")]
        public bool ShouldShowAvailableBalanceMessagePopoverOnlyForShares
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistory.ShouldOpenMoreDetailsInExternalWebBrowser")]
        public bool ShouldOpenMoreDetailsInExternalWebBrowser
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistory.PendingTransactionTypeDisplayNames")]
        public Dictionary<string, string> PendingTransactionTypeDisplayNames
        {
            get => GetJsonValueOrNull<Dictionary<string, string>>() ?? new Dictionary<string, string>();
            set => SetValue(JsonConvert.SerializeObject(value));
        }

        [SettingKey("AccountHistoryDisplaySettings.ShowAvailableBalanceInBoldFont")]
        public bool ShouldShowAvailableBalanceInBoldFont
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// if true, enable the showing of the point of sale/atm transaction message on the history page in online banking
        /// </summary>
        [SettingKey("AccountHistoryDisplaySettings.ShowPointOfSaleOrAtmTransactionMessage")]
        public bool ShouldShowPointOfSaleOrAtmTransactionMessage
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// point of sale/atm transaction message account categories. comma delimited list. default: CACK,CPLC,CHSA,CCKG,BBEC,BBBC,BBAC,BNPC
        /// </summary>
        [SettingKey("AccountHistoryDisplaySettings.PointOfSaleOrAtmTransactionAccountCategories")]
        public List<string> PointOfSaleOrAtmTransactionAccountCategories
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("AccountHistoryDisplaySettings.ShowPendingTransactionsTag")]
        public bool ShowPendingTransactionsTag
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// List of enum hold types that will be displayed when a transaction is pending or on hold
        /// </summary>
        [SettingKey("AccountHistoryDisplaySettings.Symitar.HoldTypes")]
        public List<string> SymitarHoldTypes
        {
            get
            {
                var categories = GetListValue() ?? new List<string>();

                return categories.Where(x => !string.IsNullOrWhiteSpace(x)).ToList();
            }
            set => SetValue(value);
        }

        /// <summary>
        /// Bool value to check whether or not to use the hold types settings when displaying holds
        /// </summary>
        [SettingKey("AccountHistoryDisplaySettings.Symitar.CheckHoldTypesEnabled")]
        public bool SymitarCheckHoldTypesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistory.ObscureSuffixInUrl")]
        public bool ObscureSuffixInUrl
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// if true, use effective date NOT post date
        /// </summary>
        [SettingKey("AccountHistory.UseEffectiveDateInsteadOfPostDate")]
        public bool UseEffectiveDateInsteadOfPostDate
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// if true, show payoff message for Loans/HELOCs even if there is not a payment due
        /// </summary>
        [SettingKey("AccountHistory.ShowPayoffMessageForLoanEvenWhenNoDueDate")]
        public bool ShouldShowPayoffMessageForLoanEvenWhenNoDueDate
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountNumberHistory.Enabled")]
        public bool AccountNumberHistoryEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary> A bool that determines if we should display the PreviousAvailableBalance in each history item.  The data only exists for Symitar, anybody else will just show 0's </summary>
        [SettingKey("AccountHistory.ShouldShowPreviousAvailableBalance")]
        public bool ShouldShowPreviousAvailableBalance
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary> A bool that determines if we should suppress the display of the PreviousAvailableBalance in each history item that is PENDING.  The data only exists for Symitar, anybody else will just show 0's. Default: FALSE </summary>
        [SettingKey("AccountHistory.SuppressPreviousAvailableBalanceForPendingTransactions")]
        public bool SuppressPreviousAvailableBalanceForPendingTransactions
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary> A bool that determines if we should display the PreviousAvailableBalance Popover tip in each history item.  The data only exists for Symitar</summary>
        [SettingKey("AccountHistory.ShowPreviousAvailableMessagePopover")]
        public bool ShowPreviousAvailableMessagePopover
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("AccountHistory.ShowPreviousAvailableBalanceAccountCategories")]
        public List<string> ShowPreviousAvailableBalanceAccountCategories
        {
            get
            {
                var categories = GetListValue() ?? new List<string>();

                return categories.Where(x => !string.IsNullOrWhiteSpace(x)).Select(x => x.ToLower()).ToList();
            }
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("AccountHistory.ShouldExcludePendingTransactionOnExport")]
        public bool ShouldExcludePendingTransactionOnExport
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}