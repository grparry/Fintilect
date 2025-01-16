namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Activation
{
	public class Activation : SettingsBaseHelper
    {
		public Activation(ISettingsBase settingsBase) : base(settingsBase)
        {
		}

        [SettingKey("Mobile.Activation.MaximumActivationAttempsAllowed")]
        public string MaximumActivationAttempsAllowed
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Activation.AndroidIosMinimumVersionsEnabled")]
        public bool AndroidIosMinimumVersionsEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Mobile.Activation.OutOfWalletEnabled")]
        public bool OutOfWalletEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
