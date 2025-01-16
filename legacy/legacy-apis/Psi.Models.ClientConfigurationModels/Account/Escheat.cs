namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class Escheat : SettingsBaseHelper
    {
        public Escheat(ISettingsBase settingsBase) : base(settingsBase)
        {
        }


        /// <summary>
        /// If true, enable update escheat date feature
        /// </summary>
        [SettingKey("Escheat.UpdateEscheatDate.Enabled")]
        public bool IsUpdateEscheatDateEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Flag Number for escheat date account
        /// </summary>
        [SettingKey("Escheat.UpdateEscheatDate.FlagNumber")]
        public string EscheatDateFlagNumber
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Flag Number for escheat date account
        /// </summary>
        [SettingKey("Escheat.UpdateEscheatDate.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }
    }
}
