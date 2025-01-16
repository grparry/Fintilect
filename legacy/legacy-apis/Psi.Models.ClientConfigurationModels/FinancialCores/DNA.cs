namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores
{
    public class DNA : SettingsBaseHelper
    {
        public DNA(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("FinancialCore.DNA.UserField.SuccessfulLoginCoreField")]
        public string SuccessfulLoginCoreField
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The name of the user field in DNA where a comma separated list of statement accounts is stored.  The account numbers stored in that user field
        /// will be available when the user wishes to view eStatements.
        /// 
        /// This config setting is used in DNAAccountInquiry.vb
        /// </summary>
        [SettingKey("FinancialCore.DNA.UserField.ExtraStatementAccounts")]
        public string ExtraStatementAccountsCoreUserField
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.DNA.MapDormantAccounts")]
        public bool MapDormantAccounts
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("FinancialCore.Dna.ValidDebitCardStatusCodes")]
        public string ValidDebitCardStatusCodes
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}