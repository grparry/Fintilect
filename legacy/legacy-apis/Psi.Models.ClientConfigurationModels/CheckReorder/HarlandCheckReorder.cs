namespace Psi.Data.Models.ClientConfigurationModels.CheckReorder
{
    public class HarlandCheckReorder : SettingsBaseHelper
    {
        public HarlandCheckReorder(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("CheckReorder.HarlandCheckReorder.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("CheckReorder.HarlandCheckReorder.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("CheckReorder.HarlandCheckReorder.AccountPlanFlagNumber")]
        public string AccountPlanFlagNumber
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("CheckReorder.HarlandCheckReorder.AccountPlanFlagValue")]
        public string AccountPlanFlagValue
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
