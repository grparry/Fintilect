using Psi.Data.Models.Domain.ContactUs;

namespace Omega.Presentation.Mvc.Models.CreditUnionContactInfo
{
    public class CreditUnionContactInfoViewModel : ModelBase
    {
        public ContactUsModel ContactUsInfo { get; set; }
    }

    public class AddUpdateContactUsGroupModel : ModelBase
    {
        public ContactUsGroupModel ContactUsGroup { get; set; }
    }

    public class AddUpdateContactUsPhoneNumberModel : ModelBase
    {
        public ContactUsPhoneNumberModel ContactUsPhoneNumber { get; set; }
    }

    public class AddUpdateContactUsPhoneHourModel : ModelBase
    {
        public ContactUsPhoneHourModel ContactUsPhoneHour { get; set; }
    }

	public class AddUpdateContactUsLinkModel : ModelBase
	{
		public ContactUsLinkModel ContactUsLink { get; set; }
	}
}