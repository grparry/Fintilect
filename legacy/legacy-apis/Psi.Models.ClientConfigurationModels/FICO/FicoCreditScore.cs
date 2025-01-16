namespace Psi.Data.Models.ClientConfigurationModels.FICO
{
    public class FicoCreditScore : SettingsBaseHelper
    {
        public FicoCreditScore(ISettingsBase settingsBase) : base(settingsBase)
        {
        }
        
        [SettingKey("FicoCreditScore.Enabled")]
        public bool Enabled
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }
        
        [SettingKey("FicoCreditScore.MinVersion")]
        public double MinVersion
        {
            get { return GetDoubleValue(); }
            set { SetValue(value); }
        }
        
        [SettingKey("FicoCreditScore.StepSsoUrl")]
        public string StepSsoUrl
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
        
        [SettingKey("FicoCreditScore.HostIpAddress")]
        public string HostIpAddress
		{
            get { return GetValue(); }
            set { SetValue(value); }
        }
        
        [SettingKey("FicoCreditScore.CertificateFilename")]
        public string CertificateFilename
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

	    [SettingKey("FicoCreditScore.CertificatePassword")]
	    public string CertificatePassword
	    {
		    get { return GetValue(); }
		    set { SetValue(value); }
	    }

	    [SettingKey("FicoCreditScore.SiteId")]
	    public string SiteId
		{
		    get { return GetValue(); }
		    set { SetValue(value); }
	    }

	    [SettingKey("FicoCreditScore.ClientId")]
	    public string ClientId
		{
		    get { return GetValue(); }
		    set { SetValue(value); }
	    }

        [SettingKey("FicoCreditScore.OptOutFlagNumber")]
        public int OptOutFlagNumber
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FicoCreditScore.IssuerNameId")]
        public string IssuerNameId
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }
    }
}
