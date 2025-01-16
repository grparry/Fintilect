using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.Address
{
    public class MultipleAddressesPage : SettingsBaseHelper
    {
        public MultipleAddressesPage(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("MultipleAddresses.MvcPage.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("MultipleAddresses.MvcPage.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("MultipleAddresses.MvcPage.DeleteAddressEnabled")]
        public bool DeleteAddressEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("MultipleAddresses.MvcPage.AddressTypesThatCanBeDeleted")]
        public List<string> AddressTypesThatCanBeDeleted
        {
            get { return GetListValue(); }
            set { SetValue(value); }
        }
    }
}