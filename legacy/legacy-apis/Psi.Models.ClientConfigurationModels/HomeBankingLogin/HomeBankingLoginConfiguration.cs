using System;
using System.Collections.Generic;
using Common.Logging;

namespace Psi.Data.Models.ClientConfigurationModels.HomeBankingLogin
{
	public class HomeBankingLoginConfiguration : SettingsBaseHelper
	{

		public HomeBankingLoginConfiguration(ISettingsBase settingsBase) : base(settingsBase)
		{
		}

		/// <summary>
		/// Allows users to log in during enrollment using the last 4 of any Tax ID (usually SSN) that is associated with an 
		/// owner or joint owner of a member account.  In order to use this setting, 
		/// X.App.HBBOL.AllowSSNInsteadOfCall24 must also be turned on.  
		/// If Tax Ids are allowed for authentication during enrollment, and UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount 
		/// is false, users will only be able to log in during enrollment if they know the last 
		/// 4 of the social of the primary owner of the member account. 
		/// </summary>
		[SettingKey("HomeBankingLogin.UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount")]
		public bool UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount
		{
			get
			{
				var thisConfigValue = GetBoolValue();
				// ReSharper disable once ExplicitCallerInfoArgument
				if (thisConfigValue && !GetBoolValue("X.App.HBBOL.AllowSSNInsteadOfCall24"))
				{
					var exception = new Exception("HomeBankingLogin.UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount is enabled, but X.App.HBBOL.AllowSSNInsteadOfCall24 is not.  X.App.HBBOL.AllowSSNInsteadOfCall24" +
												  "must be enabled in order to use HomeBankingLogin.UsersCanLogInWithAnyLast4TaxIdAssociatedWithMemberAccount.");
					LogManager.GetLogger<HomeBankingLoginConfiguration>().Error(exception);
					throw exception;
				}
				return thisConfigValue;
			}
			set => SetValue(value);
		}

		/// <summary>
		/// Allows users to verify their identity by using the name, zip, ssn, date of birth information that is associated with any individual that is associated
		/// with a member account.  This allows joint owners to enroll in online banking without having to know the PII for the primary account owner.
		/// </summary>
		[SettingKey("HomeBankingLogin.UsersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount")]
		public bool UsersCanEnrollWithAnyPersonalInformationAssociatedWithMemberAccount
		{
			get => GetBoolValue();
			set => SetValue(value);
		}

        /// <summary>
        /// Validates MimeTypes on login
        /// </summary>
        [SettingKey("HomeBankingLogin.MimeTypeRegex")]
	    public string MimeTypeRegex
	    {
	        get => GetValue();
	        set => SetValue(value);
	    }

        /// <summary>
        /// Reorders the tab indexes of the captcha image and its associated text entry
        /// </summary>
        [SettingKey("HomeBankingLogin.ReorderCaptchaTabOrder")]
        public bool ReorderCaptchaTabOrder
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

	    /// <summary>
	    /// Remove all leading zero's from Uid when logging in.
	    /// </summary>
	    [SettingKey("HomeBankingLogin.RemoveLeadingZerosFromUid")]
	    public bool RemoveLeadingZerosFromUid
	    {
	        get => GetBoolValue();
	        set => SetValue(value);
	    }

		/// <summary>
		/// If true, then don't show the 'help' window as a new 'popped-up' window through javascript when clicking the 'new user' link on the login page. 
		/// Instead navigate to lognin.aspx?new=y like you can from the mini-login page. Default: False
		/// </summary>
		[SettingKey("HomeBankingLogin.ShouldNewUserLinkNavigateToNewUserForm")]
		public bool ShouldNewUserLinkNavigateToNewUserForm
		{
			get => GetBoolValue();
			set => SetValue(value);
		}
		
		/// <summary>
		/// If true, enable IP Whitelisting for the Connect Captcha
		/// </summary>
		[SettingKey("HomeBankingLogin.Captcha.IpWhitelistEnabled")]
		public bool IpWhitelistEnabled
		{
			get { return GetBoolValue(); }
			set { SetValue(value); }
		}

		/// <summary>
		/// Comma delimited string of IP address to add to the Ip Whitelist feature
		/// </summary>
		[SettingKey("HomeBankingLogin.Captcha.IpWhitelist")]
		public List<string> IpWhitelist
		{
			get { return GetListValue() ?? new List<string>(); }
			set { SetValue(value); }
		}
	}
}
