namespace Psi.Data.Models.ClientConfigurationModels.MobileConfigurations.AccountOpening
{
    public class AccountOpening : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private JoinCreditUnion.JoinCreditUnion _joinCreditUnion;
        private MiniOao.MiniOao _miniOao;

        public AccountOpening(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public JoinCreditUnion.JoinCreditUnion JoinCreditUnion
        {
            get { return _joinCreditUnion ?? (_joinCreditUnion = new JoinCreditUnion.JoinCreditUnion(_settingsBase)); }
            set { _joinCreditUnion = value; }
        }

        public MiniOao.MiniOao MiniOao
        {
            get { return _miniOao ?? (_miniOao = new MiniOao.MiniOao(_settingsBase)); }
            set { _miniOao = value; }
        }
    }
}
