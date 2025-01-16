using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.CreditScoreHistory
{
    public class CreditScoreHistorySettings : SettingsBaseHelper
    {
        private MobileConfigurations.Authentication.Authentication _authentication;

        public CreditScoreHistorySettings(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        public MobileConfigurations.Authentication.Authentication Authentication
        {
            // The value is hardcoded to match the feature public id in the Meta.LayeredSecurityFeature table
            get => _authentication ?? (_authentication = new MobileConfigurations.Authentication.Authentication(new Guid("EE3B99F8-424E-4E3F-9C07-9EF9BE59E617")));
            set => _authentication = value;
        }

        [SettingKey("CreditScore.History.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("CreditScore.History.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("CreditScore.History.MinIosVersion")]
        public string MinIosVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditScore.History.MinAndroidVersion")]
        public string MinAndroidVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditScore.History.TrackingRecordId")]
        public string TrackingRecordId
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditScore.History.SecureMessagingCategory")]
        public string SecureMessagingCategory
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("CreditScore.History.Url")]
        public string Url
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// URL link for the Rate Reduction link on Credit Trends
        /// </summary>
        [SettingKey("CreditScore.History.RateReductionLinkUrl")]
        public string RateReductionLinkUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// URL link for the Bonus Cash / FAQ link on Credit Trends
        /// </summary>
        [SettingKey("CreditScore.History.FaqLinkUrl")]
        public string FaqLinkUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// List of questions for users to select from for secure messaging subject on Credit Trends
        /// </summary>
        [SettingKey("CreditScore.History.Questions")]
        public List<string> Questions
        {
            get => GetJsonValueOrNull<List<string>>() ?? new List<string>();
            set => SetValue(value);
        }
    }
}
