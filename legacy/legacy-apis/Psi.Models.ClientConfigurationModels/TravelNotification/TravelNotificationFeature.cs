using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Psi.Data.Models.ClientConfigurationModels.TravelNotification
{
    public class TravelNotificationFeature : SettingsBaseHelper {
        public TravelNotificationFeature(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Features.TravelNotification.TravelNotificationEnabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Features.TravelNotification.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Features.TravelNotification.ShowCellNumberOnTravelNotificationForm")]
        public bool ShowCellNumberOnTravelNotificationForm
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, show the 'final instructions' section on the travel notification view
        /// </summary>
        [SettingKey("Features.TravelNotification.ShowFinalInstructionsOnTravelNotificationForm")]
        public bool ShouldShowFinalInstructionsOnTravelNotificationForm
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, show email as an option in the 'preferred method of contact' section of the form INSTEAD OF alternate phone number
        /// </summary>
        [SettingKey("Features.TravelNotification.ShowEmailOptionInPreferredMethodOfContact")]
        public bool ShouldShowEmailOptionInPreferredMethodOfContact
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The subject line for the secure message that is sent from Travel Notification
        /// </summary>
        [SettingKey("Features.TravelNotification.SubjectLine")]
        public string SubjectLine
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, Subject Line will be {Features.TravelNotification.SubjectLine} [{EAgreementNumber}] (ie. "Travel Notification [12345678]")
        /// </summary>
        [SettingKey("Features.TravelNotification.IncludeEAgreementInSubject")]
        public bool IncludeEAgreementInSubject
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The message category that will be associated with the secure message that is sent from Travel Notification
        /// </summary>
        [SettingKey("Features.TravelNotification.MessageCategory")]
        public string MessageCategory
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, show 'If you are traveling outside the US, do you plan to use online or mobile banking during your travel?' radio button on form
        /// </summary>
        [SettingKey("Features.TravelNotification.ShowUseOutsideOfUsOption")]
        public bool ShouldShowUseOutsideOfUsOption
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, travel notifications will be sent to PSCU
        /// </summary>
        [SettingKey("Features.TravelNotification.SendToPscuEnabled")]
        public bool SendToPscuEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Number value of Fraud Suspend strategy to define Travel Notifications
        /// </summary>
        [SettingKey("Features.TravelNotification.PSCU.FraudSuspendStrategy")]
        public int PscuFraudSuspendStrategy
        {
            get => GetIntValue();
            set => SetValue(value);
        }
    }
}
