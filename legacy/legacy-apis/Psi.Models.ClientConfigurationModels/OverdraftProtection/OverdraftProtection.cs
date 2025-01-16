using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.OverdraftProtection
{
    public class OverdraftProtectionSettings : SettingsBaseHelper
    {
        public OverdraftProtectionSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// enabled bool
        /// </summary>
        [SettingKey("OverdraftProtection.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// minversion
        /// </summary>
        [SettingKey("OverdraftProtection.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// if true, use serial types (Corelation) for courtesy pay
        /// </summary>
        [SettingKey("OverdraftProtection.UseSerialTypesForCourtesyPay")]
        public bool ShouldUseSerialTypesForCourtesyPay
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// comma-delimited string of courtesy pay eligible serial types returned as a list of strings
        /// </summary>
        [SettingKey("OverdraftProtection.SerialTypesForCourtesyPay")]
        public List<string> SerialTypesForCourtesyPay
        {
            get { return GetListValue(); }
            set { SetValue(value); }
        }

        [SettingKey("OverdraftProtection.CourtesyPay.Enabled")]
        public bool CourtesyPayEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
