namespace Psi.Data.Models.ClientConfigurationModels.Estatements
{
    public class NcpEstatements : SettingsBaseHelper
    {
        public NcpEstatements(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Estatements.NcpEstatements.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.NcpEstatements.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.NcpEstatements.UserId")]
        public string UserId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.NcpEstatements.Password")]
        public string Password
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.NcpEstatements.SharedSecret")]
        public string SharedSecret
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.NcpEstatements.PostUrl")]
        public string PostUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.NcpEstatements.SsoUrl")]
        public string SsoUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.NcpEstatements.PadAccountNumberCount")]
        public int PadAccountNumberCount
        {
            get => GetIntValue();
            set => SetValue(value);
        }
    }
}