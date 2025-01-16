using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.SegMint
{
    public class SegMintSettings : SettingsBaseHelper
    {
        public SegMintSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Marketing.SegMint.Secret")]
        public string Secret
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.SegMint.ClientId")]
        public string ClientId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.SegMint.Url")]
        public string Url
        {
            get => GetValue().TrimEnd('/');
            set => SetValue(value);
        }

        [SettingKey("Marketing.SegMint.ZoneId")]
        public string ZoneId
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Mapping from our targeted marketing slot names to SegMint's zone ids.
        /// </summary>
        [SettingKey("Marketing.SegMint.ZoneIdMappings")]
        public Dictionary<string, string> ZoneIdMappings
        {
            get => GetJsonValueOrNull<Dictionary<string, string>>() ?? new Dictionary<string, string>();
            set => SetValue(value);
        }

        /// <summary>
        /// Mapping from SegMint's slot ids to our targeted marketing slot ids.
        /// </summary>
        [SettingKey("Marketing.SegMint.SlotIdMappings")]
        public Dictionary<string, string> SlotIdMappings
        {
            get => GetJsonValueOrNull<Dictionary<string, string>>() ?? new Dictionary<string, string>();
            set => SetValue(value);
        }

        [SettingKey("Marketing.Segmint.ShouldUseMarketingId")]
        public bool ShouldUseMarketingId
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.SegMint.PartnerId")]
        public string PartnerId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.SegMint.MaxOffersToReturn")]
        public int MaxOffersToReturn
        {
            get
            {
                var value = GetIntValue();

                return value <= 0 ? 1 : value;
            }
            set => SetValue(value);
        }

        /// <summary>
        /// This string goes into the data-config-id attribute of the javascript script on Welcome and Dashboard:
        /// </summary>
        [SettingKey("Marketing.SegMint.DataConfigId")]
        public string DataConfigId
        {
            get => GetValue();
            set => SetValue(value);
        }
    }
}
