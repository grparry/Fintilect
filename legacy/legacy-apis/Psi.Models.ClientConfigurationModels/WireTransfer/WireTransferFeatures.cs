namespace Psi.Data.Models.ClientConfigurationModels.WireTransfer
{
    public class WireTransferFeatures : SettingsBaseHelper
    {
        public WireTransferFeatures(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// Enables wire transfers with secure messages 2
        /// </summary>
        [SettingKey("WireTransfer.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// min version
        /// </summary>
        [SettingKey("WireTransfer.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Wire Transfer Department 'to' Email Address
        /// </summary>
        [SettingKey("X.App.HomeBanking.WireTransferDeptEmail")]
        public string WireTransferDepartmentToEmail
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Wire Transfer Department 'From' Email Address
        /// </summary>
        [SettingKey("X.App.HomeBanking.gsEmailFrom")]
        public string WireTransferDepartmentFromEmail
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}