using System;
using Psi.Data.Models.ClientConfigurationModels.FinancialCores.SymitarSettings;
using Psi.Data.Models.Domain;

namespace Psi.Data.Models.ClientConfigurationModels.FinancialCores
{
    public class FinancialCore : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private Corelation _corelation;
        private Epl _epl;
        private DNA _dna;
        private Notes _notes;
        private Symitar _symitar;
        private Summit _summit;
        private PsiCore _psicore;

		public FinancialCore(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        [SettingKey("FinancialCore.CoreType")]
        public FinancialCoreTypes CoreType
        {
            get
            {
                FinancialCoreTypes type;
                Enum.TryParse(GetValue(), out type);
                return type;
            }
            set { SetValue(value); }
        }

        [SettingKey("FinancialCore.UseClassicCore")]
        public bool UseClassicCore
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If this setting is true, the classic to financial core account inquiry mapper will just pass the classic homebanking xlate right through without mapping it from classic to ICore, to classic again.
        /// </summary>
        [SettingKey("FinancialCore.ShouldBypassICoreForAccountInquiry")]
        public bool ShouldBypassICoreForAccountInquiry
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If this setting is true, the classic to financial core sched transfer drive mapper and sched transfer drive cc mapper will just 
        /// pass the classic homebanking xlate right through without mapping it from classic to ICore, to classic again.
        /// </summary>
        [SettingKey("FinancialCore.ShouldBypassICoreForScheduledTransfers")]
        public bool ShouldBypassICoreForScheduledTransfers
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        /// <summary>
        /// If this setting is true, the password will be mapped to the Financial core Mapper (Symitar, DNA, EPL, Murcury, or Summit).
        /// This setting should be set to false for the Symitar core, and should probably be set to false for the other classic cores, but that needs to be tested.
        /// Setting the password value in an account inquiry triggers a core login attempt (at least it does for symitar).  A core login attempt is already handled later on when CommandManager.VerifyAudioPin is called.
        /// We need to verify if not mapping the passwrod will cause problems for other classic mapper cores.  Once we have verified this, we can deprecate this setting.
        /// Mapping the password during account inquiry is causing multiple core login attempts on the Symitar core and locking out users too fast.  Though it has not been reported,
        /// it may be causing similar problems on other cores.
        /// </summary>
        [SettingKey("FinancialCore.ClassicCores.ShouldMapPasswordDuringAccountInquiry")]
        public bool ShouldMapPasswordDuringAccountInquiry
        {
            get => GetBoolValue(true);
            set => SetValue(value);
        }

        /// <summary>
        /// If PSICore is selected as CoreType, then use this if not empty or null, otherwise will use sqldev
        /// </summary>
        [SettingKey("FinancialCore.CoreConnectionString")]
        public string CoreConnectionString
        {
            get { return GetValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Caching.CacheAccountInquiry")]
        public bool CacheAccountInquiry
        {
            get { return GetBoolValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinancialCore.Caching.CacheAccountInquiryForClassicCores")]
        public bool CacheAccountInquiryForClassicCores
        {
            get => GetBoolValue(true);
            set => SetValue(value);
        }

        [SettingKey("FinacialCore.Caching.CacheAccountInquiryWaitForSeconds")]
        public int CacheAccountInquiryWaitForSeconds
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Caching.CacheExpireInMinutes")]
        public int CacheExpireInMinutes
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }

        [SettingKey("FinacialCore.Throttle.AccountInquiry")]
        public int ThrottleAccoutInquiry
        {
            get { return GetIntValue(); }
            set { SetValue(value); }
        }
        
        public Corelation Corelation
        {
            get { return _corelation ?? (_corelation = new Corelation(_settingsBase)); }
            set { _corelation = value; }
        }

        /// <summary>
        /// Configuration settings for the EPL core.
        /// </summary>
        public Epl Epl
        {
            get => _epl ?? (_epl = new Epl(_settingsBase));
            set => _epl = value;
        }

        public DNA DNA
        {
            get { return _dna ?? (_dna = new DNA(_settingsBase)); }
            set { _dna = value; }
        }

        public PsiCore PsiCore
        {
            get { return _psicore ?? (_psicore = new PsiCore(_settingsBase)); }
            set { _psicore = value; }
        }


        public Symitar Symitar
	    {
		    get { return _symitar ?? (_symitar = new Symitar(_settingsBase)); }
		    set { _symitar = value; }
	    }

	    public Summit Summit
	    {
		    get { return _summit ?? (_summit = new Summit(_settingsBase)); }
		    set { _summit = value; }
	    }

		public Notes Notes
        {
            get { return _notes ?? (_notes = new Notes(_settingsBase)); }
            set { _notes = value; }
        }
    }
}

