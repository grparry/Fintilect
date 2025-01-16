namespace Psi.Data.Models.ClientConfigurationModels.PageDisplay
{
    public class PageDisplaySettings : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
	    private jQuerySettings _jQueryettings;

		public PageDisplaySettings(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        /// <summary>
        /// If true, show a string for the NCUA message instead of the logo image. Default: FALSE
        /// </summary>
        [SettingKey("PageDisplay.Footer.ShowNcuaAsText")]
        public bool ShowNcuaAsText
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        public jQuerySettings jQuerySettings
		{
		    get => _jQueryettings ?? (_jQueryettings = new jQuerySettings(_settingsBase));
		    set => _jQueryettings = value;
	    }


	}
}