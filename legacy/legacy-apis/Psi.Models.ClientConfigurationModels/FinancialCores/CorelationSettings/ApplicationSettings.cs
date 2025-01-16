namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores.CorelationSettings
{
    public class ApplicationSettings : SettingsBaseHelper
    {
        public ApplicationSettings(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.TypeSerial")]
        public string TypeSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.SaveClientsIp")]
        public bool SaveClientsIp
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.ChannelSerial")]
        public string ChannelSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.WorkFlowSerial")]
        public string WorkFlowSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.WorkQueueOpenSerial")]
        public string WorkQueueOpenSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.WorkQueueNewSerial")]
        public string WorkQueueNewSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.WorkQueueApproveSerial")]
        public string WorkQueueApproveSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.WorkQueueRescreenSerial")]
        public string WorkQueueRescreenSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.ManualApprovalsBypassWorkQueueLogic")]
        public bool ManualApprovalsBypassWorkQueueLogic
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.WorkQueueReviewSerial")]
        public string WorkQueueReviewSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.WorkQueueDeclineSerial")]
        public string WorkQueueDeclineSerial
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.CreditTypeSerialChexSystems")]
        public string CreditTypeSerialChexSystems
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.CreditTypeSerialEquifax")]
        public string CreditTypeSerialEquifax
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.CreditTypeSerialTransUnion")]
        public string CreditTypeSerialTransUnion
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Corelation.ApplicationSettings.CreditPullMaxDaysOld")]
        public string CreditPullMaxDaysOld
        {
            get =>  GetValue(); 
            set => SetValue(value);
        }

    }
}