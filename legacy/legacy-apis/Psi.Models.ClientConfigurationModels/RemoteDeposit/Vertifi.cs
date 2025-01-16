namespace Psi.Data.Models.ClientConfigurationModels.RemoteDeposit
{
	public class Vertifi : SettingsBaseHelper
    {
		public Vertifi(ISettingsBase settingsBase) : base(settingsBase)
        {
		}

        [SettingKey("VertifiDepositOnSuccess")]
        public bool ImmediateDepositUponSuccessfulCheckProcessing
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
		}

        [SettingKey("RemoteDeposit.Vertifi.VersionNumber")]
        public string VersionNumber
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("RemoteDeposit.Vertifi.SharedSecretPassword")]
        public string SharedSecretPassword
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
