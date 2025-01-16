using System;

namespace Psi.Data.Models.ClientConfigurationModels.Application.Omega
{
    public class OmegaConfiguration : SettingsBaseHelper
    {
        private Feature _features;
        private DocumentArchitectSso _documentArchitectSso;

        public OmegaConfiguration(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Omega.ConfigurationComparison.EnvironmentConnections")]
        public string EnvironmentConnections
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Omega.Homebanking.ResetConfig")]
        public string HomeBankingResetConfigUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Omega.User.DaysUntilPasswordExpires")]
        public int DaysUntilPasswordExpires
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Omega.User.MaxLoginRetryCount")]
        public int MaxLoginRetryCount
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        [SettingKey("Omega.User.MonthsToRestrictPasswordReuse")]
        public int MonthsToRestrictPasswordReuse
        {
            get => Math.Abs(GetIntValue());
            set => SetValue(value);
        }

        [SettingKey("Omega.User.OmegaBaseUrl")]
        public string OmegaBaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        public Feature Features
        {
            get => _features ?? (_features = new Feature(SettingsBase));
            set => _features = value;
        }

        public DocumentArchitectSso DocumentArchitectSso
        {
            get => _documentArchitectSso ?? (_documentArchitectSso = new DocumentArchitectSso(SettingsBase));
            set => _documentArchitectSso = value;
        }
    }
}