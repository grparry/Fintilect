using System;
using System.Collections.Generic;
using Psi.Data.Models.Domain.RemoteDeposit;

namespace Psi.Data.Models.ClientConfigurationModels.RemoteDeposit
{
    public class RemoteDeposit : SettingsBaseHelper
    {
        private readonly ISettingsBase _settingsBase;
        private Ensenta _ensenta;
        private Vertifi _vertifi;
        private ProfitStars _profitStars;

        public RemoteDeposit(ISettingsBase settingsBase) : base(settingsBase)
        {
            _settingsBase = settingsBase;
        }

        public Ensenta Ensenta
        {
            get => _ensenta ?? (_ensenta = new Ensenta(_settingsBase));
            set => _ensenta = value;
        }

        public Vertifi Vertifi
        {
            get => _vertifi ?? (_vertifi = new Vertifi(_settingsBase));
            set => _vertifi = value;
        }

        public ProfitStars ProfitStars
        {
            get => _profitStars ?? (_profitStars = new ProfitStars(_settingsBase));
            set => _profitStars = value;
        }

        [SettingKey("RemoteDeposit.ServiceName")]
        public RemoteDepositServiceType ServiceType
        {
            get => Enum.TryParse(GetValue(), true, out RemoteDepositServiceType serviceType) ? serviceType : RemoteDepositServiceType.None;
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.StatusUpdate.ShouldDelayBeforeStatusUpdate")]
        public bool ShouldDelayBeforeStatusUpdate
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        /// <summary>
        /// Some credit unions (RVCU) have a suffix that is reserved for checking accounts, if this config is enabled then we will also check that suffix when determining if a remote deposit is to a checking account
        /// </summary>
        [SettingKey("RemoteDeposit.ShouldCheckReservedCheckingAccountSuffix")]
        public bool ShouldCheckReservedCheckingAccountSuffix
        {
            get => GetBoolValue(); 
            set => SetValue(value);
        }

        /// <summary>
        /// Some credit unions (RVCU) have a suffix that is reserved for checking accounts, This config defines what the reserved suffix is.
        /// </summary>
        [SettingKey("RemoteDeposit.ReservedCheckingAccountSuffix")]
        public long ReservedCheckingAccountSuffix
        {
            get => GetLongValue(); 
            set => SetValue(value);
        }


        /// <summary>
        /// Account Types - Deposit into
        /// </summary>
        [SettingKey("RemoteDeposit.DepositIntoAccountTypes")]
        public string DepositIntoAccountTypes
        {
            get => GetValue();
            set => SetValue(value);
        }

        [SettingKey("X.App.HomeBanking.RemoteDepositAccountFormat")]
        public RemoteDepositAccountFormat RemoteDepositAccountFormat
        {
            get
            {
                var config = GetValue();
                Enum.TryParse(config, true, out RemoteDepositAccountFormat result);

                return result;
            }
            set => SetValue(value.ToString());
        }

        public enum RemoteDepositServiceType
        {
            None,
            Ensenta,
            Vertifi,
            ProfitStars
        }

        /// <summary>
        /// Some credit unions have remote deposit for their mobile apps, but not for browser. If true, show links to remote deposit in Emerge Browser views.
        /// </summary>
        [SettingKey("RemoteDeposit.ShouldShowLinksInEmergeBrowser")]
        public bool ShouldShowLinksInEmergeBrowser
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.RelationshipCodeDepositLimits.Enabled")]
        public bool RelationshipCodeDepositLimitsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.RelationshipCodeDepositLimits")]
        public List<RelationshipCodeDepositLimit> RelationshipCodeDepositLimits
        {
            get => GetJsonValueOrNull<List<RelationshipCodeDepositLimit>>();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.RelationshipCode.SaveHoldInformationEnabled")]
        public bool RelationshipCodeSaveHoldInformationEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.RelationshipCode.DetermineReleaseDateByBusinessDays")]
        public bool RelationshipCodeDetermineReleaseDateByBusinessDays
        {
            get => GetBoolValue();
            set => SetValue(value);
        }

        [SettingKey("RemoteDeposit.AlternateCheckHolds.Enabled")]
        public bool AlternateCheckHoldsEnabled
        {
            get => GetBoolValue();
            set => SetValue(value);
        }
    }
}
