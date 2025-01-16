namespace Psi.Data.Models.ClientConfigurationModels.Estatements
{
    public class EplEstatements : SettingsBaseHelper
    {

        public EplEstatements(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// EPL Estatements enabled
        /// </summary>
        [SettingKey("Estatements.EplEstatements.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }


        /// <summary>
        /// EPL Estatements endpoint address (url)
        /// </summary>
        [SettingKey("Estatements.EplEstatements.EndpointAddress")]
        public string EndpointAddress
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }


        /// <summary>
        /// EPL Estatements GroupName 
        /// </summary>
        /// <remarks>Should be "Connect Online Banking"</remarks>
        [SettingKey("Estatements.EplEstatements.GroupName")]
        public string GroupName
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }


        /// <summary>
        /// EPL Estatements Identifier
        /// </summary>
        /// <remarks>Should be "a9fa7ae9-a818-4b5f-a1aa-2e691f2dcbbc"
        /// This is how their system knows who is making the request.</remarks>
        [SettingKey("Estatements.EplEstatements.Identifier")]
        public string Identifier
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }


        /// <summary>
        /// EPL Estatements Private Key
        /// </summary>
        /// <remarks>Should be "%!PgvG=m-GWW6#J7!!O1g&J4"
        /// This is the key they use to encrypt requests.</remarks>
        [SettingKey("Estatements.EplEstatements.PrivateKey")]
        public string PrivateKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }


        /// <summary>
        /// EPL Estatements Encryption initialization vector (Encryption IV)
        /// </summary>
        /// <remarks>Should be "S0s@6iKF"
        /// This is the Initialization Vector we use to encrypt requests. This should not change.</remarks>
        [SettingKey("Estatements.EplEstatements.EncryptionInitializationVector")]
        public string EncryptionInitializationVector
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

    }
}
