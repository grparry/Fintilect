using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.Cardlytics
{
    public class CardlyticsSettings : SettingsBaseHelper
    {
        public CardlyticsSettings(ISettingsBase settingsBase): base(settingsBase)
        {
        }

        [SettingKey("X.App.HomeBanking.CardlyticsEnabled")]
        public bool CardlyticsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HBAdminBOL.CardlyticsEnabled")]
        public bool AdminCardlyticsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CardlyticsAccountTypes")]
        public List<string> CardlyticsAccountTypes
        {
            get => GetListValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, then show the 'update redemption suffix' row in the get Member view in Admin
        /// </summary>
        [SettingKey("Cardlytics.Admin.ShowSuffixUpdateRowInAdmin")]
        public bool ShouldShowSuffixUpdateRowInAdmin
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Specifies the version of jQuery to use with the Cardlytics provided javascript.
        /// </summary>
        [SettingKey("Cardlytics.jQuery.Version")]
        public string JQueryVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Cardlytics.DomInjectionVersion.Enabled")]
        public bool DomInjectionVersionEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Cardlytics.DomInjectionVersion.MainScriptName")]
        public string MainScriptName
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Cardlytics.DomInjectionVersion.ConfigScriptName")]
        public string ConfigScriptName
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Cardlytics.DomInjectionVersion.InitScriptName")]
        public string InitScriptName
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Cardlytics.DomInjectionVersion.FiFolder")]
        public string FiFolder
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Cardlytics.DomInjectionVersion.OpsServerUrl")]
        public string OpsServerUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Cardlytics.DomInjectionVersion.JQueryVersion")]
        public string DomInjectionVersionJQueryVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Cardlytics.DomInjectionVersion.VueVersion")]
        public string VueVersion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
