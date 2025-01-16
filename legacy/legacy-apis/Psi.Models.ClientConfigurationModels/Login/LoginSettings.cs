using System;
using Psi.Data.Models.Domain.UserOptions;
namespace Psi.Data.Models.ClientConfigurationModels.Login
{
    public class LoginSettings : SettingsBaseHelper
    {
        public LoginSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// This utilizes the key in omega, but subtracts one because of the logic that previously utilized it.
        /// Previously the user had 3 login attempts, but the logic was checking against 2.  So we're allowing the
        /// PM to use a nicely named variable, then converting it to show the default of 2 when they intend 3
        /// </summary>
        [SettingKey("Features.Login.LoginFailuresBeforeLockingAccount")]
        public int LoginFailuresBeforeLockingAccountMinusOne
        {
            get
            {
                // Don't allow values less than 1, if misconfigured set to 2 (aka 3 attempts) 
                var setValue = GetIntValue();
                return setValue < 1 ? 2 : setValue - 1;
            }
            set => SetValue(value);
        }

        [SettingKey("Features.Login.ConnectNativeLandingPageUrl")]
        public string ConnectNativeLandingPageUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Features.Login.ConnectNativeLoginRedirectChoiceType")]
        public ConnectNativeLoginRedirectChoiceType ConnectNativeLoginRedirectChoiceType
        {
            get
            {
                var setValue = GetValue();
                return Enum.TryParse(setValue, true, out ConnectNativeLoginRedirectChoiceType serviceType) ? serviceType : ConnectNativeLoginRedirectChoiceType.Off;
            } 
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.UsePlainTextPwd")]
        public bool UsePlainTextPassword
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Features.Login.EnableLoginStatusReasonEncryption")]
        public bool EnableLoginStatusEncryption
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.CredentialsStorageMethod")]
        public string CredentialStorageMethod
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.AccountNumberAliasRequired")]
        public bool AccountNumberAliasRequired
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.DisableLoginWithAccountNumber")]
        public bool DisableLoginWithAccountNumber
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBBOL.AllowSSNInsteadOfCall24")]
        public bool AllowSSNInsteadOfCall24
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}