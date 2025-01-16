namespace Psi.Data.Models.ClientConfigurationModels.PersonPayments
{
    public class Payzur : SettingsBaseHelper
    {
        public Payzur(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("PersonPayments.Payzur.SyncCardsEnabled")]
        public bool SyncCardsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        [SettingKey("PersonPayments.Payzur.SyncCardsMinVersion")]
        public double SyncCardsMinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }
        
        [SettingKey("PersonPayments.Payzur.PublicKey")]
        public string PublicKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        //TODO:  This should be a list of objects, and the setting string should be json format so that consumers of this setting don't have to know how to parse it.
        [SettingKey("PersonPayments.Payzur.AccountTypes")]
        public string AccountTypes
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, open person payments in an iFrame, and not in a new tab.
        /// </summary>
        [SettingKey("PersonPayments.Payzur.OpenInIframe")]
        public bool ShouldOpenInIframe
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayments.Payzur.SyncDuplicateCardsEnabled")]
        public bool SyncDuplicateCardsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayments.Payzur.UseOAEP")]
        public bool UseOAEP
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayments.Payzur.SyncAddedCardsEnabled")]
        public bool SyncAddedCardsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayments.Payzur.ShouldSkipCardSyncWhenCoreIsDown")]
        public bool ShouldSkipCardSyncWhenCoreIsDown
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
