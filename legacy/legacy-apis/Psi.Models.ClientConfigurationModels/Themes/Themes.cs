namespace Psi.Data.Models.ClientConfigurationModels.Themes
{
    public class Themes : SettingsBaseHelper
    {
	    private ConnectNative _connectNative;
	    private ISettingsBase _settingsBase;

		public Themes(ISettingsBase settingsBase) : base(settingsBase)
		{
			_settingsBase = settingsBase;
		}

	    public ConnectNative ConnectNative
		{
		    get { return _connectNative ?? (_connectNative = new ConnectNative(_settingsBase)); }
		    set { _connectNative = value; }
	    }
    }
}

