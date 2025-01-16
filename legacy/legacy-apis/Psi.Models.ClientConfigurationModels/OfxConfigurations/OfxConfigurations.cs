using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.OfxConfigurations
{
    public class OfxConfigurations : SettingsBaseHelper
    {

        public OfxConfigurations(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// This setting is poorly named.  It applies to OFX WebConnect as well.  DirectConnect and WebConnect should alwayse behave in the same way.  Unfortunately, 
        /// we have two separate code bases for this at this time.  We really should combine them so that we don't have to mantain two versions of nearly identical code.
        /// </summary>
        [SettingKey("OFXConfigurations.OfxDirectIsAscending")]
        public bool OfxDirectIsAscending
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("OfxConfigurations.TransactionMessageEZIV")]
        public string TransactionMessageEZIV
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("OfxConfigurations.TransactionPostingCreditMessage")]
        public string TransactionPostingCreditMessage
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("OfxConfigurations.TransactionPostingDebitMessage")]
        public string TransactionPostingDebitMessage
        {
            get => GetValue();
            set => SetValue(value);
        }

	    [SettingKey("OfxConfigurations.LogLoginIsEnabled")]
	    public bool LogLoginIsEnabled
	    {
		    get => GetBoolValue();
		    set => SetValue(value);
	    }

        /// <summary>
        /// When this setting is on, OFX transaction categorization will use the TransactionType, Amount, TellerInitials, and Branch fields to determine the transaction category.
        /// When this setting is off, OFX transaction categorization will use the TransactionType and Amount to determine the transaction category.
        /// </summary>
        [SettingKey("OfxConfigurations.OfxTranTypeShouldUseExtraFields")]
        public bool OfxTranTypeShouldUseExtraFields
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// True - When building the OFX output, all transactions where Amount == 0 will be completely omitted
        /// False - No change
        /// </summary>
        [SettingKey("OfxConfigurations.HideZeroValueTransactions")]
        public bool HideZeroValueTransactions
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// True - When building the OFX output, all transactions where Name is null or whitespace will have the Name set to string resources
        ///     If Amount >= 0 : Name = Ofx.PositiveTransactionName
        ///     If Amount LessThan 0 : Name = Ofx.NegativeTransactionName
        /// False - No change
        /// </summary>
        [SettingKey("OfxConfigurations.GenerateNamesIfNeeded")]
        public bool GenerateNamesIfNeeded
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
        
        [SettingKey("OfxConfigurations.PositiveTransactionName")]
        public string PositiveTransactionName
        {
            get => GetValue();
            set => SetValue(value);
        }
        
        [SettingKey("OfxConfigurations.NegativeTransactionName")]
        public string NegativeTransactionName
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("OfxConfigurations.ShouldIncludeCrossAccounts")]
        public bool ShouldIncludeCrossAccounts
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("OfxConfigurations.ShouldDeleteClosingTags")]
        public bool ShouldDeleteClosingTags
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// List of Restricted share flags that we still want OFX to return when retrieving the account list.
        /// </summary>
        /// <remarks>
        /// Money Desktop expects us to return closed accounts.
        /// They mark an account as closed on their end if the account has a balance of $0 or if a closed account flag is set.
        /// </remarks>
        [SettingKey("OfxConfigurations.AllowedShareRestrictedFlags")]
        public List<string> AllowedShareRestrictedFlags
        {
            get => GetListValue() ?? new List<string>();
            set => SetValue(value);
        }
        
        /// <summary>
        /// List of Restricted share flags that we still want OFX to return when retrieving the account list.
        /// </summary>
        /// <remarks>
        /// Money Desktop expects us to return closed accounts.
        /// They mark an account as closed on their end if the account has a balance of $0 or if a closed account flag is set.
        /// </remarks>
        [SettingKey("OfxConfigurations.AllowedLoanRestrictedFlags")]
        public List<string> AllowedLoanRestrictedFlags
        {
            get => GetListValue() ?? new List<string>();
            set => SetValue(value);
        }
        
        /// <summary>
        /// List of AppId's that we want to allow certain restricted flag accounts to be returned
        /// </summary>
        [SettingKey("OfxConfigurations.AppIdsWithRestrictedFlagsExceptions")]
        public List<string> AppIdsWithRestrictedFlagsExceptions
        {
            get => GetListValue() ?? new List<string>();
            set => SetValue(value);
        }

        [SettingKey("OfxConfigurations.UseSymmetryMethodOfCreatingFitid")]
        public bool UseSymmetryMethodOfCreatingFitid
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
