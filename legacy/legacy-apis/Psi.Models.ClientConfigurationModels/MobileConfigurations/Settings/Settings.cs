using System;
using Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings.ChangeUserInformation;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Settings
{
    public class Settings : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private ResetPassword _resetPassword;
        private Notifications.Notifications _notifications;
        private AtmLocator.AtmLocator _atmLocator;
        private Boku.BokuSettings _bokuSettings;
        private ChangeAddress _changeAddress;
        private ChangeEmail _changeEmail;
        private TieredAccessAdmin _tieredAccessAdmin;
        private ChangePhoneNumbers _changePhoneNumbers;
        private Authentication.Authentication _authentication;

        public Settings(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.Settings.IsLogoutButtonEnabled")]
        public bool IsLogoutButtonEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public ResetPassword ResetPassword
        {
            get => _resetPassword ?? (_resetPassword = new ResetPassword(_settingsBase));
            set => _resetPassword = value;
        }

        public Notifications.Notifications Notifications
        {
            get => _notifications ?? (_notifications = new Notifications.Notifications(_settingsBase));
            set => _notifications = value;
        }

        public AtmLocator.AtmLocator AtmLocator
        {
            get => _atmLocator ?? (_atmLocator = new AtmLocator.AtmLocator(_settingsBase));
            set => _atmLocator = value;
        }

        public Boku.BokuSettings BokuPhoneVerification
        {
            get => _bokuSettings ?? (_bokuSettings = new Boku.BokuSettings(_settingsBase));
            set => _bokuSettings = value;
        }

        public ChangeAddress ChangeAddress
        {
            get => _changeAddress ?? (_changeAddress = new ChangeAddress(_settingsBase));
            set => _changeAddress = value;
        }

        public ChangeEmail ChangeEmail
        {
            get => _changeEmail ?? (_changeEmail = new ChangeEmail(_settingsBase));
            set => _changeEmail = value;
        }

        public TieredAccessAdmin TieredAccessAdmin
        {
            get => _tieredAccessAdmin ?? (_tieredAccessAdmin = new TieredAccessAdmin(_settingsBase));
            set => _tieredAccessAdmin = value;
        }

        public ChangePhoneNumbers ChangePhoneNumbers
        {
            get => _changePhoneNumbers ?? (_changePhoneNumbers = new ChangePhoneNumbers(_settingsBase));
            set => _changePhoneNumbers = value;
        }

        public Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new Authentication.Authentication(new Guid("E263862B-A57B-441D-A511-B1B6E46A8A1B")));
            set => _authentication = value;
        }
    }
}
