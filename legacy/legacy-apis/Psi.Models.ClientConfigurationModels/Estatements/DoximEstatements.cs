namespace Psi.Data.Models.ClientConfigurationModels.Estatements
{
    public class DoximEstatements : SettingsBaseHelper
    {
        public DoximEstatements(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        /// <summary>
        /// Doxim Estatements enabled as bool
        /// </summary>
        [SettingKey("Estatements.DoximEstatements.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Doxim Estatements endpoint address (url) as string. Provided by Doxim.
        /// </summary>
        [SettingKey("Estatements.DoximEstatements.EndpointAddress")]
        public string EndpointAddress
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// Doxim Estatements Institution Identifier as string
        /// </summary>
        /// <remarks>This will be like "connectfss". Provided by Doxim.
        /// This is how their system knows who is making the request.</remarks>
        [SettingKey("Estatements.DoximEstatements.Identifier")]
        public string Identifier
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }


        /// <summary>
        /// Doxim Estatements Secret Key as string
        /// </summary>
        /// <remarks>Secret key for HMAC-SHA-256 encryption. Provided by agreement between connect and Doxim.
        /// This is the key we use to encrypt the .hmac property on the request object.</remarks>
        [SettingKey("Estatements.DoximEstatements.SecretKey")]
        public string SecretKey
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
