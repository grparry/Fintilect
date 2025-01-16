using System;

namespace Psi.Data.Models.ClientConfigurationModels.CheckImages
{
    public class CheckImages : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private Validation _validationSettings;

        public CheckImages(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("CheckImages.HideCrossAccountsInAccountsDropDown")]
        public bool HideCrossAccountsInAccountsDropDown
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CheckImages.ShowCrossAccountCheckImages")]
        public bool ShowCrossAccountCheckImages
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public Validation ValidationSettings
        {
            get => _validationSettings ?? (_validationSettings = new Validation(_settingsBase));
            set => _validationSettings = value;
        }

        [SettingKey("CheckImages.SymnetConfiguration")]
        public SimnetConfiguration SimnetConfiguration
        {
            get => GetJsonValueOrNull<SimnetConfiguration>();
            set => SetValue(value);
        }

        [SettingKey("CheckImages.OutputType")]
        public CheckImageOutputTypes OutputType
        {
            get
            {
                var outputType = GetValue();
                if (Enum.TryParse(outputType, true, out CheckImageOutputTypes result))
                {
                    return result;
                }
                return CheckImageOutputTypes.PDF; // If fails to parse, will default to PDF
            }

            set => SetValue(value);
        }

        [SettingKey("CheckImages.CorporateOne.RoutingTransitNumber")]
        public string CorporateOneRoutingTransitNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckImages.CorporateOne.SecurityKey")]
        public string CorporateOneSecurityKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CheckImages.CorporateOne.Url")]
        public string CorporateOneUrl
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
