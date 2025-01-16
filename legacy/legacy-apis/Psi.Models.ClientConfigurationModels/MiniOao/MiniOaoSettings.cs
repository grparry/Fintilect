namespace Psi.Data.Models.ClientConfigurationModels.MiniOao
{
    public class MiniOaoSettings : SettingsBaseHelper
    {
        public MiniOaoSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("MiniOao.ConnectAccountOpening.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MiniOao.ConnectAccountOpening.MinimumVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, then show the 'add joint owners' view in the new account opening wizard
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.ShouldShowJointOwners")]
        public bool ShouldShowJointOwners
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, allow the creation of a new Joint Owner
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.AddNewJointOwner.Enabled")]
        public bool AddNewJointOwnerEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, pre-check all Joint Owners during the new account creation process for a new account that is being created
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.ShouldSelectAllJointAccountsByDefaultOnNewAccountCreation")]
        public bool ShouldSelectAllJointAccountsByDefaultOnNewAccountCreation
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, allow the ability to create a new Joint-Owner during the account creation process
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.AllowCreateNewJointOwnerDuringAccountCreation")]
        public bool AllowCreateNewJointOwnerDuringAccountCreation
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, allow the ability to fund a new account during the account creation process
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.AllowNewAccountFunding")]
        public bool AllowNewAccountFunding
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, warn the user that they have not selected any debit cards for any of the Joint-Owners during the new
        ///     account creation process
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.ShouldWarnUserIfNoDebitCardSelected")]
        public bool ShouldWarnUserIfNoDebitCardSelected
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, enable the use of Promo Codes during the new account creation process
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.PromoCodesEnabled")]
        public bool PromoCodesEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, then the user must accept a disclosure when creating a new Account during the new account creation process
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.ForceNewAccountOpeningDisclosure")]
        public bool ForceNewAccountOpeningDisclosure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, then the user must accept a disclosure when creating a new Joint Owner during the new account creation
        ///     process
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.ForceAddNewJointOwnerDisclosure")]
        public bool ForceAddNewJointOwnerDisclosure
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MiniOao.ConnectAccountOpening.AdapiUrl")]
        public string AdapiUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, will use Mock Data instead of reaching out to OAO.
        /// </summary>
        /// <remarks>
        ///     Since we do not have OAO hosted on dev machines, this lets us flip a switch to go between testing against OAO
        ///     and testing against Mock data without needing to recompile
        /// </remarks>
        [SettingKey("MiniOao.ConnectAccountOpening.ShouldUseMockData")]
        public bool ShouldUseMockData
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        ///     If true, will return Cross accounts when retrieving FundingAccounts
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.CanFundFromCrossAccounts")]
        public bool CanFundFromCrossAccount
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MiniOao.ConnectAccountOpening.DebitCardProductId")]
        public int DebitCardProductId
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, require id info (dl/id card, issue date & expire date) to be filled out on the 'add joint owner' form in accountOpening/AccountOpening mvc view in HomeBanking
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.RequireIdInfoOnAddJointOwner")]
        public bool RequireIdInfoOnAddJointOwner
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, require employer info to be filled out on the 'add joint owner' form in accountOpening/AccountOpening mvc view in HomeBanking
        /// </summary>
        [SettingKey("MiniOao.ConnectAccountOpening.RequireEmployerInfoOnAddJointOwner")]
        public bool RequireEmployerInfoOnAddJointOwner
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("MiniOao.ConnectAccountOpening.SecureMessageCategory")]
        public string SecureMessageCategory
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}