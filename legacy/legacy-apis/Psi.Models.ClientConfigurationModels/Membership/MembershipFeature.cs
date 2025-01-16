namespace Psi.Data.Models.ClientConfigurationModels.Membership
{
    public class MembershipFeature : SettingsBaseHelper
    {
        private MemberProfile _memberProfile;
        private Flags _flags;

        public MembershipFeature(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Membership.MembershipEnabled")]
        public bool MembershipEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Membership.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }

        [SettingKey("Membership.GetMyCUClubSettingsFromDatabase")]
        public bool GetMyCUClubSettingsFromDatabase
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        public MemberProfile MemberProfile
        {
            get => _memberProfile ?? (_memberProfile = new MemberProfile(SettingsBase));
            set => _memberProfile = value;
        }

        public Flags Flags
        {
            get => _flags ?? (_flags = new Flags(SettingsBase));
            set => _flags = value;
        }

        [SettingKey("X.App.HomeBanking.AllowForeignAddressUpdate")]
        public bool ShouldAllowForeignAddressUpdate
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
    }
}
