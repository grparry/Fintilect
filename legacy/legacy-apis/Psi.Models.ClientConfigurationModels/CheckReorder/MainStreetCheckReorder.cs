namespace Psi.Data.Models.ClientConfigurationModels.CheckReorder
{
    public class MainStreetCheckReorder : SettingsBaseHelper
    {
        public MainStreetCheckReorder(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("CheckReorder.MainStreetCheckReorder.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckReorder.MainStreetCheckReorder.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("CheckReorder.MainStreetCheckReorder.SsoUrl")]
        public string SsoUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckReorder.MainStreetCheckReorder.BankId")]
        public string BankId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckReorder.MainStreetCheckReorder.BranchNumber")]
        public string BranchNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckReorder.MainStreetCheckReorder.UserId")]
        public string UserId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckReorder.MainStreetCheckReorder.Key")]
        public string Key
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}