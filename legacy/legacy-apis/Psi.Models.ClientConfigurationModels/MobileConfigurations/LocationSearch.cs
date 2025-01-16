using System;
using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
	public class LocationSearch : SettingsBaseHelper
    {

	    public LocationSearch(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Mobile.LocationSearch.MinimumVersion")]
        public string MinimumVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.LocationSearch.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.LocationSearch.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.LocationSearch.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.LocationSearch.Distance")]
        public int Distance
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.LocationSearch.Provider")]
        public LocationSearchProvider Provider
		{
			get
			{
				LocationSearchProvider type;
				Enum.TryParse(GetValue(), out type);
				return type;
			}
			set => SetValue(value);
        }

        [SettingKey("Mobile.LocationSearch.SupportsStreetLocations")]
        public bool SupportsStreetLocations
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.LocationSearch.SearchKey")]
        public string SearchKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.LocationSearch.SupportsCustomSearchKeys")]
        public bool SupportsCustomSearchKeys
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.LocationSearch.CustomSearchKeysMinimumVersion")]
        public string CustomSearchKeysMinimumVersion
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
