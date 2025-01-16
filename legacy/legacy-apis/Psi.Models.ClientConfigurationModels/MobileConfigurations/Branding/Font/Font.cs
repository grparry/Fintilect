namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Branding.Font
{
    public class Font : SettingsBaseHelper

    {
        private readonly ISettingsBase _settingsBase;
        private FontColor _fontColor;

        public Font(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("Mobile.Branding.Font.FontFamily")]
        public string FontFamily
        {
            get => GetValue();
            set => SetValue(value);
        }

        public FontColor FontColors
        {
            get { return _fontColor ?? (_fontColor = new FontColor(_settingsBase)); }
            set { _fontColor = value; }
        }
    }
}