using System;
using System.Security.Cryptography.X509Certificates;
using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.History
{
    public class CardHistory : SettingsBaseHelper
    {
        public CardHistory(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("History.Card.ShowPendingTransactionsFirst")]
        public bool ShowPendingTransactionsFirst
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     Enables/Disables the ability to use the date range
        ///     field to search through credit card history
        /// </summary>
        [SettingKey("History.Card.EnableCardHistoryDateRangeSearch")]
        public bool EnableCardHistoryDateRangeSearch
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     Configuration ID in the SSOConfig table for PSCU SSO
        /// </summary>
        [SettingKey("X.App.HomeBanking.PSCUSSOConfigID")]
        public string PSCUSSOConfigID
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, get Pscu Sso URl instead of EZCardInfo
        /// </summary>
        [SettingKey("History.Card.UsePscuSsoUrl")]
        public bool UsePscuSsoUrl
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, card transactions that are Pending will be displayed as neutral (black and positive)
        /// </summary>
        [SettingKey("History.Card.ShouldSetPendingTransactionAmountAsNeutral")]
        public bool ShouldSetPendingTransactionAmountAsNeutral
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     Base Url for use with the Fiserv API Card History
        /// </summary>
        [SettingKey("History.Card.Fiserv.ApiBaseUrl")]
        public string FiservApiBaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     API Endpoint for use with Fiserv Card History API. Use this API endpoint to get a security token.
        /// </summary>
        [SettingKey("History.Card.Fiserv.TokenCreateApiEndpoint")]
        public string FiservTokenCreateApiEndpoint
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     UserId used with the Fiserv Card History API
        /// </summary>
        [SettingKey("History.Card.Fiserv.UserId")]
        public string FiservUserId
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     Password used with the Fiserv Card History API
        /// </summary>
        [SettingKey("History.Card.Fiserv.Password")]
        public string FiservPassword
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     An Id used with Fiserv Card History API
        /// </summary>
        [SettingKey("History.Card.Fiserv.x500Id")]
        public string Fiservx500Id
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     Certificate Store location of Fiserv API certificate
        /// </summary>
        [SettingKey("History.Card.Fiserv.CertificateStore")]
        public System.Security.Cryptography.X509Certificates.StoreName FiservCertificateStore
        {
            get => Enum.TryParse(GetValue(), out StoreName store) ? store : StoreName.My;
            set => SetValue(value);
        }

        /// <summary>
        ///     Fiserv API certificate thumbprint
        /// </summary>
        [SettingKey("History.Card.Fiserv.CertificateThumbPrint")]
        public string FiservCertificateThumbPrint
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     When enabled, will run the Fiserv Card History API in debug mode
        /// </summary>
        [SettingKey("History.Card.Fiserv.DebugModeEnabled")]
        public bool FiservDebugModeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     API Endpoint for use with Fiserv Card History API. Use this API endpoint to get card transactions.
        /// </summary>
        [SettingKey("History.Card.Fiserv.StatementDetailsApiEndpoint")]
        public string FiservStatementDetailsApiEndpoint
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// API Endpoint for use with Fiserv Card History API. Use this API endpoint to get customer details (credit limit, current balance, etc).
        /// </summary>
        [SettingKey(("History.Card.Fiserv.CustomerInquiryApiEndpoint"))]
        public string FiservCustomerInquiryApiEndpoint
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("History.Card.Pscu.ShouldShowDateForPendingTransactions")]
        public bool PscuShouldShowDateForPendingTransactions
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("History.Card.Pscu.SsoEnabled")]
        public bool PscuSsoEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("History.Card.Fiserv.Cycle")]
        public FiservCardHistoryCycleTypes FiservCycle
        {
            get
            {
                FiservCardHistoryCycleTypes type;
                Enum.TryParse(GetValue(), out type);
                return type;
            }
            set { SetValue(value); }
        }
    }
}