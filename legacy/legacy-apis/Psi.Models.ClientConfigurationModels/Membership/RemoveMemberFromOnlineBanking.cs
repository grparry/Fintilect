namespace Psi.Data.Models.ClientConfigurationModels.Membership
{
    public class RemoveMemberFromOnlineBanking : SettingsBaseHelper
    {
        public RemoveMemberFromOnlineBanking(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("RemoveMemberFromOnlineBanking.ShouldRemoveOnlineBankingFlag")]
        public bool ShouldRemoveOnlineBankingFlag
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
