namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.Deals
{
    public class Deals : SettingsBaseHelper

    {
        private readonly ISettingsBase _settingsBase;
        private Cardlytics.Cardlytics _cardlytics;
        private RelevantSolutions.RelevantSolutions _relevantSolutions;
        private CheckingRewards.CheckingRewards _checkingRewards;

        public Deals(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public Cardlytics.Cardlytics Cardlytics
        {
            get { return _cardlytics ?? (_cardlytics = new Cardlytics.Cardlytics(_settingsBase)); }
            set { _cardlytics = value; }
        }

        public RelevantSolutions.RelevantSolutions RelevantSolutions
        {
            get { return _relevantSolutions ?? (_relevantSolutions = new RelevantSolutions.RelevantSolutions(_settingsBase)); }
            set { _relevantSolutions = value; }
        }

        public CheckingRewards.CheckingRewards CheckingRewards
        {
            get { return _checkingRewards ?? (_checkingRewards = new CheckingRewards.CheckingRewards(_settingsBase)); }
            set { _checkingRewards = value; }
        }
    }
}
