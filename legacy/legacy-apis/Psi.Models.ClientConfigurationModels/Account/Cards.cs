
using System;
using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class Cards : SettingsBaseHelper
    {
        public Cards(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Cards.PscuRightTime.Enabled")]
        public bool PscuRightTimeEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true we will show the next payment due date on the summary page
        /// </summary>
        [SettingKey("Cards.ShouldShowPaymentDueDateForCreditCards")]
        public bool ShouldShowPaymentDueDateForCreditCards
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Cards.PscuRightTime.MerchantNumber")]
        public string PscuRightTimeMerchantNumber
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Base64 Encoded string used to encryped/decrypt a credit card number
        /// </summary>
        /// <remarks>String 32 characters long and then Base64 encode it</remarks>
        [SettingKey("Cards.EncryptionKey")]
        public string EncryptionKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CreditCardSSOType")]
        public CreditCardSsoProvider CreditCardSsoProvider
        {
            get
            {
                var value = GetValue();

                if (string.IsNullOrWhiteSpace(value))
                {
                    return CreditCardSsoProvider.None;
                }

                value = value.Replace(".", string.Empty);

                return Enum.TryParse(value, true, out CreditCardSsoProvider provider) ? provider : CreditCardSsoProvider.None;
            }
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CreditCardExternalLink")]
        public string CreditCardSsoExternalLink
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.HouseholdingCreditCardSSO")]
        public bool HouseholdingCreditCardSsoEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.CreditCardSsoDisplayType")]
        public bool CreditCardSsoShouldOpenInNewWindow
        {
            get => GetValue()?.Trim().ToUpper() == "POPUP";
            set => SetValue(value);
        }

        [SettingKey("Mobile.Accounts.CreditCards.ShouldLoadSsoDirectly")]
        public bool CreditCardsShouldLoadSsoDirectly
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.ShowCreditCardBalances")]
        public bool ShowCreditCardBalances
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
