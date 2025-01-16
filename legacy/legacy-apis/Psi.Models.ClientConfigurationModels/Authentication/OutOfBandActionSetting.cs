using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.Authentication
{
    public class OutOfBandActionSetting
    {
        public ClientConfigurationRepository.FeatureActionTypeEnum ActionType { get; set; }

        public bool Enabled { get; set; }

        public Money TransferLimit { get; set; }
    }
}