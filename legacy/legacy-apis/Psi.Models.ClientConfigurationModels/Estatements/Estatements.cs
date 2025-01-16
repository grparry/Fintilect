using Psi.Data.Models.ClientConfigurationModels.InfoImageEstatements;

namespace Psi.Data.Models.ClientConfigurationModels.Estatements
{
    public class Estatements : SettingsBaseHelper
    {
        private EplEstatements _epleStatements;
        private DoximEstatements _doximEstatements;
        private BitEstatements _bitEstatements;
        private NcpEstatements _ncpEstatements;
        private InfoImageEstatementsSettings _infoImageEstatements;
        private WebApiEstatementsSettings _webApiEstatements;

        public Estatements(ISettingsBase settingsBase) : base(settingsBase)
        {
        }

        [SettingKey("Estatements.EstatementsEnabled")]
        public bool Enabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.MinVersion")]
        public double MinVersion
        {
            get => GetDoubleValue();
            set => SetValue(value);
        }

        [SettingKey("Estatements.RedirectStatementsAndNoticesToEstatementsPageAndReturn")]
        public bool RedirectStatementsAndNoticesToEstatementsPageAndReturn
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

		/// <summary>
		/// When this setting is on, the Estatements page will pop up in a new window rather than be loaded
		/// in an iFrame.  This will apply to Mobile devices in mobile web as well
		/// as desktops in web, but not the mobile app.
		/// </summary>
		[SettingKey("Estatements.OpenInNewWindow")]
        public bool OpenInNewWindow
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

	    /// <summary>
	    /// When this setting is on, the eStatements page will pop up in a new window rather than be loaded
	    /// in an iFrame.  This will apply to Mobile web, but not the mobile app, nor desktop web
	    /// If eStatements.OpenInNewWindow is turned on,
	    /// EStatements will open in a new window in all cases but the mobile app, and this setting will effectively be ignored.
	    /// </summary>
		[SettingKey("Estatements.WillOpenInNewWindowOnMobileDevices")]
        public bool WillOpenInNewWindowOnMobileDevices
		{
            get => GetBoolValue();
		    set => SetValue(value);
		}

		/// <summary>
		/// If this setting is true, third party eStatements will open in target = _self rather than in an iFrame.  For BIT Statements, setting this to false helps with problems
		/// in iOS with displaying eStatements in the mobile app.  By default, this setting will be set to true by default, even if the config setting has not been 
		/// added to  the meta database.
		/// </summary>
		[SettingKey("Estatements.WillOpenInIFrameInMobileApp")]
		public bool WillOpenInIFrameInMobileApp
	    {
			get => GetBoolValue(true);
		    set => SetValue(value);
		}

		[SettingKey("Estatements.DisclosureUrl")]
        public string DisclosureUrl
        {
            get => GetValue();
            set => SetValue(value);
        }

	    /// <summary>
		/// If true, estatements will be visible for organizations as well, and not just when the currently logged in user is the owner.
		/// </summary>
		[SettingKey("Estatements.ShouldShowAllStatementAccountsOrgs")]
	    public bool ShouldShowAllStatementAccountsOrgs
		{
		    get => GetBoolValue(true);
		    set => SetValue(value);
	    }

	    [SettingKey("Estatements.IgnoreDisclosure")]
	    public string IgnoreDisclosure
	    {
		    get => GetValue();
            set => SetValue(value);
        }

        /// <summary>
        /// The Default Search Range in Days
        /// </summary>
        /// <remarks>returned value is negative so that we go back x day, i.e. DateTime.Now.AddDays(Estatements.DefaultSearchRange). but value in Omega will be positive</remarks>
        [SettingKey("Estatements.DefaultSearchRange")]
        public int DefaultSearchRange
        {
            get => -GetIntValue();
            set => SetValue(value);
        }

        /// <summary>
		/// If true, an owner can see statements for accounts if they have inquire access to all shares, so more than the primary owner can see the statements
		/// </summary>
		[SettingKey("Estatements.ShowEstatementsWhenMemberHasInquireRightsOnAllShares")]
        public bool ShouldShowEstatementsWhenMemberHasInquireRightsOnAllShares
        {
            get => GetBoolValue(true);
            set => SetValue(value);
        }

        /// <summary>
        /// If true, BIT Estatements will use a form post rather than the querystring when loading the data for the IFrame.  It is recommended to use this feature as it is more secure.
        /// </summary>
        [SettingKey("Estatements.UseBITFormPostOnIFrame")]
        public bool UseBITFormPostOnIFrame
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// If true, we will check if the member has access to all sub accounts for each account we show in the estatements account selector.
        /// This is only wired up for Corelation clients currently.
        /// </summary>
        [SettingKey("Estatements.CheckCoreAccountAccess.Enabled")]
        public bool CheckCoreAccountAccessEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        // reference to epl estatements
        public EplEstatements EplEstatements
        {
            get => _epleStatements ?? (_epleStatements = new EplEstatements(SettingsBase));
            set => _epleStatements = value;
        }

        // reference to Doxim estatements
        public DoximEstatements DoximEstatements
        {
            get => _doximEstatements ?? (_doximEstatements = new DoximEstatements(SettingsBase));
            set => _doximEstatements = value;
        }

        public BitEstatements BitEstatements
        {
            get => _bitEstatements ?? (_bitEstatements = new BitEstatements(SettingsBase));
            set => _bitEstatements = value;
        }
        
        public NcpEstatements NcpEstatements
        {
            get => _ncpEstatements ?? (_ncpEstatements = new NcpEstatements(SettingsBase));
            set => _ncpEstatements = value;
        }
        
        public InfoImageEstatementsSettings InfoImageEstatements
        {
            get => _infoImageEstatements ?? (_infoImageEstatements = new InfoImageEstatementsSettings(SettingsBase));
            set => _infoImageEstatements = value;
        }

        public WebApiEstatementsSettings WebApiEstatements
        {
            get => _webApiEstatements ?? (_webApiEstatements = new WebApiEstatementsSettings(SettingsBase));
            set => _webApiEstatements = value;
        }
    }
}
