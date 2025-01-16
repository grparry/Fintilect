using System;

namespace Psi.Data.Models.ClientConfigurationModels.BillPay
{
    public class Help : SettingsBaseHelper
    {
	    private Help _help;

		public Help(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        

        [SettingKey("BillPay.Help.MessageType")]
        public MessageTypeEnum MessageType
        {
	        get
	        {
		        MessageTypeEnum type;
		        Enum.TryParse(GetValue(), true, out type);
		        return type;

			}
			set { SetValue(value); }
        }

	    [SettingKey("BillPay.Help.EmailAddress")]
	    public string EmailAddress
	    {
		    get { return GetValue(); }
		    set { SetValue(value); }
	    }

	    [SettingKey("BillPay.Help.SecureMessageCategoryName")]
	    public string SecureMessageCategoryName
		{
		    get { return GetValue(); }
		    set { SetValue(value); }
	    }

	    public enum MessageTypeEnum
		{
		    Email, SecureMessage
	    }

	}
}
