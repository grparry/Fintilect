
namespace Psi.Data.Models.ClientConfigurationModels.Account
{
    public class JointOwners : SettingsBaseHelper
    {
        public JointOwners(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("JointOwners.JointOwnersEnabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("JointOwners.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("JointOwners.ShowJointOwners")]
        public bool ShouldShowJointOwners
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Only show Joint Owners with an association code in the list
        /// </summary>
        /// <remarks>A comma separated list of "AssociationCodes" for Joint Owners.
        /// JO = Joint Owner
        /// BE = Beneficiary</remarks>
        [SettingKey("JointOwners.AssociationCodesToShow")]
        public string[] AssociationCodesToShow
        {
            get
            {
                var codes = GetValue();
                var associatedCodes = codes?.Split(',');

                return associatedCodes;
            }
            set => SetValue(value);
        }
    }
}
