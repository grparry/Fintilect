using System;
using Psi.Data.Models.ClientConfigurationModels.SegMint;
using Psi.Data.Models.Domain.TargetedMarketing;

namespace Psi.Data.Models.ClientConfigurationModels.Marketing
{
    public class Marketing : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private SegMintSettings _segMintSettings;
        private NextMarketing _nextMarketing;

        public Marketing(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        /// <summary>
        /// Marketing Provider name. Type: Set list.  default: 'TargetingMarketing'
        /// </summary>
        [SettingKey("MarketingProvider.ProviderName")]
        public MarketingProvider Provider
        {
            get
            {
                var value = GetValue();
                if (Enum.TryParse(value, out MarketingProvider provider))
                {
                    return provider;
                }

                return MarketingProvider.TargetedMarketing;
            }
            set => SetValue(value);
        }

        public SegMintSettings SegMintSettings
        {
            get => _segMintSettings ?? (_segMintSettings = new SegMintSettings(_settingsBase));
            set => _segMintSettings = value;
        }

        public NextMarketing NextMarketing
        {
            get => _nextMarketing ?? (_nextMarketing = new NextMarketing(_settingsBase));
            set => _nextMarketing = value;
        }
    }
}
