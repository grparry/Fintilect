namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores
{
    public class LoanOriginationSettings : SettingsBaseHelper
    {
        public LoanOriginationSettings(ISettingsBase settingsBase) : base(settingsBase)
        {

        }


        [SettingKey("FinacialCore.Corelation.LoanOrigination.ApplicationTypeSerial")]
        public string ApplicationTypeSerial 
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.LoanOrigination.ApplicationChannel")]
        public string ApplicationChannel
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.LoanOrigination.ApplicationBranch")]
        public string ApplicationBranch
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

		[SettingKey("FinacialCore.Corelation.LoanOrigination.DefaultCreditLimit")]
		public string DefaultCreditLimit
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.DefaultPaymentAmount")]
		public string DefaultPaymentAmount
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.WorkFlowSerial")]
		public string WorkFlowSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.WorkQueueApproveSerial")]
		public string WorkQueueApproveSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.WorkQueueRescreenSerial")]
		public string WorkQueueRescreenSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.WorkQueueReviewSerial")]
		public string WorkQueueReviewSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.WorkQueueDeclineSerial")]
		public string WorkQueueDeclineSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.WorkQueueIlaDefaultSerial")]
		public string WorkQueueIlaDefaultSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.OnlineApplicationNoteTypeSerial")]
		public string OnlineApplicationNoteTypeSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.CommentsNoteTypeSerial")]
		public string CommentsNoteTypeSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.AccountDisclosureNoteTypeSerial")]
		public string AccountDisclosureNoteTypeSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.EnoticesDisclosureNoteTypeSerial")]
		public string EnoticesDisclosureNoteTypeSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.PrivacyNoticeDisclosureNoteTypeSerial")]
		public string PrivacyNoticeDisclosureNoteTypeSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.DecisionTypeSerial")]
		public string DecisionTypeSerial
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.CreditTypeSerialChexSystems")]
		public string CreditTypeSerialChexSystems
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.CreditTypeSerialEquifax")]
		public string CreditTypeSerialEquifax
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}

		[SettingKey("FinacialCore.Corelation.LoanOrigination.CreditTypeSerialTransUnion")]
		public string CreditTypeSerialTransUnion
		{
			get { return GetValue(); }
			set { SetValue(value); }
		}


		/***
         * 
         * 
WORK_QUEUE_SERIAL	501
USER	connect_fss
WORK_FLOW	1604
APPLICATION	1705

        Serial	1705
Channel	601
Branch	1604
Processor	connect_fss


         * 
         */

	}
}