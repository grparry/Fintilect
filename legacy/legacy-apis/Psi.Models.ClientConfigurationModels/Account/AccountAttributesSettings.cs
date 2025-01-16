using System.Collections.Generic;
using System.Linq;

namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class AccountAttributesSettings : SettingsBaseHelper
    {
        public AccountAttributesSettings(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        [SettingKey("Account.Attributes.Enabled")]
        public bool AccountAttributesEnabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

	    [SettingKey("Account.Attributes.CheckingRewardsShareDescriptions")]
	    public List<string> CheckingRewardsShareDescriptions
		{
		    get { return (GetValue() ?? string.Empty).Split(',').Where(x => !string.IsNullOrEmpty(x)).ToList(); }
		    set { SetValue(string.Join(",", value)); }
	    }

		[SettingKey("Account.Attributes.CheckingRewardsShareCategories")]
		public List<string> CheckingRewardsShareCategories
		{
			get { return (GetValue() ?? string.Empty).Split(',').Where(x => !string.IsNullOrEmpty(x)).ToList(); }
			set { SetValue(string.Join(",", value)); }
	    }

		/// <summary>
		/// Determine whether or not to show leading zero's in suffixes.
		/// </summary>
		[SettingKey("X.App.HomeBanking.ShowZeroPrefixOfSuffix")]
		public bool ShowZeroPrefixOfSuffix
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}

	}
}