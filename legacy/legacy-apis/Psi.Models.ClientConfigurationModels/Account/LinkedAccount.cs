using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class LinkedAccount : SettingsBaseHelper
    {
        public LinkedAccount(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// True - Add New Linked Account Modal will show on the Linked Account History page
        /// </summary>
        [SettingKey("LinkedAccount.ShouldShowAddNewAccountOnHistoryPage")]
        public bool ShouldShowAddNewAccountOnHistoryPage
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// True - Enable ability to disable a linked account in the Admin tool
        /// </summary>
        [SettingKey("Admin.LinkedAccount.ShouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled")]
        public bool ShouldDisableLinkedAccountWhenNoticeOfChangeReceivedEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Linked accounts encryption key
        /// </summary>
        [SettingKey("X.App.HBBOL.LinkedAccountEncryptionKey")]
        public string LinkedAccountEncryptionKey
        {
            get => GetValue();
            set => SetValue(value);
        }
        
        /// <summary>
        /// Indicates if linked accounts should be retrieved by UUID instead of account number
        /// </summary>
        [SettingKey("LinkedAccount.SearchByUuidEnabled")]
        public bool SearchByUuidEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("LinkedAccounts.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("LinkedAccounts.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("LinkedAccounts.DeleteAccountEnabled")]
        public bool DeleteAccountEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("LinkedAccounts.IntraBankEnabled")]
        public bool IntraBankEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("LinkedAccounts.CrossBankEnabled")]
        public bool CrossBankEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("LinkedAccounts.ShowDeletedAccounts.Enabled")]
        public bool ShowDeletedAccountsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowLinkedAccounts")]
        public bool ShowCfsAccounts
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowLinkedAchAccounts")]
        public bool ShowAchAccounts
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("LinkedAccounts.AccountMaskingCharacter")]
        public char AccountMaskingCharacter
        {
            get
            {
                var value = GetValue();
                return string.IsNullOrWhiteSpace(value) ? 'X' : value.First();
            }
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.ACHGLAccount")]
        public string AchGlAccount
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
