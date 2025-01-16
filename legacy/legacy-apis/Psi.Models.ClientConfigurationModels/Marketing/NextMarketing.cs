using System.Collections.Generic;
using Psi.Data.Models.Domain.TargetedMarketing.NextMarketing;

namespace Psi.Data.Models.ClientConfigurationModels.Marketing
{
    public class NextMarketing : SettingsBaseHelper
    {
        public NextMarketing(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Marketing.Next.SlotIdMappings")]
        public Dictionary<string, int> SlotIdMappings
        {
            get => GetJsonValueOrNull<Dictionary<string, int>>() ?? new Dictionary<string, int>();
            set => SetValue(value);
        }

        [SettingKey("Marketing.Next.MaxOffersToReturn")]
        public int MaxOffersToReturn
        {
            get
            {
                var value = GetIntValue();

                return value <= 0 ? 1 : value;
            }
            set => SetValue(value);
        }

        [SettingKey("Marketing.Next.BaseUrl")]
        public string BaseUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.Next.ConnectorKey")]
        public string ConnectorKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.Next.InstanceId")]
        public string InstanceId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.Next.UserName")]
        public string UserName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.Next.Password")]
        public string Password
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.Next.InstitutionCode")]
        public string InstitutionCode
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.Next.VendorId")]
        public string VendorId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Marketing.Next.OffersRequestSettings")]
        public List<OffersRequestSetting> OffersRequestSettings
        {
            get => GetJsonValueOrNull<List<OffersRequestSetting>>() ?? new List<OffersRequestSetting>
            {
                new OffersRequestSetting
                {
                    MaxNumberOfOffers = 3,
                    OfferType = "BasicOffer",
                    SortOrder = 1
                }
            };
            set => SetValue(value);
        }

        [SettingKey("Marketing.Next.ImageBaseUrl")]
        public string ImageBaseUrl
        {
            get => GetValue() ?? string.Empty;
            set => SetValue(value);
        }
    }
}