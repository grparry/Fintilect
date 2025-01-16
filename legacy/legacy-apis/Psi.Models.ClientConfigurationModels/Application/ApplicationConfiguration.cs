using Psi.Data.Models.ClientConfigurationModels.Application.Omega;

namespace Psi.Data.Models.ClientConfigurationModels.Application
{
    public class ApplicationConfiguration : SettingsBaseHelper
    {
        public ApplicationConfiguration(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        private OmegaConfiguration _omega;
        public OmegaConfiguration Omega{ get{ return _omega ?? (_omega = new OmegaConfiguration(SettingsBase));} }

        private OnlineBankingConfiguration _onlineBanking;
        public OnlineBankingConfiguration OnlineBanking { get { return _onlineBanking ?? ( _onlineBanking = new OnlineBankingConfiguration(SettingsBase));} }

        private SparkUiConfiguration _sparkUiConfiguration;
        public SparkUiConfiguration SparkUi { get { return _sparkUiConfiguration ?? (_sparkUiConfiguration = new SparkUiConfiguration(SettingsBase)); } }

        private FlexUiConfiguration _flexUiConfiguration;
        public FlexUiConfiguration FlexUi { get { return _flexUiConfiguration ?? (_flexUiConfiguration = new FlexUiConfiguration(SettingsBase)); } }
    }
}