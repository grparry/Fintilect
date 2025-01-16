using System.Collections.Generic;
using Newtonsoft.Json;
using Psi.Business.ServiceContracts.RequestResponse;
using Psi.Business.ServiceContracts.RequestResponse.Configuration;

namespace Psi.Data.Models.ClientConfigurationModels.Themes
{
    public class ConnectNative : SettingsBaseHelper
    {
        public ConnectNative(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Themes.ConnectNative.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Themes.ConnectNative.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Themes.ConnectNative.DeployedThemes")]
        public List<string> DeployedThemes
        {
            get => GetListValue();
            set => SetValue(value);
        }

        [SettingKey("Themes.ConnectNative.UseVersionBundles")]
        public bool UseVersionBundles
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Themes.ConnectNative.BrowserThemes")]
        public List<string> BrowserThemes
        {
            get => GetListValue();
            set => SetValue(value);
        }

        [SettingKey("Themes.ConnectNative.UseRelativeSitePathForThemesFiles")]
        public bool UseRelativeSitePathForThemesFiles
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Themes.ConnectNative.ThemesFilesPath")]
        public string ThemesFilesPath
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Themes.ConnectNative.BaseThemeSubThemesFilesPath")]
        public string BaseThemeSubThemesFilesPath
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// The field on the core where the credit union may set a default Connect Native theme name for a user
        /// </summary>
        [SettingKey("Themes.ConnectNative.CoreAttributeTheme.MemoNumber")]
        public string CoreAttributeThemeMemoNumber
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        

        public string DeployedThemesWithTitles
        {
            get
            {
                var request = new PsiRequest(0)
                {
                    JsonPayload = JsonConvert.SerializeObject(DeployedThemes),
                    MethodKey = PsiMethodType.GetThemeNamesForThemeIds
                };

                return Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(request).Payload;
            }
        }

        public string BrowserThemesWithTitles
        {
            get
            {
                var request = new PsiRequest(0)
                {
                    JsonPayload = JsonConvert.SerializeObject(BrowserThemes),
                    MethodKey = PsiMethodType.GetThemeNamesForThemeIds
                };

                return Business.ServiceContracts.RequestResponse.Utilities.Agatha.Get<PsiBasicResponse>(request).Payload;
            }
        }
    }
}

