namespace Psi.Data.Models.ClientConfigurationModels.Alexa
{
    public class AlexaFeature : SettingsBaseHelper
    {
        public AlexaFeature(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Features.Alexa.AlexaAppEnabled")]
        public bool AlexaAppEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Features.Alexa.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Features.Alexa.ExpirePinAfterXMinutes")]
        public int ExpirePinAfterXMinutes
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Features.Alexa.PinLength")]
        public int PinLength
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }
    }
}

