using System;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Transfers
{
    public class Transfers : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private SavedTransfers _savedTransfers;
        private ScheduledTransfersSettings _scheduledTransfers;
        private Authentication.Authentication _authentication;

        public Transfers(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }
        
        [SettingKey("Mobile.Transfers.ShouldShowConfirmDialog")]
        public bool ShouldShowConfirmDialog
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        [SettingKey("X.App.HomeBanking.UserTransferDescriptionType")]
        public string UserTransferDescriptionType
        {
            get => GetValue();
            set => SetValue(value);
        }
        
        [SettingKey("X.App.HBBOL.EnableUserTransferDescription")]
        public bool EnableUserTransferDescription
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.PastDueNumberOfDaysUntilLate")]
        public int PastDueNumberOfDaysUntilLate
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.HighlightPastDueLoans")]
        public bool HighlightPastDueLoans
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.Transfer.ShowMaskedAccountSuffixInAccountName")]
        public bool ShowMaskedAccountSuffixInAccountName
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public SavedTransfers SavedTransfers
        {
            get => _savedTransfers ?? (_savedTransfers = new SavedTransfers(_settingsBase));
            set => _savedTransfers = value;
        }

        public ScheduledTransfersSettings ScheduledTransfers
        {
            get => _scheduledTransfers ?? (_scheduledTransfers = new ScheduledTransfersSettings(_settingsBase));
            set => _scheduledTransfers = value;
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new Authentication.Authentication(new Guid("82EAFFC2-7056-49D8-AE4B-CB53331E09C7")));
            set => _authentication = value;
        }
    }
}
