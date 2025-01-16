namespace Psi.Data.Models.ClientConfigurationModels.Promotions
{
    public class Promotions : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private DeepTargetSettings _deepTargetSettings;
        private SkipPay _skipPay;
        
        public Promotions(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public DeepTargetSettings DeepTarget
        {
            get => _deepTargetSettings ?? (_deepTargetSettings = new DeepTargetSettings(_settingsBase));
            set => _deepTargetSettings = value;
        }

        public SkipPay SkipPay
        {
            get => _skipPay ?? (_skipPay = new SkipPay(_settingsBase));
            set => _skipPay = value;
        }
    }
}
