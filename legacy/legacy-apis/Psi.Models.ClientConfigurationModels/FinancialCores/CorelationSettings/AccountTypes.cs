using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class AccountTypes : SettingsBaseHelper
    {
        public AccountTypes(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.MoneyMarketShareCategorySerial")]
        public List<string> MoneyMarketShareCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.PrimarySavingsShareCategorySerial")]
        public List<string> PrimarySavingsShareCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.CheckingShareCategorySerial")]
        public List<string> CheckingShareCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.InvestmentShareCategorySerial")]
        public List<string> InvestmentShareCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.CertificateShareCategorySerial")]
        public List<string> CertificateShareCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.LineOfCreditLoanCategorySerial")]
        public List<string> LineOfCreditLoanCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.CreditCardLoanCategorySerial")]
        public List<string> CreditCardLoanCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.AutoLoanCategorySerial")]
        public List<string> AutoLoanCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.MortgageLoanCategorySerial")]
        public List<string> MortgageLoanCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.LoanCategorySerial")]
        public List<string> LoanCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        /// <summary>
        /// This identifies if a share is a business account. Do not use this to set account category.
        /// Use BusinessSavingsShareCategorySerialForCategoryMapping instead.
        /// </summary>
        [SettingKey("FinacialCore.Corelation.AccountTypes.BusinessSavingsShareCategorySerial")]
        public List<string> BusinessSavingsShareCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.DepositShareCategorySerial")]
        public List<string> DepositShareCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.ExternalMortgageLoanCategorySerial")]
        public List<string> ExternalMortgageLoanCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        [SettingKey("FinacialCore.Corelation.AccountTypes.DebitCardCategorySerial")]
        public List<string> DebitCardCategorySerial
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }

        /// <summary>
        /// We needed to add this setting so we can use this to change the category returned from the core
        /// because BusinessSavingsShareCategorySerial is only used to indicate if a share is a business account.
        /// </summary>
        [SettingKey("FinacialCore.Corelation.AccountTypes.BusinessSavingsShareCategorySerialForCategoryMapping")]
        public List<string> BusinessSavingsShareCategorySerialForCategoryMapping
        {
            get => GetListValue();
            set => SetValue(string.Join(",", value));
        }
    }
}