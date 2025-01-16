using Psi.Data.Models.Domain.ErrorMessages;

namespace Psi.Data.Models.ClientConfigurationModels.ErrorMessages
{
	public class ErrorMessageConfiguration : SettingsBaseHelper
	{
		public ErrorMessageConfiguration(ISettingsBase settingsBase) : base(settingsBase)
		{
		}

		[SettingKey("PassThroughMessageRules")]
		public PassThroughErrorMessageConfiguration PassThroughErrorConfiguration
		{
			get { return GetJsonValueOrNull<PassThroughErrorMessageConfiguration>() ?? new PassThroughErrorMessageConfiguration(); }
			set { SetValue(value); }
		}
	}
}
