namespace Psi.Data.Models.ClientConfigurationModels.Boku
{
    // Feature Documented at http://tfsbuild2:8080/index.php?title=Boku_Phone_Identification
    public class BokuSettings : SettingsBaseHelper
    {
        public BokuSettings(ISettingsBase settingsBase)
            : base(settingsBase)
        {
        }

        /// <summary>
        /// Determines if the Boku Feature is Enabled, works in conjunction with the MinVersion Config
        /// </summary>
        [SettingKey("PhoneIdentification.Boku.Enabled")]
        public bool Enabled
        {
            get => GetBoolValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// Determines what the minimum OLB version is required to use this feature.
        /// </summary>
        [SettingKey("PhoneIdentification.Boku.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// This is a url to the api that is provided by Boku at the time of Onboarding and is unique to each client
        /// </summary>
        [SettingKey("PhoneIdentification.Boku.ApiUrl")]
        public string ApiUrl
        {
            get => GetValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// A unique string assigned by Danal to identify the merchant.
        /// This ID will be provided by Danal during the onboarding process.
        /// Max Length: 30
        /// Example MerchantID=00DF00000015
        /// </summary>
        /// <remarks>This is a required field</remarks>
        [SettingKey("PhoneIdentification.Boku.MerchantId")]
        public string MerchantId
        {
            get => GetValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// This unique ID is assigned to a reseller’s end merchant. This ID will be provided by Boku during the onboarding process and must be sent in the payload if it exists.
        /// Max length: 30
        /// Example submerchantId: 00DF00000016
        /// </summary>
        /// <remarks>This is Not a required field</remarks>
        [SettingKey("PhoneIdentification.Boku.SubMerchantId")]
        public string SubMerchantId
        {
            get => GetValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// Key that identifies that the request is originating from a valid merchant. Shared with merchant at onboarding.
        /// Max Length: 256
        /// </summary>
        [SettingKey("PhoneIdentification.Boku.ClientAccessKey")]
        public string ClientAccessKey
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Merchant’s Secret sent by merchant in the request header. Shared with merchant at onboarding.
        /// </summary>
        [SettingKey("PhoneIdentification.Boku.ApiSecret")]
        public string ApiSecret
        {
            get => GetValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// Key used by merchant to decrypt encrypted API responses. Shared with merchant at onboarding
        /// </summary>
        [SettingKey("PhoneIdentification.Boku.EncryptionKey")]
        public string EncryptionKey
        {
            get => GetValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// Key used to encrypte/decrypt the PhoneNumber in the BokuPhoneIdentificationDevice table
        /// </summary>
        [SettingKey("PhoneIdentification.Boku.PhoneNumber.EncryptionKey")]
        public string PhoneNumberEncryptionKey
        {
            get => GetValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// Cipher used along with the EncryptionKey to encrypte/decrypt the PhoneNumber in the BokuPhoneIdentificationDevice table
        /// </summary>
        [SettingKey("PhoneIdentification.Boku.PhoneNumber.CipherKey")]
        public string PhoneNumberCipherKey
        {
            get => GetValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// Key used by merchant to encrypt the payload in the EVURL. Shared with merchant at onboarding.
        /// Max Length: 256
        /// </summary>
        [SettingKey("PhoneIdentification.Boku.EVURL.EncryptionKey")]
        public string EvurlEncryptionKey
        {
            get => GetValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// Base URL is used for constructing EVURL at merchant side. It’s a unique URL generated for the merchant.
        /// </summary>
        [SettingKey("PhoneIdentification.Boku.EVURL.BaseUrl")]
        public string EvurlBaseUrl
        {
            get => GetValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// Indicated whether boku phone verification is enabled
        /// </summary>
        [SettingKey("PhoneVerification.Boku.Enabled")]
        public bool PhoneVerificationEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Indicates the minimum release version for using boku phone verification
        /// </summary>
        [SettingKey("PhoneVerification.Boku.MinVersion")]
        public double PhoneVerificationMinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Indicates the minimum release version for using boku phone verification on Android devices
        /// </summary>
        [SettingKey("PhoneVerification.Boku.MinVersionAndroid")]
        public string PhoneVerificationMinVersionAndroid
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Indicates the minimum release version for using boku phone verification on IOS devices
        /// </summary>
        [SettingKey("PhoneVerification.Boku.MinVersionIos")]
        public string PhoneVerificationMinVersionIos
        {
            get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The number of days that must be waited before trying to verify again
        /// </summary>
        [SettingKey("PhoneVerification.Boku.DaysBeforeRetry")]
        public int PhoneVerificationDaysBeforeRetry
        {
            get => GetIntValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The number of days before tokens expire
        /// </summary>
        [SettingKey("PhoneVerification.Boku.DaysBeforeTokenExpires")]
        public int PhoneVerificationDaysBeforeTokenExpires
        {
            get => GetIntValue();
            set => SetValue(value);
        }
    }
}