namespace Psi.Data.Models.ClientConfigurationModels.CreditCards
{
    public class CreditCardSettings : SettingsBaseHelper
    {
        private OmahaSso _omahaSso;
        public PscuSso _pscuSso;

        public CreditCardSettings(ISettingsBase settingsBase) : base(settingsBase)
        {

        }

        public OmahaSso OmahaSso
        {
            get => _omahaSso ?? (_omahaSso = new OmahaSso(SettingsBase));
            set => _omahaSso = value;
        }
        public PscuSso PscuSso
        {
            get => _pscuSso ?? (_pscuSso = new PscuSso(SettingsBase));
            set => _pscuSso = value;
        }
    }
}
