using System;
using JetBrains.Annotations;
using Psi.Data.Models.Domain.Membership.MultiAccountAccess;

namespace Psi.Data.Models.ClientConfigurationModels.Membership
{
    public class MultiAccountAccess : SettingsBaseHelper
    {
        public MultiAccountAccess(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("MultiAccountAccess.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("MultiAccountAccess.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("MultiAccountAccess.MobileEnabled")]
        public bool MobileEnabled
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("MultiAccountAccess.MinimumAndroidVersion")]
        public string MinimumAndroidVersion
        {
            get => GetValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("MultiAccountAccess.MinimumIosVersion")]
        public string MinimumIosVersion
        {
            get => GetValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("MultiAccountAccess.PermissionSource")]
        public MultiAccountAccessPermissionSource PermissionSource
        {
            get => Enum.TryParse(GetValue(), true, out MultiAccountAccessPermissionSource permissionSource)
                ? permissionSource
                : MultiAccountAccessPermissionSource.Database;
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("MultiAccountAccess.LastNameMatching.NumberOfCharactersToMatch")]
        public int LastNameMatchingNumberOfCharactersToMatch
        {
            get => GetIntValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("MultiAccountAccess.Disclosure.ShouldShowLink")]
        public bool DisclosureShouldShowLink
        {
            get => GetBoolValue();
            [UsedImplicitly] set => SetValue(value);
        }

        [SettingKey("MultiAccountAccess.GlobalFeatureAccess")]
        public string GlobalFeatureAccessEncrypted
        {
            get => GetValue();
            [UsedImplicitly] set => SetValue(value);
        }
    }
}