using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.Address
{
    public class MultipleAddressesSettings : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private MultipleAddressesPage _multipleAddressesPage;

        public MultipleAddressesSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("MultipleAddresses.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("MultipleAddresses.AddressTypes")]
        public List<string> AddressTypes
        {
            get { return GetListValue(); }
            set { SetValue(value); }
        }

        [SettingKey("MultipleAddresses.AddressTypesToBeValidated")]
        public string AddressTypesToBeValidated
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("MultipleAddresses.DefaultAddressType")]
        public string DefaultAddressType
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        public MultipleAddressesPage MvcPage
        {
            get { return _multipleAddressesPage ?? (_multipleAddressesPage = new MultipleAddressesPage(_settingsBase)); }
            set { _multipleAddressesPage = value; }
        }
    }
}
