namespace Psi.Data.Models.ClientConfigurationModels.Admin
{
    public class AdminSettings : SettingsBaseHelper
    {
        private AdminAccountSettings _accountSettings;
        private Enrollment _enrollment;
        private MemberSettings _memberSettings;
        private DeviceSettings _deviceSettings;
        private MfaSettings _mfaSettings;
        private AuditLogs _auditLogs;
        private SmsSettings _smsSettings;
        private MemberView _memberView;
        private TransferSettings _transferSettings;

        public AdminSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("X.App.HomeBanking.AdminPasswordExpires")]
        public bool DoesAdminPasswordExpire
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        public AdminAccountSettings Account
        {
            get => _accountSettings ?? (_accountSettings = new AdminAccountSettings(SettingsBase));
            set => _accountSettings = value;
        }

        public Enrollment Enrollment
        {
            get => _enrollment ?? (_enrollment = new Enrollment(SettingsBase));
            set => _enrollment = value;
        }

        public MemberSettings Member
        {
            get => _memberSettings ?? (_memberSettings = new MemberSettings(SettingsBase));
            set => _memberSettings = value;
        }

        public DeviceSettings Device
        {
            get => _deviceSettings ?? (_deviceSettings = new DeviceSettings(SettingsBase));
            set => _deviceSettings = value;
        }

        public MfaSettings Mfa
        {
            get => _mfaSettings ?? (_mfaSettings = new MfaSettings(SettingsBase));
            set => _mfaSettings = value;
        }

        public AuditLogs AuditLogs
        {
            get => _auditLogs ?? (_auditLogs = new AuditLogs(SettingsBase));
            set => _auditLogs = value;
        }

        public SmsSettings SmsSettings
        {
            get => _smsSettings ?? (_smsSettings = new SmsSettings(SettingsBase));
            set => _smsSettings = value;
        }

        public MemberView MemberView
        {
            get => _memberView ?? (_memberView = new MemberView(SettingsBase));
            set => _memberView = value;
        }

        public TransferSettings Transfer
        {
            get => _transferSettings ?? (_transferSettings = new TransferSettings(SettingsBase));
            set => _transferSettings = value;
        }
    }
}
