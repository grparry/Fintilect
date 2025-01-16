namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class DebitCards : SettingsBaseHelper
    {
        public DebitCards(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Accounts.DebitCards.ShouldChangeExpirationDateToEndOfPreviousMonth")]
        public bool ShouldChangeExpirationDateToEndOfPreviousMonth
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("PersonPayments.Payzur.DebitCardsExpireActualDate")]
        public bool ExpiresAtStartOfMonth
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
