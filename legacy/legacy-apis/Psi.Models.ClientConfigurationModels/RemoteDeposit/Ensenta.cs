namespace Psi.Data.Models.ClientConfigurationModels.RemoteDeposit
{
	public class Ensenta : SettingsBaseHelper
    {
		public Ensenta(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("RemoteDeposit.Ensenta.ServiceUrl")]
        public string ServiceUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Sets how long to store Ensenta AccountNumberIndex in Cache
        /// </summary>
        [SettingKey("RemoteDeposit.Ensenta.DepositAccountIdentifierCacheExpireInMinutes")]
        public int DepositAccountIdentifierCacheExpireInMinutes
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }
    }
}