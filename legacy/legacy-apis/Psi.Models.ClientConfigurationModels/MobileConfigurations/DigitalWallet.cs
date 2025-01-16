
using System.Collections.Generic;

namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations
{
    public class DigitalWallet : SettingsBaseHelper
    {

        public DigitalWallet(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        // enabled setting
        [SettingKey("Mobile.DigitalWallet.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        // Endpoint Address of web service
        [SettingKey("Mobile.DigitalWallet.EndpointAddress")]
        public string EndpointAddress
        {
            get => GetValue();
            set => SetValue(value);
        }

        // userId for this client
        [SettingKey("Mobile.DigitalWallet.userId")]
        public string userId
        {
            get => GetValue();
            set => SetValue(value);
        }

        // password for this client
        [SettingKey("Mobile.DigitalWallet.password")]
        public string password
        {
            get => GetValue();
            set => SetValue(value);
        }

        // Validated field. This references the web service schema version being used, as provided by Card Services.
        [SettingKey("Mobile.DigitalWallet.SchemaVersion")]
        public string schemaVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        // Card Services assigned financial institution identifier(FIID) associated with the client.   Example: 00000001
        [SettingKey("Mobile.DigitalWallet.clientId")]
        public string clientId
        {
            get => GetValue();
            set => SetValue(value);
        }

        // Must contain a valid value assigned to the client's designated Card Service platform. Values:  EPOC  |  EPOC_CM   |  CREDIT
        [SettingKey("Mobile.DigitalWallet.system")]
        public List<string> system
        {
            get => GetListValue();
            set => SetValue(value);
        }

        // Name of the application calling this web service. Must be suitably descriptive.
        [SettingKey("Mobile.DigitalWallet.clientApplicationName")]
        public string clientApplicationName
        {
            get => GetValue();
            set => SetValue(value);
        }

        // Version of the application calling this web service 
        [SettingKey("Mobile.DigitalWallet.clientVersion")]
        public string clientVersion
        {
            get => GetValue();
            set => SetValue(value);
        }

        // Client vendor identifier. Entity that initiates the web service. 
        [SettingKey("Mobile.DigitalWallet.clientVendorName")]
        public string clientVendorName
        {
            get => GetValue();
            set => SetValue(value);
        }

        // security key for encrypting/decrypting the password for this client
        [SettingKey("Mobile.DigitalWallet.EncryptionSecurityKey")]
        public string EncryptionSecurityKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        // Certificate Name
        [SettingKey("Mobile.DigitalWallet.CertificateName")]
        public string CertificateName
        {
            get => GetValue();
            set => SetValue(value);
        }

        // Certificate Password
        [SettingKey("Mobile.DigitalWallet.CertificatePassword")]
        public string CertificatePassword
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.DigitalWallet.AndroidStoreUrl")]
        public string AndroidStoreUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("Mobile.DigitalWallet.IosStoreUrl")]
        public string IosStoreUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Package Name used by Android
        /// </summary>
        [SettingKey("Mobile.DigitalWallet.PackageName")]
        public string PackageName
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Url Scheme used by iOS
        /// </summary>
        [SettingKey("Mobile.DigitalWallet.UrlScheme")]
        public string UrlScheme
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If popup is enabled
        /// </summary>
        [SettingKey("Mobile.DigitalWallet.PopupEnabled")]
        public bool PopupEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Time in Days before repeat popup is displayed
        /// </summary>
        [SettingKey("Mobile.DigitalWallet.TimeBeforeRepeatPopup")]
        public int TimeBeforeRepeatPopup
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Flag number used to determine if a popup should be displayed to enroll user 
        /// </summary>
        [SettingKey("Mobile.DigitalWallet.ShowEnrollmentPromptFlagNumber")]
        public int ShowEnrollmentPromptFlagNumber
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Flag number used to determine if a debit card exists on the account
        /// </summary>
        [SettingKey("Mobile.DigitalWallet.DebitCardControlFlagNumber")]
        public int DebitCardControlFlagNumber
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Flag number used to determine if a credit card exists on the account
        /// </summary>
        [SettingKey("Mobile.DigitalWallet.CreditCardControlFlagNumber")]
        public int CreditCardControlFlagNumber
        {
            get => GetIntValue();
            set => SetValue(value);
        }
    }
}
