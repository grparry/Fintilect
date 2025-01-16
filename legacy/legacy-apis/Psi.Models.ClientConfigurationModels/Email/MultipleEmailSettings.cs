using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.Email
{
    public class MultipleEmailSettings : SettingsBaseHelper
    {
        public MultipleEmailSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("MultipleEmailAddresses.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("MultipleEmailAddresses.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        
        [SettingKey("MultipleEmailAddresses.EmailTypes")]
        public List<string>EmailTypes
        {
            get { return GetListValue(); }
            set { SetValue(string.Join(",", value)); }
        }

        [SettingKey("MultipleEmailAddresses.EmailTypesThatCanBeDeleted")]
        public List<string> EmailTypesThatCanBeDeleted
        {
            get { return GetListValue(); }
            set { SetValue(string.Join(",", value)); }
        }

        [SettingKey("MultipleEmailAddresses.DefaultEmailType")]
        public string DefaultEmailType
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}