using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.DirectDeposit
{
    public class DirectDepositConfiguration : SettingsBaseHelper
    {
        public DirectDepositConfiguration(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("DirectDeposit.ShowAccountNickname")]
        public bool ShowAccountNickname
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("DirectDeposit.ShowMICRText")]
        public bool ShowMICRText
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("DirectDeposit.ShouldUsePreviousMicr")]
        public bool ShouldUsePreviousMicr
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, show member name on direct deposit information view
        /// </summary>
        [SettingKey("DirectDeposit.ShowMemberName")]
        public bool ShouldShowMemberName
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// comma delimited list of categories to show on the direct deposit information view besides checking accounts with micr numbers. eg: RSA,SDA,IRA 
        /// </summary>
        [SettingKey("DirectDeposit.InformationViewAccountCategories")]
        public List<string> InformationViewAccountCategories
        {
            get => GetListValue();
            set => SetValue(value);
        }
    }
}
