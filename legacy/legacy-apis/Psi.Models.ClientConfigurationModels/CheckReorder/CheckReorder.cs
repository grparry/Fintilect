namespace Psi.Data.Models.ClientConfigurationModels.CheckReorder
{
    public class CheckReorder : SettingsBaseHelper
    {
        private HarlandCheckReorder _harlandCheckReorder;
        private MainStreetCheckReorder _mainStreetCheckReorder;

        public CheckReorder(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        public HarlandCheckReorder HarlandCheckReorder
        {

            get => _harlandCheckReorder ?? (_harlandCheckReorder = new HarlandCheckReorder(SettingsBase));
            set => _harlandCheckReorder = value;
        }

        public MainStreetCheckReorder MainStreetCheckReorder
        {

            get => _mainStreetCheckReorder ?? (_mainStreetCheckReorder = new MainStreetCheckReorder(SettingsBase));
            set => _mainStreetCheckReorder = value;
        }

        [SettingKey("CheckReorder.AccountInfoCacheExpirationTimeInHours")]
        public int AccountInfoCacheExpirationTimeInHours
        {
            get => GetIntValue();
            set =>SetValue(value);
        }

        [SettingKey("CheckReorder.JointOwnerOnChecksIsEnabled")]
        public bool JointOwnerOnChecksIsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
