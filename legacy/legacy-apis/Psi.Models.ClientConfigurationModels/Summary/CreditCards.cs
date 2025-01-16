namespace Psi.Data.Models.ClientConfigurationModels.Summary
{
    public class CreditCards: SettingsBaseHelper
    {
        public CreditCards(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Summary.CreditCards.IsCreditLimitVisible")]
        public bool IsCreditLimitVisible
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Summary.CreditCards.ShouldShowAvailableInsteadOfCreditLimit")]
        public bool ShouldShowAvailableInsteadOfCreditLimit
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
