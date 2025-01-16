namespace Psi.Data.Models.ClientConfigurationModels.Estatements
{
    public class BitEstatements : SettingsBaseHelper
    {
        public BitEstatements(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Estatements.Bit.ShouldUseFirstStatementAccountForEnrollment")]
        public bool ShouldUseFirstStatementAccountForEnrollment
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}